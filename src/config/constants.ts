import { Theme } from "../types";

/**
 * Configuration Constants for PromptNinja
 *
 * This file contains all the hardcoded values used throughout the application.
 * Grouped by functionality for easier maintenance.
 */

// Prompter Default Settings
export const PROMPTER_DEFAULTS = {
 FONT_SIZE: 64,
 MARGIN: 10,
 IS_MIRRORED: false,
 IS_UPPERCASE: false,
 IS_FLIP_VERTICAL: false,
 // LocalStorage Keys
 STORAGE_KEYS: {
  FONT_SIZE: "promptninja_font",
  MARGIN: "promptninja_margin",
  MIRROR: "promptninja_mirror",
  THEME: "promptninja_theme",
  CAPS: "promptninja_caps",
  FOCUS: "promptninja_focus",
  FLIP_VERTICAL: "promptninja_flipv",
  VOICE_MODE: "promptninja_voice_mode",
  PRO_STATUS: "promptninja_pro",
 },
 // Theme Cycle Order
 THEME_ORDER: [Theme.DEFAULT, Theme.PAPER, Theme.CONTRAST, Theme.MATRIX, Theme.CYBER, Theme.CREAM],
};

// Physics & Scrolling Constants
export const PHYSICS_CONSTANTS = {
 // Base velocity multiplier
 VELOCITY_MULTIPLIER: 40,
 // Power factor for speed curve (non-linear speed)
 SPEED_POWER: 1.4,
 // Maximum delta time in ms to prevent jumps
 MAX_DELTA_TIME: 64,
 // Standard frame time (approx 60fps)
 TARGET_FRAME_TIME: 16.67,
 // Threshold to consider movement stopped
 MOMENTUM_THRESHOLD: 0.01,
 // Scroll position tolerance
 SCROLL_TOLERANCE: 1,
 // Deceleration factor when not touching (natural friction)
 FRICTION_NATURAL: 0.95,
 // Deceleration factor when touching (higher friction)
 FRICTION_TOUCH: 0.8,
 // Threshold to start auto-scrolling
 AUTO_SCROLL_THRESHOLD: 0.5,
};

// UI Limits & Controls
export const UI_LIMITS = {
 SPEED: {
  MIN: 0,
  MAX: 10,
  STEP: 0.1,
 },
 FONT_SIZE: {
  MIN: 20, // Unified minimum (was 24 in slider, 20 in button logic)
  MAX: 200,
  STEP_BUTTON: 4,
 },
 HUD: {
  TIMEOUT_MS: 3000,
 },
};
