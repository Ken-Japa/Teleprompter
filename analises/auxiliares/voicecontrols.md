# Voice Control Configuration Guide

This document explains all tunable parameters for the Voice Control system. Adjust these values to fine-tune behavior based on testing feedback.

---

## 📍 Location of Configuration Files

### Main Configuration
**File**: `src/config/voiceControlConfig.ts`  
Contains high-level scrolling behavior parameters.

### Voice Control Logic
**File**: `src/hooks/useVoiceControl.ts`  
Contains matching algorithm parameters and confirmation logic.

---

## ⚙️ Configuration Parameters

### 1. LOOKAHEAD_POSITION

**File**: `voiceControlConfig.ts`  
**Current Value**: `0.08` (8% from top)  
**Range**: `0.0` - `1.0`

**What it does**: Controls where the active sentence appears on screen.

**Values**:
- `0.0` = Top of screen (no lookahead)
- `0.08` = 8% from top (current - good balance)
- `0.15` = 15% from top (more lookahead)
- `0.5` = Center of screen (maximum lookahead)

**When to adjust**:
- ✅ **Increase** (to 0.10-0.15) if: User needs to see more upcoming text, lots of line breaks
- ✅ **Decrease** (to 0.05) if: User prefers current line at very top

**Current reasoning**: 8% provides good balance between keeping current line visible and showing enough upcoming text, especially helpful with line breaks.

---

### 2. SCROLL_LERP_FACTOR

**File**: `voiceControlConfig.ts`  
**Current Value**: `0.4`  
**Range**: `0.1` - `1.0`

**What it does**: Controls smoothness vs responsiveness of scroll animation.

**Values**:
- `0.1` = Very smooth, slow catch-up (laggy feel)
- `0.4` = Current - balanced
- `0.6` = Faster response, less smooth
- `1.0` = Instant jump (no smoothing)

**When to adjust**:
- ✅ **Increase** (to 0.5-0.6) if: Scroll feels too laggy
- ✅ **Decrease** (to 0.3) if: Scroll feels too jumpy

---

### 3. PROGRESS_SMOOTH_FACTOR

**File**: `useVoiceControl.ts` (line ~30)  
**Current Value**: `0.35`  
**Range**: `0.1` - `0.5`

**What it does**: Smooths voiceProgress updates within a sentence using exponential moving average.

**Formula**: `smoothed = old * (1 - factor) + new * factor`

**Values**:
- `0.2` = More smoothing (65% new stays as old)
- `0.35` = Current - balanced
- `0.5` = Less smoothing (more responsive)

**When to adjust**:
- ✅ **Increase** (to 0.4-0.5) if: Progress feels too laggy within sentences
- ✅ **Decrease** (to 0.25-0.3) if: Seeing micro-jitters in scroll

---

### 4. THROTTLE_MS

**File**: `useVoiceControl.ts` (line ~141)  
**Current Value**: `75` ms  
**Range**: `50` - `150` ms

**What it does**: Limits how often interim speech recognition results are processed.

**Values**:
- `50` ms = Process every 50ms (20 updates/sec) - very responsive, high CPU
- `75` ms = Current - ~13 updates/sec
- `100` ms = 10 updates/sec - smoother, lower CPU
- `150` ms = 6-7 updates/sec - may feel laggy

**When to adjust**:
- ✅ **Decrease** (to 50-60ms) if: Voice control feels laggy
- ✅ **Increase** (to 100-120ms) if: Performance issues, stuttering

---

### 5. MATCH_CONFIRMATION_FRAMES

**File**: `useVoiceControl.ts` (line ~27)  
**Current Value**: `2` frames  
**Range**: `1` - `3` frames

**What it does**: How many consecutive frames a new sentence must be detected before confirming the change.

**Values**:
- `1` = No confirmation (instant, risky)
- `2` = Current - ~150ms delay (balanced)
- `3` = ~225ms delay (very safe, may feel laggy)

**When to adjust**:
- ✅ **Decrease** (to 1) if: Sentence transitions feel too slow
- ✅ **Increase** (to 3) if: Still seeing occasional incorrect jumps

**⚠️ Warning**: Setting to 1 removes safety - only for testing!

---

### 6. Minimum Transcript Length

**File**: `useVoiceControl.ts` (line ~149)  
**Current Value**: `6` characters  
**Range**: `4` - `10` characters

