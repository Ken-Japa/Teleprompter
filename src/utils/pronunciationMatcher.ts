/**
 * Pronunciation Matcher
 * Normalizes common speech recognition errors to improve matching accuracy
 */

interface PronunciationRule {
    pattern: RegExp;
    replacement: string;
    language?: string; // Optional: only apply for specific languages
}

/**
 * Common pronunciation rules by language
 */
const PRONUNCIATION_RULES: PronunciationRule[] = [
    // Portuguese
    { pattern: /próprio ninja/g, replacement: 'promptninja', language: 'pt' },
    { pattern: /pronto ninja/g, replacement: 'promptninja', language: 'pt' },
    { pattern: /web arte cê/g, replacement: 'webrtc', language: 'pt' },
    { pattern: /teleponto/g, replacement: 'teleprompter', language: 'pt' },
    { pattern: /estreaming/g, replacement: 'streaming', language: 'pt' },
    { pattern: /caf[eé]/g, replacement: 'café', language: 'pt' }, // Fix accent issues
    { pattern: /voz alta/g, replacement: 'voz alta', language: 'pt' }, // Ensure phrases stay together
    { pattern: /a gente/g, replacement: 'a gente', language: 'pt' },

    // English
    { pattern: /prompt ninja/g, replacement: 'promptninja', language: 'en' },
    { pattern: /tele prompter/g, replacement: 'teleprompter', language: 'en' },

    // Spanish
    { pattern: /pronto ninja/g, replacement: 'promptninja', language: 'es' },

    // Universal (number normalization)
    { pattern: /\bzero\b/g, replacement: '0' },
    { pattern: /\bum\b/g, replacement: '1' },
    { pattern: /\bdois\b/g, replacement: '2' },
    { pattern: /\btrês\b/g, replacement: '3' },
    { pattern: /\bone\b/g, replacement: '1' },
    { pattern: /\btwo\b/g, replacement: '2' },
    { pattern: /\bthree\b/g, replacement: '3' },
];

/**
 * Phonetic similarity mappings (for fuzzy matching)
 */
const PHONETIC_MAP: Record<string, string[]> = {
    'c': ['k', 's', 'ss'],
    'k': ['c', 'q'],
    's': ['z', 'c', 'ss', 'ç'],
    'z': ['s'],
    'f': ['ph', 'v'],
    'v': ['f', 'w'],
    'i': ['y', 'e'],
    'y': ['i'],
    'ão': ['am', 'an'],
    'ch': ['sh', 'x'],
    'j': ['g', 'dj'],
    'x': ['ch', 'sh'],
};

/**
 * Normalize transcript using pronunciation rules
 */
export const normalizePronunciation = (
    transcript: string,
    language: string = 'pt'
): string => {
    let normalized = transcript.toLowerCase().trim();

    // Apply language-specific rules
    for (const rule of PRONUNCIATION_RULES) {
        if (!rule.language || rule.language === language) {
            normalized = normalized.replace(rule.pattern, rule.replacement);
        }
    }

    return normalized;
};

/**
 * Generate phonetic variants of a word
 */
export const getPhoneticVariants = (word: string): Set<string> => {
    const variants = new Set<string>([word]);

    // Generate variants by replacing characters with phonetic equivalents
    for (const [char, replacements] of Object.entries(PHONETIC_MAP)) {
        if (word.includes(char)) {
            for (const replacement of replacements) {
                const variant = word.replace(new RegExp(char, 'g'), replacement);
                variants.add(variant);

                // Also try mixed case
                variants.add(variant.toLowerCase());
            }
        }
    }

    return variants;
};

/**
 * Check if two words are phonetically similar
 */
export const arePhoneticallySimilar = (word1: string, word2: string): boolean => {
    const variants1 = getPhoneticVariants(word1.toLowerCase());
    const variants2 = getPhoneticVariants(word2.toLowerCase());

    // Check if any variant matches
    for (const v1 of variants1) {
        if (variants2.has(v1)) return true;
    }

    return false;
};

/**
 * Advanced matching that considers pronunciation variations
 */
export const matchWithPronunciation = (
    scriptText: string,
    spokenText: string,
    language: string = 'pt'
): { score: number; normalizedSpoken: string } => {
    // Normalize both texts
    const normalizedScript = normalizePronunciation(scriptText, language);
    const normalizedSpoken = normalizePronunciation(spokenText, language);

    // Direct match check
    if (normalizedScript === normalizedSpoken) {
        return { score: 1.0, normalizedSpoken };
    }

    // Split into words and check phonetic similarity
    const scriptWords = normalizedScript.split(/\s+/);
    const spokenWords = normalizedSpoken.split(/\s+/);

    let matchedWords = 0;
    const minLength = Math.min(scriptWords.length, spokenWords.length);

    for (let i = 0; i < minLength; i++) {
        if (scriptWords[i] === spokenWords[i]) {
            matchedWords++;
        } else if (arePhoneticallySimilar(scriptWords[i], spokenWords[i])) {
            matchedWords += 0.8; // Partial credit for phonetic match
        }
    }

    const score = matchedWords / Math.max(scriptWords.length, spokenWords.length);
    return { score, normalizedSpoken };
};

/**
 * Learn new pronunciation patterns from user corrections
 */
class PronunciationLearner {
    private customRules: Map<string, string[]> = new Map();
    private readonly STORAGE_KEY = 'promptninja_custom_pronunciation';

    constructor() {
        this.load();
    }

    /**
     * Add a custom rule: "I said X but meant Y"
     */
    addRule(spoken: string, intended: string) {
        const normalized = spoken.toLowerCase().trim();

        if (!this.customRules.has(intended)) {
            this.customRules.set(intended, []);
        }

        const variants = this.customRules.get(intended)!;
        if (!variants.includes(normalized)) {
            variants.push(normalized);
            this.save();
        }
    }

    /**
    * Learn from a mismatch using frequency-based approach
    * This is called when a fallback or correction happens
    */
    learnFromMismatch(spoken: string, intended: string) {
        // This can be expanded to be smarter, but for now just add rule
        // The sophisticated frequency logic would require storing counters, 
        // which might be overkill for localStorage. 
        // Start simple: just add the rule.
        this.addRule(spoken, intended);
    }


    /**
     * Apply custom rules to text
     */
    apply(text: string): string {
        let result = text.toLowerCase();

        for (const [intended, variants] of this.customRules) {
            for (const variant of variants) {
                result = result.replace(new RegExp(variant, 'g'), intended);
            }
        }

        return result;
    }

    private save() {
        try {
            const data = JSON.stringify(Array.from(this.customRules.entries()));
            localStorage.setItem(this.STORAGE_KEY, data);
        } catch (e) {
            console.warn('[Pronunciation] Failed to save custom rules');
        }
    }

    private load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const entries = JSON.parse(data) as [string, string[]][];
                this.customRules = new Map(entries);
            }
        } catch (e) {
            console.warn('[Pronunciation] Failed to load custom rules');
        }
    }

    getRules() {
        return new Map(this.customRules);
    }

    reset() {
        this.customRules.clear();
        this.save();
    }
}

// Singleton instance
export const pronunciationLearner = new PronunciationLearner();

// Expose to window for debugging
if (typeof window !== 'undefined') {
    (window as any).pronunciation = {
        normalize: normalizePronunciation,
        match: matchWithPronunciation,
        learner: pronunciationLearner,
    };
}
