import React, { useState } from "react";
import * as S from "../components/ui/Styled";
import { PROMPTER_DEFAULTS } from "../config/constants";
import { CheckCircleIcon, CrownIcon, RocketIcon } from "../components/ui/Icons";

export const ThankYou: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
    const [unlockKey, setUnlockKey] = useState("");
    const [status, setStatus] = useState<"idle" | "validating" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUnlock = async () => {
        if (!unlockKey.trim()) return;

        setStatus("validating");
        setErrorMessage("");

        try {
            const response = await fetch("https://promptninja.solutionkit.com.br/api/validate-key", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: unlockKey }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, "true");
                // Optional: trigger a reload if needed by other components, but onLaunch should handle navigation
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Código inválido ou já utilizado.");
            }
        } catch (error) {
            console.error("Erro na validação:", error);
            setStatus("error");
            setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                        <CheckCircleIcon className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Obrigado pela compra!
                    </h1>
                    <p className="text-lg text-slate-300">
                        Seu pagamento foi confirmado com sucesso. Agora você está a um passo de desbloquear todo o poder do PromptNinja Pro.
                    </p>
                </div>

                {status === "success" ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-fade-in">
                        <div className="flex justify-center mb-4">
                            <CrownIcon className="w-16 h-16 text-yellow-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">PromptNinja Pro Ativado!</h2>
                        <p className="text-slate-300 mb-6">
                            Sua conta foi atualizada com sucesso. Aproveite todos os recursos ilimitados.
                        </p>
                        <S.PrimaryButton
                            onClick={() => {
                                onLaunch();
                                // Force reload to ensure pro state is picked up everywhere if needed
                                window.location.href = "/#app";
                                window.location.reload();
                            }}
                            className="w-full py-4 text-lg"
                        >
                            <RocketIcon className="w-5 h-5 mr-2" />
                            Começar a Usar Agora
                        </S.PrimaryButton>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <CrownIcon className="w-6 h-6 text-brand-400 mr-2" />
                                Ativar sua licença
                            </h3>
                            <p className="text-slate-400 mb-6 text-sm">
                                Insira o código de ativação que você recebeu no seu e-mail (ou na página de confirmação da Kiwify).
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-slate-300 mb-2">
                                        Código de Ativação
                                    </label>
                                    <input
                                        id="code"
                                        type="text"
                                        placeholder="INSIRA SEU CÓDIGO AQUI"
                                        value={unlockKey}
                                        onChange={(e) => setUnlockKey(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-center font-mono tracking-widest uppercase text-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
                                    />
                                </div>

                                {status === "error" && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                        {errorMessage}
                                    </div>
                                )}

                                <S.PrimaryButton
                                    onClick={handleUnlock}
                                    disabled={status === "validating" || !unlockKey.trim()}
                                    className={`w-full py-4 text-lg ${status === "validating" ? "opacity-70 cursor-wait" : ""}`}
                                >
                                    {status === "validating" ? "Validando..." : "Ativar PromptNinja Pro"}
                                </S.PrimaryButton>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={onLaunch}
                                className="text-slate-500 hover:text-white text-sm transition-colors"
                            >
                                Pular ativação e ir para o App Gratuito &rarr;
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} PromptNinja
            </div>
        </div>
    );
};
