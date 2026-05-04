/**
 * Quality gate orchestrator — validates video composition against brand + accessibility rules.
 * Run before rendering to catch issues early.
 */
import { accessibility, motion } from "../styles/tokens";

export type QualityIssue = {
  rule: string;
  severity: "error" | "warning";
  message: string;
  suggestion: string;
};

/** Validate that a Sequence duration meets minimum display time rules. */
export const validateMinDisplayTime = (
  durationInFrames: number,
  elementType: "heading" | "body" | "chart",
): QualityIssue | null => {
  const minMap = {
    heading: motion.minHeadingDisplay,
    body: motion.minTextDisplay,
    chart: motion.minChartDisplay,
  };
  const min = minMap[elementType];
  if (durationInFrames < min) {
    return {
      rule: "min-display-time",
      severity: "error",
      message: `${elementType} visible for ${durationInFrames} frames, minimum is ${min}`,
      suggestion: `Increase Sequence durationInFrames to at least ${min}`,
    };
  }
  return null;
};

/** Validate caption-safe zone — no content in bottom 162px. */
export const validateCaptionSafe = (
  elementBottom: number,
  frameHeight: number,
): QualityIssue | null => {
  const safeY = frameHeight - accessibility.captionSafeBottom;
  if (elementBottom > safeY) {
    return {
      rule: "caption-safe-zone",
      severity: "warning",
      message: `Element extends to ${elementBottom}px, caption safe zone starts at ${safeY}px`,
      suggestion: `Move element above ${safeY}px to avoid caption overlap`,
    };
  }
  return null;
};

/** Validate flash rate — no more than 3 flashes per second. */
export const validateFlashRate = (
  flashesInWindow: number,
  windowSeconds: number,
): QualityIssue | null => {
  const rate = flashesInWindow / windowSeconds;
  if (rate > motion.maxFlashRate) {
    return {
      rule: "pse-flash-rate",
      severity: "error",
      message: `Flash rate ${rate.toFixed(1)}/sec exceeds limit of ${motion.maxFlashRate}/sec`,
      suggestion: "Reduce flash frequency or use fade transitions instead",
    };
  }
  return null;
};

/** Run all static quality checks and return issues. */
export const runStaticGate = (checks: {
  durationChecks?: Array<{
    frames: number;
    type: "heading" | "body" | "chart";
  }>;
  captionChecks?: Array<{ bottom: number; frameHeight: number }>;
}): QualityIssue[] => {
  const issues: QualityIssue[] = [];
  checks.durationChecks?.forEach((c) => {
    const issue = validateMinDisplayTime(c.frames, c.type);
    if (issue) issues.push(issue);
  });
  checks.captionChecks?.forEach((c) => {
    const issue = validateCaptionSafe(c.bottom, c.frameHeight);
    if (issue) issues.push(issue);
  });
  return issues;
};
