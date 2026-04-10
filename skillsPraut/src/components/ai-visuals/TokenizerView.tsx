import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  seriesColors,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  tokens: string[];
  style?: React.CSSProperties;
};

/**
 * Visualizes tokenization — each token rendered as a colored chip.
 * Cycles through brand series colors.
 */
export const TokenizerView: React.FC<Props> = ({ tokens, style }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      fontFamily: fonts.mono,
      fontSize: 22,
      ...style,
    }}
  >
    {tokens.map((tok, i) => {
      const color = seriesColors[i % seriesColors.length];
      return (
        <span
          key={i}
          style={{
            background: withOpacity(color, 0.2),
            border: `1px solid ${withOpacity(color, 0.6)}`,
            color: colors.purple[100],
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: fontWeight.bodyEmphasis,
            whiteSpace: "pre",
          }}
        >
          {tok}
        </span>
      );
    })}
  </div>
);
