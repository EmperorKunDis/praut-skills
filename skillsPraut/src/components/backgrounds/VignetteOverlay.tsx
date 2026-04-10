import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";

type Props = {
  strength?: number;
};

/**
 * Radial vignette that darkens the corners towards `frame.bg`.
 */
export const VignetteOverlay: React.FC<Props> = ({ strength = 0.7 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse at center, transparent 40%, ${frame.bg} ${100 * strength}%)`,
    }}
  />
);
