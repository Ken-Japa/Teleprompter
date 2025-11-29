import { useState, useEffect, useRef } from "react";
import { ConnectionStatus } from "../types";

export const useProState = (connectionStatus: ConnectionStatus, isPlaying: boolean) => {
 const [isPro, setIsPro] = useState<boolean>(() => localStorage.getItem("promptninja_pro") === "true");
 const [showPaywall, setShowPaywall] = useState<boolean>(false);

 // Use refs to track timing without triggering re-renders
 const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

 // Dev Helper exposed to window
 useEffect(() => {
  window.togglePro = () => {
   const newState = !isPro;
   setIsPro(newState);
   localStorage.setItem("promptninja_pro", String(newState));
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
  // O timer só deve iniciar se estiver conectado E a apresentação estiver em play
  if (connectionStatus !== ConnectionStatus.CONNECTED || !isPlaying) {
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
 }, [connectionStatus, isPro, showPaywall, isPlaying]);

 const unlockPro = (key: string): boolean => {
  if (key === "PRO-NINJA-2025") {
   setIsPro(true);
   setShowPaywall(false);
   localStorage.setItem("promptninja_pro", "true");
   if (timerRef.current) clearTimeout(timerRef.current);
   return true;
  }
  return false;
 };

 return {
  isPro,
  showPaywall,
  setShowPaywall,
  unlockPro,
 };
};
