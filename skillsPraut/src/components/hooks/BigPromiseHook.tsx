import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";

type Props = {
  timePromise: string;
  skillPromise: string;
  style?: React.CSSProperties;
};

export const BigPromiseHook: React.FC<Props> = ({
  timePromise,
  skillPromise,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeIn = spring({ frame, fps, config: springs.snappy });
  const skillIn = spring({ frame: frame - 12, fps, config: springs.bouncy });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 28,
          color: colors.blue[400],
          letterSpacing: 3,
          opacity: timeIn,
          transform: `translateY(${(1 - timeIn) * -16}px)`,
        }}
      >
        {timePromise}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 64,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: 1200,
          opacity: skillIn,
          transform: `scale(${interpolate(skillIn, [0, 1], [0.8, 1])})`,
        }}
      >
        {skillPromise}
      </div>
    </div>
  );
};
