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
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Step = {
  icon: string;
  title: string;
  description: string;
  color: string;
  startFrame: number;
};

const STEPS: Step[] = [
  {
    icon: "target",
    title: "IDENTIFY",
    description: "Jeden konkrétní proces s měřitelným výsledkem",
    color: colors.blue[400],
    startFrame: 0,
  },
  {
    icon: "flask",
    title: "PILOT",
    description: "Testuj s malou skupinou, sbírej zpětnou vazbu",
    color: colors.purple[600],
    startFrame: 25,
  },
  {
    icon: "chart-bar",
    title: "MEASURE",
    description: "Srovnej: před vs po. Čas, náklady, chyby.",
    color: colors.semantic.success,
    startFrame: 50,
  },
  {
    icon: "rocket-launch",
    title: "SCALE",
    description: "Replikuj na další procesy. Pak další.",
    color: colors.semantic.success,
    startFrame: 75,
  },
];

export const StartSmallFramework: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const titleProgress = spring({ frame, fps, config: springs.smooth });

  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          fontSize: typeScale.h2.size,
          fontWeight: fontWeight.display,
          color: colors.purple[50],
          textAlign: "center",
          marginBottom: 56,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [24, 0])}px)`,
        }}
      >
        Start Small → Scale Fast — framework pro AI adopci
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0,
          width: "100%",
          maxWidth: 1300,
        }}
      >
        {STEPS.map((step, i) => {
          const localFrame = frame - step.startFrame;
          const progress = spring({
            frame: localFrame,
            fps,
            config: springs.bouncy,
          });
          const visible = localFrame > 0 ? progress : 0;

          const arrowLocalFrame = frame - step.startFrame - 8;
          const arrowProgress =
            arrowLocalFrame > 0
              ? spring({ frame: arrowLocalFrame, fps, config: springs.smooth })
              : 0;

          return (
            <React.Fragment key={step.title}>
              <div
                style={{
                  flex: 1,
                  background: colors.navy[800],
                  border: `1.5px solid ${withOpacity(step.color, 0.45)}`,
                  borderRadius: 20,
                  padding: "28px 24px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  opacity: visible,
                  transform: `translateY(${interpolate(visible, [0, 1], [40, 0])}px) scale(${interpolate(visible, [0, 1], [0.88, 1])})`,
                  boxShadow: `0 0 0 1px ${withOpacity(step.color, 0.15)}, 0 0 20px ${withOpacity(step.color, 0.08)}`,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Step number badge */}
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: fontWeight.display,
                    color: colors.navy[950],
                    fontFamily: fonts.mono,
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <PhosphorIcon
                  name={step.icon}
                  size={44}
                  color={step.color}
                  weight="bold"
                  glow="subtle"
                />

                {/* Title */}
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: fontWeight.display,
                    color: step.color,
                    fontFamily: fonts.mono,
                    letterSpacing: 1.5,
                  }}
                >
                  {step.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: fontWeight.body,
                    color: colors.purple[200],
                    lineHeight: 1.55,
                  }}
                >
                  {step.description}
                </div>
              </div>

              {/* Arrow between cards */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    opacity: arrowProgress,
                    flexShrink: 0,
                  }}
                >
                  <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                    <path
                      d="M4 18 H28 M22 11 L30 18 L22 25"
                      stroke={colors.blue[400]}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* "Back to 1" hint */}
      <div
        style={{
          marginTop: 32,
          opacity:
            frame > 100
              ? spring({ frame: frame - 100, fps, config: springs.gentle }) *
                (1 - exitProgress)
              : 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <path
            d="M16 10 C16 14 12 17 8 16 C4 15 2 11 4 7 C6 3 10 2 14 4"
            stroke={withOpacity(colors.blue[400], 0.5)}
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14 2 L16 5 L12 5"
            stroke={withOpacity(colors.blue[400], 0.5)}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span
          style={{
            fontSize: 13,
            fontFamily: fonts.mono,
            color: withOpacity(colors.blue[400], 0.5),
          }}
        >
          opakuj pro každý nový proces
        </span>
      </div>
    </div>
  );
};
