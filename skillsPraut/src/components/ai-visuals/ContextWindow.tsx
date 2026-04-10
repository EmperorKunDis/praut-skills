import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type Props = {
  tokens: string[];
  windowStart: number;
  windowSize: number;
  style?: React.CSSProperties;
};

/**
 * Visualizes a sliding context window over a token sequence.
 * Tokens inside the window are highlighted in brand purple.
 */
export const ContextWindow: React.FC<Props> = ({
  tokens,
  windowStart,
  windowSize,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      fontFamily: fonts.mono,
      fontSize: 14,
      ...style,
    }}
  >
    {tokens.map((tok, i) => {
      const inWindow = i >= windowStart && i < windowStart + windowSize;
      return (
        <span
          key={i}
          style={{
            background: inWindow
              ? withOpacity(colors.purple[600], 0.4)
              : colors.navy[800],
            color: inWindow ? colors.purple[50] : colors.purple[300],
            padding: "4px 8px",
            borderRadius: 4,
            border: inWindow
              ? `1px solid ${colors.purple[400]}`
              : `1px solid ${colors.navy[700]}`,
          }}
        >
          {tok}
        </span>
      );
    })}
  </div>
);
