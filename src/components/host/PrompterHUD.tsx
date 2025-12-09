import { memo, useState, useCallback } from "react";
import * as S from "../ui/Styled";
import { ConnectionStatus, PrompterSettings } from "../../types";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useTranslation } from "../../hooks/useTranslation";
import { PrompterTimer, SpeedControl, FontControl, DisplayControl, ThemeControl } from "./controls";
import { RecordingControls } from "./controls/RecordingControls";
import { QrCodeIcon, InfoIcon, LogOutIcon, EditIcon } from "../ui/Icons";
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
        const [showMarginModal, setShowMarginModal] = useState(false);
        const [showQRModal, setShowQRModal] = useState(false);

        const handleSetMargin = useCallback((newMargin: number | ((v: number) => number)) => {
            const finalMargin = typeof newMargin === 'function' ? newMargin(settings.margin) : newMargin;
            trackSettingChange("margin", finalMargin);
            actions.setMargin(newMargin);
        }, [actions, settings.margin]);

        return (
            <S.HudContainer visible={showHud}>
                <S.HudGroup>
                    <S.StatusBadge status={status} label={status === "CONNECTED" ? t("status.connected") : t("status.disconnected")} />
                    <S.IconButton
                        onClick={() => setShowQRModal(true)}
                        title={t("host.remoteConnect")}
                        aria-label={t("host.remoteConnect")}
                        className="w-8 h-8 ml-2"
                    >
                        <QrCodeIcon className="w-4 h-4" />
                    </S.IconButton>
                    <SyncButton onSync={onSync} className="w-8 h-8 ml-2" />
                    <PrompterTimer isPlaying={isPlaying} onReset={resetTimerSignal} />
                </S.HudGroup>

                <SpeedControl isPlaying={isPlaying} speed={speed} onStateChange={onStateChange} onReset={onResetPrompter} />

                <FontControl fontSize={settings.fontSize} setFontSize={actions.setFontSize} onOpenFontSizeSlider={() => setShowFontSizeModal(true)} />

                <DisplayControl
                    settings={settings}
                    actions={actions}
                    onOpenMarginSlider={() => setShowMarginModal(true)}
                    togglePiP={togglePiP}
                    isPiPActive={isPiPActive}
                />

                <ThemeControl
                    settings={settings}
                    actions={actions}
                    isVoiceMode={isVoiceMode}
                    toggleVoice={toggleVoice}
                    isPro={isPro}
                    voiceApiSupported={voiceApiSupported}
                    voiceApiError={voiceApiError}
                />

                {recordingState && recordingActions && (
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
                )}

                <S.IconButton
                    onClick={onEdit}
                    title={t("host.editText") || "Edit Text"}
                    aria-label={t("host.editText") || "Edit Text"}
                    className="ml-4 w-9 h-9 flex !p-0 !items-center !justify-center leading-none"
                >
                    <EditIcon className="w-5 h-5 block" />
                </S.IconButton>

                <S.IconButton
                    onClick={() => setShowTutorialModal(true)}
                    title="Tutorial"
                    aria-label="Open Tutorial"
                    className="ml-4 w-9 h-9 hidden sm:flex !p-0 !items-center !justify-center leading-none"
                >
                    <InfoIcon className="w-5 h-5 block" />
                </S.IconButton>

                <S.PrimaryButton
                    onClick={onExit}
                    size="sm"
                    className="ml-4 bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-none"
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
                <QRCodeModal
                    isOpen={showQRModal}
                    onClose={() => setShowQRModal(false)}
                    peerId={peerId}
                />
            </S.HudContainer>
        );
    }
);
