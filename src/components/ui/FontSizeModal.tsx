import React from "react";
import * as S from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { PrompterActions } from "../../hooks/usePrompterSettings";

interface FontSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  setFontSize: PrompterActions["setFontSize"];
}

export const FontSizeModal = ({ isOpen, onClose, fontSize, setFontSize }: FontSizeModalProps) => {
  const { t } = useTranslation();

  return (
    <S.Modal isOpen={isOpen} onClose={onClose} title={t("host.controls.fontSize")}>
      <div className="flex flex-col items-center space-y-4 p-4">
        <S.RangeSlider
          value={fontSize}
          min={24}
          max={200}
          onChange={setFontSize}
          width="w-full"
          ariaLabel={t("host.controls.fontSize")}
        />
        <span className="text-xl font-bold text-white">{fontSize}px</span>
      </div>
    </S.Modal>
  );
};
