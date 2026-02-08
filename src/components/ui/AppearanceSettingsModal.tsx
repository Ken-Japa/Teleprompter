import { memo, useCallback, useState } from "react";
import ReactDOM from "react-dom";
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
    ApertureIcon,
    FlipIcon,
    MaximizeIcon,
    CheckIcon,
    BoldIcon
} from "./Icons";
import { NDIOutputToggle } from "../host/NDIOutputToggle";

interface AppearanceSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: PrompterSettings;
    actions: PrompterActions;
    isPro: boolean;
    onShowPaywall: () => void;
    isNDIEnabled: boolean;
    onToggleNDI: () => void;
}

export const AppearanceSettingsModal = memo(({ isOpen, onClose, settings, actions, isPro, onShowPaywall, isNDIEnabled, onToggleNDI }: AppearanceSettingsModalProps) => {
    const { t } = useTranslation();
    const [isLivePreviewMode, setIsLivePreviewMode] = useState(false);

    const {
        theme,
        fontFamily,
        fontSize,
        fontWeight,
        margin,
        isUpperCase,
        isFocusMode,
        isMirrored,
        isFlipVertical
    } = settings;
    const {
        setTheme,
        setFontFamily,
        setFontSize,
        setFontWeight,
        setMargin,
        setIsUpperCase,
        setIsFocusMode,
        toggleChroma,
        setIsMirrored,
        setIsFlipVertical
    } = actions;

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as Theme;
        trackSettingChange("theme", newTheme);
        setTheme(newTheme);
    };

    const handleMirrorToggle = useCallback(() => {
        const newValue = !isMirrored;
        trackSettingChange("mirror_mode", newValue);
        setIsMirrored(newValue);
    }, [isMirrored, setIsMirrored]);

    const handleVerticalFlipToggle = useCallback(() => {
        const newValue = !isFlipVertical;
        trackSettingChange("vertical_flip", newValue);
        setIsFlipVertical(newValue);
    }, [isFlipVertical, setIsFlipVertical]);

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

    const handleSetFontWeight = useCallback((newWeight: number | ((prevWeight: number) => number)) => {
        const finalWeight = typeof newWeight === 'function' ? newWeight(fontWeight) : newWeight;
        trackSettingChange("font_weight", finalWeight);
        setFontWeight(newWeight);
    }, [fontWeight, setFontWeight]);

    const handleSetMargin = useCallback((newMargin: number | ((v: number) => number)) => {
        const finalMargin = typeof newMargin === 'function' ? newMargin(margin) : newMargin;
        trackSettingChange("margin", finalMargin);
        setMargin(newMargin);
    }, [margin, setMargin]);

    const minMargin = 0;
    const maxMargin = 40;
    const rawSliderValue = ((margin - minMargin) / (maxMargin - minMargin)) * 100;
    const sliderValue = Math.min(Math.max(rawSliderValue, 0), 100);

    const toggleLivePreview = () => {
        setIsLivePreviewMode(!isLivePreviewMode);
    };

    const closeLivePreview = () => {
        setIsLivePreviewMode(false);
    };

    return (
        <>
            {/* Main Modal - Hidden when in Live Preview Mode */}
            {!isLivePreviewMode && (
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
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <span className="text-lg font-bold">A</span>
                                    {t("host.controls.fontSize")}
                                </label>
                                <button
                                    onClick={toggleLivePreview}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 text-brand-400 text-xs font-medium transition-all"
                                >
                                    <MaximizeIcon className="w-3.5 h-3.5" />
                                    {t("host.controls.livePreview") || "Visualizar ao Vivo"}
                                </button>
                            </div>
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

                        {/* Font Weight Section */}
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <BoldIcon className="w-4 h-4" />
                                {t("host.controls.fontWeight") || "Espessura"}
                            </label>
                            <div className="flex flex-col items-center space-y-2 px-2">
                                <S.RangeSlider
                                    value={fontWeight}
                                    min={100}
                                    max={900}
                                    step={100}
                                    onChange={handleSetFontWeight}
                                    width="w-full"
                                    ariaLabel={t("host.controls.fontWeight")}
                                />
                                <div className="flex justify-between w-full text-xs text-slate-500 font-mono px-1">
                                    <span>Thin</span>
                                    <span>Regular</span>
                                    <span>Bold</span>
                                    <span>Black</span>
                                </div>
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

                            <button
                                onClick={handleMirrorToggle}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${isMirrored
                                    ? "bg-brand-600/20 border-brand-500 text-brand-400"
                                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
                            >
                                <FlipIcon className="w-6 h-6" />
                                <span className="text-xs font-medium">{t("host.mirror")}</span>
                            </button>

                            <button
                                onClick={handleVerticalFlipToggle}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${isFlipVertical
                                    ? "bg-brand-600/20 border-brand-500 text-brand-400"
                                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
                            >
                                <FlipIcon className="w-6 h-6 rotate-90" />
                                <span className="text-xs font-medium">{t("host.mirrorV")}</span>
                            </button>

                            {!settings.isMusicianMode && (
                                <button
                                    onClick={toggleChroma}
                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${PROMPTER_DEFAULTS.CHROMA_THEMES.includes(theme)
                                        ? "bg-green-600/20 border-green-500 text-green-400"
                                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}
                                >
                                    <ApertureIcon className="w-6 h-6" />
                                    <span className="text-xs font-medium">{t("host.controls.chroma")}</span>
                                </button>
                            )}


                        </div>

                        {/* NDI Toggle Section */}
                        <div className="pt-2">
                            <NDIOutputToggle
                                isPro={isPro}
                                isEnabled={isNDIEnabled}
                                onToggle={onToggleNDI}
                                onShowPaywall={onShowPaywall}
                            />
                        </div>

                    </div>
                </S.Modal>
            )}

            {/* Compact Floating Panel - Shown in Live Preview Mode */}
            {isLivePreviewMode && isOpen && ReactDOM.createPortal(
                <div className="fixed top-4 right-4 z-[9999] w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 p-4 animate-in slide-in-from-top-2 duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                            <MaximizeIcon className="w-4 h-4 text-brand-400" />
                            {t("host.controls.livePreview") || "Visualização ao Vivo"}
                        </h3>
                        <button
                            onClick={closeLivePreview}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 text-brand-400 text-xs font-medium transition-all"
                        >
                            <CheckIcon className="w-3.5 h-3.5" />
                            {t("host.controls.done") || "Concluído"}
                        </button>
                    </div>

                    {/* Font Size Control */}
                    <div className="space-y-3 mb-4">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-lg font-bold">A</span>
                            {t("host.controls.fontSize")}
                        </label>
                        <div className="flex flex-col items-center space-y-2">
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

                    {/* Font Weight Control */}
                    <div className="space-y-3 mb-4">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <BoldIcon className="w-4 h-4" />
                            {t("host.controls.fontWeight") || "Espessura"}
                        </label>
                        <div className="flex flex-col items-center space-y-2">
                            <S.RangeSlider
                                value={fontWeight}
                                min={100}
                                max={900}
                                step={100}
                                onChange={handleSetFontWeight}
                                width="w-full"
                                ariaLabel={t("host.controls.fontWeight")}
                            />
                        </div>
                    </div>

                    {/* Margin Control */}
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <MarginIcon className="w-4 h-4" />
                            {t("host.controls.margin")}
                        </label>
                        <div className="flex flex-col items-center space-y-2">
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

                    {/* Helper Text */}
                    <div className="mt-4 pt-3 border-t border-slate-700/50">
                        <p className="text-xs text-slate-500 text-center">
                            {t("host.controls.livePreviewHelp") || "Ajuste e veja as mudanças em tempo real no teleprompter"}
                        </p>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
});
