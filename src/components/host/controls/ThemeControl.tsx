import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { PaletteIcon, MagicIcon, MicIcon, LockIcon } from "../../ui/Icons";
import { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";

interface ThemeControlProps {
 settings: PrompterSettings;
 actions: PrompterActions;
 isVoiceMode: boolean;
 toggleVoice: () => void;
 isPro: boolean;
 voiceApiSupported: boolean;
 voiceApiError: string | null;
}

export const ThemeControl = memo(
 ({ settings, actions, isVoiceMode, toggleVoice, isPro, voiceApiSupported, voiceApiError }: ThemeControlProps) => {
  const { t } = useTranslation();
  const { theme, isFocusMode } = settings;
  const { cycleTheme, setIsFocusMode } = actions;

  return (
   <S.HudGroup>
    <S.IconButton
     onClick={cycleTheme}
     title={`${t("host.controls.theme")}: ${t(`host.themes.${theme}`)}`}
     aria-label={t("host.controls.theme")}
     className="w-8 h-8 sm:w-10 sm:h-10"
    >
     <PaletteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
    </S.IconButton>
    <S.IconButton
     onClick={() => setIsFocusMode(!isFocusMode)}
     active={isFocusMode}
     title={t("host.controls.focusLine")}
     aria-label={t("host.controls.focusLine")}
     className="w-8 h-8 sm:w-10 sm:h-10"
    >
     <MagicIcon className="w-4 h-4 sm:w-5 sm:h-5" />
    </S.IconButton>
    <S.IconButton
     onClick={toggleVoice}
     active={isVoiceMode}
     title={voiceApiSupported ? t("host.controls.voice") : t(voiceApiError || "")}
     aria-label={t("host.controls.voice")}
     className={`w-8 h-8 sm:w-10 sm:h-10 ${!isPro || !voiceApiSupported ? "opacity-50" : ""}`}
     disabled={!voiceApiSupported}
    >
     {isPro ? <MicIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <LockIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
    </S.IconButton>
   </S.HudGroup>
  );
 }
);
