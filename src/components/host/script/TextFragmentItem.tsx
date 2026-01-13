import { memo } from "react";
import { TextFragment } from "../../../types";

export const TextFragmentItem = memo(({ fragment }: { fragment: TextFragment }) => {
  /**
   * Returns the Tailwind classes for the specific fragment type.
   * Maps logical types (red, yellow, etc) to visual styles.
   */
  const getFragmentClasses = (type: string) => {
    switch (type) {
      case "red":
        return "text-red-500 bg-red-500/10";
      case "yellow":
        return "text-yellow-500 bg-yellow-500/10";
      case "green":
        return "text-green-500 bg-green-500/10";
      case "blue":
        return "text-blue-500 bg-blue-500/10";
      default:
        return "";
    }
  };

  // Build style classes for bold and italic
  const styleClasses = `${fragment.bold ? 'inline-block' : ''} ${fragment.italic ? 'italic' : ''}`.trim();

  // Inline styles for bold - using scale for visual emphasis with proper spacing
  const inlineStyle = fragment.bold ? {
    fontWeight: 900,
    transform: 'scale(1.15)',
    display: 'inline-block',
    marginLeft: '0.5em',
    marginRight: '0.5em'
  } : undefined;

  // If it's a normal fragment without any color
  if (fragment.type === "normal") {
    // But it might still have bold/italic
    if (styleClasses || inlineStyle) {
      return <span className={styleClasses} style={inlineStyle}>{fragment.text}</span>;
    }
    return <>{fragment.text}</>;
  }

  // Fragment has color, combine with bold/italic if present
  const combinedClasses = `rounded px-1 mx-0.5 box-decoration-clone ${getFragmentClasses(fragment.type)} ${styleClasses}`.trim();

  return (
    <span className={combinedClasses} style={inlineStyle}>
      {fragment.text}
    </span>
  );
});
