import React, { useEffect, useState, Suspense } from "react";
import { TranslationProvider } from "./hooks/useTranslation";

// Lazy load pages for performance optimization
const Host = React.lazy(() => import("./pages/Host").then(module => ({ default: module.Host })));
const Remote = React.lazy(() => import("./pages/Remote").then(module => ({ default: module.Remote })));
const Landing = React.lazy(() => import("./pages/Landing").then(module => ({ default: module.Landing })));

type ViewState = "LANDING" | "HOST" | "REMOTE";

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>("LANDING");
    const [remoteId, setRemoteId] = useState<string>("");

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;

            if (hash.startsWith("#remote")) {
                const params = new URLSearchParams(hash.split("?")[1]);
                const id = params.get("id");
                if (id) {
                    setRemoteId(id);
                    setView("REMOTE");
                    return;
                }
            }

            // Route Logic Update: Check if hash STARTS with #app to allow sub-routes like #app/play
            if (hash.startsWith("#app")) {
                setView("HOST");
                return;
            }

            // Default to Landing for empty hash or root
            setView("LANDING");
        };

        // Initial check
        handleHashChange();

        // Listen for changes
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
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
            </Suspense>
        </TranslationProvider>
    );
};

export default App;
