// src/components/educational/ChatbotFailsCard.tsx
// Real-world AI chatbot failure cases — animated news-alert style list.

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";

const FAILS = [
  {
    company: "DPD",
    desc: "Chatbot napsal báseň jak je DPD nejhorší",
    year: "2024",
  },
  {
    company: "Chevrolet",
    desc: "AI prodal Tahoe za $1 jako legally binding",
    year: "2023",
  },
  {
    company: "Air Canada",
    desc: "Chatbot slíbil neexistující refund → soud uznal",
    year: "2024",
  },
  {
    company: "McDonald's",
    desc: "AI drive-through objednalo 2 000 nuggetů místo 2",
    year: "2024",
  },
  {
    company: "NYC City",
    desc: "Městský chatbot radil porušovat zákon",
    year: "2024",
  },
];

const STAGGER = 28;

export const ChatbotFailsCard: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitP =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const titleOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: "100%", opacity: 1 - exitP, ...style }}>
      {/* Title */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 26,
          color: colors.purple[100],
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 8,
          opacity: titleOpacity,
        }}
      >
        Real World AI Chatbot Fails — co se stane bez guardrails
      </div>

      {/* Cases */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 24,
        }}
      >
        {FAILS.map((fail, i) => {
          const delay = i * STAGGER;
          const itemIn = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: springs.snappy,
          });
          const tx = interpolate(itemIn, [0, 1], [-50, 0]);

          return (
            <div
              key={fail.company}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: colors.navy[800],
                borderLeft: `4px solid ${colors.semantic.error}`,
                borderRadius: 10,
                padding: "20px 28px",
                opacity: itemIn,
                transform: `translateX(${tx}px)`,
              }}
            >
              {/* Alert dot */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: colors.semantic.error,
                  flexShrink: 0,
                  boxShadow: `0 0 10px ${colors.semantic.error}`,
                }}
              />

              {/* Company badge */}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 13,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: colors.semantic.error,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  minWidth: 120,
                  flexShrink: 0,
                }}
              >
                {fail.company}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.body,
                  fontSize: 18,
                  color: colors.purple[100],
                  flex: 1,
                  lineHeight: 1.4,
                }}
              >
                {fail.desc}
              </div>

              {/* Year */}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: colors.purple[300],
                  flexShrink: 0,
                }}
              >
                {fail.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* Source note */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          marginTop: 20,
          opacity: interpolate(
            frame,
            [STAGGER * FAILS.length, STAGGER * FAILS.length + 20],
            [0, 0.7],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        Zdroj: Qualtrics 2026 CX Trends — AI zákaznický servis selhává 4× více
        než jiné AI use cases
      </div>
    </div>
  );
};
