
import { findBestMatch } from './src/utils/stringSimilarity';
import { parseTextToSentences } from './src/utils/textParser';

const text = "Hello world. This is a test.";
const { fullCleanText } = parseTextToSentences(text);
const transcript = "hello";
const lastMatchIndex = 0;
const searchWindow = 600;
const threshold = 0.35; // default from hook

console.log("Full Clean Text:", `"${fullCleanText}"`);
console.log("Transcript:", `"${transcript}"`);

const match = findBestMatch(
    fullCleanText,
    transcript,
    lastMatchIndex,
    searchWindow,
    threshold,
    lastMatchIndex
);

console.log("Match Result:", match);
