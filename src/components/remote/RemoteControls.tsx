import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon, StopIcon, MicIcon, LaptopIcon, SmartphoneIcon, ChevronUpIcon, ChevronDownIcon } from "../ui/Icons";
import { Trackpad } from "./Trackpad";
import * as S from "../ui/Styled";
import { NavigationItem, PrompterSettings, RemoteActions } from "../../types";

interface RemoteControlsProps {
    formattedTime: string;
    text: string;
    navigationMap?: NavigationItem[];
    localProgress: number;
    speed: number;
    isPlaying: boolean;
    hasRecordedData: boolean;
    isRecording: boolean;
    isVoiceMode: boolean;
    settings?: PrompterSettings;
    actions: RemoteActions;
}

export const RemoteControls: React.FC<RemoteControlsProps> = ({
    formattedTime,
    text,
    navigationMap,
    localProgress,
    speed,
    isPlaying,
    hasRecordedData,
    isRecording,
    isVoiceMode,
    settings,
    actions
}) => {
    const { t } = useTranslation();

    // Check for Parts/Slides
    const hasParts = React.useMemo(() => {
        if (!text) return false;
        const upper = text.toUpperCase();
        return upper.includes("[PART") || upper.includes("[SLIDE");
    }, [text]);

    // Helper to get text preview (reused logic)
    const getTextPreview = () => {
        // Handle Bilingual Mode
        if (settings?.isBilingualMode && settings?.bilingualConfig) {
            const primary = settings.bilingualConfig.primaryText || "";
            // Use primary text for preview
            if (!primary) return "Bilingual Mode - No text loaded";

            const offset = 350;
            const centerIdx = Math.min(primary.length, Math.floor(primary.length * localProgress) + offset);
            const start = Math.max(0, centerIdx - 100);
            const end = Math.min(primary.length, centerIdx + 100);
            return "..." + primary.substring(start, end).replace(/\n/g, ' ') + "...";
        }

        if (!text) return "No text loaded";

        // 1. Try to find current segment from Navigation Map
        if (navigationMap && navigationMap.length > 0) {
            let currentSegment = navigationMap[0];
            for (let i = 0; i < navigationMap.length; i++) {
                if (navigationMap[i].progress <= localProgress) {
                    currentSegment = navigationMap[i];
                } else {
                    break;
                }
            }
            if (currentSegment) {
                return currentSegment.label;
            }
        }

        // 2. Fallback Heuristic
        const offset = 350;
        const centerIdx = Math.min(text.length, Math.floor(text.length * localProgress) + offset);
        const start = Math.max(0, centerIdx - 100);
        const end = Math.min(text.length, centerIdx + 100);
        return "..." + text.substring(start, end).replace(/\n/g, ' ') + "...";
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            {/* Timer Display & Navigation */}
            <div className="relative flex justify-center items-center pt-3 pb-2 px-4 flex-none gap-3">
                <div className="bg-slate-900/50 px-6 py-2 rounded-xl border border-white/5 shadow-lg z-10">
                    <span className="font-mono text-4xl font-black text-brand-400 tracking-widest drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
                        {formattedTime}
                    </span>
                </div>

                {hasParts && (
                    <div className="flex bg-slate-900/30 rounded-full p-1 border border-white/5 items-center gap-1">
                        <S.IconButton
                            onClick={actions.handlePreviousPart}
                            className="w-9 h-9 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
                            aria-label="Previous Part"
                        >
                            <ChevronUpIcon className="w-5 h-5" />
                        </S.IconButton>
                        <S.IconButton
                            onClick={actions.handleNextPart}
                            className="w-9 h-9 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
                            aria-label="Next Part"
                        >
                            <ChevronDownIcon className="w-5 h-5" />
                        </S.IconButton>
                    </div>
                )}
            </div>

            {/* Text Preview Window */}
            <div className="mx-4 mb-2 h-20 bg-slate-900/80 rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center shadow-inner flex-none" aria-label="Text Preview">
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none"></div>

                <div className="absolute inset-0 flex items-center px-4 opacity-70">
                    <p className="text-xs text-slate-300 font-mono leading-relaxed text-center w-full line-clamp-4">
                        {getTextPreview()}
                    </p>
                </div>
            </div>

            {/* Dedicated Trackpad Window */}
            <div className="mx-4 mb-2 flex-1 min-h-[80px] bg-slate-800/30 rounded-xl border border-white/5 relative overflow-hidden backdrop-blur-sm shadow-inner flex flex-col">
                <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
                <Trackpad
                    label={t("remote.touchArea")}
                    onDelta={actions.handleTrackpadDelta}
                    onStop={actions.handleTrackpadStop}
                />
            </div>

            <S.ControlsContainer>
                <div className="flex items-center justify-between px-4 pb-4 gap-3">
                    {/* Speed Control */}
                    <div className="flex flex-col items-center bg-white/5 p-2 rounded-3xl border border-white/5 backdrop-blur-md">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">SPEED</span>
                        <div className="flex flex-col items-center gap-1">
                            <S.IconButton
                                onClick={() => actions.handleSpeedChange(Math.min(10, speed + 0.5))}
                                className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border-white/10"
                                aria-label="Increase Speed"
                            >
                                <PlusIcon />
                            </S.IconButton>
                            <span className="font-mono text-2xl font-black text-brand-400 min-w-[3ch] text-center my-0.5 drop-shadow-md">{speed.toFixed(1)}</span>
                            <S.IconButton
                                onClick={() => actions.handleSpeedChange(Math.max(0, speed - 0.5))}
                                className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border-white/10"
                                aria-label="Decrease Speed"
                            >
                                <MinusIcon />
                            </S.IconButton>
                        </div>
                    </div>

                    {/* Play/Stop Controls */}
                    <div className="flex-1 flex flex-col gap-2 h-40">
                        {/* Play Button */}
                        <button
                            onClick={actions.handlePlayToggle}
                            className={`flex-1 rounded-[2rem] shadow-2xl transition-all duration-300 active:scale-95 border-t border-white/10 flex flex-col items-center justify-center gap-2 relative overflow-hidden group ${isPlaying ? "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-[0_0_60px_-10px_rgba(245,158,11,0.4)]" : "bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/40 hover:shadow-brand-600/60"}`}
                            aria-label={isPlaying ? "Pause Teleprompter" : "Start Teleprompter"}
                        >
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40"></div>
                            <div className="relative z-10 flex flex-col items-center">
                                {isPlaying ? <PauseIcon className="w-12 h-12 fill-current drop-shadow-lg" /> : <PlayIcon className="w-12 h-12 fill-current ml-1 drop-shadow-lg" />}
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{isPlaying ? t("remote.pause") : t("remote.start")}</span>
                            </div>
                        </button>

                        {/* Stop & Voice Buttons */}
                        <div className="flex gap-2 h-14">
                            {/* Recording Controls Group */}
                            <div className={`flex items-center ${hasRecordedData ? "w-28" : "w-20"} h-full bg-slate-800/50 rounded-2xl border border-slate-700 p-1 gap-1 transition-all`}>
                                {hasRecordedData ? (
                                    <>
                                        <button
                                            onClick={actions.downloadRecording}
                                            className="flex-1 h-full rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 flex items-center justify-center"
                                            title="Download Recording"
                                            aria-label="Download Recording"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        </button>
                                        <button
                                            onClick={() => actions.handleToggleRecording()} // Start new
                                            className="w-8 h-full rounded-xl hover:bg-white/10 text-slate-400 flex items-center justify-center"
                                            title="Record New"
                                            aria-label="Discard and Record New"
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
                                            aria-label={settings?.recordingMode === "remote" ? "Switch to Host Recording" : "Switch to Remote Recording"}
                                        >
                                            {settings?.recordingMode === "remote" ? <SmartphoneIcon className="w-4 h-4" /> : <LaptopIcon className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => actions.handleToggleRecording()}
                                            className={`flex-1 h-full rounded-xl flex items-center justify-center gap-1 transition-all ${isRecording ? "bg-red-500 text-white animate-pulse" : "hover:bg-white/5"}`}
                                            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
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
                                aria-label={isVoiceMode ? "Disable Voice Control" : "Enable Voice Control"}
                            >
                                <MicIcon className="w-6 h-6" />
                            </button>

                            <button
                                onClick={() => actions.handleStop()}
                                className="flex-1 min-w-[44px] h-full rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 active:scale-95 transition-all flex items-center justify-center gap-2"
                                aria-label="Stop Teleprompter and Reset"
                            >
                                <StopIcon className="w-5 h-5 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>
            </S.ControlsContainer>
        </div>
    );
};
