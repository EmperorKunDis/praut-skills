import React from "react";
import { colors, fonts, frame, withOpacity } from "../../styles/tokens";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * macOS-style terminal window — three traffic-light dots, title bar,
 * mono content area on `colors.navy[950]`.
 */
export const TerminalWindow: React.FC<Props> = ({
  title = "praut@macbook ~ %",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[950],
        borderRadius: frame.borderRadius * 3,
        border: `1px solid ${withOpacity(colors.blue[400], 0.25)}`,
        overflow: "hidden",
        fontFamily: fonts.mono,
        ...style,
      }}
    >
      <div
        style={{
          height: 36,
          background: colors.navy[800],
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FF5F56",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FFBD2E",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#27C93F",
          }}
        />
        <span
          style={{
            marginLeft: 16,
            fontSize: 12,
            color: colors.purple[300],
            fontFamily: fonts.mono,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          padding: 24,
          color: colors.purple[100],
          fontSize: 18,
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
};
