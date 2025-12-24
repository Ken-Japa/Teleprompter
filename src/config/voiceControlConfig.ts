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
  LOOKAHEAD_POSITION: 0.15,

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
   * Helps reduce jitter from small fluctuations in voice recognition progress.
   */
  PROGRESS_THRESHOLD: 0.1,

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
  VOICE_PADDING_TOP: 7, // 15vh padding
};
