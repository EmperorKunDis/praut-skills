import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  value: number; // 0..1
  style?: React.CSSProperties;
};

/**
 * Visual slider explaining LLM temperature parameter.
 * 0 = deterministic, 1 = creative.
 */
export const TemperatureSlider: React.FC<Props> = ({ value, style }) => {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div style={{ maxWidth: 720, ...style }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[300],
          marginBottom: 8,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        <span>Deterministický</span>
        <span style={{ color: colors.purple[100] }}>
          Temperature: {clamped.toFixed(2)}
        </span>
        <span>Kreativní</span>
      </div>
      <div
        style={{
          height: 12,
          borderRadius: 6,
          background: gradients.brandWide,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -6,
            left: `${clamped * 100}%`,
            transform: "translateX(-50%)",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: colors.purple[50],
            border: `3px solid ${colors.purple[600]}`,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.body,
          fontSize: 16,
          color: colors.purple[200],
          textAlign: "center",
        }}
      >
        {clamped < 0.3
          ? "Stejný vstup → vždy stejný výstup"
          : clamped > 0.7
            ? "Vysoká variabilita, riziko halucinací"
            : "Vyvážený poměr přesnosti a kreativity"}
      </div>
    </div>
  );
};
