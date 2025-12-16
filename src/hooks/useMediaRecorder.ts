import { useState, useRef, useCallback, useEffect } from "react";
import { RECORDING_CONFIG } from "../config/constants";

export const useMediaRecorder = (externalVideoStream?: MediaStream | null) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [hasRecordedData, setHasRecordedData] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = useCallback(async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            });

            let finalStream = audioStream;

            // If we have an external video stream, combine tracks
            if (externalVideoStream) {
                const videoTracks = externalVideoStream.getVideoTracks();
                if (videoTracks.length > 0) {
                    const combinedStream = new MediaStream([
                        ...audioStream.getAudioTracks(),
                        ...videoTracks
                    ]);
                    finalStream = combinedStream;
                }
            }

            streamRef.current = finalStream;

            const options = MediaRecorder.isTypeSupported(RECORDING_CONFIG.MIME_TYPE)
                ? { mimeType: RECORDING_CONFIG.MIME_TYPE }
                : undefined;

            const mediaRecorder = new MediaRecorder(finalStream, options);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];
            setRecordingTime(0);
            setHasRecordedData(false);

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                setHasRecordedData(true);
                setIsRecording(false);
                setIsPaused(false);
                stopTimer();

                // Stop all tracks
                // Stop all tracks (ONLY for the stream we created, i.e. audio)
                // IMPORTANT: Do NOT stop external video tracks here, as they are managed by the parent component (Camera Overlay)
                if (streamRef.current) {
                    streamRef.current.getAudioTracks().forEach(track => track.stop());
                    // We do NOT stop video tracks if they came from external source
                    if (!externalVideoStream) {
                        streamRef.current.getVideoTracks().forEach(track => track.stop());
                    }
                }
                streamRef.current = null;
            };

            mediaRecorder.start(RECORDING_CONFIG.TIMESLICE_MS); // Collect data every second
            setIsRecording(true);
            startTimer();
        } catch (err) {
            console.error("Error accessing media devices:", err);
            alert("Não foi possível acessar a câmera ou microfone. Verifique as permissões.");
        }
    }, [externalVideoStream]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            stopTimer();
        }
    }, []);

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            startTimer();
        }
    }, []);

    const downloadRecording = useCallback(() => {
        if (chunksRef.current.length === 0) return;

        const blob = new Blob(chunksRef.current, { type: RECORDING_CONFIG.MIME_TYPE });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = url;
        a.download = `${RECORDING_CONFIG.FILENAME_PREFIX}${new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/:/g, "-")}${RECORDING_CONFIG.EXTENSION}`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, []);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, RECORDING_CONFIG.TIMER_INTERVAL_MS);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopTimer();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return {
        isRecording,
        isPaused,
        recordingTime,
        hasRecordedData,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        downloadRecording,
        formatTime,
    };
};
