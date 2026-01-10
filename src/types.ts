// --- INFRASTRUCTURE TYPES (Polyfills & External Libs) ---

// Web Speech API Types
export interface SpeechRecognitionEvent {
    resultIndex: number;
    results: {
        [index: number]: {
            [index: number]: {
                transcript: string;
            };
            isFinal: boolean;
        };
        length: number;
    };
}

export interface SpeechRecognitionErrorEvent {
    error: string;
    message: string;
}

export interface ISpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

// Global Window Extension
declare global {
    interface Window {
        SpeechRecognition: {
            new(): ISpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): ISpeechRecognition;
        };
    }
    interface Document {
        permissionsPolicy?: {
            allowsFeature(feature: string): boolean;
        };
    }
}

// --- DOMAIN TYPES (App Specific) ---

// Re-export PeerJS types for convenience if needed, or use directly.
// But since we use them in hooks, we might not need them here unless for other files.
import { DataConnection } from "peerjs";
export type PeerDataConnection = DataConnection;

export enum ConnectionStatus {
    DISCONNECTED = "DISCONNECTED",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    ERROR = "ERROR",
}

export enum MessageType {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SPEED_UPDATE = "SPEED_UPDATE",
    SCROLL_DELTA = "SCROLL_DELTA",
    SCROLL_STOP = "SCROLL_STOP",
    SCROLL_SYNC = "SCROLL_SYNC",
    RESTART = "RESTART",
    SYNC_STATE = "SYNC_STATE",
    MIRROR_TOGGLE = "MIRROR_TOGGLE",
    FONT_SIZE_UPDATE = "FONT_SIZE_UPDATE",
    MARGIN_UPDATE = "MARGIN_UPDATE",
    HEARTBEAT = "HEARTBEAT",
    TEXT_UPDATE = "TEXT_UPDATE",
    SCROLL_TO = "SCROLL_TO",
    SETTINGS_UPDATE = "SETTINGS_UPDATE",
    TIME_UPDATE = "TIME_UPDATE",
    TOGGLE_VOICE = "TOGGLE_VOICE",
    REQUEST_SYNC = "REQUEST_SYNC",
    VOICE_SYNC = "VOICE_SYNC",
    TOGGLE_RECORDING = "TOGGLE_RECORDING",
    START_REMOTE_RECORDING = "START_REMOTE_RECORDING",
    STOP_REMOTE_RECORDING = "STOP_REMOTE_RECORDING",
    TEXT_COMMAND_TRIGGERED = "TEXT_COMMAND_TRIGGERED",
    PREVIOUS_PART = "PREVIOUS_PART",
    NEXT_PART = "NEXT_PART",
}

export interface PeerMessage {
    type: MessageType;
    payload?: any;
    timestamp?: number;
}

export interface NavigationItem {
    id: string | number;
    label: string;
    progress: number; // 0 to 1
}

export enum Theme {
    DEFAULT = "default", // Ninja
    PAPER = "paper",
    CONTRAST = "contrast",
    MATRIX = "matrix",
    CYBER = "cyber",
    CREAM = "cream",
    CHROMA_GREEN = "chroma_green",
    CHROMA_BLUE = "chroma_blue",
}

export type VoiceControlMode = "host" | "remote";
export type RecordingMode = "host" | "remote";

// Bilingual Mode Configuration
export interface BilingualConfig {
    isActive: boolean;
    primaryText: string;
    secondaryText: string;
    primaryLanguage?: string; // opcional: 'pt', 'en', etc
    secondaryLanguage?: string;
    voiceTrackLanguage: 'primary' | 'secondary'; // qual idioma o voice control rastreia
}

