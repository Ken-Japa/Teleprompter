import { ScorerOptions } from './SimilarityScorer';
import { findBestMatch } from './BestMatchEngine';

interface SegmentMatch {
    index: number;
    ratio: number;
    distance: number;
    segment: string;
    adjustedRatio: number;
}

/**
 * Advanced matching orchestrator for continuous, noisy speech transcripts.
 * 
 * WHY:
 * Speech recognition engines often produce long, rambling transcripts that include 
 * filler words, repetitions, and misaligned segments. Standard fuzzy matching on 
 * the whole string often fails. This component:
 * 1. Breaks the transcript into overlapping n-grams (segments).
 * 2. Finds the "best match" for each individual segment.
 * 3. Clusters these matches by their physical position in the document.
 * 4. Identifies "Consensus Clusters" where multiple segments align sequentially.
 * 5. Provides extreme resilience against partial speech failures.
 * 
 * @param text The source text.
 * @param transcript The noisy, potentially long speech transcript.
 */
export const findSegmentedMatch = (
    text: string | Uint16Array,
    transcript: string,
    startIndex: number = 0,
    searchWindow: number = 2000,
    segmentSize: number = 6,
    lastKnownPosition: number = 0,
    lang: string = 'pt',
    scorerOptions: ScorerOptions = {}
): { index: number; distance: number; ratio: number; confidence: number; isSequential: boolean } | null => {

    const normalizeBasic = (str: string) => {
        return str.toLowerCase().replace(/[^a-z0-9çãõáéíóúàèìòùâêîôûñ\s]/g, ' ').replace(/\s+/g, ' ').trim();
    };

    const normalizedTranscript = normalizeBasic(transcript);
    const words = normalizedTranscript.split(/\s+/).filter(Boolean);
    if (words.length < Math.min(3, segmentSize)) return null;

    const segments: string[] = [];
    for (let i = 0; i <= words.length - segmentSize; i++) {
        segments.push(words.slice(i, i + segmentSize).join(" "));
    }

    const matches: SegmentMatch[] = segments.map((segment) => {
        const match = findBestMatch(
            text,
            segment,
            startIndex,
            searchWindow,
            0.35,
            lang,
            {
                ...scorerOptions,
                lastMatchIndex: lastKnownPosition
            }
        );
        return match ? {
            index: match.index,
            ratio: match.ratio,
            distance: match.distance,
            segment,
            adjustedRatio: match.ratio // Initial ratio from findBestMatch
        } : null;
    }).filter((m): m is SegmentMatch => m !== null && m.ratio < 0.45);

    if (matches.length === 0) return null;

    const matchesWithPenalty = matches.map(m => {
        let ratioWithPenalty = m.ratio;
        if (m.index < lastKnownPosition) {
            ratioWithPenalty += 0.30;
        }
        return {
            ...m,
            adjustedRatio: Math.min(1.0, ratioWithPenalty)
        };
    });

    const indexSortedMatches = [...matchesWithPenalty].sort((a, b) => a.index - b.index);

    let bestCluster: SegmentMatch[] = [];
    let currentCluster: SegmentMatch[] = [indexSortedMatches[0]];

    for (let i = 1; i < indexSortedMatches.length; i++) {
        if (indexSortedMatches[i].index - indexSortedMatches[i - 1].index < 200) {
            currentCluster.push(indexSortedMatches[i]);
        } else {
            if (currentCluster.length > bestCluster.length) {
                bestCluster = currentCluster;
            } else if (currentCluster.length === bestCluster.length && bestCluster.length > 0) {
                const currentAvg = currentCluster.reduce((sum, m) => sum + m.adjustedRatio, 0) / currentCluster.length;
                const bestAvg = bestCluster.reduce((sum, m) => sum + m.adjustedRatio, 0) / bestCluster.length;
                if (currentAvg < bestAvg) bestCluster = currentCluster;
            }
            currentCluster = [indexSortedMatches[i]];
        }
    }
    if (currentCluster.length > bestCluster.length) bestCluster = currentCluster;

    const bestOne = [...bestCluster].sort((a, b) => a.adjustedRatio - b.adjustedRatio)[0];

    if (bestCluster.length < 2 && (segments.length > 1 || bestOne.ratio > 0.15)) {
        return null;
    }

    return {
        index: bestOne.index,
        distance: bestOne.distance,
        ratio: bestOne.adjustedRatio,
        confidence: 1 - bestOne.adjustedRatio,
        isSequential: bestCluster.length > 1
    };
};
