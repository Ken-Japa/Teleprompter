import { memo, useState, useCallback, useEffect } from "react";
import * as S from "../ui/Styled";
import { ConnectionStatus, PrompterSettings } from "../../types";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useTranslation } from "../../hooks/useTranslation";
import { PrompterTimer, SpeedControl, FontControl, DisplayControl, ThemeControl } from "./controls";
import { FontSettingsModal } from "../ui/FontSettingsModal";
import { UI_LIMITS } from "../../config/constants";
import { RecordingControls } from "./controls/RecordingControls";
import { QrCodeIcon, InfoIcon, LogOutIcon, EditIcon, PlayIcon, PauseIcon, MaximizeIcon, MinimizeIcon, StopIcon, FontFamilyIcon, PlusIcon, MinusIcon } from "../ui/Icons";
import { TutorialModal } from "../ui/TutorialModal";
import { FontSizeModal } from "../ui/FontSizeModal";
import { MarginModal } from "../ui/MarginModal";
import { QRCodeModal } from "./QRCodeModal";
import { SyncButton } from "../ui/SyncButton";
import { trackSettingChange } from "../../utils/analytics";

interface PrompterHUDProps {
    showHud: boolean;
    peerId: string;
    status: ConnectionStatus;
    isPlaying: boolean;
    speed: number;
    settings: PrompterSettings;
    actions: PrompterActions;
    isVoiceMode: boolean;
    isPro: boolean;
    voiceApiSupported: boolean;
    voiceApiError: string | null;
    resetTimerSignal: boolean;
    onStateChange: (isPlaying: boolean, speed: number) => void;
    onResetPrompter: () => void;
    toggleVoice: () => void;
    onExit: () => void;
    onSync: () => void;
    onEdit: () => void;
    togglePiP?: () => void;
    isPiPActive?: boolean;
    isCameraMode?: boolean;
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
}

