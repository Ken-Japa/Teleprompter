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
                    const newScrollHeight = ref.current.scrollHeight;
                    const newClientHeight = ref.current.clientHeight;

                    // CRITICAL: Only update if the values are valid (> 0)
                    // This prevents the physics engine from clamping to 0 during layout shifts
                    if (newScrollHeight > 0) {
                        metricsRef.current = {
                            scrollHeight: newScrollHeight,
                            clientHeight: newClientHeight,
                        };
                    }
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
