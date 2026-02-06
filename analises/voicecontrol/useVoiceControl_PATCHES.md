# Critical Patches for useVoiceControl.ts
# Apply these changes to fix unexpected scroll stops

## PATCH 1: Remove stopListening on Emergency (Line ~857-862)

### BEFORE:
```typescript
if (consecutiveFailuresRef.current > 10) {
    console.error('[Voice] Max consecutive failures reached. Pausing recognition to prevent loop/resource waste.');
    stopListening(); // ❌ THIS STOPS EVERYTHING
    consecutiveFailuresRef.current = 0;
    return;
}
```

### AFTER:
```typescript
if (consecutiveFailuresRef.current > 10) {
    console.warn('[Voice] High failure rate detected, activating emergency recovery mode');
    
    // INSTEAD OF STOPPING: Activate emergency recovery
    emergencyRecoveryRef.current = {
        isActive: true,
        activatedAt: Date.now(),
        failureTimestamps: [],
        consecutiveFailures: 0,
    };
    
    // Reset counter to give it another chance
    consecutiveFailuresRef.current = 0;
    
    // Continue processing (don't return)
}
```

---

## PATCH 2: Relax Jump Validation (Line ~978-993)

### BEFORE:
```typescript
if (isForwardJump && jumpDistance > 2) {
    const strictThreshold = isStalled ? 
        VOICE_CONFIG.JUMP_VALIDATION.STALLED_LARGE_JUMP_THRESHOLD : 
        VOICE_CONFIG.JUMP_VALIDATION.LARGE_JUMP_THRESHOLD;

    if (match.ratio > strictThreshold) {
        console.warn(
            `[Voice] ❌ BLOCKED: Large forward jump (${jumpDistance} sentences) ` +
            `with insufficient confidence (${(match.ratio * 100).toFixed(0)}% error). ` +
            `Required: ≤${strictThreshold * 100}% error`
        );
        voiceDiagnostics.recordMiss({
            transcript: cleanTranscript,
            expectedSentence: currentSentId,
            reason: `Large jump blocked - ratio ${match.ratio.toFixed(2)} > ${strictThreshold}`
        });
        return; // ❌ BLOCKS VALID MATCHES
    }
}
```

### AFTER:
```typescript
if (isForwardJump && jumpDistance > 2) {
    const strictThreshold = isStalled ? 
        VOICE_CONFIG.JUMP_VALIDATION.STALLED_LARGE_JUMP_THRESHOLD : 
        VOICE_CONFIG.JUMP_VALIDATION.LARGE_JUMP_THRESHOLD;

    if (match.ratio > strictThreshold) {
        // ✅ LOG WARNING BUT DON'T BLOCK
        console.warn(
            `[Voice] ⚠️ WARNING: Large forward jump (${jumpDistance} sentences) ` +
            `with moderate confidence (${(match.ratio * 100).toFixed(0)}% error). ` +
            `Allowing to prevent stall. Threshold was: ≤${strictThreshold * 100}% error`
        );
        
        // Only block if EXTREMELY poor match (>40% error)
        if (match.ratio > 0.40) {
            console.error(`[Voice] ❌ BLOCKED: Jump too uncertain (>40% error)`);
            voiceDiagnostics.recordMiss({
                transcript: cleanTranscript,
                expectedSentence: currentSentId,
                reason: `Large jump blocked - extremely poor match ${match.ratio.toFixed(2)}`
            });
            return;
        }
        
        // Otherwise, allow with warning
        voiceDiagnostics.recordMatch({
            sentenceId: newSentenceId,
            transcript: cleanTranscript,
            matchRatio: match.ratio,
            processingTime: performance.now() - processStart,
            wasJump: true
        });
    }
}
```

---

## PATCH 3: Relax Next Sentence Validation (Line ~1002-1017)

### BEFORE:
```typescript
if (isForwardJump && jumpDistance === 1) {
    const nextSentenceThreshold = VOICE_CONFIG.JUMP_VALIDATION.NEXT_SENTENCE_THRESHOLD;

    if (match.ratio > nextSentenceThreshold) {
        console.warn(
            `[Voice] ❌ BLOCKED: Next sentence jump with low confidence ` +
            `(${(match.ratio * 100).toFixed(0)}% error). Required: ≤${nextSentenceThreshold * 100}% error`
        );
        voiceDiagnostics.recordMiss({
            transcript: cleanTranscript,
            expectedSentence: currentSentenceId,
            reason: `Next sentence jump too uncertain (ratio: ${match.ratio.toFixed(2)})`
        });
        return; // ❌ BLOCKS COMMON CASE
    }
}
```

