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

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

import { registerSW } from "virtual:pwa-register";

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <TranslationProvider>
            <App />
        </TranslationProvider>
    </React.StrictMode>
);

registerSW({ immediate: true });
