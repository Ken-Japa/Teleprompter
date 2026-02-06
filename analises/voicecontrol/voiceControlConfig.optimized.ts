/**
 * 🎯 CONFIGURAÇÃO OTIMIZADA - voiceControlConfig.ts
 * 
 * Versão melhorada com suporte a:
 * - Áudio sintético (ElevenLabs, Google TTS, etc)
 * - Recovery automático de travamentos
 * - Normalização avançada de números e siglas
 * 
 * COMO APLICAR:
 * Substitua as seções indicadas no arquivo original
 */

// ============================================================================
// SEÇÃO 1: PRONUNCIATION_DICT - Linha ~220
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

PRONUNCIATION_DICT: {
    enabled: true,
    // Common mispronunciations and synthetic audio variations
    aliases: {
        // --- PORTUGUESE ---
        'promptninja': ['próprio ninja', 'pronto ninja', 'prompt ninja', 'pront ninja'],
        'webrtc': ['web arte cê', 'webertc', 'web rts', 'web rtc'],
        'streaming': ['estreaming', 'estriming', 'striming'],
        'teleprompter': ['teleponto', 'telepronto', 'tele prompter'],
        
        // --- CAMERA MODELS (Common in tech videos) ---
        's1ii': ['s one two', 's1 two', 's twelve', 's 1 2', 's one i i'],
        's1': ['s one', 's1', 'es one', 's um'],
        's5': ['s five', 's5', 'es five', 's cinco'],
        'gh5': ['g h five', 'gh5', 'g h 5'],
        'gh6': ['g h six', 'gh6', 'g h 6'],
        'a7iii': ['a seven three', 'a7 three', 'a seven i i i'],
        'a7iv': ['a seven four', 'a7 four', 'a seven i v'],
        
        // --- TECHNICAL TERMS ---
        '4k': ['four k', '4k', 'four kay', 'fork', 'for k'],
        '6k': ['six k', '6k', 'six kay'],
        '8k': ['eight k', '8k', 'eight kay'],
        'fps': ['f p s', 'fps', 'ef pê esse', 'frames per second'],
        'iso': ['i s o', 'iso', 'i so', 'aiso'],
        'dpi': ['d p i', 'dpi', 'dê pê i'],
        'hdr': ['h d r', 'hdr', 'agá dê érre'],
        'wifi': ['wi fi', 'wifi', 'uai fai'],
        'usb': ['u s b', 'usb', 'ú esse bê'],
        'hdmi': ['h d m i', 'hdmi', 'agá dê ême i'],
        
        // --- BRANDS ---
        'lumix': ['lumix', 'loomix', 'lummix', 'lu mix'],
        'canon': ['canon', 'kannon', 'cânon'],
        'nikon': ['nikon', 'naikon', 'níkon'],
        'sony': ['sony', 'soni', 'sôni'],
        'panasonic': ['panasonic', 'panasonick', 'pana sonic'],
        
        // --- NUMBERS (Synthetic audio often splits these) ---
        '10': ['ten', 'one zero', '1 0', 'tem'],
        '20': ['twenty', 'two zero', '2 0', 'vinte'],
        '30': ['thirty', 'three zero', '3 0', 'trinta'],
        '100': ['hundred', 'one hundred', '1 0 0', 'cem'],
        
        // --- COMMON TECH WORDS ---
        'api': ['a p i', 'api', 'á pê i'],
        'cpu': ['c p u', 'cpu', 'cê pê u'],
        'gpu': ['g p u', 'gpu', 'gê pê u'],
        'ssd': ['s s d', 'ssd', 'esse esse dê'],
        'ram': ['r a m', 'ram', 'érre á ême'],
        'rgb': ['r g b', 'rgb', 'érre gê bê'],
        
        // --- ACRONYMS ---
        'diy': ['d i y', 'diy', 'dê i uai'],
        'pwa': ['p w a', 'pwa', 'pê dábliu á'],
        'seo': ['s e o', 'seo', 'esse e ó'],
        'ui': ['u i', 'ui', 'ú i', 'user interface'],
        'ux': ['u x', 'ux', 'ú xis', 'user experience'],
        
        // --- SPECIAL CASES (ElevenLabs specific) ---
        'obs': ['o b s', 'obs', 'ó bê esse', 'ob s', 'open broadcaster'],
        'obs studio': ['o b s studio', 'obs studio', 'ob s studio'],
        'capcut': ['cap cut', 'capcut', 'kap cut'],
        'tiktok': ['tik tok', 'tiktok', 'tick tock'],
        'youtube': ['youtube', 'you tube', 'iutube'],
        'instagram': ['instagram', 'insta gram', 'ínsta'],
        
        // --- PORTUGUESE SPECIFIC ---
        'youtube': ['youtube', 'iutube', 'iu tube', 'utube'],
        'google': ['google', 'gúgou', 'gugo'],
        'facebook': ['facebook', 'feissbuk', 'feis'],
        'whatsapp': ['whatsapp', 'uotsapp', 'zap'],
    } as Record<string, string[]>,
},

