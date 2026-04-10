import React from "react";
import { colors, frame, withOpacity } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
};

/**
 * Glassmorphism card — semi-transparent navy with backdrop blur.
 */
export const GlassCard: React.FC<Props> = ({
  children,
  padding = 32,
  style,
}) => {
  return (
    <div
      style={{
        background: "rgba(15,20,64,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${withOpacity(colors.purple[600], 0.18)}`,
        borderRadius: frame.borderRadius * 3,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
