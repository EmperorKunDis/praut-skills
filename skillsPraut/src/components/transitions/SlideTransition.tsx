import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { frame as frameTokens, springs, timing } from "../../styles/tokens";

type Direction = "left" | "right" | "up" | "down";

type Props = {
  children: React.ReactNode;
  from?: Direction;
  startFrame?: number;
  durationFrames?: number;
};

const offsets: Record<Direction, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

/**
 * Slide transition using `springs.snappy` over `timing.fast`.
 */
export const SlideTransition: React.FC<Props> = ({
  children,
  from = "right",
  startFrame = 0,
  durationFrames = timing.fast,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.snappy,
    durationInFrames: durationFrames,
  });
  const [dx, dy] = offsets[from];
  const x = dx * frameTokens.width * (1 - progress);
  const y = dy * frameTokens.height * (1 - progress);

  return (
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};
