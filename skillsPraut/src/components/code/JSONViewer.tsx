import React from "react";
import { colors, fonts } from "../../styles/tokens";

type Props = {
  data: unknown;
  style?: React.CSSProperties;
};

const renderValue = (value: unknown, indent: number): React.ReactNode => {
  const pad = "  ".repeat(indent);
  if (value === null) {
    return <span style={{ color: colors.purple[400] }}>null</span>;
  }
  if (typeof value === "string") {
    return (
      <span style={{ color: colors.semantic.success }}>{`"${value}"`}</span>
    );
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <span style={{ color: colors.blue[400] }}>{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    return (
      <>
        <span style={{ color: colors.purple[200] }}>[</span>
        {"\n"}
        {value.map((v, i) => (
          <span key={i}>
            {pad}
            {"  "}
            {renderValue(v, indent + 1)}
            {i < value.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}
        <span style={{ color: colors.purple[200] }}>]</span>
      </>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <>
        <span style={{ color: colors.purple[200] }}>{"{"}</span>
        {"\n"}
        {entries.map(([k, v], i) => (
          <span key={k}>
            {pad}
            {"  "}
            <span style={{ color: colors.purple[400] }}>{`"${k}"`}</span>
            <span style={{ color: colors.purple[300] }}>: </span>
            {renderValue(v, indent + 1)}
            {i < entries.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}
        <span style={{ color: colors.purple[200] }}>{"}"}</span>
      </>
    );
  }
  return null;
};

export const JSONViewer: React.FC<Props> = ({ data, style }) => (
  <pre
    style={{
      fontFamily: fonts.mono,
      fontSize: 16,
      background: colors.navy[900],
      padding: 24,
      borderRadius: 8,
      color: colors.purple[100],
      margin: 0,
      lineHeight: 1.6,
      whiteSpace: "pre",
      ...style,
    }}
  >
    {renderValue(data, 0)}
  </pre>
);
