import React from "react";
import { colors, fonts } from "../../styles/tokens";

type Props = {
  url?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Browser window chrome — three traffic-light dots, URL bar, content slot.
 */
export const BrowserMockup: React.FC<Props> = ({
  url = "https://praut.cz",
  children,
  style,
}) => {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: colors.navy[800],
        boxShadow: "0 0 0 1px rgba(80,111,251,0.25)",
        ...style,
      }}
    >
      <div
        style={{
          height: 44,
          background: colors.navy[700],
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
        <div
          style={{
            flex: 1,
            margin: "0 16px",
            background: colors.navy[800],
            borderRadius: 999,
            padding: "6px 16px",
            fontFamily: fonts.mono,
            fontSize: 13,
            color: colors.purple[300],
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ padding: 0, background: colors.navy[900] }}>{children}</div>
    </div>
  );
};
