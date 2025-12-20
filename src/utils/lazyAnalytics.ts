/**
 * Initializes compatibility shims and secondary analytics (Clarity, Contentsquare).
 * 
 * NOTE: GTM/GA4 is now loaded via index.html. 
 * This file ensures:
 * 1. window.gtag is defined (so src/utils/analytics.ts works)
 * 2. Clarity and Contentsquare are loaded (lazily)
 */

export const initAnalyticsCompatibility = (): void => {
    // 1. Shim 'gtag' so our app's trackEvent() works
    // GTM uses dataLayer, but doesn't define 'gtag' function by default.
    // We bridge the gap so our code can use gtag('event', ...) which pushes to dataLayer.
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
    }

    // Only load extra scripts in production
    const hostname = window.location.hostname;
    const isProduction = hostname === 'promptninja.solutionkit.com.br' || hostname === 'www.promptninja.solutionkit.com.br';

    if (!isProduction) {
        console.log("📊 Analytics extras skipped (not in production)");
        return;
    }

    const loadExtras = () => {
        // Avoid double loading if already present
        if (window.document.querySelector('script[src*="contentsquare"]')) return;

        console.log("📊 Loading extra analytics scripts (Clarity, Contentsquare)...");

        // Load Contentsquare
        const csScript = document.createElement("script");
        csScript.src = "https://t.contentsquare.net/uxa/9f676d4da3fcc.js";
        csScript.defer = true;
        document.head.appendChild(csScript);

        // Initialize Microsoft Clarity directly (avoiding CSP violation)
        // Execute the initialization code directly instead of creating an inline script
        (function (c: any, l: Document, a: string, r: string, i: string) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
            const t = l.createElement(r) as HTMLScriptElement;
            t.async = true;
            t.src = "https://www.clarity.ms/tag/" + i;
            const y = l.getElementsByTagName(r)[0];
            if (y && y.parentNode) {
                y.parentNode.insertBefore(t, y);
            }
        })(window, document, "clarity", "script", "uke5r12yig");
    };

    // Lazy load extras after 3s or interaction
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadExtras, { timeout: 3000 });
    } else {
        setTimeout(loadExtras, 3000);
    }
};

