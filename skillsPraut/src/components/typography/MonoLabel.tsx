import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  uppercase?: boolean;
  style?: React.CSSProperties;
};

/**
 * Caption-sized IBM Plex Mono label for technical / tagging text.
 */
export const MonoLabel: React.FC<Props> = ({
  children,
  uppercase = true,
  style,
}) => (
  <span
    style={{
      fontFamily: typeScale.caption.font,
      fontSize: typeScale.caption.size,
      fontWeight: typeScale.caption.weight,
      color: typeScale.caption.color,
      letterSpacing: 1.5,
      textTransform: uppercase ? "uppercase" : undefined,
      ...style,
    }}
  >
    {children}
  </span>
);
