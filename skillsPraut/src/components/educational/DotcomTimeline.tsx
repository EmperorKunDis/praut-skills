// src/components/educational/DotcomTimeline.tsx
// Horizontal timeline: Dot-com bubble → Internet today → AI parallel.
// Teaches the pattern: bublina splaskne, technologie zůstane.

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, glow, springs } from "../../styles/tokens";

type Event = {
  year: string;
  label: string;
  sublabel?: string;
  type: "dotcom" | "internet" | "ai" | "future";
  xFrac: number; // 0–1 horizontal position
};

const EVENTS: Event[] = [
  {
    year: "1994",
    label: "Netscape IPO",
    sublabel: "Internet hype začíná",
    type: "dotcom",
    xFrac: 0.04,
  },
  {
    year: "2000",
    label: "Dot-com bublina",
    sublabel: "NASDAQ -78 %",
    type: "dotcom",
    xFrac: 0.18,
  },
  {
    year: "2004",
    label: "Google IPO",
    sublabel: "Skutečný byznys přichází",
    type: "internet",
    xFrac: 0.32,
  },
  {
    year: "2007",
    label: "iPhone",
    sublabel: "Mobilní revoluce",
    type: "internet",
    xFrac: 0.43,
  },
  {
    year: "2010+",
    label: "Amazon, Netflix...",
    sublabel: "Internet = infrastruktura",
    type: "internet",
    xFrac: 0.56,
  },
  {
    year: "2022",
    label: "ChatGPT",
    sublabel: "AI hype exploduje",
    type: "ai",
    xFrac: 0.7,
  },
  {
    year: "2024–25",
    label: "AI bublina?",
    sublabel: "95 % pilotů bez ROI",
    type: "ai",
    xFrac: 0.82,
  },
  {
    year: "2030+",
    label: "AI = infrastruktura",
    sublabel: "Stejný pattern",
    type: "future",
    xFrac: 0.96,
  },
];

const TYPE_COLOR: Record<Event["type"], string> = {
  dotcom: colors.semantic.warning,
  internet: colors.semantic.success,
  ai: colors.blue[400],
  future: colors.purple[400],
};

const TYPE_LABEL: Record<Event["type"], string> = {
  dotcom: "DOT-COM",
  internet: "INTERNET",
  ai: "AI",
  future: "BUDOUCNOST",
};

const W = 1400;
const AXIS_Y = 240;
const TOP_Y = 100; // events above axis (alternating)
const BOT_Y = 340; // events below axis

export const DotcomTimeline: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Line draws in from left
  const lineReveal = interpolate(frame, [5, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitStart = durationInFrames - 20;
  const exitOpacity =
    frame >= exitStart
      ? 1 - spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 1;

  // Legend appear
  const legendOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          marginBottom: 8,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Pattern se opakuje: bublina splaskne, technologie zůstane
      </div>

      <svg width={W} height={520}>
        <defs>
          <filter id="dot-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main axis line */}
        <line
          x1={20}
          y1={AXIS_Y}
          x2={20 + (W - 40) * lineReveal}
          y2={AXIS_Y}
          stroke={colors.navy[600]}
          strokeWidth={3}
        />
        {/* Arrow tip */}
        {lineReveal > 0.98 && (
          <polygon
            points={`${W - 10},${AXIS_Y} ${W - 26},${AXIS_Y - 8} ${W - 26},${AXIS_Y + 8}`}
            fill={colors.navy[600]}
          />
        )}

        {/* Events */}
        {EVENTS.map((ev, i) => {
          const evDelay = 18 + i * 12;
          const evProgress = spring({
            frame: Math.max(0, frame - evDelay),
            fps,
            config: springs.bouncy,
          });
          if (evProgress < 0.01) return null;

          const x = 20 + ev.xFrac * (W - 40);
          const above = i % 2 === 0;
          const textY = above ? TOP_Y : BOT_Y;
          const dotY = AXIS_Y;
          const lineEndY = above ? TOP_Y + 60 : BOT_Y - 60;
          const col = TYPE_COLOR[ev.type];

          return (
            <g key={ev.year} opacity={evProgress}>
              {/* Connector line */}
              <line
                x1={x}
                y1={dotY + (above ? -10 : 10)}
                x2={x}
                y2={lineEndY}
                stroke={col}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                opacity={0.6}
              />

              {/* Dot on axis */}
              <circle
                cx={x}
                cy={dotY}
                r={ev.type === "ai" || ev.type === "future" ? 9 : 7}
                fill={col}
                filter="url(#dot-glow)"
                transform={`scale(${evProgress})`}
                style={{ transformOrigin: `${x}px ${dotY}px` }}
              />

              {/* Year */}
              <text
                x={x}
                y={above ? textY - 8 : textY + 8}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontSize={12}
                fontWeight={fontWeight.bodyEmphasis}
                fill={col}
                letterSpacing={0.5}
              >
                {ev.year}
              </text>

              {/* Event label */}
              <text
                x={x}
                y={above ? textY + 18 : textY + 28}
                textAnchor="middle"
                fontFamily={fonts.primary}
                fontSize={15}
                fontWeight={fontWeight.heading}
                fill={colors.purple[50]}
              >
                {ev.label}
              </text>

              {/* Sublabel */}
              {ev.sublabel && (
                <text
                  x={x}
                  y={above ? textY + 38 : textY + 48}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontSize={11}
                  fill={colors.purple[300]}
                >
                  {ev.sublabel}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        {(["dotcom", "internet", "ai", "future"] as Event["type"][]).map(
          (type, i) => {
            const lx = 80 + i * 320;
            const ly = 480;
            return (
              <g key={type} opacity={legendOpacity}>
                <circle cx={lx} cy={ly} r={6} fill={TYPE_COLOR[type]} />
                <text
                  x={lx + 14}
                  y={ly + 5}
                  fontFamily={fonts.mono}
                  fontSize={11}
                  fill={TYPE_COLOR[type]}
                  letterSpacing={1.5}
                >
                  {TYPE_LABEL[type]}
                </text>
              </g>
            );
          },
        )}
      </svg>
    </div>
  );
};
