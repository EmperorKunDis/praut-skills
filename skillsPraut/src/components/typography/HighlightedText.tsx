import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";

type Props = {
  /** Plain text broken into chunks; chunks marked with `highlight` get the brand purple background. */
  parts: Array<string | { text: string; highlight: true }>;
  fontSize?: number;
  color?: string;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Inline-highlighted text. Each highlight chunk paints a purple background
 * pill that animates in from 0% to 100% width with a `glow.subtle` aura.
 */
export const HighlightedText: React.FC<Props> = ({
  parts,
  fontSize = 56,
  color = colors.purple[50],
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame - startFrame, [0, timing.medium], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        color,
        lineHeight: 1.25,
        ...style,
      }}
    >
      {parts.map((part, i) => {
        if (typeof part === "string") {
          return <span key={i}>{part}</span>;
        }
        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              padding: "0 0.18em",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: "0.05em 0",
                width: `${grow}%`,
                background: colors.purple[600],
                borderRadius: 6,
                boxShadow: glow.subtle,
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{part.text}</span>
          </span>
        );
      })}
    </div>
  );
};
