
/**
 * Parses spoken text to find integers.
 * Supports basic number words for PT, EN, and ES (0-20, plus 30, 40 etc roughly).
 * This is not a full NLP number parser, but sufficient for fitness rep counting (usually 1-50).
 */

const PT_NUMBERS: Record<string, number> = {
    'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'tres': 3, 'três': 3, 'quatro': 4, 'cinco': 5,
    'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9, 'dez': 10,
    'onze': 11, 'doze': 12, 'treze': 13, 'catorze': 14, 'quatorze': 14, 'quinze': 15,
    'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19, 'vinta': 20, 'vinte': 20
};

const EN_NUMBERS: Record<string, number> = {
    'one': 1, 'two': 2, 'too': 2, 'to': 2, 'three': 3, 'four': 4, 'for': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
    'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20
};

const ES_NUMBERS: Record<string, number> = {
    'uno': 1, 'una': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5,
    'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10,
    'once': 11, 'doce': 12, 'trece': 13, 'catorce': 14, 'quince': 15,
    'dieciseis': 16, 'diecisiete': 17, 'dieciocho': 18, 'diecinueve': 19, 'veinte': 20
};

export const parseSpokenNumber = (transcript: string, lang: 'pt' | 'en' | 'es'): number | null => {
    // 1. Try to find actual digits first
    const digitMatch = transcript.match(/(\d+)/);
    if (digitMatch) {
        return parseInt(digitMatch[1], 10);
    }

    // 2. Tokenize and check against word maps
    const words = transcript.toLowerCase().split(/\s+/);

    // Check from end of array to prioritize latest spoken number
    for (let i = words.length - 1; i >= 0; i--) {
        const word = words[i];

        if (lang === 'pt' && PT_NUMBERS[word] !== undefined) return PT_NUMBERS[word];
        if (lang === 'en' && EN_NUMBERS[word] !== undefined) return EN_NUMBERS[word];
        if (lang === 'es' && ES_NUMBERS[word] !== undefined) return ES_NUMBERS[word];
    }

    return null;
};
