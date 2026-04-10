import React from "react";
import { colors } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * MacBook mockup — laptop body with screen slot for content.
 */
export const MacBookMockup: React.FC<Props> = ({ children, style }) => (
  <div style={{ display: "inline-block", ...style }}>
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 0 0 2px #506FFB44",
      }}
    >
      <div
        style={{
          width: 960,
          height: 600,
          borderRadius: 8,
          background: colors.navy[950],
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{
        width: 1080,
        height: 18,
        background: colors.navy[700],
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginLeft: -44,
        marginTop: -2,
      }}
    />
  </div>
);
