import React from "react";
import { interpolate } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  staggerFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Reveals each word of `text` with a staggered fade + slide-up.
 */
export const WordReveal: React.FC<Props> = ({
  text,
  fontSize = 56,
  color = colors.purple[50],
  staggerFrames = timing.fast / 2,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({ staggerFrames, startFrame });
  const words = text.split(/\s+/);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.35em",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        color,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const progress = stagger(i);
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [16, 0])}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
