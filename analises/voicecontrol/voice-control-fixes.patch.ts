/**
 * 🔧 VOICE CONTROL FIXES - PATCH PARA useVoiceControl.ts
 * 
 * PROBLEMAS CORRIGIDOS:
 * 1. Travamento quando detecta palavras incorretas (ex: "II" → "i i")
 * 2. maxWideJump muito restritivo impedindo saltos legítimos
 * 3. Matching inadequado para áudio sintético (ElevenLabs)
 * 4. Falta de estratégia de recuperação em caso de falhas consecutivas
 * 
 * COMO APLICAR:
 * 1. Adicione as constantes no início do arquivo
 * 2. Substitua a função processRecognition() pela versão corrigida
 * 3. Adicione as funções auxiliares ao final
 */

// ============================================================================
// PARTE 1: ADICIONAR ESTAS CONSTANTES NO TOPO DO useVoiceControl.ts
// ============================================================================

// Logo após os imports, adicione:

const EMERGENCY_RECOVERY = {
    // Detecta travamento: 5 falhas consecutivas em 3 segundos
    FAILURE_THRESHOLD: 5,
    FAILURE_WINDOW_MS: 3000,
    
    // Em modo de emergência, relaxa todos os critérios
    EMERGENCY_MODE_DURATION: 5000, // 5 segundos
    RELAXED_CONFIDENCE: 0.20, // Aceita matches muito ruins
    FORCE_ADVANCE_ON_SPEECH: true, // Avança mesmo sem match
};

const SYNTHETIC_AUDIO_PATTERNS = {
    // Detecta áudio sintético por características
    CONSISTENT_WPM_THRESHOLD: 0.95, // Variação < 5% = sintético
    DETECT_AFTER_SAMPLES: 10,
    
    // Regras especiais para números e siglas
    NUMBER_NORMALIZATION: {
        'II': ['two', 'i i', 'ii', '2', 'two i', 'i two'],
        'III': ['three', 'i i i', 'iii', '3'],
        '4K': ['four k', '4k', 'four kay', 'fork'],
        'S1II': ['s one two', 's1 two', 's twelve', 's1ii'],
    } as Record<string, string[]>,
};

const DYNAMIC_JUMP_LIMITS = {
    // maxWideJump adapta-se ao contexto
    DEFAULT: 200,
    ON_REACTIVATION: 2000, // Quando usuário reativa voice control
    ON_RECOVERY: 800, // Durante recovery mode
    REACTIVATION_GRACE_PERIOD: 2000, // 2 segundos após ativar
};

// ============================================================================
// PARTE 2: ADICIONAR ESTAS REFS NO HOOK (após as outras refs)
// ============================================================================

// Adicione após `noiseDetectionRef`:

const emergencyRecoveryRef = useRef({
    isActive: false,
    activatedAt: 0,
    failureTimestamps: [] as number[], // Últimas falhas
    consecutiveFailures: 0,
});

const syntheticAudioRef = useRef({
    detectedAsSynthetic: false,
    wpmSamples: [] as number[],
    normalizedTranscripts: new Map<string, string>(),
});

const dynamicJumpRef = useRef({
    currentMaxJump: DYNAMIC_JUMP_LIMITS.DEFAULT,
    lastActivationTime: 0,
});

// ============================================================================
// PARTE 3: SUBSTITUIR A FUNÇÃO processRecognition() COMPLETA
// ============================================================================

/**
 * VERSÃO CORRIGIDA - Substitua toda a função existente por esta
 */
