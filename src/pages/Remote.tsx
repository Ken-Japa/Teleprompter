import React, { useState, useMemo } from "react";
import { ConnectionStatus } from "../types";
import { useTranslation } from "../hooks/useTranslation";
import * as S from "../components/ui/Styled";
import { ConnectionState } from "../components/remote/ConnectionState";
import { useRemoteController } from "../hooks/useRemoteController";
import { useRemoteTextHandling } from "../hooks/useRemoteTextHandling";

import { RemoteControls } from "../components/remote/RemoteControls";
import { RemoteSettings } from "../components/remote/RemoteSettings";
import { RemoteNavigation } from "../components/remote/RemoteNavigation";
import { RemoteEditor } from "../components/remote/RemoteEditor";

interface RemoteProps {
    hostId: string;
}

// Simple Icons for tabs
const ControlIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const GearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const NavIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

export const Remote: React.FC<RemoteProps> = ({ hostId }) => {
    const { t, lang, setLang } = useTranslation();
    const { state, actions } = useRemoteController(hostId);
    const { status, isPlaying, speed, progress, errorMessage, settings, text, elapsedTime, navigationMap, isVoiceMode, isPro, isRecording, hasRecordedData } = state;

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

    if (status !== ConnectionStatus.CONNECTED) {
        return (
            <S.ScreenContainer className="bg-[#020617] min-h-screen h-[100dvh] flex flex-col">
                {errorMessage && <S.ErrorToast message={errorMessage} />}
                {/* Custom Header for Disconnected State - Matches Connected State Style */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between px-4 py-3">
                        <S.LogoText main={t("title.main")} sub={t("title.remote")} />
                        <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
                    </div>
                </div>
                {/* Spacer for Fixed Header */}
                <div className="h-[64px]"></div>

                <div className="flex-1 flex flex-col relative z-10">
                    <ConnectionState status={status} hostId={hostId} />
                </div>
            </S.ScreenContainer>
        );
    }

    return (
        <S.ScreenContainer className="bg-[#020617] min-h-screen h-[100dvh] flex flex-col">
            {errorMessage && <S.ErrorToast message={errorMessage} />}

            {/* Header & Navigation - FIXED */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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
                            <GearIcon />
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

            {/* Content Spacer for Fixed Header (approx height of header) */}
            <div className="h-[106px]"></div>

            <div className="flex-1 flex flex-col relative overflow-hidden z-10">

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
                        settings={settings}
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
