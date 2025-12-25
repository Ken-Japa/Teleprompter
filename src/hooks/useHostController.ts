import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ConnectionStatus, MessageType, PeerMessage, PrompterHandle, NavigationItem } from "../types";
import { logger } from "../utils/logger";
import { usePeerHost } from "./usePeerHost";
import { useProState } from "./useProState";
import { useScriptStorage } from "./useScriptStorage";
import { useLocalStorage } from "./useLocalStorage";
import { useTranslation } from "./useTranslation";
import { usePrompterSettings } from "./usePrompterSettings";
import { tryEnableNoSleep } from "./useWakeLock";
import { trackStartPacing, trackGoogleAdsPurchase } from "../utils/analytics";

export const useHostController = () => {
  const { t } = useTranslation();
  // 1. Data Persistence
  const {
    text,
    setText,
    scripts,
    activeScriptId,
    activeScript,
    createScript,
    switchScript,
    deleteScript,
    updateScript
  } = useScriptStorage();

  // Bilingual Mode State
  const [bilingualTexts, setBilingualTexts] = useState<{
    primary: string;
    secondary: string;
    primaryLanguage?: string;
    secondaryLanguage?: string;
  }>({ primary: "", secondary: "" });

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
  const [navigationMap, setNavigationMap] = useState<NavigationItem[]>([]);

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
  const { isPro, isTrialActive, trialEndTime, startTrial, showPaywall, setShowPaywall, unlockPro } = useProState(elapsedTime);

  // Check for redeem param in hash to open Paywall automatically
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("redeem=true")) {
      // Remove the param to avoid reopening on refresh/nav, but for now just open it
      setShowPaywall(true);
    }
  }, [setShowPaywall]);

  // Prompter Settings (Lifted State)
  const { settings: prompterSettings, actions: prompterActions } = usePrompterSettings(isPro);

  // Sync bilingual texts with config
  useEffect(() => {
    if (prompterSettings.isBilingualMode && prompterSettings.bilingualConfig) {
      setBilingualTexts({
        primary: prompterSettings.bilingualConfig.primaryText,
        secondary: prompterSettings.bilingualConfig.secondaryText,
        primaryLanguage: prompterSettings.bilingualConfig.primaryLanguage,
        secondaryLanguage: prompterSettings.bilingualConfig.secondaryLanguage
      });
    }
  }, [prompterSettings.isBilingualMode, prompterSettings.bilingualConfig]);

  const prompterRef = useRef<PrompterHandle>(null);
  const broadcastRef = useRef<any>(null);

  // 4. Peer Message Handling Strategy
  const handleRemoteMessage = useCallback(
    (msg: PeerMessage) => {
      switch (msg.type) {
        case MessageType.PLAY:
          // Logic to handle auto-entry into presentation mode with safe mounting
          if (typeof window !== "undefined" && !window.location.hash.includes("/play")) {
            window.location.hash = "app/play";
            setIsEditMode(false);
            // Critical: Add a small delay before starting playback to allow the Prompter component
            // to mount, render text, and initialize physics/metrics correctly.
            setTimeout(() => {
              setIsPlaying(true);
            }, 500);
          } else {
            setIsPlaying(true);
          }
          break;
        case MessageType.PAUSE:
          setIsPlaying(false);
          break;
        case MessageType.REQUEST_SYNC:
          // Force local wakeup first
          if (prompterRef.current) {
            prompterRef.current.wakeUp();
          }
          if (broadcastRef.current) {
            broadcastRef.current(MessageType.SYNC_STATE, {
              isPlaying,
              speed,
              settings: prompterSettings,
              text: text.substring(0, 10000),
              elapsedTime,
              navigationMap,
            });
          }
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
          if (prompterRef.current) {
            prompterRef.current.reset();
          } else {
            // Fallback if prompter is not mounted (e.g. in edit mode)
            setIsPlaying(false);
            setElapsedTime(0);
          }
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
            if (s.recordingMode) prompterActions.setRecordingMode(s.recordingMode);
            if (s.voiceControlMode) prompterActions.setVoiceControlMode(s.voiceControlMode);
          }
          break;
        case MessageType.TOGGLE_VOICE:
          if (prompterRef.current) {
            prompterRef.current.toggleVoice();
          }
          break;
        case MessageType.VOICE_SYNC:
          if (prompterRef.current && msg.payload) {
            prompterRef.current.onRemoteVoiceUpdate(msg.payload.activeSentenceIndex, msg.payload.voiceProgress);
          }
          break;
        case MessageType.TOGGLE_RECORDING:
          if (prompterRef.current) {
            prompterRef.current.toggleRecording();
          }
          break;
        case MessageType.PREVIOUS_PART:
          if (prompterRef.current) {
            prompterRef.current.onPreviousPart();
          }
          break;
        case MessageType.NEXT_PART:
          if (prompterRef.current) {
            prompterRef.current.onNextPart();
          }
          break;
        default:
          logger.warn("Received unknown message type", { context: { type: msg.type, message: msg } });
          break;
      }
    },
    [setSpeed, setText, prompterActions, isPlaying, speed, prompterSettings, text, elapsedTime, navigationMap]
  );

  const { peerId, status, broadcast, errorMessage } = usePeerHost(handleRemoteMessage, isPro);

  useEffect(() => {
    broadcastRef.current = broadcast;
  }, [broadcast]);

  const [unlockKey, setUnlockKey] = useState<string>("");
  const [paywallErrorMessage, setPaywallErrorMessage] = useState<string | null>(null);
  const [showCountdownModal, setShowCountdownModal] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

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
        navigationMap,
        isPro,
        isVoiceMode,
        isRecording,
        activeScriptTitle: activeScript?.title, // Broadcast active script title
      });
    }
  }, [
    isPlaying,
    speed,
    status,
    broadcast,
    prompterSettings,
    text,
    navigationMap,
    isPro,
    isVoiceMode,
    isRecording,
    activeScript
  ]);

  // 6.1 Time Broadcast (Lightweight)
  useEffect(() => {
    if (status === ConnectionStatus.CONNECTED && broadcast && isPlaying) {
      broadcast(MessageType.TIME_UPDATE, { elapsedTime });
    }
  }, [elapsedTime, status, broadcast, isPlaying]);

  const handleScrollUpdate = useCallback(
    (progress: number) => {
      broadcast(MessageType.SCROLL_SYNC, { progress });
    },
    [broadcast]
  );

  const handleNavigationMapUpdate = useCallback((map: NavigationItem[]) => {
    setNavigationMap(map);
  }, []);

  // 7. Actions
  const handlePrompterStateChange = useCallback(
    (playing: boolean, newSpeed: number) => {
      if (playing && !isPlaying) {
        trackStartPacing(newSpeed, isVoiceMode ? "voice" : "auto");
      }
      setIsPlaying(playing);
      setSpeed(newSpeed);
    },
    [setSpeed, isPlaying, isVoiceMode]

  );

  const handleUnlock = async () => {
    setPaywallErrorMessage(null); // Clear previous errors

    if (!unlockKey) {
      setPaywallErrorMessage(t("host.paywall.emptyKey"));
      return;
    }

    setIsValidating(true);
    try {
      const normalizedKey = unlockKey.trim().toUpperCase();
      const result = await unlockPro(normalizedKey);
      if (!result.success) {
        setPaywallErrorMessage(result.message || t("host.paywall.invalidKey"));
      } else {
        trackGoogleAdsPurchase();
        setUnlockKey("");
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleClosePaywall = () => {
    setShowPaywall(false);
    setElapsedTime(0); // Reset timer to allow another free session
    // Only show countdown if we are in Play Mode (not Edit Mode)
    if (!isEditMode) {
      setShowCountdownModal(true);
    }
  };

  const handleCountdownEnd = () => {
    setShowCountdownModal(false);
  };

  const resetTimer = useCallback(() => {
    setElapsedTime(0);
  }, []);

  const forceSync = useCallback(() => {
    // 1. Force Physics WakeUp if Prompter is active
    if (prompterRef.current) {
      prompterRef.current.wakeUp();
    }

    // 2. Broadcast State
    if (broadcast) {
      broadcast(MessageType.SYNC_STATE, {
        isPlaying,
        speed,
        settings: prompterSettings,
        text: text.substring(0, 10000),
        elapsedTime,
        navigationMap,
        isPro,
        isVoiceMode,
        isRecording,
        activeScriptTitle: activeScript?.title,
      });
    }
  }, [
    broadcast,
    isPlaying,
    speed,
    prompterSettings,
    text,
    elapsedTime,
    navigationMap,
    isPro,
    isVoiceMode,
    isRecording,
    activeScript
  ]);

  const navigation = {
    startPresentation: () => {
      tryEnableNoSleep();
      window.location.hash = "app/play";
      // Force state update immediately to ensure responsiveness even if hash event is delayed
      setIsEditMode(false);
    },
    exitPresentation: () => {
      window.location.hash = "app";
      // Force state update immediately
      setIsEditMode(true);
      prompterActions.setIsHudless(false);
    },
  };

  const handleReset = useCallback(() => {
    broadcast(MessageType.RESTART);
  }, [broadcast]);

  const startRemoteRecording = useCallback(() => {
    broadcast(MessageType.START_REMOTE_RECORDING);
  }, [broadcast]);

  const stopRemoteRecording = useCallback(() => {
    broadcast(MessageType.STOP_REMOTE_RECORDING);
  }, [broadcast]);

  const prompterState = useMemo(() => ({ isPlaying, speed }), [isPlaying, speed]);

  // Handler for bilingual text changes
  const handleBilingualTextsChange = useCallback((texts: { primary: string; secondary: string; primaryLanguage?: string; secondaryLanguage?: string }) => {
    setBilingualTexts(texts);
    prompterActions.setBilingualConfig({
      ...prompterSettings.bilingualConfig,
      primaryText: texts.primary,
      secondaryText: texts.secondary,
      primaryLanguage: texts.primaryLanguage,
      secondaryLanguage: texts.secondaryLanguage
    });
  }, [prompterActions, prompterSettings.bilingualConfig]);

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
      isValidating,
      isRecording,
      bilingualTexts,
      isTrialActive,
      trialEndTime,
      // New Script Management State
      scripts,
      activeScriptId,
      activeScript,
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
      handleNavigationMapUpdate,
      forceSync,
      setIsVoiceMode,
      handleReset,
      setIsRecording,
      startRemoteRecording,
      stopRemoteRecording,
      handleBilingualTextsChange,
      startTrial,
      // New Script Management Actions
      createScript,
      switchScript,
      deleteScript,
      updateScript,
    },
    refs: {
      prompterRef,
    },
  };
};
