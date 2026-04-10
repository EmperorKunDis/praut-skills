import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";

type Props = {
  before: React.ReactNode;
  after: React.ReactNode;
  width?: number;
  height?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Before/After comparison with an animated divider that sweeps from left
 * to right, revealing "after" beneath "before".
 */
export const BeforeAfterSlider: React.FC<Props> = ({
  before,
  after,
  width = 1200,
  height = 600,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame - startFrame, [0, timing.reveal], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 12,
        overflow: "hidden",
        border: `2px solid ${colors.blue[400]}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>{after}</div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${sweep}% 0 0)`,
        }}
      >
        {before}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${100 - sweep}%`,
          width: 3,
          background: colors.blue[400],
          boxShadow: glow.active,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[100],
          background: colors.navy[900],
          padding: "6px 12px",
          borderRadius: 4,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        PŘED
      </div>
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[100],
          background: colors.navy[900],
          padding: "6px 12px",
          borderRadius: 4,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        PO
      </div>
    </div>
  );
};
