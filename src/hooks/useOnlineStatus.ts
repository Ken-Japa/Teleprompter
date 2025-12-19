import { useState, useEffect } from "react";

/**
 * Hook to track online/offline status of the browser.
 * Useful for showing offline indicators or disabling features that require internet.
 * 
 * @returns boolean indicating if the browser is online
 */
export const useOnlineStatus = (): boolean => {
    const [isOnline, setIsOnline] = useState<boolean>(() => {
        // Initialize with current online status
        return typeof navigator !== "undefined" ? navigator.onLine : true;
    });

    useEffect(() => {
        // Handler for when browser goes online
        const handleOnline = () => {
            setIsOnline(true);
            console.log("Network: Online");
        };

        // Handler for when browser goes offline
        const handleOffline = () => {
            setIsOnline(false);
            console.warn("Network: Offline - Some features may be unavailable");
        };

        // Add event listeners
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Cleanup
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
};
