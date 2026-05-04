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
import { PhosphorIcon } from "../icons/PhosphorIcon";

// Animated vertical timeline — Klarna AI experiment story.
// Each card slides in from the right with spring, staggered every 45 frames.

type Step = {
  year: string;
  text: string;
  icon: string; // emoji / unicode symbol — no external deps
  color: string;
};

const STEPS: Step[] = [
  {
    year: "2023",
    text: "Klarna nahradí 700 agentů AI",
    icon: "robot",
    color: colors.blue[400],
  },
  {
    year: "Výsledek",
    text: "Zákaznická spokojenost KLESÁ",
    icon: "trend-down",
    color: colors.semantic.warning,
  },
  {
    year: "2024",
    text: "Musí znovu nabírat lidi",
    icon: "users",
    color: colors.semantic.error,
  },
  {
    year: "Poučení",
    text: "AI + Člověk > AI samotné",
    icon: "handshake",
    color: colors.semantic.success,
  },
];

const STEP_STAGGER = 45; // frames between each card appearing
const LINE_COLOR = withOpacity(colors.blue[400], 0.35);

export const KlarnaCaseStudy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title fade-in
  const titleProgress = interpolate(frame, [0, 20], [0, 1], {
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

  // Vertical line grows downward as steps appear
  const totalSteps = STEPS.length;
  const lineReveal = interpolate(
    frame,
    [STEP_STAGGER, STEP_STAGGER + (totalSteps - 1) * STEP_STAGGER + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const CARD_HEIGHT = 100;
  const CARD_GAP = 32;
  const totalLineHeight = (totalSteps - 1) * (CARD_HEIGHT + CARD_GAP);

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
          opacity: titleProgress,
          transform: `translateY(${(1 - titleProgress) * -14}px)`,
          marginBottom: 56,
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
          Klarna — Příběh který nás všechny poučil
        </div>
      </div>

      {/* Timeline container */}
      <div style={{ position: "relative", width: 780 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 28,
            top: CARD_HEIGHT / 2,
            width: 3,
            height: totalLineHeight * lineReveal,
            background: LINE_COLOR,
            borderRadius: 2,
          }}
        />

        {/* Steps */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: CARD_GAP }}
        >
          {STEPS.map((step, i) => {
            const startFrame = STEP_STAGGER + i * STEP_STAGGER;
            const stepProgress = spring({
              frame: frame - startFrame,
              fps,
              config: springs.snappy,
            });

            const cardOpacity = interpolate(
              frame - startFrame,
              [0, 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  opacity: cardOpacity,
                }}
              >
                {/* Circle node */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: colors.navy[800],
                    border: `3px solid ${step.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 16px ${withOpacity(step.color, 0.5)}`,
                    transform: `scale(${stepProgress})`,
                    zIndex: 2,
                  }}
                >
                  <PhosphorIcon
                    name={step.icon}
                    size={26}
                    color={step.color}
                    weight="bold"
                  />
                </div>

                {/* Card slides in from right */}
                <div
                  style={{
                    flex: 1,
                    background: colors.navy[800],
                    borderLeft: `4px solid ${step.color}`,
                    borderRadius: 12,
                    padding: "20px 28px",
                    transform: `translateX(${(1 - stepProgress) * 80}px)`,
                    boxShadow: `0 0 24px ${withOpacity(step.color, 0.12)}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    minHeight: CARD_HEIGHT,
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      fontWeight: fontWeight.bodyEmphasis,
                      color: step.color,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      flexShrink: 0,
                      minWidth: 80,
                    }}
                  >
                    {step.year}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.primary,
                      fontWeight: fontWeight.bodyEmphasis,
                      fontSize: 20,
                      color: colors.purple[50],
                      lineHeight: 1.4,
                    }}
                  >
                    {step.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
