import { Sentence, TextFragment, TextCommand } from "../types";

export const parseTextToSentences = (
    text: string
): {
    sentences: Sentence[];
    fullCleanText: string;
    charToSentenceMap: Int32Array;
} => {
    if (!text)
        return {
            sentences: [],
            fullCleanText: "",
            charToSentenceMap: new Int32Array(0),
        };

    // 0. Pre-process: Convert bracketed/parenthesized text to red tags for Musician Mode
    // This allows [...] and (...) to be formatted in red and ignored by voice control
    const BRACKET_REGEX = /(\[.*?\]|\(.*?\))/g;
    text = text.replace(BRACKET_REGEX, (match) => `<r>${match}</r>`);

    // 1. Tokenize: Convert raw text into a flat list of styled tokens
    const tokens: {
        text: string;
        type: "normal" | "red" | "yellow" | "green" | "blue";
    }[] = [];
    const TAG_REGEX = /<([rygb])>([\s\S]*?)<\/\1>/g; // \s\S matches newlines too
    let lastIndex = 0;
    let match;

    const colorMap: Record<string, any> = {
        r: "red",
        y: "yellow",
        g: "green",
        b: "blue",
    };

    while ((match = TAG_REGEX.exec(text)) !== null) {
        // Push normal text before the tag
        if (match.index > lastIndex) {
            tokens.push({
                text: text.substring(lastIndex, match.index),
                type: "normal",
            });
        }
        // Push the tagged text
        const code = match[1];
        tokens.push({ text: match[2], type: colorMap[code] || "normal" });
        lastIndex = TAG_REGEX.lastIndex;
    }
    // Push remaining text
    if (lastIndex < text.length) {
        tokens.push({ text: text.substring(lastIndex), type: "normal" });
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
            const command = detectTextCommand(trimmedContent);
            processedSentences.push({
                id: sentenceIdCounter++,
                cleanContent: trimmedContent,
                fragments: currentFragments,
                startIndex: globalCharIndex,
                isChord: isChordLine(trimmedContent),
                command,
            });
            globalCharIndex += trimmedContent.length + 1; // +1 for space
        }
        currentFragments = [];
        currentCleanContent = "";
    };

    tokens.forEach((token) => {
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
    // We need a "voice-friendly" version of the text:
    // - Lowercase
    // - No punctuation
    // - No newlines
    // - Single spaces between words

    let builtString = "";
    const tempMap: number[] = [];

    processedSentences.forEach((s) => {
        // Strip out content in brackets [Intro] or parentheses (Chorus) using regex
        // We do this BEFORE cleaning everything else to explicitly ignore these sections
        let voiceText = s.cleanContent;
        voiceText = voiceText.replace(/\[.*?\]/g, "").replace(/\(.*?\)/g, "");

        // Create a clean version: Lowercase, remove punctuation, normalize spaces
        // Using Unicode properties to keep letters/numbers but remove symbols
        const clean = voiceText
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, "")
            .replace(/\s+/g, " ")
            .trim();

        if (clean.length === 0) return; // Skip sentences that are just punctuation/newlines

        // VOICE CONTROL OPTIMIZATION: Skip chord lines
        if (s.isChord) return;

        // If not the first item, add a space separator
        if (builtString.length > 0) {
            builtString += " ";
            tempMap.push(s.id);
        }

        // Append chars and fill map
        for (let i = 0; i < clean.length; i++) {
            tempMap.push(s.id);
        }
        builtString += clean;
    });

    // Convert to Int32Array for performance
    const map = new Int32Array(tempMap);

    return {
        sentences: processedSentences,
        fullCleanText: builtString,
        charToSentenceMap: map,
    };
};

// --- TEXT COMMAND DETECTION LOGIC ---
// Detect special commands in text: [STOP], [PAUSE X]
// Multilingual support: [STOP], [PARAR], [PARE] (PT), [STOP] (EN/ES)
// [PAUSE X], [PAUSA X] for timed pauses

const COMMAND_STOP_REGEX = /\[(stop|parar|pare)\]/gi;
const COMMAND_PAUSE_REGEX = /\[(pause|pausa)\s+(\d+)\]/gi;

const detectTextCommand = (text: string): TextCommand | undefined => {
    // Check for STOP command (case-insensitive, multilingual)
    if (COMMAND_STOP_REGEX.test(text)) {
        return { type: 'STOP' };
    }

    // Reset regex state
    COMMAND_PAUSE_REGEX.lastIndex = 0;

    // Check for PAUSE command with duration
    const pauseMatch = COMMAND_PAUSE_REGEX.exec(text);
    if (pauseMatch && pauseMatch[2]) {
        const duration = parseInt(pauseMatch[2], 10);
        if (!isNaN(duration) && duration > 0) {
            return { type: 'PAUSE', duration };
        }
    }

    return undefined;
};

// --- CHORD DETECTION LOGIC ---
// Heuristic: A line is a chord line if it consists mostly of chord symbols.
// Valid chord symbols: A-G, potentially followed by #, b, m, min, maj, dim, aug, sus, add, 2-13, /, etc.
const CHORD_REGEX = /^[A-G](?:[#b])?(?:m|min|maj|dim|aug|sus|add)?(?:[2-9]|1[0-3])?(?:[#b][59])?(?:\/[A-G](?:[#b])?)?$/;

const isChordLine = (text: string): boolean => {
    // 0. CRITICAL FIX: Strip color/style tags before analysis
    // This ensures text like "<r>[Am C D]</r>" is analyzed as "[Am C D]"
    // Color tags are added at line 20 BEFORE this check, so we must remove them
    const cleanFromTags = text.replace(/<[rygb]>([\s\S]*?)<\/[rygb]>/g, "$1");

    // 1. Clean the text, remove extra spaces
    const clean = cleanFromTags.trim();
    if (clean.length === 0) return false;

    // --- TAB DETECTION --- 
    // Detect typical Tab lines: "E|---" or "e|---" or just numbers/dashes/p/h/x
    // e.g. E|-----------------|, G|--2--4--|
    // Heuristic: Starts with letter+pipe, OR contains mostly dashes/numbers/pipes
    if (/^[A-Za-z]?\|[-0-9pPhHxX\\/\s]+\|?/.test(clean)) {
        return true;
    }
    // Fallback for tabs without opening key: mostly dashes and numbers (> 80%)
    const dashNumCount = (clean.match(/[-0-9|]/g) || []).length;
    if (dashNumCount / clean.length > 0.8) {
        return true;
    }

    // 2. Split into tokens
    const tokens = clean.split(/\s+/);

    // 3. Check each token
    let chordCount = 0;
    for (const token of tokens) {
        // Special case: "|" dividers often used in tabs, and "/" for split chords if spaced
        if (token === "|" || token === "||" || token === "/") {
            chordCount++;
            continue;
        }

        // Remove common non-chord punctuation that might be attached (e.g., (G))
        const stripped = token.replace(/[()[\]]/g, "");
        if (CHORD_REGEX.test(stripped)) {
            chordCount++;
        }
    }

    // 4. Threshold: 
    // "A / G" -> 3 tokens. 
    // If strict > 0.75, we need 3/3 (100%) or > 75%. 
    // 2/3 = 66%. So 0.66.
    // Let's set to >= 0.65 to capture "A / G" and "Am C (opt)" styles without triggering on "A man" (50%).
    return (chordCount / tokens.length) >= 0.65;
};