### AFTER:
```typescript
if (isForwardJump && jumpDistance === 1) {
    const nextSentenceThreshold = VOICE_CONFIG.JUMP_VALIDATION.NEXT_SENTENCE_THRESHOLD;

    if (match.ratio > nextSentenceThreshold) {
        // ✅ Only block if VERY poor match
        if (match.ratio > 0.45) {
            console.warn(
                `[Voice] ❌ BLOCKED: Next sentence jump with very low confidence ` +
                `(${(match.ratio * 100).toFixed(0)}% error > 45%)`
            );
            voiceDiagnostics.recordMiss({
                transcript: cleanTranscript,
                expectedSentence: currentSentenceId,
                reason: `Next sentence jump too uncertain (ratio: ${match.ratio.toFixed(2)})`
            });
            return;
        }
        
        // Otherwise, allow with increased confirmation requirement
        console.log(
            `[Voice] ⚠️ Next sentence with moderate confidence (${(match.ratio * 100).toFixed(0)}% error). ` +
            `Will require confirmation.`
        );
        
        // Force confirmation even if close to threshold
        if (pendingMatchRef.current?.sentenceId !== newSentenceId) {
            pendingMatchRef.current = { 
                index: match.index, 
                count: 1, 
                sentenceId: newSentenceId 
            };
            return; // Wait for confirmation
        }
    }
}
```

---

## PATCH 4: Allow Intentional Repetitions (Line ~892-925)

### ADD NEW CODE BEFORE LINE 892:
```typescript
// --- NEW: REPETITION DETECTION ---
const recentPositionsRef = useRef<Array<{index: number, sentenceId: number, time: number}>>([]);

// In the main processing function, before fallback logic (around line 890):
// Track current position
const now = Date.now();
recentPositionsRef.current.push({
    index: match?.index || lastMatchIndexRef.current,
    sentenceId: lockedSentenceIdRef.current,
    time: now
});

// Keep only last 5 positions
if (recentPositionsRef.current.length > 5) {
    recentPositionsRef.current.shift();
}
```

### THEN MODIFY FALLBACK (Line ~892-925):

### BEFORE:
```typescript
if (fallbackMatch) {
    const currentSentenceId = charToSentenceMap[lastMatchIndexRef.current] || 0;
    const fallbackSentenceId = charToSentenceMap[fallbackMatch.index] || 0;
    const sentenceDistance = Math.abs(currentSentenceId - fallbackSentenceId);

    const isBackwardJump = fallbackMatch.index < lastMatchIndexRef.current;
    const isForwardJump = fallbackMatch.index > lastMatchIndexRef.current;

    const isNearPerfectMatch = fallbackMatch.ratio < 0.02;
    const isVerySmallJump = sentenceDistance <= 2;

    if (isBackwardJump && isNearPerfectMatch && isVerySmallJump) {
        match = fallbackMatch;
    } else if (isForwardJump) {
        console.warn(`[Voice] Fallback BLOCKED: Forward jump rejected (too risky)`);
    } else {
        console.warn(`[Voice] Fallback rejected: Sentence dist ${sentenceDistance}, Ratio ${fallbackMatch.ratio.toFixed(3)}`);
    }
}
```

### AFTER:
```typescript
if (fallbackMatch) {
    const currentSentenceId = charToSentenceMap[lastMatchIndexRef.current] || 0;
    const fallbackSentenceId = charToSentenceMap[fallbackMatch.index] || 0;
    const sentenceDistance = Math.abs(currentSentenceId - fallbackSentenceId);

    const isBackwardJump = fallbackMatch.index < lastMatchIndexRef.current;
    const isForwardJump = fallbackMatch.index > lastMatchIndexRef.current;

    const isNearPerfectMatch = fallbackMatch.ratio < 0.02;
    const isVerySmallJump = sentenceDistance <= 2;
    
    // ✅ NEW: Check if this is an intentional repetition
    const wasRecentlyHere = recentPositionsRef.current.some(
        pos => pos.sentenceId === fallbackSentenceId && 
               now - pos.time < 5000 && // Within last 5 seconds
               pos.time < now - 1000 // But not the current position
    );
    
    const isIntentionalRepetition = wasRecentlyHere && 
                                    isBackwardJump && 
                                    fallbackMatch.ratio < 0.15; // 85%+ match

    if (isBackwardJump && (isNearPerfectMatch && isVerySmallJump || isIntentionalRepetition)) {
        if (isIntentionalRepetition) {
            console.log(`[Voice] ✅ Allowing intentional repetition to sentence ${fallbackSentenceId}`);
        }
        match = fallbackMatch;
    } else if (isForwardJump) {
        console.warn(`[Voice] Fallback BLOCKED: Forward jump rejected (too risky)`);
    } else {
        console.warn(`[Voice] Fallback rejected: Sentence dist ${sentenceDistance}, Ratio ${fallbackMatch.ratio.toFixed(3)}`);
    }
}
```

