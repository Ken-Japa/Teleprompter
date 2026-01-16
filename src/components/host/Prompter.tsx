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
import { VOICE_CONFIG } from "../../config/voiceControlConfig";
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
import { MaximizeIcon } from "../ui/Icons";
import { trackEvent, trackFinishReading, trackEngagedUser } from "../../utils/analytics";
import { Script } from "../../hooks/useScriptStorage";
import { Setlist } from "../../hooks/useSetlistStorage";

import { useNavigationMap } from "../../hooks/useNavigationMap";
import { useMediaRecorder } from "../../hooks/useMediaRecorder";
import { usePrompterTheme } from "../../hooks/usePrompterTheme";
import { UI_LIMITS } from "../../config/constants";
import { TextCommand } from "../../types";
import { MobileCameraOverlay } from "./MobileCameraOverlay";
import { FitnessHUD } from "../overlay/FitnessHUD";
import { parseSpokenNumber } from "../../utils/numberParser";
import { useTranslation } from "../../hooks/useTranslation";
import { useMidi } from "../../hooks/useMidi";
import { MidiAction } from "../../types";
import { useBackingTrack } from "../../hooks/useBackingTrack";


interface PhysicsMethods {

  scrollTo: (progress: number) => void;
  clearCommands: (startId: number, endId: number) => void;
  internalScrollPos: React.MutableRefObject<number>;
}

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
  onScriptFinished?: (summary: any) => void;
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

  // Setlist
  activeSetlist?: Setlist;
  detectedBpm?: number | null;
  autoBpmError?: string | null;
  isNDIEnabled?: boolean;
  onToggleNDI?: () => void;
  initialCursorIndex?: number | null;
}

