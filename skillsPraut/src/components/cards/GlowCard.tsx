import React from "react";
import {
  colors,
  frame,
  glow,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
};

/**
 * Standard branded card — gradient bg, purple border at 40% opacity, subtle glow.
 */
export const GlowCard: React.FC<Props> = ({
  children,
  padding = 32,
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: frame.borderRadius * 3,
        padding,
        boxShadow: glow.subtle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
