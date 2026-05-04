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

type Bar = {
  label: string;
  value: number;
  color: string;
};

const BARS: Bar[] = [
  { label: "Vague", value: 18, color: colors.semantic.error },
  { label: "Basic", value: 45, color: colors.semantic.warning },
  { label: "Detailed", value: 78, color: colors.blue[400] },
  { label: "Expert", value: 95, color: colors.purple[600] },
];

const CHART_W = 900;
const CHART_H = 420;
const BAR_GAP = 40;
const AXIS_LEFT = 60;
const AXIS_BOTTOM = 48;
const STAGGER = 10;

export const PromptQualityChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const titleProgress = spring({ frame, fps, config: springs.smooth });

  const barW =
    (CHART_W - AXIS_LEFT - BAR_GAP * (BARS.length - 1)) / BARS.length;
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        fontFamily: fonts.primary,
        opacity: interpolate(exitProgress, [0, 1], [1, 0]),
      }}
    >
      <div
        style={{
          fontSize: typeScale.h2.size,
          fontWeight: fontWeight.display,
          color: colors.purple[50],
          textAlign: "center",
          marginBottom: 48,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [24, 0])}px)`,
        }}
      >
        Specifičnost = Kvalita — zákon AI promptingu
      </div>

      <svg
        width={CHART_W}
        height={CHART_H + AXIS_BOTTOM + 60}
        style={{ overflow: "visible" }}
      >
        {/* Grid lines */}
        {gridLines.map((pct) => {
          const y = CHART_H - (pct / 100) * CHART_H;
          return (
            <g key={pct}>
              <line
                x1={AXIS_LEFT}
                x2={CHART_W}
                y1={y}
                y2={y}
                stroke={withOpacity(colors.purple[600], 0.12)}
                strokeWidth={1}
                strokeDasharray={pct === 0 ? "none" : "4 6"}
              />
              <text
                x={AXIS_LEFT - 10}
                y={y + 5}
                textAnchor="end"
                fill={colors.purple[300]}
                fontFamily={fonts.mono}
                fontSize={13}
              >
                {pct}
              </text>
            </g>
          );
        })}

        {/* Y-axis label */}
        <text
          x={14}
          y={CHART_H / 2}
          textAnchor="middle"
          fill={colors.purple[300]}
          fontFamily={fonts.mono}
          fontSize={13}
          transform={`rotate(-90, 14, ${CHART_H / 2})`}
        >
          Kvalita výstupu (%)
        </text>

        {/* X-axis label */}
        <text
          x={AXIS_LEFT + (CHART_W - AXIS_LEFT) / 2}
          y={CHART_H + AXIS_BOTTOM + 44}
          textAnchor="middle"
          fill={colors.purple[300]}
          fontFamily={fonts.mono}
          fontSize={13}
        >
          Specifičnost promptu →
        </text>

        {/* Bars */}
        {BARS.map((bar, i) => {
          const localFrame = frame - i * STAGGER;
          const progress = spring({
            frame: localFrame,
            fps,
            config: springs.smooth,
          });
          const barH =
            (bar.value / 100) * CHART_H * progress * (1 - exitProgress);
          const x = AXIS_LEFT + i * (barW + BAR_GAP);
          const y = CHART_H - barH;
          const isLast = i === BARS.length - 1;

          return (
            <g key={bar.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={bar.color}
                rx={6}
                filter={isLast ? `drop-shadow(${glow.cta})` : undefined}
                opacity={0.92}
              />

              {/* Value badge above bar */}
              <g opacity={progress * (1 - exitProgress)}>
                <rect
                  x={x + barW / 2 - 28}
                  y={Math.max(4, y - 36)}
                  width={56}
                  height={26}
                  fill={withOpacity(bar.color, 0.2)}
                  stroke={bar.color}
                  strokeWidth={1}
                  rx={6}
                />
                <text
                  x={x + barW / 2}
                  y={Math.max(4, y - 36) + 17}
                  textAnchor="middle"
                  fill={bar.color}
                  fontFamily={fonts.mono}
                  fontWeight={fontWeight.heading}
                  fontSize={14}
                >
                  {bar.value}%
                </text>
              </g>

              {/* X-axis label */}
              <text
                x={x + barW / 2}
                y={CHART_H + 28}
                textAnchor="middle"
                fill={colors.purple[50]}
                fontFamily={fonts.primary}
                fontWeight={fontWeight.bodyEmphasis}
                fontSize={15}
              >
                {bar.label}
              </text>

              {/* Annotation on last bar */}
              {isLast && (
                <g opacity={progress * (1 - exitProgress)}>
                  <text
                    x={x + barW + 16}
                    y={y + barH / 2 - 8}
                    fill={colors.purple[600]}
                    fontFamily={fonts.mono}
                    fontWeight={fontWeight.bodyEmphasis}
                    fontSize={13}
                  >
                    ← Cíl:
                  </text>
                  <text
                    x={x + barW + 16}
                    y={y + barH / 2 + 10}
                    fill={colors.purple[600]}
                    fontFamily={fonts.mono}
                    fontWeight={fontWeight.bodyEmphasis}
                    fontSize={13}
                  >
                    Expert prompt
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
