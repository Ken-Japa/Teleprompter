import React from "react";

export const StatusBadge = ({ status, label, className = "" }: { status: string; label: string; className?: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "CONNECTED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_-3px_rgba(52,211,153,0.3)]";
      case "ERROR":
        return "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_-3px_rgba(248,113,113,0.3)]";
      case "CONNECTING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_-3px_rgba(251,191,36,0.3)]";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold px-3 py-1 rounded-full border tracking-wider transition-all duration-300 backdrop-blur-sm ${getStatusStyles()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === "CONNECTED" ? "bg-emerald-400 animate-pulse" : status === "ERROR" ? "bg-red-400" : "bg-current"}`} />
      {label}
    </span>
  );
};

export const ErrorToast = ({ message }: { message: string }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-950/90 backdrop-blur-md border border-red-500/30 text-red-200 px-6 py-3 rounded-full shadow-lg shadow-red-900/20 flex items-center gap-3 z-50 animate-slideDown">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
    <span className="text-xs font-bold uppercase tracking-wide">{message}</span>
  </div>
);

export const PaywallModal = ({
  title,
  desc,
  children,
  onClose,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
  onClose?: () => void;
}) => (
  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-fadeIn">
    <div className="relative bg-slate-900/90 border border-indigo-500/30 p-10 rounded-[2rem] shadow-2xl shadow-indigo-500/20 max-w-md w-full text-center overflow-hidden group">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 pointer-events-none" />
      
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          aria-label="Fechar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      <div className="relative inline-block p-4 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg transform group-hover:scale-110 transition-transform duration-500" />
        <div className="relative bg-slate-950 p-3 rounded-2xl border border-white/10 shadow-xl">
            <img
            src="/assets/LogoPrompt.png"
            alt="Logo PromptNinja"
            className="w-10 h-10 object-contain drop-shadow-lg"
            />
        </div>
      </div>
      
      <h2 className="text-3xl font-display font-black text-white mb-4 tracking-tight">
        {title}
      </h2>
      
      <p className="text-slate-400 mb-8 leading-relaxed text-sm font-medium">
        {desc}
      </p>
      
      <div className="relative z-10">
        {children}
      </div>
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
      className={`text-center pointer-events-none select-none ${color} transition-colors duration-500`}
      style={style}
    >
      <span className="text-6xl md:text-8xl font-black uppercase tracking-tighter -rotate-6 inline-block drop-shadow-sm mix-blend-overlay" style={{ letterSpacing: "-0.05em" }}>
        {text}
      </span>
    </div>
  );
};

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-1 bg-slate-800/50 relative overflow-hidden backdrop-blur-sm rounded-full">
    <div
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200 ease-linear shadow-[0_0_15px_rgba(99,102,241,0.6)]"
      style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
    >
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
    </div>
  </div>
);
