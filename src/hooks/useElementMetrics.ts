import { useEffect, useRef } from "react";

export interface ElementMetrics {
 scrollHeight: number;
 clientHeight: number;
}

export const useElementMetrics = (ref: React.RefObject<HTMLElement | null>, dependencies: any[]) => {
 const metricsRef = useRef<ElementMetrics>({
  scrollHeight: 0,
  clientHeight: 0,
 });
    useEffect(() => {
        let observer: ResizeObserver | null = null;
        let timeoutId: NodeJS.Timeout | null = null;

        const init = () => {
            if (!ref.current) {
                // Retry if ref is not yet ready
                timeoutId = setTimeout(init, 50);
                return;
            }

            const updateMetrics = () => {
                if (ref.current) {
                    // Mutate Ref directly for performance (used by physics engine)
                    metricsRef.current = {
                        scrollHeight: ref.current.scrollHeight,
                        clientHeight: ref.current.clientHeight,
                    };
                }
            };

            // Update immediately
            updateMetrics();

            // Observer for resize events
            observer = new ResizeObserver(updateMetrics);
            observer.observe(ref.current);

            // CRITICAL: Wait for fonts to load to ensure correct height calculation
            if (document.fonts) {
                document.fonts.ready.then(() => {
                    updateMetrics();
                });
            }
        };

        init();

        return () => {
            if (observer) observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [ref, ...dependencies]);

 return metricsRef;
};
