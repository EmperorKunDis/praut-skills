// src/components/educational/HypeCycleChart.tsx
// Gartner Hype Cycle — animated SVG curve for Mýtus 1 "AI je bublina".
// All animation driven by useCurrentFrame().

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, glow, springs } from "../../styles/tokens";

const W = 1400;
const H = 560;
const PAD = { top: 40, right: 80, bottom: 80, left: 60 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

// Hype cycle control points (x: 0–1, y: 0–1, 0=bottom, 1=top)
const CURVE_PTS: [number, number][] = [
  [0.0, 0.08],
  [0.05, 0.12],
  [0.12, 0.28],
  [0.2, 0.72],
  [0.26, 0.96], // Peak of Inflated Expectations
  [0.32, 0.82],
  [0.4, 0.22],
  [0.44, 0.09], // Trough of Disillusionment
  [0.52, 0.14],
  [0.62, 0.42],
  [0.72, 0.58],
  [0.82, 0.62], // Slope of Enlightenment
  [0.9, 0.63],
  [1.0, 0.64], // Plateau of Productivity
];

function toSvg(pt: [number, number]): [number, number] {
  return [PAD.left + pt[0] * CW, PAD.top + (1 - pt[1]) * CH];
}

// Phases with their x-position on the curve and label
const PHASES = [
  { x: 0.04, label: "Technology\nTrigger", anchor: "middle" as const },
  {
    x: 0.26,
    label: "Peak of Inflated\nExpectations",
    anchor: "middle" as const,
  },
  { x: 0.44, label: "Trough of\nDisillusionment", anchor: "middle" as const },
  { x: 0.72, label: "Slope of\nEnlightenment", anchor: "middle" as const },
  { x: 0.95, label: "Plateau of\nProductivity", anchor: "middle" as const },
];

// Markers on the curve
const MARKERS = [
  { x: 0.28, label: "AI dnes\n(2024–25)", color: colors.blue[400], delay: 90 },
  {
    x: 0.44,
    label: "Dot-com\n(2001)",
    color: colors.semantic.warning,
    delay: 120,
  },
  {
    x: 0.9,
    label: "Internet\n(2010+)",
    color: colors.semantic.success,
    delay: 150,
  },
];

// Interpolate y on the curve for a given x (0-1)
function yAtX(x: number): number {
  for (let i = 0; i < CURVE_PTS.length - 1; i++) {
    const [x0, y0] = CURVE_PTS[i];
    const [x1, y1] = CURVE_PTS[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return CURVE_PTS[CURVE_PTS.length - 1][1];
}

// Build SVG polyline points string up to revealFraction (0-1)
function buildPoints(revealFraction: number): string {
  const totalPts = 200;
  const pts: string[] = [];
  for (let i = 0; i <= totalPts * revealFraction; i++) {
    const x = i / totalPts;
    const y = yAtX(x);
    const [sx, sy] = toSvg([x, y]);
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return pts.join(" ");
}

export const HypeCycleChart: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Curve draws in over 60 frames
  const curveReveal = interpolate(frame, [5, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade
  const exitStart = durationInFrames - 20;
  const exitOpacity =
    frame >= exitStart
      ? 1 - spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 1;

  const points = buildPoints(curveReveal);

  return (
    <div style={{ opacity: exitOpacity, ...style }}>
      {/* Title */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 26,
          color: colors.purple[100],
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 12,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Gartner Hype Cycle — kde je AI?
      </div>

      <svg width={W} height={H}>
        {/* Axes */}
        <line
          x1={PAD.left}
          y1={PAD.top + CH}
          x2={PAD.left + CW}
          y2={PAD.top + CH}
          stroke={colors.navy[600]}
          strokeWidth={2}
        />
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={PAD.top + CH}
          stroke={colors.navy[600]}
          strokeWidth={2}
        />

        {/* Axis labels */}
        <text
          x={PAD.left + CW / 2}
          y={H - 8}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontSize={13}
          fill={colors.purple[300]}
          letterSpacing={1.5}
        >
          ČAS →
        </text>
        <text
          x={14}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontSize={13}
          fill={colors.purple[300]}
          letterSpacing={1.5}
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
        >
          OČEKÁVÁNÍ
        </text>

        {/* Glow gradient definition */}
        <defs>
          <filter id="hype-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.blue[400]} />
            <stop offset="50%" stopColor={colors.purple[600]} />
            <stop offset="100%" stopColor={colors.semantic.success} />
          </linearGradient>
        </defs>

        {/* Main curve */}
        {curveReveal > 0 && (
          <>
            {/* Glow trail */}
            <polyline
              points={points}
              fill="none"
              stroke={colors.purple[600]}
              strokeWidth={8}
              strokeOpacity={0.25}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Main line */}
            <polyline
              points={points}
              fill="none"
              stroke="url(#curve-grad)"
              strokeWidth={4}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#hype-glow)"
            />
          </>
        )}

        {/* Phase labels — appear staggered */}
        {PHASES.map((phase, i) => {
          const phaseFrame = 30 + i * 14;
          const phaseProgress = interpolate(
            frame,
            [phaseFrame, phaseFrame + 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          if (phaseProgress === 0) return null;
          const [sx] = toSvg([phase.x, 0]);
          const lines = phase.label.split("\n");
          return (
            <g key={phase.label} opacity={phaseProgress}>
              {/* Tick */}
              <line
                x1={sx}
                y1={PAD.top + CH}
                x2={sx}
                y2={PAD.top + CH + 8}
                stroke={colors.navy[600]}
                strokeWidth={1.5}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={sx}
                  y={PAD.top + CH + 24 + li * 16}
                  textAnchor={phase.anchor}
                  fontFamily={fonts.mono}
                  fontSize={11}
                  fill={colors.purple[300]}
                  letterSpacing={0.5}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Markers (AI, Dot-com, Internet) */}
        {MARKERS.map((marker) => {
          const markerProgress = spring({
            frame: Math.max(0, frame - marker.delay),
            fps,
            config: springs.bouncy,
          });
          if (markerProgress < 0.01) return null;
          const yVal = yAtX(marker.x);
          const [sx, sy] = toSvg([marker.x, yVal]);
          const lines = marker.label.split("\n");
          const isAI = marker.label.includes("AI");
          return (
            <g key={marker.label}>
              {/* Vertical dashed line */}
              <line
                x1={sx}
                y1={sy}
                x2={sx}
                y2={PAD.top + CH}
                stroke={marker.color}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                opacity={markerProgress * 0.6}
              />
              {/* Dot on curve */}
              <circle
                cx={sx}
                cy={sy}
                r={isAI ? 10 * markerProgress : 7 * markerProgress}
                fill={marker.color}
                filter={isAI ? "url(#hype-glow)" : undefined}
                opacity={markerProgress}
              />
              {/* Label box */}
              <g
                transform={`translate(${sx}, ${sy - 18 - (isAI ? 16 : 0)}) scale(${markerProgress})`}
                style={{ transformOrigin: `${sx}px ${sy - 18}px` }}
              >
                <rect
                  x={-56}
                  y={-38 * lines.length - 4}
                  width={112}
                  height={38 * lines.length + 4}
                  rx={6}
                  fill={colors.navy[800]}
                  stroke={marker.color}
                  strokeWidth={1.5}
                  opacity={0.95}
                />
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={0}
                    y={-38 * lines.length + 8 + li * 20}
                    textAnchor="middle"
                    fontFamily={li === 0 ? fonts.primary : fonts.mono}
                    fontWeight={li === 0 ? fontWeight.heading : fontWeight.body}
                    fontSize={li === 0 ? 15 : 12}
                    fill={li === 0 ? marker.color : colors.purple[200]}
                  >
                    {line}
                  </text>
                ))}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
