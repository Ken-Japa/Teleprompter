/**
 * OPTIMIZED Voice Control Configuration
 * Fixes for unexpected scroll stops
 * 
 * CHANGES:
 * - Relaxed jump validation thresholds
 * - Faster confirmation (2 frames vs 3)
 * - Limited throttle to prevent lag
 * - More tolerant fuzzy matching
 * - Emergency recovery doesn't stop recognition
 */

export const VOICE_CONFIG = {
  // --- CORE POSITIONING ---
  LOOKAHEAD_POSITION: 0.12,
  SCROLL_LERP_FACTOR: 0.35, // ⬆️ INCREASED from 0.30 (more responsive)
  PROGRESS_THRESHOLD: 0.01,
  VOICE_PADDING_TOP: 7,

  // --- RECOGNITION TUNING ---
  THROTTLE_MS: 50,
  MATCH_CONFIRMATION_FRAMES: 2, // ⬇️ REDUCED from 3 (33% faster)
  PROGRESS_SMOOTH_FACTOR: 0.40, // ⬆️ INCREASED from 0.35

  // --- ADVANCED MATCHING ---
  ADVANCED_MATCHING: {
    maxWideJump: 250, // ⬆️ INCREASED from 200
    globalSearchOnStart: true,
    globalSearchFailureThreshold: 10, // ⬆️ INCREASED from 8 (more patient)
  },

  SEARCH_WINDOW: {
    SMALL: 600,
    MEDIUM: 1000,
    LARGE: 1500,
  },

  // --- ADAPTIVE THROTTLE ---
  ADAPTIVE_THROTTLE: {
    enabled: true,
    minThrottle: 40,
    maxThrottle: 80, // ⬇️ REDUCED from 150 (prevent lag in long scripts)
    targetProcessTime: 50,
    adaptationRate: 0.1,
  },

  // --- SENTENCE COMPLETION ---
  SENTENCE_COMPLETION: {
    enabled: true,
    minProgress: 0.70, // ⬇️ REDUCED from 0.75 (advance sooner)
    pauseTimeout: 1200, // ⬆️ INCREASED from 1000 (more patient)
    autoAdvance: true,
    checkInterval: 200,
  },

  // --- FUZZY SYNC ---
  FUZZY_SYNC: {
    enabled: true,
    minPartialMatch: 0.55, // ⬇️ REDUCED from 0.60 (more tolerant)
    intraSentenceTolerance: 0.45, // ⬆️ INCREASED from 0.40 (more tolerant)
    catchUpEnabled: true,
    progressBoost: 0.20, // ⬆️ INCREASED from 0.15 (faster catch-up)
  },

  // --- RECOVERY & LOOKAHEAD ---
  RECOVERY: {
    enabled: true,
    aheadWindow: 1,
    minConfidence: 0.12, // ⬇️ REDUCED from 0.15 (more tolerant)
    partialRecovery: true, // ✅ ENABLED (was false)
    STRICT_NEXT_THRESHOLD: 0.25, // ⬆️ INCREASED from 0.20
    CONFIDENCE_REQUIREMENT: 0.12, // ⬇️ REDUCED from 0.15
  },

  // --- JUMP VALIDATION ---
  JUMP_VALIDATION: {
    STALLED_LARGE_JUMP_THRESHOLD: 0.30, // ⬆️ INCREASED from 0.25
    LARGE_JUMP_THRESHOLD: 0.20, // ⬆️ INCREASED from 0.10 (CRITICAL FIX)
    NEXT_SENTENCE_THRESHOLD: 0.30, // ⬆️ INCREASED from 0.25
  },

  // --- INITIALIZATION ---
  INITIALIZATION: {
    waitForFirstRecognition: true,
    initialGracePeriod: 500,
    minConfidenceForInit: 0.65, // ⬇️ REDUCED from 0.70
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
    baselineWPM: 140,
    adaptLerpFactor: true,
    lerpMin: 0.20,
    lerpMax: 0.50, // ⬆️ INCREASED from 0.45
  },

  // --- CONFIDENCE LEARNING ---
  CONFIDENCE_LEARNING: {
    enabled: false, // Disabled per user request
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
        scrollLerp: 0.35, // ⬆️ INCREASED from 0.30
        lookaheadPosition: 0.12,
        pauseTimeout: 1200, // ⬆️ INCREASED from 1000
        fuzzyTolerance: 0.55, // ⬆️ INCREASED from 0.50
        minConfidence: 0.65, // ⬇️ REDUCED from 0.70
        progressThreshold: 0.01,
      },
      musician: {
        scrollLerp: 0.40, // ⬆️ INCREASED from 0.35
        lookaheadPosition: 0.10,
        pauseTimeout: 800,
        fuzzyTolerance: 0.60, // ⬆️ INCREASED from 0.55
        minConfidence: 0.60, // ⬇️ REDUCED from 0.65
        progressThreshold: 0.01,
      },
      bilingual: {
        scrollLerp: 0.30, // ⬆️ INCREASED from 0.28
        lookaheadPosition: 0.15,
        pauseTimeout: 1400, // ⬆️ INCREASED from 1200
        fuzzyTolerance: 0.65, // ⬆️ INCREASED from 0.60
        minConfidence: 0.55, // ⬇️ REDUCED from 0.60
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
    foreignWordBonus: 0.15, // ⬆️ INCREASED from 0.10
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

  // --- PRONUNCIATION DICTIONARY ---
  PRONUNCIATION_DICT: {
    enabled: true,
    aliases: {
      'promptninja': ['próprio ninja', 'pronto ninja', 'prompt ninja'],
      'webrtc': ['web arte cê', 'webertc', 'web rts'],
      'streaming': ['estreaming', 'estriming'],
      'teleprompter': ['teleponto', 'telepronto'],
    } as Record<string, string[]>,
  },

  // --- CONTEXT-AWARE MATCHING ---
  CONTEXT_AWARE: {
    enabled: true,
    ngramOrder: 3,
    contextBoostFactor: 0.20,
  },

  // --- LANGUAGE OVERRIDES ---
  LANGUAGE_OVERRIDES: {
    'pt': {
      intraSentenceTolerance: 0.45, // ⬆️ INCREASED from 0.40
      minConfidence: 0.70, // ⬇️ REDUCED from 0.75
      segmentMatching: {
        enabled: true,
        windowSize: 6,
        threshold: 0.22, // ⬆️ INCREASED from 0.18
      }
    },
    'en': {
      intraSentenceTolerance: 0.35, // ⬆️ INCREASED from 0.30
      minConfidence: 0.70, // ⬇️ REDUCED from 0.75
      segmentMatching: {
        enabled: true,
        windowSize: 6,
        threshold: 0.15, // ⬆️ INCREASED from 0.10
      }
    }
  } as Record<string, any>,

  // --- EMERGENCY RECOVERY ---
  EMERGENCY_RECOVERY: {
    FAILURE_THRESHOLD: 8, // ⬆️ INCREASED from 5 (more patient before panic)
    FAILURE_WINDOW_MS: 3000,
    EMERGENCY_MODE_DURATION: 5000,
    RELAXED_CONFIDENCE: 0.30, // ⬆️ INCREASED from 0.20 (more tolerant)
    FORCE_ADVANCE_ON_SPEECH: true,
  },

  // --- DYNAMIC JUMP LIMITS ---
  DYNAMIC_JUMP_LIMITS: {
    DEFAULT: 250, // ⬆️ INCREASED from 200
    ON_REACTIVATION: 2500, // ⬆️ INCREASED from 2000
    ON_RECOVERY: 1000, // ⬆️ INCREASED from 800
    REACTIVATION_GRACE_PERIOD: 2500, // ⬆️ INCREASED from 2000
  },
};

// Adaptive config system (unchanged from original)
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
      preferredLerpFactor: 0.35, // ⬆️ INCREASED from 0.30
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

  updateFromSession(sessionData: {
    averageWPM: number;
    accuracy: number;
  }) {
    const { averageWPM, accuracy } = sessionData;

    const alpha = 0.3;
    this.profile.averageWPM =
      this.profile.averageWPM * (1 - alpha) + averageWPM * alpha;

    this.profile.accuracyHistory.push(accuracy);
    if (this.profile.accuracyHistory.length > 10) {
      this.profile.accuracyHistory.shift();
    }

    const avgAccuracy = this.profile.accuracyHistory.reduce((a, b) => a + b, 0) /
      this.profile.accuracyHistory.length;

    if (avgAccuracy > 0.85) {
      this.profile.preferredLerpFactor = Math.min(0.50, this.profile.preferredLerpFactor + 0.02);
    } else if (avgAccuracy < 0.70) {
      this.profile.preferredLerpFactor = Math.max(0.25, this.profile.preferredLerpFactor - 0.02);
    }

    this.profile.sessionCount++;
    this.profile.lastUpdated = Date.now();
    this.saveProfile();
  }

  getConfig(): typeof VOICE_CONFIG {
    const baseConfig = { ...VOICE_CONFIG };
    baseConfig.SCROLL_LERP_FACTOR = this.profile.preferredLerpFactor;
    baseConfig.SPEECH_VELOCITY.baselineWPM = this.profile.averageWPM;

    const isExperienced = this.profile.sessionCount > 5;
    const isAccurate = this.profile.accuracyHistory.slice(-3).every(a => a > 0.80);

    if (isExperienced && isAccurate) {
      baseConfig.MATCH_CONFIRMATION_FRAMES = 2;
      baseConfig.PROGRESS_SMOOTH_FACTOR = 0.50;
      baseConfig.FUZZY_SYNC.intraSentenceTolerance = 0.60;
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

const adaptiveConfig = new AdaptiveVoiceConfig();

export const getAdaptiveConfig = () => adaptiveConfig.getConfig();
export const updateVoiceProfile = (data: { averageWPM: number; accuracy: number }) =>
  adaptiveConfig.updateFromSession(data);
export const getVoiceProfile = () => adaptiveConfig.getProfile();
export const resetVoiceProfile = () => adaptiveConfig.resetProfile();

if (typeof window !== 'undefined') {
  (window as any).voiceProfile = {
    get: getVoiceProfile,
    reset: resetVoiceProfile,
    update: updateVoiceProfile,
  };
}
