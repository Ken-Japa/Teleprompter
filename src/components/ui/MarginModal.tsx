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

  return (
    <S.Modal isOpen={isOpen} onClose={onClose} title={t("host.controls.margin")}>
      <div className="flex flex-col items-center space-y-4 p-4">
        <S.RangeSlider
          value={margin}
          min={23}
          max={50}
          onChange={setMargin}
          width="w-full"
          ariaLabel={t("host.controls.margin")}
        />

      </div>
    </S.Modal>
  );
};