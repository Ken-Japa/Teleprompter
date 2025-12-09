import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "./App";
import { TranslationProvider } from "./hooks/useTranslation";

// Basic Mocks for Global Objects used in App
const mockPeer = {
    id: "test-peer",
    destroyed: false,
    reconnect: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    connect: vi.fn(),
    destroy: vi.fn(),
    send: vi.fn(),
    removeAllListeners: vi.fn(),
};

beforeEach(() => {
    window.Peer = class {
        constructor() {
            return mockPeer;
        }
    } as any;

    window.QRCode = class {
        constructor() { }
    } as any;
});

afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    window.location.hash = "";
});

describe("App Routing Integration", () => {
    it("Should render Landing Page by default", async () => {
        render(
            <TranslationProvider>
                <App />
            </TranslationProvider>
        );
        // App defaults to EN in JSDOM (navigator.language is en-US)
        await waitFor(() => {
            // "PROMPT" appears in title and potentially elsewhere (e.g. promptninja.app)
            // Using getAllByText to ensure we find at least one instance
            expect(screen.getAllByText(/PROMPT/i).length).toBeGreaterThan(0);

            // "Home" appears in menu and potentially "Back to Home"
            expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);

            // Check if Hero is rendered (Version 2.0 Live is likely unique)
            expect(screen.getByText(/Version 2.0 Live/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it("Should route to Host (Editor) when hash is #app", async () => {
        window.location.hash = "#app";
        render(
            <TranslationProvider>
                <App />
            </TranslationProvider>
        );
        // App defaults to EN, so we look for "Presentation Mode"
        await waitFor(() => {
            expect(screen.getAllByLabelText(/Presentation Mode/i)[0]).toBeInTheDocument();
        }, { timeout: 4000 });
    });

    it("Should route to Remote when hash contains #remote", async () => {
        window.location.hash = "#remote?id=test-123";
        render(
            <TranslationProvider>
                <App />
            </TranslationProvider>
        );
        // App defaults to EN, so we look for "Searching Ninja Host..."
        await waitFor(() => {
            expect(screen.getByText(/Searching Ninja Host/i)).toBeInTheDocument();
        }, { timeout: 4000 });
    });
});
