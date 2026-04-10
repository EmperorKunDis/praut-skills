import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "💡 Tip" callout — yellow border-left, navy background.
 */
export const TipCard: React.FC<Props> = ({
  title = "Tip",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.semantic.warning}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon
        name="lightbulb"
        size={24}
        color={colors.semantic.warning}
      />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
