import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  term: string;
  definition: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "Co je to X?" definition box — gradient card, purple left border.
 */
export const DefinitionBox: React.FC<Props> = ({ term, definition, style }) => (
  <div
    style={{
      background: gradients.card,
      borderLeft: `4px solid ${colors.purple[600]}`,
      borderRadius: 12,
      padding: "36px 48px",
      maxWidth: 1200,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.purple[200],
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 12,
        fontWeight: fontWeight.bodyEmphasis,
      }}
    >
      Definice
    </div>
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 36,
        color: colors.purple[50],
        marginBottom: 16,
      }}
    >
      {term}
    </div>
    <div
      style={{
        fontFamily: fonts.primary,
        fontSize: 22,
        fontWeight: fontWeight.body,
        color: colors.purple[100],
        lineHeight: 1.5,
      }}
    >
      {definition}
    </div>
  </div>
);
