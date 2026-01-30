import { useEffect, useRef, useState, useCallback } from "react";
import { Peer } from "peerjs";
import { ConnectionStatus, PeerMessage, MessageType } from "../types";
import { trackSuccessfulConnection, startUsageTracking, trackError, trackWarning } from "../utils/analytics";
import { PEER_CONFIG } from "../utils/peerConfig";

/**
 * Hook customizado para gerenciar a conexão P2P do lado do Host (quem controla o prompter).
 * Utiliza a biblioteca PeerJS para estabelecer conexões WebRTC.
 *
 * @param onRemoteMessage Callback executado quando uma mensagem é recebida de um controle remoto.
 * @param isPro Define se o usuário é Pro (permite múltiplos controles).
 * @returns Objeto contendo o ID do peer, status da conexão, mensagem de erro, função de broadcast e função de limpeza.
 */
export const usePeerHost = (onRemoteMessage: (msg: PeerMessage) => void, isPro: boolean = false) => {
    // Attempt to hydrate peerId from localStorage for offline support (or persistent ID)
    const [peerId, setPeerId] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("promptninja_peer_id");
            if (saved) return saved;
        }
        return "";
    });

    const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Refs to maintain instance integrity across renders without triggering re-renders
    const connectionsRef = useRef<Set<any>>(new Set());
    const peerRef = useRef<Peer | null>(null);
    const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mountedRef = useRef<boolean>(true);
    const retryCountRef = useRef<number>(0);
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 seconds

    // Callbacks storage to avoid dependency cycles inside Peer listeners
    const onMessageRef = useRef(onRemoteMessage);
    useEffect(() => {
        onMessageRef.current = onRemoteMessage;
    }, [onRemoteMessage]);

    // Keep peerId ref in sync for internal logic access without adding dependency
    const peerIdRef = useRef(peerId);
    useEffect(() => {
        peerIdRef.current = peerId;
    }, [peerId]);

    // Throttling ref
    const lastBroadcastTimeRef = useRef<number>(0);
    const THROTTLE_MS = 50; // Limit to ~20fps for network efficiency

    /**
     * Envia uma mensagem para todos os peers conectados.
     * @param type Tipo da mensagem (MessageType)
     * @param payload Dados da mensagem
     */
    const broadcast = useCallback((type: MessageType, payload?: any) => {
        // Throttle SCROLL_SYNC messages only
        if (type === MessageType.SCROLL_SYNC) {
            const now = Date.now();
            if (now - lastBroadcastTimeRef.current < THROTTLE_MS) {
                return;
            }
            lastBroadcastTimeRef.current = now;
        }

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
                // Determine ID to use: existing state (from localStorage) or undefined (let PeerJS generate)
                // If we don't have one in state yet, we won't pass one, and PeerJS will assign one.
                // WE SHOULDN'T pass empty string to constructor.
                const peerOptions = { ...PEER_CONFIG };

                // If we have a stored ID, try to reuse it
                // Make sure to use ref to get latest value during retries
                let idToUse = peerIdRef.current;

                if (!idToUse) {
                    // Generate one if missing to behave optimistically? 
                    // Or let PeerJS generate and then save it?
                    // To solve "Offline QR Code", we MUST have an ID before connection involves.
                    // So we generate a UUID ourselves if missing.
                    idToUse = crypto.randomUUID();
                    // Update both state and ref immediately
                    peerIdRef.current = idToUse;
                    setPeerId(idToUse);
                    localStorage.setItem("promptninja_peer_id", idToUse);
                }

                // Initialize Peer with specific ID (Cloud Server)
                const peer = new Peer(idToUse, peerOptions);
                peerRef.current = peer;

                peer.on("open", (id: string) => {
                    if (!mountedRef.current) {
                        peer.destroy();
                        return;
                    }
                    // Ensure state matches (it should)
                    if (id !== peerIdRef.current) {
                        peerIdRef.current = id;
                        setPeerId(id);
                        localStorage.setItem("promptninja_peer_id", id);
                    }

                    setErrorMessage(null); // Clear error on successful open
                    setStatus(ConnectionStatus.CONNECTING);
                    startUsageTracking();
                    retryCountRef.current = 0; // Reset retries on success
                });

                peer.on("connection", (conn: any) => {
                    if (!mountedRef.current) {
                        conn.close();
                        return;
                    }

                    // Limite Pro: Múltiplos; Free: 1 só
                    if (!isPro && connectionsRef.current.size >= 1) {
                        conn.close(); // Rejeita conexão extra
                        setErrorMessage("Limite atingido: Apenas 1 controle remoto no plano gratuito. Atualize para Pro!");
                        return;
                    }

                    connectionsRef.current.add(conn);
                    (conn as any).openTimestamp = Date.now();
                    (conn as any).lastHeartbeat = Date.now();
                    setStatus(ConnectionStatus.CONNECTED);
                    trackSuccessfulConnection();

                    conn.on("data", (data: PeerMessage) => {
                        // Intercept Heartbeat
                        if (data.type === MessageType.HEARTBEAT) {
                            (conn as any).lastHeartbeat = Date.now();
                            return;
                        }
                        if (onMessageRef.current) onMessageRef.current(data);
                    });

                    conn.on("close", () => {
                        connectionsRef.current.delete(conn);
                        if (connectionsRef.current.size === 0 && mountedRef.current) {
                            setStatus(ConnectionStatus.CONNECTING); // Back to waiting
                        }
                    });

                    conn.on("error", (err: any) => {
                        const msg = `Erro na conexão P2P: ${err.message || "Ocorreu um erro inesperado."
                            } Por favor, tente reconectar.`;
                        console.warn("Connection Error:", err);
                        setErrorMessage(msg);
                        trackError("p2p_connection_error", err.type || err.message);
                        connectionsRef.current.delete(conn);
                    });
                });

                peer.on("error", (err: any) => {
                    console.warn("Peer Error:", err);
                    const errType = err.type || "unknown";
                    const isTransient = [
                        "network",
                        "peer-unavailable",
                        "socket-error",
                        "disconnected"
                    ].includes(errType);

                    if (errType === 'unavailable-id') {
                        // ID collision or still alive on server -> Generate new one
                        trackWarning("host_id_collision", "Generating new peer ID");
                        localStorage.removeItem("promptninja_peer_id");
                        peerIdRef.current = "";
                        setPeerId("");

                        if (mountedRef.current && retryCountRef.current < MAX_RETRIES) {
                            retryCountRef.current += 1;
                            retryTimeoutRef.current = setTimeout(initPeer, 100);
                        }
                        return;
                    }

                    if (mountedRef.current) {
                        const isLastRetry = retryCountRef.current >= MAX_RETRIES;

                        if (isTransient) {
                            if (isLastRetry) {
                                trackError("host_peer_fatal", errType);
                                setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão.");
                                setStatus(ConnectionStatus.ERROR);
                            } else {
                                trackWarning("host_peer_retry", `${errType} - Attempt ${retryCountRef.current + 1}`);
                                console.log(`Retrying connection... Attempt ${retryCountRef.current + 1}`);
                                retryCountRef.current += 1;
                                retryTimeoutRef.current = setTimeout(initPeer, RETRY_DELAY);
                            }
                        } else {
                            // Fatal or configuration errors
                            trackError("host_peer_error", errType);
                            setStatus(ConnectionStatus.ERROR);
                        }
                    }
                });

                peer.on("disconnected", () => {
                    if (peer && !peer.destroyed && mountedRef.current) {
                        // Attempt reconnect to signaling server
                        try {
                            peer.reconnect();
                        } catch (e) {
                            // If reconnect fails immediately, trigger full re-init logic
                            if (retryCountRef.current < MAX_RETRIES) {
                                retryCountRef.current += 1;
                                retryTimeoutRef.current = setTimeout(initPeer, RETRY_DELAY);
                            }
                        }
                    }
                });
            } catch (e) {
                console.error("Peer Init Exception", e);
                if (mountedRef.current) {
                    if (retryCountRef.current < MAX_RETRIES) {
                        retryCountRef.current += 1;
                        retryTimeoutRef.current = setTimeout(initPeer, RETRY_DELAY);
                    } else {
                        setStatus(ConnectionStatus.ERROR);
                    }
                }
            }
        };

        // Delay start slightly to allow React Strict Mode to settle
        const startTimeout = setTimeout(initPeer, 100);

        // Stale Connection Check Interval
        const checkInterval = setInterval(() => {
            const now = Date.now();
            connectionsRef.current.forEach(conn => {
                // If connection is open but no heartbeat for > 15s, close it
                // We give 15s grace period (heartbeat is every 3s)
                const lastHeartbeat = (conn as any).lastHeartbeat || (conn as any).openTimestamp;

                if (lastHeartbeat && (now - lastHeartbeat > 10000)) {
                    console.warn(`Connection ${conn.peer} timed out due to missing heartbeat.`);
                    conn.close();
                    connectionsRef.current.delete(conn);
                    // If no connections left, update status
                    if (connectionsRef.current.size === 0 && mountedRef.current) {
                        setStatus(ConnectionStatus.CONNECTING);
                    }
                }
            });
        }, 5000);

        return () => {
            mountedRef.current = false;
            clearTimeout(startTimeout);
            clearInterval(checkInterval);
            destroyPeer();
        };
    }, [destroyPeer]); // Removed peerId dependency to avoid loops, initialization logic handles reading it

    return { peerId, status, errorMessage, broadcast };
};
