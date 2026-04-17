import React from "react";
import { colors, fonts, fontWeight, glow, springs } from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";
import { PhosphorIcon } from "../icons/PhosphorIcon";

const phases = [
  { label: "Výchozí stav", icon: "house" },
  { label: "Výzva", icon: "megaphone" },
  { label: "Průvodce", icon: "compass" },
  { label: "Zkoušky", icon: "fire" },
  { label: "Návrat", icon: "trophy" },
];

type Props = {
  currentPhase: number;
  title?: string;
  description?: string;
  style?: React.CSSProperties;
};

export const HeroJourneyStructure: React.FC<Props> = ({
  currentPhase,
  title,
  description,
  style,
}) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.snappy });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        opacity: p,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {phases.map((phase, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  i <= currentPhase ? colors.navy[700] : colors.navy[800],
                border: `2px solid ${
                  i === currentPhase
                    ? colors.purple[600]
                    : i < currentPhase
                      ? colors.semantic.success
                      : colors.navy[600]
                }`,
                boxShadow: i === currentPhase ? glow.active : undefined,
                transform: i === currentPhase ? "scale(1.2)" : "scale(1)",
              }}
            >
              {i < currentPhase ? (
                <PhosphorIcon
                  name="check"
                  size={24}
                  color={colors.semantic.success}
                />
              ) : (
                <PhosphorIcon
                  name={phase.icon}
                  size={24}
                  color={
                    i === currentPhase ? colors.purple[50] : colors.purple[300]
                  }
                />
              )}
            </div>
            {i < phases.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  background:
                    i < currentPhase
                      ? colors.semantic.success
                      : colors.navy[600],
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {phases[currentPhase]?.label}
      </div>
      {title && (
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 28,
            color: colors.purple[50],
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[200],
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};
