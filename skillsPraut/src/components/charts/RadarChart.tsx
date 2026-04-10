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
