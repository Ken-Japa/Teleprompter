import { newStemmer } from 'snowball-stemmers';
import { doubleMetaphone } from 'double-metaphone';
import { VOICE_CONFIG } from '../config/voiceControlConfig';

// Cache for Levenshtein calculations (LRU with max 100 entries)
const levenshteinCache = new Map<string, Map<string, number>>();
const MAX_CACHE_SIZE = 100;

// Stemmer instances for supported languages
const stemmers: Record<string, any> = {
    'pt': newStemmer('portuguese'),
    'en': newStemmer('english'),
    'es': newStemmer('spanish')
};

// Cache for stemmed words to avoid redundant calls to the library
const stemCache = new Map<string, string>();

// Cache for phonetic codes
const phoneticCache = new Map<string, [string, string]>();

/**
 * Professional Stemmer for PT/EN/ES using snowball-stemmers
 * Reduces words to their roots (e.g. "ajudamos" -> "ajud")
 */
export const applyStemming = (text: string, lang: string = 'pt'): string => {
    if (!text) return "";

    const stemmingLang = lang.split('-')[0].toLowerCase();
    const stemmer = stemmers[stemmingLang] || stemmers['en']; // Default to English if unsupported

    // Split into words, process each with cache, join back
    return text.split(/\s+/).map(word => {
        if (word.length <= 3) return word;

        const cacheKey = `${stemmingLang}:${word}`;
        if (stemCache.has(cacheKey)) return stemCache.get(cacheKey)!;

        const stemmed = stemmer.stem(word);

        // Basic cache management
        if (stemCache.size > 1000) stemCache.clear();
        stemCache.set(cacheKey, stemmed);

        return stemmed;
    }).join(" ");
};

/**
 * Unified Phonetic Matching (Double Metaphone)
 * Generates phonetic codes for all languages as an auxiliary signal.
 */
export const applyPhonetics = (text: string): [string, string] => {
    if (!text) return ["", ""];

    const normalized = text.toLowerCase().trim();
    if (phoneticCache.has(normalized)) return phoneticCache.get(normalized)!;

    const words = normalized.split(/\s+/).filter(word => word.length > 2);
    if (words.length === 0) return ["", ""];

    // Generate codes for each word and join
    const codes = words.map(word => doubleMetaphone(word));
    const result: [string, string] = [
        codes.map(c => c[0]).join(""),
        codes.map(c => c[1]).join("")
    ];

    if (phoneticCache.size > 1000) phoneticCache.clear();
    phoneticCache.set(normalized, result);

    return result;
};

/**
 * Fast Levenshtein with memoization and early exit
 */
export const levenshteinDistance = (a: string, b: string): number => {
    // Early returns for common cases
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    // Check cache
    const cacheKey = a.length < b.length ? a : b;
    const cacheValue = a.length < b.length ? b : a;

    if (levenshteinCache.has(cacheKey)) {
        const innerCache = levenshteinCache.get(cacheKey)!;
        if (innerCache.has(cacheValue)) {
            return innerCache.get(cacheValue)!;
        }
    }

    // Ensure 'a' is shorter for memory optimization
    if (a.length > b.length) {
        [a, b] = [b, a];
    }

    const alen = a.length;
    const blen = b.length;

    // Use typed arrays for better performance
    let prevRow = new Uint16Array(alen + 1);
    let currentRow = new Uint16Array(alen + 1);

    // Initialize first row
    for (let i = 0; i <= alen; i++) {
        prevRow[i] = i;
    }

    for (let i = 1; i <= blen; i++) {
        currentRow[0] = i;
        const bChar = b.charCodeAt(i - 1);

        for (let j = 1; j <= alen; j++) {
            const cost = a.charCodeAt(j - 1) === bChar ? 0 : 1;
            currentRow[j] = Math.min(
                currentRow[j - 1] + 1, // insertion
                prevRow[j] + 1,        // deletion
                prevRow[j - 1] + cost  // substitution
            );
        }

        // Swap rows
        [prevRow, currentRow] = [currentRow, prevRow];
    }

    const result = prevRow[alen];

    // Update cache
    if (!levenshteinCache.has(cacheKey)) {
        levenshteinCache.set(cacheKey, new Map());
    }
    const innerCache = levenshteinCache.get(cacheKey)!;
    innerCache.set(cacheValue, result);

    // LRU eviction
    if (levenshteinCache.size > MAX_CACHE_SIZE) {
        const firstKey = levenshteinCache.keys().next().value;
        if (firstKey !== undefined) {
            levenshteinCache.delete(firstKey);
        }
    }

    return result;
};


