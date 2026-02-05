import { levenshteinDistance, findBestMatch, findSegmentedMatch } from "./stringSimilarity";

describe("stringSimilarity Utils", () => {
  describe("levenshteinDistance", () => {
    it("should return 0 for identical strings", () => {
      expect(levenshteinDistance("hello", "hello")).toBe(0);
    });

    it("should calculate correct distance for basic operations", () => {
      expect(levenshteinDistance("kitten", "sitting")).toBe(3); // k->s, e->i, +g
      expect(levenshteinDistance("sunday", "saturday")).toBe(3);
    });

    it("should handle empty strings", () => {
      expect(levenshteinDistance("", "abc")).toBe(3);
      expect(levenshteinDistance("abc", "")).toBe(3);
      expect(levenshteinDistance("", "")).toBe(0);
    });

    it("should be case sensitive", () => {
      expect(levenshteinDistance("Hello", "hello")).toBe(1);
    });
  });

  describe("findBestMatch", () => {
    const text = "This is a long text used for testing the fuzzy search functionality.";

    it("should find exact match", () => {
      const pattern = "testing";
      const result = findBestMatch(text, pattern);
      expect(result).not.toBeNull();
      expect(result?.distance).toBe(0);
      expect(text.substring(result!.index, result!.index + pattern.length)).toBe(pattern);
    });

    it("should find fuzzy match with typos", () => {
      const pattern = "tsting"; // Missing 'e'
      const result = findBestMatch(text, pattern);

      expect(result).not.toBeNull();
      // "testing" vs "tsting" distance is 1
      expect(result?.distance).toBeLessThanOrEqual(1);

      // Should point to where "testing" starts
      const expectedIndex = text.indexOf("testing");
      // The match index might vary slightly depending on implementation details of sliding window,
      // but it should be close to expected index.
      expect(Math.abs(result!.index - expectedIndex)).toBeLessThan(2);
    });

    it("should respect threshold", () => {
      const pattern = "xyz123"; // Completely different
      const result = findBestMatch(text, pattern, 0, 100, 0.2);
      expect(result).toBeNull();
    });

    it("should respect search window", () => {
      // "functionality" is at the end
      const pattern = "functionality";

      // Search only first 20 chars
      const result = findBestMatch(text, pattern, 0, 20);
      expect(result).toBeNull();

      // Search full text
      const resultFull = findBestMatch(text, pattern, 0, 100);
      expect(resultFull).not.toBeNull();
    });

    it("should handle patterns larger than text gracefully", () => {
      const result = findBestMatch("short", "longer pattern");
      expect(result).toBeNull();
    });
  });

  describe("findSegmentedMatch", () => {
    const text = "O rato roeu a roupa do rei de Roma.";

    it("should find a match when segments are close together (sequential cluster)", () => {
      const transcript = "o rato roeu a roupa do rei";
      const result = findSegmentedMatch(text, transcript, 0, 100);

      expect(result).not.toBeNull();
      expect(result?.confidence).toBeGreaterThan(0.5);
    });

    it("should reject isolated matches (no cluster)", () => {
      const transcript = "o elefante roeu o castelo";
      const result = findSegmentedMatch(text, transcript, 0, 100);

      expect(result).toBeNull();
    });

    it("should find match with slightly differing words", () => {
      const transcript = "o rato roeu a ropa do rei"; // "ropa" instead of "roupa"
      const result = findSegmentedMatch(text, transcript, 0, 100);

      expect(result).not.toBeNull();
    });

    it("should find match even with aggressive normalization", () => {
      const transcript = "O RATO ROEU A ROUPA!!! 123";
      const result = findSegmentedMatch(text, transcript, 0, 100);

      expect(result).not.toBeNull();
    });
  });
});
