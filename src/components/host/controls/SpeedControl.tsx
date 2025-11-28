import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { PlayIcon, PauseIcon, StopIcon } from "../../ui/Icons";

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
   <S.IconButton onClick={onReset} aria-label="Reset" className="w-8 h-8 sm:w-10 sm:h-10">
    <StopIcon className="w-4 h-4 sm:w-5 sm:h-5" />
   </S.IconButton>
   <button
    onClick={() => onStateChange(!isPlaying, speed)}
    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 ${isPlaying ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
    aria-label={isPlaying ? t("host.controls.pause") : t("host.controls.play")}
   >
    {isPlaying ? <PauseIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
   </button>
   <S.RangeSlider
    value={speed}
    min={0}
    max={10}
    step={0.1}
    onChange={(s) => onStateChange(isPlaying, s)}
    width="w-16 sm:w-24"
    ariaLabel="Speed Control"
   />
  </S.HudGroup>
 );
});
