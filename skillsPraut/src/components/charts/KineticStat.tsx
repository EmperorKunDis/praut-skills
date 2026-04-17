import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";
import { useCountUp } from "../../hooks/useCountUp";

type Props = {
  value: number;
  unit?: string;
  prefix?: string;
  label: string;
  countUp?: boolean;
  size?: "inline" | "hero" | "card";
  style?: React.CSSProperties;
};

/**
 * Animated hero stat number with spring-driven count-up.
 * Three size presets: `inline` (compact), `card` (medium), `hero` (full-screen).
 */
export const KineticStat: React.FC<Props> = ({
  value,
  unit = "",
  prefix = "",
  label,
  countUp = true,
  size = "hero",
  style,
}) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.bouncy });
  const displayValue = countUp ? useCountUp({ from: 0, to: value }) : value;
  const formatted = displayValue.toLocaleString("cs-CZ");

  const sizes = {
    inline: { num: 36, unit: 24, label: 16 },
    hero: { num: 120, unit: 48, label: 22 },
    card: { num: 64, unit: 32, label: 18 },
  };
  const s = sizes[size];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: size === "hero" ? "center" : "flex-start",
        opacity: p,
        transform: `scale(${0.9 + p * 0.1})`,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        {prefix && (
          <span
            style={{
              fontFamily: fonts.primary,
              fontSize: s.unit,
              fontWeight: fontWeight.body,
              color: colors.purple[200],
            }}
          >
            {prefix}
          </span>
        )}
        <span
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: s.num,
            background: gradients.logoText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {formatted}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: s.unit,
              fontWeight: fontWeight.body,
              color: colors.purple[200],
            }}
          >
            {unit}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: s.label,
          fontWeight: fontWeight.body,
          color: colors.purple[300],
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
};
