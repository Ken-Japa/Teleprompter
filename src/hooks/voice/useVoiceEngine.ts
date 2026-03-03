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
    onFinalSpeechResult
}: UseVoiceEngineProps) => {

    // --- 1. INITIALIZE SUB-ENGINES ---
    const metrics = useVoiceMetrics();
    const analytics = useVoiceAnalytics(sentences);
    const matchEngine = useVoiceMatchEngine({
        fullCleanText,
        fullCleanTextBuffer,
        charToSentenceMap,
        lang
    });

    // --- 2. CORE PROCESSING PIPELINE ---
    const processTranscript = useCallback((transcript: string, isFinal: boolean) => {
        const processStart = performance.now();

        // 1. Environmental & Performance Calibration
        metrics.performNoiseCalibration(transcript.length);

        // 2. Match Engine Execution
        const match = matchEngine.performMatch(
            transcript,
            isFinal,
            metrics.speechVelocity.currentWPM
        );

        // 3. Post-Match Logic & Feedback
        if (match) {
            // Metrics (Speech Velocity) - wordCount is now provided by the worker
            const wordCount = (match as any).wordCount || 0;
            if (wordCount > 0) {
                metrics.updateSpeechVelocity(wordCount);
                if (isFinal) {
                    analytics.trackSessionMetrics(false, wordCount);
                }
            }

            // wordCount NOT passed here — already in trackSessionMetrics (prevents double-count)
            analytics.trackMatchQuality(match.ratio);
            metrics.updatePerformanceMetrics(performance.now() - processStart);
            metrics.updateConfidenceLearning(match.ratio);

            const sentenceId = charToSentenceMap[match.index] !== undefined ? charToSentenceMap[match.index] : 0;
            voiceDiagnostics.recordMatch({
                sentenceId,
                transcript,
                matchRatio: match.ratio,
                processingTime: performance.now() - processStart,
                wasJump: false
            });

            if (onSpeechResult) onSpeechResult(transcript);
            if (isFinal && onFinalSpeechResult) onFinalSpeechResult(transcript);
        } else if (isFinal) {
            voiceDiagnostics.recordMiss({
                transcript,
                reason: "Busca sem correspondência com o texto"
            });
        }

        return match;
    }, [
        metrics,
        analytics,
        matchEngine,
        onSpeechResult,
        onFinalSpeechResult
    ]);

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
