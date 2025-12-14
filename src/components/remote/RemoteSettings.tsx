import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { Theme, PrompterSettings, RemoteActions } from "../../types";
import { PROMPTER_DEFAULTS } from "../../config/constants";
import { LaptopIcon, SmartphoneIcon } from "../ui/Icons";
import { SyncButton } from "../ui/SyncButton";
import { ShareButton } from "../ui/ShareButton";

interface RemoteSettingsProps {
    settings: PrompterSettings | null | undefined;
    actions: RemoteActions;
    lang: string;
    setLang: (lang: string) => void;
    isPro: boolean;
}

export const RemoteSettings: React.FC<RemoteSettingsProps> = ({ settings, actions, lang, setLang, isPro }) => {
    const { t } = useTranslation();

    if (!settings) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Waiting for host settings...
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">

            {/* Font Size */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest font-bold">
                    <span>{t("host.controls.fontSize")}</span>
                    <span>{settings.fontSize}px</span>
                </div>
                <input
                    type="range" min="20" max="200" step="4"
                    value={settings.fontSize}
                    onChange={(e) => actions.handleSettingsChange({ fontSize: parseInt(e.target.value) })}
                    className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-500"
                    aria-label="Font Size"
                />
            </div>

            {/* Voice Control Mode */}
            {isPro && (
                <div className="space-y-3">
                    <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("host.controls.voice") || "Voice Control"}</div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => actions.handleSettingsChange({ voiceControlMode: 'host' })}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${settings.voiceControlMode === 'host' || !settings.voiceControlMode ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                            aria-label="Set Voice Control Mode to Host"
                        >
                            <LaptopIcon className="w-6 h-6" />
                            <div className="font-bold text-xs">Host Control</div>
                        </button>
                        <button
                            onClick={() => actions.handleSettingsChange({ voiceControlMode: 'remote' })}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${settings.voiceControlMode === 'remote' ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                            aria-label="Set Voice Control Mode to Remote"
                        >
                            <SmartphoneIcon className="w-6 h-6" />
                            <div className="font-bold text-xs">Remote Control</div>
                        </button>
                    </div>
                </div>
            )}

            {/* Margin */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest font-bold">
                    <span>{t("host.controls.margin")}</span>
                    <span>{settings.margin}%</span>
                </div>
                <input
                    type="range" min="0" max="40" step="1"
                    value={settings.margin}
                    onChange={(e) => actions.handleSettingsChange({ margin: parseInt(e.target.value) })}
                    className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-500"
                    aria-label="Margin"
                />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => actions.handleSettingsChange({ isMirrored: !settings.isMirrored })}
                    className={`p-4 rounded-xl border ${settings.isMirrored ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    aria-label={`Toggle Mirror Mode ${settings.isMirrored ? 'Off' : 'On'}`}
                >
                    <div className="font-bold mb-1">{t("host.mirror")}</div>
                    <div className="text-xs opacity-60">{settings.isMirrored ? 'ON' : 'OFF'}</div>
                </button>

                <button
                    onClick={() => actions.handleSettingsChange({ isFlipVertical: !settings.isFlipVertical })}
                    className={`p-4 rounded-xl border ${settings.isFlipVertical ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    aria-label={`Toggle Vertical Flip ${settings.isFlipVertical ? 'Off' : 'On'}`}
                >
                    <div className="font-bold mb-1">{t("host.mirrorV")}</div>
                    <div className="text-xs opacity-60">{settings.isFlipVertical ? 'ON' : 'OFF'}</div>
                </button>

                <button
                    onClick={() => actions.handleSettingsChange({ isUpperCase: !settings.isUpperCase })}
                    className={`p-4 rounded-xl border ${settings.isUpperCase ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    aria-label={`Toggle All Caps ${settings.isUpperCase ? 'Off' : 'On'}`}
                >
                    <div className="font-bold mb-1">{t("host.controls.caps")}</div>
                    <div className="text-xs opacity-60">{settings.isUpperCase ? 'ON' : 'OFF'}</div>
                </button>

                <button
                    onClick={() => actions.handleSettingsChange({ isFocusMode: !settings.isFocusMode })}
                    className={`p-4 rounded-xl border ${settings.isFocusMode ? 'bg-brand-600/20 border-brand-500 text-brand-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    aria-label={`Toggle Focus Mode ${settings.isFocusMode ? 'Off' : 'On'}`}
                >
                    <div className="font-bold mb-1">{t("host.controls.focusLine")}</div>
                    <div className="text-xs opacity-60">{settings.isFocusMode ? 'ON' : 'OFF'}</div>
                </button>
            </div>

            {/* Themes */}
            <div className="space-y-3">
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("remote.theme")}</div>
                <div className="grid grid-cols-3 gap-3">
                    {PROMPTER_DEFAULTS.STANDARD_THEMES.map(themeOption => (
                        <button
                            key={themeOption}
                            onClick={() => actions.handleSettingsChange({ theme: themeOption })}
                            className={`p-3 rounded-lg border text-xs font-bold capitalize ${settings.theme === themeOption ? 'bg-white text-black border-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                            aria-label={`Select Theme ${themeOption}`}
                        >
                            {themeOption === Theme.DEFAULT ? "Ninja" : themeOption}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chroma Key */}
            <div className="space-y-3">
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Chroma Key</div>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => actions.handleSettingsChange({ theme: Theme.CHROMA_GREEN })}
                        className={`p-3 rounded-lg border text-xs font-bold capitalize flex items-center justify-center gap-2 ${settings.theme === Theme.CHROMA_GREEN ? 'bg-[#00b140] text-white border-white' : 'bg-[#00b140]/10 border-[#00b140]/30 text-[#00b140]'}`}
                        aria-label="Select Green Screen Theme"
                    >
                        <div className={`w-3 h-3 rounded-full border ${settings.theme === Theme.CHROMA_GREEN ? 'bg-white border-transparent' : 'bg-[#00b140] border-transparent'}`}></div>
                        Green Screen
                    </button>
                    <button
                        onClick={() => actions.handleSettingsChange({ theme: Theme.CHROMA_BLUE })}
                        className={`p-3 rounded-lg border text-xs font-bold capitalize flex items-center justify-center gap-2 ${settings.theme === Theme.CHROMA_BLUE ? 'bg-[#0047bb] text-white border-white' : 'bg-[#0047bb]/10 border-[#0047bb]/30 text-[#0047bb]'}`}
                        aria-label="Select Blue Screen Theme"
                    >
                        <div className={`w-3 h-3 rounded-full border ${settings.theme === Theme.CHROMA_BLUE ? 'bg-white border-transparent' : 'bg-[#0047bb] border-transparent'}`}></div>
                        Blue Screen
                    </button>
                </div>
            </div>

            {/* Connection Sync */}
            <div className="space-y-3">
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("common.sync") || "Sync"}</div>
                <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-sm font-medium text-slate-300">{t("common.refresh") || "Refresh Connection"}</span>
                    <SyncButton onSync={actions.handleRequestSync} className="w-10 h-10 bg-slate-800 hover:bg-slate-700" />
                </div>
            </div>

            {/* Share Section */}
            <ShareButton variant="card" />

            {/* Language */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t("remote.language")}</div>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => setLang('en')}
                        className={`p-3 rounded-lg border text-xs font-bold ${lang === 'en' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                        aria-label="Select English Language"
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLang('pt')}
                        className={`p-3 rounded-lg border text-xs font-bold ${lang === 'pt' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                        aria-label="Selecionar Português"
                    >
                        Português
                    </button>
                    <button
                        onClick={() => setLang('es')}
                        className={`p-3 rounded-lg border text-xs font-bold ${lang === 'es' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                        aria-label="Seleccionar Español"
                    >
                        Español
                    </button>
                </div>
            </div>
        </div>
    );
};
