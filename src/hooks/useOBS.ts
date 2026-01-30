import { useState, useCallback, useEffect, useRef } from "react";
import OBSWebSocket from "obs-websocket-js";

export interface OBSStatus {
    isConnected: boolean;
    isRecording: boolean;
    isStreaming: boolean;
    currentScene?: string;
    scenes: string[];
}

export interface OBSConfig {
    host: string;
    port: number;
    password?: string;
    autoRecordOnPlay: boolean;
    autoPlayOnOBSRecord: boolean;
}

const DEFAULT_CONFIG: OBSConfig = {
    host: "localhost",
    port: 4455,
    password: "",
    autoRecordOnPlay: false,
    autoPlayOnOBSRecord: false,
};

export function useOBS() {
    const [status, setStatus] = useState<OBSStatus>({
        isConnected: false,
        isRecording: false,
        isStreaming: false,
        scenes: [],
    });

    const [config, setConfig] = useState<OBSConfig>(() => {
        const saved = localStorage.getItem("promptninja_obs_config");
        return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    });

    const obsRef = useRef<OBSWebSocket | null>(null);

    const updateStatus = useCallback(async (obs: OBSWebSocket) => {
        try {
            const { outputActive: isRecording } = await obs.call("GetRecordStatus");
            const { outputActive: isStreaming } = await obs.call("GetStreamStatus");
            const { currentProgramSceneName } = await obs.call("GetCurrentProgramScene");
            const { scenes } = await obs.call("GetSceneList");

            setStatus({
                isConnected: true,
                isRecording,
                isStreaming,
                currentScene: currentProgramSceneName,
                scenes: scenes.map((s: any) => s.sceneName),
            });
        } catch (error) {
            console.error("Failed to update OBS status:", error);
        }
    }, []);

    const connect = useCallback(async () => {
        if (obsRef.current) await obsRef.current.disconnect();

        const obs = new OBSWebSocket();
        try {
            await obs.connect(`ws://${config.host}:${config.port}`, config.password);
            obsRef.current = obs;

            await updateStatus(obs);

            // Listeners
            obs.on("RecordStateChanged", (data) => {
                setStatus(prev => ({ ...prev, isRecording: data.outputActive }));
            });

            obs.on("StreamStateChanged", (data) => {
                setStatus(prev => ({ ...prev, isStreaming: data.outputActive }));
            });

            obs.on("CurrentProgramSceneChanged", (data) => {
                setStatus(prev => ({ ...prev, currentScene: data.sceneName }));
            });

        } catch (error) {
            console.error("OBS Connection Error:", error);
            setStatus(prev => ({ ...prev, isConnected: false }));
            throw error;
        }
    }, [config, updateStatus]);

    const disconnect = useCallback(() => {
        if (obsRef.current) {
            obsRef.current.disconnect();
            obsRef.current = null;
        }
        setStatus({ isConnected: false, isRecording: false, isStreaming: false, scenes: [] });
    }, []);

    const toggleRecord = useCallback(async () => {
        if (!obsRef.current) return;
        await obsRef.current.call("ToggleRecord");
    }, []);

    const switchScene = useCallback(async (sceneName: string) => {
        if (!obsRef.current) return;
        await obsRef.current.call("SetCurrentProgramScene", { sceneName });
    }, []);

    useEffect(() => {
        localStorage.setItem("promptninja_obs_config", JSON.stringify(config));
    }, [config]);

    // Auto-cleanup
    useEffect(() => {
        return () => {
            if (obsRef.current) obsRef.current.disconnect();
        };
    }, []);

    return {
        status,
        config,
        setConfig,
        connect,
        disconnect,
        toggleRecord,
        switchScene,
        obsRaw: obsRef.current
    };
}
