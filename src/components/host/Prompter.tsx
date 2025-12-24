import React, {
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { ConnectionStatus, PrompterHandle, PrompterSettings, NavigationItem, Theme } from "../../types";
import * as S from "../ui/Styled";
import { useVoiceControl } from "../../hooks/useVoiceControl";
import { parseTextToSentences } from "../../utils/textParser";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useWakeLock } from "../../hooks/useWakeLock";
import { useScrollPhysics } from "../../hooks/useScrollPhysics";
import { usePictureInPicture } from "../../hooks/usePictureInPicture";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useElementMetrics } from "../../hooks/useElementMetrics";
import { ScriptBoard } from "./ScriptBoard";
import { PrompterHUD } from "./PrompterHUD";
import { QuickEditModal } from "./QuickEditModal";
import { trackEvent, trackFinishReading, trackEngagedUser } from "../../utils/analytics";
import { Script } from "../../hooks/useScriptStorage";

import { useNavigationMap } from "../../hooks/useNavigationMap";
import { useMediaRecorder } from "../../hooks/useMediaRecorder";
import { usePrompterTheme } from "../../hooks/usePrompterTheme";
import { UI_LIMITS } from "../../config/constants";
import { TextCommand } from "../../types";
import { MobileCameraOverlay } from "./MobileCameraOverlay";
import { FitnessHUD } from "../overlay/FitnessHUD";
import { parseSpokenNumber } from "../../utils/numberParser";
import { useTranslation } from "../../hooks/useTranslation";

interface PrompterProps {
  text: string;
  isPro: boolean;
  peerId: string;
  status: ConnectionStatus;
  onExit: () => void;
  setShowPaywall: (show: boolean) => void;
  externalState: { isPlaying: boolean; speed: number };
  onStateChange: (isPlaying: boolean, speed: number) => void;
  onScrollUpdate: (progress: number) => void;
  onNavigationMapUpdate?: (map: NavigationItem[]) => void;
  onResetTimer?: () => void;
  settings: PrompterSettings;
  actions: PrompterActions;
  onSync: () => void;
  onTextChange: (text: string) => void;
  onVoiceModeChange?: (isVoiceMode: boolean) => void;
  onRecordingStatusChange?: (isRecording: boolean) => void;
  onReset?: () => void;
  onStartRemoteRecording?: () => void;
  onStopRemoteRecording?: () => void;
  // Script Management Props
  scripts: Script[];
  activeScriptId: string;
  onSwitchScript: (id: string) => void;
  onCreateScript: () => void;
  onDeleteScript: (id: string) => void;
  onUpdateScript: (id: string, updates: Partial<Script>) => void;
}

