import { useRef, useCallback, useMemo } from "react";
import { getAdaptiveConfig, updateVoiceProfile } from "../../config/voiceControlConfig";
import { voiceDiagnostics } from "../../utils/voiceDiagnostics";
import { Sentence } from "../../types";
import { useVoiceStore, VoiceStoreState } from "../../store/useVoiceStore";

/**
 * Hook responsible for session analytics and diagnostic reporting.
 */
export const useVoiceAnalytics = (sentences: Sentence[]) => {
    const setSessionSummary = useVoiceStore((s: VoiceStoreState) => s.setSessionSummary);
    // useMemo prevents stale config captures across re-renders
    const VOICE_CONFIG = useMemo(() => getAdaptiveConfig(), []);

    const sessionAnalyticsRef = useRef({
        sessionStartTime: 0,
        sessionEndTime: 0,
        totalWordsRecognized: 0,
        sentencesCompleted: 0,
        sentenceStartTimes: new Map<number, number>(),
        goodMatches: 0,
        totalMatches: 0,
    });

    const trackSessionMetrics = useCallback((sentenceCompleted: boolean = false, wordCount: number = 0) => {
        if (!VOICE_CONFIG.SESSION_ANALYTICS.enabled) return;

        const analytics = sessionAnalyticsRef.current;
        if (wordCount > 0) analytics.totalWordsRecognized += wordCount;
        if (sentenceCompleted) analytics.sentencesCompleted++;
    }, [VOICE_CONFIG.SESSION_ANALYTICS.enabled]);

    const generateSessionSummary = useCallback(() => {
        if (!VOICE_CONFIG.SESSION_ANALYTICS.enabled) return null;

        const analytics = sessionAnalyticsRef.current;
        if (analytics.sessionStartTime === 0) return null;

        analytics.sessionEndTime = Date.now();
        const duration = (analytics.sessionEndTime - analytics.sessionStartTime) / 1000;
        const minutes = duration / 60;
        const averageWPM = minutes > 0 ? (analytics.totalWordsRecognized / minutes) : 0;
        const accuracy = analytics.totalMatches > 0 ? analytics.goodMatches / analytics.totalMatches : 1;

        if (analytics.totalWordsRecognized < 3 && analytics.totalMatches === 0) return null;

        const summary = {
            totalDuration: Math.round(duration),
            averageWpm: Math.round(averageWPM),
            matchRate: accuracy,
            scriptLength: sentences.length,
            wpmHistory: [] as number[],
        };

        if (VOICE_CONFIG.SESSION_ANALYTICS.logSummaryOnEnd) {
            console.log('[Voice Session Summary]', {
                duration: `${Math.floor(summary.totalDuration / 60)}m ${summary.totalDuration % 60}s`,
                avgWPM: summary.averageWpm,
                accuracy: `${Math.round(summary.matchRate * 100)}%`,
                sentences: analytics.sentencesCompleted,
            });
        }

        analytics.sessionStartTime = 0; // Reset

        if (summary.matchRate > 0) {
            updateVoiceProfile({
                averageWPM: summary.averageWpm,
                accuracy: summary.matchRate,
            });
        }

        return summary;
    }, [VOICE_CONFIG.SESSION_ANALYTICS.enabled, VOICE_CONFIG.SESSION_ANALYTICS.logSummaryOnEnd, sentences.length]);

    const startAnalyticsSession = useCallback(() => {
        sessionAnalyticsRef.current.sessionStartTime = Date.now();
        voiceDiagnostics.startSession();
        voiceDiagnostics.setEnabled(true);
    }, []);

    const stopAnalyticsSession = useCallback(() => {
        const analytics = sessionAnalyticsRef.current;
        if (analytics.sessionStartTime === 0) return; // No active session to stop

        const summary = generateSessionSummary();
        if (summary) {
            setSessionSummary(summary);
        }
        const report = voiceDiagnostics.generateReport(sentences);
        voiceDiagnostics.logReport(report);
    }, [generateSessionSummary, sentences, setSessionSummary]);

    /**
     * Track match quality (ratio) only.
     * NOTE: wordCount is intentionally NOT added here — it is already
     * accumulated in trackSessionMetrics to prevent double-counting.
     */
    const trackMatchQuality = useCallback((ratio: number) => {
        const analytics = sessionAnalyticsRef.current;
        analytics.totalMatches++;

        if (ratio >= (VOICE_CONFIG.FUZZY_SYNC?.minPartialMatch || 0.55)) {
            analytics.goodMatches++;
        }
    }, [VOICE_CONFIG.FUZZY_SYNC?.minPartialMatch]);

    return {
        trackSessionMetrics,
        trackMatchQuality,
        startAnalyticsSession,
        stopAnalyticsSession,
        sessionAnalytics: sessionAnalyticsRef.current,
    };
};