export const PrompterHUD = memo(
    ({ showHud, peerId, status, isPlaying, speed, settings, actions, isVoiceMode, isPro, resetTimerSignal, onStateChange, onResetPrompter, toggleVoice, onExit, voiceApiSupported, voiceApiError, onSync, onEdit, togglePiP, isPiPActive, recordingState, recordingActions }: PrompterHUDProps) => {
        const { t } = useTranslation();
        const { recordingMode = 'host' } = settings;
        const { setRecordingMode } = actions;

        const handleToggleRecordingMode = () => {
            setRecordingMode(recordingMode === "remote" ? "host" : "remote");
        };

        const [showTutorialModal, setShowTutorialModal] = useState(false);
        const [showFontSizeModal, setShowFontSizeModal] = useState(false);
        const [showFontSettingsModal, setShowFontSettingsModal] = useState(false);
        const [showMarginModal, setShowMarginModal] = useState(false);
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

        const handleSetMargin = useCallback((newMargin: number | ((v: number) => number)) => {
            const finalMargin = typeof newMargin === 'function' ? newMargin(settings.margin) : newMargin;
            trackSettingChange("margin", finalMargin);
            actions.setMargin(newMargin);
        }, [actions, settings.margin]);

        // Advanced Controls Visibility Logic (Smart Persistence)
        const [isAdvancedOpen, setIsAdvancedOpen] = useState(() => {
            if (typeof window !== 'undefined') {
                return localStorage.getItem('neonprompt_advanced_seen') === 'true';
            }
            return false;
        });

        const handleToggleAdvanced = () => {
            const newState = !isAdvancedOpen;
            setIsAdvancedOpen(newState);
            if (newState) {
                localStorage.setItem('neonprompt_advanced_seen', 'true');
            }
        };

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
                            width="w-24"
                            ariaLabel={t("host.controls.speed")}
                            title={t("host.controls.speed")}
                        />
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 tabular-nums tracking-tight pointer-events-none">{speed.toFixed(2)}x</span>
                    </div>

                    <S.IconButton
                        onClick={() => {
                            setIsMinimized(false);
                            setIsAdvancedOpen(true);
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
                    <FontControl fontSize={settings.fontSize} setFontSize={actions.setFontSize} onOpenFontSizeSlider={() => setShowFontSizeModal(true)} />
                    <S.IconButton
                        onClick={onEdit}
                        title={t("host.editText") || "Edit Text"}
                        aria-label={t("host.editText") || "Edit Text"}
                        className="w-10 h-10 flex ml-2 !p-0 !items-center !justify-center leading-none bg-slate-800/80 border border-white/5 shadow-md"
                    >
                        <EditIcon className="w-5 h-5 block" />
                    </S.IconButton>


                </div>


                {/* Show More / Advanced Toggle - Only on Desktop (XL+) */}
                <div className="hidden xl:flex items-center">
                    <button
                        onClick={handleToggleAdvanced}
                        className="text-xs text-slate-400 hover:text-brand-400 underline decoration-dotted transition-colors mx-2 whitespace-nowrap"
                    >
                        {isAdvancedOpen ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                    </button>
                </div>


                {/* Advanced Controls (Conditionally Rendered) */}
                {isAdvancedOpen && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto p-1.5 sm:p-2 rounded-xl bg-slate-900/50 sm:bg-slate-900/80 border border-white/5 mt-0.5 sm:mt-0 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Unified Control Group */}
                        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-1 max-w-[280px] sm:max-w-none">
                            <DisplayControl
                                settings={settings}
                                actions={actions}
                                onOpenMarginSlider={() => setShowMarginModal(true)}
                                togglePiP={togglePiP}
                                isPiPActive={isPiPActive}
                            />

                            <S.IconButton
                                onClick={() => setShowFontSettingsModal(true)}
                                title={t("host.controls.fontConfig") || "Configurar Fonte"}
                                aria-label="Font Settings"
                                className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                            >
                                <FontFamilyIcon className="w-6 h-6" />
                            </S.IconButton>

                            <ThemeControl
                                settings={settings}
                                actions={actions}
                                isVoiceMode={isVoiceMode}
                                toggleVoice={toggleVoice}
                                isPro={isPro}
                                voiceApiSupported={voiceApiSupported}
                                voiceApiError={voiceApiError}
                            />

                            <S.IconButton
                                onClick={() => setShowTutorialModal(true)}
                                title="Tutorial"
                                aria-label="Open Tutorial"
                                className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                            >
                                <InfoIcon className="w-5 h-5 block" />
                            </S.IconButton>
                        </div>
                    </div>
                )}

                {/* Minimize Button - Visible on Mobile and Tablet (below XL) */}
                <S.IconButton
                    onClick={() => setIsMinimized(true)}
                    title="Minimize Controls"
                    className="ml-2 w-9 h-9 flex xl:hidden items-center justify-center text-slate-400 hover:text-white"
                >
                    <MinimizeIcon className="w-5 h-5" />
                </S.IconButton >

                {recordingState && recordingActions && (
                    <div className="scale-90 origin-bottom">
                        <S.HudGroup label="REC">
                            <RecordingControls
                                isRecording={recordingState.isRecording}
                                isPaused={recordingState.isPaused}
                                recordingTime={recordingState.recordingTime}
                                hasRecordedData={recordingState.hasRecordedData}
                                recordingMode={recordingMode}
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
                <FontSizeModal
                    isOpen={showFontSizeModal}
                    onClose={() => setShowFontSizeModal(false)}
                    fontSize={settings.fontSize}
                    setFontSize={actions.setFontSize}
                />
                <MarginModal
                    isOpen={showMarginModal}
                    onClose={() => setShowMarginModal(false)}
                    margin={settings.margin}
                    setMargin={handleSetMargin}
                />
                <FontSettingsModal
                    isOpen={showFontSettingsModal}
                    onClose={() => setShowFontSettingsModal(false)}
                    fontFamily={settings.fontFamily}
                    setFontFamily={actions.setFontFamily}
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