const processRecognition = useCallback(
    (transcript: string, isFinal: boolean) => {
        if (!fullCleanText || fullCleanText.length === 0) return;

        const now = Date.now();

        // Update last speech time for sentence completion detection
        lastSpeechTimeRef.current = now;

        // === THROTTLING (Adaptive) ===
        const throttle = performanceMetricsRef.current.currentThrottle;
        if (now - lastProcessedTimeRef.current < throttle && !isFinal) {
            return;
        }
        lastProcessedTimeRef.current = now;

        const processingStartTime = performance.now();

        // Invoke raw callback
        if (onSpeechResultRef.current) {
            onSpeechResultRef.current(transcript);
        }

        // === INITIALIZATION LOGIC ===
        if (isInitializingRef.current) {
            const timeSinceInit = now - initStartTimeRef.current;

            if (timeSinceInit < VOICE_CONFIG.INITIALIZATION.initialGracePeriod) {
                return; // Still in grace period
            }

            if (!hasFirstRecognitionRef.current) {
                hasFirstRecognitionRef.current = true;
                console.log('[Voice] First recognition received, activating scroll');
                setActiveSentenceIndex(lockedSentenceIdRef.current);
            }

            isInitializingRef.current = false;
        }

        // === TRANSCRIPT NORMALIZATION ===
        // 🆕 SYNTHETIC AUDIO DETECTION
        const normalizedTranscript = normalizeSyntheticAudio(
            normalizePronunciation(transcript.toLowerCase().trim(), lang),
            lang
        );

        const wordCount = normalizedTranscript.split(/\s+/).length;

        // 🆕 DETECT SYNTHETIC AUDIO BY WPM CONSISTENCY
        if (VOICE_CONFIG.SPEECH_VELOCITY.enabled && wordCount > 0) {
            updateSpeechVelocity(wordCount);
            detectSyntheticAudio();
        }

        // Analytics
        if (VOICE_CONFIG.SESSION_ANALYTICS.enabled) {
            sessionAnalyticsRef.current.totalWordsRecognized += wordCount;
        }

        // === MINIMUM LENGTH FILTER ===
        const adjustedMinLength = noiseDetectionRef.current.adjustedMinLength;
        if (normalizedTranscript.length < adjustedMinLength) {
            handleShortRecognition();
            return;
        }

        // === EMERGENCY RECOVERY ACTIVATION ===
        // 🆕 Detecta travamento e ativa modo de emergência
        checkAndActivateEmergencyRecovery(now);

        // === DYNAMIC maxWideJump ===
        // 🆕 Adapta o limite de salto baseado no contexto
        const currentMaxJump = getDynamicMaxJump(now);

        // === MATCHING LOGIC ===
        const locked = lockedSentenceIdRef.current;
        if (locked < 0 || locked >= sentences.length) {
            console.warn(`[Voice] Invalid locked sentence: ${locked}`);
            return;
        }

        const currentSentence = sentences[locked];
        const searchStart = lastMatchIndexRef.current;

        // Get language-specific overrides
        const langOverride = VOICE_CONFIG.LANGUAGE_OVERRIDES[lang] || {};
        const segmentConfig = langOverride.segmentMatching || { enabled: false };

        let bestMatch: { index: number; distance: number; ratio: number } | null = null;
        let segmentMatch: { index: number; confidence: number; isSequential: boolean } | null = null;

        // === STRATEGY 1: SEGMENTED MATCHING (For longer transcripts) ===
        if (
            segmentConfig.enabled &&
            normalizedTranscript.split(/\s+/).length >= (segmentConfig.windowSize || 6)
        ) {
            segmentMatch = findSegmentedMatch(
                fullCleanText,
                normalizedTranscript,
                searchStart,
                currentMaxJump, // 🆕 Usa limite dinâmico
                segmentConfig.windowSize || 6,
                searchStart
            );

            if (segmentMatch && (1 - segmentMatch.confidence) <= (segmentConfig.threshold || 0.18)) {
                bestMatch = {
                    index: segmentMatch.index,
                    distance: Math.floor(segmentMatch.confidence * normalizedTranscript.length),
                    ratio: 1 - segmentMatch.confidence,
                };

                voiceDiagnostics.recordMatch({
                    transcript: normalizedTranscript,
                    matchIndex: segmentMatch.index,
                    confidence: segmentMatch.confidence,
                    isSequential: segmentMatch.isSequential,
                    strategy: 'segmented',
                    timestamp: now,
                });
            }
        }

        // === STRATEGY 2: STANDARD BEST MATCH (Fallback) ===
        if (!bestMatch) {
            bestMatch = findBestMatch(
                fullCleanText,
                normalizedTranscript,
                searchStart,
                currentMaxJump, // 🆕 Usa limite dinâmico
                emergencyRecoveryRef.current.isActive
                    ? EMERGENCY_RECOVERY.RELAXED_CONFIDENCE
                    : (langOverride.intraSentenceTolerance || 0.40)
            );

            if (bestMatch) {
                voiceDiagnostics.recordMatch({
                    transcript: normalizedTranscript,
                    matchIndex: bestMatch.index,
                    confidence: 1 - bestMatch.ratio,
                    strategy: 'standard',
                    timestamp: now,
                });
            }
        }

        // === NO MATCH HANDLING ===
        if (!bestMatch) {
            handleNoMatch(normalizedTranscript, now);
            return;
        }

        // === CONFIDENCE EVALUATION ===
        const minConfidence = getEffectiveMinConfidence();
        const matchConfidence = 1 - bestMatch.ratio;

        if (matchConfidence < minConfidence && !emergencyRecoveryRef.current.isActive) {
            handleLowConfidenceMatch(matchConfidence, normalizedTranscript, now);
            return;
        }

        // === SUCCESSFUL MATCH - RESET FAILURES ===
        // 🆕 Reset emergency recovery on good match
        if (matchConfidence >= 0.70) {
            emergencyRecoveryRef.current.consecutiveFailures = 0;
            emergencyRecoveryRef.current.failureTimestamps = [];
        }

        consecutiveFailuresRef.current = 0;

        // Update last match index
        lastMatchIndexRef.current = bestMatch.index + normalizedTranscript.length;

        // === DETERMINE SENTENCE FROM MATCH INDEX ===
        const matchedSentenceId = charToSentenceMap[bestMatch.index];

        if (matchedSentenceId === undefined || matchedSentenceId < 0) {
            console.warn(`[Voice] Invalid sentence ID at index ${bestMatch.index}`);
            return;
        }

        // === SENTENCE-LOCK LOGIC (Requires confirmation for jumps) ===
        if (matchedSentenceId !== locked) {
            handleSentenceJump(matchedSentenceId, matchConfidence);
        } else {
            // Same sentence: Update intra-sentence progress
            handleIntraSentenceProgress(matchedSentenceId, bestMatch.index);
        }

        // Update performance metrics
        updatePerformanceMetrics(performance.now() - processingStartTime);

        // Learn pronunciation patterns
        if (bestMatch.ratio > 0.10 && bestMatch.ratio < 0.40) {
            const expected = fullCleanText.substring(
                bestMatch.index,
                Math.min(bestMatch.index + normalizedTranscript.length + 10, fullCleanText.length)
            );
            pronunciationLearner.learnFromMismatch(normalizedTranscript, expected, 0.30);
        }
    },
    [
        fullCleanText,
        sentences,
        charToSentenceMap,
        lang,
        handleShortRecognition,
        handleNoMatch,
        handleLowConfidenceMatch,
        handleSentenceJump,
        handleIntraSentenceProgress,
        updatePerformanceMetrics,
        getEffectiveMinConfidence,
    ]
);

