// src/components/educational/ThreeTierCustomerService.tsx
// 3-tier customer service model — AI → AI+Human → Human only.

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";

const TIERS = [
  {
    tier: "TIER 1 — AI Chatbot",
    pct: "60–70 %",
    desc: "FAQ, status objednávky, jednoduché informace, otevírací doby",
    width: 1.0,
    color: colors.semantic.success,
    delay: 10,
  },
  {
    tier: "TIER 2 — AI + Člověk",
    pct: "20–30 %",
    desc: "Chatbot připraví kontext a předá agentovi, komplexnější dotazy",
    width: 0.65,
    color: colors.blue[400],
    delay: 35,
  },
  {
    tier: "TIER 3 — Pouze Člověk",
    pct: "5–10 %",
    desc: "Reklamace, VIP zákazníci, emocionální situace, právní otázky",
    width: 0.35,
    color: colors.semantic.error,
    delay: 60,
  },
];

const MAX_W = 1100;

export const ThreeTierCustomerService: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
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
          marginBottom: 40,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        Správný model AI zákaznického servisu
      </div>

      {/* Tiers */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {TIERS.map((tier) => {
          const itemIn = spring({
            frame: Math.max(0, frame - tier.delay),
            fps,
            config: springs.smooth,
          });
          const barW = MAX_W * tier.width * itemIn;

          return (
            <div
              key={tier.tier}
              style={{
                width: MAX_W,
                opacity: itemIn,
              }}
            >
              <div
                style={{
                  width: barW,
                  minWidth: itemIn > 0.05 ? 80 : 0,
                  background: `${tier.color}22`,
                  border: `2px solid ${tier.color}`,
                  borderRadius: 12,
                  padding: "22px 32px",
                  overflow: "hidden",
                  boxShadow: `0 0 20px ${tier.color}33`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    marginBottom: 8,
                    flexWrap: "nowrap",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 13,
                      color: tier.color,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      fontWeight: fontWeight.bodyEmphasis,
                    }}
                  >
                    {tier.tier}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.primary,
                      fontWeight: fontWeight.display,
                      fontSize: 32,
                      color: tier.color,
                      textShadow: `0 0 20px ${tier.color}88`,
                    }}
                  >
                    {tier.pct}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.primary,
                      fontSize: 14,
                      color: colors.purple[300],
                    }}
                  >
                    dotazů
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 16,
                    fontWeight: fontWeight.body,
                    color: colors.purple[200],
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tier.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          marginTop: 32,
          textAlign: "center",
          fontFamily: fonts.primary,
          fontWeight: fontWeight.body,
          fontSize: 18,
          color: colors.purple[300],
          opacity: interpolate(frame, [80, 100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Nikdy neodstraňuj Tier 3 — vždy mějte živého člověka jako záchrannou síť
      </div>
    </div>
  );
};
