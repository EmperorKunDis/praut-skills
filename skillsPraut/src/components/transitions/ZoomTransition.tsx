import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springs, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
  direction?: "in" | "out";
};

/**
 * Scale-zoom transition using `springs.smooth`.
 */
export const ZoomTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.medium,
  direction = "in",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.smooth,
    durationInFrames: durationFrames,
  });
  const scale =
    direction === "in" ? 0.8 + progress * 0.2 : 1 + (1 - progress) * 0.2;

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, opacity: progress }}>
      {children}
    </AbsoluteFill>
  );
};
