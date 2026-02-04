import React, { useState, useMemo } from "react";
import { ConnectionStatus } from "../types";
import { trackRemoteConnected } from "../utils/analytics";
import { useTranslation } from "../hooks/useTranslation";
import * as S from "../components/ui/Styled";
import { ConnectionState } from "../components/remote/ConnectionState";
import { useRemoteController } from "../hooks/useRemoteController";
import { useRemoteTextHandling } from "../hooks/useRemoteTextHandling";
import { ControlIcon, EditIcon, SettingsIcon, NavIcon, PlayIcon, PauseIcon } from "../components/ui/Icons";
import { useScriptStorage } from "../hooks/useScriptStorage";

import { RemoteControls } from "../components/remote/RemoteControls";
import { RemoteSettings } from "../components/remote/RemoteSettings";
import { RemoteNavigation } from "../components/remote/RemoteNavigation";
import { RemoteEditor } from "../components/remote/RemoteEditor";

interface RemoteProps {
    hostId: string;
}

export const Remote: React.FC<RemoteProps> = ({ hostId }) => {
    const { t, lang, setLang } = useTranslation();
    const { state, actions } = useRemoteController(hostId);
    const { status, isPlaying, speed, progress, errorMessage, settings, text, elapsedTime, navigationMap, isVoiceMode, isPro, isRecording, hasRecordedData } = state;

    // Local script management (can be synced with host via WebRTC in the future)
    const { scripts, activeScriptId, createScript, switchScript, deleteScript, updateScript } = useScriptStorage();

    const [activeTab, setActiveTab] = useState<'control' | 'edit' | 'settings' | 'nav'>('control');

    // Local state for scrubbing to prevent jitter (could be moved to a custom hook if needed)
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [localProgress, setLocalProgress] = useState(progress);

    // Sync local progress with remote progress when not scrubbing
    React.useEffect(() => {
        if (!isScrubbing) {
            setLocalProgress(progress);
        }
    }, [progress, isScrubbing]);

    // Format Timer
    const formattedTime = useMemo(() => {
        if (elapsedTime === undefined) return "00:00";
        const mins = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
        const secs = (elapsedTime % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    }, [elapsedTime]);

    // Hook for text logic
    const { textSegments } = useRemoteTextHandling(text, navigationMap);

    // Track connection
    React.useEffect(() => {
        if (status === ConnectionStatus.CONNECTED) {
            trackRemoteConnected('remote');
        }
    }, [status]);

    if (status !== ConnectionStatus.CONNECTED) {
        return (
            <S.ScreenContainer className="bg-slate-950 h-screen h-[100dvh] flex flex-col overflow-hidden pb-safe px-safe">
                {errorMessage && <S.ErrorToast message={errorMessage} />}
                {/* Custom Header for Disconnected State - Matches Connected State Style */}
                <div className="flex-none bg-slate-950/90 backdrop-blur-xl border-b border-white/5 pt-safe">
                    <div className="flex items-center justify-between px-4 py-3">
                        <S.LogoText main={t("title.main")} sub={t("title.remote")} />
                        <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative min-h-0">
                    <ConnectionState status={status} hostId={hostId} />
                </div>
            </S.ScreenContainer>
        );
    }

    return (
        <S.ScreenContainer className="bg-slate-950 h-screen h-[100dvh] flex flex-col overflow-hidden pb-safe px-safe">
            {errorMessage && <S.ErrorToast message={errorMessage} />}

            {/* Header & Navigation - FIXED */}
            <div className="flex-none bg-slate-950/90 backdrop-blur-xl border-b border-white/5 pt-safe">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
                        {/* Quick Play/Pause in Header */}
                        <button
                            onClick={actions.handlePlayToggle}
                            className={`p-2 rounded-full ${isPlaying ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50' : 'bg-brand-500/20 text-brand-500 border border-brand-500/50'} transition-all active:scale-95`}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <PauseIcon />
                            ) : (
                                <PlayIcon />
                            )}
                        </button>
                    </div>

                    <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
                        <button onClick={() => setActiveTab('control')} className={`p-2 rounded-md transition-all ${activeTab === 'control' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`} aria-label="Controls Tab">
                            <ControlIcon />
                        </button>
                        <button onClick={() => setActiveTab('nav')} className={`p-2 rounded-md transition-all ${activeTab === 'nav' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`} aria-label="Navigation Tab">
                            <NavIcon />
                        </button>
                        <button onClick={() => setActiveTab('edit')} className={`p-2 rounded-md transition-all ${activeTab === 'edit' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`} aria-label="Editor Tab">
                            <EditIcon />
                        </button>
                        <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-md transition-all ${activeTab === 'settings' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`} aria-label="Settings Tab">
                            <SettingsIcon />
                        </button>
                    </div>
                </div>

                {/* Progress Bar / Scrubber */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-slate-500">{Math.round(localProgress * 100)}%</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.001"
                            value={localProgress}
                            onPointerDown={() => setIsScrubbing(true)}
                            onPointerUp={() => setIsScrubbing(false)}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setLocalProgress(val);
                                actions.handleScrollTo(val);
                            }}
                            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                            aria-label="Seek Progress"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col relative overflow-hidden min-h-0">

                {/* CONTROL TAB */}
                {activeTab === 'control' && (
                    <RemoteControls
                        formattedTime={formattedTime}
                        text={text}
                        navigationMap={navigationMap}
                        localProgress={localProgress}
                        speed={speed}
                        isPlaying={isPlaying}
                        hasRecordedData={hasRecordedData}
                        isRecording={isRecording}
                        isVoiceMode={isVoiceMode}
                        settings={settings ?? undefined}
                        actions={actions}
                    />
                )}

                {/* NAV TAB */}
                {activeTab === 'nav' && (
                    <RemoteNavigation
                        textSegments={textSegments}
                        actions={actions}
                    />
                )}

                {/* EDIT TAB */}
                {activeTab === 'edit' && (
                    <RemoteEditor
                        text={text}
                        actions={actions}
                        isBilingualMode={settings?.isBilingualMode}
                        scripts={scripts}
                        activeScriptId={activeScriptId}
                        onSwitchScript={switchScript}
                        onCreateScript={createScript}
                        onDeleteScript={deleteScript}
                        onUpdateScript={updateScript}
                    />
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <RemoteSettings
                        settings={settings || null}
                        actions={actions}
                        lang={lang}
                        setLang={(l) => setLang(l as any)}
                        isPro={isPro}
                    />
                )}
            </div>
        </S.ScreenContainer>
    );
};
