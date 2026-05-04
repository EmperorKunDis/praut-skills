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
import { PhosphorIcon } from "../icons/PhosphorIcon";

const ROWS = [
  {
    model: "Gemini 2.0 Flash",
    rate: "0.7 %",
    rating: "Výborný",
    color: colors.semantic.success,
    isError: false,
  },
  {
    model: "Claude 3.5 Sonnet",
    rate: "1.2 %",
    rating: "Výborný",
    color: colors.semantic.success,
    isError: false,
  },
  {
    model: "GPT-4o",
    rate: "1.5 %",
    rating: "Velmi dobrý",
    color: colors.blue[400],
    isError: false,
  },
  {
    model: "Gemini Pro",
    rate: "2.8 %",
    rating: "Dobrý",
    color: colors.blue[400],
    isError: false,
  },
  {
    model: "GPT-3.5",
    rate: "6.4 %",
    rating: "Průměrný",
    color: colors.semantic.warning,
    isError: false,
  },
  {
    model: "Právní dotazy",
    rate: "23–88 %",
    rating: "Lidský dohled!",
    color: colors.semantic.error,
    isError: true,
  },
];

const STAGGER = 12;
const COL_WIDTHS = [420, 240, 280] as const;
const TOTAL_W = COL_WIDTHS.reduce((a, b) => a + b, 0) + 60;

export const HallucinationLeaderboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress = spring({
    frame: Math.max(0, frame - exitStart),
    fps,
    config: springs.smooth,
  });
  const globalOpacity = 1 - exitProgress;

  const titleProgress = spring({ frame, fps, config: springs.snappy });

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
        opacity: globalOpacity,
        padding: "0 64px",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [-24, 0])}px)`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: typeScale.h2.size,
            fontWeight: fontWeight.heading,
            color: colors.purple[50],
            fontFamily: fonts.primary,
            lineHeight: 1.2,
          }}
        >
          Vectara AI Hallucination Leaderboard
        </div>
        <div
          style={{
            fontSize: typeScale.body.size,
            fontWeight: fontWeight.body,
            color: colors.purple[200],
            marginTop: 8,
            fontFamily: fonts.mono,
          }}
        >
          míra halucinace (sumarizace dokumentů)
        </div>
      </div>

      {/* Table */}
      <div style={{ width: TOTAL_W }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            gap: 20,
            paddingBottom: 12,
            borderBottom: `1.5px solid ${withOpacity(colors.blue[400], 0.4)}`,
            marginBottom: 6,
            opacity: titleProgress,
          }}
        >
          {["Model", "Míra halucinace", "Hodnocení"].map((h, i) => (
            <div
              key={h}
              style={{
                width: COL_WIDTHS[i],
                fontSize: typeScale.caption.size,
                fontWeight: fontWeight.bodyEmphasis,
                color: colors.purple[300],
                fontFamily: fonts.mono,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {ROWS.map((row, i) => {
          const localFrame = frame - i * STAGGER;
          const rowProgress = spring({
            frame: localFrame,
            fps,
            config: springs.smooth,
          });
          const tx = interpolate(rowProgress, [0, 1], [-80, 0]);

          return (
            <div
              key={row.model}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                padding: "14px 16px",
                marginBottom: 6,
                borderRadius: 10,
                background: row.isError
                  ? withOpacity(colors.semantic.error, 0.08)
                  : i % 2 === 0
                    ? colors.navy[900]
                    : colors.navy[800],
                border: row.isError
                  ? `1.5px solid ${withOpacity(colors.semantic.error, 0.6)}`
                  : `1px solid ${withOpacity(colors.navy[700], 0.6)}`,
                boxShadow: row.isError ? glow.neon : undefined,
                opacity: rowProgress,
                transform: `translateX(${tx}px)`,
              }}
            >
              {/* Model */}
              <div
                style={{
                  width: COL_WIDTHS[0],
                  fontSize: typeScale.body.size,
                  fontWeight: row.isError
                    ? fontWeight.heading
                    : fontWeight.bodyEmphasis,
                  color: row.isError
                    ? colors.semantic.error
                    : colors.purple[50],
                  fontFamily: fonts.primary,
                }}
              >
                {row.model}
              </div>

              {/* Rate */}
              <div
                style={{
                  width: COL_WIDTHS[1],
                  fontSize: 20,
                  fontWeight: fontWeight.heading,
                  color: row.color,
                  fontFamily: fonts.mono,
                }}
              >
                {row.rate}
              </div>

              {/* Rating */}
              <div
                style={{
                  width: COL_WIDTHS[2],
                  fontSize: row.isError ? 16 : 20,
                  fontWeight: row.isError
                    ? fontWeight.bodyEmphasis
                    : fontWeight.body,
                  color: row.color,
                  fontFamily: fonts.primary,
                  letterSpacing: row.isError ? 0.5 : 2,
                }}
              >
                {row.rating}
              </div>
            </div>
          );
        })}
      </div>

      {/* Source note */}
      <div
        style={{
          marginTop: 32,
          fontSize: typeScale.caption.size,
          color: colors.purple[300],
          fontFamily: fonts.mono,
          opacity: titleProgress * 0.7,
        }}
      >
        Zdroj: Vectara Hallucination Leaderboard · Hughes et al. 2023 · MIT AI
        Transparency Lab 2025
      </div>
    </div>
  );
};