export const Prompter = memo(
  forwardRef<PrompterHandle, PrompterProps>(
    ({ text, isPro, status, peerId, onExit, setShowPaywall, externalState, onStateChange, onScrollUpdate, onNavigationMapUpdate, onResetTimer, settings, actions, onSync, onTextChange, onVoiceModeChange, onRecordingStatusChange, onScriptFinished, onReset, onStartRemoteRecording, onStopRemoteRecording, scripts, activeScriptId, onSwitchScript, onCreateScript, onDeleteScript, onUpdateScript, activeSetlist, detectedBpm, autoBpmError, isNDIEnabled, onToggleNDI, initialCursorIndex }, ref) => {

      // Extracted Settings Logic
      const { fontSize, margin, isMirrored, theme, isUpperCase, isFocusMode, isFlipVertical, voiceControlMode, recordingMode, isMusicianMode, isBilingualMode, bilingualConfig, isHudless, isCameraMode, isWidgetMode, bpm, autoBpmEnabled } = settings;

      const effectiveBpm = (autoBpmEnabled && detectedBpm) ? detectedBpm : bpm;

      // Ephemeral State
      const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
      const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);
      const [pauseTimeoutId, setPauseTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

      // Fitness Mode State
      const [fitnessMode, setFitnessMode] = useState<'REST' | 'COUNT' | null>(null);
      const [fitnessValue, setFitnessValue] = useState<number>(0);
      const [fitnessTarget, setFitnessTarget] = useState<number | undefined>(undefined);
      const fitnessIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
      const { lang, t } = useTranslation();

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
      // Track exact container height for pixel-perfect padding calculation
      const [containerHeight, setContainerHeight] = useState<number>(0);

      // Height Tracking for Mobile Viewport Fix
      React.useLayoutEffect(() => {
        if (!scrollContainerRef.current) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            setContainerHeight(entry.contentRect.height);
          }
        });
        observer.observe(scrollContainerRef.current);
        return () => observer.disconnect();
      }, []);

      // Initial Scroll Logic based on Cursor Position



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

      const { startListening, stopListening, resetVoice, clearSessionSummary, activeSentenceIndex, voiceProgress, sentences, voiceApiSupported, voiceApiError, sessionSummary } = useVoiceControl(
        voiceControlText,
        isPro,
        handleSpeechResult,
        effectiveVoiceLang,
        isFlipVertical,
        isMusicianMode,
        isBilingualMode
      );

      const backingTrack = useBackingTrack(activeScriptId, sentences, isPro);



      // Notify parent when script is finished (either naturally or manual stop)
      useEffect(() => {
        if (sessionSummary && onScriptFinished) {
          onScriptFinished(sessionSummary);
          // DON'T clear it here automatically, wait for user to close modal
        }
      }, [sessionSummary, onScriptFinished]);

      // Bilingual Sentences Processing
      const bilingualSentences = useMemo(() => {
        if (!isBilingualMode || !bilingualConfig) return null;
        return {
          primary: parseTextToSentences(bilingualConfig.primaryText).sentences,
          secondary: parseTextToSentences(bilingualConfig.secondaryText).sentences
        };
      }, [isBilingualMode, bilingualConfig]);

      // Abstraction: Handle DOM measurements
      const metricsRef = useElementMetrics(scrollContainerRef, [sentences, fontSize, margin, isUpperCase, isFlipVertical]);

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
        } else if (command.type === 'BPM' && command.value !== undefined) {
          if (command.value === 'AUTO') {
            // Teaser logic - already handled by parser returning AUTO
            // We can show a toast or just trigger paywall if they click something
            // For now, let's just ignore or show a small hint if needed.
          } else {
            actions.setBpm(command.value);
          }
        }
      }, [onStateChange, externalState.speed, externalState.isPlaying, isVoiceMode, isPro, lang, actions]);

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
      const physicsResult = useScrollPhysics({
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
        isMusicianMode,
        bpm: effectiveBpm,
        backingTrackProgress: backingTrack.getProgress(),
      });

      const { handleNativeScroll, handleRemoteInput, handleScrollTo, resetPhysics, wakeUpLoop, currentActiveElementRef, clearProcessedCommands, internalScrollPos, handleInteractionStart, handleInteractionEnd, handleWheel } = physicsResult;

      // Initial Scroll Logic - MOVED HERE to access handleScrollTo
      const hasInitialScrolledRef = useRef<number | null>(null);

      useEffect(() => {
        if (initialCursorIndex !== undefined && initialCursorIndex !== null && sentences.length > 0) {
          // Prevent re-scrolling if we already processed this index
          if (hasInitialScrolledRef.current === initialCursorIndex) {
            return;
          }

          // HEURISTICS: Avoid jumping in cases where it might be accidental (like pasting or just starting)
          // Use voiceControlText length (the actual text being read/parsed) for accuracy
          const textLen = voiceControlText.length;

          // 1. If at the very beginning (0-40 chars)
          if (initialCursorIndex <= 40) {
            hasInitialScrolledRef.current = initialCursorIndex;
            return;
          }

          // 2. If at the very end or near the end (last 60 chars)
          // This covers the "cursor at end after paste" scenario more reliably than a percentage.
          if (initialCursorIndex >= textLen - 60) {
            hasInitialScrolledRef.current = initialCursorIndex;
            return;
          }

          let targetSentenceId = -1;
          for (let i = 0; i < sentences.length; i++) {
            const s = sentences[i];
            const nextS = sentences[i + 1];

            // Find the sentence that encompasses the cursor index
            const isLast = !nextS;
            const start = s.startIndex ?? 0;
            const end = isLast ? Infinity : (nextS.startIndex ?? Infinity);

            if (initialCursorIndex >= start && initialCursorIndex < end) {
              targetSentenceId = i;
              break;
            }
          }

          // Fallback: If not found, use the last sentence that started before the cursor
          if (targetSentenceId === -1) {
            for (let i = sentences.length - 1; i >= 0; i--) {
              if ((sentences[i].startIndex ?? 0) <= initialCursorIndex) {
                targetSentenceId = i;
                break;
              }
            }
          }

          if (targetSentenceId !== -1) {
            let attempts = 0;
            const checkAndScroll = () => {
              if (externalState.isPlaying) return; // Don't interrupt if user started playing

              const targetEl = document.getElementById(`sentence-${targetSentenceId}`);
              if (targetEl && scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const ready = container.scrollHeight > container.clientHeight && container.clientHeight > 0;

                if (ready) {
                  // Position the sentence slightly below the top (or above the bottom if flipped)
                  const readingZoneOffset = container.clientHeight * (isFlipVertical ? 0.90 : 0.10);
                  const targetPos = Math.max(0, targetEl.offsetTop - readingZoneOffset);

                  const maxScroll = container.scrollHeight - container.clientHeight;
                  const progress = maxScroll > 0 ? targetPos / maxScroll : 0;

                  handleScrollTo(progress);
                  hasInitialScrolledRef.current = initialCursorIndex;
                } else if (attempts < 15) {
                  attempts++;
                  setTimeout(checkAndScroll, 100);
                }
              } else if (attempts < 15) {
                attempts++;
                setTimeout(checkAndScroll, 100);
              }
            };

            setTimeout(checkAndScroll, 50);
          }
        }
      }, [initialCursorIndex, sentences, isFlipVertical, handleScrollTo, externalState.isPlaying, voiceControlText]);


      // Ref to store physics methods for access inside handleCommandTriggered
      // This is necessary because handleCommandTriggered is defined before useScrollPhysics
      const physicsMethodsRef = useRef<PhysicsMethods | null>(null);
      useEffect(() => {
        if (internalScrollPos) {
          physicsMethodsRef.current = {
            scrollTo: handleScrollTo,
            clearCommands: clearProcessedCommands,
            internalScrollPos: internalScrollPos
          };
        }
      }, [handleScrollTo, clearProcessedCommands, internalScrollPos]);

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
        clearSessionSummary(); // Clear analytics summary as well
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
      }, [onStateChange, externalState.speed, resetVoice, clearSessionSummary, resetPhysics, currentActiveElementRef, onReset]);

      // Moved Part Jumping Logic Up to fix Hoisting
      const partIndices = useMemo(() => {
        return sentences
          .map((s, idx) => (s.command?.type === 'PART' ? idx : -1))
          .filter((idx) => idx !== -1);
      }, [sentences]);

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
          const threshold = externalState.isPlaying ? Math.max(300, readingZoneOffset) : 10;
          const prevParts = partPositions.filter(p => p.top < currentPos - threshold);

          if (prevParts.length > 0) {
            handleScrollToPart(prevParts[prevParts.length - 1].index);
          } else {
            handleScrollTo(0);
          }
        }
      }, [partIndices, handleScrollTo, externalState.isPlaying, handleScrollToPart]);

      const handleNavigate = useCallback((direction: 'next' | 'prev') => {
        if (isMusicianMode) {
          if (activeSetlist && activeSetlist.songIds.length > 0) {
            // SETLIST NAVIGATION MODE
            const currentSongIndex = activeSetlist.songIds.indexOf(activeScriptId);

            if (direction === 'prev') {
              if (currentSongIndex > 0) {
                onSwitchScript(activeSetlist.songIds[currentSongIndex - 1]);
              }
            } else {
              if (currentSongIndex !== -1 && currentSongIndex < activeSetlist.songIds.length - 1) {
                onSwitchScript(activeSetlist.songIds[currentSongIndex + 1]);
              } else if (currentSongIndex === -1 && activeSetlist.songIds.length > 0) {
                // If current script is not in setlist, go to first one?
                onSwitchScript(activeSetlist.songIds[0]);
              }
            }
          } else {
            // ALL SCRIPTS (LEGACY/FALLBACK) MODE
            const idx = scripts.findIndex(s => s.id === activeScriptId);
            if (direction === 'prev') {
              if (idx > 0) onSwitchScript(scripts[idx - 1].id);
            } else {
              if (idx !== -1 && idx < scripts.length - 1) onSwitchScript(scripts[idx + 1].id);
            }
          }
        } else {
          handleJumpToPart(direction);
        }
      }, [isMusicianMode, scripts, activeScriptId, onSwitchScript, handleJumpToPart, activeSetlist]);

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
        onToggleHud: () => {
          const nextHudless = !isHudless;
          actions.setIsHudless(nextHudless);
          if (!nextHudless) setShowHud(true);
        },
        onToggleCamera: () => actions.setIsCameraMode(!isCameraMode),
        onToggleWidget: () => actions.setIsWidgetMode(!isWidgetMode),
        onPreviousPart: () => handleNavigate('prev'),
        onNextPart: () => handleNavigate('next'),
      });

      // --- MIDI CONTROL ---
      const handleMidiAction = useCallback((action: MidiAction) => {
        switch (action) {
          case MidiAction.TOGGLE_PLAY:
            onStateChange(!externalState.isPlaying, externalState.speed);
            break;
          case MidiAction.NEXT_SONG:
            handleNavigate('next');
            break;
          case MidiAction.PREV_SONG:
            handleNavigate('prev');
            break;
          case MidiAction.START_SCROLL:
            onStateChange(true, externalState.speed);
            break;
          case MidiAction.STOP_SCROLL:
            onStateChange(false, externalState.speed);
            break;
          case MidiAction.SPEED_UP:
            onStateChange(externalState.isPlaying, Math.min(UI_LIMITS.SPEED.MAX, externalState.speed + UI_LIMITS.SPEED.STEP));
            break;
          case MidiAction.SPEED_DOWN:
            onStateChange(externalState.isPlaying, Math.max(UI_LIMITS.SPEED.MIN, externalState.speed - UI_LIMITS.SPEED.STEP));
            break;
          case MidiAction.FONT_INCREASE:
            actions.setFontSize(Math.min(UI_LIMITS.FONT_SIZE.MAX, settings.fontSize + UI_LIMITS.FONT_SIZE.STEP_BUTTON));
            break;
          case MidiAction.FONT_DECREASE:
            actions.setFontSize(Math.max(UI_LIMITS.FONT_SIZE.MIN, settings.fontSize - UI_LIMITS.FONT_SIZE.STEP_BUTTON));
            break;
          case MidiAction.RESET:
            resetPrompter();
            break;
          case MidiAction.TOGGLE_MIRROR:
            actions.setIsMirrored(!settings.isMirrored);
            break;
          case MidiAction.EXIT:
            onExit();
            break;
          default:
            break;
        }
      }, [externalState.isPlaying, externalState.speed, onStateChange, handleNavigate, settings.fontSize, settings.isMirrored, actions, resetPrompter, onExit]);

      useMidi(handleMidiAction);



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
            // First activation: Use 0.5 (Center) because manual reading focus is at center
            // CRITICAL: Pass native scrollTop before it gets reset to 0 by useScrollPhysics sync effect
            startListening(0.5, scrollContainerRef.current?.scrollTop);
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
            // Reactivation: Use LOOKAHEAD_POSITION because text is already offset for voice mode
            // CRITICAL: Use absolute internal scroll position when voice is already active (scrollTop is 0)
            const currentPos = physicsMethodsRef.current?.internalScrollPos?.current;
            startListening(VOICE_CONFIG.LOOKAHEAD_POSITION, currentPos);
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
          onPreviousPart: () => handleNavigate('prev'),
          onNextPart: () => handleNavigate('next'),
          clearVoiceSummary: clearSessionSummary,
        }),
        [handleRemoteInput, handleScrollTo, resetPrompter, toggleVoice, wakeUpLoop, onRemoteVoiceUpdate, isRecording, stopRecording, startRecording, handleNavigate, clearSessionSummary]
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

      // --- LAYOUT SHIFT COMPENSATION ---
      // Fixes the "Jump" when toggling Voice Mode (Padding 50vh <-> 12vh)
      // When padding changes, content physically moves. We strictly compensate scrollTop
      // to keep the visual position constant.

      const getTargetPaddingRatio = useCallback(() => {
        if (!isVoiceMode) return 0.5; // Default 50%
        // UNIFIED COORDINATES: Always return Lookahead. Flip is handled by CSS scaleY(-1).
        return VOICE_CONFIG.LOOKAHEAD_POSITION;
      }, [isVoiceMode]);

      const prevPaddingRatioRef = useRef(getTargetPaddingRatio());

      React.useLayoutEffect(() => {
        if (!scrollContainerRef.current) return;

        const currentRatio = getTargetPaddingRatio();
        const prevRatio = prevPaddingRatioRef.current;

        if (currentRatio !== prevRatio) {
          const container = scrollContainerRef.current;
          // CRITICAL: Use the same height source as the padding calculation (containerHeight state or clientHeight here)
          // We use clientHeight from DOM which should match our state eventually, but instant access is better for layout effect.
          const h = container.clientHeight;

          const oldPx = prevRatio * h;
          const newPx = currentRatio * h;
          const delta = newPx - oldPx;

          // Apply compensation immediately before paint
          container.scrollTop += delta;

          // Sync Physics Engine internal state to prevent it from overwriting our fix
          // We can access the handleNativeScroll to force a sync if needed, but
          // changing scrollTop triggers a scroll event which handles it naturally.
          // However, to be safe against race conditions in the loop:
          // We can't easily access internalScrollPos here without exposing it.
          // Trusting the scroll event (native behavior) is best.
        }

        prevPaddingRatioRef.current = currentRatio;
      }, [getTargetPaddingRatio, isVoiceMode, isFlipVertical]); // added deps for safety

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

        const direction = isFlipVertical ? 'to top' : 'to bottom';

        // Use a smooth gradient (fade) instead of hard stops
        // From Solid Color (Top) -> Transparent (Start) ... Transparent (End) -> Solid Color (Bottom)
        return `linear-gradient(${direction}, 
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
          className={`relative h-screen ${getThemeClass()} notranslate`} // getThemeClass depends on global current theme or passed one?
          // We need to ensure getThemeClass respects this override. 
          // But usePrompterTheme returns getThemeClass based on the hook input `theme`.
          // We passed `theme` to the hook earlier!

          data-theme={effectiveTheme}
          style={containerStyle}
          translate="no"
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
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
              onMouseDown={handleInteractionStart}
              onMouseUp={handleInteractionEnd}
              onWheel={handleWheel}
              // Also handle cancellation cases
              onTouchCancel={handleInteractionEnd}
              onMouseLeave={handleInteractionEnd}
              className={`hardware-accelerated prompter-scroll-area ${isVoiceMode ? 'voice-control-smooth' : ''}`}

              style={{
                paddingLeft: `${margin}%`,
                paddingRight: `${margin}%`,
                transform: isFlipVertical ? "scaleY(-1)" : undefined,
              }}
              contentStyle={{
                // Voice Mode: Use configured Top Padding (calculated in PX) to allow text to start at Top instead of Center
                // We use containerHeight state to avoid 'vh' unit issues on mobile.
                // UNIFIED COORDINATES: Always use LOOKAHEAD_POSITION. Flip is handled by CSS scaleY(-1).
                paddingTop: isVoiceMode
                  ? (containerHeight > 0
                    ? `${VOICE_CONFIG.LOOKAHEAD_POSITION * containerHeight}px`
                    : `${VOICE_CONFIG.LOOKAHEAD_POSITION * 100}vh`
                  )
                  : '50vh', // Keep 50vh or 50% for manual mode? 50vh is standard.
                // Voice Mode: Increase padding to allow last lines to scroll comfortably to the reading marker
                paddingBottom: isVoiceMode
                  ? '80vh'
                  : '50vh'
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

          {isHudless && !isPiPActive && (
            <div className="absolute bottom-6 right-6 z-[100] animate-in fade-in duration-500">
              <S.IconButton
                onClick={() => actions.setIsHudless(false)}
                title={t("hudless.showControls") || "Show Controls"}
                className="w-8 h-8 rounded-full bg-slate-900/40 hover:bg-slate-800/80 border-white/5 text-slate-500 hover:text-brand-400 backdrop-blur-sm transition-all shadow-lg"
              >
                <MaximizeIcon className="w-4 h-4" />
              </S.IconButton>
            </div>
          )}

          <PrompterHUD
            showHud={showHud && !isHudless}
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
            onPreviousPart={() => handleNavigate('prev')}
            onNextPart={() => handleNavigate('next')}
            hasParts={partIndices.length > 0}
            detectedBpm={detectedBpm}
            autoBpmError={autoBpmError}
            setShowPaywall={setShowPaywall}
            isNDIEnabled={isNDIEnabled}
            onToggleNDI={onToggleNDI}
            backingTrack={backingTrack}
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
                  backingTrack={backingTrack}
                  setShowPaywall={setShowPaywall}
                  isNDIEnabled={isNDIEnabled}
                  onToggleNDI={onToggleNDI}
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
