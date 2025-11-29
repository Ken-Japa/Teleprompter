import { memo } from "react";
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
}

export const ScriptBoard = memo(({ sentences, isMirrored, isFlipVertical, isUpperCase, isPro, theme }: ScriptBoardProps) => {
  const { t } = useTranslation();

  const watermarkIndexes = [];
  for (let i = 0; i < sentences.length; i += 25) {
    watermarkIndexes.push(i);
  }
  if (watermarkIndexes[watermarkIndexes.length - 1] !== sentences.length - 1) {
    watermarkIndexes.push(sentences.length - 1);
  }

  // Calculate Transforms
  const transforms = [];
  if (isMirrored) transforms.push("scaleX(-1)");
  if (isFlipVertical) transforms.push("scaleY(-1)");
  transforms.push("translateZ(0)");

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
          transform: transforms.join(" "),
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
    </div>
  );
});