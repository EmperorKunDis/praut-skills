// ============================================================
// useScaleToFit.ts
// ============================================================
import { useVideoConfig } from "remotion";
import { frame } from "../styles/tokens";

/**
 * Returns the CSS `transform: scale(...)` factor needed to fit the brand
 * 1920x1080 reference frame inside the current Remotion composition's actual
 * dimensions while preserving aspect ratio (`min` of x/y).
 *
 * Use it on a 1920x1080 inner container so authors can write layouts at
 * brand-native resolution and still render to e.g. 1280x720 or 4K.
 */
export const useScaleToFit = (
  referenceWidth: number = frame.width,
  referenceHeight: number = frame.height,
) => {
  const { width, height } = useVideoConfig();
  const scaleX = width / referenceWidth;
  const scaleY = height / referenceHeight;
  return Math.min(scaleX, scaleY);
};

// ============================================================
// useStaggeredAnimation.ts
// ============================================================
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

// ============================================================
// useTypewriter.ts
// ============================================================
import { useCurrentFrame, useVideoConfig } from "remotion";

type Options = {
  fullText: string;
  /** Substring after which the animation pauses for `pauseSeconds`. */
  pauseAfter?: string;
  /** Frames spent typing each character. Defaults to 2. */
  charFrames?: number;
  /** Pause length in seconds at the `pauseAfter` boundary. */
  pauseSeconds?: number;
};

/**
 * Returns the substring of `fullText` that should be visible at the current
 * frame, simulating a typewriter that pauses after `pauseAfter` for
 * `pauseSeconds`.
 */
export const useTypewriter = ({
  fullText,
  pauseAfter,
  charFrames = 2,
  pauseSeconds = 0,
}: Options): string => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pauseFrames = Math.round(fps * pauseSeconds);
  const pauseIndex = pauseAfter ? fullText.indexOf(pauseAfter) : -1;
  const preLen =
    pauseIndex >= 0 && pauseAfter
      ? pauseIndex + pauseAfter.length
      : fullText.length;

  let typedChars = 0;
  if (frame < preLen * charFrames) {
    typedChars = Math.floor(frame / charFrames);
  } else if (frame < preLen * charFrames + pauseFrames) {
    typedChars = preLen;
  } else {
    const postPhase = frame - preLen * charFrames - pauseFrames;
    typedChars = Math.min(
      fullText.length,
      preLen + Math.floor(postPhase / charFrames),
    );
  }
  return fullText.slice(0, Math.max(0, typedChars));
};

// ============================================================
// useCountUp.ts
// ============================================================
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

// ============================================================
// interpolateColors.ts
// ============================================================
// Linear color interpolation between two #RRGGBB hex strings.
// Returns a `rgb(r, g, b)` string.

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
};

export const interpolateColors = (
  t: number,
  from: string,
  to: string,
): string => {
  const clamped = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const r = Math.round(r1 + (r2 - r1) * clamped);
  const g = Math.round(g1 + (g2 - g1) * clamped);
  const b = Math.round(b1 + (b2 - b1) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
};

// ============================================================
// easings.ts
// ============================================================
import { Easing } from "remotion";

/**
 * Brand easing curves — from basic motion to anime.js-inspired advanced effects.
 * Use these for consistent motion language across all videos.
 */
export const easings = {
  // ── Base curves ──
  linear: Easing.linear,
  out: Easing.out(Easing.cubic),
  standard: Easing.bezier(0.4, 0, 0.2, 1),

  // ── Advanced curves (anime.js inspired) ──

  /** Dramatic acceleration/deceleration — for scene transitions, wipes. */
  inOutExpo: Easing.bezier(0.87, 0, 0.13, 1),

  /** Overshoot then settle — for cards, boxes appearing. */
  outBack: Easing.bezier(0.34, 1.56, 0.64, 1),

  /** Quick deceleration with subtle overshoot — for text reveals. */
  outQuart: Easing.out(Easing.poly(4)),

  /** Smooth S-curve — for slide-ins. */
  inOutCubic: Easing.inOut(Easing.cubic),
} as const;

/**
 * Elastic easing — spring-like oscillation that settles.
 * Use for emphatic reveals (verdicts, key numbers, CTAs).
 * Cannot be expressed as Easing.bezier — implemented as a function.
 *
 * @param t progress 0..1
 * @returns eased value (can overshoot > 1.0 then settle)
 */
export const easeOutElastic = (t: number): number => {
  if (t === 0 || t === 1) return t;
  const p = 0.3;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};

/**
 * Bounce easing — ball-drop effect.
 * Use for playful number reveals, stat cards, count-ups.
 *
 * @param t progress 0..1
 * @returns eased value 0..1
 */
export const easeOutBounce = (t: number): number => {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    const t2 = t - 1.5 / 2.75;
    return 7.5625 * t2 * t2 + 0.75;
  } else if (t < 2.5 / 2.75) {
    const t2 = t - 2.25 / 2.75;
    return 7.5625 * t2 * t2 + 0.9375;
  } else {
    const t2 = t - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  }
};

// ============================================================
// useEnterExit.ts
// ============================================================
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs, timing } from "../styles/tokens";

type EnterExitConfig = {
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
export const useEnterExit = (config?: EnterExitConfig) => {
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
