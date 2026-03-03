import { doubleMetaphone } from 'double-metaphone';

/**
 * Unified Phonetic Matching (Double Metaphone)
 * Generates phonetic codes for all languages as an auxiliary signal.
 */

const phoneticCache = new Map<string, [string, string]>();

export const applyPhonetics = (text: string): [string, string] => {
    if (!text) return ["", ""];

    const normalized = text.toLowerCase().trim();
    if (phoneticCache.has(normalized)) return phoneticCache.get(normalized)!;

    const words = normalized.split(/\s+/).filter(word => word.length > 2);
    if (words.length === 0) return ["", ""];

    // Generate codes for each word and join
    const codes = words.map(word => doubleMetaphone(word));
    const result: [string, string] = [
        codes.map(c => c[0]).join(""),
        codes.map(c => c[1]).join("")
    ];

    if (phoneticCache.size > 1000) phoneticCache.clear();
    phoneticCache.set(normalized, result);

    return result;
};

export const clearPhoneticCache = () => {
    phoneticCache.clear();
};
