import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
};

/**
 * Wipe transition — purple gradient mask sweeps across, revealing children.
 */
export const WipeTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.medium,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `inset(0 ${100 - progress - 5}% 0 ${progress}%)`,
          background: colors.purple[600],
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
