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

    // 1. Tokenize: Convert raw text into a flat list of styled tokens
    // We track absoluteStart to ensure we can map back to the original text position
    const tokens: {
        text: string;
        type: "normal" | "red" | "yellow" | "green" | "blue";
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        absoluteStart: number;
        innerOffset?: number;
    }[] = [];

    // Unified Regex: Matches color tags <r>...</r> OR brackets [...]
    // Group 1: Tag char (r,y,g,b)
    // Group 2: Tag content
    // Group 3: Bracket match (entire string)
    const TOKEN_REGEX = /<([rygb])>([\s\S]*?)<\/\1>|(\[.*?\])/g;

    let lastIndex = 0;
    let match;

    const colorMap: Record<string, any> = {
        r: "red",
        y: "yellow",
        g: "green",
        b: "blue",
    };

    while ((match = TOKEN_REGEX.exec(text)) !== null) {
        // Push normal text before the match
        if (match.index > lastIndex) {
            tokens.push({
                text: text.substring(lastIndex, match.index),
                type: "normal",
                absoluteStart: lastIndex
            });
        }

        // Check if it's a Tag Match or Bracket Match
        if (match[3]) {
            // Bracket Match -> RED default (as per musician mode request)
            tokens.push({
                text: match[3],
                type: "red",
                absoluteStart: match.index
            });
        } else {
            // Tag Match
            const code = match[1];
            tokens.push({
                text: match[2],
                type: colorMap[code] || "normal",
                absoluteStart: match.index,
                innerOffset: 3 // length of <r>, <y>, <g>, <b>
            });
        }
        lastIndex = TOKEN_REGEX.lastIndex;
    }
    // Push remaining text
    if (lastIndex < text.length) {
        tokens.push({
            text: text.substring(lastIndex),
            type: "normal",
            absoluteStart: lastIndex
        });
    }

    // Second pass: Process bold, italic, underline tags within each token
    // We must preserve or adjust absoluteStart.
    // Since tags like <b> are in the text, we should count them relative to the token's absoluteStart.
    const processedTokens: typeof tokens = [];

    tokens.forEach(token => {
        let currentText = token.text;
        const fragments: typeof tokens = [];

        // Pass 2a: Process BOLD <bold>...</bold>
        const BOLD_REGEX = /<bold>([\s\S]*?)<\/bold>/g;
        let boldLastIndex = 0;
        let boldMatch;
        let baseStart = token.absoluteStart + (token.innerOffset || 0);

        while ((boldMatch = BOLD_REGEX.exec(currentText)) !== null) {
            if (boldMatch.index > boldLastIndex) {
                fragments.push({
                    text: currentText.substring(boldLastIndex, boldMatch.index),
                    type: token.type,
                    absoluteStart: baseStart + boldLastIndex
                });
            }
            fragments.push({
                text: boldMatch[1],
                type: token.type,
                bold: true,
                absoluteStart: baseStart + boldMatch.index,
                innerOffset: 6 // length of <bold>
            });
            boldLastIndex = BOLD_REGEX.lastIndex;
        }
        if (boldLastIndex < currentText.length) {
            fragments.push({
                text: currentText.substring(boldLastIndex),
                type: token.type,
                absoluteStart: baseStart + boldLastIndex
            });
        }

        // Pass 2b: Process ITALIC <i>...</i>
        const italicFragments: typeof tokens = [];
        fragments.forEach(frag => {
            const ITALIC_REGEX = /<i>([\s\S]*?)<\/i>/g;
            let italicLastIndex = 0;
            let italicMatch;
            let hasItalic = false;
            let fragBaseStart = frag.absoluteStart + (frag.innerOffset || 0);

            while ((italicMatch = ITALIC_REGEX.exec(frag.text)) !== null) {
                hasItalic = true;
                if (italicMatch.index > italicLastIndex) {
                    italicFragments.push({
                        text: frag.text.substring(italicLastIndex, italicMatch.index),
                        type: frag.type,
                        bold: frag.bold,
                        absoluteStart: fragBaseStart + italicLastIndex
                    });
                }
                italicFragments.push({
                    text: italicMatch[1],
                    type: frag.type,
                    bold: frag.bold,
                    italic: true,
                    absoluteStart: fragBaseStart + italicMatch.index,
                    innerOffset: 3 // length of <i>
                });
                italicLastIndex = ITALIC_REGEX.lastIndex;
            }
            if (hasItalic) {
                if (italicLastIndex < frag.text.length) {
                    italicFragments.push({
                        text: frag.text.substring(italicLastIndex),
                        type: frag.type,
                        bold: frag.bold,
                        absoluteStart: fragBaseStart + italicLastIndex
                    });
                }
            } else {
                italicFragments.push(frag);
            }
        });

        // Pass 2c: Process UNDERLINE <u>...</u>
        const finalFragments: typeof tokens = [];
        italicFragments.forEach(frag => {
            const UNDERLINE_REGEX = /<u>([\s\S]*?)<\/u>/g;
            let underlineLastIndex = 0;
            let underlineMatch;
            let hasUnderline = false;
            let fragBaseStart = frag.absoluteStart + (frag.innerOffset || 0);

            while ((underlineMatch = UNDERLINE_REGEX.exec(frag.text)) !== null) {
                hasUnderline = true;
                if (underlineMatch.index > underlineLastIndex) {
                    finalFragments.push({
                        text: frag.text.substring(underlineLastIndex, underlineMatch.index),
                        type: frag.type,
                        bold: frag.bold,
                        italic: frag.italic,
                        absoluteStart: fragBaseStart + underlineLastIndex
                    });
                }
                finalFragments.push({
                    text: underlineMatch[1],
                    type: frag.type,
                    bold: frag.bold,
                    italic: frag.italic,
                    underline: true,
                    absoluteStart: fragBaseStart + underlineMatch.index,
                    innerOffset: 3 // length of <u>
                });
                underlineLastIndex = UNDERLINE_REGEX.lastIndex;
            }
            if (hasUnderline) {
                if (underlineLastIndex < frag.text.length) {
                    finalFragments.push({
                        text: frag.text.substring(underlineLastIndex),
                        type: frag.type,
                        bold: frag.bold,
                        italic: frag.italic,
                        absoluteStart: fragBaseStart + underlineLastIndex
                    });
                }
            } else {
                finalFragments.push(frag);
            }
        });

        processedTokens.push(...finalFragments);
    });

    // 2. Sentence Splitting: Iterate tokens and break on punctuation
    const processedSentences: Sentence[] = [];
    let currentFragments: TextFragment[] = [];
    let currentCleanContent = "";
    let currentSentenceStartIndex = -1;
    let sentenceIdCounter = 0;

    const finalizeSentence = (force = false) => {
        const trimmedContent = currentCleanContent.trim();
        if (trimmedContent.length > 0 || force) {
            const command = detectTextCommand(trimmedContent);
            const startIndex = currentSentenceStartIndex !== -1 ? currentSentenceStartIndex : 0;

            processedSentences.push({
                id: sentenceIdCounter++,
                cleanContent: trimmedContent,
                fragments: currentFragments,
                startIndex: startIndex,
                isChord: isChordLine(trimmedContent),
                command,
            });

            currentSentenceStartIndex = -1;
        }
        currentFragments = [];
        currentCleanContent = "";
    };

    processedTokens.forEach((token) => {
        const parts = token.text.split(/([.!?\n]+)/);
        let localOffset = 0;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part === "") continue;

            let isDelimiter = /[.!?\n]+/.test(part);

            // Special Case: Do not treat a dot as a delimiter if it's between digits (e.g., 1.33)
            // This prevents technical terms and decimal values from breaking the sentence.
            if (isDelimiter && part === "." && i > 0 && i < parts.length - 1) {
                const prev = parts[i - 1];
                const next = parts[i + 1];
                if (/\d$/.test(prev) && /^\d/.test(next)) {
                    isDelimiter = false;
                }
            }

            // The actual character index in the original text for this part
            const partAbsoluteStart = (token.absoluteStart + (token.innerOffset || 0)) + localOffset;

            if (currentSentenceStartIndex === -1 && !isDelimiter && part.trim().length > 0) {
                currentSentenceStartIndex = partAbsoluteStart;
            }
            if (currentFragments.length === 0 && currentSentenceStartIndex === -1) {
                currentSentenceStartIndex = partAbsoluteStart;
            }

            if (isDelimiter) {
                if (currentFragments.length > 0 &&
                    currentFragments[currentFragments.length - 1].type === token.type &&
                    currentFragments[currentFragments.length - 1].bold === token.bold &&
                    currentFragments[currentFragments.length - 1].italic === token.italic &&
                    currentFragments[currentFragments.length - 1].underline === token.underline) {
                    currentFragments[currentFragments.length - 1].text += part;
                } else {
                    currentFragments.push({ text: part, type: token.type, bold: token.bold, italic: token.italic, underline: token.underline });
                }
                currentCleanContent += part;
                localOffset += part.length;
                finalizeSentence();
            } else {
                currentFragments.push({ text: part, type: token.type, bold: token.bold, italic: token.italic, underline: token.underline });
                currentCleanContent += part;
                localOffset += part.length;
            }
        }
    });

    // Final flush
    if (currentCleanContent.trim().length > 0) {
        finalizeSentence();
    }

    // 3. Build Mapping for Voice Matching (unchanged mostly, but we rely on processedSentences)
    let builtString = "";
    const tempMap: number[] = [];

    processedSentences.forEach((s) => {
        let voiceText = s.cleanContent;
        voiceText = voiceText.replace(/\[.*?\]/g, "").replace(/\(.*?\)/g, "").replace(/<.*?>/g, "");

        const clean = voiceText
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, "")
            .replace(/\b\d+\b/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        if (clean.length === 0) return;
        if (s.isChord) return;

        if (builtString.length > 0) {
            builtString += " ";
            tempMap.push(s.id);
        }

        for (let i = 0; i < clean.length; i++) {
            tempMap.push(s.id);
        }
        builtString += clean;
    });

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
const COMMAND_SPEED_REGEX = /\[(speed|velocidade)\s+(\d+)\]/gi;
const COMMAND_LOOP_START_REGEX = /\[(loop start|início loop)\]/gi;
const COMMAND_LOOP_END_REGEX = /\[(loop)\s+(\d+)\]/gi;
const COMMAND_PART_REGEX = /\[(part|slide|parte|scene|cena)\s*(.*?)\]/gi;
const COMMAND_BPM_REGEX = /\[(bpm)\s+(.+?)\]/gi;
const COMMAND_SECTION_REGEX = /\[(section|seção|seccao)\s+(.*?)\s+(\d{1,2}:\d{2}|\d+)\]/gi;


