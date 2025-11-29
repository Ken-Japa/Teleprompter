import * as S from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { PrompterActions } from "../../hooks/usePrompterSettings";

interface MarginModalProps {
  isOpen: boolean;
  onClose: () => void;
  margin: number;
  setMargin: PrompterActions["setMargin"];
}

export const MarginModal = ({ isOpen, onClose, margin, setMargin }: MarginModalProps) => {
  const { t } = useTranslation();
  const minMargin = 0;
  const maxMargin = 40;
  // Ensure sliderValue is within bounds [0, 100] to prevent visual glitches
  const rawSliderValue = ((margin - minMargin) / (maxMargin - minMargin)) * 100;
  const sliderValue = Math.min(Math.max(rawSliderValue, 0), 100);

  return (
    <S.Modal isOpen={isOpen} onClose={onClose} title={t("host.controls.margin")}>
      <div className="flex flex-col items-center space-y-4 p-4">
        <S.RangeSlider
          value={sliderValue}
          min={0}
          max={100}
          onChange={v => setMargin(minMargin + ((maxMargin - minMargin) * v) / 100)}
          width="w-full"
          ariaLabel={t("host.controls.margin")}
        />
        <span className="text-xl font-bold text-white">{Math.round(sliderValue)}%</span>
      </div>
    </S.Modal>
  );
};