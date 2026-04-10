import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs } from "../styles/tokens";

type SpringConfig = typeof springs.smooth;

type Options = {
  from?: number;
  to: number;
  startFrame?: number;
  config?: SpringConfig;
};

/**
 * Animated count-up using a spring (defaults to `springs.smooth`).
 * Returns the current numeric value at the current frame.
 */
export const useCountUp = ({
  from = 0,
  to,
  startFrame = 0,
  config = springs.smooth,
}: Options): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config,
  });
  return from + (to - from) * progress;
};
