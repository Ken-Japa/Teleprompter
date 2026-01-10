import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { getBackingTrack, AudioData } from "../utils/audioStorage";
import { Sentence } from "../types";

interface Marker {
    timestamp: number;
    sentenceId: number;
    name: string;
}

export const useBackingTrack = (scriptId: string, sentences: Sentence[], isPro: boolean) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioData, setAudioData] = useState<AudioData | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load audio data from IndexedDB
    useEffect(() => {
        const loadAudio = async () => {
            if (!scriptId) return;
            try {
                const data = await getBackingTrack(scriptId);
                if (data) {
                    setAudioData(data);

                    // Create audio element
                    const blob = new Blob([data.data], { type: data.type });
                    const url = URL.createObjectURL(blob);

                    if (audioRef.current) {
                        audioRef.current.src = url;
                    } else {
                        const audio = new Audio(url);
                        audio.onloadedmetadata = () => setDuration(audio.duration);
                        audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
                        audio.onended = () => setIsPlaying(false);
                        audioRef.current = audio;
                    }
                } else {
                    setAudioData(null);
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current = null;
                    }
                }
            } catch (err) {
                console.error("Failed to load backing track", err);
            }
        };
        loadAudio();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                URL.revokeObjectURL(audioRef.current.src);
            }
        };
    }, [scriptId]);

    // Extract markers from sentences
    const markers = useMemo(() => {
        const found: Marker[] = [];
        sentences.forEach(s => {
            if (s.command?.type === 'SECTION') {
                found.push({
                    timestamp: s.command.timestamp,
                    sentenceId: s.id,
                    name: s.command.name
                });
            }
        });
        // Sort by timestamp just in case
        return found.sort((a, b) => a.timestamp - b.timestamp);
    }, [sentences]);

    const play = useCallback(() => {
        if (audioRef.current && isPro) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [isPro]);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) pause();
        else play();
    }, [isPlaying, play, pause]);

    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    // Get the current progress between markers
    const getProgress = useCallback(() => {
        if (markers.length === 0) return null;

        const time = currentTime;

        // Find current and next marker
        let currentMarkerIndex = -1;
        for (let i = 0; i < markers.length; i++) {
            if (time >= markers[i].timestamp) {
                currentMarkerIndex = i;
            } else {
                break;
            }
        }

        if (currentMarkerIndex === -1) {
            // Before first marker: interpolate from start (0,0) to first marker
            const nextMarker = markers[0];
            const ratio = time / nextMarker.timestamp;
            return {
                startSentenceId: -1, // Representing the very top
                endSentenceId: nextMarker.sentenceId,
                ratio: Math.min(1, ratio)
            };
        }

        if (currentMarkerIndex === markers.length - 1) {
            // After last marker: we don't know the end, just return the last marker sentence
            return {
                startSentenceId: markers[currentMarkerIndex].sentenceId,
                endSentenceId: markers[currentMarkerIndex].sentenceId,
                ratio: 1
            };
        }

        const currentMarker = markers[currentMarkerIndex];
        const nextMarker = markers[currentMarkerIndex + 1];

        const duration = nextMarker.timestamp - currentMarker.timestamp;
        const elapsed = time - currentMarker.timestamp;
        const ratio = elapsed / duration;

        return {
            startSentenceId: currentMarker.sentenceId,
            endSentenceId: nextMarker.sentenceId,
            ratio: Math.min(1, Math.max(0, ratio))
        };
    }, [currentTime, markers]);

    return {
        isPlaying,
        currentTime,
        duration,
        audioData,
        markers,
        play,
        pause,
        togglePlay,
        seek,
        getProgress
    };
};
