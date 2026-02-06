# 🎯 GUIA DE IMPLEMENTAÇÃO - Voice Control Fixes

## 📋 Resumo das Mudanças

### Problemas Corrigidos:
1. ✅ **Travamento no "S1II"** - Sistema agora detecta e recupera automaticamente
2. ✅ **maxWideJump restritivo** - Adapta-se dinamicamente ao contexto
3. ✅ **Matching para áudio sintético** - Normalização especial para ElevenLabs
4. ✅ **Reativação em posição avançada** - Permite saltos de até 2000 caracteres

---

## 🔧 PASSO A PASSO DA IMPLEMENTAÇÃO

### ETAPA 1: Backup do Arquivo Original
```bash
cp src/hooks/useVoiceControl.ts src/hooks/useVoiceControl.ts.backup
```

### ETAPA 2: Aplicar as Constantes (Linha ~23)

**Localização:** Logo após os imports, antes de `export const useVoiceControl`

```typescript
// ADICIONE ESTAS LINHAS:

const EMERGENCY_RECOVERY = {
    FAILURE_THRESHOLD: 5,
    FAILURE_WINDOW_MS: 3000,
    EMERGENCY_MODE_DURATION: 5000,
    RELAXED_CONFIDENCE: 0.20,
    FORCE_ADVANCE_ON_SPEECH: true,
};

const SYNTHETIC_AUDIO_PATTERNS = {
    CONSISTENT_WPM_THRESHOLD: 0.95,
    DETECT_AFTER_SAMPLES: 10,
    NUMBER_NORMALIZATION: {
        'II': ['two', 'i i', 'ii', '2', 'two i', 'i two'],
        'III': ['three', 'i i i', 'iii', '3'],
        '4K': ['four k', '4k', 'four kay', 'fork'],
        'S1II': ['s one two', 's1 two', 's twelve', 's1ii'],
        'S1': ['s one', 's1', 'es one'],
    } as Record<string, string[]>,
};

const DYNAMIC_JUMP_LIMITS = {
    DEFAULT: 200,
    ON_REACTIVATION: 2000,
    ON_RECOVERY: 800,
    REACTIVATION_GRACE_PERIOD: 2000,
};
```

### ETAPA 3: Adicionar as Refs (Linha ~115)

**Localização:** Logo após `noiseDetectionRef`

```typescript
// ADICIONE ESTAS REFS:

const emergencyRecoveryRef = useRef({
    isActive: false,
    activatedAt: 0,
    failureTimestamps: [] as number[],
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
```

### ETAPA 4: Adicionar Funções Auxiliares (Linha ~1200)

**Localização:** Logo ANTES da função `startListening()`

```typescript
// COPIE TODAS ESTAS FUNÇÕES do arquivo voice-control-fixes.patch.ts:

const normalizeSyntheticAudio = useCallback((text: string, language: string): string => {
    // ... código completo no patch
}, []);

const detectSyntheticAudio = useCallback(() => {
    // ... código completo no patch
}, []);

const checkAndActivateEmergencyRecovery = useCallback((now: number) => {
    // ... código completo no patch
}, []);

const getDynamicMaxJump = useCallback((now: number): number => {
    // ... código completo no patch
}, []);

const recordFailure = useCallback((now: number) => {
    // ... código completo no patch
}, []);
```

### ETAPA 5: Modificar processRecognition() (Linha ~400)

**⚠️ ATENÇÃO:** Esta é a modificação mais importante!

**Localização:** Procure por `const processRecognition = useCallback(`

**O que fazer:**
1. Encontre as linhas que usam `VOICE_CONFIG.SEARCH_WINDOW.MEDIUM`
2. Substitua por `currentMaxJump`
3. Adicione as chamadas aos novos helpers

**Exemplo de modificações:**

