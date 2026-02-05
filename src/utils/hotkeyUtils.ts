/**
 * Utility for handling keyboard shortcuts consistently.
 */

/**
 * Returns a standardized string representation of a keyboard event.
 * Format: [Control+][Shift+][Alt+][Meta+]Code
 * Example: "Control+KeyB", "Shift+ArrowUp", "KeyA"
 */
export const getEventHotkey = (e: KeyboardEvent | React.KeyboardEvent): string => {
    const parts: string[] = [];
    if (e.ctrlKey) parts.push("Control");
    if (e.shiftKey) parts.push("Shift");
    if (e.altKey) parts.push("Alt");
    if (e.metaKey) parts.push("Meta");
    parts.push(e.code);
    return parts.join("+");
};

/**
 * Resolves the "Mod" keyword to the appropriate platform key.
 * On Windows/Linux/Mac, we default to "Control" for PromptNinja shortcuts
 * to avoid conflicts with system shortcuts on macOS.
 */
export const resolveHotkeyMod = (hotkey: string): string => {
    if (!hotkey) return hotkey;
    // Always use Control for "Mod" on all platforms for this app
    return hotkey.replace("Mod", "Control");
};

/**
 * Formats a standardized hotkey string for display.
 * Example: "Control+KeyB" -> "Ctrl+B"
 */
export const formatHotkeyForDisplay = (hotkey: string): string => {
    if (!hotkey) return "—";

    return hotkey
        .split("+")
        .map(part => {
            switch (part) {
                case "Control": return "Ctrl";
                case "Mod": return "Ctrl";
                case "Shift": return "Shift";
                case "Alt": return "Alt";
                case "Meta": return "Meta";
                default:
                    // Remove "Key" or "Digit" prefix if present
                    return part.replace(/^Key/, "").replace(/^Digit/, "");
            }
        })
        .join("+");
};
