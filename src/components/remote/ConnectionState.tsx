import React from "react";
import { ConnectionStatus } from "../../types";
import * as S from "../ui/Styled";
import { RefreshIcon, WifiOffIcon } from "../ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";

interface ConnectionStateProps {
 status: ConnectionStatus;
 hostId: string;
}

export const ConnectionState: React.FC<ConnectionStateProps> = ({ status, hostId }) => {
 const { t } = useTranslation();

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
   <S.SecondaryButton onClick={() => window.location.reload()}>{t("host.controls.reset")}</S.SecondaryButton>
  </div>
 );
};
