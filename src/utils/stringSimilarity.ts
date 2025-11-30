/**
 * Calculates the Levenshtein distance between two strings.
 * Lower distance means more similar strings.
 */
export const levenshteinDistance = (a: string, b: string): number => {
 const matrix = [];

 // Increment along the first column of each row
 for (let i = 0; i <= b.length; i++) {
  matrix[i] = [i];
 }

 // Increment each column in the first row
 for (let j = 0; j <= a.length; j++) {
  matrix[0][j] = j;
 }

 // Fill in the rest of the matrix
 for (let i = 1; i <= b.length; i++) {
  for (let j = 1; j <= a.length; j++) {
   if (b.charAt(i - 1) === a.charAt(j - 1)) {
    matrix[i][j] = matrix[i - 1][j - 1];
   } else {
    matrix[i][j] = Math.min(
     matrix[i - 1][j - 1] + 1, // substitution
     Math.min(
      matrix[i][j - 1] + 1, // insertion
      matrix[i - 1][j] + 1 // deletion
     )
    );
   }
  }
 }

 return matrix[b.length][a.length];
};

/**
 * Finds the best match of a pattern within a text using fuzzy search.
 *
 * @param text The full text to search in (haystack)
 * @param pattern The text to search for (needle)
 * @param startIndex Where to start searching in the text
 * @param searchWindow How many characters ahead to search (optimization)
 * @param threshold Max allowed error ratio (0.0 to 1.0). 0.3 means 30% difference allowed.
 * @returns The start index of the best match, or -1 if no match meets the threshold.
 */
export const findBestMatch = (
 text: string,
 pattern: string,
 startIndex: number = 0,
 searchWindow: number = 1000,
 threshold: number = 0.35
): { index: number; distance: number; ratio: number } | null => {
 if (!pattern || pattern.length < 3) return null;

 // Don't search beyond text bounds
 const actualStartIndex = Math.max(0, Math.min(startIndex, text.length - 1));
 const searchEndIndex = Math.min(text.length, actualStartIndex + searchWindow);

 let bestMatch = {
  index: -1,
  distance: Infinity,
  ratio: 1.0,
 };

 // Heuristic optimization: limit the search window based on length difference
 // If the pattern is much longer/shorter than the text, a good match is unlikely
 // unless we are looking for a substring. But here we are fuzzy matching.

 // Step size optimization: if pattern is long, we don't need to check every single char index
 // We can skip a few chars, but for accuracy we'll stick to 1 for now or dynamic based on length
 const step = pattern.length > 50 ? 5 : 1;

 for (let i = actualStartIndex; i < searchEndIndex; i += step) {
  // Check a few lengths
  // For simplicity and speed in JS, just checking exact length is often "good enough" for sliding window
  // if we have a generous threshold. But let's try exact length first.
  const len = pattern.length;
  if (i + len > text.length) break;

  const candidate = text.substr(i, len);

  // Quick optimization: If first and last chars don't match, it's likely not a match
  // (This is risky for fuzzy search, so we skip it or make it soft)

  const dist = levenshteinDistance(pattern, candidate);
  const ratio = dist / pattern.length;

  if (ratio < bestMatch.ratio) {
   bestMatch = {
    index: i,
    distance: dist,
    ratio: ratio,
   };
  }
 }

 if (bestMatch.ratio <= threshold) {
  return bestMatch;
 }

 return null;
};
