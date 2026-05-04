import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";

type Props = {
  hiddenContent: React.ReactNode;
  teaser: string;
  revealFrame: number;
  blurIntensity?: number;
  style?: React.CSSProperties;
};

export const CuriosityGapReveal: React.FC<Props> = ({
  hiddenContent,
  teaser,
  revealFrame,
  blurIntensity = 20,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const revealed = frame >= revealFrame;
  const revealProgress = revealed
    ? spring({
        frame: frame - revealFrame,
        fps,
        config: springs.smooth,
      })
    : 0;
  const blur = interpolate(revealProgress, [0, 1], [blurIntensity, 0]);

  return (
    <div
      style={{
        background: gradients.card,
        borderLeft: `4px solid ${colors.purple[600]}`,
        borderRadius: 12,
        padding: "32px 40px",
        maxWidth: 1000,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
          marginBottom: 16,
        }}
      >
        {teaser}
      </div>
      <div style={{ filter: `blur(${blur}px)`, transition: "none" }}>
        {hiddenContent}
      </div>
    </div>
  );
};
