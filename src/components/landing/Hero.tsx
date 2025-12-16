import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";

interface HeroProps {
    onLaunch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const headline = t("landing.hero.headline") as string;
    // Split by dot but preserve robustness if no dot exists
    const parts = headline.split(".").map(s => s.trim()).filter(Boolean);
    const firstPart = parts[0];
    const secondPart = parts.length > 1 ? parts.slice(1).join(". ") : null;

    return (
        <S.HeroSection>
            <div id="hero" className="inline-flex items-center space-x-3 glass px-4 py-2 rounded-full mb-12 animate-float hover:bg-white/5 transition-colors cursor-default">
                <span className="flex h-2.5 w-2.5 relative mx-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-brand-200 uppercase tracking-widest text-shadow-glow">
                    {t("landing.hero.versionLive")}
                </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="block text-gradient">{firstPart}{secondPart ? "." : ""}</span>
                {secondPart && <span className="block text-slate-100 relative z-10">{secondPart}.</span>}
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                {t("landing.hero.subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 mb-16">
                <S.PrimaryButton
                    onClick={onLaunch}
                    className="text-lg py-5 px-12 w-full sm:w-auto !rounded-2xl shadow-brand-500/40 hover:shadow-brand-500/60 hover-glow btn-press transition-smooth"
                    aria-label="Launch Web App"
                >
                    {t("landing.hero.cta")}
                </S.PrimaryButton>

                <button
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-lg py-5 px-12 w-full sm:w-auto glass hover:bg-white/10 text-white font-medium rounded-2xl transition-smooth hover:scale-105 hover:border-white/20 btn-press"
                >
                    {t("landing.hero.ctaSecondary")}
                </button>
            </div>

            {/* Demo Visual - App Mockup */}
            <div className="relative max-w-5xl mx-auto mb-24 animate-fade-in-up perspective-1000 safe-container px-4" style={{ animationDelay: '0.3s' }}>
                <div className="relative glass bg-slate-900/40 rounded-2xl shadow-2xl overflow-hidden transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0 hover:scale-[1.01] group border border-white/10 card-depth">

                    {/* Browser Chrome */}
                    <div className="h-10 glass border-b border-white/5 flex items-center px-4 space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
                        <div className="ml-4 px-3 py-1.5 rounded-md bg-white/5 text-[10px] text-slate-500 font-mono w-64 text-center border border-white/5">promptninja.app</div>
                    </div>

                    {/* App UI Mockup */}
                    <div className="aspect-[16/9] relative bg-slate-950/50 flex flex-col">
                        {/* Header */}
                        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 glass">
                            <div className="w-32 h-4 bg-white/10 rounded animate-pulse"></div>
                            <div className="flex space-x-3">
                                <div className="w-9 h-9 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-brand-400 rounded-full"></div>
                                </div>
                                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5"></div>
                            </div>
                        </div>

                        <div className="flex-1 flex relative overflow-hidden">
                            {/* Sidebar */}
                            <div className="w-64 border-r border-white/5 bg-slate-900/20 hidden md:flex flex-col p-4 gap-3">
                                <div className="h-10 bg-brand-600/20 border border-brand-500/20 rounded-lg w-full"></div>
                                <div className="h-8 bg-white/5 rounded-lg w-3/4"></div>
                                <div className="h-8 bg-white/5 rounded-lg w-full"></div>
                                <div className="h-8 bg-white/5 rounded-lg w-5/6"></div>
                            </div>

                            {/* Main Editor Area */}
                            <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950/0 to-slate-950/50">
                                {/* Teleprompter Text Effect */}
                                <div className="max-w-3xl text-center space-y-4 sm:space-y-6 mask-image-gradient">
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-600 blur-[2px] transition-all duration-500">Welcome to PromptNinja</div>
                                    <div className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white scale-110 transition-all duration-500 text-shadow-glow">The Professional</div>
                                    <div className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-brand-400 scale-105 transition-all duration-500">Teleprompter App</div>
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-600 blur-[1px] transition-all duration-500">For Content Creators</div>
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-700 blur-[3px] transition-all duration-500">Streamline your workflow</div>
                                </div>

                                {/* Overlay Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    {/* Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                </div>

                {/* Ambient Glow behind the mockup */}
                <div className="absolute -inset-4 bg-brand-500/20 blur-3xl -z-10 rounded-[3rem] opacity-40"></div>

                {/* Floating Badges - Improved with Safe Positioning */}
                <div className="absolute top-2 right-2 sm:-top-8 sm:-right-8 glass px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 animate-float shadow-xl border border-white/10 max-w-[calc(100%-1rem)]" style={{ animationDelay: '0s' }}>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide whitespace-nowrap">{t("landing.hero.offlineBadge")}</span>
                </div>

                <div className="absolute bottom-2 left-2 sm:-bottom-8 sm:-left-8 glass px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 animate-float shadow-xl border border-white/10 max-w-[calc(100%-1rem)]" style={{ animationDelay: '1.5s' }}>
                    <div className="text-brand-400">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide whitespace-nowrap">{t("landing.hero.privacyBadge")}</span>
                </div>
            </div>


            {/* P2P Section - Differential 1 */}
            <div className="mt-24 mb-16 max-w-4xl mx-auto text-center px-4 relative z-10">
                <div className="inline-block glass px-4 py-1.5 rounded-full text-brand-300 font-bold text-sm mb-6 uppercase tracking-wider border border-brand-500/20">
                    {t("landing.hero.p2pSection.badge")}
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
                    {t("landing.hero.p2pSection.headline").split(".")[0]}.
                    <span className="block mt-2 pb-4 text-gradient-emerald">
                        {t("landing.hero.p2pSection.headline").split(".")[1]}.
                    </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    {t("landing.hero.p2pSection.subheadline")}
                </p>
                <div className="mt-8 flex justify-center px-4">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-emerald-500/20 shadow-lg shadow-emerald-500/10 w-full max-w-md">
                        <div className="flex items-center gap-4 sm:gap-8 text-emerald-400 font-mono text-sm">
                            <div className="text-center flex-shrink-0">
                                <div className="text-white font-bold text-sm sm:text-lg">PROMPTNINJA</div>
                                <div className="text-xs text-slate-500">P2P DIRECT</div>
                            </div>
                            <div className="flex-1 h-px bg-emerald-500/50 min-w-[60px] max-w-[120px] relative">
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDuration: "1.5s", top: "calc(50% - 2.5px)" }}></div>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDuration: "1.5s", animationDelay: "0.75s", top: "calc(50% - 2.5px)" }}></div>
                            </div>
                            <div className="text-white font-bold text-lg sm:text-xl flex-shrink-0">~4ms</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-center items-center gap-8 text-sm text-slate-300 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">{t("landing.hero.userCount")}</span>
                    <span>{t("landing.hero.activeCreators")}</span>
                </div>
                <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">20min</span>
                    <span>{t("landing.hero.freeTrial")}</span>
                </div>
                <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">Zero</span>
                    <span>{t("landing.hero.zeroSetup")}</span>
                </div>
            </div>

            {/* App Video Demo */}
            <div className="relative max-w-4xl mx-auto mt-24 mb-12 animate-fade-in-up safe-container px-4" style={{ animationDelay: '0.6s' }}>
                <div className="relative glass bg-slate-900/40 rounded-2xl shadow-2xl overflow-hidden border border-white/10 group card-depth hover-lift">
                    {!isPlaying ? (
                        <div
                            className="w-full h-auto aspect-video rounded-2xl relative z-0 cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                        >
                            <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors pointer-events-none z-10"></div>
                            <img
                                src="https://img.youtube.com/vi/5BtubI8xvtk/maxresdefault.jpg"
                                alt="PromptNinja Demo Video Thumbnail"
                                className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"
                                loading="lazy"
                                width="1280"
                                height="720"
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <iframe
                            className="w-full h-auto aspect-video rounded-2xl relative z-0"
                            src={`https://www.youtube.com/embed/5BtubI8xvtk?autoplay=1&mute=0&rel=0&origin=${window.location.origin}`}
                            title="PromptNinja Demo Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
                            allowFullScreen
                        >
                        </iframe>
                    )}
                </div>
                {/* Ambient Glow */}
                <div className="absolute -inset-4 bg-brand-500/20 blur-3xl -z-10 rounded-[3rem] opacity-30"></div>
            </div>

            {/* Privacy Section - Differential 2 */}
            <div className="mt-24 max-w-4xl mx-auto text-center px-4 relative z-10">
                <div className="inline-block glass px-4 py-1.5 rounded-full text-purple-300 font-bold text-sm mb-6 uppercase tracking-wider border border-purple-500/20">
                    {t("landing.hero.privacySection.badge")}
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight">
                    <span className="text-white">{t("landing.hero.privacySection.headline").split(".")[0]}.</span>
                    <span className="block mt-2 pb-4 text-gradient-emerald">
                        {t("landing.hero.privacySection.headline").split(".")[1]}.
                    </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    {t("landing.hero.privacySection.subheadline")}
                </p>
            </div>

        </S.HeroSection>
    );
};
