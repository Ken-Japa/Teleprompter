/**
 * Loads analytics scripts only after the page is idle or after user interaction.
 * This prevents analytics from blocking critical rendering and improves initial page load performance.
 * 
 * Strategy:
 * 1. Load after 3 seconds of idle time (using requestIdleCallback)
 * 2. Load on first user interaction (mousedown, touchstart, keydown, scroll)
 * 
 * Whichever comes first triggers the analytics load.
 */
export const initLazyAnalytics = (): void => {
    let loaded = false;

    const loadAnalytics = () => {
        if (loaded) return;
        loaded = true;

        // Load Google Tag Manager
        const gtmScript = document.createElement("script");
        gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-NCRFPBBJHF";
        gtmScript.async = true;
        document.head.appendChild(gtmScript);

        // Initialize GTM dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", "G-NCRFPBBJHF");

        // Load Contentsquare
        const csScript = document.createElement("script");
        csScript.src = "https://t.contentsquare.net/uxa/9f676d4da3fcc.js";
        csScript.defer = true;
        document.head.appendChild(csScript);

        console.log("📊 Analytics loaded lazily");
    };

    // Strategy 1: Load after 3 seconds of idle time
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(loadAnalytics, 3000);
    }

    // Strategy 2: Load on first user interaction (whichever comes first)
    const interactionEvents = ["mousedown", "touchstart", "keydown", "scroll"];
    const onInteraction = () => {
        loadAnalytics();
        // Remove all listeners after first interaction
        interactionEvents.forEach((event) => document.removeEventListener(event, onInteraction));
    };

    interactionEvents.forEach((event) => document.addEventListener(event, onInteraction, { once: true, passive: true }));
};
