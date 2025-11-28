import React, { useEffect, useRef, useState, memo } from 'react';
import * as S from '../ui/Styled';
import { useTranslation } from '../../hooks/useTranslation';
import { CheckCircleIcon, CopyIcon } from '../ui/Icons';
import { ConnectionStatus } from '../../types';

interface ConnectSidebarProps {
    peerId: string;
    status: ConnectionStatus;
}

export const ConnectSidebar: React.FC<ConnectSidebarProps> = memo(({ peerId, status }) => {
    const { t } = useTranslation();
    const qrRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (peerId && qrRef.current && window.QRCode) {
            qrRef.current.innerHTML = '';
            try {
                const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`;
                new window.QRCode(qrRef.current, {
                    text: url,
                    width: 140, // Slightly smaller to fit improved frame
                    height: 140,
                    colorDark : "#020617",
                    colorLight : "#ffffff",
                    correctLevel : window.QRCode.CorrectLevel.L
                });
            } catch (e) {
                console.error("QR Generation failed", e);
            }
        }
    }, [peerId]);

    const copyLink = () => {
        const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <S.SidebarWrapper>
            <S.SidebarContainer>
                <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
                <S.QRCodeBox hasId={!!peerId}>
                    {peerId ? <div ref={qrRef} className="mx-auto" /> : <div className="animate-pulse text-slate-400 text-xs h-[140px] w-[140px] flex items-center justify-center">{t('host.generatingId')}</div>}
                </S.QRCodeBox>
                
                {peerId && (
                    <div className="space-y-3 pt-2 w-full">
                         <div className="text-xs text-slate-500 font-mono bg-slate-950 p-2 rounded break-all border border-slate-800" aria-label="Session ID">
                             ID: {peerId}
                         </div>
                         <S.ActionButtonsGrid>
                             <button onClick={copyLink} className="flex items-center justify-center py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition" aria-label="Copy Link">
                                 {copied ? <CheckCircleIcon className="w-3 h-3 mr-1 text-emerald-400" /> : <CopyIcon className="w-3 h-3 mr-1" />}
                                 {copied ? t('host.linkCopied') : t('host.copyLink')}
                             </button>
                             <button onClick={() => window.open(`${window.location.pathname}#remote?id=${peerId}`, '_blank')} className="py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/30 transition" aria-label="Open Remote in New Tab">
                                 {t('host.openRemoteTab')}
                             </button>
                         </S.ActionButtonsGrid>
                    </div>
                )}

                <div className="pt-4 border-t border-slate-800">
                     <p className="text-[10px] text-slate-500 leading-relaxed">
                         {t('host.scanInstruction')}
                     </p>
                </div>
            </S.SidebarContainer>
        </S.SidebarWrapper>
    );
});