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
import { ConnectionStatus, PrompterHandle, PrompterSettings, NavigationItem } from "../../types";
import * as S from "../ui/Styled";
import { useVoiceControl } from "../../hooks/useVoiceControl";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useWakeLock } from "../../hooks/useWakeLock";
import { useScrollPhysics } from "../../hooks/useScrollPhysics";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useElementMetrics } from "../../hooks/useElementMetrics";
import { ScriptBoard } from "./ScriptBoard";
import { PrompterHUD } from "./PrompterHUD";
import { trackConversion } from "../../utils/analytics";

import { useNavigationMap } from "../../hooks/useNavigationMap";
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
}

export const Prompter = memo(
  forwardRef<PrompterHandle, PrompterProps>(
    ({ text, isPro, status, peerId, onExit, setShowPaywall, externalState, onStateChange, onScrollUpdate, onNavigationMapUpdate, onResetTimer, settings, actions, onSync }, ref) => {

      // Extracted Settings Logic
      const { fontSize, margin, isMirrored, theme, isUpperCase, isFocusMode, isFlipVertical } = settings;

      // Ephemeral State
      const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);
      const [showHud, setShowHud] = useState<boolean>(true);
      const [resetTimerSignal, setResetTimerSignal] = useState<boolean>(false);

      // Refs
      const containerRef = useRef<HTMLDivElement>(null);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const hudTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
      const mouseMoveRafRef = useRef<number | null>(null);

      // Theme Logic
      const { getThemeClass } = usePrompterTheme(theme);

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

      // --- PHYSICS ENGINE INTEGRATION ---
      const { handleNativeScroll, handleRemoteInput, handleScrollTo, resetPhysics, wakeUpLoop, currentActiveElementRef } = useScrollPhysics({
        isPlaying: externalState.isPlaying,
        isVoiceMode,
        speed: externalState.speed,
        activeSentenceIndex,
        voiceProgress,
        isFlipVertical,
        metricsRef,
        scrollContainerRef,
        onScrollUpdate,
        onAutoStop: handleAutoStop,
      });

      const resetPrompter = useCallback(() => {
        onStateChange(false, externalState.speed);
        setResetTimerSignal((p) => !p);
        if (onResetTimer) onResetTimer();
        resetVoice();
        resetPhysics();
        if (currentActiveElementRef.current) {
          currentActiveElementRef.current.classList.remove("sentence-active");
        }
      }, [onStateChange, externalState.speed, resetVoice, resetPhysics, currentActiveElementRef]);

      // Voice control toggle
      const toggleVoice = useCallback(() => {
        if (!isPro) {
          trackConversion('Attempted Pro Feature');
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
          startListening();
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
      ]);

      // Expose methods to parent
      useImperativeHandle(
        ref,
        () => ({
          onRemoteScroll: (delta: number, stop: boolean = false, hardStop: boolean = false) => handleRemoteInput(delta, stop, hardStop),
          scrollTo: handleScrollTo,
          reset: resetPrompter,
          toggleVoice: toggleVoice,
          wakeUp: wakeUpLoop,
        }),
        [handleRemoteInput, handleScrollTo, resetPrompter, toggleVoice, wakeUpLoop]
      );

      // Voice Active Element Highlighting (UI Side)
      useEffect(() => {
        if (!isVoiceMode) return;

        const newId = activeSentenceIndex;
        const oldElement = currentActiveElementRef.current;
        const newElement = document.getElementById(`sentence-${newId}`);

        if (oldElement && oldElement !== newElement) oldElement.classList.remove("sentence-active");
        if (newElement && oldElement !== newElement) {
          newElement.classList.add("sentence-active");
          currentActiveElementRef.current = newElement;
        }
      }, [activeSentenceIndex, isVoiceMode, currentActiveElementRef]);

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
        const getThemeColor = (t: string) => {
          switch (t) {
            case 'paper': return '#ffffff';
            case 'contrast': return '#000000';
            case 'matrix': return '#000000';
            case 'cyber': return '#0f172a'; // slate-900
            case 'cream': return '#fdfbf7';
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

      return (
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

          {isFocusMode && <S.FocusIndicator />}

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
          />
        </S.ScreenContainer>
      );
    }
  )
);
