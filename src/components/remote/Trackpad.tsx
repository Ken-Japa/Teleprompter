import React, { useRef, useEffect } from 'react';
import * as S from '../ui/Styled';

interface TrackpadProps {
    onDelta: (delta: number) => void;
    onStop: (hardStop: boolean) => void;
    label: string;
}

export const Trackpad: React.FC<TrackpadProps> = ({ onDelta, onStop, label }) => {
    // Cursor Visuals
    const cursorRef = useRef<HTMLDivElement>(null);
    const padRef = useRef<HTMLDivElement>(null);
    const padRectRef = useRef<DOMRect | null>(null);

    // Logic Refs
    const touchStartY = useRef<number>(0);
    const lastTouchY = useRef<number>(0);
    const lastTouchTime = useRef<number>(0);
    const isTouching = useRef<boolean>(false);

    const updateCursorVisuals = (clientX: number, clientY: number, active: boolean) => {
        if (cursorRef.current && padRectRef.current) {
            const x = clientX - padRectRef.current.left;
            const y = clientY - padRectRef.current.top;
            cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            cursorRef.current.style.opacity = active ? '1' : '0';
        }
    };

    // Native Event Listeners for Non-Passive Touch Handling
    useEffect(() => {
        const pad = padRef.current;
        if (!pad) return;

        const handleStart = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            padRectRef.current = pad.getBoundingClientRect();

            const y = e.touches[0].clientY;
            touchStartY.current = y;
            lastTouchY.current = y;
            lastTouchTime.current = Date.now();

            isTouching.current = true;
            updateCursorVisuals(e.touches[0].clientX, e.touches[0].clientY, true);
        };

        const handleMove = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            if (!isTouching.current) return;

            const currentY = e.touches[0].clientY;
            const rawDiff = lastTouchY.current - currentY; // Relative to last frame

            // Update physics tracking
            lastTouchY.current = currentY;
            lastTouchTime.current = Date.now();

            // Physics Optimization: Quadratic gain for precision at slow speeds and punch at high speeds
            const gain = 2.8;
            const optimizedDelta = Math.sign(rawDiff) * Math.pow(Math.abs(rawDiff), 1.3) * gain;

            updateCursorVisuals(e.touches[0].clientX, e.touches[0].clientY, true);

            // Emit movement immediately to parent buffer
            onDelta(optimizedDelta);
        };

        const handleEnd = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            isTouching.current = false;
            if (cursorRef.current) cursorRef.current.style.opacity = '0';

            // Determine if this was a "Flick" or a "Stop"
            const now = Date.now();
            const timeSinceLastMove = now - lastTouchTime.current;

            // If user held finger still for > 120ms before lifting, it's a HARD STOP.
            const isFlick = timeSinceLastMove < 120;

            // Emit stop signal
            onStop(!isFlick);
        };

        pad.addEventListener('touchstart', handleStart, { passive: false });
        pad.addEventListener('touchmove', handleMove, { passive: false });
        pad.addEventListener('touchend', handleEnd, { passive: false });
        pad.addEventListener('touchcancel', handleEnd, { passive: false });

        return () => {
            pad.removeEventListener('touchstart', handleStart);
            pad.removeEventListener('touchmove', handleMove);
            pad.removeEventListener('touchend', handleEnd);
            pad.removeEventListener('touchcancel', handleEnd);
        };
    }, [onDelta, onStop]);

    return (
        <S.TouchPad
            ref={padRef}
            onTouchStart={() => { }}
            onTouchMove={() => { }}
            label={label}
            className="select-none cursor-crosshair"
        >
            <div
                ref={cursorRef}
                className="absolute w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none transition-opacity duration-150 opacity-0 border border-indigo-400/30 will-change-transform"
                style={{
                    top: 0,
                    left: 0,
                    marginTop: -48,
                    marginLeft: -48
                }}
            />
        </S.TouchPad>
    );
};
