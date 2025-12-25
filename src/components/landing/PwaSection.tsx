import React, { useEffect, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

export const PwaSection: React.FC = () => {
    const { t } = useTranslation();
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
            </div>
        </section>
    );
};
