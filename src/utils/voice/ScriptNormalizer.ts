/**
 * Script Normalizer
 * Pre-processes the script into a more efficient format for matching
 */

import { normalizeTranscript } from './normalization';

export interface NormalizedScript {
    raw: string;
    clean: string;
    words: string[];
    wordIndices: number[]; // Character indices for each word
}

export const normalizeScript = (text: string, lang: string): NormalizedScript => {
    // 1. Basic cleaning
    const clean = normalizeTranscript(text, lang);

    // 2. Word extraction and mapping
    const words: string[] = [];
    const wordIndices: number[] = [];

    // Simple regex for word splitting (can be improved based on lang)
    const wordRegex = /\S+/g;
    let match;

    while ((match = wordRegex.exec(clean)) !== null) {
        words.push(match[0]);
        wordIndices.push(match.index);
    }

    return {
        raw: text,
        clean: clean,
        words,
        wordIndices
    };
};
