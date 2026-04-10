import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
};

/**
 * Big "💡 Key takeaway" callout — gradient card with warning border.
 */
export const KeyTakeaway: React.FC<Props> = ({
  children,
  label = "Key takeaway",
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${colors.semantic.warning}66`,
        borderLeft: `6px solid ${colors.semantic.warning}`,
        borderRadius: 12,
        padding: "40px 56px",
        maxWidth: 1100,
        boxShadow: glow.subtle,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <PhosphorIcon
          name="lightbulb-filament"
          size={28}
          color={colors.semantic.warning}
        />
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 28,
          fontWeight: fontWeight.heading,
          color: colors.purple[50],
          lineHeight: 1.4,
        }}
      >
        {children}
      </div>
    </div>
  );
};
