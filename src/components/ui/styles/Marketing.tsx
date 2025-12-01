import React from "react";
import { useTranslation } from "../../../hooks/useTranslation";


export const LandingContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 selection:text-white overflow-y-auto overflow-x-hidden relative">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-[1]"></div>
        <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0"></div>
         {/* Enhanced Background Gradients */}
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow delay-700"></div>
        {children}
    </div>
);

export const LandingNav = ({ children }: { children: React.ReactNode }) => (
    <header className="fixed top-0 w-full z-50 bg-[#020617]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300 supports-[backdrop-filter]:bg-[#020617]/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">{children}</div>
    </header>
);

export const HeroSection = ({ children }: { children: React.ReactNode }) => (
    <section className="pt-48 pb-32 px-6 text-center relative overflow-hidden z-10 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto relative w-full">
            {/* Ambient Hero Light - Improved */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-[100px] rounded-full -z-10 pointer-events-none opacity-80 mix-blend-screen"></div>
            
            {children}
        </div>
    </section>
);

export const FeatureCard = ({
    title,
    desc,
    icon,
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
}) => (
    <div className="relative group h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent transition-colors duration-500 group-hover:from-indigo-500/40 group-hover:via-indigo-500/10 group-hover:to-transparent">
             <div className="bg-[#0a0f1e]/80 backdrop-blur-sm h-full p-8 rounded-[23px] relative z-10 overflow-hidden transition-colors duration-500 group-hover:bg-[#0a0f1e]/60">
                <div className="relative z-20 flex flex-col h-full">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-lg group-hover:shadow-indigo-500/40">
                        {icon}
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed text-balance">{desc}</p>
                </div>
            </div>
        </div>
    </div>
);

export const PricingCard = ({
    title,
    price,
    subtitle,
    oneTime,
    children,
    onClick,
}: {
    title: string;
    price: string;
    subtitle: string;
    oneTime: string;
    children: React.ReactNode;
    onClick: () => void;
}) => {
    const { t } = useTranslation();
    return (
        <div className="relative p-[1px] rounded-[3rem] overflow-hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_100px_-20px_rgba(99,102,241,0.4)] max-w-sm w-full mx-auto transform hover:scale-[1.02] transition-transform duration-500 group ring-1 ring-white/20">
            <div className="bg-[#050914] p-10 rounded-[47px] relative h-full flex flex-col items-center text-center">
                {/* Inner sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[47px] pointer-events-none"></div>

                <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-500/30 mb-8 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        {t("landing.pricing.limitedOffer")}
                    </div>

                    <h3 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">{title}</h3>
                    <div className="text-7xl font-display font-black text-white mb-2 tracking-tighter drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        {price}
                    </div>
                    <div className="text-slate-500 text-sm mb-10 font-medium tracking-wide">{oneTime}</div>


                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                    <ul className="space-y-4 mb-10 text-left w-full px-4">{children}</ul>

                    <button
                        onClick={onClick}
                        className="w-full py-4 bg-white text-slate-950 font-bold text-lg rounded-2xl hover:bg-indigo-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 duration-200 flex items-center justify-center tracking-tight"
                    >
                        {subtitle}
                    </button>
                    <p className="text-slate-500 text-xs mt-4 text-center">{t("landing.pricing.conversionNotice")}</p>
                </div>
            </div>
        </div>
    );
};
