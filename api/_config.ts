/**
 * Shared Configuration for API Functions
 * 
 * This file contains configuration constants used by serverless API functions.
 * It's separate from src/config/constants.ts to avoid import path issues in Vercel.
 */

export const APP_CONSTANTS = {
    REDEEM_MODAL_ELAPSED_TIME: 1200,
    DEVICE_AUTHENTICATION_LIMIT: 12,
};

export const ALLOWED_ORIGINS = [
    "https://promptninja.solutionkit.com.br",
    "https://music.solutionkit.com.br",
];

/**
 * Checks if a given origin is allowed based on hardcoded whitelist
 * or Vercel preview branch pattern.
 */
export function isOriginAllowed(origin: string | undefined): boolean {
    if (!origin) return false;

    // Direct match
    if (ALLOWED_ORIGINS.includes(origin)) return true;

    // Local development
    if (origin.startsWith("http://localhost:")) return true;

    // Vercel Preview branches (e.g., https://teleprompter-git-controlevoz-kenjapas-projects.vercel.app)
    if (origin.endsWith(".vercel.app")) return true;

    return false;
}
