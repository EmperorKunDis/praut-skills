import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, withOpacity } from "../../styles/tokens";

type Props = {
  gap?: number;
};

/**
 * CRT scanline overlay — alternating purple-tinted bands.
 */
export const ScanlineEffect: React.FC<Props> = ({ gap = 4 }) => {
  const line = withOpacity(colors.purple[100], 0.05);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg, ${line} 0px, ${line} 1px, transparent 1px, transparent ${gap}px)`,
      }}
    />
  );
};
