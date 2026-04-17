import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs, timing } from "../styles/tokens";

type Config = {
  /** Frames for enter animation. Default: timing.medium (24). */
  enterDuration?: number;
  /** Frames for exit animation. Default: timing.fast (12). */
  exitDuration?: number;
  /** Spring config for enter. Default: springs.snappy. */
  enterConfig?: { damping: number; stiffness: number; mass: number };
  /** Spring config for exit. Default: springs.smooth. */
  exitConfig?: { damping: number; stiffness: number; mass: number };
  /** Extra delay before enter starts (for hierarchy stagger). Default: 0. */
  delay?: number;
};

/**
 * Reusable enter + exit animation hook.
 *
 * Returns `progress` (0→1 enter, 1→0 exit) that components can use
 * for opacity, transform, scale, etc.
 *
 * Uses `useVideoConfig().durationInFrames` from the parent `<Sequence>`
 * to know when to start the exit animation.
 *
 * @example
 * const p = useEnterExit({ delay: 6 });
 * style={{ opacity: p, transform: `translateY(${(1-p)*20}px)` }}
 */
export const useEnterExit = (config?: Config) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const delay = config?.delay ?? 0;
  const exitDur = config?.exitDuration ?? timing.fast;
  const enterCfg = config?.enterConfig ?? springs.snappy;
  const exitCfg = config?.exitConfig ?? springs.smooth;

  // Enter: starts at `delay` frame
  const enter = spring({
    frame: frame - delay,
    fps,
    config: enterCfg,
  });

  // Exit: starts `exitDur` frames before end of Sequence
  const exitStart = durationInFrames - exitDur;
  const exit =
    frame >= exitStart
      ? spring({
          frame: frame - exitStart,
          fps,
          config: exitCfg,
        })
      : 0;

  // Combined: enter brings 0→1, exit brings 1→0
  return Math.max(0, Math.min(1, enter * (1 - exit)));
};
