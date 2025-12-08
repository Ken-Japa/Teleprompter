import { describe, it, expect, vi } from 'vitest';
import { calculateAutoScroll, calculateMomentum } from './physicsCore';
import { PHYSICS_CONSTANTS } from '../../config/constants';
import { PhysicsMetrics } from './types';

describe('physicsCore', () => {
    describe('calculateAutoScroll', () => {
        const mockMetrics: PhysicsMetrics = {
            scrollHeight: 2000,
            clientHeight: 500
        };

        it('should return 0 if not playing', () => {
            const onAutoStop = vi.fn();
            const result = calculateAutoScroll(
                false, // isPlaying
                false, // isUserTouching
                false, // isManualScrolling
                0, // momentum
                100, // velocityCache
                16, // deltaTime
                0, // internalScrollPos
                mockMetrics,
                onAutoStop
            );
            expect(result).toBe(0);
            expect(onAutoStop).not.toHaveBeenCalled();
        });

        it('should return correct move amount when playing and valid conditions', () => {
            const onAutoStop = vi.fn();
            const velocity = 100;
            const deltaTime = 16;
            const expectedMove = (velocity * deltaTime) / 1000;

            const result = calculateAutoScroll(
                true, // isPlaying
                false, // isUserTouching
                false, // isManualScrolling
                0, // momentum
                velocity, // velocityCache
                deltaTime, // deltaTime
                0, // internalScrollPos
                mockMetrics,
                onAutoStop
            );
            expect(result).toBe(expectedMove);
        });

        it('should trigger onAutoStop when end of content is reached', () => {
            const onAutoStop = vi.fn();
            // internalScrollPos + clientHeight >= scrollHeight - 2
            // 1500 + 500 = 2000
            const result = calculateAutoScroll(
                true,
                false,
                false,
                0,
                100,
                16,
                1500, 
                mockMetrics,
                onAutoStop
            );
            expect(result).toBe(0);
            expect(onAutoStop).toHaveBeenCalled();
        });
    });

    describe('calculateMomentum', () => {
        it('should apply natural friction when not touching', () => {
            const initialMomentum = 10;
            const timeScale = 1;
            const result = calculateMomentum(initialMomentum, false, timeScale);
            
            expect(result.newMomentum).toBeLessThan(initialMomentum);
            // newMomentum = 10 * 0.95^1 = 9.5
            expect(result.newMomentum).toBeCloseTo(initialMomentum * PHYSICS_CONSTANTS.FRICTION_NATURAL);
        });

        it('should apply touch friction when touching', () => {
             const initialMomentum = 10;
             const timeScale = 1;
             const result = calculateMomentum(initialMomentum, true, timeScale);
             
             expect(result.newMomentum).toBeLessThan(initialMomentum);
             // newMomentum = 10 * 0.8 = 8
             expect(result.newMomentum).toBeCloseTo(initialMomentum * PHYSICS_CONSTANTS.FRICTION_TOUCH);
        });

        it('should zero out momentum when below threshold and not touching', () => {
            const lowMomentum = PHYSICS_CONSTANTS.MOMENTUM_THRESHOLD * 0.5;
            const result = calculateMomentum(lowMomentum, false, 1);
            expect(result.newMomentum).toBe(0);
        });
    });
});
