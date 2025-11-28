import { getP2pErrorMessage } from "../utils/p2pErrorUtils";
import { useEffect, useRef, useState, useCallback } from "react";
import { ConnectionStatus, MessageType, PeerDataConnection, PeerMessage } from "../types";

export const usePeerRemote = (hostId: string) => {
 const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const connRef = useRef<PeerDataConnection | null>(null);
 const peerRef = useRef<any>(null);
 const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const mountedRef = useRef<boolean>(true);

 // Callbacks storage
 const onMessageRef = useRef<((data: PeerMessage) => void) | null>(null);
 const setOnMessage = useCallback((cb: (data: PeerMessage) => void) => {
  onMessageRef.current = cb;
 }, []);

 // Explicit Reconnect Function
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

 const setupConnection = (conn: any) => {
  connRef.current = conn;

  conn.on("open", () => {
   if (!mountedRef.current) return;
   setStatus(ConnectionStatus.CONNECTED);
   setErrorMessage(null); // Clear error on successful connection
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
  const MAX_RETRIES = 15;

  const initRemote = () => {
   if (!mountedRef.current) return;

   // Wait for library load
   if (!window.Peer) {
    if (retryCount < MAX_RETRIES) {
     retryCount++;
     retryTimeoutRef.current = setTimeout(initRemote, 500);
     return;
    }
    const msg =
     "Não foi possível carregar a biblioteca de conexão P2P. Verifique sua conexão com a internet ou tente novamente mais tarde.";
    console.error(msg);
    setErrorMessage(msg);
    setStatus(ConnectionStatus.ERROR);
    return;
   }

   // Don't re-init if healthy
   if (peerRef.current && !peerRef.current.destroyed) return;

   try {
    const peer = new window.Peer(); // Auto-generate ID for remote
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

 const sendMessage = useCallback((type: MessageType, payload?: any) => {
  if (connRef.current && connRef.current.open) {
   try {
    connRef.current.send({ type, payload });
   } catch (e) {
    console.warn("Failed to send message", e);
   }
  }
 }, []);

 // Mobile Resilience: Auto-reconnect on visibility change
 useEffect(() => {
  const handleVisibilityChange = () => {
   if (document.visibilityState === "visible") {
    if (status === ConnectionStatus.DISCONNECTED && peerRef.current && !peerRef.current.destroyed) {
     attemptReconnect();
    } else if (!peerRef.current || peerRef.current.destroyed) {
     // Full reload if peer died
     // Not ideal, but sometimes necessary on iOS
    }
   }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
 }, [status, attemptReconnect]);

 return { status, sendMessage, setOnMessage, errorMessage };
};
