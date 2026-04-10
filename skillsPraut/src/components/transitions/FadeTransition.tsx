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
 * Fade in/out wrapper using `springs.smooth` over `timing.medium`.
 */
export const FadeTransition: React.FC<Props> = ({
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
  const opacity = direction === "in" ? progress : 1 - progress;

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