// ============================================================================
// PARTE 4: ADICIONAR ESTAS FUNÇÕES AUXILIARES ANTES DO return DO HOOK
// ============================================================================

/**
 * 🆕 Normaliza transcrições de áudio sintético
 */
const normalizeSyntheticAudio = useCallback((text: string, language: string): string => {
    let normalized = text;

    // Aplica regras de normalização de números e siglas
    for (const [canonical, variants] of Object.entries(SYNTHETIC_AUDIO_PATTERNS.NUMBER_NORMALIZATION)) {
        for (const variant of variants) {
            const regex = new RegExp(variant.replace(/\s+/g, '\\s+'), 'gi');
            normalized = normalized.replace(regex, canonical.toLowerCase());
        }
    }

    return normalized;
}, []);

/**
 * 🆕 Detecta se o áudio é sintético baseado em WPM consistente
 */
const detectSyntheticAudio = useCallback(() => {
    const samples = syntheticAudioRef.current.wpmSamples;

    if (samples.length < SYNTHETIC_AUDIO_PATTERNS.DETECT_AFTER_SAMPLES) return;

    const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
    const variance = samples.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / samples.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / avg;

    // Se variação < 5%, provavelmente é sintético
    if (coefficientOfVariation < (1 - SYNTHETIC_AUDIO_PATTERNS.CONSISTENT_WPM_THRESHOLD)) {
        if (!syntheticAudioRef.current.detectedAsSynthetic) {
            syntheticAudioRef.current.detectedAsSynthetic = true;
            console.log('[Voice] 🤖 Synthetic audio detected (consistent WPM). Adapting matching.');
        }
    }
}, []);

