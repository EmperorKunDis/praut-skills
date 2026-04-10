import React from "react";
import { fonts, fontWeight, gradients } from "../../styles/tokens";
import { useCountUp } from "../../hooks/useCountUp";

type Props = {
  from?: number;
  to: number;
  startFrame?: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  gradient?: boolean;
  formatter?: (n: number) => string;
  style?: React.CSSProperties;
};

const defaultFormatter = (n: number) => Math.round(n).toLocaleString("cs-CZ");

/**
 * Animated count-up number. Uses `springs.smooth` via `useCountUp`.
 */
export const CountUpNumber: React.FC<Props> = ({
  from = 0,
  to,
  startFrame = 0,
  suffix = "",
  prefix = "",
  fontSize = 96,
  gradient = true,
  formatter = defaultFormatter,
  style,
}) => {
  const value = useCountUp({ from, to, startFrame });

  return (
    <span
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        lineHeight: 1,
        background: gradient ? gradients.logoText : undefined,
        WebkitBackgroundClip: gradient ? "text" : undefined,
        WebkitTextFillColor: gradient ? "transparent" : "#FAF5FF",
        backgroundClip: gradient ? "text" : undefined,
        ...style,
      }}
    >
      {prefix}
      {formatter(value)}
      {suffix}
    </span>
  );
};
