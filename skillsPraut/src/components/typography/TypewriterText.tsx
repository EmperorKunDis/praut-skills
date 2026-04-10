import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";

type Props = {
  fullText: string;
  pauseAfter?: string;
  pauseSeconds?: number;
  charFrames?: number;
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  cursorBlinkFrames?: number;
  style?: React.CSSProperties;
};

/**
 * Brand typewriter — types `fullText` character by character with a
 * blinking brand-blue cursor. Optional pause after a substring marker.
 *
 * Defaults: Montserrat 800 (display), purple[50], cursor blue[400].
 */
export const TypewriterText: React.FC<Props> = ({
  fullText,
  pauseAfter,
  pauseSeconds = 1,
  charFrames = 2,
  fontSize = 72,
  color = colors.purple[50],
  cursorColor = colors.blue[400],
  cursorBlinkFrames = 16,
  style,
}) => {
  const frame = useCurrentFrame();
  const typed = useTypewriter({
    fullText,
    pauseAfter,
    charFrames,
    pauseSeconds,
  });

  const cursorOpacity = interpolate(
    frame % cursorBlinkFrames,
    [0, cursorBlinkFrames / 2, cursorBlinkFrames],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        color,
        lineHeight: 1.15,
        ...style,
      }}
    >
      <span>{typed}</span>
      <span
        style={{
          display: "inline-block",
          width: "0.55em",
          height: "0.95em",
          background: cursorColor,
          marginLeft: 4,
          verticalAlign: "middle",
          opacity: cursorOpacity,
        }}
      />
    </div>
  );
};
