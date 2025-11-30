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
import { useWakeLock } from "../../hooks/useWakeLock";
import { useScrollPhysics } from "../../hooks/useScrollPhysics";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useElementMetrics } from "../../hooks/useElementMetrics";
import { ScriptBoard } from "./ScriptBoard";
import { PrompterHUD } from "./PrompterHUD";
import { trackConversion } from "../../utils/analytics";

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
}

export const Prompter = memo(
  forwardRef<PrompterHandle, PrompterProps>(
    ({ text, isPro, status, peerId, onExit, setShowPaywall, externalState, onStateChange, onScrollUpdate, onNavigationMapUpdate, onResetTimer, settings, actions }, ref) => {

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

      // Voice Control
      const { startListening, stopListening, resetVoice, activeSentenceIndex, sentences, voiceApiSupported, voiceApiError } = useVoiceControl(
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
      const { handleNativeScroll, handleRemoteInput, handleScrollTo, resetPhysics, currentActiveElementRef } = useScrollPhysics({
        isPlaying: externalState.isPlaying,
        isVoiceMode,
        speed: externalState.speed,
        activeSentenceIndex,
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

      // Expose methods to parent via ref
      useImperativeHandle(
        ref,
        () => ({
          onRemoteScroll: (delta: number, stop: boolean = false, hardStop: boolean = false) => handleRemoteInput(delta, stop, hardStop),
          scrollTo: handleScrollTo,
          reset: resetPrompter,
        }),
        [handleRemoteInput, handleScrollTo, resetPrompter]
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
          }, 3000);
          mouseMoveRafRef.current = null;
        });
      }, [externalState.isPlaying]);

      const getThemeClass = useCallback(() => {
        switch (theme) {
          case "paper":
            return "bg-white text-slate-900";
          case "contrast":
            return "bg-black text-yellow-400 font-bold";
          case "matrix":
            return "bg-black text-green-500 font-mono";
          case "cyber":
            return "bg-slate-900 text-pink-500 shadow-[inset_0_0_100px_rgba(236,72,153,0.1)]";
          case "cream":
            return "bg-[#fdfbf7] text-[#333]";
          default:
            return "bg-slate-950 text-slate-100";
        }
      }, [theme]);

      const toggleVoice = useCallback(() => {
        if (!isPro) {
          trackConversion('Attempted Pro Feature');
          setShowPaywall(true);
          return;
        }
        if (isVoiceMode) {
          setIsVoiceMode(false);
          stopListening();
          if (currentActiveElementRef.current) {
            currentActiveElementRef.current.classList.remove("sentence-active");
          }
        } else {
          setIsVoiceMode(true);
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

      // Navigation Map Calculation
      useEffect(() => {
        if (!onNavigationMapUpdate || !scrollContainerRef.current || sentences.length === 0) return;

        const calculateMap = () => {
          const container = scrollContainerRef.current;
          if (!container) return;

          const maxScroll = container.scrollHeight - container.clientHeight;
          if (maxScroll <= 0) return;

          const map: NavigationItem[] = [];
          const containerRect = container.getBoundingClientRect();
          const centerOffset = container.clientHeight / 2;

          sentences.forEach(s => {
            const el = document.getElementById(`sentence-${s.id}`);
            if (el) {
              const rect = el.getBoundingClientRect();
              // Calculate scroll position to center this element
              const elementTopRelative = rect.top - containerRect.top + container.scrollTop;
              let targetScroll = elementTopRelative - centerOffset + (rect.height / 2);

              // Clamp
              targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

              // Construct label safely
          const label = s.fragments ? s.fragments.map((f: any) => f.text).join('') : "";

          map.push({
                id: s.id,
                label: label,
                progress: targetScroll / maxScroll
              });
            }
          });

          if (map.length > 0) {
             onNavigationMapUpdate(map);
          }
        };

        // Debounce calculation
        const timeoutId = setTimeout(() => {
          requestAnimationFrame(calculateMap);
        }, 1000); // Give it a second to settle layout

        return () => clearTimeout(timeoutId);
      }, [sentences, settings.fontSize, settings.margin, settings.isMirrored, settings.isFlipVertical, settings.isUpperCase, onNavigationMapUpdate]);

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
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${theme === "paper" ? "white" : "var(--tw-bg-opacity, 1) rgb(2 6 23)"} 0%, transparent 20%, transparent 80%, ${theme === "paper" ? "white" : "var(--tw-bg-opacity, 1) rgb(2 6 23)"} 100%)`,
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
          />
        </S.ScreenContainer>
      );
    }
  )
);
