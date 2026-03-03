import { getFilteredCandidates } from './FrequencyFilter';
import { calculateScore, ScoreResult, ScorerOptions } from './SimilarityScorer';
import { applyStemming } from '../stemming';
import { applyPhonetics } from '../phonetics';
import { matchBufferPool } from './MatchBufferManager';

const PATTERN_CACHE = new Map<string, { stem?: string, phonetics?: [string, string] }>();
const MAX_PATTERN_CACHE_SIZE = 50;

/**
 * Orchestrates the primary fuzzy matching pipeline for short-to-medium strings.
 * 
 * WHY:
 * This is the entry point for the standard matching logic. It manages the 4-phase 
 * lifecycle:
 * 1. Pre-processing (Stemming/Normalization).
 * 2. Candidate Generation (Frequency Filtering).
 * 3. Detailed Scoring.
 * 4. Fallback (Scanning the window for partial hits if filtering yields nothing).
 * 
 * @param text The source document to search.
 * @param pattern The speech transcript to look for.
 */
export const findBestMatch = (
    text: string | Uint16Array,
    pattern: string,
    startIndex: number = 0,
    searchWindow: number = 1000,
    threshold: number = 0.35,
    lang: string = 'pt',
    options: ScorerOptions = {}
): ScoreResult | null => {
    if (!pattern || pattern.length < 3) return null;

    const {
        useStemming = false,
        usePhonetics = false,
        stemWeight = 0.3,
        phoneticWeight = 0.10,
        lastMatchIndex = -1,
        jumpPenalty
    } = options;

    const textLen = (text as any).length;
    const actualStartIndex = Math.max(0, Math.min(startIndex, textLen - 1));
    const MAX_SAFE_WINDOW = 30000;
    const effectiveSearchWindow = Math.min(searchWindow, MAX_SAFE_WINDOW);
    const searchEndIndex = Math.min(textLen, actualStartIndex + effectiveSearchWindow);
    const patLen = pattern.length;

    // --- STEMMING & PHONETICS PREPARATION ---
    const stemmingLang = lang.split('-')[0];
    const normalizedPattern = pattern.toLowerCase();

    let patternInfo = PATTERN_CACHE.get(normalizedPattern);
    if (!patternInfo) {
        if (PATTERN_CACHE.size >= MAX_PATTERN_CACHE_SIZE) {
            PATTERN_CACHE.clear();
        }
        patternInfo = {};
        PATTERN_CACHE.set(normalizedPattern, patternInfo);
    }

    let stemmedPattern = options.stemmedPattern;
    if (stemmedPattern === undefined) {
        if (useStemming) {
            if (patternInfo.stem === undefined) {
                patternInfo.stem = applyStemming(normalizedPattern, stemmingLang);
            }
            stemmedPattern = patternInfo.stem;
        } else {
            stemmedPattern = '';
        }
    }

    let patternPhonetics = options.patternPhonetics;
    if (patternPhonetics === undefined && usePhonetics) {
        if (patternInfo.phonetics === undefined) {
            patternInfo.phonetics = applyPhonetics(normalizedPattern);
        }
        patternPhonetics = patternInfo.phonetics;
    }

    // FOREIGN WORD BONUS (Calculated once)
    const isForeignWord = (word: string) => /^[A-Z]/.test(word) || !/^[a-zçãõáéíóú@èìòùâêîôûñ]+$/.test(word.toLowerCase());
    const patternWords = pattern.split(/\s+/);
    const foreignCount = patternWords.filter(isForeignWord).length;
    const foreignBonus = (foreignCount / patternWords.length > 0.2) ? 0.15 : 0;
    const effectiveThreshold = threshold + foreignBonus;

    // -- Acquire Buffer for Pattern --
    const patternBuffer = matchBufferPool.acquireUint16(patLen);
    let bestMatch: ScoreResult | null = null;

    try {
        for (let i = 0; i < patLen; i++) {
            patternBuffer[i] = normalizedPattern.charCodeAt(i);
        }
        const patternArray = patternBuffer.subarray(0, patLen);

        // PHASE 1 & 2: Candidate generation
        const filteredCandidates = getFilteredCandidates(
            text,
            patternArray,
            actualStartIndex,
            searchEndIndex,
            patLen
        );

        // PHASE 3: Detailed Scoring
        bestMatch = {
            index: -1,
            distance: Infinity,
            ratio: 1.0,
        };

        const scorerOptions: ScorerOptions = {
            lang,
            useStemming,
            usePhonetics,
            stemWeight,
            phoneticWeight,
            lastMatchIndex,
            stemmedPattern,
            patternPhonetics, // Bugfix: This was options.patternPhonetics before
            jumpPenalty
        };

        for (const idx of filteredCandidates) {
            const score = calculateScore(text, patternArray, idx, patLen, scorerOptions);
            const adjustedRatio = Math.max(0, score.ratio - foreignBonus);

            if (adjustedRatio > effectiveThreshold) continue;

            if (bestMatch.index === -1 || adjustedRatio < bestMatch.ratio - 0.05) {
                bestMatch = { ...score, ratio: adjustedRatio };
                if (adjustedRatio < 0.05) break;
            }
        }

        // PHASE 4: Fallback
        if (bestMatch.ratio > effectiveThreshold && filteredCandidates.length === 0) {
            const step = Math.max(1, Math.floor(patLen / 4));

            for (let i = actualStartIndex; i < searchEndIndex - patLen; i += step) {
                const score = calculateScore(text, patternArray, i, patLen, scorerOptions);
                const ratio = Math.max(0, score.ratio - foreignBonus);

                if (ratio > effectiveThreshold) continue;

                if (bestMatch.index === -1 || ratio < bestMatch.ratio - 0.05) {
                    bestMatch = { ...score, ratio };
                    if (ratio < 0.05) break;
                }
            }
        }
    } finally {
        matchBufferPool.releaseUint16(patternBuffer);
    }

    return bestMatch.ratio <= effectiveThreshold ? bestMatch : null;
};
