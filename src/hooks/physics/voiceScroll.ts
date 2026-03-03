import { MutableRefObject } from 'react';
import { PhysicsMetrics } from './types';
import { VOICE_CONFIG } from '../../config/voiceControlConfig';

export const calculateVoiceTarget = (
  activeSentenceIndex: number,
  voiceProgress: number,
  metrics: PhysicsMetrics,
  currentActiveElementRef: MutableRefObject<HTMLElement | null>,
  lastVoiceIndexRef: MutableRefObject<number>,
  isFlipVertical: boolean = false, // Added
  semanticWindowOffset: number = 0
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

    // Calculate offset based on progress (0.0 to 1.0) within the sentence
    const readingLineOffset = activeEl.clientHeight * voiceProgress;

    // TARGET CALCULATION LOGIC:
    // In normal mode, we want the text to be around the top (e.g. 10%)
    // In flip vertical mode (mirror), the text is upside down, so the "top" of the text
    // is visually at the bottom. We invert the ratio to maintain the visual reading line.
    const targetRatio = isFlipVertical ? (1 - VOICE_CONFIG.LOOKAHEAD_POSITION) : VOICE_CONFIG.LOOKAHEAD_POSITION;

    // Scroll Position = ElementPosition - ViewportOffset + Drift
    return activeEl.offsetTop + readingLineOffset + semanticWindowOffset - metrics.clientHeight * targetRatio;
  }

  return null;
};
