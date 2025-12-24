import { memo, useCallback } from "react";
import * as S from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { PrompterSettings, Theme } from "../../types";
import { trackSettingChange } from "../../utils/analytics";
import { PROMPTER_DEFAULTS } from "../../config/constants";
import {
    PaletteIcon,
    FontFamilyIcon,
    MarginIcon,
    CapsIcon,
    MagicIcon,
    ApertureIcon
} from "./Icons";

interface AppearanceSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: PrompterSettings;
    actions: PrompterActions;
}

export const AppearanceSettingsModal = memo(({ isOpen, onClose, settings, actions }: AppearanceSettingsModalProps) => {
    const { t } = useTranslation();
    const {
        theme,
        fontFamily,
        fontSize,
        margin,
        isUpperCase,
        isFocusMode
    } = settings;
    const {
        setTheme,
        setFontFamily,
        setFontSize,
        setMargin,
        setIsUpperCase,
        setIsFocusMode,
        toggleChroma
    } = actions;

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as Theme;
        trackSettingChange("theme", newTheme);
        setTheme(newTheme);
    };

    const fonts = [
        { id: 'sans-serif', name: 'Padrão (Inter)', style: 'font-sans' },
        { id: 'Roboto Mono', name: 'Roboto Mono (Monospace)', style: 'font-[Roboto Mono]' },
        { id: 'Poppins', name: 'Poppins', style: 'font-[Poppins]' },
        { id: 'Lexend', name: 'Lexend', style: 'font-[Lexend]' },
        { id: 'OpenDyslexic', name: 'OpenDyslexic', style: 'font-[OpenDyslexic]' },
    ];

    const handleSelectFont = (font: string) => {
        trackSettingChange("font_family", font);
        setFontFamily(font);
    };

    const handleSetFontSize = useCallback((newSize: number | ((prevSize: number) => number)) => {
        const finalSize = typeof newSize === 'function' ? newSize(fontSize) : newSize;
        trackSettingChange("font_size", finalSize);
        setFontSize(newSize);
    }, [fontSize, setFontSize]);

    const handleSetMargin = useCallback((newMargin: number | ((v: number) => number)) => {
        const finalMargin = typeof newMargin === 'function' ? newMargin(margin) : newMargin;
        trackSettingChange("margin", finalMargin);
        setMargin(newMargin);
    }, [margin, setMargin]);

    const minMargin = 0;
    const maxMargin = 40;
    const rawSliderValue = ((margin - minMargin) / (maxMargin - minMargin)) * 100;
    const sliderValue = Math.min(Math.max(rawSliderValue, 0), 100);

    return (
        <S.Modal isOpen={isOpen} onClose={onClose} title={t("host.controls.appearance") || "Aparência"}>
            <div className="flex flex-col space-y-6 p-1">

                {/* Theme Section */}
                {!settings.isMusicianMode && (
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <PaletteIcon className="w-4 h-4" />
                            {t("host.controls.theme")}
                        </label>
                        <div className="relative group">
                            <select
                                value={theme}
                                onChange={handleThemeChange}
                                className="w-full appearance-none bg-slate-800 border border-slate-700 text-slate-200 py-3.5 px-4 pr-10 rounded-xl hover:bg-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all cursor-pointer shadow-md"
                            >
                                {PROMPTER_DEFAULTS.THEME_ORDER.map((tId) => (
                                    <option key={tId} value={tId} className="bg-slate-900 text-slate-200">
                                        {t(`host.themes.${tId}`)}
                                    </option>
                                ))}
                                {PROMPTER_DEFAULTS.CHROMA_THEMES.includes(theme) && (
                                    <option value={theme} className="bg-slate-900 text-slate-200">
                                        {t(`host.themes.${theme}`)}
                                    </option>
                                )}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-slate-300 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                {/* Font Family Section */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <FontFamilyIcon className="w-4 h-4" />
                        {t("host.controls.fontConfig") || "Fonte"}
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {fonts.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => handleSelectFont(f.id)}
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${fontFamily === f.id
                                    ? "bg-brand-600/20 border-brand-500 text-brand-400 shadow-sm"
                                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600"
                                    }`}
                            >
                                <span className={`text-base ${f.style === 'font-[OpenDyslexic]' ? 'font-[OpenDyslexic]' : 'font-sans'}`}>
                                    {f.name}
                                </span>
                                {fontFamily === f.id && (
                                    <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_theme(colors.brand.500)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Font Size Section */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg font-bold">A</span>
                        {t("host.controls.fontSize")}
                    </label>
                    <div className="flex flex-col items-center space-y-2 px-2">
                        <S.RangeSlider
                            value={fontSize}
                            min={24}
                            max={200}
                            onChange={handleSetFontSize}
                            width="w-full"
                            ariaLabel={t("host.controls.fontSize")}
                        />
                        <span className="text-sm font-mono text-slate-300">{fontSize}px</span>
                    </div>
                </div>

                {/* Margin Section */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <MarginIcon className="w-4 h-4" />
                        {t("host.controls.margin")}
                    </label>
                    <div className="flex flex-col items-center space-y-2 px-2">
                        <S.RangeSlider
                            value={sliderValue}
                            min={0}
                            max={100}
                            onChange={v => handleSetMargin(minMargin + ((maxMargin - minMargin) * v) / 100)}
                            width="w-full"
                            ariaLabel={t("host.controls.margin")}
                        />
                        <span className="text-sm font-mono text-slate-300">{Math.round(sliderValue)}%</span>
                    </div>
                </div>

                {/* Toggles Section */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={() => setIsUpperCase(!isUpperCase)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${isUpperCase
                            ? "bg-brand-600/20 border-brand-500 text-brand-400"
                            : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
                    >
                        <CapsIcon className="w-6 h-6" />
                        <span className="text-xs font-medium">{t("host.controls.caps")}</span>
                    </button>

                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${isFocusMode
                            ? "bg-brand-600/20 border-brand-500 text-brand-400"
                            : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
                    >
                        <MagicIcon className="w-6 h-6" />
                        <span className="text-xs font-medium">{t("host.controls.focusLine")}</span>
                    </button>

                    {!settings.isMusicianMode && (
                        <button
                            onClick={toggleChroma}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 col-span-2 ${PROMPTER_DEFAULTS.CHROMA_THEMES.includes(theme)
                                ? "bg-green-600/20 border-green-500 text-green-400"
                                : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
                        >
                            <ApertureIcon className="w-6 h-6" />
                            <span className="text-xs font-medium">{t("host.controls.chroma")}</span>
                        </button>
                    )}
                </div>

            </div>
        </S.Modal>
    );
});
