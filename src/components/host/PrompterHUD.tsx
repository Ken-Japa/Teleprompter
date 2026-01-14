import { memo, useState, useEffect } from "react";
import * as S from "../ui/Styled";
import { ConnectionStatus, PrompterSettings } from "../../types";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useTranslation } from "../../hooks/useTranslation";
import { PrompterTimer, SpeedControl, DisplayControl } from "./controls";
import { AppearanceSettingsModal } from "../ui/AppearanceSettingsModal";
import { UI_LIMITS } from "../../config/constants";
import { RecordingControls } from "./controls/RecordingControls";
import { QrCodeIcon, LogOutIcon, EditIcon, PlayIcon, PauseIcon, MaximizeIcon, MinimizeIcon, StopIcon, PaletteIcon, PiPIcon, MicIcon, LockIcon, LaptopIcon, SmartphoneIcon, MetronomeIcon } from "../ui/Icons";
import { TutorialModal } from "../ui/TutorialModal";
import { QRCodeModal } from "./QRCodeModal";
import { SyncButton } from "../ui/SyncButton";
import { useBackingTrack } from "../../hooks/useBackingTrack";



interface PrompterHUDProps {
    showHud: boolean;
    peerId: string;
    status: ConnectionStatus;
    isPlaying: boolean;
    speed: number;
    settings: PrompterSettings;
    actions: PrompterActions;
    resetTimerSignal: boolean;
    onStateChange: (isPlaying: boolean, speed: number) => void;
    onResetPrompter: () => void;
    toggleVoice: () => void;
    onExit: () => void;
    onSync: () => void;
    onEdit: () => void;
    isCameraMode?: boolean;
    isVoiceMode: boolean;
    isPro: boolean;
    voiceApiSupported: boolean;
    voiceApiError: string | null;
    togglePiP?: () => void;
    isPiPActive?: boolean;
    // Recording Props
    recordingState?: {
        isRecording: boolean;
        isPaused: boolean;
        recordingTime: string;
        hasRecordedData: boolean;
    };
    recordingActions?: {
        start: () => void;
        stop: () => void;
        pause: () => void;
        resume: () => void;
        download: () => void;
    };
    onPreviousPart?: () => void;
    onNextPart?: () => void;
    hasParts?: boolean;
    detectedBpm?: number | null;
    autoBpmError?: string | null;
    setShowPaywall?: (show: boolean) => void;
    backingTrack?: ReturnType<typeof useBackingTrack>;
    isNDIEnabled?: boolean;
    onToggleNDI?: () => void;
}


