import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
};

/**
 * RGB-split glitch — three offset color channels for `durationFrames` frames.
 */
export const GlitchTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.fast,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const t = Math.max(0, Math.min(1, local / durationFrames));
  const intensity = (1 - t) * 8;
  const wobble = Math.sin(local * 1.7) * intensity;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${wobble}px)`,
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 0 ${colors.semantic.error})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${-wobble}px)`,
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 0 ${colors.blue[400]})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateY(${wobble * 0.5}px)`,
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 0 ${colors.purple[600]})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
