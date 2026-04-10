import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { timing } from "../../styles/tokens";

type Props = {
  from: React.ReactNode;
  to: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
};

/**
 * Cross-fade morph between two children using opacity + blur transition.
 */
export const MorphTransition: React.FC<Props> = ({
  from,
  to,
  startFrame = 0,
  durationFrames = timing.medium,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: 1 - progress,
          filter: `blur(${progress * 8}px)`,
        }}
      >
        {from}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: progress,
          filter: `blur(${(1 - progress) * 8}px)`,
        }}
      >
        {to}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
