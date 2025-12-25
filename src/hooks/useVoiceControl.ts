import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { SpeechRecognitionEvent, ISpeechRecognition } from "../types";
import { parseTextToSentences } from "../utils/textParser";
import { logger } from "../utils/logger";
import { findBestMatch } from "../utils/stringSimilarity";
import { useTranslation } from "./useTranslation";
import { VOICE_CONFIG } from "../config/voiceControlConfig";

// callback for raw transcript, useful for custom commands like [COUNT]
export const useVoiceControl = (
    text: string,
    isPro: boolean,
    onSpeechResult?: (transcript: string) => void,
    forcedLang?: string,
    isFlipVertical: boolean = false,
    isMusicianMode: boolean = false,
    isBilingual: boolean = false
) => {
    const { lang: globalLang } = useTranslation();
    const lang = forcedLang || globalLang;
    const [isListening, setIsListening] = useState<boolean>(false);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
    const [voiceProgress, setVoiceProgress] = useState<number>(0);
    const [voiceApiSupported, setVoiceApiSupported] = useState<boolean>(true);
    const [voiceApiError, setVoiceApiError] = useState<string | null>(null);
    const [isScriptFinished, setIsScriptFinished] = useState<boolean>(false);
    const [sessionSummary, setSessionSummary] = useState<any | null>(null);

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

    // --- NEW: INITIALIZATION CONTROL ---
    const isInitializingRef = useRef<boolean>(false);
    const hasFirstRecognitionRef = useRef<boolean>(false);
    const initStartTimeRef = useRef<number>(0);

    // --- NEW: SENTENCE COMPLETION DETECTION ---
    const lastSpeechTimeRef = useRef<number>(0);
    const sentenceCompletionTimerRef = useRef<NodeJS.Timeout | null>(null);

    // --- NEW: PERFORMANCE METRICS ---
    const performanceMetricsRef = useRef({
        processingTimes: [] as number[],
        averageProcessTime: 0,
        currentThrottle: VOICE_CONFIG.THROTTLE_MS,
        lastLogTime: 0,
    });

    // --- NEW: FUZZY SYNC STATE ---
    const consecutivePartialMatchesRef = useRef<number>(0);

    // --- NEW: SPEECH VELOCITY TRACKING ---
    const speechVelocityRef = useRef({
        wordTimestamps: [] as Array<{ time: number; wordCount: number }>,
        currentWPM: VOICE_CONFIG.SPEECH_VELOCITY.baselineWPM,
        adaptedLerpFactor: VOICE_CONFIG.SCROLL_LERP_FACTOR,
    });

    // --- NEW: CONFIDENCE LEARNING ---
    const confidenceLearningRef = useRef({
        matchHistory: [] as number[], // Array of match ratios
        sessionStartTime: 0,
        goodMatchCount: 0,
        totalMatchCount: 0,
        currentAccuracy: 1.0,
        isInWarmup: true,
        adaptedThresholds: {
            fuzzyTolerance: VOICE_CONFIG.FUZZY_SYNC.intraSentenceTolerance,
            minConfidence: 0.70,
        }
    });

    // --- NEW: NOISE DETECTION ---
    const noiseDetectionRef = useRef({
        isCalibrating: false,
        calibrationStartTime: 0,
        shortRecognitionCount: 0,
        isNoisyEnvironment: false,
        adjustedMinLength: 6, // Base minLength
    });

    // --- NEW: SESSION ANALYTICS ---
    const sessionAnalyticsRef = useRef({
        sessionStartTime: 0,
        sessionEndTime: 0,
        totalWordsRecognized: 0,
        sentencesCompleted: 0,
        sentenceStartTimes: new Map<number, number>(), // sentence ID -> start time
        goodMatches: 0,
        totalMatches: 0,
    });

    // --- NEW: AUTO MODES ---
    const autoModeConfigRef = useRef({
        currentMode: 'normal' as 'normal' | 'musician' | 'bilingual',
        appliedPreset: VOICE_CONFIG.AUTO_MODES.presets.normal,
    });

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

            // Clear sentence completion timer
            if (sentenceCompletionTimerRef.current) {
                clearInterval(sentenceCompletionTimerRef.current);
                sentenceCompletionTimerRef.current = null;
            }

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

    // --- HELPER FUNCTIONS ---

    /**
     * Update performance metrics and calculate adaptive throttle
     */
    const updatePerformanceMetrics = useCallback((processingTime: number) => {
        if (!VOICE_CONFIG.METRICS.enabled) return;

        const metrics = performanceMetricsRef.current;

        // Track processing time
        metrics.processingTimes.push(processingTime);
        if (metrics.processingTimes.length > VOICE_CONFIG.METRICS.sampleSize) {
            metrics.processingTimes.shift();
        }

        // Calculate average
        metrics.averageProcessTime =
            metrics.processingTimes.reduce((a, b) => a + b, 0) / metrics.processingTimes.length;

        // Adaptive throttle calculation
        if (VOICE_CONFIG.ADAPTIVE_THROTTLE.enabled && metrics.processingTimes.length >= 10) {
            const { minThrottle, maxThrottle, targetProcessTime, adaptationRate } = VOICE_CONFIG.ADAPTIVE_THROTTLE;
            const ratio = metrics.averageProcessTime / targetProcessTime;
            const targetThrottle = VOICE_CONFIG.THROTTLE_MS * ratio;
            const clampedThrottle = Math.max(minThrottle, Math.min(maxThrottle, targetThrottle));

            // Smooth adaptation
            metrics.currentThrottle =
                metrics.currentThrottle * (1 - adaptationRate) +
                clampedThrottle * adaptationRate;
        }

        // Log metrics periodically
        const now = Date.now();
        if (VOICE_CONFIG.METRICS.logInterval > 0 &&
            now - metrics.lastLogTime >= VOICE_CONFIG.METRICS.logInterval) {
            console.log('[Voice Metrics]', {
                avgProcessTime: metrics.averageProcessTime.toFixed(2) + 'ms',
                currentThrottle: metrics.currentThrottle.toFixed(0) + 'ms',
                samples: metrics.processingTimes.length
            });
            metrics.lastLogTime = now;
        }
    }, []);

    /**
     * Check for sentence completion and auto-advance
     */
    const checkSentenceCompletion = useCallback(() => {
        if (!VOICE_CONFIG.SENTENCE_COMPLETION.enabled || !VOICE_CONFIG.SENTENCE_COMPLETION.autoAdvance) {
            return;
        }

        const now = Date.now();
        const timeSinceLastSpeech = now - lastSpeechTimeRef.current;

        // Check if we should auto-advance
        if (
            voiceProgress >= VOICE_CONFIG.SENTENCE_COMPLETION.minProgress &&
            timeSinceLastSpeech >= VOICE_CONFIG.SENTENCE_COMPLETION.pauseTimeout &&
            lockedSentenceIdRef.current >= 0
        ) {
            const nextSentenceId = lockedSentenceIdRef.current + 1;
            if (nextSentenceId < sentences.length) {
                console.log('[Voice] Auto-advancing to next sentence after pause');
                lockedSentenceIdRef.current = nextSentenceId;
                setActiveSentenceIndex(nextSentenceId);
                setVoiceProgress(0);
                smoothedProgressRef.current = 0;

                // Update match index to new sentence start
                if (sentences[nextSentenceId]) {
                    lastMatchIndexRef.current = sentences[nextSentenceId].startIndex ?? 0;
                }

                // Reset speech timer
                lastSpeechTimeRef.current = now;
            } else if (nextSentenceId === sentences.length && !isScriptFinished) {
                // LAST SENTENCE COMPLETED!
                console.log('[Voice] Script finished!');
                setIsScriptFinished(true);

                // Immediately stop listening as script is done
                stopListening();
            }
        }
    }, [voiceProgress, sentences, isScriptFinished]);

    /**
     * Start sentence completion checker
     */
    const startSentenceCompletionChecker = useCallback(() => {
        if (!VOICE_CONFIG.SENTENCE_COMPLETION.enabled) return;

        // Clear existing timer
        if (sentenceCompletionTimerRef.current) {
            clearInterval(sentenceCompletionTimerRef.current);
        }

        // Start new timer
        sentenceCompletionTimerRef.current = setInterval(
            checkSentenceCompletion,
            VOICE_CONFIG.SENTENCE_COMPLETION.checkInterval
        );
    }, [checkSentenceCompletion]);

    /**
     * Stop sentence completion checker
     */
    const stopSentenceCompletionChecker = useCallback(() => {
        if (sentenceCompletionTimerRef.current) {
            clearInterval(sentenceCompletionTimerRef.current);
            sentenceCompletionTimerRef.current = null;
        }
    }, []);

    // --- ADVANCED FEATURES HELPERS ---

    /**
     * Detect and apply automatic mode preset
     */
    const applyAutoMode = useCallback(() => {
        if (!VOICE_CONFIG.AUTO_MODES.enabled) return;

        // Detect mode
        let mode: 'normal' | 'musician' | 'bilingual' = 'normal';
        if (isBilingual) mode = 'bilingual';
        else if (isMusicianMode) mode = 'musician';

        autoModeConfigRef.current.currentMode = mode;
        autoModeConfigRef.current.appliedPreset = VOICE_CONFIG.AUTO_MODES.presets[mode];

        console.log(`[Voice] Auto-mode: ${mode} preset applied`);
    }, [isMusicianMode, isBilingual]);

    /**
     * Calculate speech velocity and adapt lerp factor
     */
    const updateSpeechVelocity = useCallback((wordCount: number) => {
        if (!VOICE_CONFIG.SPEECH_VELOCITY.enabled) return;

        const now = Date.now();
        const velocity = speechVelocityRef.current;

        // Add timestamp
        velocity.wordTimestamps.push({ time: now, wordCount });

        // Keep only last window
        const cutoffTime = now - VOICE_CONFIG.SPEECH_VELOCITY.measurementWindow;
        velocity.wordTimestamps = velocity.wordTimestamps.filter(t => t.time >= cutoffTime);

        // Calculate WPM
        if (velocity.wordTimestamps.length >= 2) {
            const first = velocity.wordTimestamps[0];
            const last = velocity.wordTimestamps[velocity.wordTimestamps.length - 1];
            const duration = (last.time - first.time) / 1000 / 60; // minutes
            const totalWords = last.wordCount - first.wordCount;

            if (duration > 0) {
                velocity.currentWPM = totalWords / duration;

                // Adapt lerp factor
                if (VOICE_CONFIG.SPEECH_VELOCITY.adaptLerpFactor) {
                    const { minWordsPerMinute, maxWordsPerMinute, lerpMin, lerpMax } = VOICE_CONFIG.SPEECH_VELOCITY;
                    const ratio = (velocity.currentWPM - minWordsPerMinute) / (maxWordsPerMinute - minWordsPerMinute);
                    const clampedRatio = Math.max(0, Math.min(1, ratio));
                    velocity.adaptedLerpFactor = lerpMin + (lerpMax - lerpMin) * clampedRatio;
                }
            }
        }
    }, []);

    /**
     * Update confidence learning based on match quality
     */
    const updateConfidenceLearning = useCallback((matchRatio: number) => {
        if (!VOICE_CONFIG.CONFIDENCE_LEARNING.enabled) return;

        const learning = confidenceLearningRef.current;

        // Add to history
        learning.matchHistory.push(matchRatio);
        if (learning.matchHistory.length > VOICE_CONFIG.CONFIDENCE_LEARNING.historySize) {
            learning.matchHistory.shift();
        }

        learning.totalMatchCount++;

        // Good match = low ratio (high similarity)
        const isGoodMatch = matchRatio <= 0.3; // 70%+ similarity
        if (isGoodMatch) learning.goodMatchCount++;

        // Calculate accuracy
        learning.currentAccuracy = learning.goodMatchCount / learning.totalMatchCount;

        // Check warmup period
        const timeSinceStart = Date.now() - learning.sessionStartTime;
        learning.isInWarmup = timeSinceStart < VOICE_CONFIG.CONFIDENCE_LEARNING.warmupPeriod;

        // Adapt thresholds based on performance
        if (!learning.isInWarmup && learning.matchHistory.length >= 20) {
            const { goodMatchThreshold, poorMatchThreshold, adaptiveAdjustment } = VOICE_CONFIG.CONFIDENCE_LEARNING;

            if (learning.currentAccuracy >= goodMatchThreshold) {
                // Good history - relax requirements
                learning.adaptedThresholds.fuzzyTolerance =
                    VOICE_CONFIG.FUZZY_SYNC.intraSentenceTolerance + adaptiveAdjustment;
                learning.adaptedThresholds.minConfidence = 0.70 - adaptiveAdjustment;
            } else if (learning.currentAccuracy <= poorMatchThreshold) {
                // Poor history - stricter requirements
                learning.adaptedThresholds.fuzzyTolerance =
                    VOICE_CONFIG.FUZZY_SYNC.intraSentenceTolerance - adaptiveAdjustment;
                learning.adaptedThresholds.minConfidence = 0.70 + adaptiveAdjustment;
            }
        }
    }, []);

    /**
     * Perform noise calibration
     */
    const performNoiseCalibration = useCallback((transcriptLength: number) => {
        if (!VOICE_CONFIG.NOISE_DETECTION.enabled) return;

        const noise = noiseDetectionRef.current;

        // Check if in calibration period
        const timeSinceStart = Date.now() - noise.calibrationStartTime;
        noise.isCalibrating = timeSinceStart < VOICE_CONFIG.NOISE_DETECTION.calibrationTime;

        if (noise.isCalibrating && transcriptLength < 4) {
            noise.shortRecognitionCount++;

            // Detect noisy environment
            const duration = timeSinceStart / 1000; // seconds
            const recognitionsPerSecond = noise.shortRecognitionCount / Math.max(duration, 1);

            if (recognitionsPerSecond > VOICE_CONFIG.NOISE_DETECTION.maxRecognitionsPerSecond) {
                noise.isNoisyEnvironment = true;
                noise.adjustedMinLength = 6 + VOICE_CONFIG.NOISE_DETECTION.noisyEnvironmentBonus;
                console.log(`[Voice] Noisy environment detected, adjusting minLength to ${noise.adjustedMinLength}`);
            }
        }
    }, []);

    /**
     * Track session analytics
     */
    const trackSessionMetrics = useCallback((sentenceCompleted: boolean = false, wordCount: number = 0) => {
        if (!VOICE_CONFIG.SESSION_ANALYTICS.enabled) return;

        const analytics = sessionAnalyticsRef.current;

        if (wordCount > 0) {
            analytics.totalWordsRecognized += wordCount;
        }

        if (sentenceCompleted) {
            analytics.sentencesCompleted++;
        }
    }, []);

    /**
     * Generate session summary
     */
    const generateSessionSummary = useCallback(() => {
        if (!VOICE_CONFIG.SESSION_ANALYTICS.enabled) return null;

        const analytics = sessionAnalyticsRef.current;
        analytics.sessionEndTime = Date.now();

        const duration = (analytics.sessionEndTime - analytics.sessionStartTime) / 1000; // seconds
        const averageWPM = duration > 0 ? (analytics.totalWordsRecognized / duration) * 60 : 0;
        const accuracy = analytics.totalMatches > 0 ? analytics.goodMatches / analytics.totalMatches : 1;

        // ACCIDENTAL TOGGLE PREVENTION: Only return summary if user actually spoke or progressed
        if (analytics.totalWordsRecognized < 3 && analytics.totalMatches === 0) {
            return null;
        }

        const summary = {
            duration: Math.round(duration),
            averageWPM: Math.round(averageWPM),
            accuracy: Math.round(accuracy * 100),
            sentencesCompleted: analytics.sentencesCompleted,
        };

        if (VOICE_CONFIG.SESSION_ANALYTICS.logSummaryOnEnd) {
            console.log('[Voice Session Summary]', {
                duration: `${Math.floor(summary.duration / 60)}m ${summary.duration % 60}s`,
                avgWPM: summary.averageWPM,
                accuracy: `${summary.accuracy}%`,
                sentences: summary.sentencesCompleted,
            });
        }

        return summary;
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

            // Update speech timestamp for sentence completion detection
            lastSpeechTimeRef.current = Date.now();

            // ADAPTIVE THROTTLING: Use dynamic throttle based on device performance
            const now = Date.now();
            const isFinal = event.results[event.resultIndex]?.isFinal;
            const currentThrottle = performanceMetricsRef.current.currentThrottle;

            if (!isFinal && (now - lastProcessedTimeRef.current) < currentThrottle) {
                return; // Skip this interim result
            }

            // Start performance measurement
            const processStart = performance.now();
            lastProcessedTimeRef.current = now;

            // --- NOISE CALIBRATION ---
            performNoiseCalibration(cleanTranscript.length);

            // Use adjusted minLength from noise detection
            const effectiveMinLength = VOICE_CONFIG.NOISE_DETECTION.enabled
                ? noiseDetectionRef.current.adjustedMinLength
                : 6;

            if (cleanTranscript.length < effectiveMinLength) {
                return;
            }

            // --- SPEECH VELOCITY TRACKING ---
            // Count words in transcript
            const wordCount = cleanTranscript.split(/\s+/).filter(w => w.length > 0).length;
            if (wordCount > 0) {
                updateSpeechVelocity(wordCount);
                trackSessionMetrics(false, wordCount);
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
                    } else if (isForwardJump) {
                        // NEVER allow forward jumps from fallback - too dangerous
                        console.warn(`[Voice] Fallback BLOCKED: Forward jump rejected (too risky)`);
                    } else {
                        console.warn(`[Voice] Fallback rejected: Sentence dist ${sentenceDistance}, Ratio ${fallbackMatch.ratio.toFixed(3)}`);
                    }
                }
            }

            if (match) {
                // --- CONFIDENCE LEARNING ---
                updateConfidenceLearning(match.ratio);

                // Track match for analytics
                if (VOICE_CONFIG.SESSION_ANALYTICS.enabled) {
                    sessionAnalyticsRef.current.totalMatches++;
                    if (match.ratio <= 0.3) { // Good match
                        sessionAnalyticsRef.current.goodMatches++;
                    }
                }

                // SEQUENTIAL VALIDATION: Prevent implausible large jumps
                const newSentenceId = charToSentenceMap[match.index] || 0;
                const currentSentenceId = lockedSentenceIdRef.current;
                const jumpDistance = Math.abs(newSentenceId - currentSentenceId);
                const isSameSentence = newSentenceId === currentSentenceId;

                // --- FUZZY SYNC: Allow partial matches within same sentence ---
                const isPartialMatch = match.ratio > 0.4; // Lower confidence match

                // Use adapted tolerance from confidence learning
                const effectiveFuzzyTolerance = VOICE_CONFIG.CONFIDENCE_LEARNING.enabled
                    ? confidenceLearningRef.current.adaptedThresholds.fuzzyTolerance
                    : VOICE_CONFIG.FUZZY_SYNC.intraSentenceTolerance;

                if (VOICE_CONFIG.FUZZY_SYNC.enabled && isSameSentence && isPartialMatch) {
                    // Within same sentence, be more tolerant
                    const acceptableRatio = effectiveFuzzyTolerance;

                    if (match.ratio <= acceptableRatio) {
                        // Accept partial match - update progress with boost
                        consecutivePartialMatchesRef.current++;
                        console.log(`[Voice] Fuzzy sync: Partial match accepted (${(match.ratio * 100).toFixed(0)}% error, ${consecutivePartialMatchesRef.current} consecutive)`);

                        // Continue to progress update below
                        // Don't return - allow smooth progress
                    } else {
                        // Too poor match even for fuzzy sync
                        if (consecutivePartialMatchesRef.current < 3) {
                            // Small grace period - maybe user is just mumbling
                            consecutivePartialMatchesRef.current++;
                            return; // Skip this one
                        }
                        // Been too many bad matches - might be off track
                        console.warn(`[Voice] Fuzzy sync limit: Too many poor matches, ratio ${match.ratio.toFixed(3)}`);
                        return;
                    }
                } else {
                    // Good match or different sentence - reset partial counter
                    consecutivePartialMatchesRef.current = 0;
                }

                // STRICTER VALIDATION for cross-sentence jumps
                if (!isSameSentence) {
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
                        // DON'T RETURN - allow progress update below
                    } else {
                        // Same pending sentence - increment counter
                        pendingMatchRef.current.count++;
                        if (pendingMatchRef.current.count < VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES) {
                            console.log(`[Voice] Sentence confirming: ${pendingMatchRef.current.count}/${VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES}`);
                            // DON'T RETURN - allow progress update below
                        } else {
                            // CONFIRMED! Lock to new sentence
                            lockedSentenceIdRef.current = newSentenceId;
                            pendingMatchRef.current = null;

                            // Track sentence completion for analytics
                            trackSessionMetrics(true, 0);
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

                    // --- INITIALIZATION CONTROL: First Recognition Detection ---
                    if (isInitializingRef.current && !hasFirstRecognitionRef.current) {
                        const timeSinceInit = Date.now() - initStartTimeRef.current;
                        const hasGracePeriodPassed = timeSinceInit >= VOICE_CONFIG.INITIALIZATION.initialGracePeriod;
                        const isConfidentMatch = match.ratio <= (1 - VOICE_CONFIG.INITIALIZATION.minConfidenceForInit);

                        if (hasGracePeriodPassed && isConfidentMatch) {
                            // First valid recognition! Now activate scrolling
                            hasFirstRecognitionRef.current = true;
                            isInitializingRef.current = false;
                            console.log('[Voice] First recognition detected - activating scroll', {
                                confidence: ((1 - match.ratio) * 100).toFixed(0) + '%',
                                delay: timeSinceInit + 'ms'
                            });

                            // Now we can set the active sentence to trigger scroll
                            setActiveSentenceIndex(lockedSentenceIdRef.current);
                        } else {
                            // Still initializing - don't update active sentence yet
                            if (!hasGracePeriodPassed) {
                                console.log('[Voice] Initializing: Grace period not passed yet');
                            } else if (!isConfidentMatch) {
                                console.log('[Voice] Initializing: Low confidence match, waiting for better');
                            }
                            // Continue processing for progress updates, but don't scroll
                        }
                    }

                    // Only update active sentence if it's confirmed (locked) AND not initializing
                    if (!isInitializingRef.current && lockedSentenceIdRef.current !== activeSentenceIndex && lockedSentenceIdRef.current >= 0) {
                        setActiveSentenceIndex(lockedSentenceIdRef.current);
                    }
                }
            }

            // Measure processing time for adaptive throttle
            const processEnd = performance.now();
            const processingTime = processEnd - processStart;
            updatePerformanceMetrics(processingTime);
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch (e) {
            logger.error("Voice start error", { error: e as Error });
        }
    }, [lang, activeSentenceIndex, updatePerformanceMetrics]); // Dependencies for startRecognitionInstance

    // Helper: Find which sentence is currently visible on screen
    // Returns index and the estimated progress within that sentence (0-1) based on scroll position
    const findVisibleSentenceId = useCallback((targetVisualRatio: number = VOICE_CONFIG.LOOKAHEAD_POSITION): { index: number; progress: number } => {
        if (typeof window === 'undefined' || sentences.length === 0) return { index: 0, progress: 0 };

        try {
            // Get scroll container
            // CRITICAL FIX: Use the persistent class '.prompter-scroll-area' because '.voice-control-smooth'
            // is only added AFTER isVoiceMode becomes true. During the toggle (startListening), the class isn't there yet.
            const container = document.querySelector('.prompter-scroll-area') as HTMLElement;
            if (!container) {
                // Return current active index if container not found, better than resetting to 0
                return { index: activeSentenceIndex >= 0 ? activeSentenceIndex : 0, progress: 0 };
            }

            const scrollTop = container.scrollTop || 0;

            // Calculate DOM Target Ratio based on Visual Target Ratio
            // UNIFIED COORDINATES:
            // Standard: DOM = Visual
            // Flipped: DOM = Visual (because scaleY(-1) flips the view, so we still want the "Start" of content at the "Start" of DOM)
            // effectiveRatio is simply the targetVisualRatio passed in.
            const effectiveRatio = targetVisualRatio;

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

        // --- INITIALIZATION CONTROL ---
        // Set initialization flags to prevent premature scrolling
        isInitializingRef.current = VOICE_CONFIG.INITIALIZATION.waitForFirstRecognition;
        hasFirstRecognitionRef.current = false;
        initStartTimeRef.current = Date.now();

        // RESET SESSION STATE
        setIsScriptFinished(false);
        setSessionSummary(null);

        // Initialize to visible sentence.
        // CRITICAL: We use 0.5 (CENTER) as the search target because normally users are reading
        // at the center of the screen when they activate Voice.
        const { index: visibleSentence } = findVisibleSentenceId(0.5);
        lockedSentenceIdRef.current = visibleSentence;

        // DON'T set active sentence index immediately if waiting for first recognition
        // This prevents the scroll animation before speech is detected
        if (!VOICE_CONFIG.INITIALIZATION.waitForFirstRecognition) {
            setActiveSentenceIndex(visibleSentence);
        }

        // CRITICAL FIX: Sync match index to the visible sentence's start
        // This ensures matching resumes from the correct position instead of 0
        if (sentences[visibleSentence]) {
            lastMatchIndexRef.current = sentences[visibleSentence].startIndex ?? 0;
        } else {
            lastMatchIndexRef.current = 0;
        }

        // VISIBILITY FIX: Always reset progress to 0 (Start of Sentence) when activating.
        smoothedProgressRef.current = 0;
        setVoiceProgress(0);

        // Reset speech timer
        lastSpeechTimeRef.current = Date.now();

        // --- ADVANCED FEATURES INITIALIZATION ---

        // Apply automatic mode preset
        applyAutoMode();

        // Start noise calibration
        if (VOICE_CONFIG.NOISE_DETECTION.enabled) {
            noiseDetectionRef.current.isCalibrating = true;
            noiseDetectionRef.current.calibrationStartTime = Date.now();
            noiseDetectionRef.current.shortRecognitionCount = 0;
            noiseDetectionRef.current.isNoisyEnvironment = false;
            noiseDetectionRef.current.adjustedMinLength = 6;
        }

        // Initialize session analytics
        if (VOICE_CONFIG.SESSION_ANALYTICS.enabled) {
            const now = Date.now();
            sessionAnalyticsRef.current.sessionStartTime = now;
            sessionAnalyticsRef.current.sessionEndTime = 0;
            sessionAnalyticsRef.current.totalWordsRecognized = 0;
            sessionAnalyticsRef.current.sentencesCompleted = 0;
            sessionAnalyticsRef.current.sentenceStartTimes.clear();
            sessionAnalyticsRef.current.goodMatches = 0;
            sessionAnalyticsRef.current.totalMatches = 0;
        }

        // Initialize confidence learning
        if (VOICE_CONFIG.CONFIDENCE_LEARNING.enabled) {
            confidenceLearningRef.current.sessionStartTime = Date.now();
            confidenceLearningRef.current.matchHistory = [];
            confidenceLearningRef.current.goodMatchCount = 0;
            confidenceLearningRef.current.totalMatchCount = 0;
            confidenceLearningRef.current.currentAccuracy = 1.0;
            confidenceLearningRef.current.isInWarmup = true;
        }

        // Initialize speech velocity tracking
        if (VOICE_CONFIG.SPEECH_VELOCITY.enabled) {
            speechVelocityRef.current.wordTimestamps = [];
            speechVelocityRef.current.currentWPM = VOICE_CONFIG.SPEECH_VELOCITY.baselineWPM;
            speechVelocityRef.current.adaptedLerpFactor = VOICE_CONFIG.SCROLL_LERP_FACTOR;
        }

        intentionallyStoppedRef.current = false;
        startRecognitionInstance();

        // Start sentence completion checker
        startSentenceCompletionChecker();
    }, [isPro, isListening, voiceApiSupported, startRecognitionInstance, findVisibleSentenceId, sentences, startSentenceCompletionChecker, applyAutoMode]);

    const stopListening = useCallback(() => {
        intentionallyStoppedRef.current = true;
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) { /* ignore */ }
        }
        setIsListening(false);

        // Stop sentence completion checker
        stopSentenceCompletionChecker();

        // Generate and log session summary
        const summary = generateSessionSummary();
        if (summary) setSessionSummary(summary);

        // Reset active sentence to trigger initialization flow on next start
        // This ensures the "wait for first recognition" behavior works on reactivation
        setActiveSentenceIndex(-1);

        // DON'T reset locked sentence here - allows resume from same position
    }, [stopSentenceCompletionChecker, generateSessionSummary, setSessionSummary]);

    const resetVoice = useCallback(() => {
        stopListening();
        lastMatchIndexRef.current = 0;
        lockedSentenceIdRef.current = 0; // Reset to first sentence (not -1)
        pendingMatchRef.current = null; // Clear pending match
        smoothedProgressRef.current = 0; // Reset smoothed progress
        setVoiceProgress(0);
        setActiveSentenceIndex(0); // Start at first sentence
        setIsScriptFinished(false);
        setSessionSummary(null);
    }, [stopListening, setIsScriptFinished, setSessionSummary]);


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

        // Advanced features exports
        speechVelocity: speechVelocityRef.current.currentWPM,
        currentMode: autoModeConfigRef.current.currentMode,
        isCalibrating: noiseDetectionRef.current.isCalibrating,
        adaptedLerpFactor: speechVelocityRef.current.adaptedLerpFactor,

        // Script finish & analytics
        isScriptFinished,
        sessionSummary,
        setIsScriptFinished,
    };
};
