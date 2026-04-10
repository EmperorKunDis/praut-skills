import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";

type Props = {
  number: string;
  title: string;
};

/**
 * Quick chapter sting — small label slides in for 1.5s as a divider
 * between content sections.
 */
export const ChapterTransition: React.FC<Props> = ({ number, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: springs.smooth });

  return (
    <AbsoluteFill
      style={{
        background: "rgba(6,8,24,0.92)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        opacity: progress,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          color: colors.purple[300],
          letterSpacing: 3,
        }}
      >
        / {number} /
      </span>
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 36,
          color: colors.purple[50],
        }}
      >
        {title}
      </span>
    </AbsoluteFill>
  );
};
