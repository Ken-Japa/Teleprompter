// --- INFRASTRUCTURE TYPES (Polyfills & External Libs) ---

// Defining specific interfaces for PeerJS instead of using 'any'
export interface PeerOptions {
  host?: string;
  port?: number;
  path?: string;
  secure?: boolean;
  config?: any;
  debug?: number;
}

export interface PeerDataConnection {
  open: boolean;
  send: (data: PeerMessage) => void;
  close: () => void;
  on: (event: string, cb: (data: any) => void) => void;
  peer: string;
}

export interface PeerInstance {
  id: string;
  destroyed: boolean;
  on: (event: string, cb: (data: any) => void) => void;
  connect: (id: string, options?: { reliable?: boolean }) => PeerDataConnection;
  destroy: () => void;
  reconnect: () => void;
  off: (event: string, fn?: Function) => void;
}

// Polyfill definitions for requestIdleCallback
type RequestIdleCallbackHandle = number;
type RequestIdleCallbackOptions = {
  timeout?: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

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

// Global Window Extension
declare global {
  interface Window {
    Peer: new (id?: string, options?: PeerOptions) => PeerInstance;
    QRCode: any;
    NoSleep: any;
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    togglePro: () => void; // Dev helper
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
  interface Document {
    permissionsPolicy?: {
      allowsFeature(feature: string): boolean;
    };
  }
}

// --- DOMAIN TYPES (App Specific) ---

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}

export enum MessageType {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SPEED_UPDATE = 'SPEED_UPDATE',
  SCROLL_DELTA = 'SCROLL_DELTA',
  SCROLL_STOP = 'SCROLL_STOP', // New exact stop command
  SCROLL_SYNC = 'SCROLL_SYNC',
  RESTART = 'RESTART',
  SYNC_STATE = 'SYNC_STATE',
  MIRROR_TOGGLE = 'MIRROR_TOGGLE',
  FONT_SIZE = 'FONT_SIZE'
}

export type Theme = 'ninja' | 'paper' | 'contrast' | 'matrix' | 'cyber' | 'cream';

export interface PeerMessage {
  type: MessageType;
  payload?: any;
}

export interface TextFragment {
    text: string;
    type: 'normal' | 'red' | 'yellow' | 'green' | 'blue';
}

export interface Sentence {
    id: number;
    cleanContent: string; // For voice matching (no tags)
    fragments: TextFragment[]; // For display
    startIndex: number;
}

// Optimization: Added 'hardStop' boolean to distinguish between a Flick (momentum) and a Hold (stop)
export type RemoteScrollHandler = (delta: number, stop?: boolean, hardStop?: boolean) => void;

// React Pattern: Handle for exposing Prompter methods to parent
export interface PrompterHandle {
    onRemoteScroll: RemoteScrollHandler;
}

export const DEFAULT_TEXT = `Bem-vindo ao PromptNinja.

O teleprompter definitivo para criadores de conteúdo.

1. Escaneie o QR Code.
2. Controle a velocidade.
3. Use o Trackpad.

<r>ATENÇÃO:</r>
Use as tags de cor para destacar momentos importantes.
<y>Este texto está em amarelo para ênfase leve.</y>
<g>E este em verde para sinalizar calma.</g>

Cole seu roteiro aqui para começar...
`;