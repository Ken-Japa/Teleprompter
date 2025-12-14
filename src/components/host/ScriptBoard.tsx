import { memo, useMemo } from "react";
import { Sentence } from "../../types";
import { SentenceItem } from "./script/SentenceItem";
import * as S from "../ui/Styled";
import { useTranslation } from '../../hooks/useTranslation';

interface ScriptBoardProps {
  sentences: Sentence[];
  isMirrored: boolean;
  isFlipVertical?: boolean;
  isUpperCase: boolean;
  isPro: boolean;
  theme: string;
  isMusicianMode?: boolean;
  fontSize?: number;
  margin?: number;
}

export const ScriptBoard = memo(({ sentences, isMirrored, isUpperCase, isPro, theme, isMusicianMode, fontSize = 60, margin = 10 }: ScriptBoardProps) => {
  const { t } = useTranslation();

  const watermarkIndexes = useMemo(() => {
    const indexes = [];
    for (let i = 0; i < sentences.length; i += 25) {
      indexes.push(i);
    }
    if (indexes.length > 0 && indexes[indexes.length - 1] !== sentences.length - 1) {
      indexes.push(sentences.length - 1);
    }
    return indexes;
  }, [sentences.length]);

  // Calculate Transforms
  const transforms = useMemo(() => {
    const t = [];
    if (isMirrored) t.push("scaleX(-1)");
    // isFlipVertical is handled by the parent scroll container to ensure correct scroll direction/anchoring
    t.push("translateZ(0)");
    return t.join(" ");
  }, [isMirrored]);

  // --- Musician Mode Smart Wrapping ---
  // Calculates dynamic line splitting to preserve Chord/Lyric alignment while preventing overflow.
  const processedSentences = useMemo(() => {
    if (!isMusicianMode) return sentences;

    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;

    // Calculate Dynamic Wrap Limit based on Font Size AND Margin
    // Being VERY conservative to ensure no overflow
    const safeFontSize = Math.max(20, fontSize || 60);
    const charWidth = safeFontSize * 0.7; // Conservative estimate for monospace width

    // Calculate Available Width after Margins
    // Margin is in %, applied to both sides.
    const safeMargin = margin || 0;
    const marginPx = width * (safeMargin / 100) * 2;

    // The container has max-w-7xl (80rem = 1280px typically)
    // So effective width is min of screen width and max container width
    const maxContainerWidth = 1280;
    const effectiveWidth = Math.min(width, maxContainerWidth);

    // Apply margins and use only 90% for safety (scrollbar, padding, etc)
    const availableWidth = (effectiveWidth - marginPx) * 0.90;

    // Calculate max chars, ensuring it's at least 15
    const maxChars = Math.max(15, Math.floor(availableWidth / charWidth));

    const newSentences: Sentence[] = [];
    let idCounter = 10000;

    const createFragment = (text: string, original: Sentence): Sentence => ({
      id: idCounter++,
      cleanContent: text,
      fragments: [{ text, type: original.fragments[0]?.type || "normal" }],
      isChord: original.isChord,
      startIndex: original.startIndex,
      command: original.command
    });

    for (let i = 0; i < sentences.length; i++) {
      const current = sentences[i];
      const next = sentences[i + 1];

      // Case 1: Chord Line followed by Lyric Line (Pair)
      if (current.isChord && next && !next.isChord) {
        let chordText = current.cleanContent;
        let lyricText = next.cleanContent;

        // Loop to split
        while (chordText.length > maxChars || lyricText.length > maxChars) {
          // Find best split point
          let splitIndex = maxChars;
          let foundCommon = false;

          // 1. Try to split at a common space in both lines (best for alignment)
          const range = 15;
          for (let k = maxChars; k > maxChars - range; k--) {
            if (chordText[k] === ' ' && lyricText[k] === ' ') {
              splitIndex = k;
              foundCommon = true;
              break;
            }
          }

          if (!foundCommon) {
            // 2. Prioritize space in Chord Line to avoid breaking chord names
            for (let k = maxChars; k > maxChars - range; k--) {
              if (chordText[k] === ' ' || chordText[k] === undefined) {
                splitIndex = k;
                break;
              }
            }
          }

          // Push Splitted Parts
          newSentences.push(createFragment(chordText.substring(0, splitIndex), current));
          newSentences.push(createFragment(lyricText.substring(0, splitIndex), next));

          // Advance
          chordText = chordText.substring(splitIndex);
          lyricText = lyricText.substring(splitIndex);
        }

        // Push Remainder
        if (chordText || lyricText) {
          newSentences.push(createFragment(chordText, current));
          newSentences.push(createFragment(lyricText, next));
        }

        i++; // Skip next since we processed it as a pair
      }
      else {
        // Case 2: Single Line (Chord or Lyric) being split on its own
        let text = current.cleanContent;
        while (text.length > maxChars) {
          let splitIndex = maxChars;
          // Find space to split
          for (let k = maxChars; k > maxChars - 15; k--) {
            if (text[k] === ' ') {
              splitIndex = k;
              break;
            }
          }
          newSentences.push(createFragment(text.substring(0, splitIndex), current));
          text = text.substring(splitIndex);
        }
        if (text) newSentences.push(createFragment(text, current));
      }
    }
    return newSentences;
  }, [sentences, isMusicianMode, fontSize, margin]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Watermarks atravessando toda a tela, mas texto centralizado */}
      {!isPro && watermarkIndexes.map((idx, i) => (
        <S.Watermark
          key={i}
          text={t('host.watermark')}
          theme={theme}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            zIndex: 0,
            top: `${(idx / sentences.length) * 100}%`,
            pointerEvents: "none"
          }}
        />
      ))}

      {/* Texto centralizado com margens dinâmicas */}
      <div
        className={`w-full max-w-7xl mx-auto transition-transform duration-300 ${isUpperCase ? "uppercase" : ""} hardware-accelerated`}
        style={{
          transform: transforms,
          paddingLeft: "var(--prompter-margin)",
          paddingRight: "var(--prompter-margin)",
        }}
      >
        <div
          className={`${isMusicianMode ? "font-mono whitespace-pre text-left" : "font-sans font-bold whitespace-pre-wrap text-center"} leading-tight outline-none transition-colors duration-500 text-optimize`}
          style={{ fontSize: "var(--prompter-font-size)" }}
        >
          {processedSentences.map((s: Sentence) => (
            <SentenceItem key={s.id} id={s.id} fragments={s.fragments} isChord={s.isChord} isMusicianMode={isMusicianMode} command={s.command} />
          ))}
        </div>
      </div>
    </div>
  );
});