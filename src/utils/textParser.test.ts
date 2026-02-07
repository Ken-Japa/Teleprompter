import { describe, it, expect } from "vitest";
import { parseTextToSentences } from "./textParser";

describe("parseTextToSentences", () => {
    it("Should handle empty text", () => {
        const result = parseTextToSentences("");
        expect(result.sentences).toHaveLength(0);
        expect(result.fullCleanText).toBe("");
        expect(result.charToSentenceMap).toHaveLength(0);
    });

    it("Should parse simple single sentence", () => {
        const text = "Hello World.";
        const result = parseTextToSentences(text);
        expect(result.sentences).toHaveLength(1);
        expect(result.sentences[0].cleanContent).toBe("Hello World.");
        expect(result.sentences[0].fragments[0].text).toBe("Hello World.");
    });

    it("Should split multiple sentences", () => {
        const text = "First sentence. Second sentence!";
        const result = parseTextToSentences(text);
        expect(result.sentences).toHaveLength(2);
        expect(result.sentences[0].cleanContent).toBe("First sentence.");
        expect(result.sentences[1].cleanContent).toBe("Second sentence!");
    });

    it("Should handle color tags", () => {
        const text = "Normal <r>Red</r> <g>Green</g>";
        const result = parseTextToSentences(text);
        const fragments = result.sentences[0].fragments;

        expect(fragments.some((f) => f.text.trim() === "Red" && f.type === "red")).toBe(true);
        expect(fragments.some((f) => f.text.trim() === "Green" && f.type === "green")).toBe(true);
    });

    it("Should handle tags across sentences", () => {
        const text = "<y>Yellow start. Yellow end.</y>";
        const result = parseTextToSentences(text);

        expect(result.sentences).toHaveLength(2);
        expect(result.sentences[0].fragments[0].type).toBe("yellow");
        expect(result.sentences[1].fragments[0].type).toBe("yellow");
    });

    it("Should handle newlines as sentence breaks", () => {
        const text = "Line 1\nLine 2";
        const result = parseTextToSentences(text);

        expect(result.sentences).toHaveLength(2);
        expect(result.sentences[0].cleanContent).toContain("Line 1");
        expect(result.sentences[1].cleanContent).toContain("Line 2");
    });

    it("Should ignore text in angle brackets for voice parsing", () => {
        const text = "Hello <wave> world. <action>Go";
        const result = parseTextToSentences(text);

        // Visually it should remain
        expect(result.sentences[0].cleanContent).toContain("<wave>");

        // Voice text should strip it
        // "Hello <wave> world." -> "hello world"
        // "<action>Go" -> "go"
        expect(result.fullCleanText).toBe("hello world go");
    });

    it("Should handle square brackets as red (always enabled)", () => {
        const text = "Normal [Bracket] Text";
        const result = parseTextToSentences(text);
        const fragments = result.sentences[0].fragments;
        expect(fragments.find(f => f.text === "[Bracket]")?.type).toBe("red");
    });

    it("Should handle angle brackets as blue only when autoColorBrackets is true", () => {
        const text = "Normal <Angle> Text";

        // Disabled
        const resultOff = parseTextToSentences(text, false);
        expect(resultOff.sentences[0].fragments.find(f => f.text === "<Angle>")?.type).toBe("normal");

        // Enabled
        const resultOn = parseTextToSentences(text, true);
        expect(resultOn.sentences[0].fragments.find(f => f.text === "<Angle>")?.type).toBe("blue");
    });

    it("Should not color angle brackets for known style tags even if autoColorBrackets is true", () => {
        const text = "Text <b>Bold</b> Text";
        const result = parseTextToSentences(text, true);
        // Style tags should be processed normally and not colored blue as a bracket item
        expect(result.sentences[0].fragments.some(f => f.text === "Bold" && f.bold)).toBe(true);
    });

    it("Should not color very long or multiline brackets", () => {
        const text = "[Too long " + "a".repeat(101) + "]";
        const result = parseTextToSentences(text, true);
        expect(result.sentences[0].fragments[0].type).toBe("normal");

        const textMultiline = "[Multi\nLine]";
        const resultML = parseTextToSentences(textMultiline, true);
        expect(resultML.sentences.some(s => s.fragments.some(f => f.text.includes("[Multi") && f.type === "normal"))).toBe(true);
    });
    it("Should mark sentences with only non-voice content as isInertial", () => {
        const text = "[STOP]\n<wave>\nHello world.";
        const result = parseTextToSentences(text);

        expect(result.sentences).toHaveLength(3);
        expect(result.sentences[0].isInertial).toBe(true); // [STOP]
        expect(result.sentences[1].isInertial).toBe(true); // <wave>
        expect(result.sentences[2].isInertial).toBe(false); // Hello world.
        expect(result.sentences[2].cleanContent).toBe("Hello world.");
    });

    it("Should handle chord lines as isInertial if isMusicianMode is true", () => {
        const text = "C G Am F\nLet it be.";
        const result = parseTextToSentences(text, false, true); // musician mode

        expect(result.sentences).toHaveLength(2);
        expect(result.sentences[0].isInertial).toBe(true); // chords
        expect(result.sentences[1].isInertial).toBe(false); // lyrics
    });
});
