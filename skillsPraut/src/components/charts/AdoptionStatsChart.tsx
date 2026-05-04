// src/components/charts/AdoptionStatsChart.tsx
// Animated AI adoption statistics for Mýtus 1 — replaces static screenshots.
// Shows Goldman Sachs, Salesforce, Thryv data as animated bars + KPI numbers.

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, glow, springs } from "../../styles/tokens";

type StatBar = {
  org: string;
  metric: string;
  value: number; // percentage
  valueLabel: string;
  color: string;
  delay: number;
};

const STATS: StatBar[] = [
  {
    org: "Goldman Sachs",
    metric: "malých firem v USA aktivně používá AI",
    value: 68,
    valueLabel: "68 %",
    color: colors.blue[400],
    delay: 10,
  },
  {
    org: "Salesforce SMB Trends",
    metric: "firem s AI hlásí růst tržeb",
    value: 91,
    valueLabel: "91 %",
    color: colors.purple[600],
    delay: 30,
  },
  {
    org: "Thryv Survey 2025",
    metric: "adopce za jediný rok (z 39 % → 55 %)",
    value: 55,
    valueLabel: "+41 %",
    color: colors.semantic.success,
    delay: 50,
  },
];

const BAR_HEIGHT = 64;
const BAR_GAP = 48;
const MAX_BAR_W = 900;

const SingleBar: React.FC<{ stat: StatBar; index: number }> = ({
  stat,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - stat.delay),
    fps,
    config: springs.smooth,
  });

  const exitStart = durationInFrames - 20;
  const exitP =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const barW = (stat.value / 100) * MAX_BAR_W * progress * (1 - exitP);
  const labelOpacity = progress * (1 - exitP);
  const slideIn = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div
      style={{
        opacity: labelOpacity,
        transform: `translateY(${slideIn}px)`,
        marginBottom: index < STATS.length - 1 ? BAR_GAP : 0,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            fontWeight: fontWeight.body,
            color: stat.color,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {stat.org}
        </span>
        <span
          style={{
            fontFamily: fonts.primary,
            fontSize: 15,
            fontWeight: fontWeight.body,
            color: colors.purple[200],
          }}
        >
          — {stat.metric}
        </span>
      </div>

      {/* Bar row */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Track */}
        <div
          style={{
            width: MAX_BAR_W,
            height: BAR_HEIGHT,
            background: colors.navy[800],
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Fill */}
          <div
            style={{
              width: barW,
              height: "100%",
              background: stat.color,
              borderRadius: 8,
              boxShadow:
                stat.color === colors.purple[600]
                  ? glow.cta
                  : `0 0 18px ${stat.color}55`,
              transition: "none",
            }}
          />
        </div>

        {/* Value label */}
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: 42,
            color: stat.color,
            minWidth: 100,
            textShadow: `0 0 24px ${stat.color}88`,
            lineHeight: 1,
          }}
        >
          {stat.valueLabel}
        </div>
      </div>
    </div>
  );
};

export const AdoptionStatsChart: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: "100%", ...style }}>
      {/* Title */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 26,
          color: colors.purple[100],
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        Reálná data: AI adopce v malých firmách
      </div>

      {/* Bars */}
      {STATS.map((stat, i) => (
        <SingleBar key={stat.org} stat={stat} index={i} />
      ))}

      {/* Source note */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          marginTop: 28,
          opacity: interpolate(frame, [60, 80], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Zdroje: Goldman Sachs 10,000 Small Businesses Survey · Salesforce SMB
        Trends Report · Thryv AI Business Survey — 2025
      </div>
    </div>
  );
};
