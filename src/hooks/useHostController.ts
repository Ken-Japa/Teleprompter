import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ConnectionStatus, MessageType, PeerMessage, PrompterHandle } from "../types";
import { logger } from "../utils/logger";
import { usePeerHost } from "./usePeerHost";
import { useProState } from "./useProState";
import { useScriptStorage } from "./useScriptStorage";
import { useLocalStorage } from "./useLocalStorage";

export const useHostController = () => {
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

 const prompterRef = useRef<PrompterHandle>(null);

 // 4. Peer Message Handling Strategy
 const handleRemoteMessage = useCallback(
  (msg: PeerMessage) => {
   switch (msg.type) {
    case MessageType.PLAY:
     setIsPlaying(true);
     break;
    case MessageType.PAUSE:
     setIsPlaying(false);
     break;
    case MessageType.SPEED_UPDATE:
     // Garante que payload é um número antes de usar
     if (typeof msg.payload === "number") {
      setSpeed(Math.max(0, Math.min(10, msg.payload)));
     } else {
      logger.warn("Received non-numeric payload for SPEED_UPDATE", { payload: msg.payload });
     }
     break;
    case MessageType.SCROLL_DELTA:
     // Garante que payload é um número antes de usar
     if (typeof msg.payload === "number") {
      if (prompterRef.current) {
       prompterRef.current.onRemoteScroll(msg.payload, false);
      }
     } else {
      logger.warn("Received non-numeric payload for SCROLL_DELTA", { payload: msg.payload });
     }
     break;
    case MessageType.SCROLL_STOP:
     // Garante que payload é um objeto antes de usar
     if (typeof msg.payload === "object" && msg.payload !== null) {
      const isHardStop = msg.payload.hardStop ?? true;
      if (prompterRef.current) {
       prompterRef.current.onRemoteScroll(0, true, isHardStop);
      }
     } else {
      logger.warn("Received non-object payload for SCROLL_STOP", { payload: msg.payload });
     }
     break;
    case MessageType.RESTART:
     setIsPlaying(false);
     break;
    default:
     logger.warn("Received unknown message type", { type: msg.type, message: msg });
     break;
   }
  },
  [setSpeed]
 );

 const { peerId, status, broadcast } = usePeerHost(handleRemoteMessage);

 // 5. Pro & Paywall Logic
 const { isPro, showPaywall, setShowPaywall, unlockPro } = useProState(status);
 const [unlockKey, setUnlockKey] = useState<string>("");

 // Pause playback if Paywall triggers
 useEffect(() => {
  if (showPaywall) setIsPlaying(false);
 }, [showPaywall]);

 // 6. State Broadcast (Sync to Remote)
 useEffect(() => {
  if (status === ConnectionStatus.CONNECTED && broadcast) {
   broadcast(MessageType.SYNC_STATE, { isPlaying, speed });
  }
 }, [isPlaying, speed, status, broadcast]);

 const handleScrollUpdate = useCallback(
  (progress: number) => {
   broadcast(MessageType.SCROLL_SYNC, { progress });
  },
  [broadcast]
 );

 // 7. Actions
 const handlePrompterStateChange = useCallback(
  (playing: boolean, newSpeed: number) => {
   setIsPlaying(playing);
   setSpeed(newSpeed);
  },
  [setSpeed]
 );

 const handleUnlock = () => {
  if (unlockKey && unlockPro(unlockKey)) setUnlockKey("");
 };

 const navigation = {
  startPresentation: () => (window.location.hash = "app/play"),
  exitPresentation: () => (window.location.hash = "app"),
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
  },
  actions: {
   setText,
   setUnlockKey,
   handleUnlock,
   handlePrompterStateChange,
   handleScrollUpdate,
   setShowPaywall,
   navigation,
  },
  refs: {
   prompterRef,
  },
 };
};
