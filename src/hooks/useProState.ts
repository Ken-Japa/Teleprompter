import { useState, useEffect, useRef } from "react";
import { ConnectionStatus } from "../types";

export const useProState = (connectionStatus: ConnectionStatus) => {
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
 }, [isPro]);

 // Paywall Timer Logic - Optimized
 // We only trigger a re-render when the time is UP, not every second.
 useEffect(() => {
  if (isPro) return;
  if (connectionStatus !== ConnectionStatus.CONNECTED) {
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
 }, [connectionStatus, isPro, showPaywall]);

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
