import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors, glow as glowTokens } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: "subtle" | "strong" | "pulsing";
  style?: React.CSSProperties;
};

export const NeonHighlight: React.FC<Props> = ({
  children,
  glowColor = colors.purple[600],
  intensity = "subtle",
  style,
}) => {
  const frame = useCurrentFrame();
  const pulseVal =
    intensity === "pulsing" ? 0.6 + 0.4 * ((Math.sin(frame * 0.1) + 1) / 2) : 1;
  const shadowSize = intensity === "subtle" ? "10px" : "20px";
  const shadowSize2 = intensity === "subtle" ? "20px" : "40px";

  return (
    <span
      style={{
        textShadow: `0 0 ${shadowSize} ${glowColor}, 0 0 ${shadowSize2} ${glowColor}`,
        opacity: pulseVal,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
