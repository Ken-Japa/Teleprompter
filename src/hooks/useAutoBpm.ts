import { useState, useEffect, useRef } from 'react';
import Meyda from 'meyda';
import { logger } from '../utils/logger';

interface UseAutoBpmProps {
    isEnabled: boolean;
    isPro: boolean;
    onBpmDetected: (bpm: number) => void;
}

export const useAutoBpm = ({ isEnabled, isPro, onBpmDetected }: UseAutoBpmProps) => {
    const [error, setError] = useState<string | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyzerRef = useRef<any>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Peak detection state
    const lastPeakTimeRef = useRef<number>(0);
    const peakIntervalsRef = useRef<number[]>([]);
    const lastRmsRef = useRef<number>(0);
    const thresholdRef = useRef<number>(0.1);

    useEffect(() => {
        if (!isEnabled || !isPro) {
            stopDetection();
            return;
        }

        startDetection();

        return () => stopDetection();
    }, [isEnabled, isPro]);

    const startDetection = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(stream);

            // Filter for low-mids (60-250Hz) - Kick/Snare region
            const filter = audioContext.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 130;
            filter.Q.value = 0.7; // Wider Q for better capture

            source.connect(filter);

            analyzerRef.current = Meyda.createMeydaAnalyzer({
                audioContext: audioContext,
                source: filter,
                bufferSize: 1024,
                featureExtractors: ['rms'],
                callback: (features: any) => {
                    if (features && features.rms) {
                        detectPeak(features.rms, audioContext.currentTime);
                    }
                }
            });

            analyzerRef.current.start();
            setError(null);
            logger.info('Auto BPM detection started');
        } catch (err) {
            logger.error('BPM Detection Error:', { error: err instanceof Error ? err : new Error(String(err)) });
            setError('Permission denied or error accessing microphone');
        }
    };

    const stopDetection = () => {
        if (analyzerRef.current) {
            analyzerRef.current.stop();
            analyzerRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        if (audioContextRef.current) {
            if (audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(e => console.error(e));
            }
            audioContextRef.current = null;
        }
        peakIntervalsRef.current = [];
        logger.info('Auto BPM detection stopped');
    };

    const detectPeak = (rms: number, currentTime: number) => {
        // Simple peak detection with dynamic threshold
        // Current RMS must be significantly higher than last AND above threshold
        const peakThreshold = thresholdRef.current;

        if (rms > peakThreshold && rms > lastRmsRef.current * 1.15) {
            const timeSinceLastPeak = currentTime - lastPeakTimeRef.current;

            // Valid BPM range: 50 (1.2s) to 220 (0.27s)
            if (timeSinceLastPeak > 0.27 && timeSinceLastPeak < 1.3) {
                peakIntervalsRef.current.push(timeSinceLastPeak);

                // Keep moving window of 8 intervals
                if (peakIntervalsRef.current.length > 8) {
                    peakIntervalsRef.current.shift();
                }

                // Minimum intervals to give a result
                if (peakIntervalsRef.current.length >= 3) {
                    const avgInterval = peakIntervalsRef.current.reduce((a, b) => a + b) / peakIntervalsRef.current.length;
                    const detectedBpm = Math.round(60 / avgInterval);

                    if (detectedBpm >= 60 && detectedBpm <= 200) {
                        onBpmDetected(detectedBpm);
                    }
                }

                lastPeakTimeRef.current = currentTime;
            }
        }

        lastRmsRef.current = rms;

        // Dynamic threshold adjustment: 
        // Decay the threshold slowly, but keep it above a noise floor
        const noiseFloor = 0.03;
        thresholdRef.current = Math.max(noiseFloor, thresholdRef.current * 0.995, rms * 0.6);
    };

    return { error };
};