**What it does**: Minimum length of recognized speech before processing.

**Values**:
- `4` = Very responsive, may have false positives
- `6` = Current - good balance
- `8-10` = More stable, may miss short phrases

**When to adjust**:
- ✅ **Decrease** (to 4-5) if: Missing short phrases
- ✅ **Increase** (to 8-10) if: Too many false positives from noise

---

### 7. Search Window Sizes

**File**: `useVoiceControl.ts` (lines ~151-154)  
**Current Values**: 
- Small scripts (<2000 chars): `600` chars
- Medium scripts (2000-5000 chars): `800` chars
- Large scripts (>5000 chars): `1200` chars

**What it does**: How far ahead to search for fuzzy matches.

**When to adjust**:
- ✅ **Increase all** (e.g., 800/1000/1500) if: Missing matches when speaking fast
- ✅ **Decrease all** (e.g., 500/700/1000) if: Performance issues with very large scripts

---

### 8. Jump Distance Thresholds

**File**: `useVoiceControl.ts` (lines ~206-215)  
**Current Values**:
- Medium jump (>5 sentences): Requires `95%+` accuracy (ratio < 0.05)
- Large jump (>10 sentences): Requires `97%+` accuracy (ratio < 0.03)

**What it does**: How strict the matching must be for cross-sentence jumps.

**Values**:
- More permissive: Increase ratios (e.g., 0.08, 0.05)
- More strict: Decrease ratios (e.g., 0.03, 0.02)

**When to adjust**:
- ✅ **More permissive** if: Legitimate jumps are being rejected
- ✅ **More strict** if: Still seeing occasional incorrect jumps

---

### 9. Fallback Search Strictness

**File**: `useVoiceControl.ts` (line ~183)  
**Current Value**: `0.04` (96%+ accuracy required)  
**Range**: `0.02` - `0.10`

**What it does**: How perfect a fallback backward match must be.

**Values**:
- `0.02` = 98%+ required (very strict)
- `0.04` = 96%+ required (current)
- `0.06` = 94%+ required (more permissive)
- `0.10` = 90%+ required (risky)

**When to adjust**:
- ✅ **More permissive** (to 0.06) if: Can't restart script from beginning
- ✅ **More strict** (to 0.02) if: Seeing backward jumps

**⚠️ Note**: Forward jumps via fallback are completely BLOCKED (line ~186).

---

## 🧪 Testing Procedure

When changing parameters:

1. **Change ONE parameter at a time**
2. **Test with the same script** for comparison
3. **Monitor console (F12)** for warnings/logs
4. **Note the improvement/degradation**
5. **Document the change** if keeping it

### Test Scenarios

**Long Sentences**:
- Text: 100+ character sentence without punctuation
- Success: Smooth scroll from start to end

**Repeated Phrases**:
- Text: Chorus that repeats 3+ times
- Success: Continues forward, doesn't jump back

**Fast Speaking**:
- Speak faster than normal pace
- Success: Keeps up without losing track

**Pause/Resume**:
- Pause voice control mid-sentence
- Resume
- Success: Continues from same position

**Line Breaks**:
- Text with multiple \n\n (paragraph breaks)
- Success: Can see upcoming text clearly

---

## 📊 Current Configuration Summary

| Parameter | Value | Purpose |
|-----------|-------|---------|
| LOOKAHEAD_POSITION | 0.08 | Text position (8% from top) |
| SCROLL_LERP_FACTOR | 0.4 | Scroll smoothness |
| PROGRESS_SMOOTH_FACTOR | 0.35 | Within-sentence smoothing |
| THROTTLE_MS | 75 | Processing frequency |
| MATCH_CONFIRMATION_FRAMES | 2 | Sentence change delay |
| Min Transcript Length | 6 | Noise filtering |
| Medium Jump Threshold | 95% | 5-10 sentence jumps |
| Large Jump Threshold | 97% | 10+ sentence jumps |
| Fallback Strictness | 96% | Backward jump requirement |

---

## 🎯 Recommended Starting Points by Use Case

### General Teleprompter
```typescript
LOOKAHEAD_POSITION: 0.08
SCROLL_LERP_FACTOR: 0.4
MATCH_CONFIRMATION_FRAMES: 2
```

### Musician Mode (Reading Chords)
```typescript
LOOKAHEAD_POSITION: 0.02 // Keep line at very top
SCROLL_LERP_FACTOR: 0.45 // Slightly faster
MATCH_CONFIRMATION_FRAMES: 2
```

