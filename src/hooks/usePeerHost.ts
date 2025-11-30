import { useEffect, useRef, useState, useCallback } from "react";
import { Peer } from "peerjs";
import { ConnectionStatus, PeerMessage, MessageType } from "../types";
import { trackSuccessfulConnection, startUsageTracking } from "../utils/analytics";

/**
 * Hook customizado para gerenciar a conexão P2P do lado do Host (quem controla o prompter).
 * Utiliza a biblioteca PeerJS para estabelecer conexões WebRTC.
 *
 * @param onRemoteMessage Callback executado quando uma mensagem é recebida de um controle remoto.
 * @returns Objeto contendo o ID do peer, status da conexão, mensagem de erro, função de broadcast e função de limpeza.
 */
export const usePeerHost = (onRemoteMessage: (msg: PeerMessage) => void) => {
 const [peerId, setPeerId] = useState<string>("");
 const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);

 // Refs to maintain instance integrity across renders without triggering re-renders
 const connectionsRef = useRef<Set<any>>(new Set());
 const peerRef = useRef<Peer | null>(null);
 const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const mountedRef = useRef<boolean>(true);

 // Callbacks storage to avoid dependency cycles inside Peer listeners
 const onMessageRef = useRef(onRemoteMessage);
 useEffect(() => {
  onMessageRef.current = onRemoteMessage;
 }, [onRemoteMessage]);

 /**
  * Envia uma mensagem para todos os peers conectados.
  * @param type Tipo da mensagem (MessageType)
  * @param payload Dados da mensagem
  */
 const broadcast = useCallback((type: MessageType, payload?: any) => {
  const msg: PeerMessage = { type, payload, timestamp: Date.now() };
  connectionsRef.current.forEach((conn) => {
   if (conn.open) {
    try {
     conn.send(msg);
    } catch (e) {
     console.warn("Failed to send message to peer", e);
    }
   }
  });
 }, []);

 /**
  * Encerra a instância do Peer e todas as conexões ativas.
  * Limpa listeners e previne vazamento de memória.
  */
 const destroyPeer = useCallback(() => {
  // Clear any pending retries immediately
  if (retryTimeoutRef.current) {
   clearTimeout(retryTimeoutRef.current);
   retryTimeoutRef.current = null;
  }
  setErrorMessage(null); // Clear error message on destroy

  // Close all active connections first
  connectionsRef.current.forEach((conn) => {
   try {
    conn.removeAllListeners(); // Prevent late events
    conn.close();
   } catch (e) {
    /* ignore */
   }
  });
  connectionsRef.current.clear();

  if (peerRef.current) {
   // Remove listeners before destroying to prevent zombie events
   peerRef.current.removeAllListeners();

   try {
    if (!peerRef.current.destroyed) peerRef.current.destroy();
   } catch (e) {
    /* ignore */
   }
   peerRef.current = null;
  }
 }, []);

 useEffect(() => {
  mountedRef.current = true;

  /**
   * Inicializa o PeerJS e configura os listeners de eventos.
   * Gerencia reconexões e erros de inicialização.
   */
  const initPeer = async () => {
   if (!mountedRef.current) return;

   // Cleanup previous instance if exists to avoid "ID Taken" errors (Strict Mode safety)
   if (peerRef.current) {
    if (peerRef.current.destroyed) {
     peerRef.current = null;
    } else {
     // Existing active peer, don't re-init
     return;
    }
   }

   try {
    // Initialize Peer with default config (Cloud Server)
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id: string) => {
     if (!mountedRef.current) {
      peer.destroy();
      return;
     }
     setPeerId(id);
     setErrorMessage(null); // Clear error on successful open
     setStatus(ConnectionStatus.CONNECTING);
     startUsageTracking();
    });

    peer.on("connection", (conn: any) => {
     if (!mountedRef.current) {
      conn.close();
      return;
     }

     connectionsRef.current.add(conn);
     setStatus(ConnectionStatus.CONNECTED);
     trackSuccessfulConnection();

     conn.on("data", (data: PeerMessage) => {
      if (onMessageRef.current) onMessageRef.current(data);
     });

     conn.on("close", () => {
      connectionsRef.current.delete(conn);
      if (connectionsRef.current.size === 0 && mountedRef.current) {
       setStatus(ConnectionStatus.CONNECTING); // Back to waiting
      }
     });

     conn.on("error", (err: any) => {
      const msg = `Erro na conexão P2P: ${
       err.message || "Ocorreu um erro inesperado."
      } Por favor, tente reconectar.`;
      console.warn("Connection Error:", err);
      setErrorMessage(msg);
      connectionsRef.current.delete(conn);
     });
    });

    peer.on("error", (err: any) => {
     console.warn("Peer Error:", err);
     // Critical errors that require UI update
     if (["browser-incompatible", "invalid-id", "ssl-unavailable", "server-error"].includes(err.type)) {
      if (mountedRef.current) setStatus(ConnectionStatus.ERROR);
     }
     // Transient errors are usually handled by PeerJS internal retry logic
    });

    peer.on("disconnected", () => {
     if (peer && !peer.destroyed && mountedRef.current) {
      // Attempt reconnect to signaling server
      try {
       peer.reconnect();
      } catch (e) {}
     }
    });
   } catch (e) {
    console.error("Peer Init Exception", e);
    if (mountedRef.current) setStatus(ConnectionStatus.ERROR);
   }
  };

  // Delay start slightly to allow React Strict Mode to settle
  const startTimeout = setTimeout(initPeer, 100);

  return () => {
   mountedRef.current = false;
   clearTimeout(startTimeout);
   destroyPeer();
  };
 }, [destroyPeer]);

 return { peerId, status, errorMessage, broadcast };
};
