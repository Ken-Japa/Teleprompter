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
