import { useMemo, useCallback, useEffect } from "react";
import { parseTextToSentences } from "../utils/textParser";
import { useTranslation } from "./useTranslation";

// Specialized Hooks
import { useVoiceSpeechEngine } from "./voice/useVoiceSpeechEngine";
import { useVoiceSync } from "./voice/useVoiceSync";
import { useVoiceEngine } from "./voice/useVoiceEngine";
import { useVoiceStore, VoiceStoreState } from "../store/useVoiceStore";

/**
 * Main Orchestrator for Voice Control.
 * Acts as a facade connecting speech engine, processing pipeline, and state.
 */
export const useVoiceControl = (
    text: string,
    isPro: boolean,
    onSpeechResult?: (transcript: string) => void,
    onFinalSpeechResult?: (transcript: string) => void,
    forcedLang?: string,
    isFlipVertical: boolean = false,
    isMusicianMode: boolean = false,
    isBilingual: boolean = false,
    autoColorBrackets: boolean = false
) => {
    const { lang: globalLang } = useTranslation();
    const lang = forcedLang || globalLang;

    // --- 1. DATA PREPARATION ---
    const { sentences, fullCleanText, fullCleanTextBuffer, charToSentenceMap } = useMemo(() => {
        return parseTextToSentences(text, autoColorBrackets, isMusicianMode);
    }, [text, autoColorBrackets, isMusicianMode]);


    // --- 2. SPECIALIZED SUB-HOOKS ---
    const state = useVoiceSync({ sentences, charToSentenceMap });

    const engine = useVoiceEngine({
        sentences,
        fullCleanText,
        fullCleanTextBuffer,
        charToSentenceMap,
        lang,
        onSpeechResult,
        onFinalSpeechResult,
        onMatchResult: (match, transcript) => {
            // This is called reactively when the worker finishes a match.
            // posInSentence will be (matchIndex + matchLength).
            // match.wordCount is also available if needed for extra smoothing.
            const matchLength = transcript.length;
            state.updatePosition(match.index, matchLength);
        }
    });

    // --- 3. ORCHESTRATION ---
    const onTranscript = useCallback((transcript: string, isFinal: boolean) => {
        engine.processTranscript(transcript, isFinal);
    }, [engine]);

    const { toggleVoice, start: startListening, stop: stopListening, isListening, error } = useVoiceSpeechEngine({
        lang,
        onTranscript
    });

    // Update Global Store with Engine & State data
    const setIsListening = useVoiceStore((s: VoiceStoreState) => s.setIsListening);
    const setError = useVoiceStore((s: VoiceStoreState) => s.setError);
    const setIsScriptFinished = useVoiceStore((s: VoiceStoreState) => s.setIsScriptFinished);
    const setIsSupported = useVoiceStore((s: VoiceStoreState) => s.setIsSupported);
    const setSessionSummary = useVoiceStore((s: VoiceStoreState) => s.setSessionSummary);
    const activeSentenceIndex = useVoiceStore((s: VoiceStoreState) => s.activeSentenceIndex);

    useEffect(() => {
        setIsSupported(error !== "host.controls.browserNotSupported");
    }, [error, setIsSupported]);

    useEffect(() => {
        setIsListening(isListening);
    }, [isListening, setIsListening]);

    const workerError = engine.matchEngine.error;
    useEffect(() => {
        setError(error || workerError);
    }, [error, workerError, setError]);

    const isScriptFinished = useMemo(() => {
        return activeSentenceIndex >= sentences.length - 1 && sentences.length > 0;
    }, [activeSentenceIndex, sentences.length]);

    useEffect(() => {
        setIsScriptFinished(isScriptFinished);
    }, [isScriptFinished, setIsScriptFinished]);

    // Lifecycle Synchronization & Momentum Loop
    useEffect(() => {
        let rafId: number;

        if (isListening) {
            // 1. Auto-resync to current scroll position on start
            // This prevents the "jump back" issue if the user moved the scroll manually
            const currentSentenceIndex = useVoiceStore.getState().activeSentenceIndex;
            const currentSentence = sentences[currentSentenceIndex];
            if (currentSentence) {
                engine.resetEngine(currentSentence.cleanStartIndex);
            }

            engine.startEngineSession();

            // 2. Momentum Loop (Inércia)
            // If no matches occur, extrapolation keeps the text moving
            const momentumLoop = () => {
                const wpm = engine.metrics.speechVelocity.currentWPM;
                state.applyMomentum(wpm);
                rafId = requestAnimationFrame(momentumLoop);
            };
            rafId = requestAnimationFrame(momentumLoop);
        } else {
            engine.stopEngineSession();
        }

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isListening, engine, state, sentences]);

    // --- 4. EXPOSED API ---
    return {
        // Actions
        toggleVoice,
        startListening,
        stopListening,

        resetVoice: (startIndex: number = 0) => {
            engine.resetEngine(startIndex);
            state.resetState(startIndex);
        },

        syncWithScroll: (startIndex: number) => {
            engine.resetEngine(startIndex);
            state.syncTo(startIndex);
        },

        clearSessionSummary: () => setSessionSummary(null),

        // Metadata
        sentences,
        voiceApiSupported: true,

        // Compatibility
        semanticWindowEvent: null,
        _params: { isPro, isFlipVertical, isBilingual }
    };
};
