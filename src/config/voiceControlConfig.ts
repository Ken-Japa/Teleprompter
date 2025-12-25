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
  SCROLL_LERP_FACTOR: 0.3,

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
  THROTTLE_MS: 50,

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
  },

  // --- ADAPTIVE PERFORMANCE ---

  /**
   * ADAPTIVE_THROTTLE
   * Dynamic throttle adjustment based on device performance.
   * Automatically adjusts processing rate to match device capability.
   */
  ADAPTIVE_THROTTLE: {
    enabled: true,              // Enable adaptive throttle
    minThrottle: 40,            // Fastest rate for powerful devices (ms)
    maxThrottle: 150,           // Slowest rate for weak devices (ms)
    targetProcessTime: 50,      // Target processing time (ms)
    adaptationRate: 0.1,        // How quickly to adapt (0.0-1.0)
  },

  // --- SENTENCE COMPLETION DETECTION ---

  /**
   * SENTENCE_COMPLETION
   * Auto-advance to next sentence when current sentence is complete.
   * Detects pauses/silence to infer sentence completion.
   */
  SENTENCE_COMPLETION: {
    enabled: true,              // Enable auto-advance on completion
    minProgress: 0.85,          // Minimum progress to consider complete (85%)
    pauseTimeout: 1000,         // Silence duration to trigger advance (ms)
    autoAdvance: true,          // Automatically advance to next sentence
    checkInterval: 200,         // How often to check for completion (ms)
  },

  // --- FUZZY SYNC (Error Tolerance) ---

  /**
   * FUZZY_SYNC
   * Tolerance for small recognition errors within a sentence.
   * Prevents scroll from stopping due to minor misrecognitions.
   */
  FUZZY_SYNC: {
    enabled: true,                    // Enable fuzzy sync
    minPartialMatch: 0.60,            // Minimum match ratio for partial acceptance (60%)
    intraSentenceTolerance: 0.5,      // Higher tolerance within same sentence
    catchUpEnabled: true,             // Enable auto catch-up on continued speech
    progressBoost: 0.15,              // Progress boost on partial match (15%)
  },

  // --- INITIALIZATION BEHAVIOR ---

  /**
   * INITIALIZATION
   * Controls behavior when voice control is first activated.
   * Prevents premature scrolling before speech is detected.
   */
  INITIALIZATION: {
    waitForFirstRecognition: true,    // Don't scroll until first valid match
    initialGracePeriod: 500,          // Grace period before enabling auto-scroll (ms)
    minConfidenceForInit: 0.7,        // Minimum confidence for first match (70%)
  },

  // --- PERFORMANCE METRICS ---

  /**
   * METRICS
   * Track performance metrics for optimization and debugging.
   */
  METRICS: {
    enabled: true,              // Enable performance tracking
    sampleSize: 100,            // Number of samples to track
    logInterval: 10000,         // Log metrics every N ms (0 = disabled)
  },

  // --- SPEECH VELOCITY ADAPTATION ---

  /**
   * SPEECH_VELOCITY
   * Measures speech velocity in real-time and adapts scroll speed accordingly.
   * Automatically adjusts to user's natural speaking pace.
   */
  SPEECH_VELOCITY: {
    enabled: true,
    measurementWindow: 10000,       // Measurement window in ms (10s)
    minWordsPerMinute: 80,          // Very slow speech
    maxWordsPerMinute: 200,         // Very fast speech
    baselineWPM: 140,               // Normal speaking pace
    adaptLerpFactor: true,          // Auto-adjust scroll speed
    lerpMin: 0.20,                  // Minimum lerp (slow speech)
    lerpMax: 0.45,                  // Maximum lerp (fast speech)
  },

  // --- CONFIDENCE LEARNING ---

  /**
   * CONFIDENCE_LEARNING
   * Progressive confidence system that learns from user's match history.
   * Automatically adapts requirements based on performance.
   */
  CONFIDENCE_LEARNING: {
    enabled: true,
    warmupPeriod: 30000,            // Conservative period (30s)
    historySize: 50,                // Track last N matches
    goodMatchThreshold: 0.90,       // 90%+ accuracy = good history
    poorMatchThreshold: 0.70,       // <70% accuracy = poor history
    adaptiveAdjustment: 0.05,       // 5% adjustment to thresholds
    duringWarmup: {
      enforceStrictMatching: true,  // More conservative during warmup
      minConfidence: 0.75,          // Higher confidence required
    }
  },

  // --- AUTO MODES ---

  /**
   * AUTO_MODES
   * Automatically applies optimized presets based on presentation type.
   * Detects: normal, musician, bilingual modes.
   */
  AUTO_MODES: {
    enabled: true,
    presets: {
      normal: {
        scrollLerp: 0.30,
        lookaheadPosition: 0.12,
        pauseTimeout: 1000,
        fuzzyTolerance: 0.5,
        minConfidence: 0.70,
        progressThreshold: 0.01,
      },
      musician: {
        scrollLerp: 0.35,             // More agile
        lookaheadPosition: 0.10,      // Closer to top
        pauseTimeout: 800,            // Shorter pauses
        fuzzyTolerance: 0.55,         // More tolerant
        minConfidence: 0.65,          // Less strict
        progressThreshold: 0.01,
      },
      bilingual: {
        scrollLerp: 0.28,             // Smoother
        lookaheadPosition: 0.15,      // More lookahead
        pauseTimeout: 1200,           // Longer pauses (language switch)
        fuzzyTolerance: 0.60,         // Very tolerant
        minConfidence: 0.60,          // Less strict (different language)
        progressThreshold: 0.01,
      }
    }
  },

  // --- SESSION ANALYTICS ---

  /**
   * SESSION_ANALYTICS
   * Tracks session metrics and provides summary on completion.
   * Simple analytics without persistent storage.
   */
  SESSION_ANALYTICS: {
    enabled: true,
    trackMetrics: true,
    logSummaryOnEnd: true,          // Log to console when session ends
    metrics: {
      duration: true,
      wordsPerMinute: true,
      accuracy: true,
      sentencesCompleted: true,
      averageTimePerSentence: true,
    }
  },

  // --- SCRIPT PREPROCESSING ---

  /**
   * SCRIPT_PREPROCESSING
   * Intelligent preprocessing for multilingual support.
   * Automatically handles foreign words without manual dictionary.
   */
  SCRIPT_PREPROCESSING: {
    enabled: true,
    relaxMatchingForMixedLanguage: true,  // More tolerant with foreign words
    foreignWordBonus: 0.10,               // 10% bonus tolerance for foreign words
    detectCapitalizedWords: true,         // Proper nouns likely foreign
    minWordLength: 4,                     // Only apply to words 4+ chars
  },

  // --- NOISE DETECTION ---

  /**
   * NOISE_DETECTION
   * Calibrates based on ambient noise and adjusts sensitivity.
   * Automatic calibration in first 3 seconds.
   */
  NOISE_DETECTION: {
    enabled: true,
    calibrationTime: 3000,          // 3s calibration period
    silenceThreshold: 0.15,         // Below this = likely noise
    autoAdjustMinLength: true,      // Adjust minimum transcript length
    noisyEnvironmentBonus: 2,       // +2 chars in noisy environment
    maxRecognitionsPerSecond: 3,    // More than this = noisy
  },
};