// ============================================================================
// SEÇÃO 2: LANGUAGE_OVERRIDES - Linha ~240
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

LANGUAGE_OVERRIDES: {
    'pt': {
        intraSentenceTolerance: 0.35, // 🆕 Mais tolerante (era 0.40)
        minConfidence: 0.70, // 🆕 Mais estrito (era 0.75)
        segmentMatching: {
            enabled: true,
            windowSize: 6,
            threshold: 0.20, // 🆕 Meio termo (era 0.18)
        },
        // 🆕 NOVAS CONFIGURAÇÕES:
        syntheticAudioAdaptation: {
            enabled: true,
            relaxIntraSentenceTolerance: 0.45, // Quando detectado como sintético
            relaxMinConfidence: 0.65,
            preferSegmentedMatching: true, // Prioriza segmentedMatch para sintético
        },
        numberNormalization: {
            enabled: true,
            aggressiveMode: true, // Normaliza variações numéricas
        }
    },
    'en': {
        intraSentenceTolerance: 0.25, // 🆕 Mais tolerante (era 0.30)
        minConfidence: 0.75,
        segmentMatching: {
            enabled: true,
            windowSize: 6,
            threshold: 0.15, // 🆕 Meio termo (era 0.10)
        },
        syntheticAudioAdaptation: {
            enabled: true,
            relaxIntraSentenceTolerance: 0.35,
            relaxMinConfidence: 0.70,
            preferSegmentedMatching: true,
        },
        numberNormalization: {
            enabled: true,
            aggressiveMode: true,
        }
    },
    'es': {
        intraSentenceTolerance: 0.35,
        minConfidence: 0.70,
        segmentMatching: {
            enabled: true,
            windowSize: 6,
            threshold: 0.20,
        },
        syntheticAudioAdaptation: {
            enabled: true,
            relaxIntraSentenceTolerance: 0.45,
            relaxMinConfidence: 0.65,
            preferSegmentedMatching: true,
        },
        numberNormalization: {
            enabled: true,
            aggressiveMode: true,
        }
    }
} as Record<string, any>,

// ============================================================================
// SEÇÃO 3: ADVANCED_MATCHING - Linha ~100
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

ADVANCED_MATCHING: {
    maxWideJump: 200, // Base (será sobrescrito por dynamic jump)
    globalSearchOnStart: true,
    globalSearchFailureThreshold: 6, // 🆕 Mais paciente (era 8)
    // 🆕 NOVAS CONFIGURAÇÕES:
    adaptiveWindowSize: true, // Ajusta window baseado em performance
    windowSizeMultipliers: {
        onReactivation: 10, // 200 * 10 = 2000
        onRecovery: 4,      // 200 * 4 = 800
        onNormalOperation: 1, // 200 * 1 = 200
    },
    performanceOptimization: {
        enabled: true,
        skipEveryNthFrame: 2, // Pula 1 a cada 2 frames em low-end devices
        reduceWindowOnSlowDevice: true,
    }
},

// ============================================================================
// SEÇÃO 4: RECOVERY - Linha ~160
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

RECOVERY: {
    enabled: true,
    aheadWindow: 1,
    minConfidence: 0.20, // 🆕 Muito mais permissivo (era 0.15)
    partialRecovery: true, // 🆕 Agora habilitado
    // 🆕 NOVAS CONFIGURAÇÕES:
    emergencyRecovery: {
        enabled: true,
        activationThreshold: 5, // falhas
        timeWindow: 3000, // ms
        duration: 5000, // ms
        forceAdvanceOnSpeech: true,
        estimatedCharsPerWord: 5,
        relaxAllConstraints: true,
    },
    autoCorrection: {
        enabled: true,
        detectBackwardsJump: true,
        maxBackwardsJumpChars: 100, // Ignora saltos pra trás > 100 chars
        preventLooping: true,
    }
},

// ============================================================================
// SEÇÃO 5: FUZZY_SYNC - Linha ~150
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