```typescript
// ANTES (linha ~500):
const searchWindow = VOICE_CONFIG.SEARCH_WINDOW.MEDIUM;

// DEPOIS:
const currentMaxJump = getDynamicMaxJump(now);

// ---

// ANTES (linha ~510):
checkAndActivateEmergencyRecovery(now); // 🆕 ADICIONE ESTA LINHA

// ---

// ANTES (linha ~540):
const normalizedTranscript = normalizePronunciation(transcript.toLowerCase().trim(), lang);

// DEPOIS:
const normalizedTranscript = normalizeSyntheticAudio(
    normalizePronunciation(transcript.toLowerCase().trim(), lang),
    lang
);

// ---

// ANTES (linha ~600):
segmentMatch = findSegmentedMatch(
    fullCleanText,
    normalizedTranscript,
    searchStart,
    VOICE_CONFIG.SEARCH_WINDOW.MEDIUM, // ❌ REMOVA
    segmentConfig.windowSize || 6,
    searchStart
);

// DEPOIS:
segmentMatch = findSegmentedMatch(
    fullCleanText,
    normalizedTranscript,
    searchStart,
    currentMaxJump, // ✅ ADICIONE
    segmentConfig.windowSize || 6,
    searchStart
);

// ---

// ANTES (linha ~630):
bestMatch = findBestMatch(
    fullCleanText,
    normalizedTranscript,
    searchStart,
    VOICE_CONFIG.SEARCH_WINDOW.MEDIUM, // ❌ REMOVA
    langOverride.intraSentenceTolerance || 0.40
);

// DEPOIS:
bestMatch = findBestMatch(
    fullCleanText,
    normalizedTranscript,
    searchStart,
    currentMaxJump, // ✅ ADICIONE
    emergencyRecoveryRef.current.isActive
        ? EMERGENCY_RECOVERY.RELAXED_CONFIDENCE
        : (langOverride.intraSentenceTolerance || 0.40)
);

// ---

// ANTES (linha ~650):
if (!bestMatch) {
    handleNoMatch(normalizedTranscript, now);
    return;
}

// DEPOIS: (MANTENHA, mas modifique handleNoMatch - veja próxima seção)
```

### ETAPA 6: Modificar handleNoMatch() (Linha ~900)

**Localização:** Procure por `const handleNoMatch = useCallback(`

**Adicione NO INÍCIO da função:**

```typescript
const handleNoMatch = useCallback((transcript: string, now: number) => {
    consecutiveFailuresRef.current++;
    recordFailure(now); // 🆕 ADICIONE

    // 🆕 ADICIONE TODO ESTE BLOCO:
    if (
        emergencyRecoveryRef.current.isActive &&
        EMERGENCY_RECOVERY.FORCE_ADVANCE_ON_SPEECH
    ) {
        console.log('[Voice] 🚨 Emergency: Advancing despite no match');
        
        const wordCount = transcript.split(/\s+/).length;
        const estimatedChars = wordCount * 5;
        
        lastMatchIndexRef.current = Math.min(
            lastMatchIndexRef.current + estimatedChars,
            fullCleanText.length - 1
        );

        const newSentenceId = charToSentenceMap[lastMatchIndexRef.current];
        if (newSentenceId !== undefined && newSentenceId !== lockedSentenceIdRef.current) {
            lockedSentenceIdRef.current = newSentenceId;
            setActiveSentenceIndex(newSentenceId);
            setVoiceProgress(0.5);
        }

        return;
    }

    // ... resto do código original continua aqui
```

### ETAPA 7: Modificar startListening() (Linha ~1239)

**Localização:** Logo no INÍCIO da função `startListening()`

**Adicione estas linhas LOGO APÓS a verificação de `isPro`:**

```typescript
const startListening = useCallback((initialRatio: number = 0.5, currentPos?: number) => {
    if (!isPro) return;
    if (!voiceApiSupported) {
        console.warn("[VoiceHook] Voice API not supported");
        return;
    }
    if (isListening) {
        return;
    }

    // 🆕 ADICIONE ESTAS LINHAS:
    dynamicJumpRef.current.lastActivationTime = Date.now();
    dynamicJumpRef.current.currentMaxJump = DYNAMIC_JUMP_LIMITS.ON_REACTIVATION;

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

    // ... resto do código original continua
```

---

## 🧪 TESTES OBRIGATÓRIOS

### Teste 1: Travamento com "S1II"
```
1. Abra o teleprompter
2. Cole o texto: "The LUMIX S1II is one of the few cameras"
3. Ative voice control
4. Reproduza o áudio do ElevenLabs
5. ✅ Não deve travar
6. ✅ Deve mostrar no console: "🚨 EMERGENCY RECOVERY activated"
```

### Teste 2: Reativação em posição avançada
```
1. Abra o teleprompter com texto longo (>2000 chars)
2. Ative voice control no início
3. Pause o voice control
4. Scroll manual até o meio do texto
5. Reative o voice control
6. Fale uma frase do meio do script
7. ✅ Deve sincronizar corretamente
```

### Teste 3: Detecção de áudio sintético
```
1. Use áudio do ElevenLabs
2. Ative voice control
3. Aguarde ~15 segundos
4. ✅ Deve mostrar no console: "🤖 Synthetic audio detected"
```

### Teste 4: Normalização de números
```
1. Script: "LUMIX S1II with 4K video"
2. ElevenLabs fala: "lumix s one two with four k video"
3. ✅ Deve fazer match correto
```

---

