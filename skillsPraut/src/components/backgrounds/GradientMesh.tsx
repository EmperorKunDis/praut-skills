import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../../styles/tokens";

/**
 * Subtle animated gradient mesh blending navy/purple/blue.
 * Used as a backdrop for hero / chapter slides.
 */
export const GradientMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % 600) / 600;
  const offsetA = `${50 + Math.sin(t * Math.PI * 2) * 12}% ${50 + Math.cos(t * Math.PI * 2) * 8}%`;
  const offsetB = `${50 - Math.sin(t * Math.PI * 2) * 8}% ${50 - Math.cos(t * Math.PI * 2) * 12}%`;

  return (
    <AbsoluteFill
      style={{
        background: `
					radial-gradient(circle at ${offsetA}, ${colors.purple[800]}55 0%, transparent 55%),
					radial-gradient(circle at ${offsetB}, ${colors.blue[700]}55 0%, transparent 55%),
					${colors.navy[950]}
				`,
      }}
    />
  );
};
