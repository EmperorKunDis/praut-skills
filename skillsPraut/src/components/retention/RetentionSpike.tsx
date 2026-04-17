import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  pulseColor?: string;
  style?: React.CSSProperties;
};

export const RetentionSpike: React.FC<Props> = ({
  children,
  pulseColor = colors.purple[600],
  style,
}) => {
  const frame = useCurrentFrame();
  const cycle = frame % 45;
  const pulseScale = interpolate(cycle, [0, 45], [1.0, 1.8]);
  const pulseOpacity = interpolate(cycle, [0, 45], [0.6, 0]);

  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div
        style={{
          position: "absolute",
          top: -8,
          left: -8,
          right: -8,
          bottom: -8,
          border: `2px solid ${pulseColor}`,
          borderRadius: 16,
          transform: `scale(${pulseScale})`,
          opacity: pulseOpacity,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};
