import { useEffect, useRef, useCallback } from "react";
import { calculateAutoScroll, calculateMomentum } from "./physics/physicsCore";
import { calculateVoiceTarget } from "./physics/voiceScroll";
import { VOICE_CONFIG } from "../config/voiceControlConfig";
import { PHYSICS_CONSTANTS } from "../config/constants";

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
}: PhysicsParams) => {
 // Physics State
 const momentumRef = useRef<number>(0);
 const velocityCacheRef = useRef<number>(0);
 const internalScrollPos = useRef<number>(0);
 const lastFrameTimeRef = useRef<number>(0);
 const animationFrameRef = useRef<number | null>(null);
 const isSleepingRef = useRef<boolean>(true);
 const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

 // Update Velocity Cache when speed changes
 useEffect(() => {
  // Fórmula empírica para velocidade confortável
  velocityCacheRef.current =
   Math.pow(speed, PHYSICS_CONSTANTS.SPEED_POWER) * PHYSICS_CONSTANTS.VELOCITY_MULTIPLIER;
 }, [speed]);

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
   let metrics = metricsRef.current;

   // FAILSAFE: Se as métricas estiverem zeradas mas o container existe, leia diretamente do DOM.
   // Isso corrige bugs onde o ResizeObserver ainda não disparou após a montagem.
   if ((metrics.scrollHeight === 0 || metrics.clientHeight === 0) && scrollContainerRef.current) {
    metrics = {
     scrollHeight: scrollContainerRef.current.scrollHeight,
     clientHeight: scrollContainerRef.current.clientHeight,
    };
    metricsRef.current = metrics;
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
     lastVoiceIndexRef
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
     return; // Encerra o loop
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

    scrollContainerRef.current.scrollTop = internalScrollPos.current;

    // Reporta progresso (0 a 1)
    const progress = maxScroll > 0 ? internalScrollPos.current / maxScroll : 0;
    onScrollUpdate(Math.min(1, Math.max(0, progress)));
   }

   // Agenda o próximo frame
   animationFrameRef.current = requestAnimationFrame(loop);
  },
  [metricsRef, scrollContainerRef, onAutoStop, onScrollUpdate]
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
  if (scrollContainerRef.current) {
   scrollContainerRef.current.scrollTop = 0;
  }
 }, [scrollContainerRef]);

 return {
  handleNativeScroll,
  handleRemoteInput,
  handleScrollTo,
  resetPhysics,
  wakeUpLoop,
  currentActiveElementRef,
 };
};
