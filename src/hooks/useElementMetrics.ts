import { useEffect, useRef } from 'react';

export interface ElementMetrics {
    scrollHeight: number;
    clientHeight: number;
}

export const useElementMetrics = (
    ref: React.RefObject<HTMLElement | null>, 
    dependencies: any[]
) => {
    const metricsRef = useRef<ElementMetrics>({ scrollHeight: 0, clientHeight: 0 });

    useEffect(() => {
        if (!ref.current) return;
        
        const updateMetrics = () => {
            if (ref.current) {
                // Mutate Ref directly for performance (used by physics engine)
                metricsRef.current = {
                    scrollHeight: ref.current.scrollHeight,
                    clientHeight: ref.current.clientHeight
                };
            }
        };

        // Update immediately
        updateMetrics();

        // Observer for resize events
        const observer = new ResizeObserver(updateMetrics);
        observer.observe(ref.current);
        
        // CRITICAL: Wait for fonts to load to ensure correct height calculation
        if (document.fonts) {
            document.fonts.ready.then(() => {
                updateMetrics();
            });
        }
        
        // Fallback safety timeout
        const t = setTimeout(updateMetrics, 1000);

        return () => { 
            observer.disconnect();
            clearTimeout(t);
        };
    }, [ref, ...dependencies]);

    return metricsRef;
};