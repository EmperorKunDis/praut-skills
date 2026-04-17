import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";
import { easings } from "../../hooks/easings";

type Props = {
  number: string;
  title: string;
  /** Override the overline label. Defaults to "KAPITOLA". */
  prefix?: string;
};

/**
 * Full-screen chapter intro with 3D perspective reveal:
 *   1. Overline pops in with bouncy scale
 *   2. Divider line draws with overshoot
 *   3. Title slides up from below with perspective rotateX
 */
export const ChapterCard: React.FC<Props> = ({
  number,
  title,
  prefix = "KAPITOLA",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Overline — bouncy pop-in
  const numberProgress = spring({ frame, fps, config: springs.bouncy });

  // Exit — all elements fade + scale down in last 12 frames
  const exitStart = durationInFrames - 12;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  // Divider line — overshoot via outBack easing
  const lineRaw = interpolate(frame - 6, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineProgress = easings.outBack(lineRaw);

  // Title — snappy slide + perspective
  const titleProgress = spring({
    frame: frame - 12,
    fps,
    config: springs.snappy,
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 24,
          color: colors.blue[400],
          opacity: numberProgress * (1 - exitProgress),
          transform: `scale(${interpolate(numberProgress, [0, 1], [0.6, 1]) * (1 - exitProgress * 0.1)})`,
          letterSpacing: 4,
        }}
      >
        {prefix} {number}
      </div>
      <div
        style={{
          width:
            interpolate(lineProgress, [0, 1], [0, 240]) * (1 - exitProgress),
          height: 2,
          background: colors.blue[400],
          marginTop: 16,
          marginBottom: 24,
          opacity: 1 - exitProgress,
        }}
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 72,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: titleProgress * (1 - exitProgress),
          transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px) rotateX(${interpolate(titleProgress, [0, 1], [15, 0])}deg) scale(${1 - exitProgress * 0.1})`,
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};
