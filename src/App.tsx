import React, { useEffect, useState } from "react";
import { Host } from "./pages/Host";
import { Remote } from "./pages/Remote";
import { Landing } from "./pages/Landing";
import { TranslationProvider } from "./hooks/useTranslation";

type ViewState = "LANDING" | "HOST" | "REMOTE";

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
            {view === "REMOTE" && <Remote hostId={remoteId} />}
            {view === "LANDING" && <Landing onLaunch={launchApp} />}
            {view === "HOST" && <Host />}
        </TranslationProvider>
    );
};

export default App;
