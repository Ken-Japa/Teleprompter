import { renderHook, act } from "@testing-library/react";
import { useState, useRef } from "react";
import { useVoiceControl } from "./useVoiceControl";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { TranslationProvider } from "./useTranslation";
import { useVoiceStore } from "../store/useVoiceStore";

// Mocks
const mockStart = vi.fn();
const mockStop = vi.fn();
const mockAbort = vi.fn();

// Mock useVoiceWorker to be synchronous in tests
vi.mock("./voice/useVoiceWorker", () => {
    return {
        useVoiceWorker: (script: string) => {
            const [lastMatch, setLastMatch] = useState<any>(null);
            const lastMatchRef = useRef<any>(null);

            return {
                get lastMatch() { return lastMatchRef.current || lastMatch; },
                isProcessing: false,
                error: null,
                postMatch: (params: any) => {
                    // Logic to simulate a match if transcript matches start of script
                    if (params.transcript.toLowerCase() === "hello" && script.toLowerCase().startsWith("hello")) {
                        const result = { index: 0, ratio: 0, distance: 0 };
                        lastMatchRef.current = result;
                        setLastMatch(result);
                    }
                }
            };
        }
    };
});

// Global reference to the last created instance
let lastInstance: MockSpeechRecognition | null = null;

class MockSpeechRecognition {
    continuous = false;
    interimResults = false;
    lang = "en-US";
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onresult: ((event: any) => void) | null = null;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastInstance = this;
    }

    start() {
        mockStart();
        if (this.onstart) this.onstart();
    }
    stop() {
        mockStop();
        if (this.onend) this.onend();
    }
    abort() {
        mockAbort();
    }
}

describe("useVoiceControl Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        lastInstance = null;
        window.SpeechRecognition = MockSpeechRecognition as any;
        window.webkitSpeechRecognition = MockSpeechRecognition as any;

        // Reset Zustand Store
        useVoiceStore.setState({
            activeSentenceIndex: 0,
            voiceProgress: 0,
            isListening: false,
            isSupported: true,
            isScriptFinished: false,
            error: null,
            adaptedLerpFactor: 0.1,
            sessionSummary: null,
        });
    });

    afterEach(() => {
        delete (window as any).SpeechRecognition;
        delete (window as any).webkitSpeechRecognition;
    });

    it('should initialize', () => {
        // Placeholder test
    });

    it("Should initialize with default values", () => {
        const { result } = renderHook(() => useVoiceControl("Hello world", true), {
            wrapper: TranslationProvider,
        });

        expect(useVoiceStore.getState().activeSentenceIndex).toBe(-1); // Defaults to -1
        expect(useVoiceStore.getState().voiceProgress).toBe(0);
    });

    it("Should handle startListening", () => {
        const { result } = renderHook(() => useVoiceControl("Hello world", true), {
            wrapper: TranslationProvider,
        });

        act(() => {
            result.current.startListening();
        });

        expect(mockStart).toHaveBeenCalled();
        expect(lastInstance).not.toBeNull();
    });

    it("Should handle stopListening", () => {
        const { result } = renderHook(() => useVoiceControl("Hello world", true), {
            wrapper: TranslationProvider,
        });

        act(() => {
            result.current.startListening();
        });

        act(() => {
            result.current.stopListening();
        });

        expect(mockStop).toHaveBeenCalled();
    });

    it("Should match spoken text to script", () => {
        const text = "Hello world. This is a test.";
        const { result } = renderHook(() => useVoiceControl(text, true), {
            wrapper: TranslationProvider,
        });

        act(() => {
            result.current.startListening();
        });

        expect(lastInstance).not.toBeNull();

        // Simulate speech result
        act(() => {
            if (lastInstance && lastInstance.onresult) {
                lastInstance.onresult({
                    resultIndex: 0,
                    results: [[{ transcript: "hello" }]],
                });
            }
        });

        // Should match the first sentence (index 0)
        expect(useVoiceStore.getState().activeSentenceIndex).toBe(0);
    });

    it("Should handle restart on unexpected end", () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useVoiceControl("Hello world", true), {
            wrapper: TranslationProvider,
        });

        act(() => {
            result.current.startListening();
        });

        // Simulate unexpected end (browser stopped it)
        // Needs to be > 100ms to be considered "running"
        vi.advanceTimersByTime(200);

        act(() => {
            if (lastInstance && lastInstance.onend) {
                lastInstance.onend();
            }
        });

        // Should have tried to start again
        expect(mockStart).toHaveBeenCalledTimes(2); // Initial + Restart
        vi.useRealTimers();
    });
});
