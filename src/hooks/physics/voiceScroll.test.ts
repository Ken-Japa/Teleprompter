
import { describe, it, expect } from 'vitest';
import { calculateVoiceTarget } from './voiceScroll';
import { VOICE_CONFIG } from '../../config/voiceControlConfig';

describe('calculateVoiceTarget', () => {
    // Mock HTMLElement
    const mockElement = {
        offsetTop: 1000,
        clientHeight: 50,
    } as HTMLElement;

    // Mock Refs
    const mockCurrentActiveElementRef = { current: mockElement };
    const mockLastVoiceIndexRef = { current: 1 };

    // Mock Metrics
    const mockMetrics = {
        scrollHeight: 5000,
        clientHeight: 800
    };

    it('should calculate target for normal mode (Top Alignment)', () => {
        const isFlipVertical = false;
        const voiceProgress = 0; // Start of sentence

        // Expected: 
        // offsetTop (1000) + readingLineOffset (0) - clientHeight (800) * LOOKAHEAD (0.018)
        // 1000 - 800 * 0.018 = 1000 - 14.4 = 985.6

        const target = calculateVoiceTarget(
            1, // activeSentenceIndex
            voiceProgress,
            mockMetrics,
            mockCurrentActiveElementRef,
            mockLastVoiceIndexRef,
            isFlipVertical
        );

        const expected = 1000 - (800 * VOICE_CONFIG.LOOKAHEAD_POSITION);
        expect(target).toBeCloseTo(expected);
    });

    it('should calculate target for flip vertical mode (Unified Coordinates)', () => {
        const isFlipVertical = true;
        const voiceProgress = 0;

        // In unified coordinates, both modes use the same logic:
        // offsetTop + readingLineOffset - metrics.clientHeight * LOOKAHEAD
        // 1000 - 800 * 0.12 = 1000 - 96 = 904

        const target = calculateVoiceTarget(
            1,
            voiceProgress,
            mockMetrics,
            mockCurrentActiveElementRef,
            mockLastVoiceIndexRef,
            isFlipVertical
        );

        const expected = 1000 - (800 * VOICE_CONFIG.LOOKAHEAD_POSITION);
        expect(target).toBeCloseTo(expected);
    });

    it('should handle voice progress correctly', () => {
        const isFlipVertical = false;
        const voiceProgress = 0.5; // mid sentence

        // Expected:
        // 1000 + 50 * 0.5 - 800 * 0.018 = 1000 + 25 - 14.4 = 1010.6

        const target = calculateVoiceTarget(
            1,
            voiceProgress,
            mockMetrics,
            mockCurrentActiveElementRef,
            mockLastVoiceIndexRef,
            isFlipVertical
        );

        const expected = 1000 + (50 * 0.5) - (800 * VOICE_CONFIG.LOOKAHEAD_POSITION);
        expect(target).toBeCloseTo(expected);
    });
});
