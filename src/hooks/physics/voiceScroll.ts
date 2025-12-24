import { MutableRefObject } from 'react';
import { PhysicsMetrics } from './types';
import { VOICE_CONFIG } from '../../config/voiceControlConfig';

export const calculateVoiceTarget = (
  activeSentenceIndex: number,
  voiceProgress: number,
  metrics: PhysicsMetrics,
  currentActiveElementRef: MutableRefObject<HTMLElement | null>,
  lastVoiceIndexRef: MutableRefObject<number>,
  isFlipVertical: boolean = false
): number | null => {
  // Update active element cache if index changed
  if (activeSentenceIndex !== lastVoiceIndexRef.current) {
    // Try direct ID first (works for normal mode and unsplit sentences)
    let activeEl = document.getElementById(`sentence-${activeSentenceIndex}`);

    // Fallback: Search by data-original-sentence-id (for musician mode split sentences)
    if (!activeEl) {
      activeEl = document.querySelector(`[data-original-sentence-id="${activeSentenceIndex}"]`) as HTMLElement | null;
    }

    if (activeEl) {
      currentActiveElementRef.current = activeEl;
    }
    lastVoiceIndexRef.current = activeSentenceIndex;
  }

  // Calculate target continuously based on progress
  if (currentActiveElementRef.current) {
    const activeEl = currentActiveElementRef.current;
    // Calculate offset based on progress (0.0 to 1.0)
    // This aligns the "current reading line" to the center of the viewport
    const readingLineOffset = activeEl.clientHeight * voiceProgress;

    // OPTIMIZATION: Adjusted target to be % from top instead of 50% (Center)
    // This provides more "Lookahead" so the user can see the next sentence comfortably
    // If Flipped Vertical: Invert logic because DOM Top is Visual Bottom
    // We want Visual Top aka DOM Bottom -> 1 - Lookahead
    const targetRatio = isFlipVertical
      ? (1 - VOICE_CONFIG.LOOKAHEAD_POSITION)
      : VOICE_CONFIG.LOOKAHEAD_POSITION;

    return activeEl.offsetTop - metrics.clientHeight * targetRatio;
  }

  return null;
};
