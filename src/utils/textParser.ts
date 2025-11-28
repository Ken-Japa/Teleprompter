import { Sentence, TextFragment } from '../types';

export const parseTextToSentences = (text: string): { sentences: Sentence[], fullCleanText: string, charToSentenceMap: Int32Array } => {
    if (!text) return { sentences: [], fullCleanText: '', charToSentenceMap: new Int32Array(0) };

    // 1. Tokenize: Convert raw text into a flat list of styled tokens
    const tokens: { text: string; type: 'normal' | 'red' | 'yellow' | 'green' | 'blue' }[] = [];
    const TAG_REGEX = /<([rygb])>([\s\S]*?)<\/\1>/g; // \s\S matches newlines too
    let lastIndex = 0;
    let match;

    const colorMap: Record<string, any> = { 'r': 'red', 'y': 'yellow', 'g': 'green', 'b': 'blue' };

    while ((match = TAG_REGEX.exec(text)) !== null) {
        // Push normal text before the tag
        if (match.index > lastIndex) {
            tokens.push({ text: text.substring(lastIndex, match.index), type: 'normal' });
        }
        // Push the tagged text
        const code = match[1];
        tokens.push({ text: match[2], type: colorMap[code] || 'normal' });
        lastIndex = TAG_REGEX.lastIndex;
    }
    // Push remaining text
    if (lastIndex < text.length) {
        tokens.push({ text: text.substring(lastIndex), type: 'normal' });
    }

    // 2. Sentence Splitting: Iterate tokens and break on punctuation
    const processedSentences: Sentence[] = [];
    let currentFragments: TextFragment[] = [];
    let currentCleanContent = "";
    let globalCharIndex = 0;
    let sentenceIdCounter = 0;

    const finalizeSentence = (force = false) => {
        const trimmedContent = currentCleanContent.trim();
        if (trimmedContent.length > 0 || force) {
            processedSentences.push({
                id: sentenceIdCounter++,
                cleanContent: trimmedContent,
                fragments: currentFragments,
                startIndex: globalCharIndex
            });
            globalCharIndex += trimmedContent.length + 1; // +1 for space
        }
        currentFragments = [];
        currentCleanContent = "";
    };

    tokens.forEach(token => {
        // Split by sentence terminators, keeping the delimiters
        // Regex logic: Split on [.!?] or newline, but include them in the result
        const parts = token.text.split(/([.!?\n]+)/);

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part) continue;

            const isDelimiter = /[.!?\n]+/.test(part);

            if (isDelimiter) {
                // Append delimiter to the last fragment or create new one
                if (currentFragments.length > 0 && currentFragments[currentFragments.length - 1].type === token.type) {
                    currentFragments[currentFragments.length - 1].text += part;
                } else {
                    currentFragments.push({ text: part, type: token.type });
                }
                currentCleanContent += part;
                
                // A delimiter marks the end of a sentence
                finalizeSentence();
            } else {
                // Regular text
                currentFragments.push({ text: part, type: token.type });
                currentCleanContent += part;
            }
        }
    });

    // Final flush if any text remains
    if (currentCleanContent.trim().length > 0) {
        finalizeSentence();
    }

    // 3. Build Mapping for Voice Matching
    const fullString = processedSentences.map(s => s.cleanContent).join(' ').toLowerCase();
    // Optimize: Use Int32Array for memory efficiency on large scripts
    const map = new Int32Array(fullString.length); 
    let currentPos = 0;
    
    processedSentences.forEach(s => {
        const len = s.cleanContent.length;
        for(let k = 0; k < len; k++) {
            if (currentPos + k < map.length) map[currentPos + k] = s.id;
        }
        // Map the space after the sentence to the sentence itself (improves "fuzzy" matching)
        if (currentPos + len < map.length) map[currentPos + len] = s.id;
        currentPos += len + 1;
    });

    return { sentences: processedSentences, fullCleanText: fullString, charToSentenceMap: map };
};