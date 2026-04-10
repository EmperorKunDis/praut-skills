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
    <svg width={width} height={height + 60} style={style}>
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
              y={height - barHeight - 12}
              textAnchor="middle"
              fill={colors.purple[100]}
              fontFamily={fonts.primary}
              fontWeight={fontWeight.bodyEmphasis}
              fontSize={20}
              opacity={interpolate(localFrame, [12, 24], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            >
              {bar.value.toLocaleString("cs-CZ")}
            </text>
            <text
              x={i * (barWidth + 24) + barWidth / 2}
              y={height + 28}
              textAnchor="middle"
              fill={colors.purple[100]}
              fontFamily={fonts.mono}
              fontSize={14}
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
