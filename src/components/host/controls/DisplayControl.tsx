import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { FlipIcon, MarginIcon, CapsIcon } from "../../ui/Icons";
import type { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";

interface DisplayControlProps {
  settings: PrompterSettings;
  actions: PrompterActions;
  onOpenMarginSlider: () => void;
}

export const DisplayControl = memo(({ settings, actions, onOpenMarginSlider }: DisplayControlProps) => {
  const { t } = useTranslation();
  const { isMirrored, isUpperCase, margin } = settings;
  const { setIsMirrored, setIsUpperCase } = actions;

  return (
    <S.HudGroup>
      <S.IconButton
        onClick={() => setIsMirrored(!isMirrored)}
        active={isMirrored}
        title={t("host.mirror")}
        aria-label={t("host.mirror")}
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <FlipIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </S.IconButton>
      <S.IconButton
        onClick={() => actions.setIsFlipVertical(!settings.isFlipVertical)}
        active={settings.isFlipVertical}
        title={t("host.mirrorV")}
        aria-label={t("host.mirrorV")}
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <FlipIcon className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
      </S.IconButton>
      <S.IconButton
        onClick={onOpenMarginSlider}
        active={margin > 0}
        title={t("host.controls.margin")}
        aria-label={t("host.controls.margin")}
        className={`w-8 h-8 sm:w-10 sm:h-10 ${margin > 0 ? "bg-white/5 border-white/5 text-slate-400 shadow-none" : ""}`}
      >
        <MarginIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </S.IconButton>
      <S.IconButton
        onClick={() => setIsUpperCase(!isUpperCase)}
        active={isUpperCase}
        title={t("host.controls.caps")}
        aria-label={t("host.controls.caps")}
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <CapsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </S.IconButton>
    </S.HudGroup>
  );
});
