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
// Initialize the shim immediately to ensure no events are dropped
export const initAnalyticsShim = (): void => {
    // Only load in production
    if (window.location.hostname !== 'promptninja.solutionkit.com.br') {
        console.log("📊 Analytics shim skipped (not in production)");
        // Define a dummy gtag for development to prevent errors if we removed the check in analytics.ts
        if (!window.gtag) {
            window.gtag = function () { console.log("📊 [Dev] gtag:", arguments); };
        }
        return;
    }

    // Initialize GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
        window.gtag = function (...args: any[]) {
            window.dataLayer.push(args);
        };
    }

    // Configure default command
    window.gtag("js", new Date());
    window.gtag("config", "G-NCRFPBBJHF");

    console.log("📊 Analytics shim initialized");
};

/**
 * Loads the actual analytics scripts (GTM, Clarity, etc.)
 */
export const loadAnalyticsScripts = (): void => {
    // Check if we are in production (again, to be safe, though shim handles 'gtag' creation)
    const isProduction = window.location.hostname === 'promptninja.solutionkit.com.br';
    if (!isProduction) return;

    // Avoid double loading
    if (window.document.querySelector('script[src*="googletagmanager"]')) return;

    console.log("📊 Loading heavy analytics scripts...");

    // Load Google Tag Manager
    const gtmScript = document.createElement("script");
    gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-NCRFPBBJHF";
    gtmScript.async = true;
    document.head.appendChild(gtmScript);

    // Load Contentsquare
    const csScript = document.createElement("script");
    csScript.src = "https://t.contentsquare.net/uxa/9f676d4da3fcc.js";
    csScript.defer = true;
    document.head.appendChild(csScript);

    // Initialize Microsoft Clarity
    const clarityScript = document.createElement("script");
    clarityScript.type = "text/javascript";
    clarityScript.text = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "uke5r12yig");
    `;
    document.head.appendChild(clarityScript);
};

/**
 * Sets up lazy loading strategies
 */
export const initLazyAnalytics = (): void => {
    // 1. Initialize shim immediately so events aren't lost
    initAnalyticsShim();

    // 2. Schedule heavy scripts
    const loadScripts = () => loadAnalyticsScripts();

    // Strategy 1: Load after 3 seconds of idle time
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadScripts, { timeout: 3000 });
    } else {
        setTimeout(loadScripts, 3000);
    }

    // Strategy 2: Load on first user interaction
    const interactionEvents = ["mousedown", "touchstart", "keydown", "scroll"];
    const onInteraction = () => {
        loadScripts();
        interactionEvents.forEach((event) => document.removeEventListener(event, onInteraction));
    };

    interactionEvents.forEach((event) => document.addEventListener(event, onInteraction, { once: true, passive: true }));
};
