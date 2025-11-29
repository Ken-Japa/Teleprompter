import { memo, useState } from "react";
import * as S from "../ui/Styled";
import { ConnectionStatus } from "../../types";
import { PrompterActions, PrompterSettings } from "../../hooks/usePrompterSettings";
import { PrompterTimer, SpeedControl, FontControl, DisplayControl, ThemeControl } from "./controls";
import { InfoIcon, LogOutIcon } from "../ui/Icons";
import { TutorialModal } from "../ui/TutorialModal";
import { FontSizeModal } from "../ui/FontSizeModal";
import { MarginModal } from "../ui/MarginModal";

interface PrompterHUDProps {
    showHud: boolean;
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
}

export const PrompterHUD = memo(
    ({ showHud, status, isPlaying, speed, settings, actions, isVoiceMode, isPro, resetTimerSignal, onStateChange, onResetPrompter, toggleVoice, onExit, voiceApiSupported, voiceApiError }: PrompterHUDProps) => {
        const [showTutorialModal, setShowTutorialModal] = useState(false);
        const [showFontSizeModal, setShowFontSizeModal] = useState(false);
        const [showMarginModal, setShowMarginModal] = useState(false);

        return (
            <S.HudContainer visible={showHud}>
                <S.HudGroup>
                    <S.StatusBadge status={status} label={status === "CONNECTED" ? "REMOTE ON" : "OFFLINE"} />
                    <PrompterTimer isPlaying={isPlaying} onReset={resetTimerSignal} />
                </S.HudGroup>

                <SpeedControl isPlaying={isPlaying} speed={speed} onStateChange={onStateChange} onReset={onResetPrompter} />

                <FontControl fontSize={settings.fontSize} setFontSize={actions.setFontSize} onOpenFontSizeSlider={() => setShowFontSizeModal(true)} />

                <DisplayControl settings={settings} actions={actions} onOpenMarginSlider={() => setShowMarginModal(true)} />

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
                    className="ml-4 w-10 h-10 sm:w-12 sm:h-12 hidden sm:block"
                >
                    <InfoIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </S.IconButton>

                <S.PrimaryButton
                    onClick={onExit}
                    className="ml-4 bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-none py-0.5 px-0.5 !rounded-xl text-xs sm:py-2 sm:px-4"
                >
                    <span className="hidden sm:inline">EXIT</span>
                    <LogOutIcon className="inline sm:hidden w-5 h-5" />
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
                    setMargin={actions.setMargin}
                />
            </S.HudContainer>
        );
    }
);
