import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  timing,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Step = {
  title: string;
  description?: string;
  icon?: string;
};

type Props = {
  steps: Step[];
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Horizontal step list with arrows. Each step staggers in.
 */
export const StepByStep: React.FC<Props> = ({
  steps,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.medium,
    startFrame,
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "stretch",
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const progress = stagger(i);
        return (
          <React.Fragment key={i}>
            <div
              style={{
                flex: 1,
                background: colors.navy[800],
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: progress,
                transform: `translateY(${(1 - progress) * 16}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontWeight: fontWeight.display,
                    fontSize: 28,
                    background: gradients.logoText,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {i + 1}
                </div>
                {step.icon ? (
                  <PhosphorIcon
                    name={step.icon}
                    size={24}
                    color={colors.purple[400]}
                  />
                ) : null}
              </div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 22,
                  color: colors.purple[50],
                }}
              >
                {step.title}
              </div>
              {step.description ? (
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 14,
                    color: colors.purple[200],
                  }}
                >
                  {step.description}
                </div>
              ) : null}
            </div>
            {i < steps.length - 1 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  opacity: progress,
                }}
              >
                <PhosphorIcon
                  name="caret-right"
                  weight="bold"
                  size={28}
                  color={colors.blue[400]}
                />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
