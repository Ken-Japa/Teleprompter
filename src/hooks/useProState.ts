import { useState, useEffect } from "react";
import { PROMPTER_DEFAULTS, APP_CONSTANTS } from "../config/constants";
import { trackEvent } from "../utils/analytics";

export const useProState = (elapsedTime: number) => {
    const [isPro, setIsPro] = useState<boolean>(
        () => localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS) === "true"
    );
    const [showPaywall, setShowPaywall] = useState<boolean>(false);

    // Dev Helper exposed to window
    useEffect(() => {
        window.togglePro = () => {
            const newState = !isPro;
            setIsPro(newState);
            localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, String(newState));
            window.location.reload();
        };
        window.showPaywallModal = () => {
            setShowPaywall(true);
            trackEvent("paywall_view", { trigger: "manual" });
        };
    }, [isPro, setShowPaywall]);

    // Paywall Timer Logic
    // Trigger Paywall when elapsed time reaches 20 minutes (1200 seconds)
    useEffect(() => {
        if (isPro) return;

        if (!showPaywall && elapsedTime >= APP_CONSTANTS.REDEEM_MODAL_ELAPSED_TIME) {
            setShowPaywall(true);
            trackEvent("paywall_view", { trigger: "timer" });
        }
    }, [isPro, showPaywall, elapsedTime]);

    const unlockPro = async (key: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const normalizedKey = key.trim().toUpperCase();
            // Call the serverless function
            const response = await fetch("https://promptninja.solutionkit.com.br/api/validate-key", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: normalizedKey }),
            });

            const data = await response.json();

            if (data.success) {
                setIsPro(true);
                setShowPaywall(false);
                localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, "true");
                trackEvent("pro_key_redeemed");
                return { success: true };
            } else {
                return { success: false, message: data.message || "Chave inválida ou já utilizada." };
            }
        } catch (error) {
            console.error("Erro na validação:", error);
            return { success: false, message: "Erro de conexão. Tente novamente." };
        }
    };

    return {
        isPro,
        showPaywall,
        setShowPaywall,
        unlockPro,
    };
};
