import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Theme, PrompterSettings } from "../types";

export interface PrompterActions {
 setFontSize: (val: number | ((v: number) => number)) => void;
 setMargin: (val: number | ((v: number) => number)) => void;
 setIsMirrored: (val: boolean) => void;
 setTheme: (val: Theme | ((v: Theme) => Theme)) => void;
 setIsUpperCase: (val: boolean) => void;
 setIsFocusMode: (val: boolean) => void;
 setIsFlipVertical: (val: boolean) => void;
 cycleTheme: () => void;
}

export const usePrompterSettings = (isPro: boolean) => {
 // UI State - Persistent
 const [fontSize, setFontSize] = useLocalStorage<number>("neonprompt_font", 64);
 const [margin, setMargin] = useLocalStorage<number>("neonprompt_margin", 10);
 const [isMirrored, setIsMirrored] = useLocalStorage<boolean>("neonprompt_mirror", false);
 const [theme, setTheme] = useLocalStorage<Theme>("neonprompt_theme", Theme.DEFAULT);
  const [isUpperCase, setIsUpperCase] = useLocalStorage<boolean>("neonprompt_caps", false);
  const [isFocusMode, setIsFocusMode] = useLocalStorage<boolean>("neonprompt_focus", isPro);
  const [isFlipVertical, setIsFlipVertical] = useLocalStorage<boolean>("neonprompt_flipv", false);

  const cycleTheme = useCallback(() => {
    const themes: Theme[] = [Theme.DEFAULT, Theme.PAPER, Theme.CONTRAST, Theme.MATRIX, Theme.CYBER, Theme.CREAM];
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
 };

 const actions: PrompterActions = {
  setFontSize,
  setMargin,
  setIsMirrored,
  setTheme,
  setIsUpperCase,
  setIsFocusMode,
  setIsFlipVertical,
  cycleTheme,
 };

 return { settings, actions };
};
