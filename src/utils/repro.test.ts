import { findSegmentedMatch } from "./stringSimilarity";
import { describe, it, expect } from "vitest";

describe("findSegmentedMatch Minimal Repro", () => {
    const text = "O rato roeu a roupa do rei de Roma.";

    it("debug exact match", () => {
        const transcript = "o rato roeu a";
        // Force verbose logging by spying or just console.log
        console.log("Starting test...");
        const result = findSegmentedMatch(text, transcript, 0, 100);
        console.log("MATCH RESULT:", result);
        expect(result).not.toBeNull();
    });
});
