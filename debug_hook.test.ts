
import { renderHook, act } from "@testing-library/react";
import { useVoiceControl } from "./src/hooks/useVoiceControl";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { TranslationProvider } from "./src/hooks/useTranslation";
import { voiceDiagnostics } from "./src/utils/voiceDiagnostics";

// Mocks
const mockStart = vi.fn();
const mockStop = vi.fn();

let lastInstance: any = null;

class MockSpeechRecognition {
    continuous = false;
    interimResults = false;
    lang = "en-US";
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onresult: ((event: any) => void) | null = null;

    constructor() {
        lastInstance = this;
    }
    start() { mockStart(); if (this.onstart) this.onstart(); }
    stop() { mockStop(); if (this.onend) this.onend(); }
}

describe("Debug Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        lastInstance = null;
        window.SpeechRecognition = MockSpeechRecognition as any;
        window.webkitSpeechRecognition = MockSpeechRecognition as any;
    });

    it("Should debug text match", () => {
        vi.useFakeTimers();
        const text = "Hello world. This is a test.";
        const { result } = renderHook(() => useVoiceControl(text, true), {
            wrapper: TranslationProvider,
        });

        act(() => {
            console.error("Starting listening...");
            result.current.startListening();
        });

        console.error("Advancing timers...");
        act(() => {
            vi.advanceTimersByTime(600);
        });

        act(() => {
            if (lastInstance && lastInstance.onresult) {
                console.error("Simulating onresult...");
                lastInstance.onresult({
                    resultIndex: 0,
                    results: [[{ transcript: "hello", isFinal: true }]],
                });
            } else {
                console.error("LAST INSTANCE NOT FOUND OR ONRESULT NULL");
            }
        });

        console.error("Active Sentence Index:", result.current.activeSentenceIndex);
        expect(result.current.activeSentenceIndex).toBe(0);
        vi.useRealTimers();
    });
});
