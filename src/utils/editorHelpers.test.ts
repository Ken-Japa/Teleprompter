import { describe, it, expect } from "vitest";
import { insertTagInText } from "./editorHelpers";

describe("editorHelpers", () => {
 describe("insertTagInText", () => {
  it("should wrap selected text with tag", () => {
   const text = "Hello World";
   const tag = "b";
   // Select "World" -> indices 6 to 11
   const result = insertTagInText(text, tag, 6, 11);

   expect(result.newText).toBe("Hello <b>World</b>");
   // Selection should wrap inner content: start + <tag> length
   expect(result.newSelectionStart).toBe(6 + 3); // 6 + 3 = 9
   // end + <tag> length
   expect(result.newSelectionEnd).toBe(11 + 3); // 11 + 3 = 14
  });

  it("should insert empty tag with default text if no selection", () => {
   const text = "Hello ";
   const tag = "i";
   // Cursor at end -> index 6
   const result = insertTagInText(text, tag, 6, 6);

   expect(result.newText).toBe("Hello <i>texto</i>");
   // Cursor should be after the tag content (before closing tag)
   // 6 + <i>(3) + texto(5) = 14
   const expectedCursor = 6 + 3 + 5;
   expect(result.newSelectionStart).toBe(expectedCursor);
   expect(result.newSelectionEnd).toBe(expectedCursor);
  });

  it("should handle tag insertion at start of text", () => {
   const text = "World";
   const tag = "span";
   const result = insertTagInText(text, tag, 0, 0);
   expect(result.newText).toBe("<span>texto</span>World");
  });
 });
});
