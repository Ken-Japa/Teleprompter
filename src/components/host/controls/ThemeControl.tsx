import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { PaletteIcon, MagicIcon, MicIcon, LockIcon, LaptopIcon, SmartphoneIcon } from "../../ui/Icons";
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
        const { theme, isFocusMode, voiceControlMode } = settings;
        const { cycleTheme, setIsFocusMode, setVoiceControlMode } = actions;

        const handleVoiceModeToggle = () => {
            setVoiceControlMode(voiceControlMode === "remote" ? "host" : "remote");
        };

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
                    <div className="flex items-center gap-1">
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

                        {isPro && voiceApiSupported && (
                            <S.IconButton
                                onClick={handleVoiceModeToggle}
                                title={voiceControlMode === "remote" ? "Remote Control" : "Host Control"}
                                aria-label="Toggle Voice Control Mode"
                                className="w-6 h-6 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                            >
                                {voiceControlMode === "remote" ? (
                                    <SmartphoneIcon className="w-3 h-3" />
                                ) : (
                                    <LaptopIcon className="w-3 h-3" />
                                )}
                            </S.IconButton>
                        )}
                    </div>
                </S.HudGroup>
            </>
        );
    }
);
