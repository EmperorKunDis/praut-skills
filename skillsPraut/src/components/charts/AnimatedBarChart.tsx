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
  const { fps, durationInFrames } = useVideoConfig();
  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  // Exit — bars shrink down in last 18 frames
  const exitStart = durationInFrames - 18;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;
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
        const barHeight =
          (bar.value / max) * height * progress * (1 - exitProgress);
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
              opacity={progress * (1 - exitProgress)}
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
