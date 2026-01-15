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
      preferredLerpFactor: 0.30,
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
      this.profile.preferredLerpFactor = Math.min(0.45, this.profile.preferredLerpFactor + 0.02);
    } else if (avgAccuracy < 0.70) {
      // Low accuracy: be more conservative
      this.profile.preferredLerpFactor = Math.max(0.20, this.profile.preferredLerpFactor - 0.02);
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
      baseConfig.MATCH_CONFIRMATION_FRAMES = 1; // Faster confirmation
      baseConfig.PROGRESS_SMOOTH_FACTOR = 0.45; // More responsive
      baseConfig.FUZZY_SYNC.intraSentenceTolerance = 0.55; // More tolerant
    }

    return baseConfig;
  }

  getProfile() {
    return { ...this.profile };
  }

  resetProfile() {
    this.profile = {
      averageWPM: 140,
      preferredLerpFactor: 0.30,
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
  SCROLL_LERP_FACTOR: 0.30, // Will be overridden by adaptive
  PROGRESS_THRESHOLD: 0.01,
  VOICE_PADDING_TOP: 7,

  // --- RECOGNITION TUNING ---
  THROTTLE_MS: 50,
  MATCH_CONFIRMATION_FRAMES: 2,
  PROGRESS_SMOOTH_FACTOR: 0.35,

  SEARCH_WINDOW: {
    SMALL: 800,
    MEDIUM: 1200,
    LARGE: 2500,
  },

  // --- ADAPTIVE THROTTLE ---
  ADAPTIVE_THROTTLE: {
    enabled: true,
    minThrottle: 40,
    maxThrottle: 150,
    targetProcessTime: 50,
    adaptationRate: 0.1,
  },

  // --- SENTENCE COMPLETION ---
  SENTENCE_COMPLETION: {
    enabled: true,
    minProgress: 0.70,
    pauseTimeout: 800,
    autoAdvance: true,
    checkInterval: 200,
  },

  // --- FUZZY SYNC ---
  FUZZY_SYNC: {
    enabled: true,
    minPartialMatch: 0.50,
    intraSentenceTolerance: 0.5,
    catchUpEnabled: true,
    progressBoost: 0.25,
  },

  // --- RECOVERY & LOOKAHEAD ---
  RECOVERY: {
    enabled: true,
    aheadWindow: 2, // How many sentences to look ahead
    minConfidence: 0.60,
    partialRecovery: true,
  },

  // --- INITIALIZATION ---
  INITIALIZATION: {
    waitForFirstRecognition: true,
    initialGracePeriod: 500,
    minConfidenceForInit: 0.7,
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
    lerpMax: 0.45,
  },

  // --- CONFIDENCE LEARNING ---
  CONFIDENCE_LEARNING: {
    enabled: true,
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
        scrollLerp: 0.30,
        lookaheadPosition: 0.12,
        pauseTimeout: 1000,
        fuzzyTolerance: 0.5,
        minConfidence: 0.70,
        progressThreshold: 0.01,
      },
      musician: {
        scrollLerp: 0.35,
        lookaheadPosition: 0.10,
        pauseTimeout: 800,
        fuzzyTolerance: 0.55,
        minConfidence: 0.65,
        progressThreshold: 0.01,
      },
      bilingual: {
        scrollLerp: 0.28,
        lookaheadPosition: 0.15,
        pauseTimeout: 1200,
        fuzzyTolerance: 0.60,
        minConfidence: 0.60,
        progressThreshold: 0.01,
      },
    },
  },

  // --- SESSION ANALYTICS ---
  SESSION_ANALYTICS: {
    enabled: true,
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
    foreignWordBonus: 0.10,
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
    ngramOrder: 2, // bigrams
    // Boost matching confidence if word appears in previous context
    contextBoostFactor: 0.15,
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
