import { useState, useEffect } from "react";
import { PROMPTER_DEFAULTS, APP_CONSTANTS } from "../config/constants";
import { trackEvent, trackTrialActivation } from "../utils/analytics";
import { setSharedCookie, getSharedCookie, SHARED_COOKIE_KEYS } from "../utils/cookie";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-client";

export const useProState = (elapsedTime: number) => {
    // Auth Context Integration
    const { isPro: isAccountPro, user } = useAuth();

    const [isLocalPro, setIsLocalPro] = useState<boolean>(() => {
        const hasLicense = localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS) === "true";
        if (hasLicense) return true;

        // Check shared cookie
        const sharedStatus = getSharedCookie(SHARED_COOKIE_KEYS.PRO_STATUS);
        if (sharedStatus === "true") {
            localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, "true");
            return true;
        }

        // Check trial
        let trialData = localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL);
        if (!trialData) {
            trialData = getSharedCookie(SHARED_COOKIE_KEYS.PRO_TRIAL) || null;
            if (trialData) localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL, trialData);
        }

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

    // The effective Pro state is true if EITHER Account is Pro OR Local is Pro
    const isPro = isAccountPro || isLocalPro;

    const [trialEndTime, setTrialEndTime] = useState<number | null>(() => {
        let trialData = localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL);
        if (!trialData) trialData = getSharedCookie(SHARED_COOKIE_KEYS.PRO_TRIAL) || null;

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

    // Check for trial activation from landing page or server
    useEffect(() => {
        const checkTrialSync = async () => {
            if (isPro) return;

            const deviceId = getDeviceId();

            // 1. Check if we should start trial from landing page
            const shouldStartTrial = localStorage.getItem("PROMPTNINJA_START_TRIAL") === "true";
            if (shouldStartTrial) {
                startTrial();
                localStorage.removeItem("PROMPTNINJA_START_TRIAL");
                return;
            }

            // 2. If no local trial, check server (for re-installs/cleared cache)
            if (!trialEndTime) {
                try {
                    const response = await fetch("/api/sync-trial", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ deviceId, action: "get" }),
                    });
                    const data = await response.json();
                    if (data.success && data.trialData) {
                        try {
                            const endTime = decryptTrialData(data.trialData);
                            if (endTime > Date.now()) {
                                localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL, data.trialData);
                                setSharedCookie(SHARED_COOKIE_KEYS.PRO_TRIAL, data.trialData, 1);
                                setTrialEndTime(endTime);
                                setIsLocalPro(true);
                            }
                        } catch (e) { /* ignore */ }
                    }
                } catch (e) { /* silent fail */ }
            }
        };

        checkTrialSync();
    }, [isPro, trialEndTime]);

    const startTrial = async () => {
        const endTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        const encrypted = encryptTrialData(endTime);
        const deviceId = getDeviceId();

        // Save locally
        localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_TRIAL, encrypted);
        setSharedCookie(SHARED_COOKIE_KEYS.PRO_TRIAL, encrypted, 1);
        setTrialEndTime(endTime);
        setIsLocalPro(true);
        trackTrialActivation();

        // Sync with server (background)
        fetch("/api/sync-trial", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceId, action: "start", trialData: encrypted }),
        }).catch(err => console.error("Error syncing trial:", err));
    };

    const isTrialActive = trialEndTime ? trialEndTime > Date.now() : false;

    // Dev Helper exposed to window
    useEffect(() => {
        window.togglePro = () => {
            const newState = !isLocalPro;
            setIsLocalPro(newState);
            localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, String(newState));
            setSharedCookie(SHARED_COOKIE_KEYS.PRO_STATUS, String(newState));
            window.location.reload();
        };
        window.showPaywallModal = () => {
            setShowPaywall(true);
            trackEvent("paywall_view", { trigger: "manual" });
        };
    }, [isLocalPro, setShowPaywall]);

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
                setIsLocalPro(false);
                setShowPaywall(true);
            }
        };

        const interval = setInterval(checkExpiration, 3600000); // Check every 1 hour
        return () => clearInterval(interval);
    }, [isTrialActive, trialEndTime]);

    const fetchWithRetry = async (url: string, options: RequestInit, retries = 3): Promise<Response> => {
        try {
            const response = await fetch(url, options);
            if (!response.ok && retries > 0) throw new Error("Network response was not ok");
            return response;
        } catch (e) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1s before retry
                return fetchWithRetry(url, options, retries - 1);
            }
            throw e;
        }
    };

    const getDeviceId = () => {
        let id = localStorage.getItem("PROMPTNINJA_DEVICE_ID");
        if (!id) {
            id = crypto.randomUUID?.() || Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem("PROMPTNINJA_DEVICE_ID", id);
        }
        return id;
    };

    const unlockPro = async (key: string): Promise<{ success: boolean; message?: string; reason?: string }> => {
        const normalizedKey = key.trim();
        const deviceId = getDeviceId();

        try {
            const apiEndpoint = "/api/validate-key";
            const response = await fetchWithRetry(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: normalizedKey, deviceId }),
            });

            const data = await response.json();

            if (data.success) {
                setIsLocalPro(true);
                setShowPaywall(false);
                localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, "true");
                setSharedCookie(SHARED_COOKIE_KEYS.PRO_STATUS, "true");
                trackEvent("pro_key_redeemed", { key: normalizedKey, deviceId });

                // If user is logged in, sync this activation to their account!
                if (user) {
                    try {
                        const userRef = doc(db, "users", user.uid);
                        await updateDoc(userRef, { isPro: true, proKey: normalizedKey });
                    } catch (e) {
                        console.error("Failed to sync Pro status to account", e);
                    }
                }

                return { success: true };
            } else {
                // Log failure to Sentry for debugging
                import("@sentry/react").then(Sentry => {
                    Sentry.captureMessage(`Key validation failed: ${data.reason}`, {
                        level: "warning",
                        extra: { key: normalizedKey, deviceId, reason: data.reason, message: data.message }
                    });
                });

                return {
                    success: false,
                    message: data.message || "Chave inválida ou já utilizada.",
                    reason: data.reason
                };
            }
        } catch (error) {
            console.error("Erro na validação:", error);
            import("@sentry/react").then(Sentry => {
                Sentry.captureException(error, {
                    extra: { key: normalizedKey, deviceId, context: "unlockPro_fetch_error" }
                });
            });
            return { success: false, message: "Erro de conexão. Verifique sua internet e tente novamente.", reason: "network_error" };
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
