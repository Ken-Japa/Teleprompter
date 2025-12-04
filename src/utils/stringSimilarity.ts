/**
 * Calculates the Levenshtein distance between two strings.
 * Optimized for memory usage (O(min(a,b)) space).
 */
export const levenshteinDistance = (a: string, b: string): number => {
 if (a === b) return 0;
 if (a.length === 0) return b.length;
 if (b.length === 0) return a.length;

 // Ensure 'a' is the shorter string to minimize memory
 if (a.length > b.length) {
  [a, b] = [b, a];
 }

 const alen = a.length;
 const blen = b.length;

 // Use two rows instead of full matrix
 let prevRow = new Int32Array(alen + 1);
 let currentRow = new Int32Array(alen + 1);

 // Initialize first row
 for (let i = 0; i <= alen; i++) {
  prevRow[i] = i;
 }

 for (let i = 1; i <= blen; i++) {
  currentRow[0] = i;
  const bChar = b.charCodeAt(i - 1);

  for (let j = 1; j <= alen; j++) {
   const cost = a.charCodeAt(j - 1) === bChar ? 0 : 1;
   currentRow[j] = Math.min(
    currentRow[j - 1] + 1, // insertion
    prevRow[j] + 1, // deletion
    prevRow[j - 1] + cost // substitution
   );
  }

  // Swap rows
  [prevRow, currentRow] = [currentRow, prevRow];
 }

 return prevRow[alen];
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

 const patLen = pattern.length;
 // Optimization: Pre-calculate threshold distance
 const maxDist = Math.floor(patLen * threshold);

 // Step size optimization: if pattern is long, we don't need to check every single char index
 // We can skip a few chars, but for accuracy we'll stick to 1 for now or dynamic based on length
 const step = patLen > 50 ? 5 : 1;

 for (let i = actualStartIndex; i < searchEndIndex; i += step) {
  // Check bounds
  if (i + patLen > text.length) break;

  // Quick check: First char must match OR be very close?
  // Skipping this for now to maintain fuzzy quality, but it's a possible optimization.

  const candidate = text.substring(i, i + patLen);

  // Early exit if length diff is too big (not applicable here as we slice same length)

  const dist = levenshteinDistance(pattern, candidate);

  // Early rejection based on raw distance
  if (dist > maxDist) continue;

  const ratio = dist / patLen;

  if (ratio < bestMatch.ratio) {
   bestMatch = {
    index: i,
    distance: dist,
    ratio: ratio,
   };

   // Perfect match found? Stop immediately
   if (dist === 0) break;
  }
 }

 if (bestMatch.ratio <= threshold) {
  return bestMatch;
 }

 return null;
};
