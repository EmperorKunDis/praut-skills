import React from "react";
import { colors, frame as frameTokens } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Generic phone (iPhone-style) frame mockup. Children render in the screen slot.
 */
export const PhoneMockup: React.FC<Props> = ({ children, style }) => (
  <div
    style={{
      width: 360,
      height: 740,
      borderRadius: 48,
      background: colors.navy[700],
      padding: 14,
      boxShadow: "0 0 0 2px #506FFB44",
      ...style,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 36,
        background: frameTokens.bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 28,
          background: colors.navy[950],
          borderRadius: 999,
          zIndex: 10,
        }}
      />
      {children}
    </div>
  </div>
);
