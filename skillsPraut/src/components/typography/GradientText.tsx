import React from "react";
import { gradients } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  gradient?: keyof typeof gradients;
  style?: React.CSSProperties;
};

/**
 * Render any text with a brand gradient applied via background-clip.
 * Defaults to `gradients.logoText` (#506FFB → #8D2AF3).
 */
export const GradientText: React.FC<Props> = ({
  children,
  gradient = "logoText",
  style,
}) => (
  <span
    style={{
      background: gradients[gradient],
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </span>
);
