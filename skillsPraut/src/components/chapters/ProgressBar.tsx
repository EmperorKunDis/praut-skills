import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, glow, gradients } from "../../styles/tokens";

type Props = {
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Auto-progress bar driven by composition timeline.
 * Track navy[700], fill brand-primary gradient with subtle glow.
 */
export const ProgressBar: React.FC<Props> = ({ height = 4, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const percent = Math.min(1, frame / Math.max(1, durationInFrames));

  return (
    <div
      style={{
        width: "100%",
        height,
        background: colors.navy[700],
        ...style,
      }}
    >
      <div
        style={{
          width: `${percent * 100}%`,
          height: "100%",
          background: gradients.brandPrimary,
          boxShadow: glow.subtle,
        }}
      />
    </div>
  );
};
