import { useRef, useState, useCallback, useEffect } from "react";
import { SpeechRecognitionEvent, ISpeechRecognition } from "../../types";
import { normalizeTranscript, getTranscriptTail } from "../../utils/voice/normalization";
import { voiceDiagnostics } from "../../utils/voiceDiagnostics";
import { usePageVisibility } from "../usePageVisibility";

interface UseVoiceSpeechEngineProps {
    lang: string;
    onTranscript: (transcript: string, isFinal: boolean, rawEvent: SpeechRecognitionEvent) => void;
    onError?: (error: string) => void;
    currentSentenceText?: string;
}

/**
 * Hook responsible for the SpeechRecognition lifecycle.
 * Handles initialization, auto-restart, and raw transcript normalization.
 */
export const useVoiceSpeechEngine = ({
    lang,
    onTranscript,
    onError,
    currentSentenceText
}: UseVoiceSpeechEngineProps) => {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isVisible = usePageVisibility();
    const isVisibleRef = useRef(isVisible);
    useEffect(() => {
        isVisibleRef.current = isVisible;
    }, [isVisible]);

    const recognitionRef = useRef<ISpeechRecognition | null>(null);
    const intentionallyStoppedRef = useRef(false);
    const recycleSessionRef = useRef(false);
    const lastStartTimeRef = useRef(0);
    const normalizedSegmentsRef = useRef<Map<number, string>>(new Map());
    const audioStreamRef = useRef<MediaStream | null>(null);

    // Backoff e Graceful Degradation Refs
    const consecutiveErrorsRef = useRef(0);
    const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const getRecognitionLanguage = useCallback((l: string) => {
        switch (l) {
            case "pt": return "pt-BR";
            case "es": return "es-ES";
            case "en": return "en-US";
            case "it": return "it-IT";
            case "fr": return "fr-FR";
            case "de": return "de-DE";
            case "ja": return "ja-JP";
            case "zh": return "zh-CN";
            default: return l.includes("-") ? l : "en-US";
        }
    }, []);

    const stopAudioStream = useCallback(() => {
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
        }
    }, []);

    const start = useCallback(async () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsSupported(false);
            const err = "voice.notSupported";
            setError(err);
            onError?.(err);
            return;
        }

        intentionallyStoppedRef.current = false;

        if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current);
            restartTimeoutRef.current = null;
        }

        // Force hardware-level echo cancellation and noise suppression
        try {
            stopAudioStream(); // Ensure any previous stream is closed
            audioStreamRef.current = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
        } catch (mediaErr) {
            console.warn("[Voice Speech Engine] Could not grab explicit audio stream for DSPs, falling back to default.", mediaErr);
        }

        if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch (e) { }
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getRecognitionLanguage(lang);

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
            lastStartTimeRef.current = Date.now();
            // Reset error tally on successful start — prevents over-penalizing
            // subsequent errors with a disproportionate backoff.
            consecutiveErrorsRef.current = 0;
        };

        recognition.onerror = (event: any) => {
            if (event.error === 'not-allowed') {
                const err = "voice.permissionDenied";
                setError(err);
                onError?.(err);
                intentionallyStoppedRef.current = true;
                setIsListening(false);
                return;
            }

            console.warn("[Voice Speech Engine] Error:", event.error);
            voiceDiagnostics.recordError(new Error(`Speech API Error: ${event.error}`), { error: event.error });

            // Increment error tally for silent/network/audio-capture failures
            consecutiveErrorsRef.current += 1;

            if (consecutiveErrorsRef.current >= 5) {
                // Critical failure - stop looping and surface error to UI
                console.error("[Voice Speech Engine] Critical failure threshold reached. Halting auto-restart.");
                const err = "voice.criticalFailure";
                setError(err);
                onError?.(err);
                intentionallyStoppedRef.current = true;
                setIsListening(false);
            }
        };

        recognition.onend = () => {
            if (recycleSessionRef.current) {
                recycleSessionRef.current = false;
                normalizedSegmentsRef.current.clear(); // Clear stale cache on recycle
                try { recognition.start(); } catch (e) { }
                return;
            }

            const duration = Date.now() - lastStartTimeRef.current;

            if (!intentionallyStoppedRef.current && isVisibleRef.current && (duration > 100 || consecutiveErrorsRef.current > 0)) {
                normalizedSegmentsRef.current.clear(); // Clear stale cache on auto-restart

                // Exponential Backoff if we are failing
                if (consecutiveErrorsRef.current > 0) {
                    const backoffMs = Math.min(Math.pow(2, consecutiveErrorsRef.current) * 500, 5000); // Max 5s wait
                    console.log(`[Voice Speech Engine] Applying backoff of ${backoffMs}ms before restart (Error count: ${consecutiveErrorsRef.current})`);
                    restartTimeoutRef.current = setTimeout(() => {
                        if (!intentionallyStoppedRef.current && isVisibleRef.current) {
                            try { recognition.start(); } catch (e) { }
                        }
                    }, backoffMs);
                } else {
                    // Normal instant restart
                    try { recognition.start(); } catch (e) { }
                }
            } else {
                normalizedSegmentsRef.current.clear();
                setIsListening(false);
            }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            // Se houve resultado de sucesso, reseta as falhas consecutivas
            consecutiveErrorsRef.current = 0;

            let fullTranscript = "";
            let isFinalBlock = false;

            // Build the full transcript from all results to ensure context,
            // but use a Map to cache normalized versions of finalized segments.
            for (let i = 0; i < event.results.length; ++i) {
                const result = event.results[i];
                const segmentText = result[0].transcript;

                if (result.isFinal) {
                    // Cache final segments
                    if (!normalizedSegmentsRef.current.has(i)) {
                        normalizedSegmentsRef.current.set(i, normalizeTranscript(segmentText, lang));
                    }
                    fullTranscript += normalizedSegmentsRef.current.get(i) + " ";
                    if (i === event.results.length - 1) isFinalBlock = true;
                } else {
                    // Process non-final (interim) segments normally
                    fullTranscript += normalizeTranscript(segmentText, lang) + " ";
                }
            }

            let cleanTranscript = fullTranscript.trim();

            // Tail Processing
            if (currentSentenceText) {
                cleanTranscript = getTranscriptTail(cleanTranscript, currentSentenceText);
            }

            onTranscript(cleanTranscript, isFinalBlock, event);
        };

        recognitionRef.current = recognition;
        try { recognition.start(); } catch (e) {
            console.error("[Voice Speech Engine] Failed to start:", e);
        }
    }, [lang, onTranscript, onError, currentSentenceText, getRecognitionLanguage, stopAudioStream]);

    const stop = useCallback(() => {
        intentionallyStoppedRef.current = true;
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) { }
        }
        stopAudioStream();
        setIsListening(false);
    }, [stopAudioStream]);

    useEffect(() => {
        return () => {
            intentionallyStoppedRef.current = true;
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.onresult = null;
                recognitionRef.current.onerror = null;
                try { recognitionRef.current.stop(); } catch (e) { }
            }
            stopAudioStream();
        };
    }, [stopAudioStream]);

    // Handle background throttling / visibility change
    const wasListeningBeforeHidden = useRef(false);
    useEffect(() => {
        if (!isVisible) {
            if (isListening) {
                console.log("[Voice Speech Engine] Tab hidden, proactively pausing recognition.");
                wasListeningBeforeHidden.current = true;
                if (restartTimeoutRef.current) {
                    clearTimeout(restartTimeoutRef.current);
                    restartTimeoutRef.current = null;
                }
                if (recognitionRef.current) {
                    try { recognitionRef.current.stop(); } catch (e) { }
                }
            }
        } else {
            if (wasListeningBeforeHidden.current) {
                console.log("[Voice Speech Engine] Tab visible, resuming recognition.");
                wasListeningBeforeHidden.current = false;
                start();
            }
        }
    }, [isVisible, isListening, start]);

    const toggleVoice = useCallback(() => {
        if (isListening) {
            stop();
        } else {
            start();
        }
    }, [isListening, start, stop]);

    return {
        isListening,
        isSupported,
        error,
        start,
        stop,
        toggleVoice
    };
};
