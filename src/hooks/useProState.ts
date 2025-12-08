import { useState, useEffect } from "react";
import { PROMPTER_DEFAULTS, APP_CONSTANTS } from "../config/constants";

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
  };
 }, [isPro, setShowPaywall]);

 // Paywall Timer Logic
 // Trigger Paywall when elapsed time reaches 20 minutes (1200 seconds)
 useEffect(() => {
  if (isPro) return;

  if (!showPaywall && elapsedTime >= APP_CONSTANTS.REDEEM_MODAL_ELAPSED_TIME) {
   setShowPaywall(true);
  }
 }, [isPro, showPaywall, elapsedTime]);

 const unlockPro = async (key: string): Promise<{ success: boolean; message?: string }> => {
  try {
   // Call the serverless function
   const response = await fetch("https://promptninja.solutionkit.com.br/api/validate-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
   });

   const data = await response.json();

   if (data.success) {
    setIsPro(true);
    setShowPaywall(false);
    localStorage.setItem(PROMPTER_DEFAULTS.STORAGE_KEYS.PRO_STATUS, "true");
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
