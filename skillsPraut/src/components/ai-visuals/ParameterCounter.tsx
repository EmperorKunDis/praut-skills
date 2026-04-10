import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { CountUpNumber } from "../typography/CountUpNumber";

type Props = {
  models: Array<{ name: string; params: number; unit?: "B" | "M" | "T" }>;
  style?: React.CSSProperties;
};

/**
 * Comparison of model parameter counts (e.g. 7B vs 70B vs 405B).
 * Each model gets a card with animated count-up.
 */
export const ParameterCounter: React.FC<Props> = ({ models, style }) => (
  <div
    style={{
      display: "flex",
      gap: 24,
      alignItems: "flex-end",
      ...style,
    }}
  >
    {models.map((m, i) => (
      <div
        key={i}
        style={{
          background: gradients.card,
          border: `1px solid ${colors.purple[600]}55`,
          borderRadius: 12,
          padding: 32,
          textAlign: "center",
          minWidth: 240,
        }}
      >
        <CountUpNumber to={m.params} suffix={m.unit ?? "B"} fontSize={64} />
        <div
          style={{
            marginTop: 12,
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 20,
            color: colors.purple[100],
          }}
        >
          {m.name}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.purple[300],
            letterSpacing: 1,
            marginTop: 4,
          }}
        >
          parameters
        </div>
      </div>
    ))}
  </div>
);
