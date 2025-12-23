import { memo, useCallback } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { TextSizeIcon } from "../../ui/Icons";
import { PrompterActions } from "../../../hooks/usePrompterSettings";
import { UI_LIMITS } from "../../../config/constants";
import { trackSettingChange } from "../../../utils/analytics";

interface FontControlProps {
    fontSize: number;
    setFontSize: PrompterActions["setFontSize"];
    onOpenFontSizeSlider: () => void;
}

export const FontControl = memo(({ fontSize, setFontSize, onOpenFontSizeSlider }: FontControlProps) => {
    const { t } = useTranslation();

    const handleSetFontSize = useCallback((newSize: number | ((prevSize: number) => number)) => {
        const finalSize = typeof newSize === 'function' ? newSize(fontSize) : newSize;
        trackSettingChange("font_size", finalSize);
        setFontSize(newSize);
    }, [fontSize, setFontSize]);

    return (
        <S.HudGroup label={t("host.controls.size")}>
            {/* Controles para telas maiores */}
            <div className="hidden sm:flex items-center gap-2">
                <S.IconButton
                    onClick={() => handleSetFontSize((f) => Math.max(UI_LIMITS.FONT_SIZE.MIN, f - UI_LIMITS.FONT_SIZE.STEP_BUTTON))}
                    aria-label="Decrease Font Size"
                    className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent"
                >
                    <TextSizeIcon className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
                </S.IconButton>

                <div className="relative flex items-center justify-center px-1">
                    <S.RangeSlider
                        value={fontSize}
                        min={UI_LIMITS.FONT_SIZE.MIN}
                        max={UI_LIMITS.FONT_SIZE.MAX}
                        onChange={handleSetFontSize}
                        width="w-16 sm:w-18"
                        ariaLabel="Font Size"
                    />
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 tabular-nums tracking-tight pointer-events-none">{fontSize}px</span>
                </div>

                <S.IconButton
                    onClick={() => handleSetFontSize((f) => Math.min(UI_LIMITS.FONT_SIZE.MAX, f + UI_LIMITS.FONT_SIZE.STEP_BUTTON))}
                    aria-label="Increase Font Size"
                    className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent"
                >
                    <TextSizeIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                </S.IconButton>
            </div>

            {/* Botão para telas pequenas para abrir o slider dedicado */}
            <S.IconButton
                onClick={onOpenFontSizeSlider}
                title={t("host.controls.size")}
                aria-label={t("host.controls.size")}
                className="flex sm:hidden w-9 h-9 rounded-full border-transparent bg-white/5"
            >
                <TextSizeIcon className="w-5 h-5" />
            </S.IconButton>
        </S.HudGroup>
    );
});
