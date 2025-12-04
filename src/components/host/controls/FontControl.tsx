import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { TextSizeIcon } from "../../ui/Icons";
import { PrompterActions } from "../../../hooks/usePrompterSettings";
import { UI_LIMITS } from "../../../config/constants";

interface FontControlProps {
 fontSize: number;
 setFontSize: PrompterActions["setFontSize"];
 onOpenFontSizeSlider: () => void;
}

export const FontControl = memo(({ fontSize, setFontSize, onOpenFontSizeSlider }: FontControlProps) => {
 const { t } = useTranslation();
 return (
  <S.HudGroup label={t("host.controls.size")}>
   {/* Controles para telas maiores */}
   <div className="hidden sm:flex items-center gap-2">
    <S.IconButton 
        onClick={() => setFontSize((f) => Math.max(UI_LIMITS.FONT_SIZE.MIN, f - UI_LIMITS.FONT_SIZE.STEP_BUTTON))} 
        aria-label="Decrease Font Size" 
        className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent"
    >
     <TextSizeIcon className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
    </S.IconButton>
    
    <div className="flex flex-col items-center justify-center px-1">
        <S.RangeSlider
        value={fontSize}
        min={UI_LIMITS.FONT_SIZE.MIN}
        max={UI_LIMITS.FONT_SIZE.MAX}
        onChange={setFontSize}
        width="w-20 sm:w-24"
        ariaLabel="Font Size"
        />
        <span className="text-[9px] font-mono text-slate-400 mt-1 tabular-nums tracking-tight">{fontSize}px</span>
    </div>

    <S.IconButton 
        onClick={() => setFontSize((f) => Math.min(UI_LIMITS.FONT_SIZE.MAX, f + UI_LIMITS.FONT_SIZE.STEP_BUTTON))} 
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
