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

        // --- FIX: Lower threshold (400ms -> 100ms) to make it feel immediate ---
        // Also extend max window to 8000ms to allow for longer pauses/mismatches.
        if (timeSinceLastMatch < 100 || timeSinceLastMatch > 8000) return;

        // --- FIX: Fallback WPM if 0 (matches haven't stabilized yet) ---
        const effectiveWPM = wpm > 40 ? wpm : 140;

        // Calculate expected progress increment based on WPM
        const charsPerSecond = (effectiveWPM / 60) * 5.5;
        const dt = (now - lastMatchTimeRef.current) / 1000;
        const expectedCharsSaid = charsPerSecond * dt;

        // Find current sentence length to convert chars to progress %
        const activeIndex = useVoiceStore.getState().activeSentenceIndex;
        const sentence = sentences[activeIndex];
        if (!sentence || !sentence.matchableLength) return;

        const progressIncrement = expectedCharsSaid / sentence.matchableLength;
        const newProgress = lastProgressRef.current + progressIncrement;

        if (newProgress > 0.98) {
            // --- FIX: CROSS-SENTENCE MOMENTUM ---
            // If we've reached the end of the sentence via momentum, jump to the start of the next one.
            if (activeIndex < sentences.length - 1) {
                setActiveSentenceIndex(activeIndex + 1);
                setVoiceProgress(0);
                lastProgressRef.current = 0;
                lastMatchTimeRef.current = now; // Reset timer for the new sentence
            } else {
                setVoiceProgress(0.98);
            }
        } else {
            setVoiceProgress(newProgress);
        }
    }, [sentences, setVoiceProgress, setActiveSentenceIndex]);

    const resetState = useCallback((startIndex: number = 0) => {
        // startIndex is a sentence index here
        setActiveSentenceIndex(startIndex);
        setVoiceProgress(0);
        // --- FIX: Initialize time to now to allow momentum to work immediately if no match occurs ---
        lastMatchTimeRef.current = Date.now();
        lastProgressRef.current = 0;
    }, [setActiveSentenceIndex, setVoiceProgress]);

    const syncTo = useCallback((startIndex: number) => {
        // startIndex is a sentence index here
        setActiveSentenceIndex(startIndex);
        setVoiceProgress(0);
        // --- FIX: Initialize time to now to allow momentum to work immediately ---
        lastMatchTimeRef.current = Date.now();
        lastProgressRef.current = 0;
    }, [setActiveSentenceIndex, setVoiceProgress]);

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
