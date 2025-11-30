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
   <div className="hidden sm:flex items-center">
    <S.IconButton onClick={() => setFontSize((f) => Math.max(UI_LIMITS.FONT_SIZE.MIN, f - UI_LIMITS.FONT_SIZE.STEP_BUTTON))} aria-label="Decrease Font Size" className="w-8 h-8 sm:w-10 sm:h-10">
     <TextSizeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
    </S.IconButton>
    <S.RangeSlider
     value={fontSize}
     min={UI_LIMITS.FONT_SIZE.MIN}
     max={UI_LIMITS.FONT_SIZE.MAX}
     onChange={setFontSize}
     width="w-16 sm:w-20"
     ariaLabel="Font Size"
    />
    <S.IconButton onClick={() => setFontSize((f) => Math.min(UI_LIMITS.FONT_SIZE.MAX, f + UI_LIMITS.FONT_SIZE.STEP_BUTTON))} aria-label="Increase Font Size" className="w-8 h-8 sm:w-10 sm:h-10">
     <TextSizeIcon className="w-4 h-4 sm:w-6 sm:h-6" />
    </S.IconButton>
   </div>

   {/* Botão para telas pequenas para abrir o slider dedicado */}
   <S.IconButton
    onClick={onOpenFontSizeSlider}
    title={t("host.controls.size")}
    aria-label={t("host.controls.size")}
    className="flex sm:hidden w-8 h-8"
   >
    <TextSizeIcon className="w-4 h-4" />
   </S.IconButton>
  </S.HudGroup>
 );
});
