import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  springs,
  typeScale,
  withOpacity,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

const STAT_TARGET = 95000;
const COUNT_DURATION = 60;

const MINI_STATS = [
  { value: "3 minuty", label: "instalace + první model" },
  { value: "100+", label: "dostupných modelů" },
  { value: "0 Kč", label: "cena za licenci" },
] as const;

export const OllamaGrowthCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress = spring({
    frame: Math.max(0, frame - exitStart),
    fps,
    config: springs.smooth,
  });
  const globalOpacity = 1 - exitProgress;

  const titleP = spring({ frame, fps, config: springs.snappy });

  // Count-up interpolation over COUNT_DURATION frames
  const countRaw = interpolate(frame, [0, COUNT_DURATION], [0, STAT_TARGET], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const countDisplay = Math.round(countRaw).toLocaleString("cs-CZ");

  // Glow pulse — subtle sine wave
  const pulseOpacity = interpolate(
    Math.sin((frame / 30) * Math.PI),
    [-1, 1],
    [0.18, 0.38],
  );

  const miniCardP = (i: number) =>
    spring({
      frame: Math.max(0, frame - COUNT_DURATION - i * 12),
      fps,
      config: springs.bouncy,
    });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        padding: "0 120px",
        boxSizing: "border-box",
        opacity: globalOpacity,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blob */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${withOpacity(colors.purple[600], pulseOpacity)} 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${interpolate(titleP, [0, 1], [-20, 0])}px)`,
          marginBottom: 52,
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: typeScale.h2.size,
            fontWeight: fontWeight.heading,
            color: colors.purple[50],
          }}
        >
          Ollama — nejpopulárnější offline AI runtime
        </div>
      </div>

      {/* Main stat */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: fontWeight.display,
            color: colors.purple[50],
            fontFamily: fonts.primary,
            lineHeight: 1,
            letterSpacing: -2,
            textShadow: glow.deepPulse,
          }}
        >
          {countDisplay}+
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: fontWeight.bodyEmphasis,
            color: colors.purple[300],
            fontFamily: fonts.mono,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginTop: 12,
          }}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <PhosphorIcon
              name="star"
              size={16}
              color={colors.purple[300]}
              weight="fill"
            />{" "}
            hvězd na GitHubu
          </span>
        </div>
      </div>

      {/* Mini stat cards */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 56,
          position: "relative",
        }}
      >
        {MINI_STATS.map(({ value, label }, i) => {
          const p = miniCardP(i);
          return (
            <div
              key={label}
              style={{
                opacity: p,
                transform: `scale(${interpolate(p, [0, 1], [0.85, 1])}) translateY(${interpolate(p, [0, 1], [20, 0])}px)`,
                background: colors.navy[800],
                border: `1.5px solid ${withOpacity(colors.blue[400], 0.35)}`,
                borderRadius: 18,
                padding: "28px 48px",
                textAlign: "center",
                minWidth: 280,
                boxShadow: glow.active,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: fontWeight.heading,
                  color: colors.blue[400],
                  fontFamily: fonts.mono,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: typeScale.small.size,
                  fontWeight: fontWeight.body,
                  color: colors.purple[200],
                  fontFamily: fonts.primary,
                  lineHeight: 1.4,
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
