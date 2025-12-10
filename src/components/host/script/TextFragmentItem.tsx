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

 if (fragment.type === "normal") return <>{fragment.text}</>;

 return (
  <span className={`rounded px-1 mx-0.5 box-decoration-clone ${getFragmentClasses(fragment.type)}`}>
   {fragment.text}
  </span>
 );
});
