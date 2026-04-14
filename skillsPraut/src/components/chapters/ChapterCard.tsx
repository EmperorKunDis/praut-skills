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

type Props = {
  number: string;
  title: string;
  /** Override the overline label. Defaults to "KAPITOLA". */
  prefix?: string;
};

/**
 * Full-screen chapter intro: overline (default "KAPITOLA 01"), brand-blue
 * divider line, then large gradient title. Use `prefix` to customise the
 * overline label (e.g. "MÝTUS" for myth-busting episodes).
 */
export const ChapterCard: React.FC<Props> = ({
  number,
  title,
  prefix = "KAPITOLA",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const numberProgress = spring({ frame, fps, config: springs.smooth });
  const titleProgress = spring({
    frame: frame - 12,
    fps,
    config: springs.smooth,
  });
  const lineProgress = spring({
    frame: frame - 6,
    fps,
    config: springs.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 24,
          color: colors.blue[400],
          opacity: numberProgress,
          letterSpacing: 4,
        }}
      >
        {prefix} {number}
      </div>
      <div
        style={{
          width: interpolate(lineProgress, [0, 1], [0, 200]),
          height: 2,
          background: colors.blue[400],
          marginTop: 16,
          marginBottom: 24,
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
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
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
