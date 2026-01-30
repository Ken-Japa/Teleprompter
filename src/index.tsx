import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TranslationProvider } from "./hooks/useTranslation";
import "./styles.css";

// Fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/900.css";
import "@fontsource/opendyslexic";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/700.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/700.css";

import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { trackError } from "./utils/analytics";
import { initSentry } from "./utils/sentry";

initSentry();

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

// Global error handlers for unhandled errors
window.addEventListener("error", (event) => {
    const errorMessage = event.error?.message || event.message || "Unknown error";

    // Use the filtered trackError
    trackError("global_js_error", errorMessage);

    console.error("Global error caught:", {
        message: errorMessage,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack || "",
    });
});

// Global handler for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason?.message || event.reason || "Unknown rejection";
    const reasonStr = String(reason);

    // Use the filtered trackError which now handles generic noise
    trackError("unhandled_promise_rejection", reasonStr);

    console.error("Unhandled promise rejection:", {
        reason: event.reason,
        promise: event.promise,
    });
});

import { registerSW } from "virtual:pwa-register";

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <TranslationProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </TranslationProvider>
        </ErrorBoundary>
    </React.StrictMode>
);


// Analytics compatibility (Gtag shim + Extra scripts like Clarity)
import { initAnalyticsCompatibility } from "./utils/lazyAnalytics";
import { landingSchema } from "./config/landingSchema";

// Inject Schema.org JSON-LD
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(landingSchema);
document.head.appendChild(script);

initAnalyticsCompatibility();


window.addEventListener('load', () => {
    registerSW({
        immediate: true,
        onRegisterError(error) {
            // Log as warning instead of letting it bubble as an unhandled rejection
            console.warn("Service Worker registration failed (not a critical error):", error);
        }
    });
});

