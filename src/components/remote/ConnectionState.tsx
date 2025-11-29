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
 const html5QrcodeScannerRef = useRef<any>(null);

 const startScanner = async () => {
  setIsScanning(true);
  try {
      await loadHtml5QrcodeLibrary();
      // Short delay to ensure DOM element is ready and library loaded
      setTimeout(() => {
          if (window.Html5QrcodeScanner) {
               const scanner = new window.Html5QrcodeScanner(
                  "reader",
                  { fps: 10, qrbox: { width: 250, height: 250 } },
                  false
              );
              scanner.render(onScanSuccess, onScanFailure);
              html5QrcodeScannerRef.current = scanner;
          }
      }, 100);
  } catch (e) {
      console.error(e);
      setIsScanning(false);
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
    
    if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(console.error);
    }
    setIsScanning(false);
    
    // Force update hash and reload
    window.location.hash = `remote?id=${newId}`;
    window.location.reload();
 };

 const onScanFailure = (error: any) => {
    // Only log if needed, usually it's just "no code found"
 };
 
 const stopScanner = () => {
    if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(console.error);
    }
    setIsScanning(false);
 };
 
 // Cleanup on unmount
 useEffect(() => {
     return () => {
         if (html5QrcodeScannerRef.current) {
             html5QrcodeScannerRef.current.clear().catch(console.error);
         }
     };
 }, []);

 if (isScanning) {
     return (
         <div className="flex-1 flex flex-col items-center justify-center p-4 bg-black z-50 absolute inset-0 animate-fadeIn">
             <h3 className="text-white font-bold mb-4">Scan Host QR Code</h3>
             <div id="reader" className="w-full max-w-sm bg-white rounded-lg overflow-hidden"></div>
             <S.SecondaryButton onClick={stopScanner} className="mt-8 !bg-red-500/20 !text-red-400 !border-red-500/30">
                 {t("remote.stop") || "Cancel"}
             </S.SecondaryButton>
         </div>
     );
 }

 return (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-fadeIn">
   <div
    className={`p-6 rounded-full ${status === ConnectionStatus.ERROR ? "bg-red-500/10 text-red-500" : "bg-indigo-500/10 text-indigo-500 animate-pulse"}`}
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
