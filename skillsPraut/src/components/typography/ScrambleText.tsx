import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight } from "../../styles/tokens";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  revealFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Hacker-style scramble: each character cycles through random glyphs
 * before settling on the final value. Settles left-to-right.
 */
export const ScrambleText: React.FC<Props> = ({
  text,
  fontSize = 64,
  color = colors.purple[50],
  revealFrames = 36,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame() - startFrame;
  const chars = text.split("");
  const perCharFrames = Math.max(1, revealFrames / chars.length);

  const display = chars
    .map((char, i) => {
      const settled = frame >= (i + 1) * perCharFrames;
      if (settled) return char;
      if (frame < i * perCharFrames) return " ";
      // scrambling phase — pick a deterministic random glyph each frame
      const idx = (frame * 7 + i * 13) % SCRAMBLE_CHARS.length;
      return SCRAMBLE_CHARS[idx];
    })
    .join("");

  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontWeight: fontWeight.bodyEmphasis,
        fontSize,
        color,
        letterSpacing: 1,
        whiteSpace: "pre",
        ...style,
      }}
    >
      {display}
    </span>
  );
};
