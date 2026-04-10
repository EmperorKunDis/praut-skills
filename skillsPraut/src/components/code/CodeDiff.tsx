import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type DiffLine = {
  type: "add" | "remove" | "context";
  text: string;
};

type Props = {
  lines: DiffLine[];
  style?: React.CSSProperties;
};

export const CodeDiff: React.FC<Props> = ({ lines, style }) => {
  return (
    <pre
      style={{
        background: colors.navy[900],
        border: `1px solid ${withOpacity(colors.blue[400], 0.25)}`,
        borderRadius: 8,
        padding: 0,
        fontFamily: fonts.mono,
        fontSize: 16,
        lineHeight: 1.7,
        color: colors.purple[100],
        margin: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const isAdd = line.type === "add";
        const isRemove = line.type === "remove";
        const bg = isAdd
          ? "rgba(52,211,153,0.1)"
          : isRemove
            ? "rgba(248,113,113,0.1)"
            : "transparent";
        const borderColor = isAdd
          ? colors.semantic.success
          : isRemove
            ? colors.semantic.error
            : "transparent";
        const prefix = isAdd ? "+" : isRemove ? "−" : " ";
        return (
          <div
            key={i}
            style={{
              background: bg,
              borderLeft: `3px solid ${borderColor}`,
              padding: "0 24px",
              display: "flex",
              gap: 12,
            }}
          >
            <span
              style={{
                color: isAdd
                  ? colors.semantic.success
                  : isRemove
                    ? colors.semantic.error
                    : colors.purple[300],
                width: 14,
                textAlign: "center",
              }}
            >
              {prefix}
            </span>
            <span>{line.text}</span>
          </div>
        );
      })}
    </pre>
  );
};
