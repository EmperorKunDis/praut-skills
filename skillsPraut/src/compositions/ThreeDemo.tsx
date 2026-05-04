// src/compositions/ThreeDemo.tsx
// Praut branded Three.js geometric demo composition.

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { GeometricScene } from "../components/three/GeometricScene";
import { colors, fonts, fontWeight, springs } from "../styles/tokens";

const Label: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = spring({
    frame: Math.max(0, frame - 20),
    fps: 30,
    config: springs.smooth,
  });
  const translateY = interpolate(y, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 52,
          color: colors.purple[50],
          letterSpacing: "-0.02em",
          textShadow: "0 0 40px rgba(141,42,243,0.6)",
        }}
      >
        Praut AI Channel
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.body,
          fontSize: 20,
          color: colors.purple[300],
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Progressive Automatisation
      </div>
    </div>
  );
};

export const ThreeDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: colors.navy[950] }}>
      {/* Three.js scene fills the frame */}
      <AbsoluteFill>
        <GeometricScene />
      </AbsoluteFill>

      {/* Radial vignette overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(6,8,24,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Text label */}
      <Label frame={frame} />
    </AbsoluteFill>
  );
};
