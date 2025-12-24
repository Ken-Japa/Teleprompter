import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { SpeechRecognitionEvent, ISpeechRecognition } from "../types";
import { parseTextToSentences } from "../utils/textParser";
import { logger } from "../utils/logger";
import { findBestMatch } from "../utils/stringSimilarity";
import { useTranslation } from "./useTranslation";

// callback for raw transcript, useful for custom commands like [COUNT]
// callback for raw transcript, useful for custom commands like [COUNT]
export const useVoiceControl = (text: string, isPro: boolean, onSpeechResult?: (transcript: string) => void, forcedLang?: string) => {
    const { lang: globalLang } = useTranslation();
    const lang = forcedLang || globalLang;
    const [isListening, setIsListening] = useState<boolean>(false);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
    const [voiceProgress, setVoiceProgress] = useState<number>(0);
    const [voiceApiSupported, setVoiceApiSupported] = useState<boolean>(true);
    const [voiceApiError, setVoiceApiError] = useState<string | null>(null);

    const recognitionRef = useRef<ISpeechRecognition | null>(null);
    const lastMatchIndexRef = useRef<number>(0);
    const lastStartTimeRef = useRef<number>(0);
    const lastProcessedTimeRef = useRef<number>(0); // For throttling

    // STABILITY SYSTEM: Require matches to be stable before accepting
    const pendingMatchRef = useRef<{ index: number; count: number; sentenceId: number } | null>(null);
    const MATCH_CONFIRMATION_FRAMES = 3; // Must be stable for 3 frames

    // PROGRESS SMOOTHING: Prevent jitter
    const smoothedProgressRef = useRef<number>(0);
    const PROGRESS_SMOOTH_FACTOR = 0.3; // 30% new, 70% old

    // Keep latest callback in ref to avoid restarting recognition on every state change
    const onSpeechResultRef = useRef(onSpeechResult);
    useEffect(() => {
        onSpeechResultRef.current = onSpeechResult;
    }, [onSpeechResult]);

    // Resilience: Track if user INTENDED to stop. If false and 'end' event fires, we restart.
    const intentionallyStoppedRef = useRef<boolean>(false);

    const { sentences, fullCleanText, charToSentenceMap } = useMemo(() => {
        return parseTextToSentences(text);
    }, [text]);

    useEffect(() => {
        lastMatchIndexRef.current = 0;
    }, [fullCleanText]);

    useEffect(() => {
        return () => {
            intentionallyStoppedRef.current = true;
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onresult = null;
                } catch (e) { /* Ignore errors during cleanup */ }
            }
        };
    }, []);

    // Helper to map language code to BCP 47
    const getRecognitionLanguage = (l: string) => {
        switch (l) {
            case "pt": return "pt-BR";
            case "es": return "es-ES";
            case "en": return "en-US";
            case "it": return "it-IT";
            case "fr": return "fr-FR";
            case "de": return "de-DE";
            case "ja": return "ja-JP";
            case "zh": return "zh-CN";
            case "other": return ""; // Empty means browser default/auto
            default: return l.includes("-") ? l : "en-US";
        }
    };

    // Memoized start function to be safe for recursion in onend
    const startRecognitionInstance = useCallback(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setVoiceApiSupported(false);
            setVoiceApiError("voice.notSupported"); // Key for translation
            return;
        }

        // Abort previous to ensure clean state
        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch (e) { /* ignore */ }
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getRecognitionLanguage(lang);

        recognition.onstart = () => {
            setIsListening(true);
            lastStartTimeRef.current = Date.now();
        };

        recognition.onend = () => {
            // CRITICAL OPTIMIZATION: Browser stopped it, but did user want that?
            // Infinite Loop Protection: If it stopped less than 100ms after start, assume error (permission denied).
            const duration = Date.now() - lastStartTimeRef.current;

            if (!intentionallyStoppedRef.current && duration > 100) {
                // Restart immediately
                try {
                    recognition.start();
                } catch (e) { /* ignore */ }
            } else {
                setIsListening(false);
            }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                interimTranscript += event.results[i][0].transcript;
            }

            let cleanTranscript = interimTranscript.toLowerCase();
            // Apply the same cleaning logic as the parser to ensure matching works
            // FLEXIBLE NUMBER MATCHING: Remove digit sequences to allow natural number speech
            cleanTranscript = cleanTranscript
                .replace(/[^\p{L}\p{N}\s]/gu, "")
                .replace(/\b\d+\b/g, " ") // Remove isolated numbers (flexible matching)
                .replace(/\s+/g, " ")
                .trim();

            // Allow parent to inspect transcript (e.g. for counting reps)
            if (onSpeechResultRef.current && cleanTranscript.length > 0) {
                onSpeechResultRef.current(cleanTranscript);
            }

            // THROTTLING: Only process interim results every 100ms to reduce computational load
            const now = Date.now();
            const isFinal = event.results[event.resultIndex]?.isFinal;
            const THROTTLE_MS = 100; // Max 10 updates/second instead of 20

            if (!isFinal && (now - lastProcessedTimeRef.current) < THROTTLE_MS) {
                return; // Skip this interim result
            }
            lastProcessedTimeRef.current = now;

            // MUSICIAN MODE OPTIMIZATION: Increased min length to 6 to reduce false positives
            // from instrument noise (guitar, piano, etc) when singing
            if (cleanTranscript.length < 6) {
                return;
            }

            // ADAPTIVE SEARCH WINDOW: Larger scripts need larger windows
            const scriptLength = fullCleanText.length;
            const searchWindow = scriptLength > 5000 ? 1200 :
                scriptLength > 2000 ? 800 : 600;

            // Fuzzy Search Strategy
            // 1. Try to find fuzzy match starting from last known position
            // We allow up to 40% error (0.4) to handle bad recognition like "PromptNinja" -> "próprio ninja"
            let match = findBestMatch(fullCleanText, cleanTranscript, lastMatchIndexRef.current, searchWindow, 0.4);


            // Fallback logic for repeated phrases
            // CRITICAL: Fallback is now EXTREMELY restrictive to prevent incorrect jumps
            if (!match && lastMatchIndexRef.current > 0) {
                // Fallback: search from beginning BUT with VERY strict criteria
                const fallbackMatch = findBestMatch(fullCleanText, cleanTranscript, 0, 2000, 0.4);

                if (fallbackMatch) {
                    // ULTRA-STRICT LOGIC:
                    const currentSentenceId = charToSentenceMap[lastMatchIndexRef.current] || 0;
                    const fallbackSentenceId = charToSentenceMap[fallbackMatch.index] || 0;
                    const sentenceDistance = Math.abs(currentSentenceId - fallbackSentenceId);

                    const isBackwardJump = fallbackMatch.index < lastMatchIndexRef.current;
                    const isForwardJump = fallbackMatch.index > lastMatchIndexRef.current;

                    // CRITICAL: Only allow fallback if:
                    // 1. Nearly PERFECT backward match (98%+) within 2 sentences (user restarted)
                    // 2. NEVER allow forward jumps via fallback (too risky)
                    const isNearPerfectMatch = fallbackMatch.ratio < 0.02; // 98%+ accuracy
                    const isVerySmallJump = sentenceDistance <= 2;

                    if (isBackwardJump && isNearPerfectMatch && isVerySmallJump) {
                        match = fallbackMatch;
                        console.log(`[Voice] Fallback accepted: Perfect match (${(1 - fallbackMatch.ratio) * 100}%) within ${sentenceDistance} sentences`);
                    } else if (isForwardJump) {
                        // NEVER allow forward jumps from fallback - too dangerous
                        console.warn(`[Voice] Fallback BLOCKED: Forward jump rejected (too risky)`);
                    } else {
                        console.warn(`[Voice] Fallback rejected: Sentence dist ${sentenceDistance}, Ratio ${fallbackMatch.ratio.toFixed(3)}`);
                    }
                }
            }

            if (match) {
                // SEQUENTIAL VALIDATION: Prevent implausible large jumps
                const newSentenceId = charToSentenceMap[match.index] || 0;
                const currentSentenceId = charToSentenceMap[lastMatchIndexRef.current] || 0;
                const jumpDistance = Math.abs(newSentenceId - currentSentenceId);

                // HYSTERESIS: Ignore very small movements (within same sentence)
                // This prevents oscillation between nearby positions
                if (newSentenceId === currentSentenceId && Math.abs(match.index - lastMatchIndexRef.current) < 10) {
                    // Same sentence, very close position - ignore to prevent jitter
                    return;
                }

                // STRICTER VALIDATION: Require better match quality for any jump > 5 sentences
                if (jumpDistance > 5 && match.ratio > 0.05) {
                    console.warn(`[Voice] Medium jump rejected (${jumpDistance} sentences), ratio ${match.ratio.toFixed(3)} not good enough`);
                    return;
                }

                // If jumping more than 10 sentences, require PERFECT confidence
                if (jumpDistance > 10 && match.ratio > 0.03) {
                    console.warn(`[Voice] Large jump rejected (${jumpDistance} sentences), ratio ${match.ratio.toFixed(3)} not perfect enough`);
                    return;
                }

                // MATCH CONFIRMATION SYSTEM: Require stability before accepting
                // If this is a new sentence, check if it's stable across multiple frames
                if (newSentenceId !== currentSentenceId) {
                    if (!pendingMatchRef.current || pendingMatchRef.current.sentenceId !== newSentenceId) {
                        // New potential match - start counting
                        pendingMatchRef.current = { index: match.index, count: 1, sentenceId: newSentenceId };
                        console.log(`[Voice] New match pending: sentence ${newSentenceId}, needs ${MATCH_CONFIRMATION_FRAMES - 1} more frames`);
                        return; // Don't accept yet
                    } else {
                        // Same match - increment counter
                        pendingMatchRef.current.count++;
                        if (pendingMatchRef.current.count < MATCH_CONFIRMATION_FRAMES) {
                            console.log(`[Voice] Match confirming: ${pendingMatchRef.current.count}/${MATCH_CONFIRMATION_FRAMES}`);
                            return; // Still not stable enough
                        }
                        // Confirmed! Clear pending and proceed
                        console.log(`[Voice] Match CONFIRMED after ${MATCH_CONFIRMATION_FRAMES} frames`);
                        pendingMatchRef.current = null;
                    }
                } else {
                    // Same sentence - clear any pending different match
                    pendingMatchRef.current = null;
                }

                lastMatchIndexRef.current = match.index;

                // Calculate the end index of the match to determine current reading position
                // We use the length of what was recognized to project where we are in the text
                const matchEndIndex = match.index + cleanTranscript.length;

                // Clamp to valid range
                const lookupIndex = Math.min(matchEndIndex, charToSentenceMap.length - 1);

                if (lookupIndex >= 0 && lookupIndex < charToSentenceMap.length) {
                    const sentenceId = charToSentenceMap[lookupIndex];

                    // Calculate progress within the sentence for smooth scrolling
                    // Assumes sentences array is ordered by ID (which it is from parser)
                    const sentence = sentences[sentenceId];
                    if (sentence && typeof sentence.startIndex === "number") {
                        const relativeIndex = lookupIndex - sentence.startIndex;
                        const len = sentence.cleanContent.length;
                        if (len > 0) {
                            const rawProgress = Math.min(1, Math.max(0, relativeIndex / len));

                            // PROGRESS SMOOTHING: Use exponential moving average to prevent jitter
                            const smoothedProgress = smoothedProgressRef.current * (1 - PROGRESS_SMOOTH_FACTOR) +
                                rawProgress * PROGRESS_SMOOTH_FACTOR;
                            smoothedProgressRef.current = smoothedProgress;
                            setVoiceProgress(smoothedProgress);
                        } else {
                            setVoiceProgress(0);
                        }
                    }

                    // Only update if we moved forward or it's a definitive jump
                    // This prevents jitter if the match fluctuates slightly between sentences
                    if (sentenceId !== activeSentenceIndex) {
                        setActiveSentenceIndex(sentenceId);
                    }
                }
            }
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch (e) {
            logger.error("Voice start error", { error: e as Error });
        }
    }, [lang, activeSentenceIndex]); // Dependencies for startRecognitionInstance

    const startListening = useCallback(() => {
        if (!isPro) return;
        if (!voiceApiSupported) {
            console.warn("[VoiceHook] Voice API not supported");
            return;
        }
        if (isListening) {
            return;
        }

        intentionallyStoppedRef.current = false;
        startRecognitionInstance();
    }, [isPro, isListening, voiceApiSupported, startRecognitionInstance]);

    const stopListening = useCallback(() => {
        intentionallyStoppedRef.current = true;
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) { /* ignore */ }
        }
        setIsListening(false);
    }, []);

    const resetVoice = useCallback(() => {
        stopListening();
        lastMatchIndexRef.current = 0;
        pendingMatchRef.current = null; // Clear pending match
        smoothedProgressRef.current = 0; // Reset smoothed progress
        setVoiceProgress(0);
        setActiveSentenceIndex(-1);
    }, [stopListening]);


    return {
        isListening,
        startListening,
        stopListening,
        resetVoice,
        activeSentenceIndex,
        setActiveSentenceIndex,
        voiceProgress,
        sentences,
        voiceApiSupported,
        voiceApiError,
    };
};


