import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "✓ OK" callout — green border, check icon.
 */
export const SuccessCard: React.FC<Props> = ({
  title = "Hotovo",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.semantic.success}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon
        name="check-circle"
        size={26}
        color={colors.semantic.success}
      />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.success,
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
