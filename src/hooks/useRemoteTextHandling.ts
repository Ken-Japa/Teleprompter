import { useMemo } from "react";
import { NavigationItem } from "../types";

export interface TextSegment {
    id: number | string;
    text: string;
    progress: number;
}

export const useRemoteTextHandling = (text: string, navigationMap: NavigationItem[] | undefined) => {
    // Parse text for Navigation
    const textSegments = useMemo(() => {
        // Priority: Use Host-provided Navigation Map
        if (navigationMap && navigationMap.length > 0) {
            return navigationMap.map(item => ({
                id: item.id,
                text: item.label || "...",
                progress: item.progress
            }));
        }

        if (!text) return [];

        // Heuristic: 
        // A visual line takes up vertical space. We estimate visual lines based on character count wrapping.
        // Assuming ~50 chars per visual line on average.
        const CHARS_PER_VISUAL_LINE = 50;
        const WEIGHT_PER_VISUAL_LINE = 100;

        const getLineWeight = (line: string) => {
            const length = line.length;
            // Minimum 1 visual line, even if empty (it's a newline)
            const visualLines = Math.max(1, Math.ceil(length / CHARS_PER_VISUAL_LINE));
            return visualLines * WEIGHT_PER_VISUAL_LINE;
        };

        const lines = text.split('\n');
        const totalVisualWeight = lines.reduce((acc, line) => acc + getLineWeight(line), 0);

        const segments: TextSegment[] = [];
        let currentWeight = 0;

        lines.forEach((line, index) => {
            const weight = getLineWeight(line);

            // Only add navigable segments for non-empty lines
            if (line.trim().length > 0) {
                segments.push({
                    id: `heuristic-${index}`,
                    text: line,
                    progress: currentWeight / totalVisualWeight
                });
            }

            currentWeight += weight;
        });

        return segments;
    }, [text, navigationMap]);

    return { textSegments };
};
