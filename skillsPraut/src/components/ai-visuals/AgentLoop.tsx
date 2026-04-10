import React from "react";
import { useCurrentFrame } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  style?: React.CSSProperties;
};

const STEPS = [
  { label: "Think", icon: "brain" },
  { label: "Act", icon: "play-circle" },
  { label: "Observe", icon: "eye" },
];

/**
 * Animated Think → Act → Observe agent loop. Active step rotates over time.
 */
export const AgentLoop: React.FC<Props> = ({ style }) => {
  const frame = useCurrentFrame();
  const activeStep = Math.floor((frame / 30) % STEPS.length);

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        ...style,
      }}
    >
      {STEPS.map((step, i) => {
        const isActive = i === activeStep;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                background: isActive ? gradients.brandPrimary : gradients.card,
                border: `2px solid ${
                  isActive ? "transparent" : colors.blue[400]
                }`,
                borderRadius: 12,
                padding: "20px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                boxShadow: isActive ? glow.cta : undefined,
                minWidth: 160,
              }}
            >
              <PhosphorIcon
                name={step.icon}
                size={36}
                color={isActive ? colors.purple[50] : colors.purple[400]}
              />
              <span
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 20,
                  color: colors.purple[50],
                }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <PhosphorIcon
                name="arrow-right"
                weight="bold"
                size={32}
                color={colors.blue[400]}
              />
            ) : (
              <PhosphorIcon
                name="arrows-clockwise"
                weight="bold"
                size={32}
                color={colors.blue[400]}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
