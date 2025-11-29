import { useEffect, useRef, useCallback } from "react";
import { RemoteScrollHandler } from "../types";

interface PhysicsParams {
 isPlaying: boolean;
 isVoiceMode: boolean;
 speed: number;
 activeSentenceIndex: number;
 metricsRef: React.MutableRefObject<{
  scrollHeight: number;
  clientHeight: number;
 }>;
 scrollContainerRef: React.RefObject<HTMLDivElement | null>;
 onScrollUpdate: (progress: number) => void;
 onAutoStop: () => void;
}

export const useScrollPhysics = ({
 isPlaying,
 isVoiceMode,
 speed,
 activeSentenceIndex,
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
 const lastSyncTimeRef = useRef<number>(0);
 const isSleepingRef = useRef<boolean>(true);
 const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

 // Interaction Flags
 const isUserTouchingRef = useRef<boolean>(false);
 const isManualScrollingRef = useRef<boolean>(false);
 const manualScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const isHardStopRequestedRef = useRef<boolean>(false);

 // Voice Logic Refs
 const targetVoiceScrollRef = useRef<number | null>(null);
 const lastVoiceIndexRef = useRef<number>(-1);
 const currentActiveElementRef = useRef<HTMLElement | null>(null);

 // Update Velocity Cache when speed changes
 useEffect(() => {
  velocityCacheRef.current = Math.pow(speed, 1.4) * 40;
 }, [speed]);

 // The Main Loop definition
 const loop = useCallback(
  (timestamp: number) => {
   if (!scrollContainerRef.current) {
    // If playing but ref not ready, retry with a small delay to allow mounting
    if (isPlaying || (isVoiceMode && activeSentenceIndex !== -1)) {
      if (!retryTimeoutRef.current) {
         // Use a timeout to avoid spamming RAF if the DOM is taking time
         retryTimeoutRef.current = setTimeout(() => {
            retryTimeoutRef.current = null;
            wakeUpLoop();
         }, 100);
      }
      // Mark animation frame as null so we know we aren't in a RAF loop
      animationFrameRef.current = null;
      // Ensure loop is considered sleeping so wakeUpLoop can restart it
      isSleepingRef.current = true;
      return;
    }
    animationFrameRef.current = null;
    isSleepingRef.current = true;
    return;
   }

   if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
   const deltaTime = Math.min(timestamp - lastFrameTimeRef.current, 64);
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
    isPlaying &&
    !isUserTouchingRef.current &&
    !isManualScrollingRef.current &&
    Math.abs(momentumRef.current) < 0.5
   ) {
    // Only attempt to scroll or auto-stop if content is larger than the viewport
    if (metrics.scrollHeight > metrics.clientHeight) {
     const moveAmount = (velocityCacheRef.current * deltaTime) / 1000;

     // Debug Log (throttle or conditional)
     if (Math.random() < 0.01) {
      console.log("Physics Loop Active", {
       speed,
       velocity: velocityCacheRef.current,
       deltaTime,
       moveAmount,
       pos: internalScrollPos.current,
       metrics,
      });
     }

     if (internalScrollPos.current + metrics.clientHeight < metrics.scrollHeight - 2) {
      deltaScroll += moveAmount;
     } else {
      console.warn("AutoStop Triggered by Physics Engine", {
       internalScrollPos: internalScrollPos.current,
       clientHeight: metrics.clientHeight,
       scrollHeight: metrics.scrollHeight,
       sum: internalScrollPos.current + metrics.clientHeight,
       diff: metrics.scrollHeight - (internalScrollPos.current + metrics.clientHeight),
      });
      onAutoStop();
     }
    }
   }

   // 3. Momentum
   if (Math.abs(momentumRef.current) > 0.01) {
    deltaScroll += momentumRef.current * timeScale;
    if (!isUserTouchingRef.current) {
     momentumRef.current *= Math.pow(0.95, timeScale); // Glide
    } else {
     momentumRef.current *= 0.8; // Friction
    }
   } else if (!isUserTouchingRef.current) {
    momentumRef.current = 0;
   }

   // 4. Voice
   if (
    isVoiceMode &&
    activeSentenceIndex !== -1 &&
    !isPlaying &&
    !isUserTouchingRef.current &&
    !isManualScrollingRef.current
   ) {
    if (activeSentenceIndex !== lastVoiceIndexRef.current) {
     const activeEl = document.getElementById(`sentence-${activeSentenceIndex}`);
     if (activeEl) {
      currentActiveElementRef.current = activeEl;
      targetVoiceScrollRef.current =
       activeEl.offsetTop - metrics.clientHeight / 2 + activeEl.clientHeight / 2;
     }
     lastVoiceIndexRef.current = activeSentenceIndex;
    }

    if (targetVoiceScrollRef.current !== null) {
     const diff = targetVoiceScrollRef.current - internalScrollPos.current;
     if (Math.abs(diff) > 1) {
      deltaScroll += diff * (0.05 * timeScale);
     }
    }
   }

   // --- APPLY & SLEEP CHECK ---

   const isMoving = Math.abs(deltaScroll) > 0.01;
   const hasMomentum = Math.abs(momentumRef.current) > 0.01;

   // IDLE CHECK: If not playing, no momentum, not voice moving, and not touching -> Sleep
   if (
    !isPlaying &&
    !hasMomentum &&
    !isMoving &&
    !isUserTouchingRef.current &&
    !isManualScrollingRef.current
   ) {
    // Check voice stability
    const voiceStable =
     !isVoiceMode ||
     targetVoiceScrollRef.current === null ||
     Math.abs(targetVoiceScrollRef.current - internalScrollPos.current) < 1;

    if (voiceStable) {
     isSleepingRef.current = true;
     animationFrameRef.current = null;
     return; // STOP LOOP
    }
   }

   if (isMoving && !isManualScrollingRef.current) {
    internalScrollPos.current += deltaScroll;
    const maxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);

    // Bounds clamping
    if (internalScrollPos.current < 0) {
     internalScrollPos.current = 0;
     momentumRef.current = 0;
    } else if (internalScrollPos.current > maxScroll) {
     internalScrollPos.current = maxScroll;
     momentumRef.current = 0;
    }

    scrollContainerRef.current.scrollTop = internalScrollPos.current;
   }

   // Sync Broadcast
   const now = Date.now();
   if (now - lastSyncTimeRef.current > 200) {
    const maxScroll = Math.max(1, metrics.scrollHeight - metrics.clientHeight);
    onScrollUpdate(internalScrollPos.current / maxScroll);
    lastSyncTimeRef.current = now;
   }

   // Critical: Always use ref to latest loop to prevent stale closures while keeping stable rAF reference
   animationFrameRef.current = requestAnimationFrame((t) => loopRef.current(t));
  },
  [isPlaying, isVoiceMode, activeSentenceIndex, metricsRef, onAutoStop, onScrollUpdate]
 );

 // Store latest loop in ref
 const loopRef = useRef(loop);
 useEffect(() => {
  loopRef.current = loop;
 }, [loop]);

 // Internal loop starter
 const wakeUpLoop = useCallback(() => {
  if (isSleepingRef.current) {
   isSleepingRef.current = false;
   lastFrameTimeRef.current = 0; // Reset delta timer
   if (!animationFrameRef.current) {
    animationFrameRef.current = requestAnimationFrame((t) => loopRef.current(t));
   }
  }
 }, []);

 // The Input Handler to be exposed
 const handleRemoteInput: RemoteScrollHandler = useCallback(
  (delta, stop = false, hardStop = false) => {
   if (stop) {
    isUserTouchingRef.current = false;
    if (hardStop) {
     isHardStopRequestedRef.current = true;
    }
   } else {
    momentumRef.current = delta;
    isUserTouchingRef.current = true;
    isHardStopRequestedRef.current = false;
   }
   wakeUpLoop(); // Input received, wake up
  },
  [wakeUpLoop]
 );

 // Handle Scroll To (0-1)
 const handleScrollTo = useCallback(
  (progress: number) => {
   if (scrollContainerRef.current && metricsRef.current) {
    const metrics = metricsRef.current;
    const maxScroll = Math.max(0, metrics.scrollHeight - metrics.clientHeight);
    const newPos = Math.max(0, Math.min(maxScroll, maxScroll * progress));

    internalScrollPos.current = newPos;
    if (scrollContainerRef.current) {
     scrollContainerRef.current.scrollTop = newPos;
    }
    wakeUpLoop();
   }
  },
  [scrollContainerRef, metricsRef, wakeUpLoop]
 );

 // Handle Native Scroll
 const handleNativeScroll = useCallback(() => {
  if (scrollContainerRef.current) {
   internalScrollPos.current = scrollContainerRef.current.scrollTop;
   isManualScrollingRef.current = true;

   if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
   manualScrollTimeoutRef.current = setTimeout(() => {
    isManualScrollingRef.current = false;
   }, 100);

   wakeUpLoop(); // Wake up to process visual sync if needed
  }
 }, [scrollContainerRef, wakeUpLoop]);

 const resetPhysics = useCallback(() => {
  internalScrollPos.current = 0;
  momentumRef.current = 0;
  targetVoiceScrollRef.current = null;
  if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  onScrollUpdate(0);
 }, [scrollContainerRef, onScrollUpdate]);

 // Wake up when external triggers happen
 useEffect(() => {
  if (isPlaying || (isVoiceMode && activeSentenceIndex !== -1)) {
   wakeUpLoop();
  }
 }, [isPlaying, isVoiceMode, activeSentenceIndex, wakeUpLoop]);

 // Stop loop on unmount
 useEffect(() => {
  return () => {
   if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
   if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
  };
 }, []);

 return {
  handleNativeScroll,
  handleRemoteInput,
  handleScrollTo,
  resetPhysics,
  currentActiveElementRef,
 };
};
