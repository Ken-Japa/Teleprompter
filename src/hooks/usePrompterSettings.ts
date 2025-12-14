import { useCallback } from "react";
import { trackSettingChange } from "../utils/analytics";
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
    setIsMusicianMode: (val: boolean) => void;
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
    const [isMusicianMode, setIsMusicianMode] = useLocalStorage<boolean>(
        "neonprompt_musician_mode",
        false
    );

    const cycleTheme = useCallback(() => {
        const themes = PROMPTER_DEFAULTS.THEME_ORDER;
        setTheme((prev) => {
            const index = themes.indexOf(prev);
            const nextTheme = index === -1 ? themes[0] : themes[(index + 1) % themes.length];
            trackSettingChange("theme", nextTheme);
            return nextTheme;
        });
    }, [setTheme]);

    const toggleChroma = useCallback(() => {
        const chromaThemes = PROMPTER_DEFAULTS.CHROMA_THEMES;
        setTheme((prev) => {
            const index = chromaThemes.indexOf(prev);
            let nextTheme;
            // If not currently in a chroma theme, switch to first chroma (Green)
            if (index === -1) nextTheme = chromaThemes[0];
            // If in last chroma theme (Blue), switch back to Default (Standard)
            else if (index === chromaThemes.length - 1) nextTheme = Theme.DEFAULT;
            // Otherwise cycle through chroma themes
            else nextTheme = chromaThemes[index + 1];

            trackSettingChange("theme", nextTheme);
            return nextTheme;
        });
    }, [setTheme]);

    // We will wrap the actions returned to include tracking.

    const wrapSetter = <T>(setter: (val: T) => void, settingName: string) => (val: T) => {
        setter(val);
        trackSettingChange(settingName, String(val));
    };

    // Special handling for toggle/boolean
    const wrapToggle = (setter: (val: boolean) => void, settingName: string) => (val: boolean) => {
        setter(val);
        trackSettingChange(settingName, String(val));
    };

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
        isMusicianMode,
    };

    const actions: PrompterActions = {
        setFontSize: (v) => { setFontSize(v); /* Rate limit in UI usually, tracking here might be noisy */ },
        setMargin: (v) => { setMargin(v); },
        setIsMirrored: wrapToggle(setIsMirrored, "mirror_mode"),
        setTheme: (v) => { setTheme(v); trackSettingChange("theme", String(v)); }, // Basic direct set
        setIsUpperCase: wrapToggle(setIsUpperCase, "uppercase_mode"),
        setIsFocusMode: wrapToggle(setIsFocusMode, "focus_mode"),
        setIsFlipVertical: wrapToggle(setIsFlipVertical, "flip_vertical"),
        setVoiceControlMode: wrapSetter(setVoiceControlMode, "voice_control_mode"),
        setRecordingMode: wrapSetter(setRecordingMode, "recording_mode"),
        cycleTheme,
        toggleChroma,
        setIsMusicianMode: wrapToggle(setIsMusicianMode, "musician_mode"),
    };

    return { settings, actions };
};
