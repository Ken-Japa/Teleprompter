import { Theme } from "../types";

/**
 * Configuration Constants for PromptNinja
 *
 * This file contains all the hardcoded values used throughout the application.
 * Grouped by functionality for easier maintenance.
 */

// Application-wide Constants
export const APP_CONSTANTS = {
    REDEEM_MODAL_ELAPSED_TIME: 1200,
    DEVICE_AUTHENTICATION_LIMIT: 12,
    MUSIC_DOMAIN: "music.solutionkit.com.br",
};

// Prompter Default Settings
export const PROMPTER_DEFAULTS = {
    FONT_SIZE: 64,
    MARGIN: 10,
    FONT_FAMILY: "sans-serif",
    IS_MIRRORED: false,
    IS_UPPERCASE: false,
    IS_FLIP_VERTICAL: false,
    IS_FOCUS_MODE: false,
    // LocalStorage Keys
    STORAGE_KEYS: {
        FONT_SIZE: "promptninja_font",
        FONT_FAMILY: "promptninja_font_family",
        MARGIN: "promptninja_margin",
        MIRROR: "promptninja_mirror",
        THEME: "promptninja_theme",
        CAPS: "promptninja_caps",
        FOCUS: "promptninja_focus",
        FLIP_VERTICAL: "promptninja_flipv",
        VOICE_MODE: "promptninja_voice_mode",
        RECORDING_MODE: "promptninja_recording_mode",
        PRO_STATUS: "promptninja_pro",
        PRO_TRIAL: "promptninja_trial_data",
    },
    // Theme Definitions
    STANDARD_THEMES: [Theme.DEFAULT, Theme.PAPER, Theme.CONTRAST, Theme.MATRIX, Theme.CYBER, Theme.CREAM],
    CHROMA_THEMES: [Theme.CHROMA_GREEN, Theme.CHROMA_BLUE],
    // Theme Cycle Order (Standard Only)
    THEME_ORDER: [Theme.DEFAULT, Theme.PAPER, Theme.CONTRAST, Theme.MATRIX, Theme.CYBER, Theme.CREAM],
};

// Keyboard Shortcuts Defaults
export const HOTKEY_DEFAULTS: Record<string, string> = {
    TOGGLE_PLAY: "Space", // Also Enter
    SPEED_UP: "ArrowUp",
    SPEED_DOWN: "ArrowDown",
    FONT_INCREASE: "Equal",
    FONT_DECREASE: "Minus",
    TOGGLE_MIRROR: "KeyM",
    TOGGLE_FLIP: "KeyV",
    TOGGLE_FOCUS: "KeyF",
    EXIT: "Escape",
    RESET: "KeyR",
    TOGGLE_HUD: "KeyH",
    TOGGLE_CAMERA: "KeyC",
    TOGGLE_WIDGET: "KeyW",
    PREVIOUS_PART: "ArrowLeft",
    NEXT_PART: "ArrowRight",
    // Editor Formatting (PRO)
    FORMAT_BOLD: "Mod+KeyB",
    FORMAT_ITALIC: "Mod+KeyI",
    FORMAT_UNDERLINE: "Mod+KeyU",
    FORMAT_RED: "Mod+KeyE",
    FORMAT_YELLOW: "Mod+KeyQ",
    FORMAT_GREEN: "Mod+KeyK",
    FORMAT_BLUE: "Mod+KeyM",
};

export const MIDI_DEFAULTS: Record<string, { type: "note" | "cc", value: number } | null> = {
    TOGGLE_PLAY: { type: "note", value: 64 },
    NEXT_SONG: null,
    PREV_SONG: null,
    START_SCROLL: null,
    STOP_SCROLL: null,
    SPEED_UP: null,
    SPEED_DOWN: null,
    FONT_INCREASE: null,
    FONT_DECREASE: null,
    RESET: null,
    TOGGLE_MIRROR: null,
    EXIT: null,
};


// Physics & Scrolling Constants
export const PHYSICS_CONSTANTS = {
    // Base velocity multiplier
    VELOCITY_MULTIPLIER: 40,
    // Power factor for speed curve (non-linear speed)
    SPEED_POWER: 1.4,
    // Maximum delta time in ms to prevent jumps
    MAX_DELTA_TIME: 64,
    // Standard frame time (approx 60fps)
    TARGET_FRAME_TIME: 16.67,
    // Threshold to consider movement stopped
    MOMENTUM_THRESHOLD: 0.01,
    // Scroll position tolerance
    SCROLL_TOLERANCE: 1,
    // Deceleration factor when not touching (natural friction)
    FRICTION_NATURAL: 0.95,
    // Deceleration factor when touching (higher friction)
    FRICTION_TOUCH: 0.8,
    // Threshold to start auto-scrolling
    AUTO_SCROLL_THRESHOLD: 0.5,
    // Cooldown after manual interaction before voice scroll resumes (ms)
    MANUAL_SCROLL_VOICE_TIMEOUT: 1500,
};

// UI Limits & Controls
export const UI_LIMITS = {
    SPEED: {
        MIN: 0,
        MAX: 10,
        STEP: 0.1,
    },
    FONT_SIZE: {
        MIN: 20, // Unified minimum (was 24 in slider, 20 in button logic)
        MAX: 200,
        STEP_BUTTON: 4,
    },
    HUD: {
        TIMEOUT_MS: 3000,
    },
    BPM: {
        MIN: 60,
        MAX: 200,
        DEFAULT: 120,
        STEP: 1,
    },
};

// Network & Peer Configuration
export const NETWORK_CONFIG = {
    RECONNECT: {
        MAX_RETRIES: 5,
        RETRY_DELAY_MS: 5000,
    },
    THROTTLE: {
        BROADCAST_MS: 50, // ~20fps
    },
};

// UI Components Configuration
export const UI_CONFIG = {
    COUNTDOWN: {
        DEFAULT_DURATION_SEC: 3,
        TICK_MS: 1000,
        Z_INDEX: 101,
    },
};

// Recording Configuration
export const RECORDING_CONFIG = {
    MIME_TYPE: "audio/webm",
    TIMESLICE_MS: 1000,
    FILENAME_PREFIX: "prompt-ninja-p2p-zero-lag-recording-",
    EXTENSION: ".webm",
    TIMER_INTERVAL_MS: 1000,
};

// SEO Routes
export const SEO_ROUTES = {
    GRATIS: "/teleprompter-online-gratis",
    TUTORIAL: "/como-usar-teleprompter-celular",
    MELHOR_APP: "/melhor-teleprompter-app",
    ALTERNATIVAS: "/alternativas-teleprompter-concorrente",
    YOUTUBERS: "/teleprompter-para-youtubers-e-criadores",
    TRAVANDO: "/teleprompter-travando-solucao",
    DIY: "/teleprompter-caseiro-diy",
    ORATORIA: "/dicas-oratoria-video",
    DECORAR: "/como-decorar-texto-rapido",
    WEBRTC: "/tecnologia-webrtc-baixa-latencia",
    PC_WINDOWS: "/teleprompter-pc-windows",
    ZOOM: "/teleprompter-zoom-meeting",
    PRO_WELCOME: "/welcometopro",
};
