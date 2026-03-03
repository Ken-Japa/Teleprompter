import { useCallback, useMemo } from "react";
import { Sentence } from "../../types";
import { useVoiceMetrics } from "./useVoiceMetrics";
import { useVoiceAnalytics } from "./useVoiceAnalytics";
import { useVoiceMatchEngine } from "./useVoiceMatchEngine";
import { voiceDiagnostics } from "../../utils/voiceDiagnostics";

interface UseVoiceEngineProps {
    sentences: Sentence[];
    fullCleanText: string;
    fullCleanTextBuffer: Uint16Array;
    charToSentenceMap: Int32Array;
    lang: string;
    onSpeechResult?: (transcript: string) => void;
    onFinalSpeechResult?: (transcript: string) => void;
}

/**
 * Hook responsible for orchestrating the entire processing engine:
 * - Metrics & Telemetry (useVoiceMetrics)
 * - Session Analytics (useVoiceAnalytics)
 * - Match Engine (useVoiceMatchEngine)
 * - Processing Pipeline
 */
export const useVoiceEngine = ({
    sentences,
    fullCleanText,
    fullCleanTextBuffer,
    charToSentenceMap,
    lang,
    onSpeechResult,
    onFinalSpeechResult,
    onMatchResult // New prop: callback to sync with UI
}: UseVoiceEngineProps & { onMatchResult?: (match: any, transcript: string) => void }) => {

    // --- 1. INITIALIZE SUB-ENGINES ---
    const metrics = useVoiceMetrics();
    const analytics = useVoiceAnalytics(sentences);

    // Internal handler to process results when they arrive from worker
    const handleMatchResult = useCallback((match: any, transcript: string) => {
        const processEnd = performance.now();

        // 1. wordCount is provided by the worker
        const wordCount = match.wordCount || 0;
        if (wordCount > 0) {
            metrics.updateSpeechVelocity(wordCount);
            // Note: isFinal context is lost here, but we can infer or pass it if needed.
            // For now, trackSessionMetrics will be handled in processTranscript if possible,
            // or we just track it here for simplicity.
            analytics.trackSessionMetrics(false, wordCount);
        }

        analytics.trackMatchQuality(match.ratio);
        metrics.updatePerformanceMetrics(processEnd - (match as any).processStart || 0); // We'd need to track start time
        metrics.updateConfidenceLearning(match.ratio);

        const sentenceId = charToSentenceMap[match.index] !== undefined ? charToSentenceMap[match.index] : 0;
        voiceDiagnostics.recordMatch({
            sentenceId,
            transcript,
            matchRatio: match.ratio,
            processingTime: 0, // Approximate
            wasJump: false
        });

        if (onSpeechResult) onSpeechResult(transcript);
        if (onMatchResult) onMatchResult(match, transcript);
    }, [metrics, analytics, charToSentenceMap, onSpeechResult, onMatchResult]);

    const matchEngine = useVoiceMatchEngine({
        fullCleanText,
        fullCleanTextBuffer,
        charToSentenceMap,
        lang,
        onMatch: handleMatchResult
    });

    // --- 2. CORE PROCESSING PIPELINE ---
    const processTranscript = useCallback((transcript: string, isFinal: boolean) => {
        // 1. Environmental & Performance Calibration
        metrics.performNoiseCalibration(transcript.length);

        // 2. Match Engine Execution (Async)
        matchEngine.performMatch(
            transcript,
            isFinal,
            metrics.speechVelocity.currentWPM
        );

        if (isFinal && onFinalSpeechResult) {
            onFinalSpeechResult(transcript);
        }
    }, [metrics, matchEngine, onFinalSpeechResult]);

    // --- 3. EXPOSED ENGINE API ---
    return useMemo(() => ({
        processTranscript,

        // Expose necessary sub-engine states
        metrics,
        analytics,
        matchEngine,

        // Life Cycle Methods
        resetEngine: (startIndex: number = 0) => {
            matchEngine.resetEngine(startIndex);
            // Optional: reset metrics/analytics if needed for new session
        },

        startEngineSession: () => {
            analytics.startAnalyticsSession();
            metrics.startSession();
        },

        stopEngineSession: () => {
            analytics.stopAnalyticsSession();
        }
    }), [processTranscript, metrics, analytics, matchEngine]);
};
