import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";

type Props = {
  misconception: string;
  reality: string;
  revealFrame: number;
  confusionPrompt?: string;
  style?: React.CSSProperties;
};

export const MisconceptionReveal: React.FC<Props> = ({
  misconception,
  reality,
  revealFrame,
  confusionPrompt = "Ale pockat... je to opravdu tak?",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phase2 = frame >= revealFrame && frame < revealFrame + 30;
  const phase3 = frame >= revealFrame + 30;
  const misconceptionIn = spring({ frame, fps, config: springs.snappy });
  const strikeProgress =
    phase2 || phase3
      ? spring({ frame: frame - revealFrame, fps, config: springs.snappy })
      : 0;
  const confusionIn = phase2
    ? spring({
        frame: frame - revealFrame + 10,
        fps,
        config: springs.smooth,
      })
    : 0;
  const realityIn = phase3
    ? spring({
        frame: frame - revealFrame - 30,
        fps,
        config: springs.bouncy,
      })
    : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        maxWidth: 1200,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          background: gradients.card,
          borderRadius: 12,
          padding: "32px 48px",
          width: "100%",
          opacity: misconceptionIn,
          transform: `scale(${phase3 ? 1 - strikeProgress * 0.1 : 1})`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          BEZNE SE RIKA
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 28,
            color: colors.purple[50],
          }}
        >
          {misconception}
        </div>
        {(phase2 || phase3) && (
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: 32,
              right: 32,
              height: 3,
              background: colors.semantic.error,
              transform: `scaleX(${strikeProgress})`,
              transformOrigin: "left",
            }}
          />
        )}
      </div>
      {phase2 && (
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.body,
            fontSize: 24,
            color: colors.purple[200],
            fontStyle: "italic",
            opacity: confusionIn,
            textAlign: "center",
          }}
        >
          {confusionPrompt}
        </div>
      )}
      {phase3 && (
        <div
          style={{
            background: gradients.card,
            borderLeft: `4px solid ${colors.semantic.success}`,
            borderRadius: 12,
            padding: "32px 48px",
            width: "100%",
            opacity: realityIn,
            transform: `translateY(${(1 - realityIn) * 24}px)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              color: colors.semantic.success,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            VE SKUTECNOSTI
          </div>
          <div
            style={{
              fontFamily: fonts.primary,
              fontWeight: fontWeight.heading,
              fontSize: 28,
              color: colors.purple[50],
            }}
          >
            {reality}
          </div>
        </div>
      )}
    </div>
  );
};
