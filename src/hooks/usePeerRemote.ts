import { getP2pErrorMessage } from "../utils/p2pErrorUtils";
import { useEffect, useRef, useState, useCallback } from "react";
import { Peer } from "peerjs";
import { ConnectionStatus, PeerDataConnection, PeerMessage, MessageType } from "../types";
import { trackSuccessfulConnection, startUsageTracking } from "../utils/analytics";
import { PEER_CONFIG } from "../utils/peerConfig";

/**
 * Hook customizado para gerenciar a conexão P2P do lado do Controle Remoto.
 * 
 * @param hostId ID do Host ao qual se conectar.
 * @returns Objeto contendo status, mensagem de erro, e funções de gerenciamento.
 */
export const usePeerRemote = (hostId: string) => {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const connRef = useRef<PeerDataConnection | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef<boolean>(true);

  // Callbacks storage
  const onMessageRef = useRef<((data: PeerMessage) => void) | null>(null);
  const setOnMessage = useCallback((cb: (data: PeerMessage) => void) => {
    onMessageRef.current = cb;
  }, []);

  /**
   * Configura os listeners para uma conexão de dados estabelecida.
   * @param conn A conexão de dados do PeerJS.
   */
  const setupConnection = (conn: any) => {
    connRef.current = conn;

    conn.on("open", () => {
      if (!mountedRef.current) return;
      setStatus(ConnectionStatus.CONNECTED);
      setErrorMessage(null); // Clear error on successful connection
      trackSuccessfulConnection();
      startUsageTracking();
    });

    conn.on("data", (data: PeerMessage) => {
      if (onMessageRef.current) onMessageRef.current(data);
    });

    conn.on("close", () => {
      if (!mountedRef.current) return;
      setStatus(ConnectionStatus.DISCONNECTED);
      connRef.current = null;
    });

    conn.on("error", (err: any) => {
      if (mountedRef.current) {
        const msg = `Erro na conexão P2P com o host: ${
          err.message || "Ocorreu um erro inesperado."
        }. Por favor, tente reconectar.`;
        console.warn("Connection Error:", err);
        setErrorMessage(msg);
        if (status === ConnectionStatus.CONNECTING) {
          setStatus(ConnectionStatus.ERROR);
        }
      }
    });
  };

  /**
   * Tenta reconectar explicitamente ao host.
   * Útil quando a conexão é perdida temporariamente.
   */
  const attemptReconnect = useCallback(() => {
    if (!peerRef.current || peerRef.current.destroyed) return;

    // If we are disconnected but peer is alive, try to connect to host again
    if (status === ConnectionStatus.DISCONNECTED || status === ConnectionStatus.ERROR) {
      console.log("Attempting explicit reconnect...");
      setStatus(ConnectionStatus.CONNECTING);
      try {
        const conn = peerRef.current.connect(hostId, { reliable: true });
        setupConnection(conn);
      } catch (e) {
        console.error("Reconnect failed", e);
      }
    }
  }, [hostId, status]);

  /**
   * Envia uma mensagem para o host.
   * @param type Tipo da mensagem (MessageType)
   * @param payload Dados da mensagem
   */
  const sendMessage = useCallback((type: MessageType, payload?: any) => {
    if (connRef.current && connRef.current.open) {
      const msg: PeerMessage = { type, payload, timestamp: Date.now() };
      try {
        connRef.current.send(msg);
      } catch (e) {
        console.warn("Failed to send message to host", e);
      }
    }
  }, []);

  /**
   * Limpa recursos (timeouts, conexões e instância do Peer).
   */
  const cleanup = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (connRef.current) {
      try {
        connRef.current.close();
      } catch (e) {}
      connRef.current = null;
    }
    if (peerRef.current) {
      try {
        peerRef.current.destroy();
      } catch (e) {}
      peerRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let retryCount = 0;

    const initRemote = async () => {
      if (!mountedRef.current) return;

      // Don't re-init if healthy
      if (peerRef.current && !peerRef.current.destroyed) return;

      try {
        const peer = new Peer(PEER_CONFIG); // Auto-generate ID for remote
        peerRef.current = peer;

        peer.on("open", () => {
          if (!mountedRef.current) return;
          setStatus(ConnectionStatus.CONNECTING);

          const conn = peer.connect(hostId, { reliable: true });
          setupConnection(conn);
          retryCount = 0;
        });

        peer.on("error", (err: any) => {
          const msg = getP2pErrorMessage(err, hostId);
          console.warn("Peer Error:", err);
          if (mountedRef.current) {
            setErrorMessage(msg);
            if (
              [
                "peer-unavailable",
                "network",
                "webrtc",
                "browser-incompatible",
                "invalid-id",
                "ssl-unavailable",
                "server-error",
              ].includes(err.type)
            ) {
              setStatus(ConnectionStatus.ERROR);
            } else if (err.type === "disconnected") {
              setStatus(ConnectionStatus.DISCONNECTED);
            }
          }
        });

        peer.on("disconnected", () => {
          if (peer && !peer.destroyed && mountedRef.current) {
            try {
              peer.reconnect();
            } catch (e) {}
          }
          setErrorMessage(getP2pErrorMessage({ type: "disconnected" }, hostId));
        });
      } catch (e) {
        console.error("Remote Init Error", e);
        if (mountedRef.current) setStatus(ConnectionStatus.ERROR);
      }
    };

    initRemote();

    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [hostId, cleanup]);

  return { status, errorMessage, attemptReconnect, setOnMessage, sendMessage };
};
