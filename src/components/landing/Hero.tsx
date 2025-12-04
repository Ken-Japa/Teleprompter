import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";

interface HeroProps {
    onLaunch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch }) => {
    const { t } = useTranslation();
    const headline = t("landing.hero.headline") as string;
    const [firstPart, secondPart] = headline.includes(".")
        ? headline.split(".").map(s => s.trim()).filter(Boolean)
        : [headline, ""];

    return (
        <S.HeroSection>
            <div id="hero" className="inline-flex items-center space-x-3 bg-slate-900/60 border border-white/10 backdrop-blur-md rounded-full pl-2 pr-5 py-2 mb-12 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/30 transition-colors cursor-default animate-float">
                <span className="flex h-2.5 w-2.5 relative mx-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest text-shadow-glow">
                    {t("landing.hero.versionLive")}
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="block text-slate-100">{firstPart}{secondPart ? "." : ""}</span>
                {secondPart && <span className="block text-gradient relative z-10">{secondPart}.</span>}
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                {t("landing.hero.subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 mb-16">
                <S.PrimaryButton
                    onClick={onLaunch}
                    className="text-lg py-5 px-12 w-full sm:w-auto shadow-[0_0_50px_rgba(99,102,241,0.4)] hover:shadow-[0_0_80px_rgba(99,102,241,0.6)] transform hover:-translate-y-1 !rounded-2xl ring-2 ring-white/10"
                    aria-label="Launch Web App"
                >
                    {t("landing.hero.cta")}
                </S.PrimaryButton>

                <button
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-lg py-5 px-12 w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur text-white font-medium rounded-2xl border border-white/10 transition-all hover:scale-105"
                >
                    {t("landing.hero.ctaSecondary")}
                </button>
            </div>

            {/* Demo Visual - App Mockup */}
            <div className="relative max-w-5xl mx-auto mb-24 animate-fade-in-up perspective-1000" style={{ animationDelay: '0.3s' }}>
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0 hover:scale-[1.01] group">
                    
                    {/* Browser Chrome */}
                    <div className="h-8 bg-slate-900/50 border-b border-white/5 flex items-center px-4 space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-mono w-64 text-center">promptninja.app</div>
                    </div>

                    {/* App UI Mockup */}
                    <div className="aspect-[16/9] relative bg-slate-950 flex flex-col">
                        {/* Header */}
                        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-slate-900/30">
                            <div className="w-32 h-4 bg-white/10 rounded animate-pulse"></div>
                            <div className="flex space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30"></div>
                                <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                            </div>
                        </div>
                        
                        <div className="flex-1 flex relative overflow-hidden">
                             {/* Sidebar */}
                            <div className="w-64 border-r border-white/5 bg-slate-900/20 hidden md:flex flex-col p-4 gap-3">
                                <div className="h-10 bg-indigo-600/20 border border-indigo-500/20 rounded-lg w-full"></div>
                                <div className="h-8 bg-white/5 rounded-lg w-3/4"></div>
                                <div className="h-8 bg-white/5 rounded-lg w-full"></div>
                                <div className="h-8 bg-white/5 rounded-lg w-5/6"></div>
                            </div>

                            {/* Main Editor Area */}
                            <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                                {/* Teleprompter Text Effect */}
                                <div className="max-w-2xl text-center space-y-6 mask-image-gradient">
                                    <div className="text-4xl md:text-5xl font-display font-bold text-slate-600 blur-[2px] transition-all duration-500">Welcome to PromptNinja</div>
                                    <div className="text-5xl md:text-6xl font-display font-bold text-white scale-110 transition-all duration-500 text-shadow-glow">The Professional</div>
                                    <div className="text-5xl md:text-6xl font-display font-bold text-indigo-400 scale-105 transition-all duration-500">Teleprompter App</div>
                                    <div className="text-4xl md:text-5xl font-display font-bold text-slate-600 blur-[1px] transition-all duration-500">For Content Creators</div>
                                    <div className="text-4xl md:text-5xl font-display font-bold text-slate-700 blur-[3px] transition-all duration-500">Streamline your workflow</div>
                                </div>
                                
                                {/* Overlay Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    {/* Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                </div>

                {/* Floating Badges - Improved */}
                <div className="absolute -top-8 -right-8 glass-panel px-5 py-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl" style={{ animationDelay: '0s' }}>
                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-sm font-bold text-white tracking-wide">{t("landing.hero.offlineBadge")}</span>
                </div>
                
                <div className="absolute -bottom-8 -left-8 glass-panel px-5 py-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl" style={{ animationDelay: '1.5s' }}>
                   <div className="text-indigo-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                   </div>
                   <span className="text-sm font-bold text-white tracking-wide">{t("landing.hero.privacyBadge")}</span>
                </div>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-400 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">{t("landing.hero.userCount")}</span>
                    <span>{t("landing.hero.activeCreators")}</span>
                </div>
                <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">20min</span>
                    <span>{t("landing.hero.freeTrial")}</span>
                </div>
                <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">Zero</span>
                    <span>{t("landing.hero.zeroSetup")}</span>
                </div>
            </div>
        </S.HeroSection>
    );
};
