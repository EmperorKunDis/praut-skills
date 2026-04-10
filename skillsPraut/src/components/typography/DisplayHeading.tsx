import React from "react";
import { gradients, typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  gradient?: boolean;
  style?: React.CSSProperties;
};

/**
 * 48px Montserrat 800 — top of the typography hierarchy.
 * When `gradient` is true, paints the text with `gradients.logoText`.
 */
export const DisplayHeading: React.FC<Props> = ({
  children,
  gradient = false,
  style,
}) => {
  return (
    <h1
      style={{
        fontFamily: typeScale.display.font,
        fontSize: typeScale.display.size,
        fontWeight: typeScale.display.weight,
        lineHeight: 1.05,
        margin: 0,
        color: gradient ? undefined : typeScale.display.color,
        background: gradient ? gradients.logoText : undefined,
        WebkitBackgroundClip: gradient ? "text" : undefined,
        WebkitTextFillColor: gradient ? "transparent" : undefined,
        backgroundClip: gradient ? "text" : undefined,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};
