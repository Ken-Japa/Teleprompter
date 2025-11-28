import { memo, useState } from "react";
import * as S from "../ui/Styled";
import { ConnectionStatus } from "../../types";
import { PrompterActions, PrompterSettings } from "../../hooks/usePrompterSettings";
import { PrompterTimer, SpeedControl, FontControl, DisplayControl, ThemeControl } from "./controls";
import { InfoIcon, LogOutIcon } from "../ui/Icons";
import { TutorialModal } from "../ui/TutorialModal";

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

  return (
   <S.HudContainer visible={showHud}>
    <S.HudGroup>
     <S.StatusBadge status={status} label={status === "CONNECTED" ? "REMOTE ON" : "OFFLINE"} />
     <PrompterTimer isPlaying={isPlaying} onReset={resetTimerSignal} />
    </S.HudGroup>

    <SpeedControl isPlaying={isPlaying} speed={speed} onStateChange={onStateChange} onReset={onResetPrompter} />

    <FontControl fontSize={settings.fontSize} setFontSize={actions.setFontSize} />

    <DisplayControl settings={settings} actions={actions} />

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
     className="ml-4 w-8 h-8 sm:w-10 sm:h-10"
    >
     <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
    </S.IconButton>

    <S.PrimaryButton
     onClick={onExit}
     className="ml-4 bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-none py-2 px-3 !rounded-xl text-xs sm:py-2 sm:px-4"
    >
     <span className="hidden sm:inline">EXIT</span>
     <LogOutIcon className="inline sm:hidden w-4 h-4" />
    </S.PrimaryButton>

    <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
   </S.HudContainer>
  );
 }
);
