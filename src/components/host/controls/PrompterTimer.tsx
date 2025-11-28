import { memo, useState, useEffect } from "react";

export const PrompterTimer = memo(({ isPlaying, onReset }: { isPlaying: boolean; onReset?: boolean }) => {
 const [elapsedTime, setElapsedTime] = useState(0);

 useEffect(() => {
  if (!isPlaying) return;
  const int = setInterval(() => setElapsedTime((p) => p + 1), 1000);
  return () => clearInterval(int);
 }, [isPlaying]);

 useEffect(() => {
  if (onReset) setElapsedTime(0);
 }, [onReset]);

 const format = (time: number) => {
  const mins = Math.floor(time / 60)
   .toString()
   .padStart(2, "0");
  const secs = (time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
 };

 return (
  <div className="font-mono font-bold text-xl min-w-[80px] text-center timer-text">{format(elapsedTime)}</div>
 );
});
