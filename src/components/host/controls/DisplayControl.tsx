import { memo, useCallback } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { FlipIcon, MarginIcon, CapsIcon, PiPIcon, ChevronUpIcon, ChevronDownIcon } from "../../ui/Icons";
import type { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";
import { trackSettingChange } from "../../../utils/analytics";

interface DisplayControlProps {
  settings: PrompterSettings;
  actions: PrompterActions;
  onOpenMarginSlider: () => void;
  togglePiP?: () => void;
  isPiPActive?: boolean;
  onPreviousPart?: () => void;
  onNextPart?: () => void;
}

export const DisplayControl = memo(({ settings, actions, onOpenMarginSlider, togglePiP, isPiPActive, onPreviousPart, onNextPart }: DisplayControlProps) => {
  const { t } = useTranslation();
  const { isMirrored, isUpperCase, isFlipVertical } = settings;
  const { setIsMirrored, setIsUpperCase, setIsFlipVertical } = actions;

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

  const handleUpperCaseToggle = useCallback(() => {
    const newValue = !isUpperCase;
    trackSettingChange("upper_case", newValue);
    setIsUpperCase(newValue);
  }, [isUpperCase, setIsUpperCase]);

  return (
    <div className="flex items-center gap-2">
      {/* Navigation Buttons */}
      {(onPreviousPart || onNextPart) && (
        <div className="flex items-center bg-slate-950/50 rounded-full p-1 border border-slate-800/50 mr-1">
          <S.IconButton
            onClick={onPreviousPart}
            disabled={!onPreviousPart}
            title={t("host.controls.prevPart") || "Previous Part"}
            aria-label="Previous Part"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
          >
            <ChevronUpIcon className="w-5 h-5" />
          </S.IconButton>
          <S.IconButton
            onClick={onNextPart}
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

      <S.IconButton
        onClick={onOpenMarginSlider}
        active={false}
        title={t("host.controls.margin")}
        aria-label={t("host.controls.margin")}
        className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
      >
        <MarginIcon className="w-5 h-5" />
      </S.IconButton>
      <S.IconButton
        onClick={handleUpperCaseToggle}
        active={isUpperCase}
        title={t("host.controls.caps")}
        aria-label={t("host.controls.caps")}
        className={`w-9 h-9 rounded-full ${isUpperCase ? "bg-brand-500/20 text-brand-400 border-brand-500/30" : "hover:bg-white/10 border-transparent text-slate-400"}`}
      >
        <CapsIcon className="w-5 h-5" />
      </S.IconButton>

      {togglePiP && (
        <S.IconButton
          onClick={togglePiP}
          active={isPiPActive}
          title="Picture-in-Picture"
          aria-label="Picture-in-Picture"
          className={`w-9 h-9 rounded-full ${isPiPActive ? "bg-brand-500/20 text-brand-400 border-brand-500/30" : "hover:bg-white/10 border-transparent text-slate-400"}`}
        >
          <PiPIcon className="w-5 h-5" />
        </S.IconButton>
      )}
    </div>
  );
});
