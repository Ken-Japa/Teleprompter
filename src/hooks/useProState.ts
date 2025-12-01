import { useState, useEffect, useRef } from "react";
import { PROMPTER_DEFAULTS } from "../config/constants";

export const useProState = (isPlaying: boolean) => {
 const [isPro, setIsPro] = useState<boolean>(() => localStorage.getItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS) === "true");
 const [showPaywall, setShowPaywall] = useState<boolean>(false);

 // Use refs to track timing without triggering re-renders
 const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  };
 }, [isPro, setShowPaywall]);

 // Paywall Timer Logic - Optimized
 // We only trigger a re-render when the time is UP, not every second.
 useEffect(() => {
  if (isPro) return;
  // O timer só deve iniciar se a apresentação estiver em play
  if (!isPlaying) {
   if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
   }
   return;
  }

  // Start 5 minute timer (300000ms)
  if (!timerRef.current && !showPaywall) {
   timerRef.current = setTimeout(() => {
    setShowPaywall(true);
   }, 300 * 1000);
  }

  return () => {
   if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
   }
  };
 }, [isPro, showPaywall, isPlaying]);

 const unlockPro = async (key: string): Promise<{ success: boolean; message?: string }> => {
  try {
   // Call the serverless function
   const response = await fetch("/api/validate-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
   });

   const data = await response.json();

   if (data.success) {
    setIsPro(true);
    setShowPaywall(false);
    localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, "true");
    if (timerRef.current) clearTimeout(timerRef.current);
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
