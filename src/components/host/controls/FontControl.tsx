import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { TextSizeIcon } from "../../ui/Icons";
import { PrompterActions } from "../../../hooks/usePrompterSettings";

interface FontControlProps {
 fontSize: number;
 setFontSize: PrompterActions["setFontSize"];
}

export const FontControl = memo(({ fontSize, setFontSize }: FontControlProps) => {
 const { t } = useTranslation();
 return (
  <S.HudGroup label={t("host.controls.size")}>
   <S.IconButton onClick={() => setFontSize((f) => Math.max(20, f - 4))} aria-label="Decrease Font Size" className="w-8 h-8 sm:w-10 sm:h-10">
    <TextSizeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
   </S.IconButton>
   <S.RangeSlider
    value={fontSize}
    min={24}
    max={200}
    onChange={setFontSize}
    width="w-16 sm:w-20"
    ariaLabel="Font Size"
   />
   <S.IconButton onClick={() => setFontSize((f) => Math.min(200, f + 4))} aria-label="Increase Font Size" className="w-8 h-8 sm:w-10 sm:h-10">
    <TextSizeIcon className="w-4 h-4 sm:w-6 sm:h-6" />
   </S.IconButton>
  </S.HudGroup>
 );
});
