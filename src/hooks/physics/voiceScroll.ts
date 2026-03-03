import { MutableRefObject } from 'react';
import { PhysicsMetrics } from './types';
import { VOICE_CONFIG } from '../../config/voiceControlConfig';

export const calculateVoiceTarget = (
  activeSentenceIndex: number,
  voiceProgress: number,
  metrics: PhysicsMetrics,
  currentActiveElementRef: MutableRefObject<HTMLElement | null>,
  lastVoiceIndexRef: MutableRefObject<number>,
  isFlipVertical: boolean = false,
  semanticWindowOffset: number = 0
): number | null => {
  // 1. Safety: If index is invalid, reset and return null
  if (activeSentenceIndex < 0) {
    currentActiveElementRef.current = null;
    lastVoiceIndexRef.current = -1;
    return null;
  }

  // 2. Update active element cache if index changed OR if we don't have an element yet
  // This handles cases where the element might be added to the DOM after the first check.
  if (activeSentenceIndex !== lastVoiceIndexRef.current || !currentActiveElementRef.current) {
    // Try direct ID first (works for normal mode and unsplit sentences)
    let activeEl = document.getElementById(`sentence-${activeSentenceIndex}`);

    // Fallback: Search by data-original-sentence-id (for musician mode split sentences)
    if (!activeEl) {
      activeEl = document.querySelector(`[data-original-sentence-id="${activeSentenceIndex}"]`) as HTMLElement | null;
    }

    if (activeEl) {
      currentActiveElementRef.current = activeEl;
      lastVoiceIndexRef.current = activeSentenceIndex;
    } else {
      // If NOT FOUND, we DO NOT update lastVoiceIndexRef immediately to allow retry in next frame
      // BUT if we've been stuck here for many frames, we should ideally move on. 
      // For now, simple retry logic is effective for initial loading jitter.
      // console.warn(`[VoiceScroll] Element not found for sentence-${activeSentenceIndex}`);
      return null;
    }
  }

  // 3. Calculate target continuously based on progress
  if (currentActiveElementRef.current) {
    const activeEl = currentActiveElementRef.current;

    // Calculate offset based on progress (0.0 to 1.0) within the sentence
    const readingLineOffset = activeEl.clientHeight * voiceProgress;

    // TARGET CALCULATION LOGIC:
    const targetRatio = isFlipVertical ? (1 - VOICE_CONFIG.LOOKAHEAD_POSITION) : VOICE_CONFIG.LOOKAHEAD_POSITION;

    // Scroll Position = ElementPosition - ViewportOffset + Drift
    return activeEl.offsetTop + readingLineOffset + semanticWindowOffset - metrics.clientHeight * targetRatio;
  }

  return null;
};
