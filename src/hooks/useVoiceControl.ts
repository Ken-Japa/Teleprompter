import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { SpeechRecognitionEvent } from "../types";
import { parseTextToSentences } from "../utils/textParser";
import { logger } from "../utils/logger";

export const useVoiceControl = (text: string, isPro: boolean) => {
 const [isListening, setIsListening] = useState<boolean>(false);
 const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
 const [voiceApiSupported, setVoiceApiSupported] = useState<boolean>(true);
 const [voiceApiError, setVoiceApiError] = useState<string | null>(null);

 const recognitionRef = useRef<any>(null);
 const lastMatchIndexRef = useRef<number>(0);
 const lastStartTimeRef = useRef<number>(0);

 // Resilience: Track if user INTENDED to stop. If false and 'end' event fires, we restart.
 const intentionallyStoppedRef = useRef<boolean>(false);

 // Use extracted parser logic
 const { sentences, fullCleanText, charToSentenceMap } = useMemo(() => {
  return parseTextToSentences(text);
 }, [text]);

 useEffect(() => {
  lastMatchIndexRef.current = 0;
 }, [fullCleanText]);

 useEffect(() => {
  return () => {
   intentionallyStoppedRef.current = true;
   if (recognitionRef.current) {
    try {
     recognitionRef.current.stop();
     recognitionRef.current.onend = null;
     recognitionRef.current.onresult = null;
    } catch (e) {}
   }
  };
 }, []);

 // Memoized start function to be safe for recursion in onend
 const startRecognitionInstance = useCallback(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
   setVoiceApiSupported(false);
   setVoiceApiError("voice.notSupported"); // Key for translation
   return;
  }

  // Abort previous to ensure clean state
  if (recognitionRef.current) {
   try {
    recognitionRef.current.abort();
   } catch (e) {}
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "pt-BR";

  recognition.onstart = () => {
   setIsListening(true);
   lastStartTimeRef.current = Date.now();
  };

  recognition.onend = () => {
   // CRITICAL OPTIMIZATION: Browser stopped it, but did user want that?
   // Infinite Loop Protection: If it stopped less than 100ms after start, assume error (permission denied).
   const duration = Date.now() - lastStartTimeRef.current;

   if (!intentionallyStoppedRef.current && duration > 100) {
    // Restart immediately
    logger.info("Voice: Auto-restart triggered");
    try {
     recognition.start();
    } catch (e) {}
   } else {
    setIsListening(false);
   }
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
   let interimTranscript = "";
   for (let i = event.resultIndex; i < event.results.length; ++i) {
    interimTranscript += event.results[i][0].transcript;
   }

   const cleanTranscript = interimTranscript.toLowerCase().trim();
   if (cleanTranscript.length < 3) return;

   let absoluteIndex = fullCleanText.indexOf(cleanTranscript, lastMatchIndexRef.current);
   if (absoluteIndex === -1 && lastMatchIndexRef.current > 0) {
    // Fallback: search from beginning if we lost track
    absoluteIndex = fullCleanText.indexOf(cleanTranscript, 0);
   }

   if (absoluteIndex !== -1) {
    lastMatchIndexRef.current = absoluteIndex;
    if (absoluteIndex < charToSentenceMap.length) {
     const sentenceId = charToSentenceMap[absoluteIndex];
     setActiveSentenceIndex(sentenceId);
    }
   }
  };

  recognitionRef.current = recognition;
  try {
   recognition.start();
  } catch (e) {
   logger.error("Voice start error", { error: e as Error });
  }
 }, [fullCleanText, charToSentenceMap]);

 const startListening = useCallback(() => {
  if (!isPro) return;
  intentionallyStoppedRef.current = false;
  startRecognitionInstance();
 }, [isPro, startRecognitionInstance]);

 const stopListening = useCallback(() => {
  intentionallyStoppedRef.current = true;
  if (recognitionRef.current) {
   try {
    recognitionRef.current.stop();
   } catch (e) {}
  }
  setIsListening(false);
 }, []);

 const resetVoice = useCallback(() => {
  stopListening();
  lastMatchIndexRef.current = 0;
  setActiveSentenceIndex(-1);
 }, [stopListening]);

 return {
  isListening,
  startListening,
  stopListening,
  resetVoice,
  activeSentenceIndex,
  setActiveSentenceIndex,
  sentences,
  voiceApiSupported,
  voiceApiError,
 };
};