### Very Fast Speaking
```typescript
LOOKAHEAD_POSITION: 0.10 // More lookahead
SCROLL_LERP_FACTOR: 0.5 // Faster response
THROTTLE_MS: 60 // More frequent updates
```

### Maximum Stability (Zero Jumps)
```typescript
MATCH_CONFIRMATION_FRAMES: 3 // More confirmation
Medium Jump: 0.03 // 97%+ required
Large Jump: 0.02 // 98%+ required
Fallback: 0.02 // 98%+ required
```

---

## 🐛 Troubleshooting

### Problem: Text disappears on pause/resume
**Solution**: ✅ FIXED - stopListening no longer resets lockedSentenceIdRef

### Problem: Text too low on screen, hard to see upcoming
**Solution**: Increase LOOKAHEAD_POSITION (try 0.10-0.15)

### Problem: Scroll feels laggy
**Solutions**:
- Increase SCROLL_LERP_FACTOR (try 0.5)
- Decrease THROTTLE_MS (try 60ms)
- Increase PROGRESS_SMOOTH_FACTOR (try 0.4)

### Problem: Still seeing occasional jumps
**Solutions**:
- Increase MATCH_CONFIRMATION_FRAMES (try 3)
- Decrease jump thresholds (try 0.03 and 0.02)
- Decrease fallback strictness (try 0.02)

### Problem: Missing legitimate sentence changes
**Solutions**:
- Decrease MATCH_CONFIRMATION_FRAMES (try 1, but risky)
- Increase jump thresholds (try 0.07 and 0.05)

---

## 📝 Change Log

### 2024-12-24 - Round 3 Updates
- Changed LOOKAHEAD_POSITION: 0.018 → 0.08 (better line break handling)
- Fixed pause/resume bug (text no longer disappears)
- Changed resetVoice: lockedSentenceIdRef now resets to 0 instead of -1
- Changed activeSentenceIndex reset: starts at 0 instead of -1

### 2024-12-24 - Round 2 Updates
- Added sentence-lock architecture
- Removed hysteresis (was blocking smooth progress)
- Progress now updates freely within locked sentence
- Confirmation only required for cross-sentence changes

---

**Last Updated**: 2024-12-24  
**Version**: 3.0 (Sentence-Lock Architecture)

🧠 Lógica Central e Algoritmos

src/hooks/useVoiceControl.ts: O "coração" do sistema. Este arquivo gerencia a API de SpeechRecognition, processa o áudio em tempo real e decide quando rolar o texto. É um arquivo grande e complexo que contém a maior parte da lógica inteligente.

src/hooks/useRemoteController.ts: Gerencia como o comando de voz funciona quando o usuário fala pelo celular para controlar o computador (Remote Voice Control).

src/config/voiceControlConfig.ts: Contém todos os parâmetros de ajuste (thresholds, sensibilidade, janelas de busca e modos "músico" ou "bilíngue"). É essencial para quem quer melhorar a precisão sem necessariamente mexer no código da lógica.

src/utils/textParser.ts: Prepara o texto do roteiro para que o controle de voz consiga "entendê-lo" (remove pontuações, mapeia caracteres para índices de frase, etc).

src/utils/stringSimilarity.ts: Contém o algoritmo de Levenshtein Distance e a lógica de busca difusa (fuzzy search) usada para comparar o que o usuário disse com o que está escrito no roteiro.

src/utils/pronunciationMatcher.ts: Contém a lógica de pronúncia e aprendizado de pronúncia.

🖥️ Integração e Interface (Componentes)

src/components/host/Prompter.tsx: O componente principal do teleprompter que integra o hook de voz com a renderização visual e o sistema de rolagem física.

src/components/host/PrompterHUD.tsx: Contém os controles visuais (botões de ligar/desligar voz) e os indicadores de que o microfone está ouvindo.

src/components/host/VoiceLanguageSelector.tsx: Componente de interface para a seleção do idioma de reconhecimento.

src/components/host/VoiceAnalyticsModal.tsx: Mostra os dados de performance da sessão de voz (precisão, WPM - palavras por minuto).

🏗️ Estrutura de Dados
src/types.ts: Define as interfaces 
Sentence, SpeechRecognitionEvent e outras estruturas que o sistema de voz utiliza.
