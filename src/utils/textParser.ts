import { Sentence, TextFragment } from "../types";

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
   processedSentences.push({
    id: sentenceIdCounter++,
    cleanContent: trimmedContent,
    fragments: currentFragments,
    startIndex: globalCharIndex,
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
  // Create a clean version: Lowercase, remove punctuation, normalize spaces
  // Using Unicode properties to keep letters/numbers but remove symbols
  const clean = s.cleanContent
   .toLowerCase()
   .replace(/[^\p{L}\p{N}\s]/gu, "")
   .replace(/\s+/g, " ")
   .trim();

  if (clean.length === 0) return; // Skip sentences that are just punctuation/newlines

  // If not the first item, add a space separator
  if (builtString.length > 0) {
   builtString += " ";
   // Map the space to the NEXT sentence (lookahead) or CURRENT?
   // Usually mapping to the current one being added is safer so that
   // if the match overlaps the space, it counts as this sentence.
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
