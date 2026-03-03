import { useCallback, useMemo, useRef } from "react";
import { Sentence } from "../../types";
import { useVoiceStore, VoiceStoreState } from "../../store/useVoiceStore";

interface UseVoiceSyncProps {
    sentences: Sentence[];
    charToSentenceMap: Int32Array;
}

/**
 * Hook responsible for managing the synchronization of the teleprompter state with voice input.
 * Handles:
 * - Active Sentence Index
 * - Voice Progress (raw, smoothing is handled by physics)
 * - Reset and Synchronization
 */
export const useVoiceSync = ({ sentences, charToSentenceMap }: UseVoiceSyncProps) => {
    const setActiveSentenceIndex = useVoiceStore((s: VoiceStoreState) => s.setActiveSentenceIndex);
    const setVoiceProgress = useVoiceStore((s: VoiceStoreState) => s.setVoiceProgress);
    const lastMatchTimeRef = useRef<number>(Date.now());
    const lastProgressRef = useRef<number>(0);

    const updatePosition = useCallback((matchIndex: number, matchLength: number = 0) => {
        const sentenceId = charToSentenceMap[matchIndex];
        if (sentenceId === undefined) return;

        lastMatchTimeRef.current = Date.now();
        setActiveSentenceIndex(sentenceId);

        const sentence = sentences[sentenceId];
        if (sentence && sentence.cleanStartIndex !== undefined && sentence.matchableLength !== undefined) {
            const cleanLen = sentence.matchableLength;
            const posInSentence = (matchIndex + matchLength) - sentence.cleanStartIndex;
            const progress = cleanLen > 0 ? Math.max(0, Math.min(1, posInSentence / cleanLen)) : 0;

            lastProgressRef.current = progress;
            setVoiceProgress(progress);
        }
    }, [charToSentenceMap, sentences, setActiveSentenceIndex, setVoiceProgress]);

    /**
     * Extrapolates progress based on WPM when matches are missing.
     * This keeps the text moving smoothly (momentum) during minor mismatches.
     */
    const applyMomentum = useCallback((wpm: number) => {
        const now = Date.now();
        const timeSinceLastMatch = now - lastMatchTimeRef.current;

        // Only apply if it's been a short while (e.g. > 400ms) but not too long (e.g. < 3000ms)
        if (timeSinceLastMatch < 400 || timeSinceLastMatch > 3000) return;

        // Calculate expected progress increment based on WPM
        // Avg word length is approx 5-6 chars. 
        // WPM / 60 = Words Per Second.
        // WPS * 5.5 = Chars Per Second.
        const charsPerSecond = (wpm / 60) * 5.5;
        const dt = (now - lastMatchTimeRef.current) / 1000;
        const expectedCharsSaid = charsPerSecond * dt;

        // Find current sentence length to convert chars to progress %
        const activeIndex = useVoiceStore.getState().activeSentenceIndex;
        const sentence = sentences[activeIndex];
        if (!sentence || !sentence.matchableLength) return;

        const progressIncrement = expectedCharsSaid / sentence.matchableLength;
        const newProgress = Math.min(0.98, lastProgressRef.current + progressIncrement);

        // We don't update lastProgressRef here to keep extrapolation relative to the LAST REAL MATCH
        // This prevents runaway drift.
        setVoiceProgress(newProgress);
    }, [sentences, setVoiceProgress]);

    const resetState = useCallback((startIndex: number = 0) => {
        const sentenceId = charToSentenceMap[startIndex];
        setActiveSentenceIndex(sentenceId !== undefined ? sentenceId : 0);
        setVoiceProgress(0);
        lastMatchTimeRef.current = Date.now();
        lastProgressRef.current = 0;
    }, [charToSentenceMap, setActiveSentenceIndex, setVoiceProgress]);

    const syncTo = useCallback((startIndex: number) => {
        const sentenceId = charToSentenceMap[startIndex];
        if (sentenceId !== undefined) {
            setActiveSentenceIndex(sentenceId);
            setVoiceProgress(0);
            lastMatchTimeRef.current = Date.now();
            lastProgressRef.current = 0;
        }
    }, [charToSentenceMap, setActiveSentenceIndex, setVoiceProgress]);

    const resetProgress = useCallback(() => {
        setVoiceProgress(0);
        lastProgressRef.current = 0;
    }, [setVoiceProgress]);

    return useMemo(() => ({
        updatePosition,
        applyMomentum,
        resetState,
        syncTo,
        resetProgress
    }), [updatePosition, applyMomentum, resetState, syncTo, resetProgress]);
};
