import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { Remote } from "./Remote";
import { TranslationProvider } from "../hooks/useTranslation";
import { Peer } from "peerjs";

// Mocks
const mockPeerInstance = {
    id: "remote-peer-id",
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

// Mock do módulo peerjs
vi.mock("peerjs", () => {
    return {
        Peer: vi.fn(function () {
            return mockPeerInstance;
        }),
    };
});

beforeEach(() => {
    window.NoSleep = class {
        enable = vi.fn().mockResolvedValue(true);
        disable = vi.fn();
        constructor() { }
    } as any;

    (mockPeerInstance.connect as any).mockReturnValue(mockConn);
    (mockPeerInstance.on as any).mockImplementation((event: string, callback: any) => {
        if (event === "open") callback("remote-id");
    });
});

afterEach(() => {
    vi.clearAllMocks();
});

const renderWithProvider = (ui: React.ReactNode) => {
    return render(<TranslationProvider>{ui}</TranslationProvider>);
};

describe("Remote Component", () => {
    it("Should initialize PeerJS connection on mount", () => {
        renderWithProvider(<Remote hostId="test-host-id" />);
        expect(Peer).toHaveBeenCalled();
    });

    it("Should show connecting state initially", () => {
        renderWithProvider(<Remote hostId="test-host-id" />);
        expect(screen.getByText(/Searching Ninja Host/i)).toBeInTheDocument();
    });
});
