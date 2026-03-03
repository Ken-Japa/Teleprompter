import { normalizePronunciation, pronunciationLearner } from "../pronunciationMatcher";

/**
 * Normalizes a transcript for matching.
 * Handles:
 * - Phonetic normalization
 * - Pronunciation learning
 * - Number normalization (preserving alphanumeric)
 * - Punctuation removal
 */
export const normalizeTranscript = (transcript: string, lang: string): string => {
    let cleanTranscript = transcript.toLowerCase();

    // 1. Pronunciation Normalization
    cleanTranscript = normalizePronunciation(cleanTranscript, lang);
    cleanTranscript = pronunciationLearner.apply(cleanTranscript);

    // 2. Character cleaning & Flexible Number Matching
    // Remove digit sequences to allow natural number speech
    // BUT preserve numbers that are part of alphanumeric strings (like "S1II", "8Kp30")
    cleanTranscript = cleanTranscript
        .replace(/[^\p{L}\p{N}\s]/gu, "") // Remove punctuation except letters, numbers and spaces
        .replace(/(?<!\p{L})\d+(?!\p{L})/gu, " ") // Remove ONLY standalone numbers
        .replace(/\s+/g, " ")
        .trim();

    return cleanTranscript;
};

/**
 * Focuses on the "tail" of the transcript to avoid history interference.
 */
export const getTranscriptTail = (transcript: string, sentenceContent: string): string => {
    const words = transcript.trim().split(/\s+/);
    // Keep roughly 2.5x the length of the current sentence + 10 words buffer
    const keepLength = Math.ceil(sentenceContent.split(/\s+/).length * 2.5) + 10;

    if (words.length > keepLength) {
        return words.slice(-keepLength).join(' ');
    }
    return transcript;
};
