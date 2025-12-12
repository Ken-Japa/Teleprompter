import { useEffect, useRef, useState, useCallback } from "react";
import { Peer } from "peerjs";
import { ConnectionStatus, PeerMessage, MessageType } from "../types";
import { trackSuccessfulConnection, startUsageTracking, trackError } from "../utils/analytics";
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
                let idToUse = peerId;
                if (!idToUse) {
                    // Generate one if missing to behave optimistically? 
                    // Or let PeerJS generate and then save it?
                    // To solve "Offline QR Code", we MUST have an ID before connection involves.
                    // So we generate a UUID ourselves if missing.
                    idToUse = crypto.randomUUID();
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
                    if (id !== peerId) {
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
                    trackError("peer_error", err.type || err.message);

                    if (err.type === 'unavailable-id') {
                        // ID collision or still alive on server -> Generate new one
                        // Clear storage and state, then retry will pick up new generation logic (if we handled it rights)
                        // Actually better: just generate new one here and retry immediately
                        localStorage.removeItem("promptninja_peer_id");
                        setPeerId(""); // Clear state
                        // Force logic to create new ID on next retry
                        if (mountedRef.current && retryCountRef.current < MAX_RETRIES) {
                            retryCountRef.current += 1;
                            retryTimeoutRef.current = setTimeout(initPeer, 100);
                        }
                        return;
                    }

                    // Critical errors that require UI update
                    if (["browser-incompatible", "ssl-unavailable", "server-error"].includes(err.type)) {
                        if (mountedRef.current) setStatus(ConnectionStatus.ERROR);
                    }

                    // If it's a network/socket error, try to reconnect
                    if (
                        err.type === "network" ||
                        err.type === "peer-unavailable" ||
                        err.type === "socket-error" ||
                        err.type === "disconnected"
                    ) {
                        if (retryCountRef.current < MAX_RETRIES) {
                            // If network error, we prefer to keep status as DISCONNECTED or ERROR but we KEEP perId in state
                            // so QR code keeps showing
                            console.log(`Retrying connection... Attempt ${retryCountRef.current + 1}`);
                            retryCountRef.current += 1;
                            retryTimeoutRef.current = setTimeout(initPeer, RETRY_DELAY);
                        } else {
                            setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão.");
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

        return () => {
            mountedRef.current = false;
            clearTimeout(startTimeout);
            destroyPeer();
        };
    }, [destroyPeer]); // Removed peerId dependency to avoid loops, initialization logic handles reading it

    return { peerId, status, errorMessage, broadcast };
};
