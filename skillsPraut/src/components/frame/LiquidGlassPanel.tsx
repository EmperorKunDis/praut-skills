import React from "react";
import { colors, glow, withOpacity } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  /** Blur radius in px. Defaults to 20. */
  blur?: number;
  /** Background opacity 0..1. Defaults to 0.65. */
  bgOpacity?: number;
  /** Border radius. Defaults to 20. */
  borderRadius?: number;
  /** Show a subtle brand border. Defaults to true. */
  showBorder?: boolean;
  /** Apply subtle glow on the border. Defaults to true. */
  showGlow?: boolean;
  /** Inset from the parent edges. Defaults to 28. */
  inset?: number;
  style?: React.CSSProperties;
};

/**
 * Glassmorphism overlay panel.
 *
 * Renders an absolutely positioned frosted-glass rectangle over the
 * SpiralGalaxy background. Children (charts, text, cards) sit inside
 * and are fully readable. The galaxy shows through the blur.
 *
 * Used automatically by `<PrautVideoFrame>` to wrap all content.
 * Can also be used standalone for partial-glass effects.
 */
export const LiquidGlassPanel: React.FC<Props> = ({
  children,
  blur = 20,
  bgOpacity = 0.65,
  borderRadius = 20,
  showBorder = true,
  showGlow = true,
  inset = 28,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: inset,
        left: inset,
        right: inset,
        bottom: inset,
        borderRadius,
        background: `rgba(6, 8, 24, ${bgOpacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: showBorder
          ? `1px solid ${withOpacity(colors.blue[400], 0.25)}`
          : undefined,
        boxShadow: showGlow ? glow.card : undefined,
        overflow: "hidden",
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
