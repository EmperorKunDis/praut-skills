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
