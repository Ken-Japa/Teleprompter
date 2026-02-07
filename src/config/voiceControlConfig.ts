/**
 * Adaptive Voice Control Configuration
 * Self-learning system that improves with usage
 */

// Persistent storage for learning
const STORAGE_KEY = 'promptninja_voice_profile';

interface VoiceProfile {
  averageWPM: number;
  preferredLerpFactor: number;
  accuracyHistory: number[];
  sessionCount: number;
  lastUpdated: number;
}

class AdaptiveVoiceConfig {
  private profile: VoiceProfile;

  constructor() {
    this.profile = this.loadProfile();
  }

  private loadProfile(): VoiceProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[Voice] Failed to load profile, using defaults');
    }

    return {
      averageWPM: 140,
      preferredLerpFactor: 0.35,
      accuracyHistory: [],
      sessionCount: 0,
      lastUpdated: Date.now(),
    };
  }

  private saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      console.warn('[Voice] Failed to save profile');
    }
  }

  /**
   * Update profile based on session performance
   */
  updateFromSession(sessionData: {
    averageWPM: number;
    accuracy: number;
  }) {
    const { averageWPM, accuracy } = sessionData;

    // Exponential moving average for WPM
    const alpha = 0.3; // Learning rate
    this.profile.averageWPM =
      this.profile.averageWPM * (1 - alpha) + averageWPM * alpha;

    // Track accuracy history (last 10 sessions)
    this.profile.accuracyHistory.push(accuracy);
    if (this.profile.accuracyHistory.length > 10) {
      this.profile.accuracyHistory.shift();
    }

    // Adapt lerp factor based on accuracy
    const avgAccuracy = this.profile.accuracyHistory.reduce((a, b) => a + b, 0) /
      this.profile.accuracyHistory.length;

    if (avgAccuracy > 0.85) {
      // High accuracy: can be more aggressive
      this.profile.preferredLerpFactor = Math.min(0.50, this.profile.preferredLerpFactor + 0.02);
    } else if (avgAccuracy < 0.70) {
      // Low accuracy: be more conservative
      this.profile.preferredLerpFactor = Math.max(0.25, this.profile.preferredLerpFactor - 0.02);
    }

    this.profile.sessionCount++;
    this.profile.lastUpdated = Date.now();
    this.saveProfile();
  }

  /**
   * Get optimized config for current user
   */
  getConfig(): typeof VOICE_CONFIG {
    const baseConfig = { ...VOICE_CONFIG };

    // Apply learned preferences
    baseConfig.SCROLL_LERP_FACTOR = this.profile.preferredLerpFactor;
    baseConfig.SPEECH_VELOCITY.baselineWPM = this.profile.averageWPM;

    // Auto-adjust based on proficiency
    const isExperienced = this.profile.sessionCount > 5;
    const isAccurate = this.profile.accuracyHistory.slice(-3).every(a => a > 0.80);

    if (isExperienced && isAccurate) {
      baseConfig.MATCH_CONFIRMATION_FRAMES = 2; // Faster confirmation
      baseConfig.PROGRESS_SMOOTH_FACTOR = 0.50; // More responsive
      baseConfig.FUZZY_SYNC.intraSentenceTolerance = 0.60; // More tolerant
    }

    return baseConfig;
  }

  getProfile() {
    return { ...this.profile };
  }

  resetProfile() {
    this.profile = {
      averageWPM: 140,
      preferredLerpFactor: 0.35,
      accuracyHistory: [],
      sessionCount: 0,
      lastUpdated: Date.now(),
    };
    this.saveProfile();
  }
}

// Singleton instance
const adaptiveConfig = new AdaptiveVoiceConfig();

