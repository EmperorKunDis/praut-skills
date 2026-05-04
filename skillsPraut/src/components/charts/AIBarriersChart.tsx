import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  springs,
  withOpacity,
} from "../../styles/tokens";

// Horizontal animated bar chart — Goldman Sachs AI adoption barriers for SMBs
// Bars grow left→right with spring stagger. Highlight bar uses purple[600].

type BarDef = {
  label: string;
  value: number; // percentage 0-100
  highlight?: boolean;
};

const BARS: BarDef[] = [
  { label: "Nedostatek zdrojů a expertízy", value: 42 },
  { label: "Jak aplikovat AI na byznys", value: 60 },
  { label: "Výběr správného nástroje", value: 48 },
  { label: "Obavy z bezpečnosti dat", value: 46 },
  { label: "Potřeba jednodušších nástrojů", value: 73, highlight: true },
];

const TRACK_WIDTH = 800;
const BAR_HEIGHT = 52;
const BAR_GAP = 22;
const STAGGER = 10; // frames between each bar appearing

export const AIBarriersChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title fade-in
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation — fade out in last 20 frames
  const exitStart = durationInFrames - 20;
  const exitOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const totalHeight = BARS.length * (BAR_HEIGHT + BAR_GAP) - BAR_GAP;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        boxSizing: "border-box",
        opacity: exitOpacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleOpacity) * -12}px)`,
          marginBottom: 52,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 30,
            color: colors.purple[50],
            marginBottom: 8,
          }}
        >
          Bariéry AI adopce — Goldman Sachs SMB Survey
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 1,
          }}
        >
          Goldman Sachs 10,000 Small Businesses Survey + Reimagine Main Street /
          PayPal — 2025
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: BAR_GAP,
          width: TRACK_WIDTH + 440,
        }}
      >
        {BARS.map((bar, i) => {
          const localFrame = frame - i * STAGGER;
          const progress = spring({
            frame: localFrame,
            fps,
            config: springs.smooth,
          });

          const barColor = bar.highlight
            ? colors.purple[600]
            : colors.blue[400];
          const barWidth = (bar.value / 100) * TRACK_WIDTH * progress;
          const labelOpacity = interpolate(localFrame, [8, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={bar.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: labelOpacity,
              }}
            >
              {/* Row label */}
              <div
                style={{
                  width: 340,
                  flexShrink: 0,
                  textAlign: "right",
                  fontFamily: fonts.primary,
                  fontWeight: bar.highlight
                    ? fontWeight.heading
                    : fontWeight.body,
                  fontSize: 17,
                  color: bar.highlight ? colors.purple[50] : colors.purple[200],
                  lineHeight: 1.3,
                  paddingRight: 8,
                }}
              >
                {bar.label}
              </div>

              {/* Track + bar */}
              <div
                style={{
                  position: "relative",
                  width: TRACK_WIDTH,
                  height: BAR_HEIGHT,
                  background: withOpacity(colors.navy[700], 0.8),
                  borderRadius: BAR_HEIGHT / 2,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: barWidth,
                    height: "100%",
                    background: barColor,
                    borderRadius: BAR_HEIGHT / 2,
                    boxShadow: bar.highlight ? glow.cta : glow.active,
                    transition: "none",
                  }}
                />
              </div>

              {/* Value label */}
              <div
                style={{
                  width: 60,
                  flexShrink: 0,
                  fontFamily: fonts.mono,
                  fontWeight: fontWeight.heading,
                  fontSize: 22,
                  color: bar.highlight ? colors.purple[600] : colors.blue[400],
                  textShadow: bar.highlight
                    ? `0 0 12px ${withOpacity(colors.purple[600], 0.7)}`
                    : undefined,
                }}
              >
                {Math.round(bar.value * progress)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
