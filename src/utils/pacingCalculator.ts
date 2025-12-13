/**
 * Pacing Calculator Utility
 * Calculates reading time and provides recommendations for content duration
 */

export interface WPMRate {
    slow: number;
    medium: number;
    fast: number;
}

export interface PlatformTarget {
    name: string;
    targetSeconds: number;
    key: "tiktok" | "youtube";
}

export interface ReadingTimeEstimate {
    slow: number;
    medium: number;
    fast: number;
}

export interface PlatformRecommendation {
    platform: PlatformTarget;
    suggestedWords: {
        slow: number;
        medium: number;
        fast: number;
    };
    currentFit: "perfect" | "tooLong" | "tooShort";
    adjustment?: {
        type: "add" | "remove";
        words: number;
    };
}

/**
 * Removes formatting tags from text before counting
 */
function stripTags(text: string): string {
    return text.replace(/<\/?[rgybRGYB]>/g, "");
}

/**
 * Counts words in the given text, excluding formatting tags
 */
export function calculateWordCount(text: string): number {
    const cleanText = stripTags(text);
    const words = cleanText.trim().split(/\s+/);
    return words.filter((word) => word.length > 0).length;
}

/**
 * Returns recommended WPM rates for different speaking speeds
 */
export function getRecommendedWPM(): WPMRate {
    return {
        slow: 120, // Formal presentations, careful speech
        medium: 150, // Normal conversational pace
        fast: 180, // Energetic content, TikTok style
    };
}

/**
 * Calculates reading time in seconds based on word count and WPM
 */
export function calculateReadingTime(wordCount: number, wpm: number): number {
    if (wpm <= 0) return 0;
    return Math.round((wordCount / wpm) * 60);
}

/**
 * Calculates reading time estimates for all WPM rates
 */
export function calculateReadingTimeEstimates(wordCount: number): ReadingTimeEstimate {
    const wpm = getRecommendedWPM();
    return {
        slow: calculateReadingTime(wordCount, wpm.slow),
        medium: calculateReadingTime(wordCount, wpm.medium),
        fast: calculateReadingTime(wordCount, wpm.fast),
    };
}

/**
 * Calculates suggested word count for a target duration
 */
export function getSuggestedTextLength(targetSeconds: number, wpm: number): number {
    return Math.round((targetSeconds / 60) * wpm);
}

/**
 * Returns platform-specific targets
 */
export function getPlatformTargets(): PlatformTarget[] {
    return [
        {
            name: "TikTok/Reels",
            targetSeconds: 60,
            key: "tiktok",
        },
        {
            name: "YouTube",
            targetSeconds: 300, // 5 minutes
            key: "youtube",
        },
    ];
}

/**
 * Analyzes text fit for a specific platform
 */
export function analyzePlatformFit(
    wordCount: number,
    platform: PlatformTarget,
    wpm: number
): {
    currentFit: "perfect" | "tooLong" | "tooShort";
    adjustment?: { type: "add" | "remove"; words: number };
} {
    const readingTime = calculateReadingTime(wordCount, wpm);
    const targetSeconds = platform.targetSeconds;
    const suggestedWords = getSuggestedTextLength(targetSeconds, wpm);

    // Allow 10% tolerance
    const tolerance = targetSeconds * 0.1;
    const difference = Math.abs(readingTime - targetSeconds);

    if (difference <= tolerance) {
        return { currentFit: "perfect" };
    }

    if (readingTime > targetSeconds) {
        return {
            currentFit: "tooLong",
            adjustment: {
                type: "remove",
                words: Math.round(wordCount - suggestedWords),
            },
        };
    }

    return {
        currentFit: "tooShort",
        adjustment: {
            type: "add",
            words: Math.round(suggestedWords - wordCount),
        },
    };
}

/**
 * Gets recommendations for all platforms
 */
export function getPlatformRecommendations(wordCount: number): PlatformRecommendation[] {
    const wpm = getRecommendedWPM();
    const platforms = getPlatformTargets();

    return platforms.map((platform) => {
        const suggestedWords = {
            slow: getSuggestedTextLength(platform.targetSeconds, wpm.slow),
            medium: getSuggestedTextLength(platform.targetSeconds, wpm.medium),
            fast: getSuggestedTextLength(platform.targetSeconds, wpm.fast),
        };

        // Analyze fit using medium WPM as default
        const { currentFit, adjustment } = analyzePlatformFit(wordCount, platform, wpm.medium);

        return {
            platform,
            suggestedWords,
            currentFit,
            adjustment,
        };
    });
}

/**
 * Formats seconds into MM:SS format
 */
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}
