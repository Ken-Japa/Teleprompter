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
                <div className="relative group">
                    {/* Hint only visible on mobile now, as desktop has it in the header */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-20 sm:hidden">
                        <p className="text-slate-400 text-sm font-medium animate-bounce bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full border border-brand-500/30 shadow-lg">
                            👇 {t("landing.hero.startHint") || "Comece aqui"}
                        </p>
                    </div>
                    <S.PrimaryButton
                        onClick={onLaunch}
                        className="text-xl font-bold py-5 px-12 w-full sm:w-auto !rounded-2xl !bg-brand-600 hover:!bg-brand-500 !text-white shadow-brand-500/50 hover:shadow-brand-500/80 hover-glow btn-press transition-smooth border-2 border-brand-400/50 relative z-10"
                        aria-label="Launch Web App"
                    >
                        {t("landing.hero.cta")}
                    </S.PrimaryButton>
                </div>

                <button
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-lg py-5 px-12 w-full sm:w-auto glass hover:bg-white/5 text-slate-300 font-medium rounded-2xl transition-smooth hover:scale-105 hover:border-white/10 btn-press border border-white/5"
                >
                    {t("landing.hero.ctaSecondary")}
                </button>
            </div>

            <div className="flex justify-center mb-8 relative">
                <span className="w-8 h-px transition-all"></span>
                {t("landing.hero.smallphrase")}
                <span className="w-8 h-px transition-all"></span>
            </div>

            <div className="flex justify-center mb-20 relative z-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <button
                    onClick={() => {
                        localStorage.setItem("PROMPTNINJA_START_TRIAL", "true");
                        onLaunch();
                    }}
                    className="group flex items-center gap-2 text-brand-300 hover:text-brand-200 transition-colors text-md font-medium"
                >
                    <span className="w-8 h-px bg-brand-500/30 group-hover:w-12 transition-all"></span>
                    ⚡ {t("host.paywall.trialButton")}
                    <span className="w-8 h-px bg-brand-500/30 group-hover:w-12 transition-all"></span>
                </button>
            </div>


            {/* Product Demo GIF Showcase */}
            <div className="relative max-w-5xl mx-auto mb-20 px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                    {/* Browser Frame */}
                    <div className="bg-slate-900/80 rounded-t-xl border-x border-t border-white/10 px-4 py-3 flex items-center gap-2 backdrop-blur-md">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
                        </div>
                        <div className="mx-auto bg-slate-800/40 rounded-full px-4 sm:px-12 py-1 text-[10px] sm:text-xs text-slate-500 font-mono border border-white/5 truncate max-w-[150px] sm:max-w-none">
                            promptninja.com.br
                        </div>
                    </div>

                    <div className="relative glass bg-[#0a0f1e]/40 rounded-b-xl border border-white/10 shadow-2xl overflow-hidden group">
                        <img
                            src="/videos/gif.gif"
                            alt="PromptNinja App Demo"
                            className="w-full h-auto brightness-110"
                            loading="eager"
                        />
                        {/* Interactive Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </div>
                </div>

                {/* Ambient Glow */}
                <div className="absolute -inset-10 bg-brand-500/10 blur-[100px] -z-10 rounded-full opacity-30 animate-pulse-slow"></div>
            </div>


            {/* P2P Section - Differential 1 */}
            <div className="mt-24 mb-16 max-w-4xl mx-auto text-center px-4 relative z-10">
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
                    {t("landing.hero.p2pSection.headline").split(".")[0]}.
                    <span className="block mt-2 pb-4 text-gradient-emerald">
                        {t("landing.hero.p2pSection.headline").split(".")[1]}.
                    </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    {t("landing.hero.p2pSection.subheadline")}
                </p>
                <div className="inline-block glass mt-8 px-4 py-1.5 rounded-full text-brand-300 font-bold text-sm mb-6 uppercase tracking-wider border border-brand-500/20">
                    {t("landing.hero.p2pSection.badge")}
                </div>
                <div className="mt-4 flex justify-center px-4">
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

            {/* App Video Demo */}
            <div className="relative max-w-4xl mx-auto mt-24 animate-fade-in-up safe-container px-4" style={{ animationDelay: '0.6s' }}>
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

        </S.HeroSection >
    );
};
