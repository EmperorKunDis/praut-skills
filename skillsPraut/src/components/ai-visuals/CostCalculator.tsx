import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  model: string;
  inputTokens: number;
  outputTokens: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  style?: React.CSSProperties;
};

/**
 * Live LLM cost breakdown — input × inputPrice + output × outputPrice.
 * Renders both lines plus the total in brand gradient.
 */
export const CostCalculator: React.FC<Props> = ({
  model,
  inputTokens,
  outputTokens,
  inputPricePerMillion,
  outputPricePerMillion,
  style,
}) => {
  const inputCost = (inputTokens / 1_000_000) * inputPricePerMillion;
  const outputCost = (outputTokens / 1_000_000) * outputPricePerMillion;
  const total = inputCost + outputCost;

  const Row: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.purple[200],
        padding: "8px 0",
        borderBottom: `1px solid ${colors.navy[700]}`,
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div
      style={{
        background: gradients.card,
        borderRadius: 12,
        padding: 32,
        width: 480,
        border: `1px solid ${colors.purple[600]}55`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 22,
          color: colors.purple[50],
          marginBottom: 16,
        }}
      >
        {model}
      </div>
      <Row
        label={`Input  (${inputTokens.toLocaleString("cs-CZ")} tok)`}
        value={`$${inputCost.toFixed(4)}`}
      />
      <Row
        label={`Output (${outputTokens.toLocaleString("cs-CZ")} tok)`}
        value={`$${outputCost.toFixed(4)}`}
      />
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 36,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "right",
        }}
      >
        ${total.toFixed(4)}
      </div>
    </div>
  );
};