// [COUNT X], [CONTAR X] for voice reps
const COMMAND_COUNT_REGEX = /\[(count|contar|conta)\s+(\d+)\]/gi;
// [REST X], [DESCANSO X] for workout rest
const COMMAND_REST_REGEX = /\[(rest|descanso|repouso)\s+(\d+)\]/gi;

const detectTextCommand = (text: string): TextCommand | undefined => {
    // Check for STOP command
    if (COMMAND_STOP_REGEX.test(text)) {
        return { type: 'STOP' };
    }

    // Check for LOOP START
    if (COMMAND_LOOP_START_REGEX.test(text)) {
        return { type: 'LOOP_START' };
    }

    // Reset regex state for stateful regexes
    COMMAND_PAUSE_REGEX.lastIndex = 0;
    COMMAND_SPEED_REGEX.lastIndex = 0;
    COMMAND_LOOP_END_REGEX.lastIndex = 0;
    COMMAND_COUNT_REGEX.lastIndex = 0;
    COMMAND_REST_REGEX.lastIndex = 0;
    COMMAND_PART_REGEX.lastIndex = 0;
    COMMAND_BPM_REGEX.lastIndex = 0;
    COMMAND_SECTION_REGEX.lastIndex = 0;


    // Check for PAUSE command
    const pauseMatch = COMMAND_PAUSE_REGEX.exec(text);
    if (pauseMatch && pauseMatch[2]) {
        const duration = parseInt(pauseMatch[2], 10);
        if (!isNaN(duration) && duration > 0) {
            return { type: 'PAUSE', duration };
        }
    }

    // Check for SPEED command
    const speedMatch = COMMAND_SPEED_REGEX.exec(text);
    if (speedMatch && speedMatch[2]) {
        const speed = parseInt(speedMatch[2], 10);
        if (!isNaN(speed) && speed >= 0 && speed <= 100) {
            return { type: 'SPEED', value: speed };
        }
    }

    // Check for LOOP END X command
    const loopEndMatch = COMMAND_LOOP_END_REGEX.exec(text);
    if (loopEndMatch && loopEndMatch[2]) {
        const iterations = parseInt(loopEndMatch[2], 10);
        if (!isNaN(iterations) && iterations > 0) {
            return { type: 'LOOP_END', value: iterations };
        }
    }

    // Check for COUNT X command
    const countMatch = COMMAND_COUNT_REGEX.exec(text);
    if (countMatch && countMatch[2]) {
        const count = parseInt(countMatch[2], 10);
        if (!isNaN(count) && count > 0) {
            return { type: 'COUNT', value: count };
        }
    }

    // Check for REST X command
    const restMatch = COMMAND_REST_REGEX.exec(text);
    if (restMatch && restMatch[2]) {
        const duration = parseInt(restMatch[2], 10);
        if (!isNaN(duration) && duration > 0) {
            return { type: 'REST', duration };
        }
    }

    // Check for PART / SLIDE command
    const partMatch = COMMAND_PART_REGEX.exec(text);
    if (partMatch) {
        return { type: 'PART', name: partMatch[2]?.trim() || undefined };
    }

    // Check for BPM command
    const bpmMatch = COMMAND_BPM_REGEX.exec(text);
    if (bpmMatch && bpmMatch[2]) {
        const bpmVal = bpmMatch[2].trim().toUpperCase();
        if (bpmVal === 'AUTO') {
            return { type: 'BPM', value: 'AUTO' };
        }
        const bpm = parseInt(bpmVal, 10);
        if (!isNaN(bpm) && bpm >= 60 && bpm <= 200) {
            return { type: 'BPM', value: bpm };
        }
    }

    // Check for SECTION command
    const sectionMatch = COMMAND_SECTION_REGEX.exec(text);
    if (sectionMatch && sectionMatch[2] && sectionMatch[3]) {
        const name = sectionMatch[2].trim();
        const timeStr = sectionMatch[3].trim();
        let timestamp = 0;

        if (timeStr.includes(':')) {
            const [min, sec] = timeStr.split(':').map(s => parseInt(s, 10));
            timestamp = (min * 60) + sec;
        } else {
            timestamp = parseInt(timeStr, 10);
        }

        if (!isNaN(timestamp)) {
            return { type: 'SECTION', name, timestamp };
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

