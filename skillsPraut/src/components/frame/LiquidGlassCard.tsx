import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors, withOpacity } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  refractionStrength?: "subtle" | "medium" | "strong";
  borderColor?: string;
  width?: number;
  style?: React.CSSProperties;
};

const blurMap = { subtle: 12, medium: 20, strong: 30 };

export const LiquidGlassCard: React.FC<Props> = ({
  children,
  refractionStrength = "medium",
  borderColor = colors.blue[400],
  width,
  style,
}) => {
  const frame = useCurrentFrame();
  const highlightPos = interpolate(frame % 120, [0, 120], [-50, 150]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width,
        maxWidth: width ?? 600,
        background: "rgba(15,20,64,0.6)",
        backdropFilter: `blur(${blurMap[refractionStrength]}px)`,
        WebkitBackdropFilter: `blur(${blurMap[refractionStrength]}px)`,
        border: `1px solid ${withOpacity(borderColor, 0.2)}`,
        borderRadius: 16,
        padding: "28px 32px",
        ...style,
      }}
    >
      {/* Animated specular highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, transparent ${highlightPos - 20}%, rgba(255,255,255,0.04) ${highlightPos}%, transparent ${highlightPos + 20}%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};
