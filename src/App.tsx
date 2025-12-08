import React, { useEffect, useState, Suspense } from "react";
import { TranslationProvider, useTranslation, getInitialLanguage } from "./hooks/useTranslation";

// Lazy load pages for performance optimization
const Host = React.lazy(() => import("./pages/Host").then(module => ({ default: module.Host })));
const Remote = React.lazy(() => import("./pages/Remote").then(module => ({ default: module.Remote })));
const Landing = React.lazy(() => import("./pages/Landing").then(module => ({ default: module.Landing })));
const ThankYou = React.lazy(() => import("./pages/ThankYou").then(module => ({ default: module.ThankYou })));

import { SeoPages, SeoRouteKey } from "./config/seoRoutes";
import { SEO_ROUTES } from "./config/constants";
// @ts-ignore
import { ROUTES_CONFIG } from "./config/routes.js";
import { Language } from "./locales/index";

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
        const handleRouting = () => {
            const hash = window.location.hash;
            const path = window.location.pathname;

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
            </Suspense>
        </TranslationProvider>
    );
};

export default App;
