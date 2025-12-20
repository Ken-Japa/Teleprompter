import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to track user inactivity.
 * @param timeoutMs Duration in milliseconds of inactivity before considering the user inactive. Default 30 minutes.
 * @returns boolean true if user is active, false if inactive.
 */
export function useInactivity(timeoutMs: number = 30 * 60 * 1000): boolean {
    const [isActive, setIsActive] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimer = useCallback(() => {
        setIsActive(true);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setIsActive(false);
        }, timeoutMs);
    }, [timeoutMs]);

    useEffect(() => {
        // Initial set
        resetTimer();

        // Events to listen for activity
        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

        const handleActivity = () => {
            // We can optimistically just reset the timer. 
            // Ideally we throttle this but for functional correctness this is fine.
            // To prevent excessive state updates if we were doing more, we check isActive inside resetTimer,
            // but here resetTimer sets 'true' every time. 
            // React won't re-render if the state value is the same (true -> true).
            resetTimer();
        };

        events.forEach(event => {
            window.addEventListener(event, handleActivity, { passive: true });
        });

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [resetTimer]);

    return isActive;
}
