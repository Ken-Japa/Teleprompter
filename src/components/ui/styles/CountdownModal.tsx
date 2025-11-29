import React, { useState, useEffect } from "react";

interface CountdownModalProps {
  duration: number; // Duration in seconds
  onCountdownEnd: () => void;
  message: string;
}

export const CountdownModal: React.FC<CountdownModalProps> = ({
  duration,
  onCountdownEnd,
  message,
}) => {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    if (countdown === 0) {
      onCountdownEnd();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onCountdownEnd]);

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-[101] flex items-center justify-center p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl shadow-[0_0_100px_rgba(79,70,229,0.3)] max-w-md w-full text-center">
        <h2 className="text-3xl font-black text-white mb-4">{message}</h2>
        <p className="text-slate-400 text-6xl font-bold">{countdown}</p>
      </div>
    </div>
  );
};