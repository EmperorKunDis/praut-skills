import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  style?: React.CSSProperties;
};

/**
 * Diagram of a single transformer block: Multi-Head Attention + Add&Norm
 * + Feed Forward + Add&Norm.
 */
export const TransformerBlock: React.FC<Props> = ({ style }) => {
  const Box: React.FC<{ label: string; color: string; height?: number }> = ({
    label,
    color,
    height = 56,
  }) => (
    <div
      style={{
        background: gradients.card,
        border: `1.5px solid ${color}`,
        borderRadius: 8,
        padding: "0 24px",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.bodyEmphasis,
        fontSize: 14,
        color: colors.purple[100],
      }}
    >
      {label}
    </div>
  );
  const Arrow: React.FC = () => (
    <div
      style={{
        width: 2,
        height: 24,
        background: colors.blue[400],
        margin: "0 auto",
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: 320,
        border: `1px dashed ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: 12,
        padding: 16,
        background: "rgba(15,20,64,0.4)",
        ...style,
      }}
    >
      <Box label="Input Embedding + Pos" color={colors.blue[400]} />
      <Arrow />
      <Box
        label="Multi-Head Attention"
        color={colors.purple[600]}
        height={64}
      />
      <Arrow />
      <Box label="Add & Norm" color={colors.blue[400]} />
      <Arrow />
      <Box label="Feed Forward" color={colors.purple[600]} height={64} />
      <Arrow />
      <Box label="Add & Norm" color={colors.blue[400]} />
    </div>
  );
};
