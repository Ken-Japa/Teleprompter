import React, { useState } from "react";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { CheckCircleIcon, WifiOffIcon } from "../ui/Icons";
import { OBSConfig, OBSStatus } from "../../hooks/useOBS";

interface OBSConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: OBSConfig;
    status: OBSStatus;
    onSaveConfig: (config: OBSConfig) => void;
    onConnect: () => Promise<void>;
    onDisconnect: () => void;
}

export const OBSConfigModal: React.FC<OBSConfigModalProps> = ({
    isOpen,
    onClose,
    config,
    status,
    onSaveConfig,
    onConnect,
    onDisconnect,
}) => {
    const { t } = useTranslation();
    const [localConfig, setLocalConfig] = useState(config);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleConnect = async () => {
        setIsLoading(true);
        setError(null);
        try {
            onSaveConfig(localConfig);
            await onConnect();
        } catch (err) {
            setError(t("obs.errorConnection") || "Failed to connect to OBS. Check if WebSocket is enabled.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.Modal isOpen={isOpen} onClose={onClose} title={t("obs.title") || "OBS Studio Integration (PRO)"}>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl flex items-center justify-center ${status.isConnected ? "bg-green-500/20 text-green-400" : "bg-slate-800 text-slate-500"}`}>
                            {status.isConnected ? (
                                <CheckCircleIcon className="w-6 h-6" />
                            ) : (
                                <WifiOffIcon className="w-6 h-6" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-white">OBS Studio</p>
                            <p className="text-sm text-slate-400">
                                {status.isConnected ? t("obs.statusConnected") || "Connected" : t("obs.statusDisconnected") || "Not Connected"}
                            </p>
                        </div>
                    </div>
                    {status.isConnected ? (
                        <button onClick={onDisconnect} className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1">
                            {t("obs.disconnect") || "Disconnect"}
                        </button>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isLoading}
                            className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                        >
                            {isLoading ? t("common.connecting") || "Connecting..." : t("obs.connect") || "Connect"}
                        </button>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">{t("obs.host") || "Host"}</label>
                        <input
                            type="text"
                            value={localConfig.host}
                            onChange={(e) => setLocalConfig({ ...localConfig, host: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-500 outline-none"
                            placeholder="localhost"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                            {localConfig.host === 'simulation' ? "🚀 Modo Simulação Ativo" : "Dica: Use 'simulation' para testar sem o OBS instalado."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">{t("obs.port") || "Port"}</label>
                        <input
                            type="number"
                            value={localConfig.port}
                            onChange={(e) => setLocalConfig({ ...localConfig, port: parseInt(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-500 outline-none"
                            placeholder="4455"
                        />
                    </div>
                    <div className="col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">{t("obs.password") || "Password"}</label>
                        <input
                            type="password"
                            value={localConfig.password}
                            onChange={(e) => setLocalConfig({ ...localConfig, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-500 outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold text-slate-300">{t("obs.automation") || "Automation"}</h4>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-slate-400 group-hover:text-white transition-colors">{t("obs.autoRecord") || "Auto-record on Play"}</span>
                        <input
                            type="checkbox"
                            checked={localConfig.autoRecordOnPlay}
                            onChange={(e) => setLocalConfig({ ...localConfig, autoRecordOnPlay: e.target.checked })}
                            className="w-5 h-5 accent-brand-500"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-slate-400 group-hover:text-white transition-colors">{t("obs.autoPlay") || "Auto-play on OBS Record"}</span>
                        <input
                            type="checkbox"
                            checked={localConfig.autoPlayOnOBSRecord}
                            onChange={(e) => setLocalConfig({ ...localConfig, autoPlayOnOBSRecord: e.target.checked })}
                            className="w-5 h-5 accent-brand-500"
                        />
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                    >
                        {t("host.paywall.close") || "Close"}
                    </button>
                </div>
            </div>
        </S.Modal>
    );
};
