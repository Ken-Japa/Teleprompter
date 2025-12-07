import React, { useRef, useEffect } from "react";
import * as S from "../ui/Styled";

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
    const accumulatedDistance = useRef<number>(0); // Para controlar a vibração por "fricção"

    /**
     * Helper seguro para acionar vibração
     * Verifica suporte do navegador (Android suporta bem, iOS WebKit não suporta Vibration API)
     */
    const triggerHaptic = (pattern: number | number[]) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                // Silently fail if vibration is blocked
            }
        }
    };

    const updateCursorVisuals = (clientX: number, clientY: number, active: boolean) => {
        if (cursorRef.current && padRectRef.current) {
            const x = clientX - padRectRef.current.left;
            const y = clientY - padRectRef.current.top;
            cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            cursorRef.current.style.opacity = active ? "1" : "0";
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
            accumulatedDistance.current = 0; // Resetar acumulador

            // Haptic Feedback Inicial (Click)
            triggerHaptic(15);

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

            // Lógica de Vibração por Fricção (Haptic Feedback)
            // Acumula a distância percorrida absoluta
            accumulatedDistance.current += Math.abs(rawDiff);

            // Se moveu mais que X pixels, vibra levemente para dar sensação de textura
            const HAPTIC_THRESHOLD = 15; // pixels
            if (accumulatedDistance.current > HAPTIC_THRESHOLD) {
                triggerHaptic(5); // Vibração muito curta (5ms)
                accumulatedDistance.current = 0; // Reseta o acumulador
            }

            // Physics Optimization: Reduced gain for better control
            const gain = 0.8;
            // Natural Scrolling: Finger Up (rawDiff > 0) -> Content Up (Delta > 0)
            // Removed inversion (-1) to align with touch expectations
            const optimizedDelta = Math.sign(rawDiff) * Math.pow(Math.abs(rawDiff), 1.1) * gain;

            updateCursorVisuals(e.touches[0].clientX, e.touches[0].clientY, true);

            // Emit movement immediately to parent buffer
            onDelta(optimizedDelta);
        };

        const handleEnd = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            isTouching.current = false;
            if (cursorRef.current) cursorRef.current.style.opacity = "0";

            // Determine if this was a "Flick" or a "Stop"
            const now = Date.now();
            const timeSinceLastMove = now - lastTouchTime.current;

            // If user held finger still for > 120ms before lifting, it's a HARD STOP.
            const isFlick = timeSinceLastMove < 120;

            // Emit stop signal
            onStop(!isFlick);
        };

        pad.addEventListener("touchstart", handleStart, { passive: false });
        pad.addEventListener("touchmove", handleMove, { passive: false });
        pad.addEventListener("touchend", handleEnd, { passive: false });
        pad.addEventListener("touchcancel", handleEnd, { passive: false });

        return () => {
            pad.removeEventListener("touchstart", handleStart);
            pad.removeEventListener("touchmove", handleMove);
            pad.removeEventListener("touchend", handleEnd);
            pad.removeEventListener("touchcancel", handleEnd);
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
                className="absolute w-24 h-24 bg-brand-500/20 rounded-full blur-xl pointer-events-none transition-opacity duration-150 opacity-0 border border-brand-400/30 will-change-transform"
                style={{
                    top: 0,
                    left: 0,
                    marginTop: -48,
                    marginLeft: -48,
                }}
            />
        </S.TouchPad>
    );
};
