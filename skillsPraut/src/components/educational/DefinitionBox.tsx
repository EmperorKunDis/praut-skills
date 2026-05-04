import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";

type Props = {
  term: string;
  definition: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Subtle definition tooltip — small, unobtrusive, never competes with main content.
 * Used by DefOverlay as a secondary footnote-level element.
 */
export const DefinitionBox: React.FC<Props> = ({ term, definition, style }) => {
  const pLabel = useEnterExit({ delay: 0 });
  const pTerm = useEnterExit({ delay: 6 });
  const pDef = useEnterExit({ delay: 12 });

  return (
    <div
      style={{
        background: gradients.card,
        borderLeft: `3px solid ${colors.purple[600]}`,
        borderRadius: 8,
        padding: "16px 24px",
        maxWidth: 600,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 6,
          fontWeight: fontWeight.body,
          opacity: pLabel,
        }}
      >
        Definice
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 18,
          color: colors.purple[200],
          marginBottom: 6,
          opacity: pTerm,
          transform: `translateY(${(1 - pTerm) * 20}px)`,
        }}
      >
        {term}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 14,
          fontWeight: fontWeight.body,
          color: colors.purple[300],
          lineHeight: 1.4,
          opacity: pDef,
        }}
      >
        {definition}
      </div>
    </div>
  );
};
