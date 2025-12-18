import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { SpeechRecognitionEvent, ISpeechRecognition } from "../types";
import { parseTextToSentences } from "../utils/textParser";
import { logger } from "../utils/logger";
import { findBestMatch } from "../utils/stringSimilarity";
import { useTranslation } from "./useTranslation";

// callback for raw transcript, useful for custom commands like [COUNT]
// callback for raw transcript, useful for custom commands like [COUNT]
export const useVoiceControl = (text: string, isPro: boolean, onSpeechResult?: (transcript: string) => void) => {
    const { lang } = useTranslation();
    const [isListening, setIsListening] = useState<boolean>(false);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
    const [voiceProgress, setVoiceProgress] = useState<number>(0);
    const [voiceApiSupported, setVoiceApiSupported] = useState<boolean>(true);
    const [voiceApiError, setVoiceApiError] = useState<string | null>(null);

    const recognitionRef = useRef<ISpeechRecognition | null>(null);
    const lastMatchIndexRef = useRef<number>(0);
    const lastStartTimeRef = useRef<number>(0);

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
        recognition.lang = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";

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

            // MUSICIAN MODE OPTIMIZATION: Increased min length to 6 to reduce false positives
            // from instrument noise (guitar, piano, etc) when singing
            if (cleanTranscript.length < 6) {
                return;
            }

            // DEBUG: Log transcript
            console.warn(`[Voice] Heard: "${cleanTranscript}"`);

            // Fuzzy Search Strategy
            // 1. Try to find fuzzy match starting from last known position
            // We allow up to 40% error (0.4) to handle bad recognition like "PromptNinja" -> "próprio ninja"
            // OPTIMIZATION: Reduced search window from 1000 to 600 for performance
            let match = findBestMatch(fullCleanText, cleanTranscript, lastMatchIndexRef.current, 600, 0.4);

            // DEBUG: Log Match
            if (match) {
                console.warn(`[Voice] Match Found! Index: ${match.index}, Ratio: ${match.ratio}`);
            } else {
                console.warn(`[Voice] No Match. LastIndex: ${lastMatchIndexRef.current}`);
            }

            // Fallback logic for repeated phrases
            if (!match && lastMatchIndexRef.current > 0) {
                // Fallback: search from beginning if we lost track
                const fallbackMatch = findBestMatch(fullCleanText, cleanTranscript, 0, 2000, 0.4);

                if (fallbackMatch) {
                    // IMPROVED LOGIC FOR REPEATED PHRASES:
                    // Only accept backward jumps if the match is VERY good (almost perfect)
                    // This prevents jumping back to previous repetitions of the same phrase
                    const isBackwardJump = fallbackMatch.index < lastMatchIndexRef.current;
                    const isVeryGoodMatch = fallbackMatch.ratio < 0.15; // Stricter than before (was 0.2)
                    const isSmallJump = Math.abs(lastMatchIndexRef.current - fallbackMatch.index) < 200;

                    // Accept if:
                    // 1. Going forward (always good)
                    // 2. Small backward jump (nearby repetition)
                    // 3. Very high quality match (user definitely restarted or jumped intentionally)
                    if (!isBackwardJump || isSmallJump || isVeryGoodMatch) {
                        match = fallbackMatch;
                        console.warn(`[Voice] Fallback Match! Index: ${match.index}, Backward: ${isBackwardJump}`);
                    } else {
                        console.warn(`[Voice] Rejected backward jump. Ratio: ${fallbackMatch.ratio}, Distance: ${lastMatchIndexRef.current - fallbackMatch.index}`);
                    }
                }
            }

            if (match) {
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
                            const p = Math.min(1, Math.max(0, relativeIndex / len));
                            setVoiceProgress(p);
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
            console.warn("[VoiceHook] Already listening, ignoring start request");
            return;
        }

        console.warn("[VoiceHook] Starting recognition...");

        intentionallyStoppedRef.current = false;
        startRecognitionInstance();
    }, [isPro, isListening, voiceApiSupported, startRecognitionInstance]);

    const stopListening = useCallback(() => {
        console.warn("[VoiceHook] Stopping recognition...");
        intentionallyStoppedRef.current = true;
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) { /* ignore */ }
        }
        setIsListening(false);
    }, []);

    const resetVoice = useCallback(() => {
        console.warn("[VoiceHook] Resetting voice state");
        stopListening();
        lastMatchIndexRef.current = 0;
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