/**
 * Boyer-Moore-inspired fast approximate matching
 * Uses hash-based pre-filtering before expensive Levenshtein
 */
export const findBestMatch = (
    text: string,
    pattern: string,
    startIndex: number = 0,
    searchWindow: number = 1000,
    threshold: number = 0.35,
    lang: string = 'pt',
    useStemming: boolean = false,
    usePhonetics: boolean = false,
    stemWeight: number = 0.3,
    phoneticWeight: number = 0.10,
    lastMatchIndex: number = -1
): { index: number; distance: number; ratio: number } | null => {
    if (!pattern || pattern.length < 3) return null;

    const actualStartIndex = Math.max(0, Math.min(startIndex, text.length - 1));
    const searchEndIndex = Math.min(text.length, actualStartIndex + searchWindow);
    const patLen = pattern.length;

    // --- STEMMING PREPARATION ---
    const stemmingLang = lang.split('-')[0];
    const normalizedPattern = pattern.toLowerCase();
    const stemmedPattern = useStemming ? applyStemming(normalizedPattern, stemmingLang) : normalizedPattern;

    // FOREIGN WORD BONUS
    const isForeignWord = (word: string) => /^[A-Z]/.test(word) || !/^[a-zçãõáéíóúàèìòùâêîôûñ]+$/.test(word.toLowerCase());
    const patternWords = pattern.split(/\s+/);
    const foreignCount = patternWords.filter(isForeignWord).length;
    const foreignBonus = (foreignCount / patternWords.length > 0.2) ? 0.15 : 0;
    const effectiveThreshold = threshold + foreignBonus;


    // PHASE 1: Candidate generation
    const candidates: number[] = [];
    for (let i = actualStartIndex; i <= searchEndIndex - patLen; i++) {
        candidates.push(i);
    }

    // PHASE 2: Character frequency filter
    const patternFreq = new Map<string, number>();
    const freqSource = normalizedPattern; // Use stemmed pattern for freq filter if possible
    for (let i = 0; i < freqSource.length; i++) {
        const char = freqSource[i];
        patternFreq.set(char, (patternFreq.get(char) || 0) + 1);
    }

    const filteredCandidates = candidates.filter(idx => {
        const candidate = text.substring(idx, idx + patLen).toLowerCase();
        // If stemming is on, the characters might differ, but frequency is still a good heuristic
        const candidateToFilter = useStemming ? applyStemming(candidate, stemmingLang) : candidate;

        const candidateFreq = new Map<string, number>();
        for (let i = 0; i < candidateToFilter.length; i++) {
            const char = candidateToFilter[i];
            candidateFreq.set(char, (candidateFreq.get(char) || 0) + 1);
        }

        let commonChars = 0;
        for (const [char, count] of patternFreq) {
            commonChars += Math.min(count, candidateFreq.get(char) || 0);
        }

        return commonChars / Math.max(1, freqSource.length) >= 0.5; // Slightly lower threshold for stemming noise
    });

    // PHASE 3: Full Levenshtein on filtered candidates
    let bestMatch = {
        index: -1,
        distance: Infinity,
        ratio: 1.0,
    };

    for (const idx of filteredCandidates) {
        const rawSample = text.substring(idx, idx + patLen).toLowerCase();

        // --- DUAL SIGNAL MATCHING ---
        // 1. Raw Literal Distance (Signal 1 - High Weight)
        const rawDist = levenshteinDistance(normalizedPattern, rawSample);
        const rawRatio = rawDist / Math.max(1, normalizedPattern.length);

        // 2. Stemmed Distance (Signal 2 - Support Weight)
        let finalRatio = rawRatio;
        if (useStemming) {
            const stemmedSample = applyStemming(rawSample, stemmingLang);
            const stemDist = levenshteinDistance(stemmedPattern, stemmedSample);
            const stemRatio = stemDist / Math.max(1, stemmedPattern.length);

            // Weighting: dynamic Literal/Stem
            finalRatio = (rawRatio * (1 - stemWeight)) + (stemRatio * stemWeight);
        }

        // 3. Phonetic Boost (Signal 3 - Conditional Boost)
        // Only active in the "gray zone" (60% to 90% confidence -> ratio 0.10 to 0.40)
        if (usePhonetics && finalRatio > 0.10 && finalRatio < 0.40) {
            const [pPattern1, pPattern2] = applyPhonetics(normalizedPattern);
            const [pSample1, pSample2] = applyPhonetics(rawSample);

            const hasPhoneticMatch =
                (pPattern1 && (pPattern1 === pSample1 || pPattern1 === pSample2)) ||
                (pPattern2 && (pPattern2 === pSample1 || pPattern2 === pSample2));

            if (hasPhoneticMatch) {
                // Apply a reduction to ratio (equivalent to confidence boost)
                finalRatio = Math.max(0, finalRatio - phoneticWeight);
            }
        }

        let adjustedRatio = Math.max(0, finalRatio - foreignBonus);

        // --- APPLY JUMP PENALTY ---
        if (VOICE_CONFIG.JUMP_PENALTY.enabled && lastMatchIndex >= 0) {
            const jumpDistance = Math.abs(idx - lastMatchIndex);
            // Decay-based penalty: multiplier decreases as distance increases
            // We use multiplier to increase the ratio (lower confidence)
            // multiplier = 1 + maxPenaltyBonus * (1 - exp(-distance/k))
            const penaltyMultiplier = 1 + (VOICE_CONFIG.JUMP_PENALTY.maxPenaltyBonus * (1 - Math.exp(-jumpDistance / VOICE_CONFIG.JUMP_PENALTY.k)));
            adjustedRatio *= penaltyMultiplier;
        }

        if (adjustedRatio > effectiveThreshold) continue;

        // SEQUENTIAL BIAS
        if (bestMatch.index === -1 || adjustedRatio < bestMatch.ratio - 0.05) {
            bestMatch = { index: idx, distance: rawDist, ratio: adjustedRatio };
            if (adjustedRatio < 0.05) break;
        }
    }

    // PHASE 4: Fallback to sliding window if no candidates found
    if (bestMatch.ratio > effectiveThreshold && filteredCandidates.length === 0) {
        const step = Math.max(1, Math.floor(patLen / 4));

        for (let i = actualStartIndex; i < searchEndIndex - patLen; i += step) {
            const rawSample = text.substring(i, i + patLen).toLowerCase();

            // 1 & 2. Similarity with optional stemming
            let sampleRatio = 0;
            if (useStemming) {
                const stemmedSample = applyStemming(rawSample, stemmingLang);
                const stemDist = levenshteinDistance(stemmedPattern, stemmedSample);
                const stemRatio = stemDist / Math.max(1, stemmedPattern.length);
                const rawDist = levenshteinDistance(normalizedPattern, rawSample);
                const rawRatio = rawDist / Math.max(1, normalizedPattern.length);
                sampleRatio = (rawRatio * (1 - stemWeight)) + (stemRatio * stemWeight);
            } else {
                const dist = levenshteinDistance(normalizedPattern, rawSample);
                sampleRatio = dist / Math.max(1, normalizedPattern.length);
            }

            // 3. Phonetic Boost in fallback
            if (usePhonetics && sampleRatio > 0.10 && sampleRatio < 0.40) {
                const [pPattern1, pPattern2] = applyPhonetics(normalizedPattern);
                const [pSample1, pSample2] = applyPhonetics(rawSample);
                const hasPhoneticMatch =
                    (pPattern1 && (pPattern1 === pSample1 || pPattern1 === pSample2)) ||
                    (pPattern2 && (pPattern2 === pSample1 || pPattern2 === pSample2));

                if (hasPhoneticMatch) {
                    sampleRatio = Math.max(0, sampleRatio - phoneticWeight);
                }
            }

            let ratio = Math.max(0, sampleRatio - foreignBonus);

            // --- APPLY JUMP PENALTY IN FALLBACK ---
            if (VOICE_CONFIG.JUMP_PENALTY.enabled && lastMatchIndex >= 0) {
                const jumpDistance = Math.abs(i - lastMatchIndex);
                const penaltyMultiplier = 1 + (VOICE_CONFIG.JUMP_PENALTY.maxPenaltyBonus * (1 - Math.exp(-jumpDistance / VOICE_CONFIG.JUMP_PENALTY.k)));
                ratio *= penaltyMultiplier;
            }

            if (ratio > effectiveThreshold) continue;

            if (bestMatch.index === -1 || ratio < bestMatch.ratio - 0.05) {
                bestMatch = { index: i, distance: -1, ratio };
                if (ratio < 0.05) break;
            }
        }
    }

    return bestMatch.ratio <= effectiveThreshold ? bestMatch : null;
};

