import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
  springs,
} from "../../styles/tokens";

type Step = {
  visual: React.ReactNode;
  narration: string;
  enterFrame: number;
};

type Props = {
  steps: Step[];
  conclusion: React.ReactNode;
  conclusionFrame: number;
  style?: React.CSSProperties;
};

export const VisualIntuitionBuilder: React.FC<Props> = ({
  steps,
  conclusion,
  conclusionFrame,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const conclusionIn = spring({
    frame: frame - conclusionFrame,
    fps,
    config: springs.bouncy,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 1200,
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const p = spring({
          frame: frame - step.enterFrame,
          fps,
          config: springs.snappy,
        });
        return (
          <div
            key={i}
            style={{
              opacity: p,
              transform: `translateY(${(1 - p) * 16}px)`,
            }}
          >
            <div style={{ marginBottom: 8 }}>{step.visual}</div>
            <div
              style={{
                fontFamily: fonts.primary,
                fontSize: 18,
                fontWeight: fontWeight.body,
                color: colors.purple[200],
                lineHeight: 1.4,
              }}
            >
              {step.narration}
            </div>
          </div>
        );
      })}
      {frame >= conclusionFrame && (
        <div
          style={{
            background: gradients.brandPrimary,
            borderRadius: 12,
            padding: "28px 40px",
            opacity: conclusionIn,
            transform: `scale(${0.9 + conclusionIn * 0.1})`,
            boxShadow: glow.cta,
          }}
        >
          {conclusion}
        </div>
      )}
    </div>
  );
};
