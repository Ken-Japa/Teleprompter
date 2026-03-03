import { newStemmer } from 'snowball-stemmers';

/**
 * Professional Stemmer for PT/EN/ES using snowball-stemmers
 * Reduces words to their roots (e.g. "ajudamos" -> "ajud")
 */

const stemmers: Record<string, any> = {
    'pt': newStemmer('portuguese'),
    'en': newStemmer('english'),
    'es': newStemmer('spanish'),
    'it': newStemmer('italian'),
    'fr': newStemmer('french'),
    'de': newStemmer('german')
};

const stemCache = new Map<string, string>();

export const applyStemming = (text: string, lang: string = 'pt'): string => {
    if (!text) return "";

    const stemmingLang = lang.split('-')[0].toLowerCase();
    const stemmer = stemmers[stemmingLang] || stemmers['en']; // Default to English if unsupported

    // Split into words, process each with cache, join back
    return text.split(/\s+/).map(word => {
        if (word.length <= 3) return word;

        const cacheKey = `${stemmingLang}:${word}`;
        if (stemCache.has(cacheKey)) return stemCache.get(cacheKey)!;

        const stemmed = stemmer.stem(word);

        // Basic cache management
        if (stemCache.size > 2000) stemCache.clear();
        stemCache.set(cacheKey, stemmed);

        return stemmed;
    }).join(" ");
};

export const clearStemCache = () => {
    stemCache.clear();
};
