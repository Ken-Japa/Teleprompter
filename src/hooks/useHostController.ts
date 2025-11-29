import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ConnectionStatus, MessageType, PeerMessage, PrompterHandle } from "../types";
import { logger } from "../utils/logger";
import { usePeerHost } from "./usePeerHost";
import { useProState } from "./useProState";
import { useScriptStorage } from "./useScriptStorage";
import { useLocalStorage } from "./useLocalStorage";
import { useTranslation } from "./useTranslation";
import { usePrompterSettings } from "./usePrompterSettings";

export const useHostController = () => {
 const { t } = useTranslation();
 // 1. Data Persistence
 const [text, setText] = useScriptStorage() || useState("");

 // 2. Routing Logic (Hash-based)
 const [isEditMode, setIsEditMode] = useState<boolean>(
  typeof window !== "undefined" ? !window.location.hash.includes("/play") : true
 );
 useEffect(() => {
  if (typeof window !== "undefined") {
   const handleHashChange = () => setIsEditMode(!window.location.hash.includes("/play"));
   window.addEventListener("hashchange", handleHashChange);
   return () => window.removeEventListener("hashchange", handleHashChange);
  }
 }, []);

 // 3. Prompter State
 const [isPlaying, setIsPlaying] = useState<boolean>(false);
 const [speed, setSpeed] = useLocalStorage<number>("neonprompt_speed", 2);
 const [elapsedTime, setElapsedTime] = useState<number>(0);

 // Timer Logic
 useEffect(() => {
  let interval: NodeJS.Timeout;
  if (isPlaying) {
   interval = setInterval(() => {
    setElapsedTime((prev) => prev + 1);
   }, 1000);
  }
  return () => clearInterval(interval);
 }, [isPlaying]);

 // Reset Timer when stopping or restarting (Optional: currently we don't reset on pause, only on explicit reset action if we had one)
 // For now, we just keep it running. If we want to reset, we need a reset signal.

 // 5. Pro & Paywall Logic
 const { isPro, showPaywall, setShowPaywall, unlockPro } = useProState(isPlaying);

 // Prompter Settings (Lifted State)
 const { settings: prompterSettings, actions: prompterActions } = usePrompterSettings(isPro);

 const prompterRef = useRef<PrompterHandle>(null);

 // 4. Peer Message Handling Strategy
 const handleRemoteMessage = useCallback(
  (msg: PeerMessage) => {
   switch (msg.type) {
    case MessageType.PLAY:
     setIsPlaying(true);
     // Auto-enter presentation mode if not already in it
     if (typeof window !== "undefined" && !window.location.hash.includes("/play")) {
      window.location.hash = "app/play";
      setIsEditMode(false);
     }
     break;
    case MessageType.PAUSE:
     setIsPlaying(false);
     break;
    case MessageType.SPEED_UPDATE:
     if (typeof msg.payload === "number") {
      setSpeed(Math.max(0, Math.min(10, msg.payload)));
     } else {
      logger.warn("Received non-numeric payload for SPEED_UPDATE", { context: { payload: msg.payload } });
     }
     break;
    case MessageType.SCROLL_DELTA:
     if (typeof msg.payload === "number") {
      if (prompterRef.current) {
       prompterRef.current.onRemoteScroll(msg.payload, false);
      }
     } else {
      logger.warn("Received non-numeric payload for SCROLL_DELTA", { context: { payload: msg.payload } });
     }
     break;
    case MessageType.SCROLL_STOP:
     if (typeof msg.payload === "object" && msg.payload !== null) {
      const isHardStop = msg.payload.hardStop ?? true;
      if (prompterRef.current) {
       prompterRef.current.onRemoteScroll(0, true, isHardStop);
      }
     } else {
      logger.warn("Received non-object payload for SCROLL_STOP", { context: { payload: msg.payload } });
     }
     break;
    case MessageType.RESTART:
     setIsPlaying(false);
     setElapsedTime(0);
     break;
    case MessageType.TEXT_UPDATE:
     if (typeof msg.payload === "string") {
      setText(msg.payload);
     }
     break;
    case MessageType.SCROLL_TO:
     if (typeof msg.payload === "number" && prompterRef.current) {
      prompterRef.current.scrollTo(msg.payload);
     }
     break;
    case MessageType.SETTINGS_UPDATE:
     if (msg.payload) {
      const s = msg.payload;
      if (s.fontSize) prompterActions.setFontSize(s.fontSize);
      if (s.margin !== undefined) prompterActions.setMargin(s.margin);
      if (s.isMirrored !== undefined) prompterActions.setIsMirrored(s.isMirrored);
      if (s.theme) prompterActions.setTheme(s.theme);
      if (s.isUpperCase !== undefined) prompterActions.setIsUpperCase(s.isUpperCase);
      if (s.isFocusMode !== undefined) prompterActions.setIsFocusMode(s.isFocusMode);
      if (s.isFlipVertical !== undefined) prompterActions.setIsFlipVertical(s.isFlipVertical);
     }
     break;
    default:
     logger.warn("Received unknown message type", { context: { type: msg.type, message: msg } });
     break;
   }
  },
  [setSpeed, setText, prompterActions]
 );

 const { peerId, status, broadcast, errorMessage } = usePeerHost(handleRemoteMessage);

 const [unlockKey, setUnlockKey] = useState<string>("");
 const [paywallErrorMessage, setPaywallErrorMessage] = useState<string | null>(null);
 const [showCountdownModal, setShowCountdownModal] = useState<boolean>(false);

 // Pause playback if Paywall triggers
 useEffect(() => {
  if (showPaywall) setIsPlaying(false);
 }, [showPaywall]);

 // 6. State Broadcast (Sync to Remote)
 useEffect(() => {
  if (status === ConnectionStatus.CONNECTED && broadcast) {
   broadcast(MessageType.SYNC_STATE, {
    isPlaying,
    speed,
    settings: prompterSettings,
    text: text.substring(0, 10000), // Limit text size just in case
    elapsedTime,
   });
  }
 }, [isPlaying, speed, status, broadcast, prompterSettings, text, elapsedTime]);

 const handleScrollUpdate = useCallback(
  (progress: number) => {
   broadcast(MessageType.SCROLL_SYNC, { progress });
  },
  [broadcast]
 );

 // 7. Actions
 const handlePrompterStateChange = useCallback(
  (playing: boolean, newSpeed: number) => {
   console.log(`Prompter State Change: Playing=${playing}, Speed=${newSpeed}`);
   setIsPlaying(playing);
   setSpeed(newSpeed);
  },
  [setSpeed]
 );

 const handleUnlock = () => {
  setPaywallErrorMessage(null); // Clear previous errors

  if (!unlockKey) {
   setPaywallErrorMessage(t("host.paywall.emptyKey"));
   return;
  }

  if (!unlockPro(unlockKey)) {
   setPaywallErrorMessage(t("host.paywall.invalidKey"));
   return;
  }

  setUnlockKey("");
 };

 const handleClosePaywall = () => {
  setShowPaywall(false);
  setShowCountdownModal(true);
 };

 const handleCountdownEnd = () => {
  setShowCountdownModal(false);
 };

 const resetTimer = useCallback(() => {
  setElapsedTime(0);
 }, []);

 const navigation = {
  startPresentation: () => {
   window.location.hash = "app/play";
   // Force state update immediately to ensure responsiveness even if hash event is delayed
   setIsEditMode(false);
  },
  exitPresentation: () => {
   window.location.hash = "app";
   // Force state update immediately
   setIsEditMode(true);
  },
 };

 const prompterState = useMemo(() => ({ isPlaying, speed }), [isPlaying, speed]);

 return {
  state: {
   text,
   isEditMode,
   peerId,
   status,
   isPro,
   showPaywall,
   unlockKey,
   prompterState,
   errorMessage,
   paywallErrorMessage,
   showCountdownModal,
   prompterSettings,
  },
  actions: {
   setText,
   setUnlockKey,
   handleUnlock,
   handlePrompterStateChange,
   handleScrollUpdate,
   setShowPaywall,
   navigation,
   handleClosePaywall,
   setShowCountdownModal,
   handleCountdownEnd,
   prompterActions,
   resetTimer,
  },
  refs: {
   prompterRef,
  },
 };
};
