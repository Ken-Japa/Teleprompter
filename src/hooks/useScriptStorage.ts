import { useState, useEffect, useRef, useCallback } from "react";
import { logger } from "../utils/logger";
import { useTranslation } from "../hooks/useTranslation";

export const useScriptStorage = () => {
 const { t, lang } = useTranslation();

 // Initialize from storage or default
 const [text, setText] = useState<string>(() => {
  try {
   const storedText = localStorage.getItem("neonprompt_text");
   const defaultTranslatedText = t("host.defaultText");
   return storedText || defaultTranslatedText;
  } catch (e) {
   return t("host.defaultText");
  }
 });

 // Update text when language changes, only if it's still the default text
 useEffect(() => {
  const defaultTranslatedText = t("host.defaultText");
  const storedText = localStorage.getItem("neonprompt_text");

  // Only update if the current text is the default text for the previous language
  // or if there's no stored text and the language changes
  if (!storedText || storedText === t("host.defaultText", { lng: lang })) {
   setText(defaultTranslatedText);
  }
 }, [lang, t]);

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
     logger.error("Failed to save script", { error: e as Error });
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
