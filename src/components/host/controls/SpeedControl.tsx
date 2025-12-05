import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { PlayIcon, PauseIcon, StopIcon } from "../../ui/Icons";
import { UI_LIMITS } from "../../../config/constants";

interface SpeedControlProps {
    isPlaying: boolean;
    speed: number;
    onStateChange: (playing: boolean, speed: number) => void;
    onReset: () => void;
}

export const SpeedControl = memo(({ isPlaying, speed, onStateChange, onReset }: SpeedControlProps) => {
    const { t } = useTranslation();
    return (
        <S.HudGroup label={t("host.controls.speed")}>
            <div className="flex items-center gap-2">
                 <S.IconButton onClick={onReset} title={t("host.controls.reset")} aria-label={t("host.controls.reset")} className="w-9 h-9 rounded-full hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30">
                    <StopIcon className="w-4 h-4" />
                </S.IconButton>
                
                <button
                    onClick={() => onStateChange(!isPlaying, speed)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 border ${isPlaying ? "bg-amber-500/90 hover:bg-amber-500 text-white border-amber-400/50 shadow-amber-500/30" : "bg-brand-600 hover:bg-brand-500 text-white border-brand-400/50 shadow-brand-500/30"}`}
                    title={isPlaying ? t("host.controls.pause") : t("host.controls.play")}
                    aria-label={isPlaying ? t("host.controls.pause") : t("host.controls.play")}
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5 fill-current" /> : <PlayIcon className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <div className="relative flex items-center justify-center px-2">
                    <S.RangeSlider
                        value={speed}
                        min={UI_LIMITS.SPEED.MIN}
                        max={UI_LIMITS.SPEED.MAX}
                        step={UI_LIMITS.SPEED.STEP}
                        onChange={(s) => onStateChange(isPlaying, s)}
                        width="w-20 sm:w-24"
                        ariaLabel={t("host.controls.speed")}
                        title={t("host.controls.speed")}
                    />
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 tabular-nums tracking-tight pointer-events-none">{speed}x</span>
                </div>
            </div>
        </S.HudGroup>
    );
});
