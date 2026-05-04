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

// 3-column KPI card grid — change management AI adoption stats.
// Each card scales in with spring stagger. Stat number glows in accent color.

type KPICard = {
  stat: string;
  label: string;
  accentColor: string;
};

const CARDS: KPICard[] = [
  {
    stat: "42 %",
    label: "firem nemá AI expertízu",
    accentColor: colors.semantic.warning,
  },
  {
    stat: "73 %",
    label: "chce jednodušší nástroje",
    accentColor: colors.blue[400],
  },
  {
    stat: "4 z 5",
    label: "selhání kvůli lidem, ne technologii",
    accentColor: colors.semantic.success,
  },
];

const CARD_STAGGER = 18; // frames between each card

export const ChangeMgmtStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title reveal
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade in last 20 frames
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
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 30,
            color: colors.purple[50],
          }}
        >
          Proč AI adopce selhává — problém není v technologii
        </div>
      </div>

      {/* KPI card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
          width: "100%",
          maxWidth: 1200,
        }}
      >
        {CARDS.map((card, i) => {
          const startFrame = 12 + i * CARD_STAGGER;
          const cardProgress = spring({
            frame: frame - startFrame,
            fps,
            config: springs.bouncy,
          });

          const cardOpacity = interpolate(frame - startFrame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                background: colors.navy[800],
                borderRadius: 20,
                padding: "44px 36px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                border: `1px solid ${withOpacity(card.accentColor, 0.3)}`,
                boxShadow: `0 0 32px ${withOpacity(card.accentColor, 0.12)}, inset 0 0 40px ${withOpacity(colors.navy[900], 0.6)}`,
                transform: `scale(${cardProgress})`,
                opacity: cardOpacity,
              }}
            >
              {/* Stat number */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.display,
                  fontSize: 72,
                  lineHeight: 1,
                  color: card.accentColor,
                  textShadow: `0 0 24px ${withOpacity(card.accentColor, 0.6)}, 0 0 48px ${withOpacity(card.accentColor, 0.3)}`,
                  marginBottom: 20,
                  letterSpacing: -1,
                }}
              >
                {card.stat}
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 48,
                  height: 2,
                  background: withOpacity(card.accentColor, 0.5),
                  borderRadius: 1,
                  marginBottom: 20,
                }}
              />

              {/* Label */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.bodyEmphasis,
                  fontSize: 18,
                  color: colors.purple[200],
                  lineHeight: 1.4,
                }}
              >
                {card.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Source note */}
      <div
        style={{
          marginTop: 44,
          opacity: interpolate(frame, [30, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[300],
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        Reimagine Main Street · Goldman Sachs SMB Survey · McKinsey 2025
      </div>
    </div>
  );
};
