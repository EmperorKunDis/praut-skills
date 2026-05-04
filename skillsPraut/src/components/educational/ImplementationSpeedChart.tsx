import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  springs,
  typeScale,
  withOpacity,
} from "../../styles/tokens";

type TimelineItem = {
  label: string;
  time: string;
  position: number;
  color: string;
  startFrame: number;
};

const ITEMS: TimelineItem[] = [
  {
    label: "ChatGPT účet",
    time: "5 MINUT",
    position: 0.02,
    color: colors.semantic.success,
    startFrame: 0,
  },
  {
    label: "AI chatbot (Tidio)",
    time: "1 ODPOLEDNE",
    position: 0.12,
    color: colors.semantic.success,
    startFrame: 18,
  },
  {
    label: "N8N workflow",
    time: "1 DEN",
    position: 0.22,
    color: colors.blue[400],
    startFrame: 36,
  },
  {
    label: "E-commerce AI reklama (ROI)",
    time: "4–8 TÝDNŮ",
    position: 0.5,
    color: colors.blue[500],
    startFrame: 54,
  },
  {
    label: "Enterprise custom AI",
    time: "12–18 MĚSÍCŮ",
    position: 1.0,
    color: colors.semantic.warning,
    startFrame: 72,
  },
];

const AXIS_W = 1100;
const DOT_R = 10;

export const ImplementationSpeedChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const titleProgress = spring({ frame, fps, config: springs.smooth });
  const axisProgress = spring({
    frame: frame - 5,
    fps,
    config: springs.smooth,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        fontFamily: fonts.primary,
        opacity: interpolate(exitProgress, [0, 1], [1, 0]),
      }}
    >
      <div
        style={{
          fontSize: typeScale.h2.size,
          fontWeight: fontWeight.display,
          color: colors.purple[50],
          textAlign: "center",
          marginBottom: 64,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [24, 0])}px)`,
        }}
      >
        Čas do prvního výsledku — není to roky
      </div>

      <svg width={AXIS_W + 40} height={340} style={{ overflow: "visible" }}>
        {/* Axis line */}
        <line
          x1={20}
          x2={20 + AXIS_W * axisProgress}
          y1={170}
          y2={170}
          stroke={withOpacity(colors.blue[400], 0.35)}
          strokeWidth={2}
        />
        {/* Arrow head */}
        <polygon
          points={`${20 + AXIS_W * axisProgress},163 ${20 + AXIS_W * axisProgress + 14},170 ${20 + AXIS_W * axisProgress},177`}
          fill={withOpacity(colors.blue[400], 0.5)}
          opacity={axisProgress}
        />
        {/* Scale label */}
        <text
          x={20 + AXIS_W / 2}
          y={310}
          textAnchor="middle"
          fill={colors.purple[300]}
          fontFamily={fonts.mono}
          fontSize={13}
          opacity={axisProgress}
        >
          Logaritmická škála — od minut po měsíce
        </text>

        {ITEMS.map((item, i) => {
          const localFrame = frame - item.startFrame;
          const progress = spring({
            frame: localFrame,
            fps,
            config: springs.bouncy,
          });
          const visible = localFrame > 0 ? progress : 0;
          const cx = 20 + item.position * AXIS_W;
          // Alternate above / below axis
          const isAbove = i % 2 === 0;
          const labelY = isAbove ? 170 - 70 : 170 + 50;
          const timeY = isAbove ? 170 - 44 : 170 + 76;
          const connectorY2 = isAbove ? 170 - DOT_R - 4 : 170 + DOT_R + 4;
          const connectorY1 = isAbove ? labelY + 4 : timeY - 4;

          return (
            <g key={item.label} opacity={visible}>
              {/* Connector tick */}
              <line
                x1={cx}
                x2={cx}
                y1={connectorY1}
                y2={connectorY2}
                stroke={withOpacity(item.color, 0.4)}
                strokeWidth={1.5}
                strokeDasharray="3 4"
              />

              {/* Dot */}
              <circle
                cx={cx}
                cy={170}
                r={DOT_R * visible}
                fill={item.color}
                filter={`drop-shadow(0 0 8px ${item.color}88)`}
              />
              <circle
                cx={cx}
                cy={170}
                r={DOT_R * 1.8 * visible}
                fill={withOpacity(item.color, 0.15)}
              />

              {/* Tool label */}
              <text
                x={cx}
                y={labelY}
                textAnchor="middle"
                fill={colors.purple[50]}
                fontFamily={fonts.primary}
                fontWeight={fontWeight.bodyEmphasis}
                fontSize={14}
              >
                {item.label}
              </text>

              {/* Time badge */}
              <rect
                x={cx - 52}
                y={timeY - 18}
                width={104}
                height={22}
                rx={6}
                fill={withOpacity(item.color, 0.15)}
                stroke={withOpacity(item.color, 0.5)}
                strokeWidth={1}
              />
              <text
                x={cx}
                y={timeY - 2}
                textAnchor="middle"
                fill={item.color}
                fontFamily={fonts.mono}
                fontWeight={fontWeight.heading}
                fontSize={12}
              >
                {item.time}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
