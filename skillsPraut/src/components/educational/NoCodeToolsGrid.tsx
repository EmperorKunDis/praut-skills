// src/components/educational/NoCodeToolsGrid.tsx
// Grid of no-code AI tools — for Mýtus 10 "AI je příliš složitá".

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

const TOOLS = [
  {
    name: "ChatGPT",
    desc: "Texty, analýza, brainstorming, překlady",
    price: "$20 /měs",
    category: "CONTENT",
    color: colors.blue[400],
  },
  {
    name: "Make.com",
    desc: "Vizuální automatizace, 1 500+ integrací",
    price: "od $9 /měs",
    category: "AUTOMACE",
    color: colors.purple[600],
  },
  {
    name: "Tidio",
    desc: "AI chatbot pro web a e-shop, bez kódu",
    price: "od $29 /měs",
    category: "ZÁKAZNICKÝ SERVIS",
    color: colors.semantic.success,
  },
  {
    name: "Jasper AI",
    desc: "Marketing copy, blog, SEO optimalizace",
    price: "$39 /měs",
    category: "MARKETING",
    color: colors.blue[500],
  },
  {
    name: "Zapier AI",
    desc: "7 000+ integrací s AI kroky, no-code",
    price: "od $19 /měs",
    category: "AUTOMACE",
    color: colors.purple[400],
  },
  {
    name: "Canva AI",
    desc: "Design, videa, prezentace s Magic Studio",
    price: "$15 /měs",
    category: "DESIGN",
    color: colors.semantic.info,
  },
];

export const NoCodeToolsGrid: React.FC<{ style?: React.CSSProperties }> = ({
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
        No-Code AI nástroje — žádný programátor nepotřebný
      </div>

      {/* Grid 3x2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginTop: 24,
        }}
      >
        {TOOLS.map((tool, i) => {
          const delay = i * 14;
          const cardIn = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: springs.bouncy,
          });
          const scale = interpolate(cardIn, [0, 1], [0.85, 1]);
          const ty = interpolate(cardIn, [0, 1], [24, 0]);

          return (
            <div
              key={tool.name}
              style={{
                background: gradients.card,
                border: `1px solid ${tool.color}44`,
                borderRadius: 14,
                padding: "24px 28px",
                opacity: cardIn,
                transform: `scale(${scale}) translateY(${ty}px)`,
                boxShadow: `0 0 0 1px ${tool.color}22, 0 4px 20px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Category badge */}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: tool.color,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {tool.category}
              </div>

              {/* Tool name */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 22,
                  color: colors.purple[50],
                  marginBottom: 8,
                }}
              >
                {tool.name}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.body,
                  fontSize: 15,
                  color: colors.purple[200],
                  lineHeight: 1.45,
                  marginBottom: 16,
                  minHeight: 44,
                }}
              >
                {tool.desc}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: `${tool.color}33`,
                  marginBottom: 12,
                }}
              />

              {/* Price */}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: fontWeight.bodyEmphasis,
                  fontSize: 16,
                  color: tool.color,
                  textShadow: `0 0 12px ${tool.color}66`,
                }}
              >
                {tool.price}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          marginTop: 20,
          opacity: interpolate(frame, [90, 110], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Ceny orientační — leden 2025. Většina nástrojů nabízí freemium nebo
        trial.
      </div>
    </div>
  );
};