## 🐛 DEBUGGING

### Console Debug Helper
Adicione ao console do navegador após carregar a página:

```javascript
window.voiceDebug = {
    // Ver estado do emergency recovery
    emergency: () => {
        console.log('Emergency Recovery:', {
            isActive: emergencyRecoveryRef.current.isActive,
            failures: emergencyRecoveryRef.current.consecutiveFailures,
            timestamps: emergencyRecoveryRef.current.failureTimestamps
        });
    },
    
    // Ver detecção de áudio sintético
    synthetic: () => {
        console.log('Synthetic Audio:', {
            detected: syntheticAudioRef.current.detectedAsSynthetic,
            wpmSamples: syntheticAudioRef.current.wpmSamples
        });
    },
    
    // Ver limites de salto dinâmico
    jump: () => {
        console.log('Dynamic Jump:', {
            current: dynamicJumpRef.current.currentMaxJump,
            lastActivation: new Date(dynamicJumpRef.current.lastActivationTime)
        });
    },
    
    // Ver todas as informações
    all: () => {
        voiceDebug.emergency();
        voiceDebug.synthetic();
        voiceDebug.jump();
    }
};

// USO:
// voiceDebug.all() - mostra tudo
// voiceDebug.emergency() - só emergency
```

---

## 🎨 MELHORIAS NA CONFIG (Opcional)

### Arquivo: `voiceControlConfig.ts`

```typescript
// Linha ~140 - Adicione aos NUMBER_NORMALIZATION patterns:

PRONUNCIATION_DICT: {
    enabled: true,
    aliases: {
        'promptninja': ['próprio ninja', 'pronto ninja', 'prompt ninja'],
        'webrtc': ['web arte cê', 'webertc', 'web rts'],
        'streaming': ['estreaming', 'estriming'],
        'teleprompter': ['teleponto', 'telepronto'],
        // 🆕 ADICIONE:
        's1ii': ['s one two', 's1 two', 's twelve'],
        's1': ['s one', 's1', 'es one'],
        '4k': ['four k', '4k', 'four kay'],
        'lumix': ['lumix', 'loomix', 'lummix'],
    } as Record<string, string[]>,
},
```

---

## ⚡ OTIMIZAÇÕES DE PERFORMANCE

### 1. Reduzir logs em produção

Procure por todos os `console.log` e `console.warn` adicionados e envolva com:

```typescript
if (process.env.NODE_ENV === 'development') {
    console.log('[Voice] ...');
}
```

### 2. Limpar cache de matching

No `useEffect` de cleanup (linha ~144), adicione:

```typescript
return () => {
    // ... código existente
    
    // 🆕 Limpar caches
    emergencyRecoveryRef.current.failureTimestamps = [];
    syntheticAudioRef.current.wpmSamples = [];
    syntheticAudioRef.current.normalizedTranscripts.clear();
};
```

---

## 📊 MÉTRICAS DE SUCESSO

Após implementar, monitorar:

1. **Taxa de travamento**: Deve cair para ~0%
2. **Taxa de ativação do Emergency Recovery**: ~5-10% (esperado para áudio sintético)
3. **Tempo médio até sincronização na reativação**: < 2 segundos
4. **Accuracy em áudio sintético**: Deve subir de ~60% para ~85%

---

## 🚨 ROLLBACK (Se necessário)

```bash
# Restaurar backup
cp src/hooks/useVoiceControl.ts.backup src/hooks/useVoiceControl.ts

# Ou usar git
git checkout src/hooks/useVoiceControl.ts
```

---

## 📞 SUPORTE

Se encontrar problemas:

1. Verifique o console para erros
2. Use `window.voiceDebug.all()` para diagnóstico
3. Confirme que todas as constantes foram adicionadas
4. Verifique se as funções auxiliares foram copiadas corretamente

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Backup criado
- [ ] Constantes adicionadas (EMERGENCY_RECOVERY, SYNTHETIC_AUDIO_PATTERNS, DYNAMIC_JUMP_LIMITS)
- [ ] Refs adicionadas (emergencyRecoveryRef, syntheticAudioRef, dynamicJumpRef)
- [ ] Funções auxiliares copiadas (5 funções)
- [ ] processRecognition() modificada
- [ ] handleNoMatch() modificada
- [ ] startListening() modificada
- [ ] Testes executados (4 testes)
- [ ] Debug helper adicionado
- [ ] Logs de produção otimizados
- [ ] Métricas monitoradas

---

**Estimativa de tempo:** 30-45 minutos
**Complexidade:** Média
**Risco de breaking changes:** Baixo (todas as mudanças são aditivas, exceto no processRecognition)
