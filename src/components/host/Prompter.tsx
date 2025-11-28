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
import { ConnectionStatus, PrompterHandle } from "../../types";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { useVoiceControl } from "../../hooks/useVoiceControl";
import { useWakeLock } from "../../hooks/useWakeLock";
import { useScrollPhysics } from "../../hooks/useScrollPhysics";
import { usePrompterSettings } from "../../hooks/usePrompterSettings";
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
}

export const Prompter = memo(
  forwardRef<PrompterHandle, PrompterProps>(
    ({ text, isPro, status, onExit, setShowPaywall, externalState, onStateChange, onScrollUpdate }, ref) => {
      const { t } = useTranslation();

      // Extracted Settings Logic
      const { settings, actions } = usePrompterSettings(isPro);
      const { fontSize, margin, isMirrored, theme, isUpperCase, isFocusMode } = settings;

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
      const { handleNativeScroll, handleRemoteInput, resetPhysics, currentActiveElementRef } = useScrollPhysics({
        isPlaying: externalState.isPlaying,
        isVoiceMode,
        speed: externalState.speed,
        activeSentenceIndex,
        metricsRef,
        scrollContainerRef,
        onScrollUpdate,
        onAutoStop: handleAutoStop,
      });

      // Expose methods to parent via ref
      useImperativeHandle(
        ref,
        () => ({
          onRemoteScroll: handleRemoteInput,
        }),
        [handleRemoteInput]
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

      const resetPrompter = useCallback(() => {
        onStateChange(false, externalState.speed);
        setResetTimerSignal((p) => !p);
        resetVoice();
        resetPhysics();
        if (currentActiveElementRef.current) {
          currentActiveElementRef.current.classList.remove("sentence-active");
        }
      }, [onStateChange, externalState.speed, resetVoice, resetPhysics, currentActiveElementRef]);

      const containerStyle = useMemo(
        () =>
          ({
            "--prompter-font-size": `${fontSize}px`,
            "--prompter-margin": `${margin}%`,
          }) as React.CSSProperties,
        [fontSize, margin]
      );

      return (
        <S.ScreenContainer
          ref={containerRef}
          className={`relative ${getThemeClass()}`}
          data-theme={theme}
          {...({ "data-theme": theme } as any)}
          style={containerStyle}
        >
          {theme === "matrix" && (
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://placehold.co/100x100/000000/00FF00?text=01')]"></div>
          )}
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${theme === "paper" ? "white" : "var(--tw-bg-opacity, 1) rgb(2 6 23)"} 0%, transparent 20%, transparent 80%, ${theme === "paper" ? "white" : "var(--tw-bg-opacity, 1) rgb(2 6 23)"} 100%)`,
            }}
          ></div>

          {isFocusMode && <S.FocusIndicator />}
          {!isPro && <S.Watermark text={t("host.watermark")} theme={theme} />}

          <S.MainContent onMouseMove={handleMouseMove}>
            <S.PrompterScrollArea
              ref={scrollContainerRef}
              onScroll={handleNativeScroll}
              className="no-scrollbar hardware-accelerated"
              style={{ scrollBehavior: "auto", willChange: "scroll-position" }}
            >
              <ScriptBoard sentences={sentences} isMirrored={isMirrored} isUpperCase={isUpperCase} />
            </S.PrompterScrollArea>
          </S.MainContent>

          <PrompterHUD
            showHud={showHud}
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
