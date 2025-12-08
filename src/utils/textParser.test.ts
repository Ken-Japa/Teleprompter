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
});
