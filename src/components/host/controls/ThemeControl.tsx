import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { PaletteIcon, MagicIcon, MicIcon, LockIcon } from "../../ui/Icons";
import type { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";

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
            <>
                <S.HudGroup label={t("host.hudLabels.theme")}>
                    <S.IconButton
                        onClick={cycleTheme}
                        title={`${t("host.controls.theme")}: ${t(`host.themes.${theme}`)}`}
                        aria-label={t("host.controls.theme")}
                        className="w-9 h-9 rounded-full hover:bg-brand-500/20 hover:text-brand-400 border-transparent"
                    >
                        <PaletteIcon className="w-5 h-5" />
                    </S.IconButton>
                </S.HudGroup>

                <S.HudGroup label={t("host.hudLabels.focus")}>
                    <S.IconButton
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        active={isFocusMode}
                        title={t("host.controls.focusLine")}
                        aria-label={t("host.controls.focusLine")}
                        className={`w-9 h-9 rounded-full ${isFocusMode ? "bg-brand-500/20 text-brand-400 shadow-[0_0_10px_theme(colors.brand.500/0.3)] border-brand-500/30" : "hover:bg-white/10 border-transparent text-slate-400"}`}
                    >
                        <MagicIcon className="w-5 h-5" />
                    </S.IconButton>
                </S.HudGroup>

                <S.HudGroup label={t("host.hudLabels.voice")}>
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
                </S.HudGroup>
            </>
        );
    }
);
