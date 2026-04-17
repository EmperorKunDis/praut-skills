// ============================================================
// AnimatedLineChart.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, glow, timing } from "../../styles/tokens";

export type Point = {
  label: string;
  value: number;
};

type Props = {
  data: Point[];
  width?: number;
  height?: number;
  startFrame?: number;
  durationFrames?: number;
  style?: React.CSSProperties;
};

export const AnimatedLineChart: React.FC<Props> = ({
  data,
  width = 1200,
  height = 500,
  startFrame = 0,
  durationFrames = timing.reveal,
  style,
}) => {
  const frame = useCurrentFrame();
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.value - min) / range) * height * 0.8 - 20;
    return { x, y, label: d.label, value: d.value };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const dashOffset = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [2000, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <svg width={width} height={height + 50} style={style}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          x2={width}
          y1={height * (1 - t)}
          y2={height * (1 - t)}
          stroke={colors.navy[700]}
          strokeWidth={1}
        />
      ))}
      <path
        d={path}
        fill="none"
        stroke={colors.purple[600]}
        strokeWidth={4}
        strokeDasharray={2000}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`drop-shadow(${glow.subtle})`}
      />
      {points.map((p, i) => {
        const reveal = interpolate(
          frame - startFrame,
          [
            (i / points.length) * durationFrames,
            ((i + 1) / points.length) * durationFrames,
          ],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <g key={i} opacity={reveal}>
            <circle cx={p.x} cy={p.y} r={6} fill={colors.blue[400]} />
            <text
              x={p.x}
              y={height + 32}
              textAnchor="middle"
              fill={colors.purple[100]}
              fontFamily={fonts.mono}
              fontSize={13}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ============================================================
// AnimatedBarChart.tsx
// ============================================================
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  seriesColors,
  springs,
} from "../../styles/tokens";

export type Bar = {
  label: string;
  value: number;
  highlight?: boolean;
};

type Props = {
  data: Bar[];
  maxValue?: number;
  width?: number;
  height?: number;
  staggerFrames?: number;
  style?: React.CSSProperties;
};

/**
 * Praut animated bar chart — staggered spring growth, brand series colors,
 * navy gridlines, optional highlighted winner with cta glow.
 */
export const AnimatedBarChart: React.FC<Props> = ({
  data,
  maxValue,
  width = 1200,
  height = 600,
  staggerFrames = 6,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  const barWidth = (width - (data.length - 1) * 24) / data.length;

  return (
    <svg width={width} height={height + 80} style={style}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          x2={width}
          y1={height * (1 - t)}
          y2={height * (1 - t)}
          stroke={colors.navy[700]}
          strokeWidth={1}
        />
      ))}

      {data.map((bar, i) => {
        const localFrame = frame - i * staggerFrames;
        const progress = spring({
          frame: localFrame,
          fps,
          config: springs.smooth,
        });
        const barHeight = (bar.value / max) * height * progress;
        const fill = bar.highlight
          ? colors.purple[600]
          : seriesColors[i % seriesColors.length];

        return (
          <g key={bar.label}>
            <rect
              x={i * (barWidth + 24)}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              fill={fill}
              rx={6}
              filter={bar.highlight ? `drop-shadow(${glow.cta})` : undefined}
            />
            <text
              x={i * (barWidth + 24) + barWidth / 2}
              y={Math.max(24, height - barHeight - 14)}
              textAnchor="middle"
              fill={colors.purple[50]}
              fontFamily={fonts.primary}
              fontWeight={fontWeight.heading}
              fontSize={22}
              opacity={progress}
            >
              {bar.value.toLocaleString("cs-CZ")}
            </text>
            <text
              x={i * (barWidth + 24) + barWidth / 2}
              y={height + 28}
              textAnchor="middle"
              fill={colors.purple[50]}
              fontFamily={fonts.mono}
              fontSize={14}
              fontWeight={fontWeight.body}
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ============================================================
// AnimatedPieChart.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, seriesColors, timing } from "../../styles/tokens";

export type Slice = {
  label: string;
  value: number;
};

type Props = {
  data: Slice[];
  size?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const arcPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
};

export const AnimatedPieChart: React.FC<Props> = ({
  data,
  size = 480,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 20;

  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let angle = 0;
  return (
    <svg width={size} height={size} style={style}>
      {data.map((slice, i) => {
        const sliceAngle = (slice.value / total) * 360 * reveal;
        const path = arcPath(cx, cy, r, angle, angle + sliceAngle);
        const midAngle = angle + sliceAngle / 2;
        const labelPos = polarToCartesian(cx, cy, r * 0.65, midAngle);
        const out = (
          <g key={i}>
            <path
              d={path}
              fill={seriesColors[i % seriesColors.length]}
              stroke={colors.navy[950]}
              strokeWidth={2}
            />
            {sliceAngle > 18 ? (
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                fill={colors.purple[50]}
                fontFamily={fonts.primary}
                fontSize={18}
                fontWeight={700}
              >
                {Math.round((slice.value / total) * 100)}%
              </text>
            ) : null}
          </g>
        );
        angle += sliceAngle;
        return out;
      })}
    </svg>
  );
};

// ============================================================
// BenchmarkTable.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Row = {
  model: string;
  scores: Array<{ benchmark: string; value: number; isBest?: boolean }>;
};

type Props = {
  rows: Row[];
  style?: React.CSSProperties;
};

/**
 * Tabular benchmark display (e.g. MMLU / HumanEval / GSM8K).
 * Highlights best score per cell.
 */
export const BenchmarkTable: React.FC<Props> = ({ rows, style }) => {
  const benchmarks = rows[0]?.scores.map((s) => s.benchmark) ?? [];

  return (
    <table
      style={{
        borderCollapse: "collapse",
        fontFamily: fonts.primary,
        color: colors.purple[100],
        ...style,
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: "left",
              padding: "12px 24px",
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[100],
              borderBottom: `1px solid ${withOpacity(colors.blue[400], 0.4)}`,
            }}
          >
            Model
          </th>
          {benchmarks.map((b, i) => (
            <th
              key={i}
              style={{
                padding: "12px 24px",
                fontFamily: fonts.mono,
                fontSize: 12,
                color: colors.purple[100],
                borderBottom: `1px solid ${withOpacity(colors.blue[400], 0.4)}`,
              }}
            >
              {b}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td
              style={{
                padding: "14px 24px",
                fontWeight: fontWeight.heading,
                fontSize: 18,
                color: colors.purple[50],
                borderBottom: `1px solid ${colors.navy[700]}`,
              }}
            >
              {row.model}
            </td>
            {row.scores.map((s, si) => (
              <td
                key={si}
                style={{
                  padding: "14px 24px",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: s.isBest ? fontWeight.heading : fontWeight.body,
                  background: s.isBest ? gradients.brandPrimary : undefined,
                  WebkitBackgroundClip: s.isBest ? "text" : undefined,
                  WebkitTextFillColor: s.isBest ? "transparent" : undefined,
                  backgroundClip: s.isBest ? "text" : undefined,
                  color: s.isBest ? undefined : colors.purple[100],
                  borderBottom: `1px solid ${colors.navy[700]}`,
                }}
              >
                {s.value.toFixed(1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ============================================================
// ComparisonChart.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";

type Row = {
  label: string;
  a: number;
  b: number;
};

type Props = {
  rows: Row[];
  labelA: string;
  labelB: string;
  startFrame?: number;
  width?: number;
  style?: React.CSSProperties;
};

/**
 * Side-by-side comparison bar chart — Model A vs Model B per row.
 */
export const ComparisonChart: React.FC<Props> = ({
  rows,
  labelA,
  labelB,
  startFrame = 0,
  width = 1100,
  style,
}) => {
  const frame = useCurrentFrame();
  const max = Math.max(...rows.flatMap((r) => [r.a, r.b]));
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width, ...style }}>
      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 24,
          fontFamily: fonts.mono,
          fontSize: 13,
          color: colors.purple[100],
          letterSpacing: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: colors.purple[600],
            }}
          />
          {labelA}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: colors.blue[400],
            }}
          />
          {labelB}
        </div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: fonts.primary,
              fontSize: 16,
              color: colors.purple[100],
              fontWeight: fontWeight.body,
              marginBottom: 8,
            }}
          >
            {row.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                width: `${(row.a / max) * 100 * reveal}%`,
                height: 18,
                background: colors.purple[600],
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: `${(row.b / max) * 100 * reveal}%`,
                height: 18,
                background: colors.blue[400],
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// DonutChart.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  seriesColors,
} from "../../styles/tokens";
import { CountUpNumber } from "../typography/CountUpNumber";

export type Slice = {
  label: string;
  value: number;
};

type Props = {
  data: Slice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  style?: React.CSSProperties;
};

const polar = (cx: number, cy: number, r: number, a: number) => {
  const rad = ((a - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const arc = (cx: number, cy: number, r: number, a1: number, a2: number) => {
  const start = polar(cx, cy, r, a2);
  const end = polar(cx, cy, r, a1);
  const large = a2 - a1 <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
};

export const DonutChart: React.FC<Props> = ({
  data,
  size = 420,
  thickness = 60,
  centerLabel,
  style,
}) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - thickness / 2;
  let angle = 0;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg width={size} height={size}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={colors.navy[700]}
          strokeWidth={thickness}
          fill="none"
        />
        {data.map((slice, i) => {
          const sliceAngle = (slice.value / total) * 360;
          const path = arc(cx, cy, r, angle, angle + sliceAngle);
          const out = (
            <path
              key={i}
              d={path}
              fill="none"
              stroke={seriesColors[i % seriesColors.length]}
              strokeWidth={thickness}
              strokeLinecap="butt"
            />
          );
          angle += sliceAngle;
          return out;
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CountUpNumber to={data[0]?.value ?? 0} fontSize={64} />
        {centerLabel ? (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[100],
              marginTop: 6,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            {centerLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};

// ============================================================
// GrowthCurve.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, glow, timing } from "../../styles/tokens";

type Props = {
  width?: number;
  height?: number;
  exponent?: number;
  startFrame?: number;
  xLabel?: string;
  yLabel?: string;
  style?: React.CSSProperties;
};

/**
 * Exponential growth curve — visual for "compute / parameters / cost"
 * scaling stories.
 */
export const GrowthCurve: React.FC<Props> = ({
  width = 1100,
  height = 500,
  exponent = 2,
  startFrame = 0,
  xLabel = "Čas",
  yLabel = "Compute",
  style,
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const points: string[] = [];
  const samples = 60;
  for (let i = 0; i <= samples * reveal; i++) {
    const x = (i / samples) * width;
    const t = i / samples;
    const y = height - Math.pow(t, exponent) * height;
    points.push(`${x},${y}`);
  }

  return (
    <svg width={width} height={height + 50} style={style}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          x2={width}
          y1={height * (1 - t)}
          y2={height * (1 - t)}
          stroke={colors.navy[700]}
          strokeWidth={1}
        />
      ))}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={colors.purple[600]}
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
        filter={`drop-shadow(${glow.subtle})`}
      />
      <text
        x={width - 10}
        y={height + 32}
        textAnchor="end"
        fontFamily={fonts.mono}
        fontSize={12}
        fill={colors.purple[100]}
      >
        {xLabel} →
      </text>
      <text
        x={10}
        y={20}
        fontFamily={fonts.mono}
        fontSize={12}
        fill={colors.purple[100]}
      >
        ↑ {yLabel}
      </text>
    </svg>
  );
};

// ============================================================
// HeatmapGrid.tsx
// ============================================================
import React from "react";
import { colors, fonts } from "../../styles/tokens";
import { interpolateColors } from "../../hooks/interpolateColors";

type Props = {
  rows: string[];
  cols: string[];
  values: number[][]; // values[row][col] in 0..1
  cellSize?: number;
  style?: React.CSSProperties;
};

/**
 * Heatmap grid (e.g. attention matrix). Cells colored from
 * `colors.navy[800]` → `colors.purple[600]` based on value.
 */
export const HeatmapGrid: React.FC<Props> = ({
  rows,
  cols,
  values,
  cellSize = 60,
  style,
}) => {
  return (
    <div style={{ display: "inline-block", ...style }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `auto repeat(${cols.length}, ${cellSize}px)`,
          gap: 2,
        }}
      >
        <div />
        {cols.map((c, i) => (
          <div
            key={i}
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              color: colors.purple[100],
              textAlign: "center",
              paddingBottom: 4,
            }}
          >
            {c}
          </div>
        ))}
        {rows.map((r, ri) => (
          <React.Fragment key={ri}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                color: colors.purple[100],
                paddingRight: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {r}
            </div>
            {cols.map((_, ci) => {
              const v = values[ri]?.[ci] ?? 0;
              return (
                <div
                  key={ci}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    background: interpolateColors(
                      v,
                      colors.navy[800],
                      colors.purple[600],
                    ),
                    borderRadius: 4,
                  }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// KPIGrid.tsx
// ============================================================
import React from "react";
import { MetricCard } from "./MetricCard";

type Item = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  deltaPositive?: boolean;
};

type Props = {
  items: Item[];
  columns?: number;
  style?: React.CSSProperties;
};

export const KPIGrid: React.FC<Props> = ({ items, columns = 3, style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 24,
      ...style,
    }}
  >
    {items.map((item, i) => (
      <MetricCard key={i} {...item} />
    ))}
  </div>
);

// ============================================================
// MetricCard.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  frame,
  glow,
  gradients,
  withOpacity,
} from "../../styles/tokens";
import { CountUpNumber } from "../typography/CountUpNumber";

type Props = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  deltaPositive?: boolean;
  style?: React.CSSProperties;
};

/**
 * Big metric card with animated count-up.
 */
export const MetricCard: React.FC<Props> = ({
  label,
  value,
  prefix,
  suffix,
  delta,
  deltaPositive = true,
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: frame.borderRadius * 3,
        padding: 40,
        boxShadow: glow.subtle,
        minWidth: 320,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: colors.purple[100],
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      <CountUpNumber to={value} prefix={prefix} suffix={suffix} fontSize={72} />
      {delta ? (
        <div
          style={{
            marginTop: 12,
            fontFamily: fonts.mono,
            fontSize: 14,
            color: deltaPositive
              ? colors.semantic.success
              : colors.semantic.error,
            fontWeight: fontWeight.bodyEmphasis,
          }}
        >
          {deltaPositive ? "▲" : "▼"} {delta}
        </div>
      ) : null}
    </div>
  );
};

// ============================================================
// PercentageBar.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  timing,
} from "../../styles/tokens";

type Props = {
  percent: number; // 0..100
  label?: string;
  width?: number;
  height?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

export const PercentageBar: React.FC<Props> = ({
  percent,
  label,
  width = 800,
  height = 32,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const fill = interpolate(
    frame - startFrame,
    [0, timing.reveal],
    [0, percent],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ width, ...style }}>
      {label ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: fonts.primary,
            fontSize: 16,
            color: colors.purple[100],
            marginBottom: 8,
            fontWeight: fontWeight.body,
          }}
        >
          <span>{label}</span>
          <span style={{ fontFamily: fonts.mono }}>{Math.round(fill)}%</span>
        </div>
      ) : null}
      <div
        style={{
          width: "100%",
          height,
          background: colors.navy[800],
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${fill}%`,
            height: "100%",
            background: gradients.brandPrimary,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================
// RadarChart.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, seriesColors, timing } from "../../styles/tokens";

export type RadarAxis = {
  label: string;
  max?: number;
};

export type RadarSeries = {
  name: string;
  values: number[]; // length must equal axes.length
};

type Props = {
  axes: RadarAxis[];
  series: RadarSeries[];
  size?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

export const RadarChart: React.FC<Props> = ({
  axes,
  series,
  size = 520,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 50;
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const point = (axisIndex: number, value: number, max: number) => {
    const angle = (axisIndex / axes.length) * Math.PI * 2 - Math.PI / 2;
    const r = (value / max) * radius * reveal;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  };

  return (
    <svg width={size} height={size} style={style}>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <polygon
          key={t}
          points={axes
            .map((_, i) => {
              const angle = (i / axes.length) * Math.PI * 2 - Math.PI / 2;
              return `${cx + Math.cos(angle) * radius * t},${cy + Math.sin(angle) * radius * t}`;
            })
            .join(" ")}
          fill="none"
          stroke={colors.navy[700]}
          strokeWidth={1}
        />
      ))}
      {axes.map((axis, i) => {
        const angle = (i / axes.length) * Math.PI * 2 - Math.PI / 2;
        const lx = cx + Math.cos(angle) * (radius + 24);
        const ly = cy + Math.sin(angle) * (radius + 24);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            fontFamily={fonts.mono}
            fontSize={12}
            fill={colors.purple[100]}
          >
            {axis.label}
          </text>
        );
      })}
      {series.map((s, si) => {
        const points = s.values.map((v, ai) =>
          point(ai, v, axes[ai].max ?? 100),
        );
        return (
          <g key={si}>
            <polygon
              points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              fill={seriesColors[si % seriesColors.length] + "40"}
              stroke={seriesColors[si % seriesColors.length]}
              strokeWidth={2}
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={seriesColors[si % seriesColors.length]}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// ============================================================
// ScatterPlot.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, glow, seriesColors, timing } from "../../styles/tokens";

type Point = {
  x: number;
  y: number;
  label?: string;
  highlight?: boolean;
};

type Props = {
  points: Point[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  startFrame?: number;
  style?: React.CSSProperties;
};

export const ScatterPlot: React.FC<Props> = ({
  points,
  width = 1100,
  height = 600,
  xLabel = "Cena",
  yLabel = "Výkon",
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);

  const project = (p: Point) => ({
    x: ((p.x - xMin) / (xMax - xMin || 1)) * (width - 80) + 60,
    y: height - (((p.y - yMin) / (yMax - yMin || 1)) * (height - 80) + 60),
  });

  return (
    <svg width={width} height={height + 40} style={style}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={60}
          x2={width - 20}
          y1={height * (1 - t)}
          y2={height * (1 - t)}
          stroke={colors.navy[700]}
          strokeWidth={1}
        />
      ))}
      {points.map((p, i) => {
        const proj = project(p);
        const r = 8 * reveal;
        const fill = p.highlight
          ? colors.purple[600]
          : seriesColors[i % seriesColors.length];
        return (
          <g key={i}>
            <circle
              cx={proj.x}
              cy={proj.y}
              r={r}
              fill={fill}
              filter={p.highlight ? `drop-shadow(${glow.cta})` : undefined}
            />
            {p.label ? (
              <text
                x={proj.x + 12}
                y={proj.y + 4}
                fontFamily={fonts.mono}
                fontSize={11}
                fill={colors.purple[200]}
              >
                {p.label}
              </text>
            ) : null}
          </g>
        );
      })}
      <text
        x={width - 20}
        y={height + 28}
        textAnchor="end"
        fontFamily={fonts.mono}
        fontSize={12}
        fill={colors.purple[100]}
      >
        {xLabel} →
      </text>
      <text
        x={10}
        y={20}
        fontFamily={fonts.mono}
        fontSize={12}
        fill={colors.purple[100]}
      >
        ↑ {yLabel}
      </text>
    </svg>
  );
};

// ============================================================
// StackedBarChart.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, seriesColors, timing } from "../../styles/tokens";

type Segment = {
  label: string;
  value: number;
};

type Props = {
  groups: Array<{ label: string; segments: Segment[] }>;
  width?: number;
  height?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

export const StackedBarChart: React.FC<Props> = ({
  groups,
  width = 1200,
  height = 500,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totals = groups.map((g) =>
    g.segments.reduce((s, seg) => s + seg.value, 0),
  );
  const max = Math.max(...totals);
  const barWidth = (width - (groups.length - 1) * 32) / groups.length;

  return (
    <svg width={width} height={height + 50} style={style}>
      {groups.map((group, gi) => {
        const total = totals[gi];
        const x = gi * (barWidth + 32);
        let yCursor = height;
        return (
          <g key={gi}>
            {group.segments.map((seg, si) => {
              const segHeight = (seg.value / max) * height * reveal;
              yCursor -= segHeight;
              return (
                <rect
                  key={si}
                  x={x}
                  y={yCursor}
                  width={barWidth}
                  height={segHeight}
                  fill={seriesColors[si % seriesColors.length]}
                />
              );
            })}
            <text
              x={x + barWidth / 2}
              y={height + 28}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontSize={13}
              fill={colors.purple[100]}
            >
              {group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ============================================================
// TimelineChart.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";

type Event = {
  year: string;
  title: string;
  highlight?: boolean;
};

type Props = {
  events: Event[];
  startFrame?: number;
  style?: React.CSSProperties;
};

export const TimelineChart: React.FC<Props> = ({
  events,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "40px 0",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: `${reveal * 100}%`,
          height: 3,
          background: colors.blue[400],
          boxShadow: glow.subtle,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {events.map((e, i) => {
          const eventReveal = interpolate(
            frame - startFrame - i * 8,
            [0, 24],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: eventReveal,
                transform: `translateY(${(1 - eventReveal) * 12}px)`,
              }}
            >
              <div
                style={{
                  width: e.highlight ? 24 : 16,
                  height: e.highlight ? 24 : 16,
                  borderRadius: "50%",
                  background: e.highlight
                    ? colors.purple[600]
                    : colors.blue[400],
                  border: `2px solid ${colors.navy[950]}`,
                  filter: e.highlight ? `drop-shadow(${glow.cta})` : undefined,
                }}
              />
              <div
                style={{
                  marginTop: 16,
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: colors.purple[100],
                }}
              >
                {e.year}
              </div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontSize: 14,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: colors.purple[100],
                  textAlign: "center",
                  maxWidth: 120,
                  marginTop: 4,
                }}
              >
                {e.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
