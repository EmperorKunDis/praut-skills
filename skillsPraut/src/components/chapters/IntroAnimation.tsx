import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  channel,
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
  springs,
} from "../../styles/tokens";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";

type Props = {
  /** Override the bottom-line tagline. Defaults to first in `channel.taglines`. */
  tagline?: string;
};

/**
 * Praut intro: ~5s space fly-through into the brain mark.
 *
 * Timeline (frames @ 30fps):
 *   0–45   SpaceNebula with overdriven outer scale (1.6 → 1.0) + intensity dramatic
 *   30–75  BrainMark fade-in centered, scale 0.4 → 1.0 via springs.smooth
 *   60–90  "Martin Švanda" wordmark fade-in beneath the mark (logoText gradient)
 *   75–120 Tagline ("<P-word> Automatisation") fade-in beneath the name
 *
 * Pure code — no Logo Reveal.mp4 dependency.
 */
export const IntroAnimation: React.FC<Props> = ({
  tagline = channel.taglines[0],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Outer fly-through scale: starts overdriven (1.6×), settles to 1.0× by f=45
  const flyThrough = interpolate(frame, [0, 45], [1.6, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markProgress = spring({
    frame: frame - 15,
    fps,
    config: springs.smooth,
  });
  const wordmarkProgress = spring({
    frame: frame - 30,
    fps,
    config: springs.smooth,
  });
  const taglineProgress = spring({
    frame: frame - 45,
    fps,
    config: springs.smooth,
  });

  return (
    <AbsoluteFill style={{ background: colors.navy[950] }}>
      <SpiralGalaxy />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 240,
          paddingBottom: "240px"
        }}
      >
        <div
          style={{
            opacity: markProgress,
            transform: `scale(${0.4 + markProgress * 0.6})`,
            filter: `drop-shadow(${glow.active})`,
          }}
        >
          <Img
            src={staticFile("logo/logopraut.svg")}
            alt="Praut brain mark"
            style={{ width: 640, height: 640, objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: 84,
            letterSpacing: 4,
            background: gradients.logoText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: wordmarkProgress,
            transform: `translateY(${(1 - wordmarkProgress) * 24}px)`,
          }}
        >
          {channel.name}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
