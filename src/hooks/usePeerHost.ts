import { useEffect, useRef, useState, useCallback } from "react";
import { ConnectionStatus, MessageType, PeerMessage } from "../types";

export const usePeerHost = (onRemoteMessage: (msg: PeerMessage) => void) => {
 const [peerId, setPeerId] = useState<string>("");
 const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);

 // Refs to maintain instance integrity across renders without triggering re-renders
 const connectionsRef = useRef<Set<any>>(new Set());
 const peerRef = useRef<any>(null);
 const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const mountedRef = useRef<boolean>(true);

 // Callbacks storage to avoid dependency cycles inside Peer listeners
 const onMessageRef = useRef(onRemoteMessage);
 useEffect(() => {
  onMessageRef.current = onRemoteMessage;
 }, [onRemoteMessage]);

 const destroyPeer = useCallback(() => {
  // Clear any pending retries immediately
  if (retryTimeoutRef.current) {
   clearTimeout(retryTimeoutRef.current);
   retryTimeoutRef.current = null;
  }

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
  let retryCount = 0;
  const MAX_RETRIES = 20;

  const initPeer = () => {
   if (!mountedRef.current) return;

   // Basic check if Peer is loaded from CDN
   if (!window.Peer) {
    if (retryCount < MAX_RETRIES) {
     retryCount++;
     // Exponential backoff: 200, 400, 800, 1600... max 3s
     const delay = Math.min(3000, 200 * Math.pow(1.5, retryCount));
     console.log(`PeerJS not ready, retrying in ${Math.round(delay)}ms (Attempt ${retryCount})`);
     retryTimeoutRef.current = setTimeout(initPeer, delay);
     return;
    }
    console.error("PeerJS failed to load from CDN.");
    setStatus(ConnectionStatus.ERROR);
    return;
   }

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
    const peer = new window.Peer();
    peerRef.current = peer;

    peer.on("open", (id: string) => {
     if (!mountedRef.current) {
      peer.destroy();
      return;
     }
     setPeerId(id);
     setStatus(ConnectionStatus.CONNECTING);
     retryCount = 0; // Reset retry on success
    });

    peer.on("connection", (conn: any) => {
     if (!mountedRef.current) {
      conn.close();
      return;
     }

     connectionsRef.current.add(conn);
     setStatus(ConnectionStatus.CONNECTED);

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
      console.warn("Connection Error:", err);
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

 const broadcast = useCallback((type: MessageType, payload: any) => {
  connectionsRef.current.forEach((conn) => {
   if (conn.open) {
    try {
     conn.send({ type, payload });
    } catch (e) {
     // Stale connection, remove it
     connectionsRef.current.delete(conn);
    }
   }
  });
 }, []);

 return { peerId, status, broadcast };
};
