import React from "react";
import { interpolate } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Props = {
  lines: string[];
  fontSize?: number;
  color?: string;
  staggerFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Reveals each line of text with a staggered slide-up + fade.
 */
export const LineReveal: React.FC<Props> = ({
  lines,
  fontSize = 36,
  color = colors.purple[100],
  staggerFrames = timing.medium / 2,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({ staggerFrames, startFrame });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4em",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize,
        color,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const progress = stagger(i);
        return (
          <div
            key={`${i}-${line}`}
            style={{
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
