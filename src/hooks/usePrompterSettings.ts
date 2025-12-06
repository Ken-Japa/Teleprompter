import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Theme, PrompterSettings, VoiceControlMode } from "../types";
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
 cycleTheme: () => void;
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

 const cycleTheme = useCallback(() => {
  const themes = PROMPTER_DEFAULTS.THEME_ORDER;
  setTheme((prev) => themes[(themes.indexOf(prev) + 1) % themes.length]);
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
  cycleTheme,
 };

 return { settings, actions };
};
