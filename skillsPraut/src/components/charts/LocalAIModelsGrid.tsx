import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  springs,
  typeScale,
  withOpacity,
} from "../../styles/tokens";

const ROWS = [
  {
    model: "Llama 3.2 8B",
    size: "4.9 GB RAM",
    quality: 85,
    qualityLabel: "~85 % GPT-4o",
    note: "Ollama — zdarma",
  },
  {
    model: "Mistral 7B",
    size: "4.1 GB RAM",
    quality: 80,
    qualityLabel: "~80 % GPT-4",
    note: "Ollama / LM Studio",
  },
  {
    model: "Llama 3.1 70B",
    size: "40+ GB RAM",
    quality: 95,
    qualityLabel: "~95 % GPT-4",
    note: "Potřeba GPU",
  },
  {
    model: "Phi-3 Mini",
    size: "2.3 GB RAM",
    quality: 75,
    qualityLabel: "~75 % GPT-4o",
    note: "Ultra lehký",
  },
  {
    model: "Gemma 2 9B",
    size: "5.5 GB RAM",
    quality: 85,
    qualityLabel: "~85 % GPT-4o",
    note: "Google — open",
  },
] as const;

const STAGGER = 14;
const BAR_MAX_W = 220;
const COL_WIDTHS = [320, 200, 320, 280] as const;
const TOTAL_W = COL_WIDTHS.reduce((a, b) => a + b, 0) + 90;

export const LocalAIModelsGrid: React.FC = () => {
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
        padding: "0 80px",
        boxSizing: "border-box",
        opacity: globalOpacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${interpolate(titleP, [0, 1], [-20, 0])}px)`,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: typeScale.h2.size,
            fontWeight: fontWeight.heading,
            color: colors.purple[50],
          }}
        >
          Lokální AI modely 2025 — fungují offline
        </div>
      </div>

      <div style={{ width: TOTAL_W }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            gap: 30,
            padding: "14px 20px",
            borderBottom: `1.5px solid ${withOpacity(colors.blue[400], 0.45)}`,
            marginBottom: 8,
            opacity: titleP,
          }}
        >
          {["Model", "Velikost", "Kvalita", "Poznámka"].map((h, i) => (
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
          const rowP = spring({
            frame: Math.max(0, frame - 20 - i * STAGGER),
            fps,
            config: springs.smooth,
          });
          const barW = (row.quality / 100) * BAR_MAX_W * rowP;
          const rowBg = i % 2 === 0 ? colors.navy[900] : colors.navy[800];

          return (
            <div
              key={row.model}
              style={{
                display: "flex",
                gap: 30,
                alignItems: "center",
                padding: "16px 20px",
                marginBottom: 6,
                borderRadius: 10,
                background: rowBg,
                border: `1px solid ${withOpacity(colors.navy[700], 0.5)}`,
                opacity: rowP,
                transform: `translateY(${interpolate(rowP, [0, 1], [20, 0])}px)`,
              }}
            >
              {/* Model name */}
              <div
                style={{
                  width: COL_WIDTHS[0],
                  fontSize: typeScale.body.size,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: colors.purple[50],
                  fontFamily: fonts.mono,
                }}
              >
                {row.model}
              </div>

              {/* Size */}
              <div
                style={{
                  width: COL_WIDTHS[1],
                  fontSize: 16,
                  fontWeight: fontWeight.body,
                  color: colors.purple[200],
                  fontFamily: fonts.mono,
                }}
              >
                {row.size}
              </div>

              {/* Quality — label + mini bar */}
              <div
                style={{
                  width: COL_WIDTHS[2],
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    height: 14,
                    width: barW,
                    background: colors.blue[400],
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: fontWeight.bodyEmphasis,
                    color: colors.blue[400],
                    fontFamily: fonts.mono,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.qualityLabel}
                </span>
              </div>

              {/* Note */}
              <div
                style={{
                  width: COL_WIDTHS[3],
                  fontSize: 15,
                  fontWeight: fontWeight.body,
                  color: colors.purple[300],
                  fontFamily: fonts.primary,
                }}
              >
                {row.note}
              </div>
            </div>
          );
        })}
      </div>

      {/* Source note */}
      <div
        style={{
          marginTop: 28,
          fontSize: typeScale.caption.size,
          color: colors.purple[300],
          fontFamily: fonts.mono,
          opacity: titleP * 0.65,
          textAlign: "center",
        }}
      >
        Zdroj: Ollama Model Library · LM Studio · Hugging Face Open LLM
        Leaderboard 2025
      </div>
    </div>
  );
};
