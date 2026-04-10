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
