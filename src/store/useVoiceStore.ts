import { create } from 'zustand';

export interface VoiceSessionSummary {
    totalDuration: number;
    wpmHistory: number[];
    averageWpm: number;
    matchRate: number;
    scriptLength: number;
}

export interface VoiceStoreState {
    isListening: boolean;
    activeSentenceIndex: number;
    voiceProgress: number;
    isScriptFinished: boolean;
    error: string | null;
    adaptedLerpFactor: number;
    sessionSummary: VoiceSessionSummary | null;
    isSupported: boolean;

    // Actions
    setIsListening: (isListening: boolean) => void;
    toggleListening: () => void;
    setToggleListening: (fn: () => void) => void;
    setActiveSentenceIndex: (index: number) => void;
    setVoiceProgress: (progress: number) => void;
    setIsScriptFinished: (isFinished: boolean) => void;
    setError: (error: string | null) => void;
    setAdaptedLerpFactor: (factor: number) => void;
    setSessionSummary: (summary: VoiceSessionSummary | null) => void;
    setIsSupported: (isSupported: boolean) => void;

    // Batch reset
    resetState: () => void;
}

export const useVoiceStore = create<VoiceStoreState>((set) => ({
    isListening: false,
    activeSentenceIndex: 0,
    voiceProgress: 0,
    isScriptFinished: false,
    error: null,
    adaptedLerpFactor: 1.0,
    sessionSummary: null,
    isSupported: true,
    toggleListening: () => { },

    setIsListening: (isListening) => set({ isListening }),
    setToggleListening: (toggleListening) => set({ toggleListening }),
    setActiveSentenceIndex: (activeSentenceIndex) => set({ activeSentenceIndex }),
    setVoiceProgress: (voiceProgress) => set({ voiceProgress }),
    setIsScriptFinished: (isScriptFinished) => set({ isScriptFinished }),
    setError: (error) => set({ error }),
    setAdaptedLerpFactor: (adaptedLerpFactor) => set({ adaptedLerpFactor }),
    setSessionSummary: (sessionSummary) => set({ sessionSummary }),
    setIsSupported: (isSupported) => set({ isSupported }),

    resetState: () => set({
        activeSentenceIndex: 0,
        voiceProgress: 0,
        isScriptFinished: false,
        error: null,
        adaptedLerpFactor: 1.0,
        sessionSummary: null,
    }),
}));
