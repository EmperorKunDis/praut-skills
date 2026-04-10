import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type Props = {
  number?: string;
  style?: React.CSSProperties;
};

export const SectionDivider: React.FC<Props> = ({ number, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      width: "100%",
      ...style,
    }}
  >
    <div
      style={{
        flex: 1,
        height: 1,
        background: withOpacity(colors.blue[400], 0.5),
      }}
    />
    {number ? (
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.blue[400],
          letterSpacing: 2,
        }}
      >
        {number}
      </span>
    ) : null}
    <div
      style={{
        flex: 1,
        height: 1,
        background: withOpacity(colors.blue[400], 0.5),
      }}
    />
  </div>
);
