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

const TOKENS: { word: string; frame: number; highlight?: boolean }[] = [
  { word: "Hlavní", frame: 0 },
  { word: "město", frame: 0 },
  { word: "Francie", frame: 0 },
  { word: "je", frame: 30 },
  { word: "Paříž", frame: 60, highlight: true },
];

const PROBS = [
  { label: "Paříž", pct: 95, color: colors.semantic.success },
  { label: "Londýn", pct: 2, color: colors.blue[400] },
  { label: "Lyon", pct: 1, color: colors.blue[400] },
  { label: "Nice", pct: 0.5, color: colors.purple[300] },
] as const;

const PROB_START_FRAME = 90;
const BAR_MAX_W = 480;

export const TokenPredictionVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress = spring({
    frame: Math.max(0, frame - exitStart),
    fps,
    config: springs.smooth,
  });
  const globalOpacity = 1 - exitProgress;

  const titleP = spring({ frame, fps, config: springs.snappy });
  const subtitleP = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: springs.gentle,
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        padding: "0 140px",
        boxSizing: "border-box",
        opacity: globalOpacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${interpolate(titleP, [0, 1], [-20, 0])}px)`,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: typeScale.h2.size,
            fontWeight: fontWeight.heading,
            color: colors.purple[50],
          }}
        >
          Jak LLM „myslí" — predikce dalšího tokenu
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleP * 0.85,
          textAlign: "center",
          marginBottom: 64,
          maxWidth: 1100,
        }}
      >
        <div
          style={{
            fontSize: typeScale.body.size,
            fontWeight: fontWeight.body,
            color: colors.purple[200],
            lineHeight: 1.55,
          }}
        >
          AI nevěděl, kde je Francie. Věděl, jaká slova statisticky následují po
          „Hlavní město Francie".
        </div>
      </div>

      {/* Token chips row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 64,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {TOKENS.map(({ word, frame: startFrame, highlight }, i) => {
          const p = spring({
            frame: Math.max(0, frame - startFrame),
            fps,
            config: springs.bouncy,
          });
          const isHighlight = !!highlight;
          return (
            <div
              key={`${word}-${i}`}
              style={{
                opacity: p,
                transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})`,
                background: isHighlight
                  ? withOpacity(colors.semantic.success, 0.15)
                  : withOpacity(colors.navy[700], 0.9),
                border: `1.5px solid ${isHighlight ? colors.semantic.success : withOpacity(colors.blue[400], 0.4)}`,
                borderRadius: 12,
                padding: "14px 28px",
                boxShadow: isHighlight ? glow.active : undefined,
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  fontWeight: isHighlight
                    ? fontWeight.heading
                    : fontWeight.bodyEmphasis,
                  color: isHighlight
                    ? colors.semantic.success
                    : colors.purple[50],
                  fontFamily: fonts.mono,
                  letterSpacing: 0.5,
                }}
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>

      {/* Probability bars */}
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          background: colors.navy[900],
          border: `1px solid ${withOpacity(colors.navy[700], 0.7)}`,
          borderRadius: 16,
          padding: "32px 40px",
        }}
      >
        <div
          style={{
            fontSize: typeScale.caption.size,
            fontFamily: fonts.mono,
            color: colors.purple[300],
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginBottom: 24,
            opacity: spring({
              frame: Math.max(0, frame - PROB_START_FRAME + 10),
              fps,
              config: springs.snappy,
            }),
          }}
        >
          Pravděpodobnosti dalšího tokenu
        </div>

        {PROBS.map(({ label, pct, color }, i) => {
          const barP = spring({
            frame: Math.max(0, frame - PROB_START_FRAME - i * 8),
            fps,
            config: springs.smooth,
          });
          const barW = (pct / 100) * BAR_MAX_W * barP;

          return (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
                opacity: barP,
              }}
            >
              <div
                style={{
                  width: 72,
                  fontSize: 16,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: colors.purple[100],
                  fontFamily: fonts.mono,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  height: 28,
                  width: barW,
                  background: color,
                  borderRadius: 6,
                  transition: "none",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontSize: 15,
                  fontWeight: fontWeight.heading,
                  color,
                  fontFamily: fonts.mono,
                }}
              >
                {pct} %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