// Export both static and adaptive configs
export const VOICE_CONFIG = {
  // --- CORE POSITIONING ---
  LOOKAHEAD_POSITION: 0.12,
  SCROLL_LERP_FACTOR: 0.35, // Will be overridden by adaptive
  PROGRESS_THRESHOLD: 0.01,
  VOICE_PADDING_TOP: 7,

  // --- RECOGNITION TUNING ---
  THROTTLE_MS: 50,
  ADAPTIVE_THROTTLE: {
    enabled: true,
    minThrottle: 30,
    maxThrottle: 80,
    emaAlpha: 0.1,
    throttleMultiplier: 0.8,
  },
  MATCH_CONFIRMATION_FRAMES: 2,
  PROGRESS_SMOOTH_FACTOR: 0.55, // Increased for smoother scroll transitions (was 0.40)

  // --- DAMPING & PHYSICS (LAYER 2) ---
  DAMPING: {
    enabled: true,
    OSCILLATION_THRESHOLD: 12, // px - Ignore small reversals to prevent jitter (was 15)
    MAX_FOLLOW_VELOCITY: 50, // px/frame - Cap speed to prevent teleporting (was 8)
    DEADZONE_PX: 1, // px - Minimum move threshold (was 4)
    JERK_LIMIT: 2.5, // limit change in velocity (was 0.5)
    INITIAL_SNAP_THRESHOLD: 200, // px - If distance is more than this on first match, jump (snap) instead of damp
  },

  // --- HYSTERESIS & STABILITY ---
  HYSTERESIS: {
    enabled: true,
    MS: 200, // Wait 200ms before confirming uncertain matches (was 200ms)
    REQUIRED_CONFIRMATIONS: 3, // Require 3 confirmations to prevent rapid oscillation
    INSTANT_MATCH_THRESHOLD: 0.90, // Match > 90% accuracy jumps instantly
    CONFIDENCE_BOOST_PER_FRAME: 0.15, // Accumulate confidence over frames
  },

  SEMANTIC_WINDOWING: {
    enabled: true,
    WINDOW_SIZE: 3, // Look at last 3 words
    NEXT_SENTENCE_BIAS: 1.2, // Prefer next sentence over current
    HISTORY_MAX_WORDS: 12, // How many words to keep in Intent Buffer
    MIN_CONFIDENCE: 0.50, // Minimum confidence to accept a match
    STALL_THRESHOLD: 5, // Consecutive misses before assuming stalled
  },

  // --- SEMANTIC INERTIA (NEW) ---
  SEMANTIC_INERTIA: {
    enabled: true,
    VELOCITY_DECAY: 0.95, // 5% decay per frame
    MIN_CONFIDENCE_TO_CONTINUE: 0.60, // Only feed inertia if confidence is decent
    HISTORY_MS: 500, // Look at last 500ms for velocity calculation
    STALL_THRESHOLD_MS: 300, // Stop inertia if no match for 300ms
    MAX_DRIFT_SPEED: 2.0, // Pixels per frame
  },

  // --- STEMMING & NORMALIZATION ---
  STEMMING: {
    enabled: true,
    LANGUAGE_SUPPORT: ['pt', 'en', 'es'],
    STRIP_PLURALS: true,
    NORMALIZE_VERBS: true,
  },

  // --- PHONETIC MATCHING (METAPHONE) ---
  PHONETIC_MATCHING: {
    enabled: true,
    GRAY_ZONE: { MIN: 0.60, MAX: 0.90 },
    BOOST: 0.10,
  },

  // --- ADVANCED MATCHING ---
  ADVANCED_MATCHING: {
    maxWideJump: 250, // characters
    globalSearchOnStart: true,
    globalSearchFailureThreshold: 10,
  },

  SEARCH_WINDOW: {
    SMALL: 600,
    MEDIUM: 1000,
    LARGE: 1500, // Reduced from 2500
  },


  // --- SENTENCE COMPLETION ---
  SENTENCE_COMPLETION: {
    enabled: true,
    minProgress: 0.70,
    standardPauseTimeout: 1200,
    punctPauseTimeout: 300,
    autoAdvance: true,
    checkInterval: 200,
  },

  // --- INTELLIGENT PARSER ---
  INTELLIGENT_PARSER: {
    enabled: true, // Toggle for intelligent parser feature
    excludeMusicianMode: true, // Don't apply to musician mode
    excludeCommandTags: true, // Don't apply to sentences with command tags
    minWordsForIntelligentBreak: 8, // Minimum words before considering smart break
    maxWordsPerSentence: 25, // Maximum words before forcing a break
  },

  // --- FUZZY SYNC ---
  FUZZY_SYNC: {
    enabled: true,
    minPartialMatch: 0.55,
    intraSentenceTolerance: 0.50,
    catchUpEnabled: true,
    progressBoost: 0.20,
  },

  // --- RECOVERY & LOOKAHEAD ---
  RECOVERY: {
    enabled: true,
    aheadWindow: 1, // Reduced from 2
    minConfidence: 0.12, // Stricter: 0.25 ratio (75% accuracy) required for recovery jump
    partialRecovery: true,
    STRICT_NEXT_THRESHOLD: 0.25,
    CONFIDENCE_REQUIREMENT: 0.12,
  },

  // --- JUMP VALIDATION ---
  JUMP_VALIDATION: {
    STALLED_LARGE_JUMP_THRESHOLD: 0.30,
    LARGE_JUMP_THRESHOLD: 0.20,
    NEXT_SENTENCE_THRESHOLD: 0.30,
  },

  // --- JUMP PENALTY (NEW) ---
  JUMP_PENALTY: {
    enabled: true,
    k: 500, // Decay constant (lower = steeper penalty)
    maxPenaltyBonus: 0.25, // Maximum amount to increase ratio (reducing confidence)
  },

  // --- INITIALIZATION ---
  INITIALIZATION: {
    waitForFirstRecognition: true,
    initialGracePeriod: 500,
    minConfidenceForInit: 0.65,
  },

  // --- METRICS ---
  METRICS: {
    enabled: true,
    sampleSize: 100,
    logInterval: 10000,
  },

  // --- SPEECH VELOCITY ---
  SPEECH_VELOCITY: {
    enabled: true,
    measurementWindow: 10000,
    minWordsPerMinute: 80,
    maxWordsPerMinute: 200,
    baselineWPM: 140, // Will be overridden by adaptive
    adaptLerpFactor: true,
    lerpMin: 0.20,
    lerpMax: 0.50,
  },

  // --- CONFIDENCE LEARNING ---
  CONFIDENCE_LEARNING: {
    enabled: false, // Disabled for now (User request)
    warmupPeriod: 30000,
    historySize: 50,
    goodMatchThreshold: 0.90,
    poorMatchThreshold: 0.70,
    adaptiveAdjustment: 0.05,
    duringWarmup: {
      enforceStrictMatching: true,
      minConfidence: 0.75,
    },
  },

  // --- AUTO MODES ---
  AUTO_MODES: {
    enabled: true,
    presets: {
      normal: {
        scrollLerp: 0.35,
        lookaheadPosition: 0.12,
        pauseTimeout: 1200,
        fuzzyTolerance: 0.55,
        minConfidence: 0.65,
        progressThreshold: 0.01,
      },
      musician: {
        scrollLerp: 0.40,
        lookaheadPosition: 0.10,
        pauseTimeout: 800,
        fuzzyTolerance: 0.60,
        minConfidence: 0.60,
        progressThreshold: 0.01,
      },
      bilingual: {
        scrollLerp: 0.30,
        lookaheadPosition: 0.15,
        pauseTimeout: 1400,
        fuzzyTolerance: 0.65,
        minConfidence: 0.55,
        progressThreshold: 0.01,
      },
    },
  },

  // Unified Regex: Matches color tags <r>...</r> OR brackets [...]
  // Group 1: Tag char (r,y,g,b,blue)
  // Group 2: Tag content
  // Group 3: Square Bracket match [ ... ] (max 100 chars, no newlines)
  // Group 4: Angle Bracket match < ... > (max 100 chars, no newlines, avoids known tags)
  TOKEN_REGEX: /<(r|y|g|blue)>([\s\S]*?)<\/\1>|(\[[^\]\n]{1,100}\])|(<(?!\/?(?:bold|i|u|b|r|y|g|strong|em|blue)\b)[^>\n]{1,100}>)/g,

  // --- SESSION ANALYTICS ---
  SESSION_ANALYTICS: {
    enabled: false, // Disabilitado temporariamente a pedido do usuário
    trackMetrics: true,
    logSummaryOnEnd: true,
    metrics: {
      duration: true,
      wordsPerMinute: true,
      accuracy: true,
      sentencesCompleted: true,
      averageTimePerSentence: true,
    },
  },

  // --- SCRIPT PREPROCESSING ---
  SCRIPT_PREPROCESSING: {
    enabled: true,
    relaxMatchingForMixedLanguage: true,
    foreignWordBonus: 0.15,
    detectCapitalizedWords: true,
    minWordLength: 4,
  },

  // --- NOISE DETECTION ---
  NOISE_DETECTION: {
    enabled: true,
    calibrationTime: 3000,
    silenceThreshold: 0.15,
    autoAdjustMinLength: true,
    noisyEnvironmentBonus: 2,
    maxRecognitionsPerSecond: 3,
  },

  // --- NEW: PRONUNCIATION DICTIONARY ---
  PRONUNCIATION_DICT: {
    enabled: true,
    // Common mispronunciations that should be treated as matches
    aliases: {
      'promptninja': ['próprio ninja', 'pronto ninja', 'prompt ninja'],
      'webrtc': ['web arte cê', 'webertc', 'web rts'],
      'streaming': ['estreaming', 'estriming'],
      'teleprompter': ['teleponto', 'telepronto'],
    } as Record<string, string[]>,
  },

  // --- NEW: CONTEXT-AWARE MATCHING ---
  CONTEXT_AWARE: {
    enabled: true,
    // Use previous sentences to predict next words (n-gram model)
    ngramOrder: 3, // bigrams
    // Boost matching confidence if word appears in previous context
    contextBoostFactor: 0.20,
  },

  // --- NEW: LANGUAGE OVERRIDES ---
  LANGUAGE_OVERRIDES: {
    'pt': {
      intraSentenceTolerance: 0.45,
      minConfidence: 0.70,
      stemWeight: 0.30,
      phoneticWeight: 0.15,
      segmentMatching: {
        enabled: true,
        windowSize: 6,
        threshold: 0.22,
      }
    },
    'en': {
      intraSentenceTolerance: 0.35,
      minConfidence: 0.70,
      stemWeight: 0.35,
      phoneticWeight: 0.10,
      segmentMatching: {
        enabled: true,
        windowSize: 6,
        threshold: 0.15,
      }
    }
  } as Record<string, any>,

  // --- EMERGENCY RECOVERY ---
  EMERGENCY_RECOVERY: {
    enabled: true,
    FAILURE_THRESHOLD: 8,
    FAILURE_WINDOW_MS: 3000,
    EMERGENCY_MODE_DURATION: 5000,
    RELAXED_CONFIDENCE: 0.30,
    FORCE_ADVANCE_ON_SPEECH: true,
  },

  // --- DYNAMIC JUMP LIMITS ---
  DYNAMIC_JUMP_LIMITS: {
    DEFAULT: 250,
    ON_REACTIVATION: 2500,
    ON_RECOVERY: 1000,
    REACTIVATION_GRACE_PERIOD: 2500,
  },
};

// Export adaptive instance
export const getAdaptiveConfig = () => adaptiveConfig.getConfig();
export const updateVoiceProfile = (data: { averageWPM: number; accuracy: number }) =>
  adaptiveConfig.updateFromSession(data);
export const getVoiceProfile = () => adaptiveConfig.getProfile();
export const resetVoiceProfile = () => adaptiveConfig.resetProfile();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  (window as any).voiceProfile = {
    get: getVoiceProfile,
    reset: resetVoiceProfile,
    update: updateVoiceProfile,
  };
}
