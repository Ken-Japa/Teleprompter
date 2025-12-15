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

    // Lazy load extras after 3s or interaction
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadExtras, { timeout: 3000 });
    } else {
        setTimeout(loadExtras, 3000);
    }
};