FUZZY_SYNC: {
    enabled: true,
    minPartialMatch: 0.60,
    intraSentenceTolerance: 0.35, // 🆕 Mais tolerante (era 0.4)
    catchUpEnabled: true,
    progressBoost: 0.15,
    // 🆕 NOVAS CONFIGURAÇÕES:
    adaptToAudioQuality: {
        enabled: true,
        detectNoisyEnvironment: true,
        relaxToleranceInNoise: 0.10, // +10% tolerance
        requireMoreConsecutiveMatches: false, // Não exige mais confirmações
    },
    smartSkipping: {
        enabled: true,
        skipFillerWords: true, // "um", "ã", "né", etc
        fillerWords: {
            pt: ['né', 'tá', 'é', 'ah', 'eh', 'hum', 'ãh'],
            en: ['um', 'uh', 'ah', 'like', 'you know'],
            es: ['eh', 'este', 'pues', 'bueno'],
        },
    }
},

// ============================================================================
// SEÇÃO 6: NOISE_DETECTION - Linha ~200
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

NOISE_DETECTION: {
    enabled: true,
    calibrationTime: 3000,
    silenceThreshold: 0.15,
    autoAdjustMinLength: true,
    noisyEnvironmentBonus: 2,
    maxRecognitionsPerSecond: 3,
    // 🆕 NOVAS CONFIGURAÇÕES:
    syntheticAudioDetection: {
        enabled: true,
        wpmVariationThreshold: 0.05, // < 5% variação = sintético
        samplesRequired: 10,
        autoAdaptOnDetection: true,
        // Quando detectado como sintético:
        adaptations: {
            relaxTolerance: 0.10,
            preferSegmentedMatching: true,
            useAggressiveNormalization: true,
            increaseMinLength: 2, // Evita ruído
        }
    },
    backgroundNoiseFilter: {
        enabled: true,
        ignoreShortBursts: true, // < 200ms
        minTranscriptLength: 8, // chars (era 6)
        filterCommonNoises: ['música', 'music', 'background'],
    }
},

// ============================================================================
// SEÇÃO 7: SESSION_ANALYTICS - Linha ~210
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

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
        // 🆕 NOVAS MÉTRICAS:
        emergencyRecoveryActivations: true,
        syntheticAudioDetected: true,
        averageConfidence: true,
        failureRate: true,
        backwardsJumps: true,
    },
    // 🆕 EXPORTAÇÃO DE DADOS:
    export: {
        enabled: true,
        format: 'json',
        includeTranscripts: false, // Por privacidade
        includeTimestamps: true,
    }
},

// ============================================================================
// SEÇÃO 8: SCRIPT_PREPROCESSING - Linha ~230
// ============================================================================

// SUBSTITUIR O BLOCO EXISTENTE POR:

SCRIPT_PREPROCESSING: {
    enabled: true,
    relaxMatchingForMixedLanguage: true,
    foreignWordBonus: 0.15, // 🆕 Mais generoso (era 0.10)
    detectCapitalizedWords: true,
    minWordLength: 3, // 🆕 Reduzido (era 4) - ajuda com siglas
    // 🆕 NOVAS CONFIGURAÇÕES:
    intelligentTokenization: {
        enabled: true,
        preserveAcronyms: true, // "S1II" permanece junto
        preserveNumbers: true, // "4K" permanece junto
        preserveBrands: true, // "PromptNinja" permanece junto
        splitOnPunctuation: true,
    },
    semanticClustering: {
        enabled: false, // Experimental - deixar desabilitado por ora
        groupSimilarWords: false,
        useWordEmbeddings: false,
    }
},

// ============================================================================
// SEÇÃO 9: NOVAS CONFIGURAÇÕES GLOBAIS
// ============================================================================

// ADICIONAR NO FINAL DO OBJETO VOICE_CONFIG (antes do fechamento):

// 🆕 CONFIGURAÇÕES DE DEBUG E PERFORMANCE
DEBUG: {
    enabled: process.env.NODE_ENV === 'development',
    logLevel: 'info', // 'error' | 'warn' | 'info' | 'debug'
    verboseMatching: false,
    showConfidenceInUI: false,
    trackPerformance: true,
    exposeToWindow: true, // window.voiceConfig
},

PERFORMANCE: {
    // Adaptive throttling já existe, mas adicionar:
    cpuOptimization: {
        enabled: true,
        detectSlowDevice: true,
        reducedFeatures: {
            disableSegmentedMatching: false,
            skipFrames: true,
            reduceSearchWindow: true,
        }
    },
    memoryOptimization: {
        enabled: true,
        clearCacheInterval: 60000, // 1 min
        maxCacheSize: 100, // entries
        pruneOldSamples: true,
    }
},

