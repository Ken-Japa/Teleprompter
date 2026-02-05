
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../ui/styles/Modal";

import { useTranslation } from "../../hooks/useTranslation";
import { CheckCircleIcon, CopyIcon } from "../ui/Icons";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  peerId: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, peerId }) => {
  const { t } = useTranslation();
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Clean up previous QR code if any
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
    }

    if (!peerId) return;

    let isMounted = true;

    const generate = async () => {
      try {
        // Double check if component is still mounted and refs are valid
        if (!isMounted || !qrRef.current) return;

        const QRCode = (await import('qrcode')).default;

        await QRCode.toCanvas(qrRef.current, `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`, {
          width: 512,
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

    // Small timeout to ensure DOM is ready and layout is calculated
    const timeoutId = setTimeout(generate, 50);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isOpen, peerId]);

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
    <Modal isOpen={isOpen} onClose={onClose} title={t("host.remoteConnect")}>
      <div className="flex flex-col items-center justify-center space-y-6 pt-2 pb-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl w-full max-w-[280px] aspect-square flex items-center justify-center overflow-hidden">
          {!peerId ? (
            <div className="animate-pulse text-slate-400 font-mono text-sm">{t("host.generatingId")}</div>
          ) : (
            <canvas ref={qrRef} className="max-w-full max-h-full block object-contain" />
          )}
        </div>

        {peerId && (
          <div className="w-full max-w-xs space-y-3">
            <div className="text-xs text-slate-500 font-mono bg-slate-950 p-2 rounded break-all border border-slate-200 text-center select-all">
              ID: {peerId}
            </div>
            <button
              onClick={copyLink}
              className="w-full flex items-center justify-center py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-lg border border-slate-700 transition active:scale-95"
            >
              {copied ? (
                <CheckCircleIcon className="w-4 h-4 mr-2 text-emerald-400" />
              ) : (
                <CopyIcon className="w-4 h-4 mr-2" />
              )}
              {copied ? t("host.linkCopied") : t("host.copyLink")}
            </button>
          </div>
        )}

        <p className="text-center text-slate-400 max-w-xs text-sm">
          {t("host.scanInstruction")}
        </p>
      </div>
    </Modal>
  );
};