export const PrompterHUD = memo(
    ({ showHud, peerId, status, isPlaying, speed, settings, actions, isVoiceMode, isPro, voiceApiSupported, voiceApiError, resetTimerSignal, onStateChange, onResetPrompter, toggleVoice, onExit, onSync, onEdit, togglePiP, isPiPActive, recordingState, recordingActions, onPreviousPart, onNextPart, hasParts, detectedBpm, autoBpmError, setShowPaywall, backingTrack, isNDIEnabled, onToggleNDI }: PrompterHUDProps) => {

        const { t } = useTranslation();
        const { recordingMode = 'host' } = settings;
        const { setRecordingMode } = actions;

        const handleToggleRecordingMode = () => {
            setRecordingMode(recordingMode === "remote" ? "host" : "remote");
        };

        const [showAppearanceModal, setShowAppearanceModal] = useState(false);
        const [showTutorialModal, setShowTutorialModal] = useState(false);
        const [showQRModal, setShowQRModal] = useState(false);
        const [isMinimized, setIsMinimized] = useState(false);

        // Initialize minimized state based on screen width
        useEffect(() => {
            const checkMobile = () => {
                // If it's a small screen (mobile/tablet), start minimized
                if (window.innerWidth < 1024) {
                    setIsMinimized(true);
                } else {
                    setIsMinimized(false);
                }
            };

            // Run once on mount
            checkMobile();

        }, []); // Empty dependency array ensures it runs only on mount

        const togglePlay = () => {
            onStateChange(!isPlaying, speed);
        };


        // Advanced Controls Visibility Logic (Smart Persistence)




        if (isMinimized) {
            return (
                <S.HudContainer visible={showHud}>
                    <S.IconButton
                        onClick={onResetPrompter}
                        title={t("host.controls.reset")}
                        aria-label={t("host.controls.reset")}
                        className="w-10 h-10 rounded-full bg-slate-800 text-slate-200 hover:bg-red-500/20 hover:text-red-400 border border-white/5 shadow-lg mr-2"
                    >
                        <StopIcon className="w-4 h-4" />
                    </S.IconButton>

                    <button
                        onClick={togglePlay}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-xl ${isPlaying ? "bg-amber-500/90 hover:bg-amber-500 text-white border-amber-400/50 shadow-amber-500/30" : "bg-brand-600 hover:bg-brand-500 text-white border-brand-400/50 shadow-brand-500/30"}`}
                        title={isPlaying ? t("host.controls.pause") : t("host.controls.play")}
                    >
                        {isPlaying ? <PauseIcon className="w-5 h-5 fill-current" /> : <PlayIcon className="w-6 h-6 fill-current ml-0.5" />}
                    </button>

                    <div className="relative flex items-center justify-center px-1">
                        <S.RangeSlider
                            value={speed}
                            min={UI_LIMITS.SPEED.MIN}
                            max={UI_LIMITS.SPEED.MAX}
                            step={UI_LIMITS.SPEED.STEP}
                            onChange={(s) => onStateChange(isPlaying, s)}
                            width="w-16"
                            ariaLabel={t("host.controls.speed")}
                            title={t("host.controls.speed")}
                        />
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 tabular-nums tracking-tight pointer-events-none">{speed.toFixed(2)}x</span>
                    </div>

                    <S.IconButton
                        onClick={() => {
                            setIsMinimized(false);
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('neonprompt_advanced_seen', 'true');
                            }
                        }}
                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-brand-400 border border-brand-500/30 shadow-lg shadow-brand-500/20"
                        title="Maximize Controls"
                    >
                        <MaximizeIcon className="w-4 h-4" />
                    </S.IconButton>

                    <S.IconButton
                        onClick={onExit}
                        className="ml-1 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/5 shadow-lg"
                        title={t("host.exit")}
                    >
                        <LogOutIcon className="w-4 h-4" />
                    </S.IconButton>
                </S.HudContainer>
            );
        }

        return (
            <S.HudContainer visible={showHud}>
                {/* Primary Controls (Always Visible) */}
                <S.HudGroup>
                    <S.StatusBadge status={status} label={status === "CONNECTED" ? t("status.connected") : t("status.disconnected")} />
                    <S.IconButton
                        onClick={() => setShowQRModal(true)}
                        title={t("host.remoteConnect")}
                        aria-label={t("host.remoteConnect")}
                        className="w-8 h-8"
                    >
                        <QrCodeIcon className="w-4 h-4" />
                    </S.IconButton>
                    <SyncButton onSync={onSync} className="w-8 h-8" />
                    <PrompterTimer isPlaying={isPlaying} onReset={resetTimerSignal} />
                </S.HudGroup>

                <div className="flex items-center justify-center w-full">
                    <SpeedControl isPlaying={isPlaying} speed={speed} onStateChange={onStateChange} onReset={onResetPrompter} />
                    <S.IconButton
                        onClick={() => setShowAppearanceModal(true)}
                        title={t("host.controls.appearance") || "Configurar Aparência"}
                        aria-label="Appearance Settings"
                        className="w-10 h-10 flex ml-2 !p-0 !items-center !justify-center leading-none bg-slate-800/80 border border-white/5 shadow-md text-brand-400"
                    >
                        <PaletteIcon className="w-5 h-5 block" />
                    </S.IconButton>
                    <S.IconButton
                        onClick={onEdit}
                        title={t("host.editText") || "Edit Text"}
                        aria-label={t("host.editText") || "Edit Text"}
                        className="w-10 h-10 flex ml-2 !p-0 !items-center !justify-center leading-none bg-slate-800/80 border border-white/5 shadow-md"
                    >
                        <EditIcon className="w-5 h-5 block" />
                    </S.IconButton>


                </div>


                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto p-1.5 sm:p-2 rounded-xl bg-slate-900/50 sm:bg-slate-900/80 border border-white/5 mt-0.5 sm:mt-0 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Unified Control Group */}
                    <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-1 max-w-[280px] sm:max-w-none">
                        <DisplayControl
                            hasParts={hasParts}
                            onPreviousPart={onPreviousPart}
                            onNextPart={onNextPart}
                        />

                        {/* Music Mode Setlist Navigation */}
                        {settings.isMusicianMode && (
                            <div className="flex items-center gap-1 border-l border-white/10 pl-2 ml-1">
                                <S.IconButton
                                    onClick={() => onPreviousPart?.()} // Re-using part navigation props for song navigation if passed down as such
                                    title="Previous Song"
                                    className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                                >
                                    <span className="text-xs font-bold">&lt; </span>
                                </S.IconButton>
                                <S.IconButton
                                    onClick={() => onNextPart?.()} // Re-using part navigation props for song navigation if passed down as such
                                    title="Next Song"
                                    className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                                >
                                    <span className="text-xs font-bold">&gt;</span>
                                </S.IconButton>
                            </div>
                        )}

                        {togglePiP && (
                            <div className="flex items-center gap-1">
                                <S.IconButton
                                    onClick={() => actions.setIsHudless(true)}
                                    title={t("hudless.button") || "Hide Controls (H)"}
                                    aria-label="Hide Controls"
                                    className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                                >
                                    <LaptopIcon className="w-5 h-5" />
                                </S.IconButton>

                                <S.IconButton
                                    onClick={togglePiP}
                                    active={isPiPActive}
                                    title="Picture-in-Picture"
                                    aria-label="Picture-in-Picture"
                                    className={`w-9 h-9 rounded-full ${isPiPActive ? "bg-brand-500/20 text-brand-400 border-brand-500/30" : "hover:bg-white/10 border-transparent text-slate-400"}`}
                                >
                                    <PiPIcon className="w-5 h-5" />
                                </S.IconButton>
                            </div>
                        )}

                        {/* BPM Slider for Musician Mode */}
                        {settings.isMusicianMode && (
                            <div className="flex items-center gap-2 bg-slate-800/50 px-2.5 py-1 rounded-full border border-white/5 ml-1 mr-1">
                                <MetronomeIcon className="w-3.5 h-3.5 text-amber-500" />
                                <S.RangeSlider
                                    value={settings.bpm || 120}
                                    min={UI_LIMITS.BPM.MIN}
                                    max={UI_LIMITS.BPM.MAX}
                                    step={UI_LIMITS.BPM.STEP}
                                    onChange={(b) => actions.setBpm(b)}
                                    width="w-16 sm:w-20"
                                    ariaLabel="BPM"
                                    title="BPM Sync"
                                />
                                <span className="text-[10px] font-mono text-amber-500 font-bold w-6 tabular-nums">{settings.bpm || 120}</span>

                                <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                                    <S.IconButton
                                        onClick={() => isPro ? actions.setIsAutoBpmEnabled(!settings.autoBpmEnabled) : setShowPaywall?.(true)}
                                        active={settings.autoBpmEnabled}
                                        className={`w-7 h-7 rounded-full ${settings.autoBpmEnabled ? "bg-amber-500/20 text-amber-500 animate-pulse border-amber-500/30" : "text-slate-500 hover:text-slate-300 border-transparent"}`}
                                        title={isPro ? (autoBpmError || "Auto BPM") : t("music.bpmTeaser")}
                                    >
                                        <MicIcon className="w-3.5 h-3.5" />
                                    </S.IconButton>

                                    {settings.autoBpmEnabled && isPro && (
                                        <span className="text-[9px] font-bold text-amber-500 animate-pulse min-w-[30px]">
                                            {detectedBpm ? `${detectedBpm}` : (autoBpmError ? "Error" : "...")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex items-center">
                    <div className="flex items-center p-0.5 gap-2 ml-2">
                        <S.IconButton
                            onClick={toggleVoice}
                            active={isVoiceMode}
                            title={voiceApiSupported ? t("host.controls.voice") : t(voiceApiError || "")}
                            aria-label={t("host.controls.voice")}
                            className={`w-9 h-9 rounded-full ${isVoiceMode ? "bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.3)] border-red-500/30 animate-pulse" : "hover:bg-white/10 border-transparent text-slate-400"} ${!isPro || !voiceApiSupported ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!voiceApiSupported}
                        >
                            {isPro ? <MicIcon className="w-5 h-5" /> : <LockIcon className="w-4 h-4" />}
                        </S.IconButton>

                        {isVoiceMode && isPro && status === "CONNECTED" && (
                            <S.IconButton
                                onClick={() => actions.setVoiceControlMode(settings.voiceControlMode === "host" ? "remote" : "host")}
                                title={settings.voiceControlMode === "host" ? "Microphone: Local (Laptop)" : "Microphone: Remote (Smartphone)"}
                                className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700 text-brand-400 border-transparent"
                            >
                                {settings.voiceControlMode === "host" ? <LaptopIcon className="w-4 h-4" /> : <SmartphoneIcon className="w-4 h-4" />}
                            </S.IconButton>
                        )}
                    </div>

                    {/* Minimize Button - Visible on Mobile and Tablet (below XL) */}
                    <S.IconButton
                        onClick={() => setIsMinimized(true)}
                        title="Minimize Controls"
                        className="ml-2 w-9 h-9 flex xl:hidden items-center justify-center text-slate-400 hover:text-white"
                    >
                        <MinimizeIcon className="w-5 h-5" />
                    </S.IconButton >
                </div>

                {/* Backing Track Controls */}
                {settings.isMusicianMode && backingTrack?.audioData && (
                    <div className="flex items-center gap-2 bg-slate-900/80 border border-amber-500/20 px-3 py-1.5 rounded-xl ml-2 scale-90 sm:scale-100">
                        <S.IconButton
                            onClick={() => backingTrack.togglePlay()}
                            className={`w-9 h-9 rounded-full ${backingTrack.isPlaying ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-800 text-amber-500'}`}
                            title="Play Backing Track"
                        >
                            {backingTrack.isPlaying ? <PauseIcon className="w-4 h-4 fill-current" /> : <PlayIcon className="w-4 h-4 fill-current ml-0.5" />}
                        </S.IconButton>

                        <div className="flex flex-col min-w-[80px]">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-bold text-amber-500/80 uppercase tracking-tighter truncate max-w-[60px]">
                                    {backingTrack.audioData.name}
                                </span>
                                <span className="text-[9px] font-mono text-slate-400">
                                    {Math.floor(backingTrack.currentTime / 60)}:{(backingTrack.currentTime % 60).toFixed(0).padStart(2, '0')}
                                </span>
                            </div>
                            <S.RangeSlider
                                value={backingTrack.currentTime}
                                min={0}
                                max={backingTrack.duration || 100}
                                step={0.1}
                                onChange={(val) => backingTrack.seek(val)}
                                width="w-24 sm:w-32"
                                ariaLabel="Backing Track Seek"
                            />
                        </div>
                    </div>
                )}


                {recordingState && recordingActions && (
                    <div className="scale-90 origin-bottom">
                        <S.HudGroup label="REC">
                            <RecordingControls
                                isRecording={recordingState.isRecording}
                                isPaused={recordingState.isPaused}
                                recordingTime={recordingState.recordingTime}
                                hasRecordedData={recordingState.hasRecordedData}
                                recordingMode={recordingMode}
                                isConnected={status === "CONNECTED"}
                                onToggleMode={handleToggleRecordingMode}
                                onStart={recordingActions.start}
                                onStop={recordingActions.stop}
                                onPause={recordingActions.pause}
                                onResume={recordingActions.resume}
                                onDownload={recordingActions.download}
                            />
                        </S.HudGroup>
                    </div>
                )}

                <S.PrimaryButton
                    onClick={onExit}
                    size="sm"
                    className="ml-2 bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-none"
                >
                    <span className="hidden sm:inline">{t("host.exit")}</span>
                    <LogOutIcon className="inline sm:hidden w-4 h-4" />
                </S.PrimaryButton>

                <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
                <AppearanceSettingsModal
                    isOpen={showAppearanceModal}
                    onClose={() => setShowAppearanceModal(false)}
                    settings={settings}
                    actions={actions}
                    isPro={isPro}
                    onShowPaywall={() => setShowPaywall?.(true)}
                    isNDIEnabled={!!isNDIEnabled}
                    onToggleNDI={onToggleNDI || (() => { })}
                />
                <QRCodeModal
                    isOpen={showQRModal}
                    onClose={() => setShowQRModal(false)}
                    peerId={peerId}
                />
            </S.HudContainer >
        );
    }
);
