/**
 * Voice Control Configuration
 * 
 * This file contains manual configuration values for the voice control scrolling behavior.
 * Adjust these values to fine-tune the teleprompter's response to voice input.
 */

export const VOICE_CONFIG = {
  /**
   * LOOKAHEAD_POSITION (0.0 - 1.0)
   * Defines the target position of the active sentence on the screen.
   * 
   * - 0.0: Top of the screen
   * - 0.5: Center of the screen
   * - 1.0: Bottom of the screen
   * 
   * Current Value: 0.15 (15% from the top)
   * Provides good lookahead while keeping current line near top.
   * Higher values help with line breaks and seeing upcoming text.
   */
  LOOKAHEAD_POSITION: 0.12,

  /**
   * SCROLL_LERP_FACTOR (0.0 - 1.0)
   * Controls the smoothness/speed of the scroll movement towards the target.
   * Higher values mean faster, more responsive movement (less smooth).
   * Lower values mean slower, smoother movement (more lag).
   * 
   * - 0.1: Very smooth, slow catch-up
   * - 0.3: Balanced responsiveness
   * - 1.0: Instant jump
   * 
   * Current Value: 0.45 - MUSICIAN MODE OPTIMIZED
   * Faster response to keep up with singing pace and reduce perceived lag.
   */
  SCROLL_LERP_FACTOR: 0.4,

  /**
   * PROGRESS_THRESHOLD (0.0 - 1.0)
   * The percentage of sentence completion required to trigger a scroll update.
   * Lowered to 0.01 to ensure smooth scrolling even within sentences.
   */
  PROGRESS_THRESHOLD: 0.01,

  /**
   * VOICE_PADDING_TOP (vh)
   * The top padding applied to the prompter content when Voice Mode is active.
   * This overrides the default 50vh (Center) or 100vh (Flipped) padding.
   * 
   * - 10: 10vh from top (Text starts near top)
   * - 50: 50vh from top (Text starts at center)
   * 
   * Goal: Allow text to reach the visual top marker comfortably.
   */
  VOICE_PADDING_TOP: 7, // 7vh padding as requested

  // --- RECOGNITION TUNING ---

  /**
   * THROTTLE_MS
   * Minimum time (ms) between processing interim results.
   * Reduces computational load by limiting updates per second.
   * Default: 75ms (~13fps)
   */
  THROTTLE_MS: 80,

  /**
   * MATCH_CONFIRMATION_FRAMES
   * Number of consecutive frames a new sentence match must be stable
   * before locking onto it. Prevents jittery jumps.
   */
  MATCH_CONFIRMATION_FRAMES: 2,

  /**
   * PROGRESS_SMOOTH_FACTOR (0.0 - 1.0)
   * Smoothing factor for the progress within a sentence.
   * Higher = more responsive (jittery), Lower = smoother (laggy).
   * 0.35 means 35% new value, 65% old value.
   */
  PROGRESS_SMOOTH_FACTOR: 0.35,

  /**
   * SEARCH_WINDOW_SMALL/MEDIUM/LARGE
   * Characters to look ahead/behind for fuzzy matching based on script size.
   */
  SEARCH_WINDOW: {
    SMALL: 600,   // scripts < 2000 chars
    MEDIUM: 800,  // scripts < 5000 chars
    LARGE: 1200,  // scripts > 5000 chars
  }
};
