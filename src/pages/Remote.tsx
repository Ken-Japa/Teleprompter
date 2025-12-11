import React, { useState, useMemo, useRef } from "react";
import { ConnectionStatus, Theme } from "../types";
import { PROMPTER_DEFAULTS } from "../config/constants";
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon, StopIcon, MicIcon, LaptopIcon, SmartphoneIcon } from "../components/ui/Icons";
import { useTranslation } from "../hooks/useTranslation";
import * as S from "../components/ui/Styled";
import { Trackpad } from "../components/remote/Trackpad";
import { ConnectionState } from "../components/remote/ConnectionState";
import { useRemoteController } from "../hooks/useRemoteController";
import { SyncButton } from "../components/ui/SyncButton";
import { ColorMenu } from "../components/ui/ColorMenu";
import { insertTagInText } from "../utils/editorHelpers";

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

    // Local state for scrubbing to prevent jitter
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

    const remoteTextAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleRemoteInsertTag = (tag: string) => {
        const textarea = remoteTextAreaRef.current;
        if (!textarea) return;

        const result = insertTagInText(textarea.value, tag, textarea.selectionStart, textarea.selectionEnd);
        actions.handleTextChange(result.newText);

        setTimeout(() => {
            if (remoteTextAreaRef.current) {
                remoteTextAreaRef.current.focus();
                const start = Math.max(0, result.newSelectionStart);
                const end = Math.max(0, result.newSelectionEnd);
                remoteTextAreaRef.current.setSelectionRange(start, end);
            }
        }, 0);
    };

    // Parse text for Navigation
    const textSegments = useMemo(() => {
        // Priority: Use Host-provided Navigation Map
        if (navigationMap && navigationMap.length > 0) {
            return navigationMap.map(item => ({
                id: item.id,
                text: item.label || "...",
                progress: item.progress
            }));
        }

        if (!text) return [];

        // Heuristic: 
        // A visual line takes up vertical space. We estimate visual lines based on character count wrapping.
        // Assuming ~50 chars per visual line on average.
        const CHARS_PER_VISUAL_LINE = 50;
        const WEIGHT_PER_VISUAL_LINE = 100;

        const getLineWeight = (line: string) => {
            const length = line.length;
            // Minimum 1 visual line, even if empty (it's a newline)
            const visualLines = Math.max(1, Math.ceil(length / CHARS_PER_VISUAL_LINE));
            return visualLines * WEIGHT_PER_VISUAL_LINE;
        };

        const lines = text.split('\n');
        const totalVisualWeight = lines.reduce((acc, line) => acc + getLineWeight(line), 0);

        const segments: { id: number | string; text: string; progress: number }[] = [];
        let currentWeight = 0;
        let charIndex = 0;

        lines.forEach((line, index) => {
            const weight = getLineWeight(line);

            // Only add navigable segments for non-empty lines
            if (line.trim().length > 0) {
                segments.push({
                    id: `heuristic-${index}`,
                    text: line,
                    progress: currentWeight / totalVisualWeight
                });
            }

            currentWeight += weight;
            charIndex += line.length + 1; // +1 for newline
        });

        return segments;
    }, [text, navigationMap]);


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

                <div className="flex-1 flex flex-col relative overflow-hidden z-10">
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
                        >
                            {isPlaying ? <PauseIcon className="w-4 h-4 fill-current" /> : <PlayIcon className="w-4 h-4 fill-current ml-0.5" />}
                        </button>
                    </div>

                    <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
                        <button onClick={() => setActiveTab('control')} className={`p-2 rounded-md transition-all ${activeTab === 'control' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                            <ControlIcon />
                        </button>
                        <button onClick={() => setActiveTab('nav')} className={`p-2 rounded-md transition-all ${activeTab === 'nav' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                            <NavIcon />
                        </button>
                        <button onClick={() => setActiveTab('edit')} className={`p-2 rounded-md transition-all ${activeTab === 'edit' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                            <EditIcon />
                        </button>
                        <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-md transition-all ${activeTab === 'settings' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
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
                        />
                    </div>
                </div>
            </div>

            {/* Content Spacer for Fixed Header (approx height of header) */}
            <div className="h-[106px]"></div>

            <div className="flex-1 flex flex-col relative overflow-hidden z-10">

                {/* CONTROL TAB */}
                {activeTab === 'control' && (
                    <>
                        {/* Timer Display - Moved UP */}
                        <div className="flex justify-center pt-6 pb-4">
                            <div className="bg-slate-900/50 px-6 py-2 rounded-xl border border-white/5 shadow-lg">
                                <span className="font-mono text-4xl font-black text-brand-400 tracking-widest drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">{formattedTime}</span>
                            </div>
                        </div>

                        {/* Text Preview Window */}
                        <div className="mx-6 mb-4 h-24 bg-slate-900/80 rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center shadow-inner">
                            {/* Simple gradient masks */}
                            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-900 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none"></div>

                            {/* We estimate the current text based on progress */}
                            <div className="absolute inset-0 flex items-center px-4 opacity-70">
                                <p className="text-xs text-slate-300 font-mono leading-relaxed text-center w-full line-clamp-5">
                                    {/* Priority: Navigation Map > Heuristic */}
                                    {(() => {
                                        if (!text) return "No text loaded";

                                        // 1. Try to find current segment from Navigation Map
                                        if (navigationMap && navigationMap.length > 0) {
                                            // Find the segment that starts <= current progress
                                            // We iterate backwards or findLast to get the closest preceding segment
                                            // Since map is sorted by progress (usually), we can find the last one that fits.
                                            let currentSegment = navigationMap[0];
                                            for (let i = 0; i < navigationMap.length; i++) {
                                                if (navigationMap[i].progress <= localProgress) {
                                                    currentSegment = navigationMap[i];
                                                } else {
                                                    break;
                                                }
                                            }

                                            // If we found a segment, try to show it plus a bit of the next one
                                            if (currentSegment) {
                                                // We might want to show a bit of context around the current progress
                                                // But showing the segment text is safer than raw slicing if we want sentence alignment.
                                                // However, segments might be short.
                                                // Let's refine: If we are very close to the next segment, show that too.
                                                return currentSegment.label;
                                            }
                                        }

                                        // 2. Fallback Heuristic (Refined)
                                        // The offset needs to be dynamic or just better tuned.
                                        // If 48 was too little (too close), we need to look further ahead.
                                        // User said "some parts that passed still appear", which means we are showing text BEHIND the focus line.
                                        // So we need to advance the window forward.
                                        const offset = 350; // Increased lookahead significantly
                                        const centerIdx = Math.min(text.length, Math.floor(text.length * localProgress) + offset);
                                        const start = Math.max(0, centerIdx - 100);
                                        const end = Math.min(text.length, centerIdx + 100);
                                        return "..." + text.substring(start, end).replace(/\n/g, ' ') + "...";
                                    })()}
                                </p>
                            </div>
                        </div>

                        {/* Dedicated Trackpad Window */}
                        <div className="mx-6 mb-4 flex-1 min-h-[100px] bg-slate-800/30 rounded-xl border border-white/5 relative overflow-hidden backdrop-blur-sm shadow-inner flex flex-col">
                            <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
                            <Trackpad
                                label={t("remote.touchArea")}
                                onDelta={actions.handleTrackpadDelta}
                                onStop={actions.handleTrackpadStop}
                            />
                        </div>

                        <S.ControlsContainer>
                            <div className="flex items-center justify-between px-6 pb-safe gap-6">
                                {/* Speed Control */}
                                <div className="flex flex-col items-center bg-white/5 p-3 rounded-3xl border border-white/5 backdrop-blur-md">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t("remote.speed")}</span>
                                    <div className="flex flex-col items-center gap-2">
                                        <S.IconButton onClick={() => actions.handleSpeedChange(Math.min(10, speed + 0.5))} className="w-12 h-12 !rounded-2xl !bg-white/10 hover:!bg-white/20 border-white/10"><PlusIcon /></S.IconButton>
                                        <span className="font-mono text-2xl font-black text-brand-400 min-w-[3ch] text-center my-1 drop-shadow-md">{speed.toFixed(1)}</span>
                                        <S.IconButton onClick={() => actions.handleSpeedChange(Math.max(0, speed - 0.5))} className="w-12 h-12 !rounded-2xl !bg-white/10 hover:!bg-white/20 border-white/10"><MinusIcon /></S.IconButton>
                                    </div>
                                </div>

                                {/* Play/Stop Controls */}
                                <div className="flex-1 flex flex-col gap-4 h-44">
                                    {/* Play Button */}
                                    <button
                                        onClick={actions.handlePlayToggle}
                                        className={`flex-1 rounded-[2rem] shadow-2xl transition-all duration-300 active:scale-95 border-t border-white/10 flex flex-col items-center justify-center gap-2 relative overflow-hidden group ${isPlaying ? "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-[0_0_60px_-10px_rgba(245,158,11,0.4)]" : "bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/40 hover:shadow-brand-600/60"}`}
                                    >
                                        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40"></div>
                                        <div className="relative z-10 flex flex-col items-center">
                                            {isPlaying ? <PauseIcon className="w-12 h-12 fill-current drop-shadow-lg" /> : <PlayIcon className="w-12 h-12 fill-current ml-1 drop-shadow-lg" />}
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{isPlaying ? t("remote.pause") : t("remote.start")}</span>
                                        </div>
                                    </button>

                                    {/* Stop & Voice Buttons */}
                                    <div className="flex gap-3 h-14">
                                        {/* Recording Controls Group */}
                                        <div className={`flex items-center ${hasRecordedData ? "w-28" : "w-20"} h-full bg-slate-800/50 rounded-2xl border border-slate-700 p-1 gap-1 transition-all`}>
                                            {hasRecordedData ? (
                                                <>
                                                    <button
                                                        onClick={actions.downloadRecording}
                                                        className="flex-1 h-full rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 flex items-center justify-center"
                                                        title="Download Recording"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => actions.handleToggleRecording()} // Start new
                                                        className="w-8 h-full rounded-xl hover:bg-white/10 text-slate-400 flex items-center justify-center"
                                                        title="Record New"
                                                    >
                                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={actions.handleToggleRecordingMode}
                                                        className="w-8 h-full rounded-xl hover:bg-white/10 text-slate-400 flex items-center justify-center"
                                                        title={settings?.recordingMode === "remote" ? "Record on Remote" : "Record on Host"}
                                                    >
                                                        {settings?.recordingMode === "remote" ? <SmartphoneIcon className="w-4 h-4" /> : <LaptopIcon className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => actions.handleToggleRecording()}
                                                        className={`flex-1 h-full rounded-xl flex items-center justify-center gap-1 transition-all ${isRecording ? "bg-red-500 text-white animate-pulse" : "hover:bg-white/5"}`}
                                                    >
                                                        <div className={`w-3 h-3 rounded-full transition-all ${isRecording ? "bg-white rounded-sm scale-75" : "bg-red-500"}`}></div>
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={actions.handleToggleVoice}
                                            className={`w-14 h-full rounded-2xl border transition-all flex items-center justify-center ${isVoiceMode ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse" : "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 text-purple-400"}`}
                                            title="Toggle Voice Control"
                                        >
                                            <MicIcon className="w-6 h-6" />
                                        </button>

                                        <button
                                            onClick={() => actions.handleStop()}
                                            className="flex-1 h-full rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <StopIcon className="w-5 h-5 fill-current" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </S.ControlsContainer>
                    </>
                )}

                {/* NAV TAB */}
                {activeTab === 'nav' && (
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
                        <div className="space-y-2 pb-safe">
                            {textSegments.length === 0 && (
                                <div className="text-slate-500 text-center mt-10">No text content available.</div>
                            )}
                            {textSegments.map((seg) => (
                                <button
                                    key={seg.id}
                                    onClick={() => {
                                        actions.handleScrollTo(seg.progress);
                                        // Optional: Auto-switch back to control? 
                                        // setActiveTab('control'); 
                                    }}
                                    className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 hover:border-brand-500/50 transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-[10px] font-mono text-slate-500 mt-1 w-8 text-right">{(seg.progress * 100).toFixed(0)}%</span>
                                        <p className="text-sm text-slate-300 font-medium line-clamp-2 group-hover:text-white">{seg.text}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* EDIT TAB */}
                {activeTab === 'edit' && (
                    <div className="flex-1 flex flex-col p-4 bg-slate-950 overflow-hidden">
                        <div className="mb-4">
                            <ColorMenu onInsertTag={handleRemoteInsertTag} />
                        </div>
                        <textarea
                            ref={remoteTextAreaRef}
                            value={text}
                            onChange={(e) => actions.handleTextChange(e.target.value)}
                            className="flex-1 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-brand-500 resize-none h-full"
                            placeholder="Enter your script here..."
                        />
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && !settings && (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Waiting for host settings...
                    </div>
                )}
                {activeTab === 'settings' && settings && (
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">

                        {/* Font Size */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest font-bold">
                                <span>{t("host.controls.fontSize")}</span>
                                <span>{settings.fontSize}px</span>
                            </div>
                            <input
                                type="range" min="20" max="200" step="4"
                                value={settings.fontSize}
                                onChange={(e) => actions.handleSettingsChange({ fontSize: parseInt(e.target.value) })}
                                className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-500"
                            />
                        </div>

                        {/* Voice Control Mode */}
                        {isPro && (
                            <div className="space-y-3">
                                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("host.controls.voice") || "Voice Control"}</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => actions.handleSettingsChange({ voiceControlMode: 'host' })}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${settings.voiceControlMode === 'host' || !settings.voiceControlMode ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                                    >
                                        <LaptopIcon className="w-6 h-6" />
                                        <div className="font-bold text-xs">Host Control</div>
                                    </button>
                                    <button
                                        onClick={() => actions.handleSettingsChange({ voiceControlMode: 'remote' })}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${settings.voiceControlMode === 'remote' ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                                    >
                                        <SmartphoneIcon className="w-6 h-6" />
                                        <div className="font-bold text-xs">Remote Control</div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Margin */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest font-bold">
                                <span>{t("host.controls.margin")}</span>
                                <span>{settings.margin}%</span>
                            </div>
                            <input
                                type="range" min="0" max="40" step="1"
                                value={settings.margin}
                                onChange={(e) => actions.handleSettingsChange({ margin: parseInt(e.target.value) })}
                                className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-500"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => actions.handleSettingsChange({ isMirrored: !settings.isMirrored })}
                                className={`p-4 rounded-xl border ${settings.isMirrored ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                            >
                                <div className="font-bold mb-1">{t("host.mirror")}</div>
                                <div className="text-xs opacity-60">{settings.isMirrored ? 'ON' : 'OFF'}</div>
                            </button>

                            <button
                                onClick={() => actions.handleSettingsChange({ isFlipVertical: !settings.isFlipVertical })}
                                className={`p-4 rounded-xl border ${settings.isFlipVertical ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                            >
                                <div className="font-bold mb-1">{t("host.mirrorV")}</div>
                                <div className="text-xs opacity-60">{settings.isFlipVertical ? 'ON' : 'OFF'}</div>
                            </button>

                            <button
                                onClick={() => actions.handleSettingsChange({ isUpperCase: !settings.isUpperCase })}
                                className={`p-4 rounded-xl border ${settings.isUpperCase ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                            >
                                <div className="font-bold mb-1">{t("host.controls.caps")}</div>
                                <div className="text-xs opacity-60">{settings.isUpperCase ? 'ON' : 'OFF'}</div>
                            </button>

                            <button
                                onClick={() => actions.handleSettingsChange({ isFocusMode: !settings.isFocusMode })}
                                className={`p-4 rounded-xl border ${settings.isFocusMode ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                            >
                                <div className="font-bold mb-1">{t("host.controls.focusLine")}</div>
                                <div className="text-xs opacity-60">{settings.isFocusMode ? 'ON' : 'OFF'}</div>
                            </button>
                        </div>

                        {/* Themes */}
                        <div className="space-y-3">
                            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("remote.theme")}</div>
                            <div className="grid grid-cols-3 gap-3">
                                {PROMPTER_DEFAULTS.STANDARD_THEMES.map(themeOption => (
                                    <button
                                        key={themeOption}
                                        onClick={() => actions.handleSettingsChange({ theme: themeOption })}
                                        className={`p-3 rounded-lg border text-xs font-bold capitalize ${settings.theme === themeOption ? 'bg-white text-black border-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                                    >
                                        {themeOption === Theme.DEFAULT ? "Ninja" : themeOption}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chroma Key */}
                        <div className="space-y-3">
                            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Chroma Key</div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => actions.handleSettingsChange({ theme: Theme.CHROMA_GREEN })}
                                    className={`p-3 rounded-lg border text-xs font-bold capitalize flex items-center justify-center gap-2 ${settings.theme === Theme.CHROMA_GREEN ? 'bg-[#00b140] text-white border-white' : 'bg-[#00b140]/10 border-[#00b140]/30 text-[#00b140]'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full border ${settings.theme === Theme.CHROMA_GREEN ? 'bg-white border-transparent' : 'bg-[#00b140] border-transparent'}`}></div>
                                    Green Screen
                                </button>
                                <button
                                    onClick={() => actions.handleSettingsChange({ theme: Theme.CHROMA_BLUE })}
                                    className={`p-3 rounded-lg border text-xs font-bold capitalize flex items-center justify-center gap-2 ${settings.theme === Theme.CHROMA_BLUE ? 'bg-[#0047bb] text-white border-white' : 'bg-[#0047bb]/10 border-[#0047bb]/30 text-[#0047bb]'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full border ${settings.theme === Theme.CHROMA_BLUE ? 'bg-white border-transparent' : 'bg-[#0047bb] border-transparent'}`}></div>
                                    Blue Screen
                                </button>
                            </div>
                        </div>

                        {/* Connection Sync */}
                        <div className="space-y-3">
                            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("common.sync") || "Sync"}</div>
                            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <span className="text-sm font-medium text-slate-300">{t("common.refresh") || "Refresh Connection"}</span>
                                <SyncButton onSync={actions.handleRequestSync} className="!w-10 !h-10 !bg-slate-800 hover:!bg-slate-700" />
                            </div>
                        </div>

                        {/* Language */}
                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("remote.language")}</div>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => setLang('en')}
                                    className={`p-3 rounded-lg border text-xs font-bold ${lang === 'en' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLang('pt')}
                                    className={`p-3 rounded-lg border text-xs font-bold ${lang === 'pt' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                                >
                                    Português
                                </button>
                                <button
                                    onClick={() => setLang('es')}
                                    className={`p-3 rounded-lg border text-xs font-bold ${lang === 'es' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                                >
                                    Español
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'settings' && !settings && (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        Waiting for host settings...
                    </div>
                )}
            </div>
        </S.ScreenContainer>
    );
};
