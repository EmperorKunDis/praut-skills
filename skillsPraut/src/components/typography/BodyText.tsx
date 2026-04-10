import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Standard 18px Montserrat 500 body copy.
 * NEVER reduce the weight below 500 — minimum on dark mode.
 */
export const BodyText: React.FC<Props> = ({ children, style }) => (
  <p
    style={{
      fontFamily: typeScale.body.font,
      fontSize: typeScale.body.size,
      fontWeight: typeScale.body.weight,
      color: typeScale.body.color,
      lineHeight: 1.55,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </p>
);
