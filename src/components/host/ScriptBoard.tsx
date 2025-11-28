import { memo } from "react";
import { Sentence } from "../../types";
import { SentenceItem } from "./script/SentenceItem";

interface ScriptBoardProps {
 sentences: Sentence[];
 isMirrored: boolean;
 isUpperCase: boolean;
}

export const ScriptBoard = memo(({ sentences, isMirrored, isUpperCase }: ScriptBoardProps) => {
 return (
  <div
   className={`w-full max-w-7xl mx-auto py-[45vh] transition-transform duration-300 ${isUpperCase ? "uppercase" : ""} hardware-accelerated`}
   style={{
    // Optimization: Combine transforms to ensure translateZ(0) is not overwritten by inline style
    transform: isMirrored ? "scaleX(-1) translateZ(0)" : "translateZ(0)",
    paddingLeft: "var(--prompter-margin)",
    paddingRight: "var(--prompter-margin)",
   }}
  >
   <div
    className="font-sans font-bold leading-tight whitespace-pre-wrap outline-none text-center transition-colors duration-500 text-optimize"
    style={{ fontSize: "var(--prompter-font-size)" }}
   >
    {sentences.map((s: Sentence) => (
     <SentenceItem key={s.id} id={s.id} fragments={s.fragments} />
    ))}
   </div>
  </div>
 );
});
