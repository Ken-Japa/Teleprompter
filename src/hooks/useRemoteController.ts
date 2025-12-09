import { useState, useRef, useEffect, useCallback } from "react";
import { ConnectionStatus, MessageType, PeerMessage, PrompterSettings, NavigationItem } from "../types";
import { usePeerRemote } from "./usePeerRemote";
import { useWakeLock } from "./useWakeLock";
import { useVoiceControl } from "./useVoiceControl";
import { useMediaRecorder } from "./useMediaRecorder";
import { trackSettingChange } from "../utils/analytics";

const NETWORK_TICK_RATE = 33; // ~30fps

export const useRemoteController = (hostId: string) => {
 // 1. State
 const [isPlaying, setIsPlaying] = useState<boolean>(false);
 const [speed, setSpeed] = useState<number>(2);
 const [progress, setProgress] = useState<number>(0);
 const [settings, setSettings] = useState<PrompterSettings | null>(null);
 const [text, setText] = useState<string>("");
 const [elapsedTime, setElapsedTime] = useState<number>(0);
 const [navigationMap, setNavigationMap] = useState<NavigationItem[]>([]);
 const [isPro, setIsPro] = useState<boolean>(false);
 const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false); // Local Mic State
 const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false); // Host State
 const [isRecording, setIsRecording] = useState<boolean>(false); // Host Recording State

 // Timer Logic (Local Approximation)
 useEffect(() => {
  let interval: NodeJS.Timeout;
  if (isPlaying) {
   interval = setInterval(() => {
    setElapsedTime((prev) => prev + 1);
   }, 1000);
  }
  return () => clearInterval(interval);
 }, [isPlaying]);

 // 2. Peer Connection
 const { status, sendMessage, setOnMessage, errorMessage } = usePeerRemote(hostId);

 // 3. Logic Refs
 const accumulatedDelta = useRef<number>(0);
 const networkLoopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const speedUpdateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
 const textUpdateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

 // 4. Wake Lock
 useWakeLock(status === ConnectionStatus.CONNECTED);

 // 4.1 Voice Control (Local)
 const { startListening, stopListening, activeSentenceIndex, voiceProgress, resetVoice } = useVoiceControl(
  text,
  isPro
 );

 // 4.3 Local Recording
 const {
  isRecording: isLocalRecording,
  recordingTime: localRecordingTime,
  hasRecordedData,
  startRecording: startLocalRecording,
  stopRecording: stopLocalRecording,
  downloadRecording,
 } = useMediaRecorder();

 // Sync voice state to host when acting as controller
 useEffect(() => {
  if (settings?.voiceControlMode === "remote" && isVoiceActive) {
   sendMessage(MessageType.VOICE_SYNC, { activeSentenceIndex, voiceProgress });
  }
 }, [activeSentenceIndex, voiceProgress, settings?.voiceControlMode, isVoiceActive, sendMessage]);

 // 4.2 Manage Local Voice State based on Global State
 useEffect(() => {
  const shouldListen = settings?.voiceControlMode === "remote" && isVoiceMode;

  if (shouldListen && !isVoiceActive) {
   startListening();
   setIsVoiceActive(true);
  } else if (!shouldListen && isVoiceActive) {
   stopListening();
   setIsVoiceActive(false);
  }
 }, [settings?.voiceControlMode, isVoiceMode, isVoiceActive, startListening, stopListening]);

 // 5. Haptics Helper
 const vibrate = useCallback((pattern: number | number[]) => {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
   try {
    navigator.vibrate(pattern);
   } catch (e) {
    /* ignore */
   }
  }
 }, []);

 // 6. Message Handling (Inbound)
 useEffect(() => {
  setOnMessage((data: PeerMessage) => {
   if (data.type === MessageType.SYNC_STATE) {
    setIsPlaying(data.payload.isPlaying);
    setSpeed(data.payload.speed);
    if (data.payload.settings) setSettings(data.payload.settings);
    if (data.payload.text !== undefined) setText(data.payload.text);
    if (data.payload.elapsedTime !== undefined) setElapsedTime(data.payload.elapsedTime);
    if (data.payload.navigationMap !== undefined) setNavigationMap(data.payload.navigationMap);
    if (data.payload.isPro !== undefined) setIsPro(data.payload.isPro);
    if (data.payload.isVoiceMode !== undefined) setIsVoiceMode(data.payload.isVoiceMode);
    if (data.payload.isRecording !== undefined) setIsRecording(data.payload.isRecording);
   }
   if (data.type === MessageType.TIME_UPDATE) {
    setElapsedTime(data.payload.elapsedTime);
   }
   if (data.type === MessageType.SCROLL_SYNC) {
    setProgress(data.payload.progress);
   }
   if (data.type === MessageType.START_REMOTE_RECORDING) {
    if (!isLocalRecording) startLocalRecording();
   }
   if (data.type === MessageType.STOP_REMOTE_RECORDING) {
    if (isLocalRecording) stopLocalRecording();
   }
   if (data.type === MessageType.RESTART) {
    setIsPlaying(false);
    setElapsedTime(0);
    setProgress(0);
    resetVoice();
   }
  });
 }, [setOnMessage]);

 // 7. Network Loop (Outbound Throttling)
 useEffect(() => {
  if (status !== ConnectionStatus.CONNECTED) return;

  networkLoopRef.current = setInterval(() => {
   // Only send if there is significant movement
   if (Math.abs(accumulatedDelta.current) > 0.05) {
    const payload = Math.round(accumulatedDelta.current * 100) / 100;
    sendMessage(MessageType.SCROLL_DELTA, payload);
    accumulatedDelta.current = 0; // Consume buffer
   }
  }, NETWORK_TICK_RATE);

  return () => {
   if (networkLoopRef.current) clearInterval(networkLoopRef.current);
  };
 }, [status, sendMessage]);

 // 8. Haptic Feedback on Connection Change
 useEffect(() => {
  if (status === ConnectionStatus.CONNECTED) vibrate(200);
  if (status === ConnectionStatus.DISCONNECTED) vibrate([50, 50, 50]);

  return () => {
   try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(0);
   } catch (e) {}
  };
 }, [status, vibrate]);

 // 9. Actions
 const handleSpeedChange = useCallback(
  (newSpeed: number) => {
   setSpeed(newSpeed);
   if (speedUpdateTimeout.current) clearTimeout(speedUpdateTimeout.current);
   speedUpdateTimeout.current = setTimeout(() => {
    sendMessage(MessageType.SPEED_UPDATE, newSpeed);
   }, 300);
  },
  [sendMessage]
 );

 const handlePlayToggle = useCallback(() => {
  const newState = !isPlaying;
  setIsPlaying(newState);
  sendMessage(newState ? MessageType.PLAY : MessageType.PAUSE);
  vibrate(50);
 }, [isPlaying, sendMessage, vibrate]);

 const handleStop = useCallback(() => {
  setIsPlaying(false);
  setElapsedTime(0);
  setProgress(0); // Explicitly reset local progress
  sendMessage(MessageType.RESTART);
  vibrate(50);
  resetVoice();
 }, [sendMessage, vibrate, resetVoice]);

 const handleToggleVoice = useCallback(() => {
  // Always toggle visual state on Host
  sendMessage(MessageType.TOGGLE_VOICE);
 }, [sendMessage]);

 const handleRequestSync = useCallback(() => {
  sendMessage(MessageType.REQUEST_SYNC);
  vibrate(50);
 }, [sendMessage, vibrate]);

 const handleTrackpadDelta = useCallback((delta: number) => {
  accumulatedDelta.current += delta;
 }, []);

 const handleTrackpadStop = useCallback(
  (hardStop: boolean) => {
   // Flush remaining buffer immediately on lift if small
   if (Math.abs(accumulatedDelta.current) > 0.1) {
    const payload = Math.round(accumulatedDelta.current * 100) / 100;
    sendMessage(MessageType.SCROLL_DELTA, payload);
   }
   accumulatedDelta.current = 0;
   sendMessage(MessageType.SCROLL_STOP, { hardStop });
  },
  [sendMessage]
 );

 const handleSettingsChange = useCallback(
  (newSettings: Partial<PrompterSettings>) => {
   if (settings) {
    // Track each setting change
    Object.entries(newSettings).forEach(([key, value]) => {
     trackSettingChange(key, value as string | number | boolean);
    });
    setSettings({ ...settings, ...newSettings });
   }
   sendMessage(MessageType.SETTINGS_UPDATE, newSettings);
  },
  [sendMessage, settings]
 );

 const handleTextChange = useCallback(
  (newText: string) => {
   setText(newText);
   if (textUpdateTimeout.current) clearTimeout(textUpdateTimeout.current);
   textUpdateTimeout.current = setTimeout(() => {
    sendMessage(MessageType.TEXT_UPDATE, newText);
   }, 500);
  },
  [sendMessage]
 );

 const handleScrollTo = useCallback(
  (newProgress: number) => {
   setProgress(newProgress);
   sendMessage(MessageType.SCROLL_TO, newProgress);
  },
  [sendMessage]
 );

 const handleToggleRecording = useCallback(() => {
  if (settings?.recordingMode === "remote") {
   if (isLocalRecording) {
    stopLocalRecording();
   } else {
    startLocalRecording();
   }
  } else {
   vibrate(50);
   sendMessage(MessageType.TOGGLE_RECORDING);
  }
 }, [
  sendMessage,
  vibrate,
  settings?.recordingMode,
  isLocalRecording,
  stopLocalRecording,
  startLocalRecording,
 ]);

 const handleToggleRecordingMode = useCallback(() => {
  const newMode = settings?.recordingMode === "remote" ? "host" : "remote";
  sendMessage(MessageType.SETTINGS_UPDATE, { recordingMode: newMode });
 }, [sendMessage, settings?.recordingMode]);

 return {
  state: {
   status,
   isPlaying,
   speed,
   progress,
   errorMessage,
   settings,
   text,
   elapsedTime,
   navigationMap,
   isVoiceMode,
   isPro,
   isVoiceActive,
   isRecording: settings?.recordingMode === "remote" ? isLocalRecording : isRecording,
   localRecordingTime,
   hasRecordedData,
  },
  actions: {
   handleSpeedChange,
   handlePlayToggle,
   handleTrackpadDelta,
   handleTrackpadStop,
   handleSettingsChange,
   handleTextChange,
   handleScrollTo,
   handleStop,
   handleToggleVoice,
   handleRequestSync,
   handleToggleRecording,
   handleToggleRecordingMode,
   downloadRecording,
  },
 };
};
