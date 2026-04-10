import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const H2: React.FC<Props> = ({ children, style }) => (
  <h2
    style={{
      fontFamily: typeScale.h2.font,
      fontSize: typeScale.h2.size,
      fontWeight: typeScale.h2.weight,
      color: typeScale.h2.color,
      lineHeight: 1.2,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h2>
);
