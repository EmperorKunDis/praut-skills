import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  formula: string;
  caption?: string;
  style?: React.CSSProperties;
};

/**
 * Mathematical formula display. KaTeX is intentionally NOT a dependency —
 * pass the formula as a pre-formatted plain string for now.
 */
export const FormulaDisplay: React.FC<Props> = ({
  formula,
  caption,
  style,
}) => (
  <div
    style={{
      textAlign: "center",
      padding: "40px 60px",
      background: colors.navy[900],
      borderRadius: 12,
      border: `1px solid ${colors.purple[600]}33`,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 42,
        color: colors.purple[100],
        fontWeight: fontWeight.bodyEmphasis,
      }}
    >
      {formula}
    </div>
    {caption ? (
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.primary,
          fontSize: 14,
          color: colors.purple[300],
        }}
      >
        {caption}
      </div>
    ) : null}
  </div>
);
