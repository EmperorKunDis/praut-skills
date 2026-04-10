import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  myth: string;
  fact: string;
  style?: React.CSSProperties;
};

/**
 * Side-by-side "Mýtus" vs "Pravda" cards with semantic borders.
 */
export const MythVsFact: React.FC<Props> = ({ myth, fact, style }) => {
  return (
    <div style={{ display: "flex", gap: 24, ...style }}>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.warning}`,
          borderRadius: 8,
          padding: "24px 32px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 12,
          }}
        >
          Mýtus
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 22,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.4,
          }}
        >
          {myth}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.success}`,
          borderRadius: 8,
          padding: "24px 32px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.success,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 12,
          }}
        >
          Pravda
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 22,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.4,
          }}
        >
          {fact}
        </div>
      </div>
    </div>
  );
};
