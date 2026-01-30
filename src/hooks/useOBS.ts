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

    const isMock = config.host.toLowerCase() === "simulation";

    const updateStatus = useCallback(async (obs?: OBSWebSocket) => {
        if (isMock) {
            setStatus({
                isConnected: true,
                isRecording: false,
                isStreaming: false,
                currentScene: "Main Scene",
                scenes: ["Main Scene", "Game + Cam", "Intro", "Ending"],
            });
            return;
        }

        if (!obs) return;
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
    }, [isMock]);

    const connect = useCallback(async () => {
        if (isMock) {
            setIsLoading(true);
            await new Promise(r => setTimeout(r, 800)); // Simulating lag
            await updateStatus();
            setIsLoading(false);
            return;
        }

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
    }, [config, updateStatus, isMock]);

    const disconnect = useCallback(() => {
        if (obsRef.current) {
            obsRef.current.disconnect();
            obsRef.current = null;
        }
        setStatus({ isConnected: false, isRecording: false, isStreaming: false, scenes: [] });
    }, []);

    const toggleRecord = useCallback(async () => {
        if (isMock) {
            setStatus(prev => ({ ...prev, isRecording: !prev.isRecording }));
            return;
        }
        if (!obsRef.current) return;
        try {
            await obsRef.current.call("ToggleRecord");
        } catch (err) {
            console.error("Failed to toggle OBS recording:", err);
        }
    }, [isMock]);

    const switchScene = useCallback(async (sceneName: string) => {
        if (isMock) {
            setStatus(prev => ({ ...prev, currentScene: sceneName }));
            return;
        }
        if (!obsRef.current) return;
        try {
            await obsRef.current.call("SetCurrentProgramScene", { sceneName });
        } catch (err) {
            console.error("Failed to switch OBS scene:", err);
        }
    }, [isMock]);

    useEffect(() => {
        localStorage.setItem("promptninja_obs_config", JSON.stringify(config));
    }, [config]);

    // Auto-cleanup
    useEffect(() => {
        return () => {
            if (obsRef.current) obsRef.current.disconnect();
        };
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    return {
        status,
        config,
        setConfig,
        connect,
        disconnect,
        toggleRecord,
        switchScene,
        obsRaw: obsRef.current,
        isLoadingSimulation: isLoading
    };
}