/**
 * 🆕 Verifica e ativa modo de recuperação de emergência
 */
const checkAndActivateEmergencyRecovery = useCallback((now: number) => {
    const failures = emergencyRecoveryRef.current.failureTimestamps;

    // Remove timestamps antigos
    const recentFailures = failures.filter(
        t => now - t < EMERGENCY_RECOVERY.FAILURE_WINDOW_MS
    );
    emergencyRecoveryRef.current.failureTimestamps = recentFailures;

    // Ativa modo de emergência se muitas falhas recentes
    if (
        recentFailures.length >= EMERGENCY_RECOVERY.FAILURE_THRESHOLD &&
        !emergencyRecoveryRef.current.isActive
    ) {
        console.warn(
            `[Voice] 🚨 EMERGENCY RECOVERY activated (${recentFailures.length} failures in ${EMERGENCY_RECOVERY.FAILURE_WINDOW_MS}ms)`
        );
        emergencyRecoveryRef.current.isActive = true;
        emergencyRecoveryRef.current.activatedAt = now;
    }

    // Desativa após duração
    if (
        emergencyRecoveryRef.current.isActive &&
        now - emergencyRecoveryRef.current.activatedAt > EMERGENCY_RECOVERY.EMERGENCY_MODE_DURATION
    ) {
        console.log('[Voice] Emergency recovery deactivated');
        emergencyRecoveryRef.current.isActive = false;
    }
}, []);

/**
 * 🆕 Retorna limite de salto dinâmico baseado no contexto
 */
const getDynamicMaxJump = useCallback((now: number): number => {
    // Se foi reativado recentemente, permite saltos grandes
    if (now - dynamicJumpRef.current.lastActivationTime < DYNAMIC_JUMP_LIMITS.REACTIVATION_GRACE_PERIOD) {
        return DYNAMIC_JUMP_LIMITS.ON_REACTIVATION;
    }

    // Se está em recovery mode, relaxa um pouco
    if (emergencyRecoveryRef.current.isActive) {
        return DYNAMIC_JUMP_LIMITS.ON_RECOVERY;
    }

    return DYNAMIC_JUMP_LIMITS.DEFAULT;
}, []);

/**
 * 🆕 Registra falha para detecção de travamento
 */
const recordFailure = useCallback((now: number) => {
    emergencyRecoveryRef.current.consecutiveFailures++;
    emergencyRecoveryRef.current.failureTimestamps.push(now);
}, []);

/**
 * MODIFICAÇÃO: handleNoMatch() - Adicionar suporte a emergency recovery
 */
