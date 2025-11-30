import { useEffect, useRef, useCallback } from "react";

interface PhysicsParams {
 isPlaying: boolean;
 isVoiceMode: boolean;
 speed: number;
 activeSentenceIndex: number;
 isFlipVertical?: boolean; // Add this prop
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
 * @param params Parâmetros de configuração da física.
 */
export const useScrollPhysics = ({
 isPlaying,
 isVoiceMode,
 speed,
 activeSentenceIndex,
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
 const isFlipVerticalRef = useRef(isFlipVertical);

 // Update Refs
 useEffect(() => {
  isPlayingRef.current = isPlaying;
 }, [isPlaying]);
 useEffect(() => {
  isVoiceModeRef.current = isVoiceMode;
 }, [isVoiceMode]);
 useEffect(() => {
  activeSentenceIndexRef.current = activeSentenceIndex;
 }, [activeSentenceIndex]);
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
  velocityCacheRef.current = Math.pow(speed, 1.4) * 40;
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
   const deltaTime = Math.min(timestamp - lastFrameTimeRef.current, 64); // Cap delta time
   lastFrameTimeRef.current = timestamp;
   const timeScale = deltaTime / 16.67;

   let deltaScroll = 0;
   const metrics = metricsRef.current;

   // --- PHYSICS LOGIC ---

   // 1. Hard Stop
   if (isHardStopRequestedRef.current) {
    momentumRef.current = 0;
    isHardStopRequestedRef.current = false;
   }

   // 2. Auto Scroll
   if (
    _isPlaying &&
    !isUserTouchingRef.current &&
    !isManualScrollingRef.current &&
    Math.abs(momentumRef.current) < 0.5
   ) {
    if (metrics.scrollHeight > metrics.clientHeight) {
     const moveAmount = (velocityCacheRef.current * deltaTime) / 1000;

     if (internalScrollPos.current + metrics.clientHeight < metrics.scrollHeight - 2) {
      deltaScroll += moveAmount;
     } else {
      // Fim do conteúdo atingido
      onAutoStop();
     }
    } else {
     // Conteúdo menor que a tela, mantém o loop vivo se necessário
     if (_isPlaying) {
      isSleepingRef.current = false;
     }
    }
   }

   // 3. Momentum (Inércia)
   if (Math.abs(momentumRef.current) > 0.01) {
    deltaScroll += momentumRef.current * timeScale;
    if (!isUserTouchingRef.current) {
     momentumRef.current *= Math.pow(0.95, timeScale); // Desaceleração natural
    } else {
     momentumRef.current *= 0.8; // Fricção ao tocar
    }
   } else if (!isUserTouchingRef.current) {
    momentumRef.current = 0;
   }

   // 4. Voice Control Scroll
   if (
    _isVoiceMode &&
    _activeSentenceIndex !== -1 &&
    !_isPlaying &&
    !isUserTouchingRef.current &&
    !isManualScrollingRef.current
   ) {
    if (_activeSentenceIndex !== lastVoiceIndexRef.current) {
     const activeEl = document.getElementById(`sentence-${_activeSentenceIndex}`);
     if (activeEl) {
      currentActiveElementRef.current = activeEl;
      targetVoiceScrollRef.current =
       activeEl.offsetTop - metrics.clientHeight / 2 + activeEl.clientHeight / 2;
     }
     lastVoiceIndexRef.current = _activeSentenceIndex;
    }

    if (targetVoiceScrollRef.current !== null) {
     const diff = targetVoiceScrollRef.current - internalScrollPos.current;
     if (Math.abs(diff) > 1) {
      deltaScroll += diff * (0.05 * timeScale); // Suavização (Lerp)
     }
    }
   }

   // --- APPLY & SLEEP CHECK ---

   const isMoving = Math.abs(deltaScroll) > 0.01;
   const hasMomentum = Math.abs(momentumRef.current) > 0.01;
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
     Math.abs((targetVoiceScrollRef.current || 0) - internalScrollPos.current) < 1;

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
 }, [isPlaying, isVoiceMode, activeSentenceIndex, wakeUpLoop]);

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
 }, [scrollContainerRef]);

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
  currentActiveElementRef,
 };
};
