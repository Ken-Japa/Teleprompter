
import React, { useEffect, useRef } from "react";
import { Modal } from "../ui/styles/Modal";
import { loadQRCodeLibrary } from "../../utils/qr";
import { useTranslation } from "../../hooks/useTranslation";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  peerId: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, peerId }) => {
  const { t } = useTranslation();
  const qrRef = useRef<HTMLDivElement>(null);

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
        await loadQRCodeLibrary();
        
        // Double check if component is still mounted and refs are valid
        if (!isMounted || !qrRef.current || !window.QRCode) return;

        // Clear again just in case
        qrRef.current.innerHTML = "";
        
        const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#remote?id=${peerId}`;
        
        new window.QRCode(qrRef.current, {
          text: url,
          width: 256,
          height: 256,
          colorDark: "#020617",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.L,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("host.remoteConnect")}>
      <div className="flex flex-col items-center justify-center space-y-6 p-4">
        <div className="bg-white p-4 rounded-2xl shadow-xl min-h-[256px] min-w-[256px] flex items-center justify-center">
            {!peerId ? (
                <div className="animate-pulse text-slate-400 font-mono text-sm">{t("host.generatingId")}</div>
            ) : (
                <div ref={qrRef} style={{ width: 256, height: 256 }} />
            )}
        </div>
        <p className="text-center text-slate-400 max-w-xs">
          {t("host.scanInstruction")}
        </p>
      </div>
    </Modal>
  );
};
