import { useRef, useEffect, useCallback, useMemo } from 'react';
import { ScoreResult } from '../../utils/voice/matcher/SimilarityScorer';


interface PostMatchParams {
    transcript: string;
    lastMatchIndex: number;
    searchWindow: number;
    threshold: number;
    lang: string;
    isGlobalSearch?: boolean;
    isFinal?: boolean;
    options: any;
}

export const useVoiceWorker = (script: string, scriptBuffer: Uint16Array) => {
    // We use Refs instead of React State to completely eliminate
    // non-critical UI re-renders on every low-level progress frame from the worker.
    const isProcessingRef = useRef<boolean>(false);
    const errorRef = useRef<string | null>(null);
    const lastResultRef = useRef<ScoreResult | null>(null);

    const workerRef = useRef<Worker | null>(null);
    const lastRequestIdRef = useRef<number>(0);

    const restartCountRef = useRef(0);
    const MAX_RESTARTS = 3;

    // Fix B: Priority queue for isFinal=true transcripts dropped while worker is busy.
    // Interim results can be silently dropped; final results must be processed.
    const pendingFinalRef = useRef<PostMatchParams | null>(null);

    // Initialize Worker
    const initWorker = useCallback(() => {
        // Only initialize if we're in a browser environment
        if (typeof window === 'undefined') return;

        try {
            if (workerRef.current) {
                workerRef.current.terminate();
            }

            const worker = new Worker(
                new URL('../../utils/voice/voiceMatch.worker.ts', import.meta.url),
                { type: 'module' }
            );

            worker.onmessage = (e) => {
                if (e.data.type === 'MATCH_RESULT') {
                    const { payload, requestId } = e.data;

                    if (requestId === lastRequestIdRef.current) {
                        lastResultRef.current = payload;
                    }
                    isProcessingRef.current = false;

                    // Fix B: After processing completes, drain any pending final transcript
                    if (pendingFinalRef.current) {
                        const pending = pendingFinalRef.current;
                        pendingFinalRef.current = null;
                        // Post the pending final match now that worker is free
                        postMatchInternal(pending);
                    }

                } else if (e.data.type === 'ERROR') {
                    const { payload, requestId } = e.data;
                    console.error('[VoiceWorker] Received internal error:', payload.message);

                    if (!requestId || requestId === lastRequestIdRef.current) {
                        errorRef.current = payload.message;
                        isProcessingRef.current = false;
                        pendingFinalRef.current = null; // Discard pending on crash

                        // Auto-healing logic for internal crashes
                        if (restartCountRef.current < MAX_RESTARTS) {
                            restartCountRef.current++;
                            console.warn(`[VoiceWorker] Attempting restart due to internal error ${restartCountRef.current}/${MAX_RESTARTS}...`);
                            setTimeout(initWorker, 1000);
                        }
                    } else {
                        isProcessingRef.current = false;
                    }
                }
            };

            worker.onerror = (err) => {
                console.error('[VoiceWorker] Error:', err);
                errorRef.current = 'Worker error';
                isProcessingRef.current = false;
                pendingFinalRef.current = null; // Discard pending on crash

                // Auto-healing logic
                if (restartCountRef.current < MAX_RESTARTS) {
                    restartCountRef.current++;
                    console.warn(`[VoiceWorker] Attempting restart ${restartCountRef.current}/${MAX_RESTARTS}...`);
                    setTimeout(initWorker, 1000);
                }
            };

            workerRef.current = worker;

            // Initialize with script and binary buffer
            const scriptBufferToTransfer = scriptBuffer.slice().buffer;

            worker.postMessage({
                type: 'INIT',
                payload: {
                    script,
                    scriptBuffer // Uint16Array
                }
            }, [scriptBufferToTransfer]);

        } catch (err) {
            console.error('[VoiceWorker] Failed to create worker:', err);
            errorRef.current = 'Failed to initialize worker';
        }
    }, []); // No deps: worker lifecycle is independent of script changes

    useEffect(() => {
        initWorker();
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [initWorker]);

    // Fix A: When script changes, send UPDATE_SCRIPT to the existing worker
    // instead of recreating it. Worker recreation mid-flight loses in-progress
    // matches and incorrectly resets restartCountRef.
    useEffect(() => {
        if (!workerRef.current || !script) return;
        const scriptBufferToTransfer = scriptBuffer.slice().buffer;
        workerRef.current.postMessage({
            type: 'UPDATE_SCRIPT',
            payload: { script, scriptBuffer }
        }, [scriptBufferToTransfer]);
    }, [script, scriptBuffer]);

    // Internal post — sends the actual message to worker
    const postMatchInternal = useCallback((params: PostMatchParams) => {
        if (!workerRef.current) return;

        const requestId = ++lastRequestIdRef.current;
        isProcessingRef.current = true;

        workerRef.current.postMessage({
            type: 'MATCH',
            payload: { ...params, requestId }
        });
    }, []);

    const postMatch = useCallback((params: PostMatchParams) => {
        if (!workerRef.current) return;

        if (isProcessingRef.current) {
            // Fix B: isFinal results must not be silently dropped.
            // Overwrite any pending final (latest wins), ignore interim drops.
            if (params.isFinal) {
                pendingFinalRef.current = params;
            }
            // Interim results are intentionally dropped — fire-and-forget is acceptable
            return;
        }

        postMatchInternal(params);
    }, [postMatchInternal]);

    // Return object with getters so consumers always read the live ref values
    // without suffering from stale closures, keeping the component perfectly sync
    // without React state re-renders.
    return useMemo(() => ({
        get isProcessing() { return isProcessingRef.current; },
        get error() { return errorRef.current; },
        get lastMatch() { return lastResultRef.current; },
        postMatch
    }), [postMatch]);
};