export const Prompter = memo(
  forwardRef<PrompterHandle, PrompterProps>(
    ({ text, isPro, status, peerId, onExit, setShowPaywall, externalState, onStateChange, onScrollUpdate, onNavigationMapUpdate, onResetTimer, settings, actions, onSync, onTextChange, onVoiceModeChange, onRecordingStatusChange, onReset, onStartRemoteRecording, onStopRemoteRecording, scripts, activeScriptId, onSwitchScript, onCreateScript, onDeleteScript, onUpdateScript }, ref) => {

      // Extracted Settings Logic
      const { fontSize, margin, isMirrored, theme, isUpperCase, isFocusMode, isFlipVertical, voiceControlMode, recordingMode, isMusicianMode, isBilingualMode, bilingualConfig, isHudless, isCameraMode, isWidgetMode } = settings;

      // Ephemeral State
      const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
      const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);
      const [pauseTimeoutId, setPauseTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

      // Fitness Mode State
      const [fitnessMode, setFitnessMode] = useState<'REST' | 'COUNT' | null>(null);
      const [fitnessValue, setFitnessValue] = useState<number>(0);
      const [fitnessTarget, setFitnessTarget] = useState<number | undefined>(undefined);
      const fitnessIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
      const { lang } = useTranslation();

      // Loop Logic Refs
      const loopStartStackRef = useRef<number[]>([]);
      const loopCountersRef = useRef<Map<number, number>>(new Map());

      // Notify parent of voice mode change
      useEffect(() => {
        if (onVoiceModeChange) {
          onVoiceModeChange(isVoiceMode);
        }
      }, [isVoiceMode, onVoiceModeChange]);

      const [remoteVoiceState, setRemoteVoiceState] = useState<{ index: number; progress: number }>({ index: -1, progress: 0 });
      const [showHud, setShowHud] = useState<boolean>(true);
      const [showEditModal, setShowEditModal] = useState<boolean>(false);
      const [resetTimerSignal, setResetTimerSignal] = useState<boolean>(false);

      // Refs
      const containerRef = useRef<HTMLDivElement>(null);
      const scrollContainerRef = useRef<HTMLDivElement>(null);

      const hudTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
      const mouseMoveRafRef = useRef<number | null>(null);

      // Engaged User Tracking (Micro-conversion)
      const hasStartedScrollingRef = useRef<boolean>(false);
      const engagedUserTrackedRef = useRef<boolean>(false);
      const startTimeRef = useRef<number>(Date.now());

      useEffect(() => {
        if (externalState.isPlaying) {
          hasStartedScrollingRef.current = true;
        }
      }, [externalState.isPlaying]);

      useEffect(() => {
        const interval = setInterval(() => {
          // 3 minutes = 180,000 ms
          const timeElapsed = Date.now() - startTimeRef.current;

          if (!engagedUserTrackedRef.current && hasStartedScrollingRef.current && timeElapsed >= 180000) {
            trackEngagedUser();
            engagedUserTrackedRef.current = true;
            console.log("[Prompter] Engaged user event fired");
          }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
      }, []);

      // Theme Logic
      // FORCE DARK THEME if Musician Mode is active (overriding user theme preference)
      const effectiveTheme = isMusicianMode ? Theme.DEFAULT : theme;
      const { getThemeClass } = usePrompterTheme(effectiveTheme);

      // Picture-in-Picture
      const { pipWindow, togglePiP, isPiPActive } = usePictureInPicture();

      // Media Recorder
      const {
        isRecording,
        isPaused,
        recordingTime,
        hasRecordedData,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        downloadRecording,
        formatTime
      } = useMediaRecorder(cameraStream);

      // Sync Recording Pause with Scroll Pause
      useEffect(() => {
        if (!isRecording) return;

        if (externalState.isPlaying) {
          if (isPaused) resumeRecording();
        } else {
          if (!isPaused) pauseRecording();
        }
      }, [externalState.isPlaying, isRecording, isPaused, resumeRecording, pauseRecording]);

      const handleStartRecording = useCallback(async () => {
        if (recordingMode === "remote") {
          if (onStartRemoteRecording) onStartRemoteRecording();
        } else {
          await startRecording();
          trackEvent("recording_start", { mode: recordingMode || "host" });
        }
      }, [recordingMode, startRecording, onStartRemoteRecording]);

      const handleStopRecording = useCallback(() => {
        if (recordingMode === "remote") {
          if (onStopRemoteRecording) onStopRemoteRecording();
        } else {
          stopRecording();
          trackEvent("recording_stop", { mode: recordingMode || "host", duration: recordingTime });
        }
      }, [recordingMode, stopRecording, onStopRemoteRecording, recordingTime]);

      const handlePauseRecording = useCallback(() => {
        pauseRecording();
        onStateChange(false, externalState.speed);
      }, [pauseRecording, onStateChange, externalState.speed]);

      const handleResumeRecording = useCallback(() => {
        resumeRecording();
        onStateChange(true, externalState.speed);
      }, [resumeRecording, onStateChange, externalState.speed]);



      // Voice Control - Use correct text based on bilingual config
      const voiceControlText = useMemo(() => {
        if (isBilingualMode && bilingualConfig) {
          return bilingualConfig.voiceTrackLanguage === 'primary'
            ? bilingualConfig.primaryText
            : bilingualConfig.secondaryText;
        }
        return text;
      }, [isBilingualMode, bilingualConfig, text]);

      const handleSpeechResult = useCallback((transcript: string) => {
        if (fitnessMode === 'COUNT' && fitnessTarget) {
          const currentLang = (['pt', 'en', 'es'].includes(lang) ? lang : 'en') as 'pt' | 'en' | 'es';
          const number = parseSpokenNumber(transcript, currentLang);

          if (number !== null) {
            // "Catch-up" Logic: 
            // If user says a number higher than current, jump to it (they might have counted fast or we missed one).
            // Only strict rule: must be > current value.
            // Also allow repeating current value (confirmation).
            if (number > fitnessValue || number === fitnessValue + 1) {
              setFitnessValue(number);

              // Done!
              if (number >= fitnessTarget) {
                setFitnessMode(null);
                setFitnessValue(0);
                setFitnessTarget(undefined);
                onStateChange(true, externalState.speed);
              }
            }
          }
        }
      }, [fitnessMode, fitnessTarget, fitnessValue, lang, onStateChange, externalState.speed]);



      const effectiveVoiceLang = useMemo(() => {
        if (isBilingualMode && bilingualConfig) {
          return bilingualConfig.voiceTrackLanguage === 'primary'
            ? (bilingualConfig.primaryLanguage || 'pt')
            : (bilingualConfig.secondaryLanguage || 'en');
        }
        return settings.voiceLanguage || lang;
      }, [isBilingualMode, bilingualConfig, lang, settings.voiceLanguage]);

      const { startListening, stopListening, resetVoice, activeSentenceIndex, voiceProgress, sentences, voiceApiSupported, voiceApiError } = useVoiceControl(
        voiceControlText,
        isPro,
        handleSpeechResult,
        effectiveVoiceLang
      );

      // Bilingual Sentences Processing
      const bilingualSentences = useMemo(() => {
        if (!isBilingualMode || !bilingualConfig) return null;
        return {
          primary: parseTextToSentences(bilingualConfig.primaryText).sentences,
          secondary: parseTextToSentences(bilingualConfig.secondaryText).sentences
        };
      }, [isBilingualMode, bilingualConfig]);

      // Abstraction: Handle DOM measurements
      const metricsRef = useElementMetrics(scrollContainerRef, [sentences, fontSize, margin, isUpperCase]);

      // Command Detection and Execution
      const handleCommandTriggered = useCallback((command: TextCommand, sentenceId: number) => {
        if (command.type === 'STOP') {
          onStateChange(false, externalState.speed);
        } else if (command.type === 'PAUSE' && command.duration) {
          onStateChange(false, externalState.speed);
          const timeoutId = setTimeout(() => {
            onStateChange(true, externalState.speed);
          }, command.duration * 1000);
          setPauseTimeoutId(timeoutId);
        } else if (command.type === 'SPEED' && command.value !== undefined) {
          onStateChange(externalState.isPlaying, command.value);
        } else if (command.type === 'COUNT' && command.value) {
          // Safety: If not Pro or Voice not supported, ignore command to prevent getting stuck
          if (!isPro || !voiceApiSupported) {
            return;
          }

          // Auto-enable voice if off
          if (!isVoiceMode) {
            setIsVoiceMode(true);
          }
          startListening();

          onStateChange(false, externalState.speed);
          setFitnessMode('COUNT');
          setFitnessValue(0);
          setFitnessTarget(command.value);
        } else if (command.type === 'REST' && command.duration) {
          onStateChange(false, externalState.speed);
          setFitnessMode('REST');
          setFitnessValue(command.duration);

          if (fitnessIntervalRef.current) clearInterval(fitnessIntervalRef.current);

          fitnessIntervalRef.current = setInterval(() => {
            setFitnessValue((prev) => {
              if (prev <= 1) {
                if (fitnessIntervalRef.current) clearInterval(fitnessIntervalRef.current);
                setFitnessMode(null);
                onStateChange(true, externalState.speed);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

        } else if (command.type === 'LOOP_START') {
          // Push this start point to the stack
          // Prevent duplicate pushes if we are just re-scrolling slightly
          const stack = loopStartStackRef.current;
          if (stack.length === 0 || stack[stack.length - 1] !== sentenceId) {
            stack.push(sentenceId);
          }
        } else if (command.type === 'LOOP_END') {
          const iterations = command.value || 1;
          const currentCount = loopCountersRef.current.get(sentenceId) || 0;

          // Get the corresponding start point (Top of stack)
          const stack = loopStartStackRef.current;
          const targetId = stack.length > 0 ? stack[stack.length - 1] : null;

          if (currentCount < iterations) {
            // Perform Loop
            if (targetId !== null) {
              const targetEl = document.getElementById(`sentence-${targetId}`);
              if (targetEl && scrollContainerRef.current) {
                const offsetCtx = scrollContainerRef.current.clientHeight * 0.1;
                const targetPos = Math.max(0, targetEl.offsetTop - offsetCtx);

                const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
                const progress = maxScroll > 0 ? targetPos / maxScroll : 0;

                if (physicsMethodsRef.current) {
                  physicsMethodsRef.current.scrollTo(progress);
                  physicsMethodsRef.current.clearCommands(targetId, sentenceId);
                  loopCountersRef.current.set(sentenceId, currentCount + 1);
                }
              }
            }
          } else {
            // Loop finished
            loopCountersRef.current.delete(sentenceId);
            // Only pop if we matched a start point
            if (targetId !== null) {
              stack.pop();
            }
          }
        }
      }, [onStateChange, externalState.speed, externalState.isPlaying, isVoiceMode, isPro, lang]);

      // Cleanup pause timeout on unmount
      useEffect(() => {
        return () => {
          if (pauseTimeoutId) clearTimeout(pauseTimeoutId);
          if (fitnessIntervalRef.current) clearInterval(fitnessIntervalRef.current);
        };
      }, [pauseTimeoutId]);

      useWakeLock();

      const handleAutoStop = useCallback(() => {
        onStateChange(false, externalState.speed);
        // Track finish reading
        // Estimate duration based on word count/speed is hard here without start time,
        // but we can just track the event for now. Ideally we'd pass duration.
        // For now, let's track the event.
        trackFinishReading(0); // 0 acts as placeholder or we can measure if we had start time state locally
      }, [onStateChange, externalState.speed]);

      // Determine effective voice state based on mode
      const effectiveActiveSentenceIndex = voiceControlMode === "remote" ? remoteVoiceState.index : activeSentenceIndex;
      const effectiveVoiceProgress = voiceControlMode === "remote" ? remoteVoiceState.progress : voiceProgress;

      // --- PHYSICS ENGINE INTEGRATION ---
      const { handleNativeScroll, handleRemoteInput, handleScrollTo, resetPhysics, wakeUpLoop, currentActiveElementRef, clearProcessedCommands } = useScrollPhysics({
        isPlaying: externalState.isPlaying,
        isVoiceMode,
        speed: externalState.speed,
        activeSentenceIndex: effectiveActiveSentenceIndex,
        voiceProgress: effectiveVoiceProgress,
        isFlipVertical,
        metricsRef,
        scrollContainerRef,
        onScrollUpdate,
        onAutoStop: handleAutoStop,
        onCommandTriggered: handleCommandTriggered,
      });

      // Ref to store physics methods for access inside handleCommandTriggered
      // This is necessary because handleCommandTriggered is defined before useScrollPhysics
      const physicsMethodsRef = useRef<{ scrollTo: (p: number) => void; clearCommands: (s: number, e: number) => void } | null>(null);
      useEffect(() => {
        physicsMethodsRef.current = {
          scrollTo: handleScrollTo,
          clearCommands: clearProcessedCommands
        };
      }, [handleScrollTo, clearProcessedCommands]);

      // Force wake up when critical props change or component mounts
      useEffect(() => {
        if (externalState.isPlaying) {
          wakeUpLoop();
        }
      }, [externalState.isPlaying, text.length, wakeUpLoop]);

      // Implement Loop Logic inside handleCommandTriggered using the ref
      // Redefining handleCommandTriggered properly requires access to scrollContainerRef (which we have)
      // and physicsMethodsRef. Since we can't change the order easily without large refactor,
      // we check physicsMethodsRef inside the callback.

      // Update the callback implementation (RE-WRITING COMMAND HANDLER TO USE REF)
      // We will perform a second replacement to fix the body of handleCommandTriggered now that we have the Ref plan.
      // Actually I can just do it all in one go, but the previous chunk set up the structure.
      // I will refine the body of handleCommandTriggered in a subsequent tool call or fix it now.
      // I'll fix it now by replacing the content I just wrote in chunk 2 if possible? No, I must write it correct first time.
      // Let's adjust the Chunks.

      const resetPrompter = useCallback(() => {
        onStateChange(false, externalState.speed);
        setResetTimerSignal((p) => !p);
        if (onResetTimer) onResetTimer();
        resetVoice();
        if (onReset) onReset();
        setRemoteVoiceState({ index: -1, progress: 0 });
        resetPhysics();
        loopCountersRef.current.clear(); // Clear loop counters
        loopStartStackRef.current = [];
        setFitnessMode(null); // Reset fitness mode
        if (fitnessIntervalRef.current) clearInterval(fitnessIntervalRef.current);
        if (currentActiveElementRef.current) {
          currentActiveElementRef.current.classList.remove("sentence-active");
        }
      }, [onStateChange, externalState.speed, resetVoice, resetPhysics, currentActiveElementRef, onReset]);

      useKeyboardShortcuts({
        isPlaying: externalState.isPlaying,
        onTogglePlay: () => onStateChange(!externalState.isPlaying, externalState.speed),
        speed: externalState.speed,
        onSpeedChange: (val) => onStateChange(externalState.isPlaying, val),
        fontSize: fontSize,
        onFontSizeChange: actions.setFontSize,
        onToggleMirror: () => actions.setIsMirrored(!isMirrored),
        onToggleFlip: () => actions.setIsFlipVertical(!isFlipVertical),
        onToggleFocus: () => actions.setIsFocusMode(!isFocusMode),
        onExit: onExit,
        onReset: resetPrompter,
        onToggleHud: () => actions.setIsHudless(!isHudless),
        onToggleCamera: () => actions.setIsCameraMode(!isCameraMode),
        onToggleWidget: () => actions.setIsWidgetMode(!isWidgetMode),
        onPreviousPart: () => handleJumpToPart('prev'),
        onNextPart: () => handleJumpToPart('next'),
      });

      // Part Jumping Logic
      const partIndices = useMemo(() => {
        return sentences
          .map((s, idx) => (s.command?.type === 'PART' ? idx : -1))
          .filter((idx) => idx !== -1);
      }, [sentences]);

      const handleJumpToPart = useCallback((direction: 'next' | 'prev') => {
        if (partIndices.length === 0 || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollTop = container.scrollTop;
        const readingZoneOffset = container.clientHeight * 0.1;
        const currentPos = scrollTop + readingZoneOffset;

        // Find positions of all parts
        const partPositions = partIndices.map(idx => {
          const el = document.getElementById(`sentence-${idx}`);
          return { index: idx, top: el ? el.offsetTop : 0 };
        }).filter(p => p.top > 0 || p.index === 0);

        if (direction === 'next') {
          const nextPart = partPositions.find(p => p.top > currentPos + 10);
          if (nextPart) {
            handleScrollToPart(nextPart.index);
          }
        } else {
          // INCREASED THRESHOLD:
          // If playing, we use a larger buffer (readingZoneOffset) to avoid the "stuck" feeling
          // where high-speed scroll immediately moves past the part start.
          const threshold = externalState.isPlaying ? Math.max(300, readingZoneOffset) : 10;
          const prevParts = partPositions.filter(p => p.top < currentPos - threshold);

          if (prevParts.length > 0) {
            handleScrollToPart(prevParts[prevParts.length - 1].index);
          } else {
            handleScrollTo(0);
          }
        }
      }, [partIndices, handleScrollTo, externalState.isPlaying]);

      const handleScrollToPart = useCallback((sentenceIndex: number) => {
        const targetEl = document.getElementById(`sentence-${sentenceIndex}`);
        if (targetEl && scrollContainerRef.current) {
          const offsetCtx = scrollContainerRef.current.clientHeight * 0.1;
          const targetPos = Math.max(0, targetEl.offsetTop - offsetCtx);
          const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
          const progress = maxScroll > 0 ? targetPos / maxScroll : 0;
          handleScrollTo(progress);
        }
      }, [handleScrollTo]);

      // Voice control toggle
      const toggleVoice = useCallback(() => {
        if (!isPro) {
          trackEvent("feature_error", { feature_name: "voice_control" });
          setShowPaywall(true);
          return;
        }

        if (isVoiceMode) {
          setIsVoiceMode(false);
          stopListening();
          // Remove active class from current element when stopping
          if (currentActiveElementRef.current) {
            currentActiveElementRef.current.classList.remove("sentence-active");
          }
        } else {
          setIsVoiceMode(true);
          // Pause auto-scroll when enabling voice mode
          onStateChange(false, externalState.speed);
          if (voiceControlMode !== "remote") {
            startListening();
          }
        }
      }, [
        isPro,
        isVoiceMode,
        setShowPaywall,
        stopListening,
        startListening,
        onStateChange,
        externalState.speed,
        currentActiveElementRef,
        voiceControlMode
      ]);

      // Handle Dynamic Mode Switching
      useEffect(() => {
        if (isVoiceMode) {
          if (voiceControlMode !== "remote") {
            startListening();
          } else {
            console.warn("[Prompter] Voice Mode is Remote - Not starting local listener");
          }
        } else {
          stopListening();
        }
      }, [voiceControlMode, isVoiceMode, startListening, stopListening]);

      const onRemoteVoiceUpdate = useCallback((index: number, progress: number) => {
        setRemoteVoiceState({ index, progress });
      }, []);

      // Expose methods to parent
      useImperativeHandle(
        ref,
        () => ({
          onRemoteScroll: (delta: number, stop: boolean = false, hardStop: boolean = false) => handleRemoteInput(delta, stop, hardStop),
          scrollTo: handleScrollTo,
          reset: resetPrompter,
          toggleVoice: toggleVoice,
          wakeUp: wakeUpLoop,
          onRemoteVoiceUpdate,
          toggleRecording: () => {
            if (isRecording) {
              stopRecording();
            } else {
              startRecording();
            }
          },
          onPreviousPart: () => handleJumpToPart('prev'),
          onNextPart: () => handleJumpToPart('next'),
        }),
        [handleRemoteInput, handleScrollTo, resetPrompter, toggleVoice, wakeUpLoop, onRemoteVoiceUpdate, isRecording, stopRecording, startRecording, handleJumpToPart]
      );

      // Notify parent of recording status change
      useEffect(() => {
        if (onRecordingStatusChange) {
          onRecordingStatusChange(isRecording);
        }
      }, [isRecording, onRecordingStatusChange]);

      // Voice Active Element Highlighting (UI Side)
      useEffect(() => {
        if (!isVoiceMode) return;

        const newId = effectiveActiveSentenceIndex;
        const oldElement = currentActiveElementRef.current;

        // Try direct ID first, fallback to data attribute for musician mode
        let newElement = document.getElementById(`sentence-${newId}`);
        if (!newElement) {
          newElement = document.querySelector(`[data-original-sentence-id="${newId}"]`) as HTMLElement | null;
        }

        if (oldElement && oldElement !== newElement) oldElement.classList.remove("sentence-active");
        if (newElement && oldElement !== newElement) {
          newElement.classList.add("sentence-active");
          currentActiveElementRef.current = newElement;
        }
      }, [effectiveActiveSentenceIndex, isVoiceMode, currentActiveElementRef]);

      const handleMouseMove = useCallback(() => {
        if (mouseMoveRafRef.current) return;
        mouseMoveRafRef.current = requestAnimationFrame(() => {
          setShowHud(true);
          if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
          hudTimeoutRef.current = setTimeout(() => {
            if (externalState.isPlaying) setShowHud(false);
          }, UI_LIMITS.HUD.TIMEOUT_MS);
          mouseMoveRafRef.current = null;
        });
      }, [externalState.isPlaying]);

      // Navigation Map Calculation
      useNavigationMap({
        sentences,
        scrollContainerRef,
        fontSize,
        margin,
        isMirrored,
        isFlipVertical,
        isUpperCase,
        onNavigationMapUpdate
      });

      // Dynamic Focus Line Gradient
      const focusGradient = useMemo(() => {
        // Chroma keys should not have focus gradient to ensure pure color
        if (effectiveTheme === Theme.CHROMA_GREEN || effectiveTheme === Theme.CHROMA_BLUE) {
          return 'none';
        }

        const getThemeColor = (t: string) => {
          switch (t) {
            case Theme.PAPER: return '#ffffff';
            case Theme.CONTRAST: return '#000000';
            case Theme.MATRIX: return '#000000';
            case Theme.CYBER: return '#0f172a'; // slate-900
            case Theme.CREAM: return '#fdfbf7';
            default: return '#020617'; // slate-950 (Ninja/Default)
          }
        };

        const color = getThemeColor(effectiveTheme);

        // If Focus Mode is active, we narrow the transparent window significantly
        // Expanded the window as requested: from 42-58% to 35-65% (30% of screen height)
        const start = isFocusMode ? "40%" : "10%";
        const end = isFocusMode ? "70%" : "90%";

        // Use a smooth gradient (fade) instead of hard stops
        // From Solid Color (Top) -> Transparent (Start) ... Transparent (End) -> Solid Color (Bottom)
        return `linear-gradient(to bottom, 
          ${color} 0%, 
          rgba(0,0,0,0) ${start}, 
          rgba(0,0,0,0) ${end}, 
          ${color} 100%
        )`;
      }, [theme, isFocusMode, effectiveTheme]); // Added effectiveTheme dependency

      const handleFitnessSkip = useCallback(() => {
        setFitnessMode(null);
        setFitnessValue(0);
        setFitnessTarget(undefined);
        if (fitnessIntervalRef.current) clearInterval(fitnessIntervalRef.current);
        onStateChange(true, externalState.speed);
      }, [onStateChange, externalState.speed]);

      const containerStyle = useMemo(
        () => {
          let fontFamilyValue = 'var(--font-primary)';
          if (settings.fontFamily === 'OpenDyslexic') fontFamilyValue = '"OpenDyslexic", sans-serif';
          else if (settings.fontFamily === 'Roboto Mono') fontFamilyValue = '"Roboto Mono", monospace';
          else if (settings.fontFamily === 'Poppins') fontFamilyValue = '"Poppins", sans-serif';
          else if (settings.fontFamily === 'Lexend') fontFamilyValue = '"Lexend", sans-serif';

          return {
            "--prompter-font-size": `${fontSize}px`,
            "--prompter-font-family": fontFamilyValue,
            "--prompter-content-width": isWidgetMode ? "100%" : `calc(50% + ${margin}%)`,
          } as React.CSSProperties;
        },
        [fontSize, margin, isWidgetMode, settings.fontFamily]
      );

      // effectiveTheme is now defined at the top


      const prompterContent = (
        <S.ScreenContainer
          ref={containerRef}
          className={`relative h-screen ${getThemeClass()}`} // getThemeClass depends on global current theme or passed one?
          // We need to ensure getThemeClass respects this override. 
          // But usePrompterTheme returns getThemeClass based on the hook input `theme`.
          // We passed `theme` to the hook earlier!

          data-theme={effectiveTheme}
          style={containerStyle}
        >
          {/* Camera Overlay Layer - Bottom Most */}
          <MobileCameraOverlay isActive={!!isCameraMode} onStreamReady={setCameraStream} />

          {/* Widget Mode Style Overrides */}
          {isWidgetMode && isCameraMode && (
            <style>{`
              .prompter-scroll-area {
                width: 80% !important;
                height: 50% !important;
                position: absolute !important;
                top: 5% !important;
                left: 5% !important;
                border-radius: 20px !important;
                border: 2px solid rgba(255, 255, 255, 0.1) !important;
                background: rgba(0, 0, 0, 0.6) !important; /* Semi-transparent background for readability */
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
                backdrop-filter: blur(4px) !important;
                z-index: 20 !important; /* Above camera, below HUD */
                overflow: hidden !important;
              }
              /* Adjust Focus Indicator for Widget Mode */
              .focus-indicator {
                display: none !important; 
              }
            `}</style>
          )}

          {effectiveTheme === "matrix" && (
            <div className="absolute inset-0 pointer-events-none opacity-10 "></div>
          )}
          <div
            className="absolute inset-0 z-30 pointer-events-none transition-all duration-500"
            style={{
              background: focusGradient,
            }}
          ></div>

          {isFocusMode && ![Theme.CHROMA_GREEN, Theme.CHROMA_BLUE].includes(effectiveTheme) && <S.FocusIndicator />}

          <FitnessHUD mode={fitnessMode} value={fitnessValue} target={fitnessTarget} onSkip={handleFitnessSkip} />



          <S.MainContent onMouseMove={handleMouseMove}>
            <S.PrompterScrollArea
              ref={scrollContainerRef}
              onScroll={handleNativeScroll}
              className={`hardware-accelerated prompter-scroll-area ${isVoiceMode ? 'voice-control-smooth' : ''}`}

              style={{
                paddingLeft: `${margin}%`,
                paddingRight: `${margin}%`,
                transform: isFlipVertical ? "scaleY(-1)" : undefined,
              }}
              contentStyle={{
                paddingTop: '50vh',
                paddingBottom: '50vh'
              }}
            >
              <ScriptBoard
                sentences={sentences}
                isMirrored={isMirrored}
                isFlipVertical={isFlipVertical}
                isUpperCase={isUpperCase}
                isPro={isPro}
                theme={effectiveTheme}
                isMusicianMode={isMusicianMode}
                isBilingualMode={isBilingualMode}
                bilingualSentences={bilingualSentences || undefined}
                fontSize={fontSize}
                margin={margin}
              />
            </S.PrompterScrollArea>
          </S.MainContent>

          <PrompterHUD
            showHud={showHud}
            peerId={peerId}
            status={status}
            isPlaying={externalState.isPlaying}
            speed={externalState.speed}
            settings={settings}
            isCameraMode={isCameraMode}
            actions={actions}
            isVoiceMode={isVoiceMode}
            isPro={isPro}
            voiceApiSupported={voiceApiSupported}
            voiceApiError={voiceApiError}
            resetTimerSignal={resetTimerSignal}
            onStateChange={onStateChange}
            onResetPrompter={resetPrompter}
            toggleVoice={toggleVoice}
            onExit={onExit}
            onSync={onSync}
            onEdit={() => setShowEditModal(true)}
            togglePiP={togglePiP}
            isPiPActive={isPiPActive}
            onPreviousPart={() => handleJumpToPart('prev')}
            onNextPart={() => handleJumpToPart('next')}
            hasParts={partIndices.length > 0}
            recordingState={{
              isRecording,
              isPaused,
              recordingTime: formatTime(recordingTime),
              hasRecordedData
            }}
            recordingActions={{
              start: handleStartRecording,
              stop: handleStopRecording,
              pause: handlePauseRecording,
              resume: handleResumeRecording,
              download: downloadRecording
            }}
          />

          <QuickEditModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            text={text}
            onSave={(newText) => {
              onTextChange(newText);
              setShowEditModal(false);
            }}
            scripts={scripts}
            activeScriptId={activeScriptId}
            onSwitchScript={onSwitchScript}
            onCreateScript={onCreateScript}
            onDeleteScript={onDeleteScript}
            onUpdateScript={onUpdateScript}
          />
        </S.ScreenContainer>
      );

      if (pipWindow) {
        return (
          <>
            {createPortal(prompterContent, pipWindow.document.body)}
            {/* Keep HUD in the main window when PiP is active */}
            <div className="flex flex-col items-center justify-center h-screen bg-slate-950 p-8 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Modo Picture-in-Picture Ativo</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  O teleprompter está sendo exibido em uma janela flutuante.
                  Use os controles abaixo para gerenciar a apresentação.
                </p>
              </div>

              <div className="relative w-full max-w-2xl h-32">
                <PrompterHUD
                  showHud={showHud}
                  peerId={peerId}
                  status={status}
                  isPlaying={externalState.isPlaying}
                  speed={externalState.speed}
                  settings={settings}
                  isCameraMode={isCameraMode}
                  actions={actions}
                  isVoiceMode={isVoiceMode}
                  isPro={isPro}
                  voiceApiSupported={voiceApiSupported}
                  voiceApiError={voiceApiError}
                  resetTimerSignal={resetTimerSignal}
                  onStateChange={onStateChange}
                  onResetPrompter={resetPrompter}
                  toggleVoice={toggleVoice}
                  onExit={onExit}
                  onSync={onSync}
                  onEdit={() => setShowEditModal(true)}
                  togglePiP={togglePiP}
                  isPiPActive={isPiPActive}
                  onPreviousPart={() => handleJumpToPart('prev')}
                  onNextPart={() => handleJumpToPart('next')}
                  hasParts={partIndices.length > 0}
                  recordingState={{
                    isRecording,
                    isPaused,
                    recordingTime: formatTime(recordingTime),
                    hasRecordedData
                  }}
                  recordingActions={{
                    start: handleStartRecording,
                    stop: handleStopRecording,
                    pause: handlePauseRecording,
                    resume: handleResumeRecording,
                    download: downloadRecording
                  }}
                />
              </div>
            </div>
          </>
        );
      }

      return prompterContent;
    }
  )
);
