import * as Sentry from "@sentry/react";

export const initSentry = () => {
    // Only initialize in production
    if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
        Sentry.init({
            dsn: import.meta.env.VITE_SENTRY_DSN,

            // Send user info (set this to false if you want more privacy)
            sendDefaultPii: true,

            // Environment
            environment: import.meta.env.MODE,

            // Release tracking (opcional - útil para identificar bugs por versão)
            // release: "promptninja@1.0.0",

            // Ignore common non-critical errors
            ignoreErrors: [
                "ResizeObserver loop limit exceeded",
                "Non-Error promise rejection captured",
                "Non-Error exception captured",
                "usedContainerScopedDefaults", // Microsoft Clarity noise
                "NotAllowedError: Permission was denied", // Gtag/Browser privacy noise
            ],

            // Custom error handler before sending to Sentry
            beforeSend(event, hint) {
                // Filter out errors that are not useful
                const error = hint.originalException;

                // Don't send network errors that are expected
                if (error && typeof error === 'object' && 'message' in error) {
                    const message = String(error.message).toLowerCase();
                    if (message.includes('network') || message.includes('fetch')) {
                        return null; // Don't send
                    }
                }

                return event;
            },
        });
    }
};