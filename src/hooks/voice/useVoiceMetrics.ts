import { useRef, useCallback, useMemo } from "react";
import { getAdaptiveConfig } from "../../config/voiceControlConfig";
import { useVoiceStore, VoiceStoreState } from "../../store/useVoiceStore";

/**
 * Hook responsible for performance tracking and telemetry.
 * Handles:
 * - Adaptive Throttling (EMA of processing times)
 * - Speech Velocity (WPM)
 * - Noise Detection (Environmental Calibration)
 * - Confidence Learning (Threshold adaptation)
 */
export const useVoiceMetrics = () => {
    const VOICE_CONFIG = useMemo(() => getAdaptiveConfig(), []);
    const setAdaptedLerpFactor = useVoiceStore((s: VoiceStoreState) => s.setAdaptedLerpFactor);

    // --- PERFORMANCE METRICS ---
    const performanceMetricsRef = useRef({
        processingTimes: [] as number[],
        avgProcessingTime: 0,
        currentThrottle: VOICE_CONFIG.ADAPTIVE_THROTTLE.minThrottle,
        lastLogTime: 0,
    });

    // --- SPEECH VELOCITY TRACKING ---
    const speechVelocityRef = useRef({
        wordTimestamps: [] as Array<{ time: number; wordCount: number }>,
        currentWPM: VOICE_CONFIG.SPEECH_VELOCITY.baselineWPM,
        adaptedLerpFactor: VOICE_CONFIG.SCROLL_LERP_FACTOR,
    });

    // --- CONFIDENCE LEARNING ---
    const confidenceLearningRef = useRef({
        matchHistory: [] as number[],
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

    // --- NOISE DETECTION ---
    const noiseDetectionRef = useRef({
        isCalibrating: false,
        calibrationStartTime: 0,
        shortRecognitionCount: 0,
        isNoisyEnvironment: false,
        adjustedMinLength: 6,
    });

    /**
     * Update performance metrics and calculate adaptive throttle
     */
    const updatePerformanceMetrics = useCallback((processingTime: number) => {
        const throttleConfig = VOICE_CONFIG.ADAPTIVE_THROTTLE;
        if (!throttleConfig.enabled) return;

        const metrics = performanceMetricsRef.current;
        metrics.processingTimes.push(processingTime);
        if (metrics.processingTimes.length > VOICE_CONFIG.METRICS.sampleSize) {
            metrics.processingTimes.shift();
        }

        const alpha = throttleConfig.emaAlpha;
        metrics.avgProcessingTime = (metrics.avgProcessingTime * (1 - alpha)) + (processingTime * alpha);

        const targetThrottle = metrics.avgProcessingTime * throttleConfig.throttleMultiplier;
        const maxAllowedThrottle = 80;
        const newThrottle = Math.max(
            throttleConfig.minThrottle,
            Math.min(maxAllowedThrottle, targetThrottle)
        );

        if (Math.abs(newThrottle - metrics.currentThrottle) > 10) {
            metrics.currentThrottle = newThrottle;
        }

        const now = Date.now();
        if (VOICE_CONFIG.METRICS.logInterval > 0 && now - metrics.lastLogTime >= VOICE_CONFIG.METRICS.logInterval) {
            console.log('[Voice Metrics]', {
                currentThrottle: metrics.currentThrottle.toFixed(0) + 'ms',
                samples: metrics.processingTimes.length
            });
            metrics.lastLogTime = now;
        }
    }, [VOICE_CONFIG]);

    /**
     * Calculate speech velocity and adapt lerp factor
     */
    const updateSpeechVelocity = useCallback((wordCount: number) => {
        if (!VOICE_CONFIG.SPEECH_VELOCITY.enabled) return;

        const now = Date.now();
        const velocity = speechVelocityRef.current;
        velocity.wordTimestamps.push({ time: now, wordCount });

        const cutoffTime = now - VOICE_CONFIG.SPEECH_VELOCITY.measurementWindow;
        velocity.wordTimestamps = velocity.wordTimestamps.filter(t => t.time >= cutoffTime);

        if (velocity.wordTimestamps.length >= 2) {
            const first = velocity.wordTimestamps[0];
            const last = velocity.wordTimestamps[velocity.wordTimestamps.length - 1];
            const duration = (last.time - first.time) / 1000 / 60; // minutes
            const totalWords = last.wordCount - first.wordCount;

            if (duration > 0) {
                velocity.currentWPM = totalWords / duration;
                if (VOICE_CONFIG.SPEECH_VELOCITY.adaptLerpFactor) {
                    const { minWordsPerMinute, maxWordsPerMinute, lerpMin, lerpMax } = VOICE_CONFIG.SPEECH_VELOCITY;
                    const ratio = (velocity.currentWPM - minWordsPerMinute) / (maxWordsPerMinute - minWordsPerMinute);
                    const clampedRatio = Math.max(0, Math.min(1, ratio));
                    const newLerpFactor = lerpMin + (lerpMax - lerpMin) * clampedRatio;

                    if (velocity.adaptedLerpFactor !== newLerpFactor) {
                        velocity.adaptedLerpFactor = newLerpFactor;
                        setAdaptedLerpFactor(newLerpFactor);
                    }
                }
            }
        }
    }, [VOICE_CONFIG, setAdaptedLerpFactor]);

    /**
     * Update confidence learning based on match quality
     */
    const updateConfidenceLearning = useCallback((matchRatio: number) => {
        if (!VOICE_CONFIG.CONFIDENCE_LEARNING.enabled) return;

        const learning = confidenceLearningRef.current;
        learning.matchHistory.push(matchRatio);
        if (learning.matchHistory.length > VOICE_CONFIG.CONFIDENCE_LEARNING.historySize) {
            learning.matchHistory.shift();
        }

        learning.totalMatchCount++;
        const isGoodMatch = matchRatio <= 0.3;
        if (isGoodMatch) learning.goodMatchCount++;

        learning.currentAccuracy = learning.goodMatchCount / learning.totalMatchCount;
        const timeSinceStart = Date.now() - learning.sessionStartTime;
        learning.isInWarmup = timeSinceStart < VOICE_CONFIG.CONFIDENCE_LEARNING.warmupPeriod;

        if (!learning.isInWarmup && learning.matchHistory.length >= 20) {
            const { goodMatchThreshold, poorMatchThreshold, adaptiveAdjustment } = VOICE_CONFIG.CONFIDENCE_LEARNING;

            if (learning.currentAccuracy >= goodMatchThreshold) {
                learning.adaptedThresholds.fuzzyTolerance = VOICE_CONFIG.FUZZY_SYNC.intraSentenceTolerance + adaptiveAdjustment;
                learning.adaptedThresholds.minConfidence = 0.70 - adaptiveAdjustment;
            } else if (learning.currentAccuracy <= poorMatchThreshold) {
                learning.adaptedThresholds.fuzzyTolerance = VOICE_CONFIG.FUZZY_SYNC.intraSentenceTolerance - adaptiveAdjustment;
                learning.adaptedThresholds.minConfidence = 0.70 + adaptiveAdjustment;
            }
        }
    }, [VOICE_CONFIG]);

    /**
     * Perform noise calibration
     */
    const performNoiseCalibration = useCallback((transcriptLength: number) => {
        if (!VOICE_CONFIG.NOISE_DETECTION.enabled) return;

        const noise = noiseDetectionRef.current;
        const timeSinceStart = Date.now() - noise.calibrationStartTime;
        noise.isCalibrating = timeSinceStart < VOICE_CONFIG.NOISE_DETECTION.calibrationTime;

        if (noise.isCalibrating && transcriptLength < 4) {
            noise.shortRecognitionCount++;
            const duration = timeSinceStart / 1000;
            const recognitionsPerSecond = noise.shortRecognitionCount / Math.max(duration, 1);

            if (recognitionsPerSecond > VOICE_CONFIG.NOISE_DETECTION.maxRecognitionsPerSecond) {
                noise.isNoisyEnvironment = true;
                noise.adjustedMinLength = 6 + VOICE_CONFIG.NOISE_DETECTION.noisyEnvironmentBonus;
            }
        }
    }, [VOICE_CONFIG]);

    const startSession = useCallback(() => {
        const now = Date.now();
        confidenceLearningRef.current.sessionStartTime = now;
        noiseDetectionRef.current.calibrationStartTime = now;
    }, []);

    return {
        performanceMetrics: performanceMetricsRef.current,
        speechVelocity: speechVelocityRef.current,
        confidenceLearning: confidenceLearningRef.current,
        noiseDetection: noiseDetectionRef.current,
        updatePerformanceMetrics,
        updateSpeechVelocity,
        updateConfidenceLearning,
        performNoiseCalibration,
        startSession,
    };
};
