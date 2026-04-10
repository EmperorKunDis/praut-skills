import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  frame,
  glow,
  gradients,
  withOpacity,
} from "../../styles/tokens";
import { PhosphorIcon, PhosphorWeight } from "../icons/PhosphorIcon";

type Props = {
  value: string;
  label: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: string;
  iconWeight?: PhosphorWeight;
  style?: React.CSSProperties;
};

/**
 * Single-stat card — big gradient number with descriptive label and optional
 * delta indicator + icon.
 */
export const StatCard: React.FC<Props> = ({
  value,
  label,
  delta,
  deltaPositive = true,
  icon,
  iconWeight = "fill",
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: frame.borderRadius * 3,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: glow.subtle,
        minWidth: 280,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        {icon ? (
          <PhosphorIcon
            name={icon}
            weight={iconWeight}
            size={24}
            color={colors.purple[400]}
          />
        ) : null}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 56,
          lineHeight: 1,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      {delta ? (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 14,
            color: deltaPositive
              ? colors.semantic.success
              : colors.semantic.error,
          }}
        >
          {deltaPositive ? "▲" : "▼"} {delta}
        </span>
      ) : null}
    </div>
  );
};
