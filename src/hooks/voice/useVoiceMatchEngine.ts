import { useRef, useMemo, useCallback } from "react";
import { getAdaptiveConfig, VOICE_CONFIG as STATIC_CONFIG } from "../../config/voiceControlConfig";
import { useVoiceWorker } from "./useVoiceWorker";

interface MatchEngineProps {
    fullCleanText: string;
    fullCleanTextBuffer: Uint16Array;
    charToSentenceMap: Int32Array;
    lang: string;
}

export const useVoiceMatchEngine = ({
    fullCleanText,
    fullCleanTextBuffer,
    charToSentenceMap,
    lang
}: MatchEngineProps) => {
    const lastMatchIndexRef = useRef<number>(0);
    const lockedSentenceIdRef = useRef<number>(0);
    const failureCountRef = useRef<number>(0);
    const VOICE_CONFIG = useMemo(() => getAdaptiveConfig(), []);

    // Initialize Web Worker
    const worker = useVoiceWorker(fullCleanText, fullCleanTextBuffer);

    const performMatch = useCallback((transcript: string, isFinal: boolean, currentWPM: number = 140) => {
        if (!transcript.trim()) return null;

        // Baseline windows
        const baseSmall = VOICE_CONFIG.SEARCH_WINDOW?.SMALL || 600;
        const baseMedium = VOICE_CONFIG.SEARCH_WINDOW?.MEDIUM || 1000;
        const baselineWPM = STATIC_CONFIG.SPEECH_VELOCITY?.baselineWPM || 140;

        // Scale window based on WPM (faster speech = wider search needed)
        const wpmScale = Math.max(0.7, Math.min(1.5, currentWPM / baselineWPM));

        const searchWindow = Math.floor((isFinal ? baseMedium : baseSmall) * wpmScale);

        const threshold = VOICE_CONFIG.FUZZY_SYNC?.minPartialMatch || 0.55;

        // Determine if we need a Global Search fallback
        const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
        const isGlobalSearch = failureCountRef.current >= 3 && wordCount >= 3;

        // Trigger Async Match in Worker
        worker.postMatch({
            transcript,
            lastMatchIndex: lastMatchIndexRef.current,
            searchWindow,
            threshold,
            lang,
            isGlobalSearch,
            isFinal, // Needed for Fix B: priority queue in useVoiceWorker
            options: {
                jumpPenalty: STATIC_CONFIG.JUMP_PENALTY,
                lastMatchIndex: lastMatchIndexRef.current,
                useStemming: STATIC_CONFIG.STEMMING?.enabled,
                usePhonetics: STATIC_CONFIG.PHONETIC_MATCHING?.enabled
            }
        });

        // Use the latest result from the worker (might be from previous transcript update)
        const matchResult = worker.lastMatch;

        if (matchResult) {
            lastMatchIndexRef.current = matchResult.index;
            const sentenceId = charToSentenceMap[matchResult.index];
            if (sentenceId !== undefined) {
                lockedSentenceIdRef.current = sentenceId;
            }
            failureCountRef.current = 0;
            return matchResult;
        } else if (isFinal) {
            failureCountRef.current++;
        }

        return null;
    }, [fullCleanText, charToSentenceMap, lang, VOICE_CONFIG, worker]);

    const resetEngine = useCallback((startIndex: number = 0) => {
        lastMatchIndexRef.current = startIndex;
        lockedSentenceIdRef.current = charToSentenceMap[startIndex] || 0;
        failureCountRef.current = 0;
    }, [charToSentenceMap]);

    return useMemo(() => ({
        performMatch,
        resetEngine,
        lockedSentenceIdRef,
        failureCountRef,
        get error() { return worker.error; }
    }), [performMatch, resetEngine, worker]);
};
