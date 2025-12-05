import React from "react";
import { useTranslation } from "../../../hooks/useTranslation";

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
  onClose,
  onUpgrade,
  children,
  title,
  desc
}: {
  onClose?: () => void;
  onUpgrade?: () => void;
  children?: React.ReactNode;
  title?: string;
  desc?: string;
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900/90 rounded-3xl p-8 border border-brand-500/30 shadow-2xl shadow-brand-500/10 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-brand-500/30 rotate-3">
            <span className="text-4xl">👑</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {title || t("host.paywall.title")}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {desc || t("host.paywall.desc")}
            </p>
          </div>

          {/* If children are provided (like Input field), show them. Otherwise show features list */}
          {children ? (
            <div className="py-2">{children}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-left">
              {["Unlimited Scripts", "AI Writer Access", "Remote Control", "Cloud Sync"].map((feature, i) => (
                <div key={i} className="flex items-center space-x-2 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">✓</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 space-y-3">
            {onUpgrade && (
              <button
                onClick={onUpgrade}
                className="w-full py-4 px-6 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {t("host.paywall.cta")}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-white text-sm font-medium transition-colors"
              >
                {onUpgrade ? t("host.paywall.maybeLater") : t("host.paywall.close")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-200 ease-linear shadow-[0_0_15px_theme(colors.brand.500/0.6)]"
      style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
    </div>
  </div>
);
