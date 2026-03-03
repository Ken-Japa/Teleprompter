import { useCallback } from "react";
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

    const updatePosition = useCallback((matchIndex: number) => {
        const sentenceId = charToSentenceMap[matchIndex];
        if (sentenceId === undefined) return;

        setActiveSentenceIndex(sentenceId);

        const sentence = sentences[sentenceId];
        if (sentence && sentence.startIndex !== undefined) {
            const cleanLen = sentence.cleanContent.length;
            const posInSentence = matchIndex - sentence.startIndex;
            const progress = Math.max(0, Math.min(100, (posInSentence / cleanLen) * 100));

            // We no longer apply LERP here to avoid "Double Smoothing".
            // The useScrollPhysics hook will handle the smoothing using the adaptedLerpFactor.
            setVoiceProgress(progress);
        }
    }, [charToSentenceMap, sentences, setActiveSentenceIndex, setVoiceProgress]);

    const resetState = useCallback((startIndex: number = 0) => {
        const sentenceId = charToSentenceMap[startIndex];
        setActiveSentenceIndex(sentenceId !== undefined ? sentenceId : 0);
        setVoiceProgress(0);
    }, [charToSentenceMap, setActiveSentenceIndex, setVoiceProgress]);

    const syncTo = useCallback((startIndex: number) => {
        const sentenceId = charToSentenceMap[startIndex];
        if (sentenceId !== undefined) {
            setActiveSentenceIndex(sentenceId);
        }
    }, [charToSentenceMap, setActiveSentenceIndex]);

    const resetProgress = useCallback(() => {
        setVoiceProgress(0);
    }, [setVoiceProgress]);

    return {
        updatePosition,
        resetState,
        syncTo,
        resetProgress
    };
};
