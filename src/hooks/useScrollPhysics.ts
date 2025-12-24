import { useEffect, useRef, useCallback } from "react";
import { calculateAutoScroll, calculateMomentum } from "./physics/physicsCore";
import { calculateVoiceTarget } from "./physics/voiceScroll";
import { VOICE_CONFIG } from "../config/voiceControlConfig";
import { PHYSICS_CONSTANTS } from "../config/constants";
import { TextCommand } from "../types";

interface PhysicsParams {
  isPlaying: boolean;
  isVoiceMode: boolean;
  speed: number;
  activeSentenceIndex: number;
  voiceProgress?: number;
  isFlipVertical?: boolean;
  metricsRef: React.MutableRefObject<{
    scrollHeight: number;
    clientHeight: number;
  }>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onScrollUpdate: (progress: number) => void;
  onAutoStop: () => void;
  onCommandTriggered?: (command: TextCommand, sentenceId: number) => void;
}

/**
 * Hook responsável pela física de rolagem do prompter.
 * Gerencia auto-scroll, inércia, rolagem manual e controle por voz.
 *
 * Refatorado para usar módulos de física em src/hooks/physics
 */
export const useScrollPhysics = ({
  isPlaying,
  isVoiceMode,
  speed,
  activeSentenceIndex,
  voiceProgress = 0,
  isFlipVertical,
  metricsRef,
  scrollContainerRef,
  onScrollUpdate,
  onAutoStop,
  onCommandTriggered,
}: PhysicsParams) => {
  // Physics State
  const momentumRef = useRef<number>(0);
  const velocityCacheRef = useRef<number>(0);
  const internalScrollPos = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isSleepingRef = useRef<boolean>(true);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Command State
  const processedCommandsRef = useRef<Set<number>>(new Set());
  const lastScrollCheckRef = useRef<number>(0);

  // Refs for Mutable State (to avoid loop recreation)
  const isPlayingRef = useRef(isPlaying);
  const isVoiceModeRef = useRef(isVoiceMode);
  const activeSentenceIndexRef = useRef(activeSentenceIndex);
  const voiceProgressRef = useRef(voiceProgress);
  const isFlipVerticalRef = useRef(isFlipVertical);

  // Update Refs
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying) {
      momentumRef.current = 0; // Instant stop when paused
    }
  }, [isPlaying]);
  useEffect(() => {
    isVoiceModeRef.current = isVoiceMode;
  }, [isVoiceMode]);
  useEffect(() => {
    activeSentenceIndexRef.current = activeSentenceIndex;
  }, [activeSentenceIndex]);
  useEffect(() => {
    voiceProgressRef.current = voiceProgress;
  }, [voiceProgress]);
  useEffect(() => {
    isFlipVerticalRef.current = isFlipVertical;
  }, [isFlipVertical]);

  // Interaction Flags
  const isUserTouchingRef = useRef<boolean>(false);
  const isManualScrollingRef = useRef<boolean>(false);
  const isHardStopRequestedRef = useRef<boolean>(false);

  // Voice Logic Refs
  const targetVoiceScrollRef = useRef<number | null>(null);
  const lastVoiceIndexRef = useRef<number>(-1);
  const currentActiveElementRef = useRef<HTMLElement | null>(null);
  const transformOffsetRef = useRef<number>(0); // Track transform position for voice mode


  // Update Velocity Cache when speed changes
  useEffect(() => {
    // Fórmula empírica para velocidade confortável
    velocityCacheRef.current =
      Math.pow(speed, PHYSICS_CONSTANTS.SPEED_POWER) * PHYSICS_CONSTANTS.VELOCITY_MULTIPLIER;
  }, [speed]);

  /**
   * Apply scroll using GPU-accelerated CSS transform (for voice mode).
   * This provides buttery-smooth scrolling without triggering layout reflow.
   */
  const applyScrollTransform = useCallback((position: number) => {
    if (!scrollContainerRef.current) return;

    const content = scrollContainerRef.current.querySelector('.voice-control-content');
    if (content instanceof HTMLElement) {
      // Use translate3d for GPU acceleration
      // CRITICAL FIX: In Vertical Mirror (isFlipVertical), if the container is scaleY(-1),
      // translating the child by -pos would move it visual DOWN if pos increases.
      // We want it to move UP. 
      // After testing/analysis: translateY(pos) in a scaleY(-1) container moves it visually UP.
      const multiplier = isFlipVerticalRef.current ? 1 : -1;
      content.style.transform = `translate3d(0, ${position * multiplier}px, 0)`;
      transformOffsetRef.current = position;
    }
  }, []);


  /**
   * Loop principal de física (Game Loop pattern).
   * Executado a cada frame via requestAnimationFrame.
   */
  const loop = useCallback(
    (timestamp: number) => {
      const _isPlaying = isPlayingRef.current;
      const _isVoiceMode = isVoiceModeRef.current;
      const _activeSentenceIndex = activeSentenceIndexRef.current;
      const _voiceProgress = voiceProgressRef.current;

      if (!scrollContainerRef.current) {
        // Se estiver tocando e o container não estiver pronto, tenta novamente em breve
        if (_isPlaying || (_isVoiceMode && _activeSentenceIndex !== -1)) {
          if (!retryTimeoutRef.current) {
            retryTimeoutRef.current = setTimeout(() => {
              retryTimeoutRef.current = null;
              wakeUpLoop();
            }, 100);
          }
          animationFrameRef.current = null;
          isSleepingRef.current = true;
          return;
        }
        animationFrameRef.current = null;
        isSleepingRef.current = true;
        return;
      }

      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const deltaTime = Math.min(timestamp - lastFrameTimeRef.current, PHYSICS_CONSTANTS.MAX_DELTA_TIME); // Cap delta time
      lastFrameTimeRef.current = timestamp;
      const timeScale = deltaTime / PHYSICS_CONSTANTS.TARGET_FRAME_TIME;

      let deltaScroll = 0;

      // --- DOM READ PHASE ---
      // Read all necessary DOM properties at the beginning of the loop to avoid layout thrashing.
      const readMetrics = () => {
        if (!scrollContainerRef.current) {
          return metricsRef.current; // Return stale metrics if no container
        }
        const realScrollHeight = scrollContainerRef.current.scrollHeight;
        const realClientHeight = scrollContainerRef.current.clientHeight;
        return { scrollHeight: realScrollHeight, clientHeight: realClientHeight };
      };

      let metrics = metricsRef.current;
      const calculatedMaxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);

      // --- FAILSAFE & SELF-HEALING ---
      // If playing but physics engine thinks there's no scroll room, or if we are at the top,
      // it might be stale metrics. Force a re-read.
      if (_isPlaying && (calculatedMaxScroll === 0 || internalScrollPos.current === 0)) {
        const newMetrics = readMetrics();
        // Update metrics only if they have actually changed to prevent unnecessary re-renders.
        if (newMetrics.scrollHeight !== metrics.scrollHeight || newMetrics.clientHeight !== metrics.clientHeight) {
          metrics = newMetrics;
          metricsRef.current = metrics; // Persist the fresh metrics
        }
      }

      // --- PHYSICS LOGIC ---

      // 1. Hard Stop
      if (isHardStopRequestedRef.current) {
        momentumRef.current = 0;
        isHardStopRequestedRef.current = false;
      }

      // 2. Auto Scroll
      const autoScrollDelta = calculateAutoScroll(
        _isPlaying,
        isUserTouchingRef.current,
        isManualScrollingRef.current,
        momentumRef.current,
        velocityCacheRef.current,
        deltaTime,
        internalScrollPos.current,
        metrics,
        onAutoStop
      );
      deltaScroll += isNaN(autoScrollDelta) ? 0 : autoScrollDelta;

      // 3. Momentum (Inércia)
      const momentumResult = calculateMomentum(momentumRef.current, isUserTouchingRef.current, timeScale);
      deltaScroll += momentumResult.delta;
      momentumRef.current = momentumResult.newMomentum;

      // 4. Voice Control Scroll
      if (
        _isVoiceMode &&
        _activeSentenceIndex !== -1 &&
        !_isPlaying &&
        !isUserTouchingRef.current &&
        !isManualScrollingRef.current
      ) {
        const target = calculateVoiceTarget(
          _activeSentenceIndex,
          _voiceProgress,
          metrics,
          currentActiveElementRef,
          lastVoiceIndexRef,
          isFlipVerticalRef.current
        );

        targetVoiceScrollRef.current = target;

        if (targetVoiceScrollRef.current !== null) {
          const diff = targetVoiceScrollRef.current - internalScrollPos.current;
          if (Math.abs(diff) > PHYSICS_CONSTANTS.SCROLL_TOLERANCE) {
            // Increased Lerp speed for better responsiveness
            deltaScroll += diff * (VOICE_CONFIG.SCROLL_LERP_FACTOR * timeScale);
          }
        }
      }

      // --- APPLY & SLEEP CHECK ---

      const isMoving = Math.abs(deltaScroll) > PHYSICS_CONSTANTS.MOMENTUM_THRESHOLD;
      const hasMomentum = Math.abs(momentumRef.current) > PHYSICS_CONSTANTS.MOMENTUM_THRESHOLD;
      const shouldStayAwake = _isPlaying;

      // Verifica se pode dormir para economizar CPU
      if (
        !shouldStayAwake &&
        !hasMomentum &&
        !isMoving &&
        !isUserTouchingRef.current &&
        !isManualScrollingRef.current
      ) {
        const voiceStable =
          !_isVoiceMode ||
          targetVoiceScrollRef.current === null ||
          Math.abs((targetVoiceScrollRef.current || 0) - internalScrollPos.current) <
          PHYSICS_CONSTANTS.SCROLL_TOLERANCE;

        if (voiceStable) {
          isSleepingRef.current = true;
          animationFrameRef.current = null;
          lastFrameTimeRef.current = 0;
          return;
        }
      }

      // Aplica o movimento
      if (isMoving && scrollContainerRef.current) {
        internalScrollPos.current += deltaScroll;
        if (isNaN(internalScrollPos.current)) internalScrollPos.current = 0;

        // Clamp bounds
        const maxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);
        if (internalScrollPos.current < 0) {
          internalScrollPos.current = 0;
          momentumRef.current = 0;
        } else if (internalScrollPos.current > maxScroll) {
          internalScrollPos.current = maxScroll;
          momentumRef.current = 0;
        }


        // Apply scroll: Use GPU-accelerated transform for voice mode, scrollTop otherwise
        if (_isVoiceMode) {
          applyScrollTransform(internalScrollPos.current);
        } else {
          scrollContainerRef.current.scrollTop = internalScrollPos.current;
        }


        // Reporta progresso (0 a 1)
        const progress = maxScroll > 0 ? internalScrollPos.current / maxScroll : 0;
        onScrollUpdate(Math.min(1, Math.max(0, progress)));

        // --- COMMAND DETECTION ---
        // Verify commands if callback is provided
        if (onCommandTriggered && scrollContainerRef.current) {

          const checkZoneStart = internalScrollPos.current;
          const _isFlipVertical = isFlipVerticalRef.current;
          // Trigger commands when they reach % of the screen (Reading Line)
          // Normal: 5% from DOM Top
          // Flipped: 5% from Visual Top (which is 95% from DOM Top)
          const readingZoneRatio = _isFlipVertical ? 0.95 : 0.05;
          const readingZoneOffset = metrics.clientHeight * readingZoneRatio;
          const triggerPoint = checkZoneStart + readingZoneOffset;

          const commandElements = scrollContainerRef.current.querySelectorAll('[data-command]');

          commandElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              const sentenceIdStr = el.id.replace('sentence-', '');
              const sentenceId = parseInt(sentenceIdStr, 10);

              if (processedCommandsRef.current.has(sentenceId)) return;

              const elementTop = el.offsetTop;

              if (elementTop <= triggerPoint && elementTop > (triggerPoint - metrics.clientHeight)) {
                try {
                  const command = JSON.parse(el.dataset.command || '{}');
                  processedCommandsRef.current.add(sentenceId);
                  onCommandTriggered(command, sentenceId);
                } catch (e) { console.error('Command Parse Error', e); }
              }
            }
          });
        }
      }

      // Agenda o próximo frame
      animationFrameRef.current = requestAnimationFrame(loop);
    },
    [metricsRef, scrollContainerRef, onAutoStop, onScrollUpdate, onCommandTriggered]
  );

  /**
   * Acorda o loop de física se estiver dormindo.
   */
  const wakeUpLoop = useCallback(() => {
    if (isSleepingRef.current) {
      isSleepingRef.current = false;
      lastFrameTimeRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  // Sync Scroll Position when entering Voice Mode
  useEffect(() => {
    if (isVoiceMode && scrollContainerRef.current) {
      // Reset internal position to current scroll top to prevent jumps
      internalScrollPos.current = scrollContainerRef.current.scrollTop;

      // Force refresh metrics to ensure calculations are accurate
      const realScrollHeight = scrollContainerRef.current.scrollHeight;
      const realClientHeight = scrollContainerRef.current.clientHeight;
      metricsRef.current = { scrollHeight: realScrollHeight, clientHeight: realClientHeight };

      wakeUpLoop();
    }
  }, [isVoiceMode, wakeUpLoop, scrollContainerRef, metricsRef]);

  // Start/Stop loop based on state
  useEffect(() => {
    if (isPlaying || (isVoiceMode && activeSentenceIndex !== -1)) {
      wakeUpLoop();
    }
  }, [isPlaying, isVoiceMode, activeSentenceIndex, voiceProgress, wakeUpLoop]);

  // Sync scrollTop when exiting voice mode
  useEffect(() => {
    if (!isVoiceMode && transformOffsetRef.current > 0 && scrollContainerRef.current) {
      // Sync scrollTop with transform position when exiting voice mode
      scrollContainerRef.current.scrollTop = transformOffsetRef.current;
      transformOffsetRef.current = 0;

      // Clear transform from content
      const content = scrollContainerRef.current.querySelector('.voice-control-content');
      if (content instanceof HTMLElement) {
        content.style.transform = '';
      }
    }
  }, [isVoiceMode]);


  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  // --- PUBLIC HANDLERS ---

  const handleNativeScroll = useCallback(() => {
    if (!scrollContainerRef.current || isPlayingRef.current || isVoiceModeRef.current) return;
    // Sync internal state with native scroll (e.g. user dragged scrollbar)
    internalScrollPos.current = scrollContainerRef.current.scrollTop;

    // Update progress to keep remote/HUD in sync
    const metrics = metricsRef.current;
    const maxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);
    const progress = maxScroll > 0 ? internalScrollPos.current / maxScroll : 0;
    onScrollUpdate(Math.min(1, Math.max(0, progress)));
  }, [scrollContainerRef, metricsRef, onScrollUpdate]);

  const handleRemoteInput = useCallback(
    (deltaY: number, stop: boolean = false, hardStop: boolean = false) => {
      if (stop) {
        // Se for stop, zera momentum ou faz hard stop
        if (hardStop) {
          momentumRef.current = 0;
          isHardStopRequestedRef.current = true;
        } else {
          // Soft stop (lift finger) - keep some inertia or just standard decay
          // momentumRef.current is handled in loop
        }
      } else {
        // If flipped vertically, invert delta
        const effectiveDelta = isFlipVerticalRef.current ? -deltaY : deltaY;
        momentumRef.current += effectiveDelta * 2; // Sensibilidade remota
      }
      wakeUpLoop();
    },
    [wakeUpLoop]
  );

  const handleScrollTo = useCallback(
    (progress: number) => {
      if (!scrollContainerRef.current) return;
      const metrics = metricsRef.current;
      const maxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);
      // Progress is 0-1
      const newPos = Math.min(Math.max(progress, 0), 1) * maxScroll;
      internalScrollPos.current = newPos;
      scrollContainerRef.current.scrollTop = newPos;
      wakeUpLoop(); // Ensure physics knows about the change (though it might settle immediately)
    },
    [metricsRef, scrollContainerRef, wakeUpLoop]
  );

  const resetPhysics = useCallback(() => {
    internalScrollPos.current = 0;
    momentumRef.current = 0;
    targetVoiceScrollRef.current = null;
    lastVoiceIndexRef.current = -1;
    isHardStopRequestedRef.current = true;
    processedCommandsRef.current.clear();
    lastScrollCheckRef.current = 0;
    transformOffsetRef.current = 0; // Reset transform offset
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;

      // Clear transform if it exists
      const content = scrollContainerRef.current.querySelector('.voice-control-content');
      if (content instanceof HTMLElement) {
        content.style.transform = '';
      }
    }
  }, [scrollContainerRef]);


  const clearProcessedCommands = useCallback((startId: number, endId: number) => {
    for (let i = startId; i <= endId; i++) {
      processedCommandsRef.current.delete(i);
    }
  }, []);

  return {
    handleNativeScroll,
    handleRemoteInput,
    handleScrollTo,
    resetPhysics,
    wakeUpLoop,
    currentActiveElementRef,
    clearProcessedCommands,
  };
};
