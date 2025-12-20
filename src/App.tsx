import React, { useEffect, useState, Suspense } from "react";
import { TranslationProvider, useTranslation, getInitialLanguage } from "./hooks/useTranslation";
import { trackEvent, trackOpenScript, setAnalyticsActive } from "./utils/analytics";
import { useInactivity } from "./hooks/useInactivity";


// Lazy load pages for performance optimization
const Host = React.lazy(() => import("./pages/Host").then(module => ({ default: module.Host })));
const Remote = React.lazy(() => import("./pages/Remote").then(module => ({ default: module.Remote })));
const Landing = React.lazy(() => import("./pages/Landing").then(module => ({ default: module.Landing })));
const ThankYou = React.lazy(() => import("./pages/ThankYou").then(module => ({ default: module.ThankYou })));

import { SeoPages, SeoRouteKey } from "./config/seoRoutes";
import { SEO_ROUTES } from "./config/constants";
import { ROUTES_CONFIG } from "./config/routes.js";
import { Language } from "./locales/index";
import { OfflineIndicator } from "./components/ui/OfflineIndicator";


type ViewState = "LANDING" | "HOST" | "REMOTE" | "THANK_YOU" | SeoRouteKey;

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>("LANDING");
    const [remoteId, setRemoteId] = useState<string>("");
    const [currentLang, setCurrentLang] = useState<Language | undefined>(undefined);

    const { t, lang } = useTranslation();

    // Inactivity check
    const isActive = useInactivity(30 * 60 * 1000); // 30 minutes
    useEffect(() => {
        setAnalyticsActive(isActive);
    }, [isActive]);


    useEffect(() => {
        // Update title
        document.title = t('landing.meta.title');

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('landing.meta.description'));
        }

        // Update Open Graph description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', t('landing.meta.description'));
        }

        // Update Twitter description
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', t('landing.meta.description'));
        }

        // Update Open Graph title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', t('landing.meta.title'));
        }

        // Update Twitter title
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', t('landing.meta.title'));
        }

    }, [view, lang, t]);

    useEffect(() => {
        trackEvent("app_launched");
    }, []);

    useEffect(() => {
        const handleRouting = () => {
            const hash = window.location.hash;
            const path = window.location.pathname;
            const searchParams = new URLSearchParams(window.location.search);
            const scriptParam = searchParams.get("script");

            // 0. Priority: Script Injection (Open in Teleprompter)
            if (scriptParam) {
                try {
                    const decodedScript = decodeURIComponent(scriptParam);
                    if (decodedScript) {
                        localStorage.setItem("neonprompt_text", decodedScript);
                        trackOpenScript("url_param");

                        // Clear the query param to avoid re-injecting on reload
                        // and redirect to the app
                        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "#app";
                        window.history.replaceState({ path: newUrl }, "", newUrl);

                        setView("HOST");
                        return;
                    }
                } catch (e) {
                    console.error("Failed to decode script param", e);
                }
            }

            // 1. Priority: Hash Routing (App functionality)
            if (hash.startsWith("#remote")) {
                const params = new URLSearchParams(hash.split("?")[1]);
                const id = params.get("id");
                if (id) {
                    setRemoteId(id);
                    setView("REMOTE");
                    return;
                }
            }

            if (hash.startsWith("#app")) {
                setView("HOST");
                return;
            }

            // 2. SEO Paths (Pathname Routing)
            // Check for SEO paths (remove trailing slash if present for consistency)
            const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

            if (cleanPath === SEO_ROUTES.PRO_WELCOME) {
                setView("THANK_YOU");
                return;
            }

            // Check localized routes
            for (const [key, config] of Object.entries(ROUTES_CONFIG as Record<string, any>)) {
                const paths = config.paths;
                for (const [lang, routePath] of Object.entries(paths)) {
                    if (cleanPath === routePath) {
                        setView(key as SeoRouteKey);
                        setCurrentLang(lang as Language);
                        return;
                    }
                }
            }

            // 3. Default
            setView("LANDING");
            setCurrentLang(getInitialLanguage());
        };

        // Initial check
        handleRouting();

        // Listen for changes
        window.addEventListener("hashchange", handleRouting);
        window.addEventListener("popstate", handleRouting);

        return () => {
            window.removeEventListener("hashchange", handleRouting);
            window.removeEventListener("popstate", handleRouting);
        };
    }, []);

    const launchApp = () => {
        window.location.hash = "app";
        setView("HOST");
    };

    return (
        <TranslationProvider initialLang={currentLang}>
            <OfflineIndicator />
            <Suspense fallback={<LoadingSpinner />}>
                {view === "REMOTE" && <Remote hostId={remoteId} />}
                {view === "LANDING" && <Landing onLaunch={launchApp} />}
                {view === "THANK_YOU" && <ThankYou onLaunch={launchApp} />}
                {view === "HOST" && <Host />}
                {view === "SEO_GRATIS" && <SeoPages.TeleprompterOnlineGratis onLaunch={launchApp} />}
                {view === "SEO_TUTORIAL" && <SeoPages.ComoUsarTeleprompter onLaunch={launchApp} />}
                {view === "SEO_MELHOR_APP" && <SeoPages.MelhorAppTeleprompter onLaunch={launchApp} />}
                {view === "SEO_ALTERNATIVAS" && <SeoPages.AlternativasTeleprompterConcorrente onLaunch={launchApp} />}
                {view === "SEO_YOUTUBERS" && <SeoPages.TeleprompterParaYoutubers onLaunch={launchApp} />}
                {view === "SEO_TRAVANDO" && <SeoPages.TeleprompterTravandoSolucao onLaunch={launchApp} />}
                {view === "SEO_DIY" && <SeoPages.TeleprompterCaseiroDIY onLaunch={launchApp} />}
                {view === "SEO_ORATORIA" && <SeoPages.OratoriaVideo onLaunch={launchApp} />}
                {view === "SEO_DECORAR" && <SeoPages.ComoDecorarTexto onLaunch={launchApp} />}
                {view === "SEO_WEBRTC" && <SeoPages.WebRtcLatency onLaunch={launchApp} />}
                {view === "SEO_PC_WINDOWS" && <SeoPages.TeleprompterPCWindows onLaunch={launchApp} />}
                {view === "SEO_ZOOM" && <SeoPages.TeleprompterZoomMeeting onLaunch={launchApp} />}
                {view === "SEO_TIKTOK" && <SeoPages.TeleprompterTikTokShorts onLaunch={launchApp} />}
                {view === "SEO_OBS" && <SeoPages.TeleprompterObsStudio onLaunch={launchApp} />}
                {view === "SEO_CAPCUT" && <SeoPages.TeleprompterCapCut onLaunch={launchApp} />}
                {view === "SEO_HARDWARE_VS_WEB" && <SeoPages.TeleprompterWebVsHardware onLaunch={launchApp} />}
                {view === "SEO_MEET_TEAMS" && <SeoPages.TeleprompterGoogleMeetTeams onLaunch={launchApp} />}
                {view === "SEO_IPHONE_IPAD" && <SeoPages.TeleprompterIphoneIpad onLaunch={launchApp} />}
                {view === "SEO_APRESENTACOES" && <SeoPages.TeleprompterApresentacoes onLaunch={launchApp} />}
                {view === "SEO_PWA_INSTALL" && <SeoPages.ComoInstalarPwa onLaunch={launchApp} />}
                {view === "SEO_PRIVACY" && <SeoPages.PrivacidadeSeguranca onLaunch={launchApp} />}
                {view === "SEO_O_QUE_E" && <SeoPages.TeleprompterOQueE onLaunch={launchApp} />}
                {view === "SEO_MODO_MUSICO" && <SeoPages.TeleprompterModoMusico onLaunch={launchApp} />}
                {view === "SEO_PACING" && <SeoPages.TeleprompterPacingTimer onLaunch={launchApp} />}
                {view === "SEO_SHORTCUTS" && <SeoPages.TeleprompterShortcuts onLaunch={launchApp} />}
                {view === "SEO_GAMER" && <SeoPages.TeleprompterGamers onLaunch={launchApp} />}
                {view === "SEO_TABLET" && <SeoPages.TeleprompterTablet onLaunch={launchApp} />}
                {view === "SEO_SLIDES_SYNC" && <SeoPages.TeleprompterSlides onLaunch={launchApp} />}
                {view === "SEO_MODO_BILINGUE" && <SeoPages.TeleprompterModoBilingue onLaunch={launchApp} />}
                {view === "SEO_FITNESS" && <SeoPages.TeleprompterFitness onLaunch={launchApp} />}

                {/* Script Pages */}
                {view === "SEO_SCRIPTS" && <SeoPages.TeleprompterScriptsPage onLaunch={launchApp} />}
                {view === "SEO_SCRIPTS_YOUTUBE" && <SeoPages.TeleprompterScriptCategory categoryId="youtube" onLaunch={launchApp} />}
                {view === "SEO_SCRIPTS_TIKTOK" && <SeoPages.TeleprompterScriptCategory categoryId="tiktok-reels" onLaunch={launchApp} />}
                {view === "SEO_SCRIPTS_SALES" && <SeoPages.TeleprompterScriptCategory categoryId="sales" onLaunch={launchApp} />}
                {view === "SEO_SCRIPTS_CLASSES" && <SeoPages.TeleprompterScriptCategory categoryId="classes" onLaunch={launchApp} />}
                {view === "SEO_SCRIPTS_INSTITUTIONAL" && <SeoPages.TeleprompterScriptCategory categoryId="institutional" onLaunch={launchApp} />}
            </Suspense>
        </TranslationProvider>
    );
};

export default App;
