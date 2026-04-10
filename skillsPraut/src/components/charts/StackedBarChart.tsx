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
