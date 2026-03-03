import { levenshteinDistance } from '../levenshtein';
import { applyStemming } from '../stemming';
import { applyPhonetics } from '../phonetics';

export interface ScoreResult {
    index: number;
    distance: number;
    ratio: number;
}

export interface JumpPenaltyConfig {
    enabled: boolean;
    maxPenaltyBonus: number;
    k: number;
}

export interface ScorerOptions {
    lang?: string;
    useStemming?: boolean;
    usePhonetics?: boolean;
    stemWeight?: number;
    phoneticWeight?: number;
    lastMatchIndex?: number;
    stemmedPattern?: string;
    patternPhonetics?: [string, string];
    jumpPenalty?: JumpPenaltyConfig;
}

// Reuse TextDecoder instance to avoid expensive allocations
const UTF16_DECODER = new TextDecoder('utf-16');

// Lightweight cache for linguistic processing of samples within a single search window
// We use a simple Map with a size limit to prevent memory leaks
const LINGUISTIC_CACHE = new Map<string, { stem?: string, phonetics?: [string, string] }>();
const MAX_CACHE_SIZE = 500;

export const clearLinguisticCache = () => {
    LINGUISTIC_CACHE.clear();
};

/**
 * Core scoring engine that combines multiple heuristic signals to evaluate matches.
 * 
 * WHY:
 * Speech recognition is inherently fuzzy. A single signal like Levenshtein is often 
 * insufficient. We combine:
 * 1. Raw Character Similarity (Levenshtein) - Base accuracy.
 * 2. Stemming (Linguistic) - Ignores word endings (singular/plural, verb forms).
 * 3. Phonetics (Double Metaphone) - Boosts matches that "sound" the same, ignoring typos.
 * 4. Jump Penalties (Physical) - Penalizes large jumps in text to maintain reading flow.
 * 
 * @param text Full text.
 * @param pattern Normalized pattern (lowercase).
 * @param idx Candidate index.
 * @param patLen Pattern length.
 * @param options Scoring options (stemming, phonetics, weights, jump penalty config).
 */
export const calculateScore = (
    text: string | Uint16Array,
    pattern: string | Uint16Array,
    idx: number,
    patLen: number,
    options: ScorerOptions = {}
): ScoreResult => {
    const {
        lang = 'pt',
        useStemming = false,
        usePhonetics = false,
        stemWeight = 0.3,
        phoneticWeight = 0.1,
        lastMatchIndex = -1,
        stemmedPattern = '',
        patternPhonetics,
        jumpPenalty
    } = options;

    let rawSample: string | Uint16Array;
    let sampleStr: string | null = null;

    if (text instanceof Uint16Array) {
        rawSample = text.subarray(idx, idx + patLen);
    } else {
        sampleStr = text.substring(idx, idx + patLen).toLowerCase();
        rawSample = sampleStr;
    }

    const stemmingLang = lang.split('-')[0];

    const getSampleString = (): string => {
        if (sampleStr !== null) return sampleStr;
        sampleStr = UTF16_DECODER.decode(rawSample as Uint16Array);
        return sampleStr;
    };

    // 1. Raw Literal Distance
    // levenshteinDistance now supports string | Uint16Array directly
    const rawDist = levenshteinDistance(pattern, rawSample);
    const rawRatio = rawDist / Math.max(1, pattern.length);

    // Fast-path: If the literal match is extremely bad (> 0.8), skip linguistic scoring
    if (rawRatio > 0.8) {
        return { index: idx, distance: rawDist, ratio: rawRatio };
    }

    let finalRatio = rawRatio;

    // Manage Cache
    const sStr = getSampleString();
    let cached = LINGUISTIC_CACHE.get(sStr);
    if (!cached) {
        if (LINGUISTIC_CACHE.size >= MAX_CACHE_SIZE) {
            // Clear cache if it grows too large (simple LRU-ish reset)
            LINGUISTIC_CACHE.clear();
        }
        cached = {};
        LINGUISTIC_CACHE.set(sStr, cached);
    }

    // 2. Stemmed Distance
    if (useStemming && stemmedPattern) {
        if (cached.stem === undefined) {
            cached.stem = applyStemming(sStr, stemmingLang);
        }
        const stemDist = levenshteinDistance(stemmedPattern, cached.stem);
        const stemRatio = stemDist / Math.max(1, stemmedPattern.length);
        finalRatio = (rawRatio * (1 - stemWeight)) + (stemRatio * stemWeight);
    }

    // 3. Phonetic Boost
    if (usePhonetics && finalRatio > 0.10 && finalRatio < 0.40) {
        if (cached.phonetics === undefined) {
            cached.phonetics = applyPhonetics(sStr);
        }
        const [pSample1, pSample2] = cached.phonetics;
        const patternStr = typeof pattern === 'string' ? pattern : UTF16_DECODER.decode(pattern);
        const [pPattern1, pPattern2] = patternPhonetics || applyPhonetics(patternStr);

        const hasPhoneticMatch =
            (pPattern1 && (pPattern1 === pSample1 || pPattern1 === pSample2)) ||
            (pPattern2 && (pPattern2 === pSample1 || pPattern2 === pSample2));

        if (hasPhoneticMatch) {
            finalRatio = Math.max(0, finalRatio - phoneticWeight);
        }
    }

    // 4. Jump Penalty
    let adjustedRatio = finalRatio;
    if (jumpPenalty?.enabled && lastMatchIndex >= 0) {
        const jumpDistance = Math.abs(idx - lastMatchIndex);
        const penaltyMultiplier = 1 + (jumpPenalty.maxPenaltyBonus * (1 - Math.exp(-jumpDistance / jumpPenalty.k)));
        adjustedRatio *= penaltyMultiplier;
    }

    return {
        index: idx,
        distance: rawDist,
        ratio: adjustedRatio
    };
};
