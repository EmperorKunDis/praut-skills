import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  question: string;
  pauseFrames?: number;
  answer?: string;
  style?: React.CSSProperties;
};

/**
 * Question with a "thinking dots" pause before the answer reveals.
 * Useful for Socratic-method educational pacing.
 */
export const SocraticQuestion: React.FC<Props> = ({
  question,
  pauseFrames = 45,
  answer,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const qIn = spring({ frame, fps, config: springs.snappy });
  const showDots = frame > 20 && frame < 20 + pauseFrames;
  const aIn = answer
    ? spring({
        frame: frame - 20 - pauseFrames,
        fps,
        config: springs.bouncy,
      })
    : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        maxWidth: 1100,
        ...style,
      }}
    >
      <PhosphorIcon
        name="question"
        size={48}
        color={colors.blue[400]}
        glow="active"
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 36,
          color: colors.purple[50],
          textAlign: "center",
          opacity: qIn,
          transform: `translateY(${(1 - qIn) * 16}px)`,
        }}
      >
        {question}
      </div>
      {showDots && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 36,
            color: colors.purple[300],
            letterSpacing: 12,
          }}
        >
          {"...".slice(0, 1 + Math.floor(((frame - 20) % 30) / 10))}
        </div>
      )}
      {answer && aIn > 0.01 && (
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 28,
            color: colors.semantic.success,
            textAlign: "center",
            opacity: aIn,
            transform: `translateY(${(1 - aIn) * 24}px)`,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};
