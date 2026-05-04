import { useCurrentFrame, interpolate } from "remotion";

type ParallaxConfig = {
  speed: number;
  direction?: "horizontal" | "vertical";
  range?: number;
  durationInFrames: number;
};

export const useParallax = (opts: ParallaxConfig): number => {
  const frame = useCurrentFrame();
  const { speed, range = 100, durationInFrames } = opts;
  return interpolate(frame, [0, durationInFrames], [0, range * speed], {
    extrapolateRight: "clamp",
  });
};
