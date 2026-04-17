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
