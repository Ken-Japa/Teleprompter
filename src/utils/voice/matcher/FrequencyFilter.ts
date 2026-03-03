import { matchBufferPool } from './MatchBufferManager';

/**
 * A Boyer-Moore inspired high-speed pre-filter for string matching.
 * 
 * WHY:
 * Full fuzzy matching (Levenshtein/Stemming) is O(n*m), which is too slow to run on every 
 * character of a long document in real-time. This filter uses a sliding window frequency analysis 
 * (O(n)) to quickly prune 99% of the search space, leaving only highly probable candidates 
 * for the expensive scoring phase.
 * 
 * @param text The full text to search in.
 * @param pattern The normalized pattern (lowercase).
 * @param startIndex Starting position for search.
 * @param searchEndIndex Ending position for search.
 * @param patLen Length of the pattern.
 * @param maxCandidates Maximum number of candidates to return to prevent excessive scoring.
 */
export const getFilteredCandidates = (
    text: string | Uint16Array,
    pattern: string | Uint16Array,
    startIndex: number,
    searchEndIndex: number,
    patLen: number,
    maxCandidates: number = 200
): number[] => {
    const candidates: number[] = [];
    const windowSize = searchEndIndex - patLen;

    if (windowSize < startIndex) return [];

    const patternFreq = matchBufferPool.acquireInt32();
    const currentFreq = matchBufferPool.acquireInt32();

    const isBuffer = text instanceof Uint16Array;
    const isPatternBuffer = pattern instanceof Uint16Array;

    try {
        // 1. Build pattern frequency map
        for (let i = 0; i < patLen; i++) {
            const charCode = isPatternBuffer ? pattern[i] : (pattern as string).charCodeAt(i);
            if (charCode < 256) patternFreq[charCode]++;
        }

        let commonChars = 0;

        // 2. Initialize first window
        for (let k = 0; k < patLen; k++) {
            const charCodeRaw = isBuffer ? text[startIndex + k] : text.charCodeAt(startIndex + k);
            let charCode = charCodeRaw;
            // Lowercase mapping if not already normalized (buffer is pre-normalized)
            if (!isBuffer && charCodeRaw >= 65 && charCodeRaw <= 90) charCode += 32;

            if (charCode < 256) {
                if (currentFreq[charCode] < patternFreq[charCode]) commonChars++;
                currentFreq[charCode]++;
            }
        }

        const threshold = 0.5;
        if (commonChars / Math.max(1, patLen) >= threshold) {
            candidates.push(startIndex);
        }

        // 3. Slide the window
        for (let i = startIndex + 1; i <= windowSize; i++) {
            // Remove outgoing character
            const outCharRaw = isBuffer ? text[i - 1] : text.charCodeAt(i - 1);
            let outChar = outCharRaw;
            if (!isBuffer && outCharRaw >= 65 && outCharRaw <= 90) outChar += 32;

            if (outChar < 256) {
                if (currentFreq[outChar] <= patternFreq[outChar]) commonChars--;
                currentFreq[outChar]--;
            }

            // Add incoming character
            const inCharRaw = isBuffer ? text[i + patLen - 1] : text.charCodeAt(i + patLen - 1);
            let inChar = inCharRaw;
            if (!isBuffer && inCharRaw >= 65 && inCharRaw <= 90) inChar += 32;

            if (inChar < 256) {
                if (currentFreq[inChar] < patternFreq[inChar]) commonChars++;
                currentFreq[inChar]++;
            }

            if (commonChars / Math.max(1, patLen) >= threshold) {
                candidates.push(i);
            }

            if (candidates.length >= maxCandidates) break;
        }
    } finally {
        matchBufferPool.releaseInt32(patternFreq);
        matchBufferPool.releaseInt32(currentFreq);
    }

    return candidates;
};