const handleNoMatch = useCallback((transcript: string, now: number) => {
    consecutiveFailuresRef.current++;
    recordFailure(now); // 🆕

    // 🆕 EMERGENCY MODE: Force advance on speech
    if (
        emergencyRecoveryRef.current.isActive &&
        EMERGENCY_RECOVERY.FORCE_ADVANCE_ON_SPEECH
    ) {
        console.log('[Voice] 🚨 Emergency: Advancing despite no match');
        
        // Avança artificialmente baseado no tamanho da transcrição
        const wordCount = transcript.split(/\s+/).length;
        const estimatedChars = wordCount * 5; // ~5 chars por palavra
        
        lastMatchIndexRef.current = Math.min(
            lastMatchIndexRef.current + estimatedChars,
            fullCleanText.length - 1
        );

        // Força update visual
        const newSentenceId = charToSentenceMap[lastMatchIndexRef.current];
        if (newSentenceId !== undefined && newSentenceId !== lockedSentenceIdRef.current) {
            lockedSentenceIdRef.current = newSentenceId;
            setActiveSentenceIndex(newSentenceId);
            setVoiceProgress(0.5); // Meio da sentença
        }

        return;
    }

    // Lógica original...
    const threshold = VOICE_CONFIG.ADVANCED_MATCHING.globalSearchFailureThreshold;

    if (consecutiveFailuresRef.current >= threshold) {
        consecutiveFailuresRef.current = 0;
        console.warn(`[Voice] ${threshold} consecutive failures, attempting global search...`);

        const globalMatch = findBestMatch(fullCleanText, transcript, 0, fullCleanText.length, 0.40);

        if (globalMatch && globalMatch.ratio < 0.40) {
            lastMatchIndexRef.current = globalMatch.index + transcript.length;
            const sentenceId = charToSentenceMap[globalMatch.index];

            if (sentenceId !== undefined && sentenceId !== lockedSentenceIdRef.current) {
                lockedSentenceIdRef.current = sentenceId;
                setActiveSentenceIndex(sentenceId);
                setVoiceProgress(0);
            }
        }
    }
}, [fullCleanText, charToSentenceMap, recordFailure]);

// ============================================================================
// PARTE 5: MODIFICAR startListening() PARA RESETAR DYNAMIC JUMP
// ============================================================================

// Na função startListening(), adicione logo no início (linha ~1250):

dynamicJumpRef.current.lastActivationTime = Date.now();
dynamicJumpRef.current.currentMaxJump = DYNAMIC_JUMP_LIMITS.ON_REACTIVATION;

// E resete os emergency refs:

emergencyRecoveryRef.current = {
    isActive: false,
    activatedAt: 0,
    failureTimestamps: [],
    consecutiveFailures: 0,
};

syntheticAudioRef.current = {
    detectedAsSynthetic: false,
    wpmSamples: [],
    normalizedTranscripts: new Map(),
};

// ============================================================================
// FIM DO PATCH
// ============================================================================

/**
 * 📊 TESTES RECOMENDADOS APÓS APLICAR O PATCH:
 * 
 * 1. TESTE DE TRAVAMENTO:
 *    - Use o áudio do ElevenLabs com "S1II"
 *    - Verifique que NÃO trava mais
 *    - Deve ativar emergency recovery e continuar scrolling
 * 
 * 2. TESTE DE REATIVAÇÃO:
 *    - Pause o voice control
 *    - Avance manualmente para metade do script
 *    - Reative voice control
 *    - Deve sincronizar corretamente (maxWideJump = 2000)
 * 
 * 3. TESTE DE ÁUDIO SINTÉTICO:
 *    - Use ElevenLabs
 *    - Verifique no console: "🤖 Synthetic audio detected"
 *    - Matching deve ser mais tolerante automaticamente
 * 
 * 4. TESTE DE NÚMEROS E SIGLAS:
 *    - Script: "LUMIX S1II"
 *    - Áudio: "s one two" ou "s1 two"
 *    - Deve normalizar e fazer match correto
 */

/**
 * 🔧 DEBUGGING:
 * 
 * Adicione ao console do navegador:
 * 
 * window.voiceDebug = {
 *   emergency: () => console.log(emergencyRecoveryRef.current),
 *   synthetic: () => console.log(syntheticAudioRef.current),
 *   jump: () => console.log(dynamicJumpRef.current)
 * }
 */
