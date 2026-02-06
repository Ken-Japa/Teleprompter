import { MutableRefObject } from 'react';
import { PhysicsMetrics } from './types';
import { VOICE_CONFIG } from '../../config/voiceControlConfig';

export const calculateVoiceTarget = (
  activeSentenceIndex: number,
  voiceProgress: number,
  metrics: PhysicsMetrics,
  currentActiveElementRef: MutableRefObject<HTMLElement | null>,
  lastVoiceIndexRef: MutableRefObject<number>
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

    // UNIFIED COORDINATES:
    const targetRatio = VOICE_CONFIG.LOOKAHEAD_POSITION;

    // --- ANTICIPATORY SCROLL FOR COMMANDS ---
    // If we are nearing the end of the current sentence, and the next blocks are commands,
    // we should "anticipate" and scroll past them earlier to bring the next readable text into view.
    let commandOffset = 0;
    if (voiceProgress > VOICE_CONFIG.PHYSICS.ANTICIPATION.MIN_PROGRESS) {
      let lookAheadId = activeSentenceIndex + 1;
      let limit = VOICE_CONFIG.PHYSICS.ANTICIPATION.MAX_LOOKAHEAD; // Check elements ahead
      while (limit > 0) {
        const nextEl = document.getElementById(`sentence-${lookAheadId}`);
        if (nextEl && nextEl.dataset.command) {
          // It's a command block - sum its height
          commandOffset += nextEl.clientHeight;
          lookAheadId++;
          limit--;
        } else {
          break;
        }
      }
    }

    // Gradually apply the command offset as we reach the end of the sentence
    // Progress MIN_PROGRESS -> 0%, Progress 1.0 -> 100%
    const anticipationBias = Math.max(0, (voiceProgress - VOICE_CONFIG.PHYSICS.ANTICIPATION.MIN_PROGRESS) / VOICE_CONFIG.PHYSICS.ANTICIPATION.PROGRESS_RANGE);
    const effectiveOffset = readingLineOffset + (commandOffset * anticipationBias);

    // Scroll Position = ElementPosition - ViewportOffset
    return activeEl.offsetTop + effectiveOffset - metrics.clientHeight * targetRatio;
  }

  return null;
};
