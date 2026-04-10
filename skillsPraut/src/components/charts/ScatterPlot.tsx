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
