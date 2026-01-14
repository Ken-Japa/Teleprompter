import React, { useEffect, useState, Suspense } from "react";
import { TranslationProvider, useTranslation, getInitialLanguage } from "../hooks/useTranslation";
import { trackEvent, setAnalyticsActive } from "../utils/analytics";
import { useInactivity } from "../hooks/useInactivity";
import { OfflineIndicator } from "../components/ui/OfflineIndicator";
import { Language } from "../locales/index";

// Lazy load pages
const Host = React.lazy(() => import("../pages/Host").then(module => ({ default: module.Host })));
const Remote = React.lazy(() => import("../pages/Remote").then(module => ({ default: module.Remote })));
const MusicLanding = React.lazy(() => import("../pages/MusicLanding").then(module => ({ default: module.MusicLanding })));

type ViewState = "LANDING" | "HOST" | "REMOTE";

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export const MusicApp: React.FC = () => {
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
        // Update meta description
        document.title = "PromptNinja Music - Teleprompter para Músicos";
        // TODO: Proper SEO meta updates
    }, [view, lang, t]);

    useEffect(() => {
        trackEvent("music_app_launched");
    }, []);

    // Handle Translation Disable/Enable based on View (Same as MainApp)
    useEffect(() => {
        if (view === "HOST") {
            document.documentElement.setAttribute('translate', 'no');
            document.documentElement.classList.add('notranslate');
        } else {
            document.documentElement.removeAttribute('translate');
            document.documentElement.classList.remove('notranslate');
        }
    }, [view]);

    useEffect(() => {
        const handleRouting = () => {
            const hash = window.location.hash;

            // 1. Priority: Hash Routing
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

            // 2. Default to Landing
            setView("LANDING");
            setCurrentLang(getInitialLanguage());
        };

        handleRouting();
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
                {view === "LANDING" && <MusicLanding onLaunch={launchApp} />}
                {/* We pass a specific prop here to indicate Music Mode context if Host supports it */}
                {view === "HOST" && <Host featureFlags={{ isMusicianModeForced: true, defaultMusicianMode: true }} />}
            </Suspense>
        </TranslationProvider>
    );
};
