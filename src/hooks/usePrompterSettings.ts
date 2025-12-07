import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Theme, PrompterSettings, VoiceControlMode, RecordingMode } from "../types";
import { PROMPTER_DEFAULTS } from "../config/constants";

export type { PrompterSettings }; // Re-export type

export interface PrompterActions {
 setFontSize: (val: number | ((v: number) => number)) => void;
 setMargin: (val: number | ((v: number) => number)) => void;
 setIsMirrored: (val: boolean) => void;
 setTheme: (val: Theme | ((v: Theme) => Theme)) => void;
 setIsUpperCase: (val: boolean) => void;
 setIsFocusMode: (val: boolean) => void;
 setIsFlipVertical: (val: boolean) => void;
 setVoiceControlMode: (val: VoiceControlMode) => void;
 setRecordingMode: (val: RecordingMode) => void;
 cycleTheme: () => void;
 toggleChroma: () => void;
}

export const usePrompterSettings = (isPro: boolean) => {
 // UI State - Persistent
 const [fontSize, setFontSize] = useLocalStorage<number>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.FONT_SIZE,
  PROMPTER_DEFAULTS.FONT_SIZE
 );
 const [margin, setMargin] = useLocalStorage<number>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.MARGIN,
  PROMPTER_DEFAULTS.MARGIN
 );
 const [isMirrored, setIsMirrored] = useLocalStorage<boolean>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.MIRROR,
  PROMPTER_DEFAULTS.IS_MIRRORED
 );
 const [theme, setTheme] = useLocalStorage<Theme>(PROMPTER_DEFAULTS.STORAGE_KEYS.THEME, Theme.DEFAULT);
 const [isUpperCase, setIsUpperCase] = useLocalStorage<boolean>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.CAPS,
  PROMPTER_DEFAULTS.IS_UPPERCASE
 );
 const [isFocusMode, setIsFocusMode] = useLocalStorage<boolean>(PROMPTER_DEFAULTS.STORAGE_KEYS.FOCUS, isPro);
 const [isFlipVertical, setIsFlipVertical] = useLocalStorage<boolean>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.FLIP_VERTICAL,
  PROMPTER_DEFAULTS.IS_FLIP_VERTICAL
 );
 const [voiceControlMode, setVoiceControlMode] = useLocalStorage<VoiceControlMode>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.VOICE_MODE,
  "host"
 );
 const [recordingMode, setRecordingMode] = useLocalStorage<RecordingMode>(
  PROMPTER_DEFAULTS.STORAGE_KEYS.RECORDING_MODE,
  "host"
 );

 const cycleTheme = useCallback(() => {
  const themes = PROMPTER_DEFAULTS.THEME_ORDER;
  setTheme((prev) => {
   const index = themes.indexOf(prev);
   if (index === -1) return themes[0];
   return themes[(index + 1) % themes.length];
  });
 }, [setTheme]);

 const toggleChroma = useCallback(() => {
  const chromaThemes = PROMPTER_DEFAULTS.CHROMA_THEMES;
  setTheme((prev) => {
   const index = chromaThemes.indexOf(prev);
   // If not currently in a chroma theme, switch to first chroma (Green)
   if (index === -1) return chromaThemes[0];
   // If in last chroma theme (Blue), switch back to Default (Standard)
   if (index === chromaThemes.length - 1) return Theme.DEFAULT;
   // Otherwise cycle through chroma themes
   return chromaThemes[index + 1];
  });
 }, [setTheme]);

 const settings: PrompterSettings = {
  fontSize,
  margin,
  isMirrored,
  theme,
  isUpperCase,
  isFocusMode,
  isFlipVertical,
  voiceControlMode,
  recordingMode,
 };

 const actions: PrompterActions = {
  setFontSize,
  setMargin,
  setIsMirrored,
  setTheme,
  setIsUpperCase,
  setIsFocusMode,
  setIsFlipVertical,
  setVoiceControlMode,
  setRecordingMode,
  cycleTheme,
  toggleChroma,
 };

 return { settings, actions };
};