export interface PrompterSettings {
    fontSize: number;
    margin: number;
    // speed removed as it is external state
    isMirrored: boolean;
    isUpperCase: boolean;
    theme: Theme;
    isFocusMode: boolean;
    isFlipVertical: boolean;
    isHudless?: boolean;
    voiceControlMode?: VoiceControlMode;
    recordingMode?: RecordingMode;
    isMusicianMode: boolean; // New mode
    isCameraMode: boolean; // Mobile Camera Overlay
    isWidgetMode: boolean; // Mobile Widget/PiP Mode
    isBilingualMode: boolean; // Bilingual mode
    bilingualConfig?: BilingualConfig; // Bilingual configuration
    fontFamily: string;
    voiceLanguage?: string; // Idioma manual para o controle de voz quando não estiver em modo bilíngue
}

export interface RemoteScrollHandler {
    (deltaY: number, stop?: boolean, hardStop?: boolean): void;
}

export interface PrompterHandle {
    onRemoteScroll: RemoteScrollHandler;
    scrollTo: (progress: number) => void;
    reset: () => void;
    toggleVoice: () => void;
    onRemoteVoiceUpdate: (index: number, progress: number) => void;
    wakeUp: () => void; // Forces the physics loop to wake up
    toggleRecording: () => void;
    onPreviousPart: () => void;
    onNextPart: () => void;
    clearVoiceSummary: () => void;
}

export interface TextFragment {
    text: string;
    type: "normal" | "red" | "yellow" | "green" | "blue";
    isHighlight?: boolean;
}


export type TextCommand =
    | { type: 'STOP' }
    | { type: 'PAUSE'; duration: number }
    | { type: 'SPEED'; value: number }
    | { type: 'LOOP_START' }
    | { type: 'LOOP_END'; value: number }
    | { type: 'COUNT'; value: number }
    | { type: 'PART'; name?: string }
    | { type: 'REST'; duration: number };

export interface Sentence {
    id: number;
    cleanContent: string;
    startIndex?: number;
    fragments: TextFragment[];
    isChord?: boolean;
    command?: TextCommand;
    originalSentenceId?: number; // For voice control when sentence is split in musician mode
}

export interface RemoteActions {
    handleSpeedChange: (newSpeed: number) => void;
    handlePlayToggle: () => void;
    handleTrackpadDelta: (delta: number) => void;
    handleTrackpadStop: (hardStop: boolean) => void;
    handleSettingsChange: (newSettings: Partial<PrompterSettings>) => void;
    handleTextChange: (newText: string) => void;
    handleScrollTo: (newProgress: number) => void;
    handleStop: () => void;
    handleToggleVoice: () => void;
    handleRequestSync: () => void;
    handleToggleRecording: () => void;
    handleToggleRecordingMode: () => void;
    handleToggleCameraMode: () => void;
    downloadRecording: () => void;
    handlePreviousPart: () => void;
    handleNextPart: () => void;
}

export enum HotkeyAction {
    TOGGLE_PLAY = "TOGGLE_PLAY",
    SPEED_UP = "SPEED_UP",
    SPEED_DOWN = "SPEED_DOWN",
    FONT_INCREASE = "FONT_INCREASE",
    FONT_DECREASE = "FONT_DECREASE",
    TOGGLE_MIRROR = "TOGGLE_MIRROR",
    TOGGLE_FLIP = "TOGGLE_FLIP",
    TOGGLE_FOCUS = "TOGGLE_FOCUS",
    EXIT = "EXIT",
    RESET = "RESET",
    TOGGLE_CAMERA = "TOGGLE_CAMERA",
    TOGGLE_WIDGET = "TOGGLE_WIDGET",
    TOGGLE_HUD = "TOGGLE_HUD",
    PREVIOUS_PART = "PREVIOUS_PART",
    NEXT_PART = "NEXT_PART",
}

export type HotkeyConfig = Record<HotkeyAction, string>;

export enum MidiAction {
    TOGGLE_PLAY = "TOGGLE_PLAY",
    NEXT_SONG = "NEXT_SONG",
    PREV_SONG = "PREV_SONG",
    START_SCROLL = "START_SCROLL",
    STOP_SCROLL = "STOP_SCROLL",
}

export type MidiMapping = {
    type: "note" | "cc";
    value: number;
};

export type MidiConfig = Record<MidiAction, MidiMapping | null>;

