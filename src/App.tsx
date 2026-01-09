import React, { Suspense, useEffect, useState } from "react";
import { APP_CONSTANTS } from "./config/constants";

// Lazy load apps to optimize bundle size
const MainApp = React.lazy(() => import("./apps/MainApp").then(m => ({ default: m.MainApp })));
const MusicApp = React.lazy(() => import("./apps/MusicApp").then(m => ({ default: m.MusicApp })));

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const App: React.FC = () => {
    const [isMusicDomain, setIsMusicDomain] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        const checkDomain = () => {
            const hostname = window.location.hostname;
            const params = new URLSearchParams(window.location.search);
            const forceMusic = params.get("app") === "music";

            // Check if it matches configured music domain or starts with music. (for preview/staging)
            const isMusic = hostname === APP_CONSTANTS.MUSIC_DOMAIN ||
                hostname.startsWith("music.") ||
                forceMusic;

            setIsMusicDomain(isMusic);
            setIsInitialized(true);
        };

        checkDomain();
    }, []);

    if (!isInitialized) {
        return <LoadingSpinner />;
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {isMusicDomain ? <MusicApp /> : <MainApp />}
        </Suspense>
    );
};

export default App;
