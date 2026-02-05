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
    const qrRef = useRef<HTMLCanvasElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const generateQrCode = async () => {
            if (!peerId || !qrRef.current) return;

            try {
                const QRCode = (await import('qrcode')).default;

                await QRCode.toCanvas(qrRef.current, `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`, {
                    width: 256,
                    margin: 4,
                    color: {
                        dark: "#020617",
                        light: "#ffffff"
                    }
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
                <div className="w-full flex justify-center">
                    <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
                </div>
                <S.QRCodeBox hasId={!!peerId}>
                    {peerId ? (
                        <canvas ref={qrRef} className="mx-auto block max-w-full h-auto" />
                    ) : (
                        <div className="animate-pulse text-slate-400 text-xs aspect-square w-full flex items-center justify-center">
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
                            <S.SecondaryButton
                                onClick={() => window.open(`${window.location.pathname}#remote?id=${peerId}`, "_blank")}
                                size="sm"
                                className="w-full bg-brand-600 hover:bg-brand-500 text-white border-transparent shadow-lg shadow-brand-500/20 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {t("host.openRemoteTab")}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </S.SecondaryButton>
                        </S.ActionButtonsGrid>
                    </div>
                )}

                <div className="pt-4 border-t border-slate-800 space-y-4">
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider font-bold mb-1">{t("host.masterMode")}</p>
                    <S.SecondaryButton
                        onClick={() => window.open(`${window.location.pathname}#master`, "_blank")}
                        size="sm"
                        className="w-full bg-slate-900 border-white/5 hover:bg-slate-800 text-slate-300 flex items-center justify-center gap-2 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:scale-110 transition-transform">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M7 12h10" />
                            <path d="M12 7v10" />
                        </svg>
                        {t("host.masterPanel")}
                    </S.SecondaryButton>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{t("host.scanInstruction")}</p>
                </div>
            </S.SidebarContainer>
        </S.SidebarWrapper>
    );
});
