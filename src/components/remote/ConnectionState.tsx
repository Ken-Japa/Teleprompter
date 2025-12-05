import React, { useState, useRef, useEffect } from "react";
import { ConnectionStatus } from "../../types";
import * as S from "../ui/Styled";
import { RefreshIcon, WifiOffIcon, QrCodeIcon } from "../ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";
import { loadHtml5QrcodeLibrary } from "../../utils/qr";

interface ConnectionStateProps {
    status: ConnectionStatus;
    hostId: string;
}

export const ConnectionState: React.FC<ConnectionStateProps> = ({ status, hostId }) => {
    const { t } = useTranslation();
    const [isScanning, setIsScanning] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);
    const html5QrcodeRef = useRef<any>(null);

    const startScanner = async () => {
        setIsScanning(true);
        setScanError(null);

        try {
            await loadHtml5QrcodeLibrary();

            // Short delay to ensure DOM element is ready
            setTimeout(async () => {
                if (window.Html5Qrcode) {
                    try {
                        const html5QrCode = new window.Html5Qrcode("reader");
                        html5QrcodeRef.current = html5QrCode;

                        // Configuração otimizada para mobile
                        const config = {
                            fps: 10,
                            qrbox: { width: 260, height: 260 },
                            aspectRatio: 1.0,
                            disableFlip: false
                        };

                        // Prefer back camera
                        await html5QrCode.start(
                            { facingMode: "environment" },
                            config,
                            onScanSuccess,
                            onScanFailure
                        );
                    } catch (err) {
                        console.error("Error starting scanner", err);
                        setScanError("Camera access failed. Please ensure you are using HTTPS and have granted camera permissions.");
                    }
                }
            }, 100);
        } catch (e) {
            console.error(e);
            setIsScanning(false);
            setScanError("Failed to load scanner library.");
        }
    };

    const onScanSuccess = (decodedText: string) => {
        let newId = decodedText;
        // Handle URL format: ...#remote?id=XYZ
        if (decodedText.includes("id=")) {
            const parts = decodedText.split("id=");
            if (parts.length > 1) {
                // Take the part after id= and before any & (if exists)
                newId = parts[1].split("&")[0];
            }
        }

        stopScanner();

        // Force update hash and reload
        window.location.hash = `remote?id=${newId}`;
        window.location.reload();
    };

    const onScanFailure = (error: any) => {
        console.warn(t("remote.scanError"), error);
    };

    const stopScanner = async () => {
        if (html5QrcodeRef.current) {
            try {
                await html5QrcodeRef.current.stop();
                html5QrcodeRef.current.clear();
            } catch (e) {
                console.error("Failed to stop scanner", e);
            }
            html5QrcodeRef.current = null;
        }
        setIsScanning(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (html5QrcodeRef.current) {
                html5QrcodeRef.current.stop().catch(console.error);
                html5QrcodeRef.current.clear().catch(console.error);
            }
        };
    }, []);

    if (isScanning) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-black z-50 absolute inset-0 animate-fadeIn">
                <h3 className="text-white font-bold mb-4">Scan Host QR Code</h3>

                <div className="relative w-full max-w-sm bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div id="reader" className="w-full h-[400px] bg-black"></div>
                    <style>{`
                    #reader video {
                        object-fit: cover;
                        border-radius: 1rem;
                    }
                `}</style>
                    {scanError && (
                        <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/80 text-red-400 text-center text-sm">
                            {scanError}
                        </div>
                    )}
                </div>

                <S.SecondaryButton onClick={stopScanner} className="mt-8 !bg-red-500/20 !text-red-400 !border-red-500/30">
                    {t("remote.stop") || "Cancel"}
                </S.SecondaryButton>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-fadeIn">
            <div
                className={`p-6 rounded-full ${status === ConnectionStatus.ERROR ? "bg-red-500/10 text-red-500" : "bg-brand-500/10 text-brand-500 animate-pulse"}`}
            >
                {status === ConnectionStatus.ERROR ? (
                    <WifiOffIcon className="w-12 h-12" />
                ) : (
                    <RefreshIcon className="w-12 h-12 animate-spin-slow" />
                )}
            </div>
            <div>
                <h2 className="text-xl font-bold text-white mb-2">{t("remote.connecting")}</h2>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest break-all">
                    {t("remote.targetId", { id: hostId })}
                </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <S.SecondaryButton onClick={() => window.location.reload()}>{t("host.controls.reset")}</S.SecondaryButton>

                {/* Show Scan button if disconnected or error */}
                {(status === ConnectionStatus.ERROR || status === ConnectionStatus.DISCONNECTED) && (
                    <button
                        onClick={startScanner}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 active:scale-95 transition-all"
                    >
                        <QrCodeIcon className="w-5 h-5" />
                        <span>Scan QR Code</span>
                    </button>
                )}
            </div>
        </div>
    );
};
