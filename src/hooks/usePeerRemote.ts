import { getP2pErrorMessage } from "../utils/p2pErrorUtils";
import { useEffect, useRef, useState, useCallback } from "react";
import { Peer } from "peerjs";
import { ConnectionStatus, PeerDataConnection, PeerMessage, MessageType } from "../types";
import { trackSuccessfulConnection, startUsageTracking, trackError, trackWarning } from "../utils/analytics";
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
    const retryCountRef = useRef<number>(0);
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000;

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
                const msg = `Erro na conexão P2P com o host: ${err.message || "Ocorreu um erro inesperado."
                    }. Por favor, tente reconectar.`;
                console.warn("Connection Error:", err);
                setErrorMessage(msg);
                trackError("remote_connection_error", err.type || err.message);
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
            } catch (e) { /* ignore */ }
            connRef.current = null;
        }
        if (peerRef.current) {
            try {
                peerRef.current.destroy();
            } catch (e) { /* ignore */ }
            peerRef.current = null;
        }
    }, []);

    useEffect(() => {
        mountedRef.current = true;

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
                    retryCountRef.current = 0;
                });

                // HEARTBEAT LOGIC
                // Send a heartbeat every 3s to let host know we are alive
                // Only if connected
                const heartbeatInterval = setInterval(() => {
                    if (connRef.current && connRef.current.open) {
                        try {
                            connRef.current.send({ type: MessageType.HEARTBEAT, timestamp: Date.now() });
                        } catch (e) { /* ignore */ }
                    }
                }, 3000);

                // Clear interval when peer destroys or re-inits
                peer.on("close", () => clearInterval(heartbeatInterval));
                peer.on("disconnected", () => clearInterval(heartbeatInterval));
                peer.on("error", () => clearInterval(heartbeatInterval));

                peer.on("error", (err: any) => {
                    const msg = getP2pErrorMessage(err, hostId);
                    console.warn("Peer Error:", err);
                    const errType = err.type || "unknown";
                    const isTransient = [
                        "peer-unavailable",
                        "network",
                        "webrtc",
                        "disconnected",
                        "socket-error"
                    ].includes(errType);

                    if (mountedRef.current) {
                        setErrorMessage(msg);

                        const isLastRetry = retryCountRef.current >= MAX_RETRIES;

                        if (isTransient) {
                            if (isLastRetry) {
                                trackError("remote_peer_fatal", errType);
                                setStatus(ConnectionStatus.ERROR);
                            } else {
                                // Track as warning/retry instead of error
                                trackWarning("remote_peer_retry", `${errType} - Attempt ${retryCountRef.current + 1}`);

                                if (errType !== "disconnected") {
                                    setStatus(ConnectionStatus.ERROR);
                                } else {
                                    setStatus(ConnectionStatus.DISCONNECTED);
                                }

                                console.log(`Retrying remote connection... Attempt ${retryCountRef.current + 1}`);
                                retryCountRef.current += 1;
                                retryTimeoutRef.current = setTimeout(initRemote, RETRY_DELAY);
                            }
                        } else {
                            // Non-transient errors (invalid-id, ssl-unavailable, server-error, browser-incompatible)
                            trackError("remote_peer_error", errType);
                            setStatus(ConnectionStatus.ERROR);
                        }
                    }
                });

                peer.on("disconnected", () => {
                    if (peer && !peer.destroyed && mountedRef.current) {
                        try {
                            peer.reconnect();
                        } catch (e) {
                            if (retryCountRef.current < MAX_RETRIES) {
                                retryCountRef.current += 1;
                                retryTimeoutRef.current = setTimeout(initRemote, RETRY_DELAY);
                            }
                        }
                    }
                    setErrorMessage(getP2pErrorMessage({ type: "disconnected" }, hostId));
                });
            } catch (e) {
                console.error("Remote Init Error", e);
                if (mountedRef.current) {
                    setStatus(ConnectionStatus.ERROR);
                    if (retryCountRef.current < MAX_RETRIES) {
                        retryCountRef.current += 1;
                        retryTimeoutRef.current = setTimeout(initRemote, RETRY_DELAY);
                    }
                }
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