---

## PATCH 5: Add Throttle Hard Limit (Line ~671-675)

### BEFORE:
```typescript
const currentThrottle = performanceMetricsRef.current.currentThrottle;

if (!isFinal && (now - lastProcessedTimeRef.current) < currentThrottle) {
    return; // Skip this interim result
}
```

### AFTER:
```typescript
const currentThrottle = performanceMetricsRef.current.currentThrottle;
const HARD_THROTTLE_LIMIT = 80; // Never go above 80ms

const effectiveThrottle = Math.min(currentThrottle, HARD_THROTTLE_LIMIT);

if (!isFinal && (now - lastProcessedTimeRef.current) < effectiveThrottle) {
    return; // Skip this interim result
}
```

---

## PATCH 6: 1-Frame Lookahead (Line ~1090-1110)

### BEFORE:
```typescript
if (!pendingMatchRef.current || pendingMatchRef.current.sentenceId !== newSentenceId) {
    pendingMatchRef.current = { index: match.index, count: 1, sentenceId: newSentenceId };
    // DON'T RETURN - allow progress update below
} else {
    pendingMatchRef.current.count++;
    if (pendingMatchRef.current.count < VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES) {
        console.log(`[Voice] Sentence confirming: ${pendingMatchRef.current.count}/${VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES}`);
        // DON'T RETURN - allow progress update below
    } else {
        // Confirmed
        // ... rest of confirmation code
    }
}
```

### AFTER:
```typescript
if (!pendingMatchRef.current || pendingMatchRef.current.sentenceId !== newSentenceId) {
    pendingMatchRef.current = { index: match.index, count: 1, sentenceId: newSentenceId };
    
    // ✅ NEW: Start moving slightly on first frame (lookahead)
    const lookaheadProgress = 0.10; // Start at 10% into new sentence
    smoothedProgressRef.current = lookaheadProgress;
    setVoiceProgress(lookaheadProgress);
    console.log(`[Voice] 1-Frame lookahead: Starting movement to sentence ${newSentenceId}`);
    
    // Don't fully commit yet - wait for frame 2
    return;
} else {
    pendingMatchRef.current.count++;
    if (pendingMatchRef.current.count < VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES) {
        console.log(`[Voice] Sentence confirming: ${pendingMatchRef.current.count}/${VOICE_CONFIG.MATCH_CONFIRMATION_FRAMES}`);
        
        // ✅ Continue moving during confirmation (progressive commitment)
        const confirmationProgress = 0.10 + (pendingMatchRef.current.count * 0.20); // 10% → 30% → 50%
        smoothedProgressRef.current = Math.min(0.50, confirmationProgress);
        setVoiceProgress(smoothedProgressRef.current);
        
        return;
    } else {
        // Confirmed - full commit
        // ... rest of confirmation code
    }
}
```

---

## TESTING CHECKLIST

After applying patches:

- [ ] Test with background noise (music playing)
- [ ] Test repeating a sentence intentionally
- [ ] Test with foreign words (PromptNinja, WebRTC)
- [ ] Test with long script (5+ minutes)
- [ ] Verify emergency mode activates but doesn't stop
- [ ] Check throttle never exceeds 80ms (log it)
- [ ] Verify 1-frame lookahead feels more responsive

## ROLLBACK PLAN

If issues occur:
1. Git revert to checkpoint
2. Apply only PATCH 1 + PATCH 5 (safest)
3. Test again
4. Gradually add other patches

## MONITORING

Add this temporary logging to verify fixes:

```typescript
// After match validation
console.log(`[Voice Debug] Match: ${match.ratio.toFixed(3)}, Jump: ${jumpDistance}, Emergency: ${emergencyRecoveryRef.current.isActive}, Throttle: ${effectiveThrottle}ms`);
```

Remove after 1 week of stable operation.
