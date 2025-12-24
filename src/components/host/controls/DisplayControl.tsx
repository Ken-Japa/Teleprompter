import { memo, useCallback } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { FlipIcon, ChevronUpIcon, ChevronDownIcon } from "../../ui/Icons";
import type { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";
import { trackSettingChange } from "../../../utils/analytics";

interface DisplayControlProps {
  settings: PrompterSettings;
  actions: PrompterActions;
  hasParts?: boolean;
  onPreviousPart?: () => void;
  onNextPart?: () => void;
}

export const DisplayControl = memo(({ settings, actions, hasParts, onPreviousPart, onNextPart }: DisplayControlProps) => {
  const { t } = useTranslation();
  const { isMirrored, isFlipVertical } = settings;
  const { setIsMirrored, setIsFlipVertical } = actions;

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

      <div className="flex items-center bg-slate-950/50 rounded-full p-1 border border-slate-800/50">
        <S.IconButton
          onClick={handleMirrorToggle}
          active={isMirrored}
          title={t("host.mirror")}
          aria-label={t("host.mirror")}
          className={`w-8 h-8 rounded-full ${isMirrored ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent shadow-none"}`}
        >
          <FlipIcon className="w-4 h-4" />
        </S.IconButton>
        <S.IconButton
          onClick={handleVerticalFlipToggle}
          active={settings.isFlipVertical}
          title={t("host.mirrorV")}
          aria-label={t("host.mirrorV")}
          className={`w-8 h-8 rounded-full ${settings.isFlipVertical ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent shadow-none"}`}
        >
          <FlipIcon className="w-4 h-4 rotate-90" />
        </S.IconButton>
      </div>

    </div>
  );
});
