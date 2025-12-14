import { memo } from "react";
import { TextFragment } from "../../../types";
import { TextFragmentItem } from "./TextFragmentItem";

interface SentenceItemProps {
    id: number;
    fragments: TextFragment[];
    isChord?: boolean;
    isMusicianMode?: boolean;
}

export const SentenceItem = memo(
    ({ id, fragments, isChord, isMusicianMode }: SentenceItemProps) => {
        // Musician Mode Styling Logic
        const className = `sentence-item content-visibility-auto block min-h-[1em] ${isMusicianMode
            ? `font-mono whitespace-pre ${isChord ? "text-yellow-400 font-bold" : "text-white"}`
            : ""
            }`;

        return (
            <span id={`sentence-${id}`} className={className}>
                {fragments.map((frag, i) => (
                    <TextFragmentItem key={i} fragment={frag} />
                ))}{" "}
            </span>
        );
    },
    (prev, next) =>
        prev.id === next.id &&
        prev.fragments === next.fragments &&
        prev.isMusicianMode === next.isMusicianMode &&
        prev.isChord === next.isChord
);
