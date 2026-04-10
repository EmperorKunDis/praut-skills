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
