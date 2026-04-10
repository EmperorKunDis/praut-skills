import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const H1: React.FC<Props> = ({ children, style }) => (
  <h1
    style={{
      fontFamily: typeScale.h1.font,
      fontSize: typeScale.h1.size,
      fontWeight: typeScale.h1.weight,
      color: typeScale.h1.color,
      lineHeight: 1.15,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h1>
);
