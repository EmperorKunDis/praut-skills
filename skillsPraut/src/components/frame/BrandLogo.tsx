import React from "react";
import { fonts, fontWeight, gradients } from "../../styles/tokens";
import { BrainMark } from "./BrainMark";

type Variant = "full" | "mark" | "text";

type Props = {
  /** Visual size in px (height of the lockup). Defaults to 40. */
  size?: number;
  variant?: Variant;
  /** Apply active glow on the mark. */
  glow?: boolean;
  /** Strip the gradient and render text in a single brand-safe color. */
  monochrome?: boolean;
  style?: React.CSSProperties;
};

/**
 * Praut brand logo lockup. Combines `<BrainMark />` with the
 * "PRAUT" wordmark in the brand `logoText` gradient.
 *
 * variants:
 * - `full` — mark + wordmark (default)
 * - `mark` — mark only (square)
 * - `text` — wordmark only (no mark)
 */
export const BrandLogo: React.FC<Props> = ({
  size = 40,
  variant = "full",
  glow = false,
  monochrome = false,
  style,
}) => {
  const wordmarkSize = Math.round(size * 0.62);
  const gap = Math.round(size * 0.32);

  const wordmark = (
    <span
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: wordmarkSize,
        letterSpacing: 2,
        lineHeight: 1,
        background: monochrome ? undefined : gradients.logoText,
        WebkitBackgroundClip: monochrome ? undefined : "text",
        WebkitTextFillColor: monochrome ? "#FAF5FF" : "transparent",
        backgroundClip: monochrome ? undefined : "text",
        color: monochrome ? "#FAF5FF" : undefined,
      }}
    >
      PRAUT
    </span>
  );

  if (variant === "mark") {
    return <BrainMark size={size} glow={glow} style={style} />;
  }
  if (variant === "text") {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", ...style }}>
        {wordmark}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        height: size,
        ...style,
      }}
    >
      <BrainMark size={size} glow={glow} />
      {wordmark}
    </div>
  );
};
