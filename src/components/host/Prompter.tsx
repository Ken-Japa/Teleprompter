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
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useWakeLock } from "../../hooks/useWakeLock";
import { useScrollPhysics } from "../../hooks/useScrollPhysics";
import { usePictureInPicture } from "../../hooks/usePictureInPicture";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useElementMetrics } from "../../hooks/useElementMetrics";
import { ScriptBoard } from "./ScriptBoard";
import { PrompterHUD } from "./PrompterHUD";
import { QuickEditModal } from "./QuickEditModal";
import { trackEvent } from "../../utils/analytics";

import { useNavigationMap } from "../../hooks/useNavigationMap";
import { useMediaRecorder } from "../../hooks/useMediaRecorder";
import { usePrompterTheme } from "../../hooks/usePrompterTheme";
import { UI_LIMITS } from "../../config/constants";

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
}

export const Prompter = memo(
  forwardRef<PrompterHandle, PrompterProps>(
    ({ text, isPro, status, peerId, onExit, setShowPaywall, externalState, onStateChange, onScrollUpdate, onNavigationMapUpdate, onResetTimer, settings, actions, onSync, onTextChange, onVoiceModeChange, onRecordingStatusChange, onReset, onStartRemoteRecording, onStopRemoteRecording }, ref) => {

      // Extracted Settings Logic
      const { fontSize, margin, isMirrored, theme, isUpperCase, isFocusMode, isFlipVertical, voiceControlMode, recordingMode } = settings;

      // Ephemeral State
      const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);

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

      // Theme Logic
      const { getThemeClass } = usePrompterTheme(theme);

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
      } = useMediaRecorder();

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
        }
      }, [recordingMode, startRecording, onStartRemoteRecording]);

      const handleStopRecording = useCallback(() => {
        if (recordingMode === "remote") {
          if (onStopRemoteRecording) onStopRemoteRecording();
        } else {
          stopRecording();
        }
      }, [recordingMode, stopRecording, onStopRemoteRecording]);

      const handlePauseRecording = useCallback(() => {
        pauseRecording();
        onStateChange(false, externalState.speed);
      }, [pauseRecording, onStateChange, externalState.speed]);

      const handleResumeRecording = useCallback(() => {
        resumeRecording();
        onStateChange(true, externalState.speed);
      }, [resumeRecording, onStateChange, externalState.speed]);

      // Keyboard Shortcuts
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
      });

      // Voice Control
      const { startListening, stopListening, resetVoice, activeSentenceIndex, voiceProgress, sentences, voiceApiSupported, voiceApiError } = useVoiceControl(
        text,
        isPro
      );

      // Abstraction: Handle DOM measurements
      const metricsRef = useElementMetrics(scrollContainerRef, [sentences, fontSize, margin, isUpperCase]);

      useWakeLock();

      const handleAutoStop = useCallback(() => {
        onStateChange(false, externalState.speed);
      }, [onStateChange, externalState.speed]);

      // Determine effective voice state based on mode
      const effectiveActiveSentenceIndex = voiceControlMode === "remote" ? remoteVoiceState.index : activeSentenceIndex;
      const effectiveVoiceProgress = voiceControlMode === "remote" ? remoteVoiceState.progress : voiceProgress;

      // --- PHYSICS ENGINE INTEGRATION ---
      const { handleNativeScroll, handleRemoteInput, handleScrollTo, resetPhysics, wakeUpLoop, currentActiveElementRef } = useScrollPhysics({
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
      });

      // Force wake up when critical props change or component mounts
      useEffect(() => {
        if (externalState.isPlaying) {
          wakeUpLoop();
        }
      }, [externalState.isPlaying, text.length, wakeUpLoop]);

      const resetPrompter = useCallback(() => {
        onStateChange(false, externalState.speed);
        setResetTimerSignal((p) => !p);
        if (onResetTimer) onResetTimer();
        resetVoice();
        if (onReset) onReset();
        setRemoteVoiceState({ index: -1, progress: 0 });
        resetPhysics();
        if (currentActiveElementRef.current) {
          currentActiveElementRef.current.classList.remove("sentence-active");
        }
      }, [onStateChange, externalState.speed, resetVoice, resetPhysics, currentActiveElementRef, onReset]);

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
          if (voiceControlMode === "remote") {
            stopListening();
          } else {
            startListening();
          }
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
        }),
        [handleRemoteInput, handleScrollTo, resetPrompter, toggleVoice, wakeUpLoop, onRemoteVoiceUpdate, isRecording, stopRecording, startRecording]
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
        const newElement = document.getElementById(`sentence-${newId}`);

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
        if (theme === Theme.CHROMA_GREEN || theme === Theme.CHROMA_BLUE) {
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

        const color = getThemeColor(theme);

        // If Focus Mode is active, we narrow the transparent window significantly
        // Expanded the window as requested: from 42-58% to 35-65% (30% of screen height)
        const start = isFocusMode ? "25%" : "10%";
        const end = isFocusMode ? "75%" : "90%";

        // Use a smooth gradient (fade) instead of hard stops
        // From Solid Color (Top) -> Transparent (Start) ... Transparent (End) -> Solid Color (Bottom)
        return `linear-gradient(to bottom, 
          ${color} 0%, 
          rgba(0,0,0,0) ${start}, 
          rgba(0,0,0,0) ${end}, 
          ${color} 100%
        )`;
      }, [theme, isFocusMode]);

      const containerStyle = useMemo(
        () =>
          ({
            "--prompter-font-size": `${fontSize}px`,
            "--prompter-content-width": `calc(50% + ${margin}%)`,
          }) as React.CSSProperties,
        [fontSize, margin]
      );

      const prompterContent = (
        <S.ScreenContainer
          ref={containerRef}
          className={`relative h-screen ${getThemeClass()}`}
          data-theme={theme}
          style={containerStyle}
        >
          {theme === "matrix" && (
            <div className="absolute inset-0 pointer-events-none opacity-10 "></div>
          )}
          <div
            className="absolute inset-0 z-30 pointer-events-none transition-all duration-500"
            style={{
              background: focusGradient,
            }}
          ></div>

          {isFocusMode && ![Theme.CHROMA_GREEN, Theme.CHROMA_BLUE].includes(theme) && <S.FocusIndicator />}

          <S.MainContent onMouseMove={handleMouseMove}>
            <S.PrompterScrollArea
              ref={scrollContainerRef}
              onScroll={handleNativeScroll}
              className="hardware-accelerated"
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
              <ScriptBoard sentences={sentences} isMirrored={isMirrored} isFlipVertical={isFlipVertical} isUpperCase={isUpperCase} isPro={isPro} theme={theme} />
            </S.PrompterScrollArea>
          </S.MainContent>

          {!pipWindow && (
            <PrompterHUD
              showHud={showHud}
              peerId={peerId}
              status={status}
              isPlaying={externalState.isPlaying}
              speed={externalState.speed}
              settings={settings}
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
          )}
          <QuickEditModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            text={text}
            onSave={(newText) => {
              onTextChange(newText);
              setShowEditModal(false);
            }}
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
                  showHud={true}
                  peerId={peerId}
                  status={status}
                  isPlaying={externalState.isPlaying}
                  speed={externalState.speed}
                  settings={settings}
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
