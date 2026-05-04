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

const PROMPT_TEXT =
  "Jsi zkušený copywriter s 10 lety praxe v B2B SaaS. Napiš 3 varianty emailového předmětu pro cold outreach k CFO malé výrobní firmy. Formát: číslovaný seznam, max 60 znaků. Tón: profesionální ale přátelský.";

type Callout = {
  label: string;
  tag: string;
  color: string;
  startFrame: number;
  highlightStart: number;
  highlightEnd: number;
};

const CALLOUTS: Callout[] = [
  {
    label: "Jsi zkušený copywriter s 10 lety praxe v B2B SaaS.",
    tag: "ROLE (kdo je AI)",
    color: colors.blue[400],
    startFrame: 0,
    highlightStart: 0,
    highlightEnd: 54,
  },
  {
    label: "Napiš 3 varianty emailového předmětu",
    tag: "ÚKOL (co přesně)",
    color: colors.purple[600],
    startFrame: 20,
    highlightStart: 55,
    highlightEnd: 93,
  },
  {
    label: "k CFO malé výrobní firmy.",
    tag: "KONTEXT (pro koho)",
    color: colors.semantic.success,
    startFrame: 40,
    highlightStart: 94,
    highlightEnd: 119,
  },
  {
    label: "Formát: číslovaný seznam, max 60 znaků.",
    tag: "FORMÁT (jak)",
    color: colors.semantic.warning,
    startFrame: 60,
    highlightStart: 120,
    highlightEnd: 160,
  },
  {
    label: "Tón: profesionální ale přátelský.",
    tag: "PARAMETRY (styl)",
    color: colors.purple[400],
    startFrame: 80,
    highlightStart: 161,
    highlightEnd: 194,
  },
];

export const PromptAnatomyVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const titleProgress = spring({ frame, fps, config: springs.smooth });

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: colors.navy[950],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 80,
    fontFamily: fonts.primary,
    opacity: interpolate(exitProgress, [0, 1], [1, 0]),
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typeScale.h2.size,
    fontWeight: fontWeight.display,
    color: colors.purple[50],
    textAlign: "center",
    marginBottom: 48,
    opacity: titleProgress,
    transform: `translateY(${interpolate(titleProgress, [0, 1], [24, 0])}px)`,
  };

  const promptBoxStyle: React.CSSProperties = {
    background: colors.navy[800],
    border: `1.5px solid ${withOpacity(colors.blue[400], 0.4)}`,
    borderRadius: 16,
    padding: "32px 40px",
    maxWidth: 860,
    width: "100%",
    boxShadow: glow.active,
    position: "relative",
    marginBottom: 40,
  };

  const promptTextStyle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: fontWeight.body,
    color: colors.purple[200],
    lineHeight: 1.7,
    letterSpacing: 0.2,
  };

  const calloutsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    maxWidth: 900,
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Anatomie dobrého promptu — 5 klíčových prvků</div>

      <div style={promptBoxStyle}>
        <p style={promptTextStyle}>{PROMPT_TEXT}</p>
      </div>

      <div style={calloutsContainerStyle}>
        {CALLOUTS.map((callout, i) => {
          const localFrame = frame - callout.startFrame;
          const progress = spring({
            frame: localFrame,
            fps,
            config: springs.bouncy,
          });
          const visible = localFrame > 0 ? progress : 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                background: withOpacity(callout.color, 0.08),
                border: `1.5px solid ${withOpacity(callout.color, 0.5)}`,
                borderRadius: 12,
                padding: "10px 16px",
                opacity: visible,
                transform: `scale(${interpolate(visible, [0, 1], [0.85, 1])}) translateY(${interpolate(visible, [0, 1], [16, 0])}px)`,
                maxWidth: 420,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontFamily: fonts.mono,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: callout.color,
                  background: withOpacity(callout.color, 0.15),
                  borderRadius: 6,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {callout.tag}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: fontWeight.body,
                  color: colors.purple[200],
                  lineHeight: 1.5,
                }}
              >
                {callout.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
