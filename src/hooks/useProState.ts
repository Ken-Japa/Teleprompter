import { useState, useEffect } from "react";
import { PROMPTER_DEFAULTS, APP_CONSTANTS } from "../config/constants";
import { trackEvent, trackTrialActivation } from "../utils/analytics";

export const useProState = (elapsedTime: number) => {
    const [isPro, setIsPro] = useState<boolean>(() => {
        const hasLicense = localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS) === "true";
        if (hasLicense) return true;

        // Check trial
        const trialData = localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL);
        if (trialData) {
            try {
                const endTime = decryptTrialData(trialData);
                return endTime > Date.now();
            } catch (e) {
                return false;
            }
        }
        return false;
    });

    const [trialEndTime, setTrialEndTime] = useState<number | null>(() => {
        const trialData = localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL);
        if (trialData) {
            try {
                return decryptTrialData(trialData);
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    const [showPaywall, setShowPaywall] = useState<boolean>(false);

    // Encryption Helpers (Simple XOR + Base64)
    function encryptTrialData(endTime: number): string {
        const secret = "ninja_key_2024";
        const str = endTime.toString();
        let result = "";
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
        }
        return btoa(result);
    }

    function decryptTrialData(data: string): number {
        const secret = "ninja_key_2024";
        const str = atob(data);
        let result = "";
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
        }
        return parseInt(result);
    }

    const startTrial = () => {
        const endTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        const encrypted = encryptTrialData(endTime);
        localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL, encrypted);
        setTrialEndTime(endTime);
        setIsPro(true);
        trackTrialActivation();
    };

    const isTrialActive = trialEndTime ? trialEndTime > Date.now() : false;

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

    // Trial Expiration Monitoring
    useEffect(() => {
        if (!isTrialActive) return;

        const checkExpiration = () => {
            if (trialEndTime && Date.now() > trialEndTime) {
                setIsPro(false);
                setShowPaywall(true);
            }
        };

        const interval = setInterval(checkExpiration, 3600000); // Check every 1 hour
        return () => clearInterval(interval);
    }, [isTrialActive, trialEndTime]);

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
        isTrialActive,
        trialEndTime,
        startTrial,
        showPaywall,
        setShowPaywall,
        unlockPro,
        hasTrialExpired: !isTrialActive && trialEndTime && trialEndTime < Date.now(),
    };
};
