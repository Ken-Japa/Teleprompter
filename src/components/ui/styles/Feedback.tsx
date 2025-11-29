import React from "react";

export const StatusBadge = ({ status, label }: { status: string; label: string }) => {
  const colorClass =
    status === "CONNECTED"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
      : status === "ERROR"
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-slate-800 text-slate-400 border-slate-700";

  return (
    <span
      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${colorClass} tracking-wider transition-all duration-300`}
    >
      {label}
    </span>
  );
};

export const ErrorToast = ({ message }: { message: string }) => (
  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-xs font-bold uppercase tracking-widest z-50 animate-slideDown shadow-lg">
    {message}
  </div>
);

export const PaywallModal = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fadeIn">
    <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl shadow-[0_0_100px_rgba(79,70,229,0.3)] max-w-md w-full text-center">
      <div className="inline-block p-4 bg-indigo-500/10 rounded-full mb-6">
        <img
          src="/assets/LogoPrompt.png"
          alt="Logo PromptNinja"
          className="w-8 h-5 relative z-10 group-hover:brightness-125 transition-all duration-300"
        />
      </div>
      <h2 className="text-3xl font-black text-white mb-4">{title}</h2>
      <p className="text-slate-400 mb-8 leading-relaxed">{desc}</p>
      {children}
    </div>
  </div>
);

export const Watermark = ({ text, theme, style }: { text: string; theme?: string; style?: React.CSSProperties }) => {
  let color = "text-white opacity-[0.03]";
  if (theme === "paper" || theme === "cream") color = "text-slate-900 opacity-[0.05]";
  if (theme === "contrast") color = "text-yellow-400 opacity-[0.1]";
  if (theme === "matrix") color = "text-green-500 opacity-[0.1]";
  if (theme === "cyber") color = "text-pink-500 opacity-[0.1]";

  return (
    <div
      className={`text-center pointer-events-none select-none ${color}`}
      style={style}
    >
      <span className="text-6xl md:text-8xl font-black uppercase tracking-tighter -rotate-6 inline-block" style={{ letterSpacing: "-0.05em" }}>
        {text}
      </span>
    </div>
  );
};

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-1.5 bg-slate-800 relative overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-200 ease-linear shadow-[0_0_10px_rgba(99,102,241,0.8)]"
      style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
    />
  </div>
);
