import { describe, it, expect } from "vitest";
import { levenshteinDistance, findBestMatch } from "./stringSimilarity";

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
      // Implementation might return null or best effort.
      // Given the implementation check `if (i + patLen > text.length) break;`, 
      // it likely won't find a match if pattern > text remainder.
      expect(result).toBeNull();
    });
  });
});
