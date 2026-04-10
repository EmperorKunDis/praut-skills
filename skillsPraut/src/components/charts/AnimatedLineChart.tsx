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
