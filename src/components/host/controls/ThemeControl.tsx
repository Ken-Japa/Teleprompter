import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { MicIcon, LockIcon, LaptopIcon, SmartphoneIcon } from "../../ui/Icons";
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
        const { voiceControlMode = 'host' } = settings;
        const { setVoiceControlMode } = actions;

        const handleVoiceModeToggle = () => {
            setVoiceControlMode(voiceControlMode === "remote" ? "host" : "remote");
        };

        return (
            <div className="flex items-center gap-2">
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
                            className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                        >
                            {voiceControlMode === "remote" ? (
                                <SmartphoneIcon className="w-5 h-5" />
                            ) : (
                                <LaptopIcon className="w-5 h-5" />
                            )}
                        </S.IconButton>
                    )}
                </div>
            </div>
        );
    }
);
