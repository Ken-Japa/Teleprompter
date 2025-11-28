import { useState, useRef, useEffect, useCallback } from "react";
import { ConnectionStatus, MessageType, PeerMessage } from "../types";
import { usePeerRemote } from "./usePeerRemote";
import { useWakeLock } from "./useWakeLock";

const NETWORK_TICK_RATE = 33; // ~30fps

export const useRemoteController = (hostId: string) => {
 // 1. State
 const [isPlaying, setIsPlaying] = useState<boolean>(false);
 const [speed, setSpeed] = useState<number>(2);
 const [progress, setProgress] = useState<number>(0);

 // 2. Peer Connection
 const { status, sendMessage, setOnMessage } = usePeerRemote(hostId);

 // 3. Logic Refs
 const accumulatedDelta = useRef<number>(0);
 const networkLoopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const speedUpdateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

 // 4. Wake Lock
 useWakeLock(status === ConnectionStatus.CONNECTED);

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
   }
   if (data.type === MessageType.SCROLL_SYNC) {
    setProgress(data.payload.progress);
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

 return {
  state: {
   status,
   isPlaying,
   speed,
   progress,
  },
  actions: {
   handleSpeedChange,
   handlePlayToggle,
   handleTrackpadDelta,
   handleTrackpadStop,
  },
 };
};
