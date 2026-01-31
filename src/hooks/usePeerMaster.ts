import { useEffect, useRef, useState, useCallback } from "react";
import { Peer, DataConnection } from "peerjs";
import { ConnectionStatus, PeerMessage, MessageType } from "../types";
import { trackSuccessfulConnection, startUsageTracking, trackError, trackWarning } from "../utils/analytics";
import { PEER_CONFIG } from "../utils/peerConfig";

export interface ReceiverState {
    id: string;
    status: ConnectionStatus;
    textPreview?: string;
    scrollProgress?: number;
    lastSeen: number;
}

/**
 * Hook customizado para gerenciar múltiplas conexões P2P no Modo Master.
 * O Master é quem ativamente se conecta aos Receivers (Displays).
 */
export const usePeerMaster = () => {
    const [peerId, setPeerId] = useState<string>("");
    const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);

    // Persistent receiver tracking
    const [receivers, setReceivers] = useState<Record<string, ReceiverState>>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("promptninja_master_receivers");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Initialize as disconnected until we try to connect
                    Object.keys(parsed).forEach(id => {
                        parsed[id].status = ConnectionStatus.DISCONNECTED;
                    });
                    return parsed;
                } catch (e) { return {}; }
            }
        }
        return {};
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const peerRef = useRef<Peer | null>(null);
    const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
    const mountedRef = useRef<boolean>(true);

    // Persist receivers on change
    useEffect(() => {
        localStorage.setItem("promptninja_master_receivers", JSON.stringify(receivers));
    }, [receivers]);

    /**
     * Inicializa a instância do Peer para o Master.
     */
    useEffect(() => {
        mountedRef.current = true;

        const initPeer = () => {
            if (!mountedRef.current) return;

            try {
                // O Master normalmente deixa o PeerJS gerar um ID aleatório
                const peer = new Peer(PEER_CONFIG);
                peerRef.current = peer;

                peer.on("open", (id) => {
                    if (!mountedRef.current) return;
                    setPeerId(id);
                    setStatus(ConnectionStatus.CONNECTING); // Aguardando adicionar receivers
                    startUsageTracking();
                });

                peer.on("error", (err) => {
                    console.warn("Master Peer Error:", err);
                    setErrorMessage(`Erro no Master: ${err.type}`);
                    trackError("master_peer_error", err.type);
                });

                peer.on("disconnected", () => {
                    if (peer && !peer.destroyed) {
                        peer.reconnect();
                    }
                });
            } catch (e) {
                console.error("Master Peer Init Exception", e);
                setStatus(ConnectionStatus.ERROR);
            }
        };

        initPeer();

        return () => {
            mountedRef.current = false;
            if (peerRef.current) {
                peerRef.current.destroy();
                peerRef.current = null;
            }
            connectionsRef.current.forEach(conn => conn.close());
            connectionsRef.current.clear();
        };
    }, []);

    /**
     * Tenta se conectar a um Receiver específico.
     * @param targetPeerId O ID do Receiver (Display).
     */
    const connectToReceiver = useCallback((targetPeerId: string) => {
        if (!peerRef.current || !targetPeerId) return;

        // Prevent double connection if already open
        const existing = connectionsRef.current.get(targetPeerId);
        if (existing && existing.open) return;

        setReceivers(prev => ({
            ...prev,
            [targetPeerId]: prev[targetPeerId] || {
                id: targetPeerId,
                status: ConnectionStatus.CONNECTING,
                lastSeen: Date.now()
            },
            [targetPeerId]: {
                ...prev[targetPeerId],
                status: ConnectionStatus.CONNECTING
            }
        }));

        const conn = peerRef.current.connect(targetPeerId, { reliable: true });

        conn.on("open", () => {
            if (!mountedRef.current) return;
            connectionsRef.current.set(targetPeerId, conn);

            setReceivers(prev => ({
                ...prev,
                [targetPeerId]: {
                    ...prev[targetPeerId],
                    status: ConnectionStatus.CONNECTED,
                    lastSeen: Date.now()
                }
            }));

            setStatus(ConnectionStatus.CONNECTED);
            trackSuccessfulConnection();
        });

        conn.on("data", (data: any) => {
            if (!mountedRef.current) return;
            const msg = data as PeerMessage;

            // Handle Live Preview data from Receiver
            if (msg.type === MessageType.TEXT_UPDATE || msg.type === MessageType.SYNC_STATE) {
                setReceivers(prev => ({
                    ...prev,
                    [targetPeerId]: {
                        ...prev[targetPeerId],
                        textPreview: msg.payload?.text || (typeof msg.payload === 'string' ? msg.payload : prev[targetPeerId].textPreview),
                        scrollProgress: msg.payload?.progress ?? prev[targetPeerId].scrollProgress,
                        lastSeen: Date.now()
                    }
                }));
            }
        });

        conn.on("close", () => {
            connectionsRef.current.delete(targetPeerId);
            setReceivers(prev => ({
                ...prev,
                [targetPeerId]: {
                    ...prev[targetPeerId],
                    status: ConnectionStatus.DISCONNECTED
                }
            }));

            const stillConnected = Array.from(connectionsRef.current.values()).some(c => c.open);
            if (!stillConnected) {
                setStatus(ConnectionStatus.CONNECTING);
            }
        });

        conn.on("error", (err) => {
            console.warn(`Error connecting to ${targetPeerId}:`, err);
            trackError("master_conn_error", err.message);
            setReceivers(prev => ({
                ...prev,
                [targetPeerId]: {
                    ...prev[targetPeerId],
                    status: ConnectionStatus.ERROR
                }
            }));
        });
    }, []);

    // Auto-reconnect to previous receivers when peer is ready
    useEffect(() => {
        if (peerId && status !== ConnectionStatus.ERROR) {
            Object.keys(receivers).forEach(id => {
                if (receivers[id].status === ConnectionStatus.DISCONNECTED) {
                    connectToReceiver(id);
                }
            });
        }
    }, [peerId]);

    /**
     * Envia mensagem para todos os displays conectados simultaneamente.
     */
    const broadcast = useCallback((type: MessageType, payload?: any) => {
        const msg: PeerMessage = { type, payload, timestamp: Date.now() };
        connectionsRef.current.forEach((conn) => {
            if (conn.open) {
                try {
                    conn.send(msg);
                } catch (e) {
                    console.warn(`Failed to broadcast to ${conn.peer}`, e);
                    trackWarning("master_broadcast_fail", conn.peer);
                }
            } else {
                trackWarning("master_broadcast_closed_chan", conn.peer);
            }
        });
    }, []);

    /**
     * Envia mensagem para um único display específico.
     */
    const sendTo = useCallback((targetPeerId: string, type: MessageType, payload?: any) => {
        const conn = connectionsRef.current.get(targetPeerId);
        if (conn && conn.open) {
            const msg: PeerMessage = { type, payload, timestamp: Date.now() };
            try {
                conn.send(msg);
            } catch (e) {
                console.warn(`Failed to send to ${targetPeerId}`, e);
                trackWarning("master_send_to_fail", targetPeerId);
            }
        } else {
            trackWarning("master_send_to_not_found", targetPeerId);
        }
    }, []);

    /**
     * Remove um receiver da lista e limpa persistência.
     */
    const removeReceiver = useCallback((targetPeerId: string) => {
        const conn = connectionsRef.current.get(targetPeerId);
        if (conn) conn.close();

        setReceivers(prev => {
            const next = { ...prev };
            delete next[targetPeerId];
            return next;
        });

        connectionsRef.current.delete(targetPeerId);
    }, []);

    return {
        peerId,
        status,
        receivers: Object.values(receivers),
        errorMessage,
        connectToReceiver,
        broadcast,
        sendTo,
        removeReceiver
    };
};