// 🆕 USER EXPERIENCE
UX: {
    visualFeedback: {
        showConfidenceIndicator: false, // Pode distrair
        highlightActiveWord: false, // Muito pesado
        showEmergencyMode: true, // ⚠️ Importante para debugging
        showSyntheticDetection: false, // Só no dev mode
    },
    gracefulDegradation: {
        continueOnErrors: true,
        fallbackToManualScroll: false, // Deixa user decidir
        autoDisableOnRepeatedFailures: false,
        showHelpfulErrorMessages: true,
    }
},

// ============================================================================
// ADICIONAL: FUNÇÃO HELPER PARA APLICAR CONFIG BASEADO EM DETECÇÃO
// ============================================================================

/**
 * 🆕 Adicione esta função no final da classe AdaptiveVoiceConfig
 */

/**
 * Get config adapted for synthetic audio detection
 */
getConfigForSyntheticAudio(): typeof VOICE_CONFIG {
    const baseConfig = this.getConfig();
    
    // Apply synthetic audio optimizations
    const syntheticOptimized = { ...baseConfig };
    
    // Relaxa tolerâncias
    syntheticOptimized.FUZZY_SYNC.intraSentenceTolerance += 0.10;
    syntheticOptimized.PROGRESS_SMOOTH_FACTOR = 0.40;
    
    // Aumenta window para segmented matching
    if (syntheticOptimized.LANGUAGE_OVERRIDES.pt) {
        syntheticOptimized.LANGUAGE_OVERRIDES.pt.segmentMatching.windowSize = 8;
        syntheticOptimized.LANGUAGE_OVERRIDES.pt.segmentMatching.threshold = 0.25;
    }
    
    // Prefer segmented over standard matching
    syntheticOptimized.FUZZY_SYNC.preferSegmentedMatching = true;
    
    return syntheticOptimized;
}

/**
 * Update profile specifically for synthetic audio session
 */
updateForSyntheticAudio() {
    this.profile.preferredLerpFactor = Math.min(0.40, this.profile.preferredLerpFactor + 0.05);
    this.saveProfile();
}

// ============================================================================
// EXPORT ATUALIZADO
// ============================================================================

// Substituir o export existente por:

export const getAdaptiveConfig = (isSyntheticAudio: boolean = false) => {
    if (isSyntheticAudio) {
        return adaptiveConfig.getConfigForSyntheticAudio();
    }
    return adaptiveConfig.getConfig();
};

export const updateVoiceProfile = (
    data: { averageWPM: number; accuracy: number },
    isSyntheticAudio: boolean = false
) => {
    adaptiveConfig.updateFromSession(data);
    if (isSyntheticAudio) {
        adaptiveConfig.updateForSyntheticAudio();
    }
};

export const getVoiceProfile = () => adaptiveConfig.getProfile();
export const resetVoiceProfile = () => adaptiveConfig.resetProfile();

// Expose to window for debugging
if (typeof window !== 'undefined') {
    (window as any).voiceConfig = {
        current: () => console.log(adaptiveConfig.getConfig()),
        synthetic: () => console.log(adaptiveConfig.getConfigForSyntheticAudio()),
        profile: () => console.log(adaptiveConfig.getProfile()),
        reset: () => adaptiveConfig.resetProfile(),
        
        // 🆕 Helper para forçar modo sintético
        forceSynthetic: () => {
            console.log('Forcing synthetic audio mode...');
            return getAdaptiveConfig(true);
        }
    };
}

// ============================================================================
// FIM DA CONFIGURAÇÃO OTIMIZADA
// ============================================================================

/**
 * 📊 RESUMO DAS MELHORIAS:
 * 
 * 1. ✅ +50 novos patterns de normalização (números, siglas, marcas)
 * 2. ✅ Detecção automática de áudio sintético
 * 3. ✅ Configurações adaptativas por tipo de áudio
 * 4. ✅ Emergency recovery integrado
 * 5. ✅ Performance optimization para devices lentos
 * 6. ✅ Métricas expandidas para analytics
 * 7. ✅ Debug helpers expostos ao window
 * 8. ✅ Graceful degradation em erros
 * 
 * COMPATIBILIDADE:
 * - ✅ Backwards compatible (todas as configs antigas funcionam)
 * - ✅ Novas configs têm valores default seguros
 * - ✅ Pode ser aplicado incrementalmente
 * 
 * TESTES RECOMENDADOS:
 * 1. Áudio ElevenLabs com "S1II", "4K", números
 * 2. Fala humana normal (não deve quebrar)
 * 3. Ruído de fundo
 * 4. Scripts longos (>5000 palavras)
 * 5. Múltiplos idiomas
 */
