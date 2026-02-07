import { Sentence, TextFragment, TextCommand } from "../types";
import { VOICE_CONFIG } from "../config/voiceControlConfig";

export const parseTextToSentences = (
    text: string,
    autoColorBrackets: boolean = false,
    isMusicianMode: boolean = false // NEW: Exclude intelligent parser in musician mode
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
    // Group 1: Tag char (r,y,g,b,blue)
    // Group 2: Tag content
    // Group 3: Square Bracket match [ ... ] (max 100 chars, no newlines)
    // Group 4: Angle Bracket match < ... > (max 100 chars, no newlines, avoids known tags)
    const TOKEN_REGEX = /<(r|y|g|blue)>([\s\S]*?)<\/\1>|(\[[^\]\n]{1,100}\])|(<(?!\/?(?:bold|i|u|b|r|y|g|strong|em|blue)\b)[^>\n]{1,100}>)/g;

    let lastIndex = 0;
    let match;

    const colorMap: Record<string, any> = {
        r: "red",
        y: "yellow",
        g: "green",
        b: "blue",
        blue: "blue",
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

        // Check if it's a Square Bracket match [ ... ]
        if (match[3]) {
            // Bracket Match -> RED default (as per musician mode request)
            tokens.push({
                text: match[3],
                type: "red",
                absoluteStart: match.index
            });
        }
        // Check if it's an Angle Bracket match < ... > (if enabled)
        else if (match[4] && autoColorBrackets) {
            tokens.push({
                text: match[4],
                type: "blue",
                absoluteStart: match.index
            });
        }
        else if (match[1]) {
            // Tag Match
            const code = match[1];
            tokens.push({
                text: match[2],
                type: colorMap[code] || "normal",
                absoluteStart: match.index,
                innerOffset: 3 // length of <r>, <y>, <g>, <b>
            });
        } else {
            // If it matched Group 4 but autoColorBrackets is off, or it's an unhandled case, push as normal text
            tokens.push({
                text: match[0],
                type: "normal",
                absoluteStart: match.index
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

        // Pass 2a: Process BOLD <bold>...</bold> or <b>...</b>
        const BOLD_REGEX = /<(?:bold|b)>([\s\S]*?)<\/(?:bold|b)>/g;
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
                innerOffset: boldMatch[0].indexOf(boldMatch[1]) // dynamic length of opening tag
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
            const ITALIC_REGEX = /<(?:italic|i)>([\s\S]*?)<\/(?:italic|i)>/g;
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
                    innerOffset: italicMatch[0].indexOf(italicMatch[1]) // dynamic length of opening tag
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
            const UNDERLINE_REGEX = /<(?:underline|u)>([\s\S]*?)<\/(?:underline|u)>/g;
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
                    innerOffset: underlineMatch[0].indexOf(underlineMatch[1]) // dynamic length of opening tag
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

            // Detect if sentence is unmatchable by voice control (tags, brackets, or chords)
            const voiceText = trimmedContent
                .replace(/\[.*?\]/g, "")
                .replace(/\(.*?\)/g, "")
                .replace(/<.*?>/g, "");

            const clean = voiceText
                .toLowerCase()
                .replace(/[^\p{L}\p{N}\s]/gu, "")
                .replace(/\b\d+\b/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            const isChord = isChordLine(trimmedContent);
            // Sentence is inertial if it has content but no readable text for voice control
            // FIXED: We also check if the voiceText is empty even if there are fragments (e.g. style tags only)
            const isPurelyTags = trimmedContent.length > 0 && voiceText.trim().length === 0;
            const isInertial = (clean.length === 0 || isChord || isPurelyTags) && (trimmedContent.length > 0 || currentFragments.length > 0);

            processedSentences.push({
                id: sentenceIdCounter++,
                cleanContent: trimmedContent,
                fragments: currentFragments,
                startIndex: startIndex,
                isChord,
                command,
                isInertial,
            });

            currentSentenceStartIndex = -1;
        }
        currentFragments = [];
        currentCleanContent = "";
    };

    // Helper: Check if intelligent parser should break the sentence
    const shouldCheckIntelligentBreak = (): boolean => {
        if (!VOICE_CONFIG.INTELLIGENT_PARSER.enabled || isMusicianMode || currentCleanContent.trim().length === 0) {
            return false;
        }

        const wordCount = currentCleanContent.trim().split(/\s+/).length;
        const hasCommand = detectTextCommand(currentCleanContent.trim()) !== undefined;
        const shouldApply = !hasCommand || !VOICE_CONFIG.INTELLIGENT_PARSER.excludeCommandTags;

        return shouldApply && wordCount >= VOICE_CONFIG.INTELLIGENT_PARSER.maxWordsPerSentence;
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
                // If this is a delimiter, and we just started a sentence that consists only of this delimiter 
                // (or whitespace), we should instead try to append it to the previous sentence if it exists.
                const contentSoFar = currentCleanContent.trim();

                if (contentSoFar.length === 0 && processedSentences.length > 0) {
                    // Append to previous sentence instead of starting a new one
                    const prevSent = processedSentences[processedSentences.length - 1];

                    // Add fragment
                    prevSent.fragments.push({
                        text: part,
                        type: token.type,
                        bold: token.bold,
                        italic: token.italic,
                        underline: token.underline
                    });

                    // Add to clean content
                    prevSent.cleanContent += part;
                } else {
                    // Normal behavior: append to current and finalize
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
                }

                localOffset += part.length;
                finalizeSentence();
            } else {
                currentFragments.push({ text: part, type: token.type, bold: token.bold, italic: token.italic, underline: token.underline });
                currentCleanContent += part;
                localOffset += part.length;

                // INTELLIGENT PARSER: Check if sentence is too long
                if (part.includes(' ') && shouldCheckIntelligentBreak()) {
                    // LOOKAHEAD: Check if the next part is a delimiter.
                    // If it IS a delimiter, don't break yet, wait for the delimiter to be processed.
                    const nextPart = parts[i + 1];
                    const nextIsDelimiter = nextPart && /[.!?\n]+/.test(nextPart);

                    if (!nextIsDelimiter) {
                        console.log(`[IntelligentParser] Breaking long sentence at ${currentCleanContent.trim().split(/\s+/).length} words`);
                        finalizeSentence();
                    }
                }
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

