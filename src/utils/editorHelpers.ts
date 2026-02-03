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
/**
 * Calculates the pixel position of the cursor within a textarea.
 */
export const getTextCursorPosition = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd } = textarea;
    const style = window.getComputedStyle(textarea);

    // Create a mirror div to replicate the textarea layout
    const div = document.createElement('div');
    const copyStyle = Array.from(style);
    copyStyle.forEach(prop => {
        div.style.setProperty(prop, style.getPropertyValue(prop));
    });

    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = style.width;

    // Get text before cursor and replace spaces/returns to ensure correct wrapping
    const text = textarea.value.substring(0, selectionStart);
    div.textContent = text;

    // Add a marker to get the coordinates
    const span = document.createElement('span');
    span.textContent = textarea.value.substring(selectionStart, selectionEnd) || '.';
    div.appendChild(span);

    document.body.appendChild(div);
    const spanRect = span.getBoundingClientRect();
    const divRect = div.getBoundingClientRect();
    document.body.removeChild(div);

    // Position relative to textarea top/left, accounting for scroll
    return {
        top: spanRect.top - divRect.top - textarea.scrollTop,
        left: spanRect.left - divRect.left - textarea.scrollLeft,
        height: spanRect.height
    };
};
