import { useState, useEffect } from "react";

export function useFirstVisit(key: string): boolean {
    const [isFirstVisit, setIsFirstVisit] = useState(() => {
        if (typeof window === "undefined") return false;
        return !localStorage.getItem(key);
    });

    useEffect(() => {
        if (isFirstVisit) {
            localStorage.setItem(key, "true");
        }
    }, [isFirstVisit, key]);

    return isFirstVisit;
}
