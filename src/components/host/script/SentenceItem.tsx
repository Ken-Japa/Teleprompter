import { memo } from "react";
import { TextFragment } from "../../../types";
import { TextFragmentItem } from "./TextFragmentItem";

interface SentenceItemProps {
 id: number;
 fragments: TextFragment[];
}

export const SentenceItem = memo(
 ({ id, fragments }: SentenceItemProps) => {
  return (
   <span id={`sentence-${id}`} className="sentence-item content-visibility-auto block min-h-[1em]">
    {fragments.map((frag, i) => (
     <TextFragmentItem key={i} fragment={frag} />
    ))}{" "}
   </span>
  );
 },
 (prev, next) => prev.id === next.id && prev.fragments === next.fragments
);
