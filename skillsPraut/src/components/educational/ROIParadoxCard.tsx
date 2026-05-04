// src/components/educational/ROIParadoxCard.tsx
// Vizualizuje paradox: "95% AI pilotů bez ROI" vs "68% firem s AI roste".
// Vysvětluje PROČ — implementace vs. koupit nástroj.

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
  springs,
} from "../../styles/tokens";

type Side = {
  badge: string;
  badgeColor: string;
  stat: string;
  statColor: string;
  headline: string;
  reason: string;
  bullets: string[];
  borderColor: string;
  delay: number;
};

const LEFT: Side = {
  badge: "PROBLÉM",
  badgeColor: colors.semantic.warning,
  stat: "95 %",
  statColor: colors.semantic.warning,
  headline: "AI pilotů nepřineslo měřitelné ROI",
  reason: "Proč? Špatný přístup:",
  bullets: [
    "Koupili nástroj, položili do šuplíku",
    "Žádný konkrétní use-case",
    "Chybí change management",
    "Očekávají kouzelnou hůlku",
  ],
  borderColor: colors.semantic.warning,
  delay: 10,
};

const RIGHT: Side = {
  badge: "REALITA",
  badgeColor: colors.semantic.success,
  stat: "68 %",
  statColor: colors.semantic.success,
  headline: "malých firem s AI hlásí růst tržeb",
  reason: "Proč? Správný přístup:",
  bullets: [
    "Jeden konkrétní proces, měřitelný výsledek",
    "Trénink a onboarding týmu",
    "Iterace — pilot → škálování",
    "AI jako nástroj, ne jako spasitel",
  ],
  borderColor: colors.semantic.success,
  delay: 40,
};

const SideCard: React.FC<{ side: Side; align: "left" | "right" }> = ({
  side,
  align,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const cardIn = spring({
    frame: Math.max(0, frame - side.delay),
    fps,
    config: springs.smooth,
  });

  const exitStart = durationInFrames - 20;
  const exitP =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const translateX = interpolate(
    cardIn,
    [0, 1],
    [align === "left" ? -60 : 60, 0],
  );

  return (
    <div
      style={{
        flex: 1,
        background: gradients.card,
        borderRadius: 16,
        borderLeft:
          align === "left" ? `4px solid ${side.borderColor}` : undefined,
        borderRight:
          align === "right" ? `4px solid ${side.borderColor}` : undefined,
        padding: "36px 40px",
        opacity: cardIn * (1 - exitP),
        transform: `translateX(${translateX}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Badge */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          fontWeight: fontWeight.bodyEmphasis,
          color: side.badgeColor,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        {side.badge}
      </div>

      {/* Big stat */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 72,
          color: side.statColor,
          lineHeight: 1,
          textShadow: `0 0 32px ${side.statColor}66`,
        }}
      >
        {side.stat}
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 20,
          color: colors.purple[50],
          lineHeight: 1.4,
        }}
      >
        {side.headline}
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: colors.navy[600],
          borderRadius: 1,
        }}
      />

      {/* Reason */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          color: side.badgeColor,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {side.reason}
      </div>

      {/* Bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {side.bullets.map((bullet, i) => {
          const bulletIn = spring({
            frame: Math.max(0, frame - side.delay - 20 - i * 10),
            fps,
            config: springs.snappy,
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                opacity: bulletIn * (1 - exitP),
                transform: `translateX(${interpolate(bulletIn, [0, 1], [20, 0])}px)`,
              }}
            >
              <span
                style={{
                  color: side.badgeColor,
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  lineHeight: 1.6,
                  flexShrink: 0,
                }}
              >
                ›
              </span>
              <span
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.body,
                  fontSize: 16,
                  color: colors.purple[200],
                  lineHeight: 1.5,
                }}
              >
                {bullet}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CenterDivider: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineIn = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: springs.smooth,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "0 20px",
        opacity: lineIn,
      }}
    >
      <div
        style={{
          width: 2,
          height: 80,
          background: `linear-gradient(to bottom, transparent, ${colors.purple[600]})`,
          borderRadius: 1,
        }}
      />
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[400],
          letterSpacing: 2,
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        vs
      </div>
      <div
        style={{
          width: 2,
          height: 80,
          background: `linear-gradient(to top, transparent, ${colors.purple[600]})`,
          borderRadius: 1,
        }}
      />
    </div>
  );
};

export const ROIParadoxCard: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: "100%", ...style }}>
      {/* Title */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 26,
          color: colors.purple[100],
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 32,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        Paradox ROI — stejná technologie, jiný výsledek
      </div>

      {/* Two cards + divider */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
        <SideCard side={LEFT} align="left" />
        <CenterDivider />
        <SideCard side={RIGHT} align="right" />
      </div>

      {/* Bottom takeaway */}
      <div
        style={{
          marginTop: 24,
          textAlign: "center",
          fontFamily: fonts.primary,
          fontWeight: fontWeight.bodyEmphasis,
          fontSize: 18,
          color: colors.purple[300],
          opacity: interpolate(frame, [80, 100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Zdroj: MIT (2025) · Goldman Sachs 10,000 Small Businesses Survey ·
        Gartner
      </div>
    </div>
  );
};
