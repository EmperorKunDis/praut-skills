import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../../styles/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";

type Props = {
  command: string;
  prompt?: string;
  style?: React.CSSProperties;
};

/**
 * Single-line CLI prompt with typewriter command + blinking blue cursor.
 */
export const CommandLine: React.FC<Props> = ({
  command,
  prompt = "$",
  style,
}) => {
  const frame = useCurrentFrame();
  const typed = useTypewriter({ fullText: command });
  const cursorOpacity = interpolate(frame % 30, [0, 15, 30], [1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 22,
        color: colors.purple[100],
        display: "flex",
        alignItems: "center",
        gap: 12,
        ...style,
      }}
    >
      <span style={{ color: colors.semantic.success, fontWeight: 700 }}>
        {prompt}
      </span>
      <span>{typed}</span>
      <span
        style={{
          display: "inline-block",
          width: 10,
          height: 22,
          background: colors.blue[400],
          opacity: cursorOpacity,
        }}
      />
    </div>
  );
};
