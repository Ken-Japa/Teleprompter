import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { Host } from "./Host";
import { TranslationProvider } from "../hooks/useTranslation";

// Mocks
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.scrollTo = vi.fn(); // Add scrollTo mock

const mockPeer = {
    id: "mock-peer-id",
    destroyed: false,
    reconnect: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    connect: vi.fn(),
    destroy: vi.fn(),
    send: vi.fn(),
    removeAllListeners: vi.fn(),
};

const mockConn = {
    on: vi.fn(),
    send: vi.fn(),
    close: vi.fn(),
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

    window.NoSleep = class {
        enable = vi.fn().mockResolvedValue(true);
        disable = vi.fn();
        constructor() { }
    } as any;

    mockPeer.on.mockImplementation((event, callback) => {
        if (event === "open") callback("mock-peer-id");
        if (event === "connection") callback(mockConn);
    });

    // Mock scrollHeight/clientHeight for Editor
    Object.defineProperty(window.HTMLElement.prototype, "scrollHeight", { configurable: true, value: 1000 });
    Object.defineProperty(window.HTMLElement.prototype, "clientHeight", { configurable: true, value: 500 });
});

afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    window.location.hash = "";
});

const renderWithProvider = (ui: React.ReactNode) => {
    return render(<TranslationProvider>{ui}</TranslationProvider>);
};

describe("Host Component (Editor & Prompter)", () => {
    it("Should start in Edit Mode and allow text changes", () => {
        renderWithProvider(<Host />);
        const textarea = screen.getByPlaceholderText(/Paste or type your speech script here/i);
        fireEvent.change(textarea, { target: { value: "Script Test" } });
        expect(textarea).toHaveValue("Script Test");
    });

    it("Should switch to Prompter mode when clicking Start", () => {
        renderWithProvider(<Host />);
        const startBtn = screen.getAllByLabelText(/Start Presentation Mode/i)[0]; // Use getAll and take first, or use aria-label
        fireEvent.click(startBtn);
        // After clicking start, the Prompter component should be rendered.
        // We can check for an element specific to Prompter, e.g. "Exit" button
        expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    });

    it("Should show Paywall for PRO features if not authenticated", () => {
        renderWithProvider(<Host />);
        const startBtn = screen.getAllByLabelText(/Start Presentation Mode/i)[0];
        fireEvent.click(startBtn);

        // Locate the Voice Control button which is a Pro feature
        // Using the aria-label from en.ts
        const voiceBtn = screen.getByLabelText(/Voice Control/i);

        // Click to toggle voice (should trigger paywall since isPro is false by default)
        fireEvent.click(voiceBtn);

        // Expect Paywall Modal to be visible
        // Assuming the modal has some unique text like "Lifetime Access" or "Grab Your Lifetime Access"
        expect(screen.getByText(/Lifetime Access/i)).toBeInTheDocument();
    });
});
