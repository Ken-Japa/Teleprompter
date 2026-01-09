import React, { useEffect, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { MusicIcon } from "../ui/Icons";

export const PwaSection: React.FC = () => {
    const { t, lang } = useTranslation();
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent default browser install prompt
            e.preventDefault();
            // Store the event for later use
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const navigateToGuide = () => {
        const guidePath = window.location.pathname.startsWith('/en')
            ? '/en/how-to-install-teleprompter-app-pwa'
            : window.location.pathname.startsWith('/es')
                ? '/es/como-instalar-app-teleprompter-pwa'
                : '/como-instalar-app-teleprompter-pwa';
        window.location.href = guidePath;
    };

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setDeferredPrompt(null);
            }
        } else {
            // If not installable via API (e.g. already installed or iOS), go to guide
            navigateToGuide();
        }
    };

    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-slate-950 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="bg-slate-900/40 rounded-3xl border border-white/10 p-8 md:p-16 text-center backdrop-blur-sm relative overflow-hidden group">

                    {/* Glowing orb effect behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700"></div>

                    <div className="lg:flex items-center justify-between gap-12 relative z-10">
                        <div className="text-left max-w-2xl mb-10 lg:mb-0">
                            <div className="inline-block glass px-4 py-1.5 rounded-full text-blue-300 font-bold text-sm mb-6 uppercase tracking-wider border border-blue-500/20">
                                PWA TECHNOLOGY
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                                {t("landing.hero.pwaSection.headline")}
                            </h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                {t("landing.hero.pwaSection.subheadline")}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleInstallClick}
                                    className="bg-white text-slate-900 hover:bg-slate-200 font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-3"
                                >
                                    {t("landing.hero.pwaSection.cta")}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center lg:justify-end">
                            <div className="relative w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2.5rem] border border-white/20 shadow-2xl flex items-center justify-center transform rotate-6 group-hover:rotate-3 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem]"></div>

                                {/* App Icon Grid - PWA Style */}
                                <div className="relative z-10 text-white">
                                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                    </svg>
                                </div>

                                {/* Notification Badge Simulation */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Musician Mode Feature - New Section */}
                <div className="my-12 stagger-item">
                    <S.FeatureCard
                        className="md:col-span-3 border-yellow-500/30 max-w-4xl mx-auto text-center"
                        icon={<MusicIcon className="w-10 h-10 text-yellow-400 icon-hover-rotate mx-auto" />}
                        title={t("landing.features.musician.title")}
                        desc={t("landing.features.musician.desc")}
                    >
                        <a
                            href={
                                lang === 'en'
                                    ? '/en/teleprompter-musician-mode'
                                    : lang === 'es'
                                        ? '/es/teleprompter-modo-musico'
                                        : '/teleprompter-modo-musico'
                            }
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all transform bg-yellow-600 rounded-xl hover:bg-yellow-500 hover:scale-105 shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/40"
                        >
                            {t("landing.features.musician.cta") || "Saiba Mais sobre o Modo Músico 🎸"}
                        </a>
                    </S.FeatureCard>
                </div>

                {/* Demo Visual - App Mockup */}
                <div className="relative max-w-5xl mx-auto mt-24 mb-24 animate-fade-in-up perspective-1000 safe-container px-4" style={{ animationDelay: '0.3s' }}>
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
            </div>

        </section>
    );
};
