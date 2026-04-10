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
 * Three sanctioned brand easing curves. Authors should use these and not
 * invent new ones — keeps motion language consistent across videos.
 */
export const easings = {
  linear: Easing.linear,
  out: Easing.out(Easing.cubic),
  standard: Easing.bezier(0.4, 0, 0.2, 1),
} as const;
