import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const H3: React.FC<Props> = ({ children, style }) => (
  <h3
    style={{
      fontFamily: typeScale.h3.font,
      fontSize: typeScale.h3.size,
      fontWeight: typeScale.h3.weight,
      color: typeScale.h3.color,
      lineHeight: 1.3,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h3>
);
