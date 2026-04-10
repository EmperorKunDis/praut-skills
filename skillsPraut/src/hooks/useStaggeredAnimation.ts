import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs, timing } from "../styles/tokens";

type SpringConfig = typeof springs.smooth;

type Options = {
  /** Delay (frames) between each item. Defaults to `timing.instant` (6f). */
  staggerFrames?: number;
  /** Initial offset before any item starts animating. */
  startFrame?: number;
  /** Spring preset config. Defaults to `springs.smooth`. */
  config?: SpringConfig;
};

/**
 * Returns `(index) => progress` mapping each item index in a list to its
 * staggered spring progress (0..1). Use for sequenced reveals.
 *
 * @example
 *   const stagger = useStaggeredAnimation({staggerFrames: timing.fast});
 *   {items.map((item, i) => (
 *     <div style={{opacity: stagger(i)}}>{item}</div>
 *   ))}
 */
export const useStaggeredAnimation = (opts: Options = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = opts.staggerFrames ?? timing.instant;
  const start = opts.startFrame ?? 0;
  const config = opts.config ?? springs.smooth;

  return (index: number) =>
    spring({
      frame: frame - start - index * stagger,
      fps,
      config,
    });
};
