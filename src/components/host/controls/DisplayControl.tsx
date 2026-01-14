import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { ChevronUpIcon, ChevronDownIcon } from "../../ui/Icons";


interface DisplayControlProps {
  hasParts?: boolean;
  onPreviousPart?: () => void;
  onNextPart?: () => void;
}

export const DisplayControl = memo(({ hasParts, onPreviousPart, onNextPart }: DisplayControlProps) => {
  const { t } = useTranslation();


  return (
    <div className="flex items-center gap-2">
      {/* Navigation Buttons */}
      {hasParts && (onPreviousPart || onNextPart) && (
        <div className="flex items-center bg-slate-950/50 rounded-full p-1 border border-slate-800/50 mr-1">
          <S.IconButton
            onClick={() => onPreviousPart?.()}
            disabled={!onPreviousPart}
            title={t("host.controls.prevPart") || "Previous Part"}
            aria-label="Previous Part"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
          >
            <ChevronUpIcon className="w-5 h-5" />
          </S.IconButton>
          <S.IconButton
            onClick={() => onNextPart?.()}
            disabled={!onNextPart}
            title={t("host.controls.nextPart") || "Next Part"}
            aria-label="Next Part"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
          >
            <ChevronDownIcon className="w-5 h-5" />
          </S.IconButton>
        </div>
      )}



    </div>
  );
});
