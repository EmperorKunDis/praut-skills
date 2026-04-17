import React from "react";
import { Img, staticFile } from "remotion";
import { glow as glowTokens } from "../../styles/tokens";

type Props = {
  /** Size in px (width = height, square). Defaults to 48. */
  size?: number;
  /** Apply brand active glow as a CSS filter. */
  glow?: boolean;
  /** Optional inline styles merged on top. */
  style?: React.CSSProperties;
};

/**
 * Praut brain puzzle mark — renders `public/logo/praut-logo.png`.
 * `size` controls both width and height (square).
 */
export const BrainMark: React.FC<Props> = ({
  size = 48,
  glow = false,
  style,
}) => {
  return (
    <Img
      src={staticFile("logo/praut-logo.png")}
      alt="Praut brain mark"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: glow ? `drop-shadow(${glowTokens.active})` : undefined,
        ...style,
      }}
    />
  );
};
