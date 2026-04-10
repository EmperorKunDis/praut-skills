import React from "react";
import { Img, staticFile } from "remotion";
import { glow as glowTokens } from "../../styles/tokens";

type Props = {
  /** Height in px. Width scales automatically (aspect ~1.19:1). Defaults to 48. */
  size?: number;
  /** Apply brand active glow as a CSS filter. */
  glow?: boolean;
  /** Optional inline styles merged on top. */
  style?: React.CSSProperties;
};

/**
 * Praut brain puzzle mark — isolated SVG `public/logo/brain-mark.svg`.
 * Native viewBox 108×91 → wider than tall.
 * `size` controls HEIGHT; width auto-scales via aspect ratio.
 */
export const BrainMark: React.FC<Props> = ({
  size = 48,
  glow = false,
  style,
}) => {
  return (
    <Img
      src={staticFile("logo/logopraut.svg")}
      alt="Praut brain mark"
      style={{
        height: size,
        width: "auto",
        objectFit: "contain",
        filter: glow ? `drop-shadow(${glowTokens.active})` : undefined,
        ...style,
      }}
    />
  );
};
