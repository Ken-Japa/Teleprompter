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

    // Calculate offset based on progress (0.0 to 1.0) within the sentence
    const readingLineOffset = activeEl.clientHeight * voiceProgress;

    // TARGET CALCULATION LOGIC:
    // We want the "Current Reading Line" (Top + Offset) to be positioned at the "Visual Target Line".
    // Visual Target Line = ViewportHeight * LookaheadRatio (e.g. 15% from Top).

    // In STANDARD Mode:
    // DOM Coordinate System: 0 at Top, H at Bottom.
    // TargetScroll = (ElementTop + Offset) - (ViewportHeight * LookaheadRatio)
    // This places ElementTop at LookaheadRatio down the viewport.

    // In FLIPPED Mode (scaleY(-1)):
    // DOM Coordinate System: 0 is Visual Bottom, H is Visual Top.
    // We want content at Visual Top (Lookahead 15% from Visual Top).
    // Visual Top is DOM Bottom (approx).
    // Visual 15% from Top = DOM 15% from Bottom = DOM 85% from Top.
    // So Visual Target Line in DOM Coords = ViewportHeight * (1 - LookaheadRatio).

    // TargetScroll = (ElementTop + Offset) - (ViewportHeight * (1 - LookaheadRatio))

    let targetRatio = VOICE_CONFIG.LOOKAHEAD_POSITION;

    if (isFlipVertical) {
      // In Vertically Flipped mode, the "Visual Top" matches the DOM "Bottom" (high coordinate)
      // So we target a position that is (1 - Lookahead) down the viewport.
      targetRatio = 1 - VOICE_CONFIG.LOOKAHEAD_POSITION;
    }

    // Scroll Position = ElementPosition - ViewportOffset
    return activeEl.offsetTop + readingLineOffset - metrics.clientHeight * targetRatio;
  }

  return null;
};
