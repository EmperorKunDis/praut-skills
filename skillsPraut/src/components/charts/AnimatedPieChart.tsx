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
