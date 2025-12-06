import React, { useEffect, useState, Suspense } from "react";
import { TranslationProvider } from "./hooks/useTranslation";

// Lazy load pages for performance optimization
const Host = React.lazy(() => import("./pages/Host").then(module => ({ default: module.Host })));
const Remote = React.lazy(() => import("./pages/Remote").then(module => ({ default: module.Remote })));
const Landing = React.lazy(() => import("./pages/Landing").then(module => ({ default: module.Landing })));
const ThankYou = React.lazy(() => import("./pages/ThankYou").then(module => ({ default: module.ThankYou })));

import { SeoPages, SeoRouteKey } from "./config/seoRoutes";
import { SEO_ROUTES } from "./config/constants";

type ViewState = "LANDING" | "HOST" | "REMOTE" | "THANK_YOU" | SeoRouteKey;

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>("LANDING");
    const [remoteId, setRemoteId] = useState<string>("");

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

            if (cleanPath === SEO_ROUTES.GRATIS) {
                setView("SEO_GRATIS");
                return;
            }
            if (cleanPath === SEO_ROUTES.TUTORIAL) {
                setView("SEO_TUTORIAL");
                return;
            }
            if (cleanPath === SEO_ROUTES.MELHOR_APP) {
                setView("SEO_MELHOR_APP");
                return;
            }
            if (cleanPath === SEO_ROUTES.ALTERNATIVAS) {
                setView("SEO_ALTERNATIVAS");
                return;
            }
            if (cleanPath === SEO_ROUTES.YOUTUBERS) {
                setView("SEO_YOUTUBERS");
                return;
            }
            if (cleanPath === SEO_ROUTES.TRAVANDO) {
                setView("SEO_TRAVANDO");
                return;
            }
            if (cleanPath === SEO_ROUTES.DIY) {
                setView("SEO_DIY");
                return;
            }
            if (cleanPath === SEO_ROUTES.ORATORIA) {
                setView("SEO_ORATORIA");
                return;
            }
            if (cleanPath === SEO_ROUTES.DECORAR) {
                setView("SEO_DECORAR");
                return;
            }
            if (cleanPath === SEO_ROUTES.WEBRTC) {
                setView("SEO_WEBRTC");
                return;
            }
            if (cleanPath === SEO_ROUTES.PC_WINDOWS) {
                setView("SEO_PC_WINDOWS");
                return;
            }
            if (cleanPath === SEO_ROUTES.ZOOM) {
                setView("SEO_ZOOM");
                return;
            }

            // 3. Default
            setView("LANDING");
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
        <TranslationProvider>
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
