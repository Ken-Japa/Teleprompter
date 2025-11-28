export interface TagInsertionResult {
 newText: string;
 newSelectionStart: number;
 newSelectionEnd: number;
}

export const insertTagInText = (
 currentText: string,
 tag: string,
 selectionStart: number,
 selectionEnd: number
): TagInsertionResult => {
 const selectedText = currentText.substring(selectionStart, selectionEnd);
 const hasSelection = selectedText.length > 0;

 const content = hasSelection ? selectedText : "texto";
 const openTag = `<${tag}>`;
 const closeTag = `</${tag}>`;
 const insertion = `${openTag}${content}${closeTag}`;

 const newText = currentText.substring(0, selectionStart) + insertion + currentText.substring(selectionEnd);

 let newStart = 0;
 let newEnd = 0;

 if (hasSelection) {
  // Select the inner content again
  newStart = selectionStart + openTag.length;
  newEnd = selectionStart + openTag.length + content.length;
 } else {
  // Place cursor after the tag content
  const cursorPos = selectionStart + openTag.length + content.length;
  newStart = cursorPos;
  newEnd = cursorPos;
 }

 return {
  newText,
  newSelectionStart: newStart,
  newSelectionEnd: newEnd,
 };
};