/**
 * Segmented matching (N-gram approach)
 * Breaks transcript into chunks and looks for a consensus match
 */
export const findSegmentedMatch = (
    text: string,
    transcript: string,
    startIndex: number = 0,
    searchWindow: number = 2000,
    segmentSize: number = 6,
    lastKnownPosition: number = 0,
    lang: string = 'pt',
    useStemming: boolean = false,
    usePhonetics: boolean = false,
    stemWeight: number = 0.3,
    phoneticWeight: number = 0.10
): { index: number; confidence: number; isSequential: boolean } | null => {
    // Basic normalization (lowercase, remove punctuation)
    const normalizeBasic = (str: string) => {
        return str.toLowerCase().replace(/[^a-z0-9çãõáéíóúàèìòùâêîôûñ\s]/g, ' ').replace(/\s+/g, ' ').trim();
    };

    const normalizedTranscript = normalizeBasic(transcript);
    const words = normalizedTranscript.split(/\s+/).filter(Boolean);
    if (words.length < Math.min(3, segmentSize)) return null;

    const segments: string[] = [];
    for (let i = 0; i <= words.length - segmentSize; i += 1) { // Slidind window of 1 for maximum coverage
        segments.push(words.slice(i, i + segmentSize).join(" "));
    }

    const matches = segments.map((segment) => {
        // findBestMatch now handles stemming and phonetics internally if enabled
        const match = findBestMatch(text, segment, startIndex, searchWindow, 0.35, lang, useStemming, usePhonetics, stemWeight, phoneticWeight, lastKnownPosition);
        return match ? { index: match.index, ratio: match.ratio, segment } : null;
    }).filter((m): m is { index: number; ratio: number; segment: string } => m !== null && m.ratio < 0.45); // Slightly more lenient threshold for filtered matches

    if (matches.length === 0) return null;

    const matchesWithPenalty = matches.map(m => {
        let ratioWithPenalty = m.ratio;

        // Heavy penalty for backwards jumps (beyond the exponential one)
        if (m.index < lastKnownPosition) {
            ratioWithPenalty += 0.30;  // 30% confidence lost
        }

        // We already applied the exponential penalty inside findBestMatch, 
        // so we don't need to double-apply it here unless we want to keep the "800 chars suspicious" rule.
        // Actually, the user asked for the explicit penalty for long jumps, which we implemented in findBestMatch.
        // Let's keep the backward penalty as it's a "logical" check, but maybe integrate it better.

        return {
            ...m,
            adjustedRatio: Math.min(1.0, ratioWithPenalty)
        };
    });

    // CRITICAL FIX: To find clusters (sequences), we MUST sort by INDEX first, not ratio.
    const indexSortedMatches = [...matchesWithPenalty].sort((a, b) => a.index - b.index);

    let bestCluster: typeof matchesWithPenalty = [];
    let currentCluster: typeof matchesWithPenalty = [indexSortedMatches[0]];

    for (let i = 1; i < indexSortedMatches.length; i++) {
        // Max distance in chars between successive segments
        if (indexSortedMatches[i].index - indexSortedMatches[i - 1].index < 200) {
            currentCluster.push(indexSortedMatches[i]);
        } else {
            // Evaluate current cluster before starting a new one
            if (currentCluster.length > bestCluster.length) {
                bestCluster = currentCluster;
            } else if (currentCluster.length === bestCluster.length && bestCluster.length > 0) {
                // If same size, pick the one with better average ratio
                const currentAvg = currentCluster.reduce((sum, m) => sum + m.adjustedRatio, 0) / currentCluster.length;
                const bestAvg = bestCluster.reduce((sum, m) => sum + m.adjustedRatio, 0) / bestCluster.length;
                if (currentAvg < bestAvg) bestCluster = currentCluster;
            }
            currentCluster = [indexSortedMatches[i]];
        }
    }
    if (currentCluster.length > bestCluster.length) bestCluster = currentCluster;

    // From the best cluster, pick the item with the best (lowest) adjustedRatio
    const bestOne = [...bestCluster].sort((a, b) => a.adjustedRatio - b.adjustedRatio)[0];

    // Minimum cluster size to avoid isolated noise
    if (bestCluster.length < 2 && (segments.length > 1 || bestOne.ratio > 0.15)) {
        return null;
    }

    return {
        index: bestOne.index,
        confidence: 1 - bestOne.ratio, // We report the ORIGINAL confidence for diagnostics
        isSequential: bestCluster.length > 1
    };
};

/**
 * Clear cache when needed (e.g., on text change)
 */
export const clearMatchCache = () => {
    levenshteinCache.clear();
};
