import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { FlipIcon, MarginIcon, CapsIcon, PiPIcon } from "../../ui/Icons";
import type { PrompterSettings, PrompterActions } from "../../../hooks/usePrompterSettings";

interface DisplayControlProps {
  settings: PrompterSettings;
  actions: PrompterActions;
  onOpenMarginSlider: () => void;
  togglePiP?: () => void;
  isPiPActive?: boolean;
}

export const DisplayControl = memo(({ settings, actions, onOpenMarginSlider, togglePiP, isPiPActive }: DisplayControlProps) => {
  const { t } = useTranslation();
  const { isMirrored, isUpperCase } = settings;
  const { setIsMirrored, setIsUpperCase } = actions;

  return (
    <>
      <S.HudGroup label={t("host.mirror")}>
        <div className="flex items-center bg-slate-950/50 rounded-full p-2 border border-slate-800/50">
          <S.IconButton
            onClick={() => setIsMirrored(!isMirrored)}
            active={isMirrored}
            title={t("host.mirror")}
            aria-label={t("host.mirror")}
            className={`w-8 h-8 rounded-full ${isMirrored ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent shadow-none"}`}
          >
            <FlipIcon className="w-4 h-4" />
          </S.IconButton>
          <S.IconButton
            onClick={() => actions.setIsFlipVertical(!settings.isFlipVertical)}
            active={settings.isFlipVertical}
            title={t("host.mirrorV")}
            aria-label={t("host.mirrorV")}
            className={`w-8 h-8 rounded-full ${settings.isFlipVertical ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent shadow-none"}`}
          >
            <FlipIcon className="w-4 h-4 rotate-90" />
          </S.IconButton>
        </div>
      </S.HudGroup>

      <S.HudGroup label={t("host.hudLabels.display")}>
        <div className="flex items-center gap-2">
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
            onClick={() => setIsUpperCase(!isUpperCase)}
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
      </S.HudGroup>
    </>
  );
});
