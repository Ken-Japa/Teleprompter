import React, { useEffect, useState, Suspense } from "react";
import { TranslationProvider } from "./hooks/useTranslation";

// Lazy load pages for performance optimization
const Host = React.lazy(() => import("./pages/Host").then(module => ({ default: module.Host })));
const Remote = React.lazy(() => import("./pages/Remote").then(module => ({ default: module.Remote })));
const Landing = React.lazy(() => import("./pages/Landing").then(module => ({ default: module.Landing })));

// SEO Pages
const TeleprompterOnlineGratis = React.lazy(() => import("./pages/seo/TeleprompterOnlineGratis").then(module => ({ default: module.TeleprompterOnlineGratis })));
const ComoUsarTeleprompter = React.lazy(() => import("./pages/seo/ComoUsarTeleprompter").then(module => ({ default: module.ComoUsarTeleprompter })));
const MelhorAppTeleprompter = React.lazy(() => import("./pages/seo/MelhorAppTeleprompter").then(module => ({ default: module.MelhorAppTeleprompter })));

type ViewState = "LANDING" | "HOST" | "REMOTE" | "SEO_GRATIS" | "SEO_TUTORIAL" | "SEO_MELHOR_APP";

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

            if (cleanPath === "/teleprompter-online-gratis") {
                setView("SEO_GRATIS");
                return;
            }
            if (cleanPath === "/como-usar-teleprompter-celular") {
                setView("SEO_TUTORIAL");
                return;
            }
            if (cleanPath === "/melhor-teleprompter-app") {
                setView("SEO_MELHOR_APP");
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
                {view === "HOST" && <Host />}
                {view === "SEO_GRATIS" && <TeleprompterOnlineGratis onLaunch={launchApp} />}
                {view === "SEO_TUTORIAL" && <ComoUsarTeleprompter onLaunch={launchApp} />}
                {view === "SEO_MELHOR_APP" && <MelhorAppTeleprompter onLaunch={launchApp} />}
            </Suspense>
        </TranslationProvider>
    );
};

export default App;
