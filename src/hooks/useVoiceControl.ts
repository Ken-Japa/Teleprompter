import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { SpeechRecognitionEvent, ISpeechRecognition } from "../types";
import { parseTextToSentences } from "../utils/textParser";
import { logger } from "../utils/logger";
import { findBestMatch } from "../utils/stringSimilarity";
import { useTranslation } from "./useTranslation";
import { VOICE_CONFIG } from "../config/voiceControlConfig";

// callback for raw transcript, useful for custom commands like [COUNT]
export const useVoiceControl = (text: string, isPro: boolean, onSpeechResult?: (transcript: string) => void, forcedLang?: string, isFlipVertical: boolean = false) => {
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

    // SENTENCE-LOCK ARCHITECTURE:
    // We distinguish between "which sentence" (requires confirmation) and "where within sentence" (free)
    const lockedSentenceIdRef = useRef<number>(-1); // Current locked sentence
    const pendingMatchRef = useRef<{ index: number; count: number; sentenceId: number } | null>(null);

    // PROGRESS SMOOTHING: Prevent jitter
    const smoothedProgressRef = useRef<number>(0);

    // Keep latest callback in ref to avoid restarting recognition on every state change
    const onSpeechResultRef = useRef(onSpeechResult);
    useEffect(() => {
        onSpeechResultRef.current = onSpeechResult;
    }, [onSpeechResult]);

    // Resilience: Track if user INTENDED to stop. If false and 'end' event fires, we restart.
    const intentionallyStoppedRef = useRef<boolean>(false);
    // Optimization: Flag to indicate we are recycling the session (clearing memory)
    const recycleSessionRef = useRef<boolean>(false);

    const { sentences, fullCleanText, charToSentenceMap } = useMemo(() => {
        return parseTextToSentences(text);
    }, [text]);

    useEffect(() => {
        lastMatchIndexRef.current = 0;
        lockedSentenceIdRef.current = 0; // Start with first sentence locked
    }, [fullCleanText]);


    useEffect(() => {
        return () => {
            intentionallyStoppedRef.current = true;
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onresult = null;
                    recognitionRef.current.onerror = null; // Clean up error handler
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
            case "other": return "";
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
            setVoiceApiError(null); // Clear errors on success
            lastStartTimeRef.current = Date.now();
        };

        recognition.onerror = (event: any) => {
            // Handle specific errors
            if (event.error === 'not-allowed') {
                setVoiceApiError("voice.permissionDenied");
                intentionallyStoppedRef.current = true; // Stop trying
                setIsListening(false);
            } else if (event.error === 'network') {
                // Network errors might be temporary, let retry logic handle it
                console.warn("[Voice] Network error");
            } else if (event.error === 'no-speech') {
                // Ignore, just silence
            } else {
                console.warn("[Voice] Error:", event.error);
            }
        };

        recognition.onend = () => {
            // CRITICAL OPTIMIZATION: Browser stopped it, but did user want that?

            // Check for explicit recycle (History Reset)
            if (recycleSessionRef.current) {
                console.log("[Voice] Recycle: Restarting immediately...");
                recycleSessionRef.current = false;
                try {
                    recognition.start();
                } catch (e) { /* ignore */ }
                return;
            }

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

            // MEMORY OPTIMIZATION: Recycle session if history gets too long (50 sentences)
            // Check handled AFTER processing to ensure we don't drop data
            if (event.results.length > 50 && !recycleSessionRef.current) {
                recycleSessionRef.current = true;
                recognition.stop();
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

            if (!isFinal && (now - lastProcessedTimeRef.current) < VOICE_CONFIG.THROTTLE_MS) {
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
            const searchWindow = scriptLength > 5000 ? VOICE_CONFIG.SEARCH_WINDOW.LARGE :
                scriptLength > 2000 ? VOICE_CONFIG.SEARCH_WINDOW.MEDIUM : VOICE_CONFIG.SEARCH_WINDOW.SMALL;

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
                const currentSentenceId = lockedSentenceIdRef.current;
                const jumpDistance = Math.abs(newSentenceId - currentSentenceId);

                // STRICTER VALIDATION for cross-sentence jumps
                if (newSentenceId !== currentSentenceId) {
                    // Medium jumps: require 95%+ accuracy
                    if (jumpDistance > 5 && match.ratio > 0.05) {
                        console.warn(`[Voice] Medium jump rejected (${jumpDistance} sentences), ratio ${match.ratio.toFixed(3)} not good enough`);
                        return;
                    }

                    // Large jumps: require 97%+ accuracy
                    if (jumpDistance > 10 && match.ratio > 0.03) {
                        console.warn(`[Voice] Large jump rejected (${jumpDistance} sentences), ratio ${match.ratio.toFixed(3)} not perfect enough`);
                        return;
                    }

                    // MATCH CONFIRMATION: New sentence must be stable
                    if (!pendingMatchRef.current || pendingMatchRef.current.sentenceId !== newSentenceId) {
                        // New potential sentence - start counting
                        pendingMatchRef.current = { index: match.index, count: 1, sentenceId: newSentenceId };
                        console.log(`[Voice] New sentence pending: ${currentSentenceId} → ${newSentenceId}, needs ${VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES - 1} more`);
                        // DON'T RETURN - allow progress update below
                    } else {
                        // Same pending sentence - increment counter
                        pendingMatchRef.current.count++;
                        if (pendingMatchRef.current.count < VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES) {
                            console.log(`[Voice] Sentence confirming: ${pendingMatchRef.current.count}/${VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES}`);
                            // DON'T RETURN - allow progress update below
                        } else {
                            // CONFIRMED! Lock to new sentence
                            console.log(`[Voice] Sentence LOCKED: ${newSentenceId}`);
                            lockedSentenceIdRef.current = newSentenceId;
                            pendingMatchRef.current = null;
                        }
                    }
                } else {
                    // Same sentence - clear any pending
                    pendingMatchRef.current = null;
                }

                // ALWAYS update match index for progress calculation
                lastMatchIndexRef.current = match.index;

                // Calculate the end index of the match to determine current reading position
                const matchEndIndex = match.index + cleanTranscript.length;
                const lookupIndex = Math.min(matchEndIndex, charToSentenceMap.length - 2);

                if (lookupIndex >= 0 && lookupIndex < charToSentenceMap.length) {
                    const sentenceId = charToSentenceMap[lookupIndex];

                    // Use LOCKED sentence if available, otherwise use detected sentence
                    const effectiveSentenceId = lockedSentenceIdRef.current >= 0 ? lockedSentenceIdRef.current : sentenceId;

                    // Calculate progress within the effective sentence
                    const sentence = sentences[effectiveSentenceId];
                    if (sentence && typeof sentence.startIndex === "number") {
                        const relativeIndex = lookupIndex - sentence.startIndex;
                        const len = sentence.cleanContent.length;
                        if (len > 0) {
                            const rawProgress = Math.min(1, Math.max(0, relativeIndex / len));

                            // PROGRESS SMOOTHING: Use exponential moving average
                            const smoothedProgress = smoothedProgressRef.current * (1 - VOICE_CONFIG.PROGRESS_SMOOTH_FACTOR) +
                                rawProgress * VOICE_CONFIG.PROGRESS_SMOOTH_FACTOR;
                            smoothedProgressRef.current = smoothedProgress;
                            setVoiceProgress(smoothedProgress);
                        } else {
                            setVoiceProgress(0);
                        }
                    }

                    // Only update active sentence if it's confirmed (locked)
                    if (lockedSentenceIdRef.current !== activeSentenceIndex && lockedSentenceIdRef.current >= 0) {
                        setActiveSentenceIndex(lockedSentenceIdRef.current);
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

    // Helper: Find which sentence is currently visible on screen
    // Returns index and the estimated progress within that sentence (0-1) based on scroll position
    const findVisibleSentenceId = useCallback((targetVisualRatio: number = VOICE_CONFIG.LOOKAHEAD_POSITION): { index: number; progress: number } => {
        if (typeof window === 'undefined' || sentences.length === 0) return { index: 0, progress: 0 };

        try {
            // Get scroll container
            const container = document.querySelector('.voice-control-smooth') as HTMLElement;
            if (!container) {
                // Return current active index if container not found, better than resetting to 0
                return { index: activeSentenceIndex >= 0 ? activeSentenceIndex : 0, progress: 0 };
            }

            const scrollTop = container.scrollTop || 0;

            // Calculate DOM Target Ratio based on Visual Target Ratio
            // Standard: DOM = Visual
            // Flipped: DOM = 1 - Visual
            const effectiveRatio = isFlipVertical ? (1 - targetVisualRatio) : targetVisualRatio;

            // targetPosition: The DOM coordinate that is currently under the "Reading Line"
            const targetPosition = scrollTop + (container.clientHeight * effectiveRatio);

            let closestSentenceId = 0;
            let minDistance = Number.MAX_VALUE;
            let bestProgress = 0;

            // Strategy: Find sentence strictly overlapping OR closest to the target position
            // This handles "dead zones" (margins/padding) where targetPosition is between sentences
            for (let i = 0; i < sentences.length; i++) {
                const el = document.getElementById(`sentence-${i}`);
                if (el) {
                    const elTop = el.offsetTop;
                    const elHeight = el.clientHeight;
                    const elBottom = elTop + elHeight;

                    // Progress calculation:
                    // If targetPosition is at elTop, progress is 0.
                    // If targetPosition is at elBottom, progress is 1.
                    const rawProgress = elHeight > 0 ? (targetPosition - elTop) / elHeight : 0;
                    const progress = Math.min(1, Math.max(0, rawProgress));

                    // 1. Exact overlap check (Most common case)
                    if (elTop <= targetPosition && elBottom >= targetPosition) {
                        return { index: i, progress };
                    }

                    // 2. Distance check (Fallback for margins/gaps)
                    let dist = 0;
                    if (targetPosition < elTop) dist = elTop - targetPosition;
                    else if (targetPosition > elBottom) dist = targetPosition - elBottom;

                    if (dist < minDistance) {
                        minDistance = dist;
                        closestSentenceId = i;
                        bestProgress = progress; // Will be 0 or 1 usually if outside
                    }
                }
            }

            console.log(`[Voice] Found visible sentence (closest): ${closestSentenceId} (dist: ${minDistance})`);
            return { index: closestSentenceId, progress: bestProgress };

        } catch (e) {
            console.warn('[Voice] Error finding visible sentence:', e);
        }

        return { index: activeSentenceIndex >= 0 ? activeSentenceIndex : 0, progress: 0 }; // Fallback to current
    }, [sentences, activeSentenceIndex, isFlipVertical]);

    const startListening = useCallback(() => {
        if (!isPro) return;
        if (!voiceApiSupported) {
            console.warn("[VoiceHook] Voice API not supported");
            return;
        }
        if (isListening) {
            return;
        }

        // Initialize to visible sentence.
        // CRITICAL: We use 0.5 (CENTER) as the search target because normally users are reading
        // at the center of the screen when they activate Voice.
        // The Voice Control will then gently scroll this centered sentence to the active Lookahead position (Top).
        const { index: visibleSentence, progress: initialProgress } = findVisibleSentenceId(0.5);
        lockedSentenceIdRef.current = visibleSentence;
        setActiveSentenceIndex(visibleSentence);

        // CRITICAL FIX: Sync match index to the visible sentence's start
        // This ensures matching resumes from the correct position instead of 0
        if (sentences[visibleSentence]) {
            lastMatchIndexRef.current = sentences[visibleSentence].startIndex ?? 0;
        } else {
            lastMatchIndexRef.current = 0;
        }

        // Reset smoothed progress to current visual position to prevent jumps
        smoothedProgressRef.current = initialProgress;
        setVoiceProgress(initialProgress);

        console.log(`[Voice] Starting from visible sentence: ${visibleSentence} (Char: ${lastMatchIndexRef.current}, Progress: ${initialProgress.toFixed(2)})`);

        intentionallyStoppedRef.current = false;
        startRecognitionInstance();
    }, [isPro, isListening, voiceApiSupported, startRecognitionInstance, findVisibleSentenceId]);

    const stopListening = useCallback(() => {
        intentionallyStoppedRef.current = true;
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) { /* ignore */ }
        }
        setIsListening(false);
        // DON'T reset locked sentence here - allows resume from same position
    }, []);

    const resetVoice = useCallback(() => {
        stopListening();
        lastMatchIndexRef.current = 0;
        lockedSentenceIdRef.current = 0; // Reset to first sentence (not -1)
        pendingMatchRef.current = null; // Clear pending match
        smoothedProgressRef.current = 0; // Reset smoothed progress
        setVoiceProgress(0);
        setActiveSentenceIndex(0); // Start at first sentence
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


