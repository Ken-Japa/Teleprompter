import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { SpeechRecognitionEvent } from "../types";
import { parseTextToSentences } from "../utils/textParser";
import { logger } from "../utils/logger";
import { findBestMatch } from "../utils/stringSimilarity";
import { useTranslation } from "./useTranslation";

export const useVoiceControl = (text: string, isPro: boolean) => {
  const { lang } = useTranslation();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);
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
    recognition.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';

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

      let cleanTranscript = interimTranscript.toLowerCase();
      // Apply the same cleaning logic as the parser to ensure matching works
      cleanTranscript = cleanTranscript
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .replace(/\s+/g, " ")
        .trim();

      // Debug: Trace what is happening
      console.log(`[Voice] Heard: "${cleanTranscript}"`);

      // Increased min length to 4 to avoid false positives with common short words (que, de, para, etc)
      if (cleanTranscript.length < 4) {
          console.log(`[Voice] Ignored (too short)`);
          return;
      }

      // Fuzzy Search Strategy
      // 1. Try to find fuzzy match starting from last known position
      // We allow up to 40% error (0.4) to handle bad recognition like "PromptNinja" -> "próprio ninja"
      let match = findBestMatch(fullCleanText, cleanTranscript, lastMatchIndexRef.current, 1000, 0.4);
      
      if (match) {
        console.log(`[Voice] Fuzzy Match from ${lastMatchIndexRef.current}: Found at ${match.index} (dist: ${match.distance}, ratio: ${match.ratio.toFixed(2)})`);
      } else {
        console.log(`[Voice] No local fuzzy match found`);
      }
      
      // Fallback logic
      if (!match && lastMatchIndexRef.current > 0) {
        // Fallback: search from beginning if we lost track
        const fallbackMatch = findBestMatch(fullCleanText, cleanTranscript, 0, 2000, 0.4);
        
        if (fallbackMatch) {
           console.log(`[Voice] Fallback fuzzy search: Found at ${fallbackMatch.index} (dist: ${fallbackMatch.distance})`);
           
           // Safety check: Only jump back to beginning if it's not a "huge" jump backwards
           // UNLESS the match is very good (ratio < 0.2) which means user definitely restarted reading
           if ((lastMatchIndexRef.current - fallbackMatch.index) < 200 || fallbackMatch.ratio < 0.2) {
               match = fallbackMatch;
               console.log(`[Voice] Fallback accepted`);
           } else {
               console.log(`[Voice] Fallback rejected (too far back and not confident enough)`);
           }
        }
      }

      if (match) {
        lastMatchIndexRef.current = match.index;
        
        // Calculate the end index of the match to determine current reading position
        // We use the length of what was recognized to project where we are in the text
        const matchEndIndex = match.index + cleanTranscript.length;
        
        // Clamp to valid range
        const lookupIndex = Math.min(matchEndIndex, charToSentenceMap.length - 1);

        if (lookupIndex >= 0 && lookupIndex < charToSentenceMap.length) {
          const sentenceId = charToSentenceMap[lookupIndex];
          
          // Calculate progress within the sentence for smooth scrolling
          // Assumes sentences array is ordered by ID (which it is from parser)
          const sentence = sentences[sentenceId];
          if (sentence && typeof sentence.startIndex === 'number') {
             const relativeIndex = lookupIndex - sentence.startIndex;
             const len = sentence.cleanContent.length;
             if (len > 0) {
                 const p = Math.min(1, Math.max(0, relativeIndex / len));
                 setVoiceProgress(p);
             } else {
                 setVoiceProgress(0);
             }
          }

          // Only update if we moved forward or it's a definitive jump
          // This prevents jitter if the match fluctuates slightly between sentences
          if (sentenceId !== activeSentenceIndex) {
             console.log(`[Voice] Matched Sentence ID: ${sentenceId} (Index: ${lookupIndex})`);
             setActiveSentenceIndex(sentenceId);
          }
        }
      } else {
          console.log(`[Voice] No match found (fuzzy)`);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      logger.error("Voice start error", { error: e as Error });
    }
  }, [fullCleanText, charToSentenceMap, lang]);

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
  voiceProgress,
  sentences,
  voiceApiSupported,
  voiceApiError,
 };
};
