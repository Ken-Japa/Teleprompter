import { useState, useEffect, useRef, useCallback } from "react";
import { DEFAULT_TEXT } from "../types";

export const useScriptStorage = () => {
 // Initialize from storage or default
 const [text, setText] = useState<string>(() => {
  try {
   return localStorage.getItem("neonprompt_text") || DEFAULT_TEXT;
  } catch (e) {
   return DEFAULT_TEXT;
  }
 });

 const textRef = useRef(text);
 const lastSavedTextRef = useRef(text);

 // Update ref immediately when state changes
 useEffect(() => {
  textRef.current = text;
 }, [text]);

 // Robust Persistence Strategy
 useEffect(() => {
  const performSave = () => {
   if (textRef.current !== lastSavedTextRef.current) {
    try {
     localStorage.setItem("neonprompt_text", textRef.current);
     lastSavedTextRef.current = textRef.current;
    } catch (e) {
     console.error("Failed to save script", e);
    }
   }
  };

  const save = () => {
   // Use requestIdleCallback if available to avoid blocking main thread
   if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(performSave);
   } else {
    setTimeout(performSave, 0);
   }
  };

  const handleVisibility = () => {
   if (document.visibilityState === "hidden") performSave();
  };

  // Save periodically and on events
  const timer = setInterval(save, 30000); // 30s auto-save
  window.addEventListener("beforeunload", performSave);
  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
   clearInterval(timer);
   window.removeEventListener("beforeunload", performSave);
   document.removeEventListener("visibilitychange", handleVisibility);
   performSave(); // Force save on unmount
  };
 }, []);

 const updateText = useCallback((newText: string) => {
  setText(newText);
 }, []);

 return [text, updateText] as const;
};
