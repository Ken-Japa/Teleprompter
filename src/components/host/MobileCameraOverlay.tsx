import React, { useEffect, useRef, useState } from 'react';

interface MobileCameraOverlayProps {
    isActive: boolean;
}

export const MobileCameraOverlay: React.FC<MobileCameraOverlayProps> = ({ isActive }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        if (!isActive) {
            // Cleanup if inactive
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            return;
        }

        const startCamera = async () => {
            try {
                // Try to get the user-facing camera (selfie)
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                    audio: false
                });

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setError(null);
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Não foi possível acessar a câmera. Verifique as permissões.");
            }
        };

        startCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [isActive]);

    if (!isActive) return null;

    if (error) {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-black text-white p-4 text-center">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect for selfie feel
            />
            {/* Overlay to ensure text legibility if needed, though we handle this with theme transparency separately */}
            <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>
        </div>
    );
};
