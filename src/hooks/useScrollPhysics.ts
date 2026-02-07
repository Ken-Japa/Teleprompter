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
  bpm: number;
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
  onManualScrollEnd?: () => void;
  isMusicianMode?: boolean;
  backingTrackProgress?: {
    startSentenceId: number;
    endSentenceId: number;
    ratio: number;
  } | null;
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
  onManualScrollEnd,
  isMusicianMode,
  bpm,
  backingTrackProgress,
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
  const lastInteractionTimeRef = useRef<number>(0);
  const lastScrollCheckRef = useRef<number>(0);

  // Refs for Mutable State (to avoid loop recreation)
  const isPlayingRef = useRef(isPlaying);
  const isVoiceModeRef = useRef(isVoiceMode);
  const activeSentenceIndexRef = useRef(activeSentenceIndex);
  const voiceProgressRef = useRef(voiceProgress);
  const isFlipVerticalRef = useRef(isFlipVertical);
  const bpmRef = useRef(bpm);
  const backingTrackProgressRef = useRef(backingTrackProgress);


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
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);
  useEffect(() => {
    backingTrackProgressRef.current = backingTrackProgress;
  }, [backingTrackProgress]);


  // Interaction Flags
  const isUserTouchingRef = useRef<boolean>(false);
  const isManualScrollingRef = useRef<boolean>(false);
  const isHardStopRequestedRef = useRef<boolean>(false);

  // Voice Logic Refs
  const targetVoiceScrollRef = useRef<number | null>(null);
  const smoothedVoiceVelocityRef = useRef<number>(0);
  const lastTargetVoiceScrollRef = useRef<number | null>(null);
  const lastVoiceIndexRef = useRef<number>(-1);
  const currentActiveElementRef = useRef<HTMLElement | null>(null);

  // Update Velocity Cache when speed changes
  useEffect(() => {
    // BPM Sync integration: effective speed depends on BPM
    // Base formula: speed_efetivo = speed_base * (bpm_atual / 120)
    const effectiveBpmSpeed = isMusicianMode ? speed * (bpm / 120) : speed;

    // Fórmula empírica para velocidade confortável
    velocityCacheRef.current =
      Math.pow(effectiveBpmSpeed, PHYSICS_CONSTANTS.SPEED_POWER) * PHYSICS_CONSTANTS.VELOCITY_MULTIPLIER;
  }, [speed, bpm, isMusicianMode]);



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
      const _backingTrackProgress = backingTrackProgressRef.current;


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
      let forceJump = false;


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
        // Update metrics only if they have actually changed and are valid (> 0)
        if (newMetrics.scrollHeight > 0 && (newMetrics.scrollHeight !== metrics.scrollHeight || newMetrics.clientHeight !== metrics.clientHeight)) {
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
      const now = performance.now();
      const isInteractionCoolingDown = now - lastInteractionTimeRef.current < PHYSICS_CONSTANTS.MANUAL_SCROLL_VOICE_TIMEOUT;

      if (
        _isVoiceMode &&
        _activeSentenceIndex !== -1 &&
        !_isPlaying &&
        !isUserTouchingRef.current &&
        !isManualScrollingRef.current &&
        !isInteractionCoolingDown
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

          if (Math.abs(diff) > (PHYSICS_CONSTANTS.SCROLL_TOLERANCE || 1)) {
            // --- LAYER 2 DAMPING (NEW) ---
            const damping = (VOICE_CONFIG as any).DAMPING;
            let voiceDelta = diff * (VOICE_CONFIG.SCROLL_LERP_FACTOR * timeScale);

            if (damping?.enabled) {
              // 1. Deadzone
              if (Math.abs(diff) < damping.DEADZONE_PX) {
                voiceDelta = 0;
              } else {
                // 2. Velocity Capping
                const maxVelocity = damping.MAX_FOLLOW_VELOCITY * timeScale;
                voiceDelta = Math.max(-maxVelocity, Math.min(maxVelocity, voiceDelta));

                // 3. Oscillation Filtering
                // If the target jumped back suddenly (jitter), ignore it unless it's a large intended jump
                if (lastTargetVoiceScrollRef.current !== null) {
                  const targetJump = targetVoiceScrollRef.current - lastTargetVoiceScrollRef.current;
                  const isOppositeDirection = Math.sign(targetJump) !== Math.sign(diff) && Math.sign(targetJump) !== 0;

                  if (isOppositeDirection && Math.abs(targetJump) < damping.OSCILLATION_THRESHOLD) {
                    // Small jitter in opposite direction - suppress
                    voiceDelta = 0;
                  }
                }

                // 4. Smoothing Acceleration (Jerk Limit)
                const prevVelocity = smoothedVoiceVelocityRef.current;
                const jerkLimit = damping.JERK_LIMIT * timeScale;
                const velocityDiff = voiceDelta - prevVelocity;

                if (Math.abs(velocityDiff) > jerkLimit) {
                  voiceDelta = prevVelocity + Math.sign(velocityDiff) * jerkLimit;
                }
              }
            }

            deltaScroll += voiceDelta;
            smoothedVoiceVelocityRef.current = voiceDelta;
            lastTargetVoiceScrollRef.current = targetVoiceScrollRef.current;
          } else {
            smoothedVoiceVelocityRef.current = 0;
          }
        }
      }

      // 5. Backing Track Sync
      if (_isPlaying && _backingTrackProgress) {
        // Find target position based on interpolated ratio between markers
        const startEl = _backingTrackProgress.startSentenceId === -1
          ? { offsetTop: 0 }
          : document.getElementById(`sentence-${_backingTrackProgress.startSentenceId}`);
        const endEl = document.getElementById(`sentence-${_backingTrackProgress.endSentenceId}`);

        if (endEl) {
          const startTop = (startEl as any).offsetTop || 0;
          const endTop = (endEl as any).offsetTop;

          const readingZoneRatio = isFlipVerticalRef.current ? 0.95 : 0.05;
          const readingZoneOffset = metrics.clientHeight * readingZoneRatio;

          const targetPos = startTop + (endTop - startTop) * _backingTrackProgress.ratio - readingZoneOffset;

          // Instead of delta, we might want to jump or lerp strongly
          const jumpDiff = targetPos - internalScrollPos.current;
          deltaScroll = jumpDiff; // Hard sync
          forceJump = true;
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

        if (voiceStable || isInteractionCoolingDown) {
          isSleepingRef.current = true;
          animationFrameRef.current = null;
          lastFrameTimeRef.current = 0;
          return;
        }
      }

      // Aplica o movimento
      if ((isMoving || forceJump) && scrollContainerRef.current) {
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


        // Apply scroll: Always use native scrollTop for consistency
        scrollContainerRef.current.scrollTop = internalScrollPos.current;


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

  // Start/Stop loop based on state
  useEffect(() => {
    if (isPlaying || (isVoiceMode && activeSentenceIndex !== -1)) {
      wakeUpLoop();
    }
  }, [isPlaying, isVoiceMode, activeSentenceIndex, voiceProgress, wakeUpLoop]);


  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  // --- PUBLIC HANDLERS ---

  const handleNativeScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    // Allow native scroll sync if we are NOT playing OR if we are manually scrolling (wheel/touch)
    if (isPlayingRef.current && !isManualScrollingRef.current) return;

    // Sync internal state with native scroll (e.g. user dragged scrollbar)
    internalScrollPos.current = scrollContainerRef.current.scrollTop;

    // Update progress to keep remote/HUD in sync
    const metrics = metricsRef.current;
    const maxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);
    const progress = maxScroll > 0 ? internalScrollPos.current / maxScroll : 0;
    onScrollUpdate(Math.min(1, Math.max(0, progress)));
  }, [scrollContainerRef, metricsRef, onScrollUpdate]);

  const handleRemoteInput = useCallback((deltaY: number, stop: boolean = false, hardStop: boolean = false) => {
    // Detect manual remote usage
    isManualScrollingRef.current = true;
    isUserTouchingRef.current = true; // Treat like touch to stop momentum if needed

    if (stop) {
      // If it's a stop, zero out momentum or hard stop
      if (hardStop) {
        momentumRef.current = 0;
        isHardStopRequestedRef.current = true;
      } else {
        // Soft stop (lift finger) - momentumRef.current is handled in loop
      }
    } else {
      // If flipped vertically, invert delta
      const effectiveDelta = isFlipVerticalRef.current ? -deltaY : deltaY;
      momentumRef.current += effectiveDelta * 2; // Remote sensitivity
    }

    // Wake up loop
    wakeUpLoop();

    // Debounce release
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    retryTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
      isUserTouchingRef.current = false;
      lastInteractionTimeRef.current = performance.now();
      if (onManualScrollEnd) onManualScrollEnd();
    }, 250); // Same debounce as wheel for consistency
  }, [onManualScrollEnd, wakeUpLoop]);

  const handleScrollTo = useCallback(
    (progress: number) => {
      if (!scrollContainerRef.current) return;
      const metrics = metricsRef.current;
      const newPos = progress * metrics.scrollHeight;
      internalScrollPos.current = newPos;

      scrollContainerRef.current.scrollTop = newPos;
      lastInteractionTimeRef.current = performance.now(); // Register interaction

      wakeUpLoop();
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
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [scrollContainerRef]);


  const clearProcessedCommands = useCallback((startId: number, endId: number) => {
    for (let i = startId; i <= endId; i++) {
      processedCommandsRef.current.delete(i);
    }
  }, []);

  const handleInteractionStart = useCallback(() => {
    isManualScrollingRef.current = true;
    momentumRef.current = 0; // Stop momentum on touch
    lastInteractionTimeRef.current = performance.now();
    wakeUpLoop();
  }, [wakeUpLoop]);

  const handleInteractionEnd = useCallback(() => {
    isUserTouchingRef.current = false;
    // Debounce manual scrolling release to allow inertia?
    // For now simple switch off
    // Small timeout to prevent immediate snap-back
    isManualScrollingRef.current = false;
    lastInteractionTimeRef.current = performance.now();
    if (onManualScrollEnd) onManualScrollEnd();
  }, [onManualScrollEnd]);

  const handleWheel = useCallback(() => {
    // Detect mouse wheel usage
    isManualScrollingRef.current = true;
    isUserTouchingRef.current = true; // Treat like touch to stop momentum
    momentumRef.current = 0;

    // Sync internal state immediately
    if (scrollContainerRef.current) {
      internalScrollPos.current = scrollContainerRef.current.scrollTop;
    }

    // Wake up loop
    wakeUpLoop();

    // Debounce release
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    retryTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
      isUserTouchingRef.current = false;
      lastInteractionTimeRef.current = performance.now();
      if (onManualScrollEnd) onManualScrollEnd();
    }, 250); // Increased debounce for wheel to allow smoother manual interaction
  }, [wakeUpLoop, onManualScrollEnd]);

  return {
    handleNativeScroll,
    handleRemoteInput,
    handleScrollTo,
    resetPhysics,
    wakeUpLoop,
    currentActiveElementRef,
    clearProcessedCommands,
    internalScrollPos, // Expose ref for external synchronization
    handleInteractionStart,
    handleInteractionEnd,
    handleWheel
  };
};
