import React, { useEffect, useRef, useState, memo } from "react";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { CheckCircleIcon, CopyIcon } from "../ui/Icons";
import { ConnectionStatus } from "../../types";

interface ConnectSidebarProps {
    peerId: string;
    status: ConnectionStatus;
}

export const ConnectSidebar: React.FC<ConnectSidebarProps> = memo(({ peerId, status }) => {
    const { t } = useTranslation();
    const qrRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        /**
         * @function loadQRCodeLibrary
         * @description Carrega dinamicamente a biblioteca QRCode.js.
         * @returns {Promise<void>} Uma promessa que resolve quando a biblioteca é carregada.
         */
        const loadQRCodeLibrary = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                if (window.QRCode) {
                    resolve();
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
                script.async = true;
                script.onload = () => {
                    console.log("QRCode.js library loaded successfully.");
                    resolve();
                };
                script.onerror = () => {
                    console.error("Failed to load QRCode.js library.");
                    reject(new Error("Failed to load QRCode.js library."));
                };
                document.head.appendChild(script);
            });
        };

        const generateQrCode = async () => {
            if (!peerId || !qrRef.current) return;

            try {
                await loadQRCodeLibrary();
                if (!window.QRCode) {
                    console.error("QRCode.js not available after loading attempt.");
                    return;
                }

                qrRef.current.innerHTML = "";
                const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`;
                new window.QRCode(qrRef.current, {
                    text: url,
                    width: 140,
                    height: 140,
                    colorDark: "#020617",
                    colorLight: "#ffffff",
                    correctLevel: window.QRCode.CorrectLevel.L,
                });
            } catch (e) {
                console.error("QR Generation failed", e);
            }
        };

        generateQrCode();
    }, [peerId]);

    const copyLink = async () => {
        const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`;
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            // Fallback for browsers where Clipboard API is not available or not secure
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed'; // Avoid scrolling to bottom
            textarea.style.opacity = '0'; // Hide it
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (execErr) {
                console.error('Fallback: Failed to copy text', execErr);
            }
            document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <S.SidebarWrapper>
            <S.SidebarContainer>
                <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
                <S.QRCodeBox hasId={!!peerId}>
                    {peerId ? (
                        <div ref={qrRef} className="mx-auto" />
                    ) : (
                        <div className="animate-pulse text-slate-400 text-xs h-[140px] w-[140px] flex items-center justify-center">
                            {t("host.generatingId")}
                        </div>
                    )}
                </S.QRCodeBox>

                {peerId && (
                    <div className="space-y-3 pt-2 w-full">
                        <div
                            className="text-xs text-slate-500 font-mono bg-slate-950 p-2 rounded break-all border border-slate-800"
                            aria-label="Session ID"
                        >
                            ID: {peerId}
                        </div>
                        <S.ActionButtonsGrid>
                            <S.SecondaryButton
                                onClick={copyLink}
                                size="sm"
                                className="w-full"
                            >
                                {copied ? (
                                    <CheckCircleIcon className="w-3 h-3 mr-1 text-emerald-400" />
                                ) : (
                                    <CopyIcon className="w-3 h-3 mr-1" />
                                )}
                                {copied ? t("host.linkCopied") : t("host.copyLink")}
                            </S.SecondaryButton>
                            <S.GhostButton
                                onClick={() => window.open(`${window.location.pathname}#remote?id=${peerId}`, "_blank")}
                                size="sm"
                                className="w-full text-indigo-400 hover:bg-indigo-500/10 border-indigo-500/20"
                            >
                                {t("host.openRemoteTab")}
                            </S.GhostButton>
                        </S.ActionButtonsGrid>
                    </div>
                )}

                <div className="pt-4 border-t border-slate-800">
                    <p className="text-[10px] text-slate-500 leading-relaxed">{t("host.scanInstruction")}</p>
                </div>
            </S.SidebarContainer>
        </S.SidebarWrapper>
    );
});
