import { useEffect, useRef, useState } from 'react';

export const useWakeLock = (active: boolean = true) => {
    const [status, setStatus] = useState<'active' | 'inactive' | 'unsupported'>('inactive');
    const wakeLockRef = useRef<any>(null);
    // Use a static ref or external singleton logic for NoSleep if possible, 
    // but here we just ensure we check existence strictly.
    const noSleepRef = useRef<any>(null);

    // Initialize NoSleep once
    useEffect(() => {
        if (window.NoSleep && !noSleepRef.current) {
            try {
                noSleepRef.current = new window.NoSleep();
            } catch (e) {
                console.error("Failed to init NoSleep", e);
            }
        }
        
        // Cleanup on unmount if it was the last hook usage (though hard to track globally in a hook)
        return () => {
             if (noSleepRef.current) {
                 noSleepRef.current.disable(); 
                 // We don't nullify it to reuse the instance if component re-mounts quickly
             }
        };
    }, []);

    useEffect(() => {
        if (!active) {
            // Release Native
            if (wakeLockRef.current) {
                wakeLockRef.current.release().catch(() => {});
                wakeLockRef.current = null;
            }
            // Disable NoSleep
            if (noSleepRef.current) {
                noSleepRef.current.disable();
            }
            setStatus('inactive');
            return;
        }

        let isCancelled = false;

        const requestLock = async () => {
            // 1. Try Native Wake Lock API
            if ('wakeLock' in navigator) {
                try {
                    const lock = await (navigator as any).wakeLock.request('screen');
                    if (!isCancelled) {
                        wakeLockRef.current = lock;
                        setStatus('active');
                        
                        lock.addEventListener('release', () => {
                            if (!isCancelled) setStatus('inactive');
                        });
                    }
                    return; // Native success, skip NoSleep
                } catch (err) {
                    console.warn('Wake Lock request failed, falling back:', err);
                }
            }

            // 2. Fallback to NoSleep.js
            if (noSleepRef.current) {
                try {
                    // NoSleep requires a user gesture interaction to enable.
                    const enableNoSleep = () => {
                        if (noSleepRef.current && !isCancelled) {
                            noSleepRef.current.enable();
                            setStatus('active');
                        }
                        // Clean up listeners
                        document.removeEventListener('click', enableNoSleep);
                        document.removeEventListener('touchstart', enableNoSleep);
                    };
                    
                    document.addEventListener('click', enableNoSleep);
                    document.addEventListener('touchstart', enableNoSleep);
                } catch (err) {
                    console.error("NoSleep enable failed", err);
                }
            } else {
                if (!isCancelled) setStatus('unsupported');
            }
        };

        requestLock();

        // Re-acquire on visibility change (tabs backgrounding releases lock automatically)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && active) {
                requestLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isCancelled = true;
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (wakeLockRef.current) {
                wakeLockRef.current.release().catch(() => {});
                wakeLockRef.current = null;
            }
            if (noSleepRef.current) {
                noSleepRef.current.disable();
            }
        };
    }, [active]);

    return { status };
};