/**
 * Web Worker for Voice Matching
 * Offloads heavy computations from the main thread
 */

import { findBestMatch } from './matcher/BestMatchEngine';
import { findSegmentedMatch } from './matcher/SegmentOrchestrator';
import { ScoreResult, ScorerOptions } from './matcher/SimilarityScorer';

// Cache for normalized script
let scriptContent: string = '';
let scriptBuffer: Uint16Array | null = null;

export interface InitPayload {
    script: string;
    scriptBuffer?: Uint16Array;
}

export interface MatchPayload {
    transcript: string;
    lastMatchIndex: number;
    searchWindow: number;
    threshold: number;
    lang: string;
    options: ScorerOptions;
    requestId: number;
    isGlobalSearch?: boolean;
}

export type WorkerMessagePayload = InitPayload | MatchPayload;

export type WorkerMessage =
    | { type: 'INIT'; payload: InitPayload; }
    | { type: 'UPDATE_SCRIPT'; payload: InitPayload; }
    | { type: 'MATCH'; payload: MatchPayload; };

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
    try {
        const { type, payload } = e.data;

        switch (type) {
            case 'INIT':
            case 'UPDATE_SCRIPT': {
                scriptContent = payload.script;
                if (payload.scriptBuffer) {
                    scriptBuffer = payload.scriptBuffer;
                }
                break;
            }

            case 'MATCH': {
                if (!scriptContent && !scriptBuffer) return;

                const {
                    transcript,
                    lastMatchIndex,
                    searchWindow,
                    threshold,
                    lang,
                    options,
                    requestId,
                    isGlobalSearch
                } = payload;

                const textToSearch = scriptBuffer || scriptContent;

                let effectiveStartIndex = lastMatchIndex;
                let effectiveSearchWindow = searchWindow;
                let effectiveOptions = { ...options };
                let effectiveThreshold = threshold;
                let effectiveLastKnownPosition = lastMatchIndex;

                if (isGlobalSearch) {
                    effectiveStartIndex = 0;
                    effectiveSearchWindow = (textToSearch as any).length;
                    effectiveOptions.jumpPenalty = undefined;
                    effectiveOptions.lastMatchIndex = -1;
                    effectiveThreshold = Math.max(0.3, threshold - 0.1); // Be more forgiving during deep recovery
                    effectiveLastKnownPosition = 0;
                }

                // 1. Sliding Window Best Match
                let matchResult: ScoreResult | null = findBestMatch(
                    textToSearch,
                    transcript,
                    effectiveStartIndex,
                    effectiveSearchWindow,
                    effectiveThreshold,
                    lang,
                    effectiveOptions
                );

                // 2. Recovery: Segmented Matching
                if (!matchResult && transcript.split(' ').length > 3) {
                    matchResult = findSegmentedMatch(
                        textToSearch,
                        transcript,
                        effectiveStartIndex,
                        effectiveSearchWindow * 1.5,
                        6, // Default segmentSize
                        effectiveLastKnownPosition,
                        lang,
                        {
                            ...effectiveOptions,
                            useStemming: true,
                            usePhonetics: true
                        }
                    );
                }

                // 3. Offload Metrics: Calculate word count here to free Main Thread
                const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;

                self.postMessage({
                    type: 'MATCH_RESULT',
                    payload: matchResult ? { ...matchResult, wordCount } : null,
                    requestId
                });
                break;
            }
        }
    } catch (error: any) {
        console.error("[voiceMatch.worker] Fatal global worker error:", error);

        // Se for um evento MATCH validamos devolver um erro especifico da request
        const requestId = e.data.type === 'MATCH' ? (e.data.payload as MatchPayload).requestId : undefined;

        // Return a clear error instruction to the main thread so it can trigger auto-heal if needed
        self.postMessage({
            type: 'ERROR',
            payload: { message: error.message || 'Unknown error occurred in worker' },
            requestId
        });
    }
};
