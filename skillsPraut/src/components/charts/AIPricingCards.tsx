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

// 2×2 grid of AI tool pricing cards, spring staggered appearance.
// Each card: gradient bg, large price with glow, feature list.

type PricingCard = {
  name: string;
  price: string;
  features: string;
  accentColor: string;
};

const CARDS: PricingCard[] = [
  {
    name: "ChatGPT Plus",
    price: "$20 /měsíc",
    features: "GPT-4o, DALL-E, plugins",
    accentColor: colors.blue[400],
  },
  {
    name: "Claude Pro",
    price: "$20 /měsíc",
    features: "Claude Sonnet 4.5, Projects, API",
    accentColor: colors.purple[600],
  },
  {
    name: "GitHub Copilot",
    price: "$10–20 /měsíc",
    features: "AI coding, chat, code review",
    accentColor: colors.blue[500],
  },
  {
    name: "AI Chatbot (SaaS)",
    price: "od $99 /měsíc",
    features: "Tidio, Crisp, Intercom AI",
    accentColor: colors.semantic.success,
  },
];

const CARD_STAGGER = 14;

export const AIPricingCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title reveal
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: fade + shrink in last 20 frames
  const exitStart = durationInFrames - 20;
  const exitScale = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0.96],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
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
        transform: `scale(${exitScale})`,
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
          }}
        >
          AI Stack — reálné ceny 2025
        </div>
      </div>

      {/* 2×2 card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 28,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {CARDS.map((card, i) => {
          const startFrame = 10 + i * CARD_STAGGER;
          const cardProgress = spring({
            frame: frame - startFrame,
            fps,
            config: springs.snappy,
          });
          const cardOpacity = interpolate(frame - startFrame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                background: `linear-gradient(145deg, ${colors.navy[800]} 0%, ${colors.navy[700]} 100%)`,
                border: `1px solid ${withOpacity(card.accentColor, 0.4)}`,
                borderRadius: 20,
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                boxShadow: `0 0 28px ${withOpacity(card.accentColor, 0.1)}, inset 0 1px 0 ${withOpacity(card.accentColor, 0.12)}`,
                transform: `scale(${cardProgress}) translateY(${(1 - cardProgress) * 20}px)`,
                opacity: cardOpacity,
              }}
            >
              {/* Tool name */}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 13,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: card.accentColor,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {card.name}
              </div>

              {/* Price — big with glow */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.display,
                  fontSize: 44,
                  lineHeight: 1.1,
                  color: colors.purple[50],
                  textShadow: `0 0 20px ${withOpacity(card.accentColor, 0.45)}`,
                  letterSpacing: -0.5,
                }}
              >
                {card.price}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: withOpacity(card.accentColor, 0.25),
                  borderRadius: 1,
                }}
              />

              {/* Features */}
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.body,
                  fontSize: 16,
                  color: colors.purple[200],
                  lineHeight: 1.5,
                }}
              >
                {card.features}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
