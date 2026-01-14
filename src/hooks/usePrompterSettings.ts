import { useCallback } from "react";
import { trackSettingChange } from "../utils/analytics";
import { useLocalStorage } from "./useLocalStorage";
import { Theme, PrompterSettings, VoiceControlMode, RecordingMode, BilingualConfig } from "../types";
import { PROMPTER_DEFAULTS, UI_LIMITS } from "../config/constants";

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
    setIsHudless: (val: boolean) => void;
    setIsCameraMode: (val: boolean) => void;
    setIsWidgetMode: (val: boolean) => void;
    setIsBilingualMode: (val: boolean) => void;
    setBilingualConfig: (config: Partial<BilingualConfig>) => void;
    setFontFamily: (val: string) => void;
    setVoiceLanguage: (val: string) => void;
    setBpm: (val: number) => void;
    setIsAutoBpmEnabled: (val: boolean) => void;
}

export interface PrompterFeatureFlags {
    isMusicianModeForced?: boolean; // Force ON and lock (Music App)
    defaultMusicianMode?: boolean;  // Default value for storage
    isMusicianModeDisabled?: boolean; // Hide and force OFF (Main App)
}

export const usePrompterSettings = (featureFlags: PrompterFeatureFlags = {}) => {
    const getStorageKey = (key: string) => {
        return featureFlags.isMusicianModeForced ? `${key}_music` : key;
    };

    // UI State - Persistent
    const [fontSize, setFontSize] = useLocalStorage<number>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.FONT_SIZE),
        PROMPTER_DEFAULTS.FONT_SIZE
    );
    const [fontFamily, setFontFamily] = useLocalStorage<string>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.FONT_FAMILY),
        PROMPTER_DEFAULTS.FONT_FAMILY
    );
    const [margin, setMargin] = useLocalStorage<number>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.MARGIN),
        PROMPTER_DEFAULTS.MARGIN
    );
    const [isMirrored, setIsMirrored] = useLocalStorage<boolean>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.MIRROR),
        PROMPTER_DEFAULTS.IS_MIRRORED
    );
    const [theme, setTheme] = useLocalStorage<Theme>(getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.THEME), Theme.DEFAULT);
    const [isUpperCase, setIsUpperCase] = useLocalStorage<boolean>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.CAPS),
        PROMPTER_DEFAULTS.IS_UPPERCASE
    );
    const [isFocusMode, setIsFocusMode] = useLocalStorage<boolean>(getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.FOCUS), PROMPTER_DEFAULTS.IS_FOCUS_MODE);
    const [isFlipVertical, setIsFlipVertical] = useLocalStorage<boolean>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.FLIP_VERTICAL),
        PROMPTER_DEFAULTS.IS_FLIP_VERTICAL
    );
    const [voiceControlMode, setVoiceControlMode] = useLocalStorage<VoiceControlMode>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.VOICE_MODE),
        "host"
    );
    const [recordingMode, setRecordingMode] = useLocalStorage<RecordingMode>(
        getStorageKey(PROMPTER_DEFAULTS.STORAGE_KEYS.RECORDING_MODE),
        "host"
    );
    // Determine initial value logic could be improved, but for now we rely on storage
    // If featureFlags.defaultMusicianMode is true, we might want to respect it if storage is empty, 
    // but useLocalStorage handles default if key missing.
    // However, if we are in a new domain, storage is empty.
    const [isMusicianModeStored, setIsMusicianMode] = useLocalStorage<boolean>(
        getStorageKey("neonprompt_musician_mode"),
        featureFlags.defaultMusicianMode ?? false
    );

    // If forced, we ignore the stored value for the getter
    // If disabled, we also ignore stored value (force false)
    const isMusicianMode = featureFlags.isMusicianModeForced
        ? true
        : (featureFlags.isMusicianModeDisabled ? false : isMusicianModeStored);

    const [isHudless, setIsHudless] = useLocalStorage<boolean>(
        getStorageKey("neonprompt_hudless_mode"),
        false
    );
    const [isCameraMode, setIsCameraMode] = useLocalStorage<boolean>(
        getStorageKey("neonprompt_camera_mode"),
        false
    );
    const [isWidgetMode, setIsWidgetMode] = useLocalStorage<boolean>(
        getStorageKey("neonprompt_widget_mode"),
        false
    );
    const [isBilingualMode, setIsBilingualMode] = useLocalStorage<boolean>(
        getStorageKey("neonprompt_bilingual_mode"),
        false
    );
    const [bilingualConfig, setBilingualConfig] = useLocalStorage<BilingualConfig>(
        getStorageKey("neonprompt_bilingual_config"),
        {
            isActive: false,
            primaryText: "",
            secondaryText: "",
            voiceTrackLanguage: "primary"
        }
    );
    const [voiceLanguage, setVoiceLanguage] = useLocalStorage<string>(
        getStorageKey("neonprompt_voice_language"),
        "" // "" significa auto/globalLang
    );
    const [bpm, setBpm] = useLocalStorage<number>(
        getStorageKey("neonprompt_bpm"),
        UI_LIMITS.BPM.DEFAULT
    );
    const [autoBpmEnabled, setAutoBpmEnabled] = useLocalStorage<boolean>(
        getStorageKey("neonprompt_auto_bpm"),
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
        fontFamily,
        margin,
        isMirrored,
        theme,
        isUpperCase,
        isFocusMode,
        isFlipVertical,
        voiceControlMode,
        recordingMode,
        isMusicianMode,
        isHudless,
        isCameraMode,
        isWidgetMode,
        isBilingualMode,
        bilingualConfig,
        voiceLanguage,
        bpm,
        autoBpmEnabled,
    };

    const actions: PrompterActions = {
        setFontSize: (v) => { setFontSize(v); /* Rate limit in UI usually, tracking here might be noisy */ },
        setFontFamily: wrapSetter(setFontFamily, "font_family"),
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
        setIsMusicianMode: (val: boolean) => {
            if (featureFlags.isMusicianModeForced || featureFlags.isMusicianModeDisabled) return; // Locked

            // Modo músico e modo bilíngue são mutuamente exclusivos
            if (val && isBilingualMode) {
                setIsBilingualMode(false);
            }
            setIsMusicianMode(val);
            trackSettingChange("musician_mode", String(val));
        },
        setIsHudless: wrapToggle(setIsHudless, "hudless_mode"),
        setIsCameraMode: wrapToggle(setIsCameraMode, "camera_mode"),
        setIsWidgetMode: wrapToggle(setIsWidgetMode, "widget_mode"),
        setIsBilingualMode: (val: boolean) => {
            // Modo bilingue e modo músico são mutuamente exclusivos
            if (val && isMusicianMode) {
                setIsMusicianMode(false);
            }
            setIsBilingualMode(val);
            trackSettingChange("bilingual_mode", String(val));
        },
        setBilingualConfig: (config: Partial<BilingualConfig>) => {
            setBilingualConfig(prev => ({ ...prev, ...config }));
            trackSettingChange("bilingual_config", JSON.stringify(config));
        },
        setVoiceLanguage: wrapSetter(setVoiceLanguage, "voice_language"),
        setBpm: wrapSetter(setBpm, "bpm"),
        setIsAutoBpmEnabled: wrapToggle(setAutoBpmEnabled, "auto_bpm"),
    };

    return { settings, actions };
};
