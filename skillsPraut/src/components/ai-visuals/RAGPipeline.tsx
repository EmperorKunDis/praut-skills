import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  style?: React.CSSProperties;
};

/**
 * RAG pipeline: Query → Vector DB → Context → LLM → Answer.
 * Each step has a distinct icon color so the flow reads naturally:
 *   user (light) → db (blue) → context (blue) → LLM (purple, highlighted) → answer (green)
 */
export const RAGPipeline: React.FC<Props> = ({ style }) => {
  const Step: React.FC<{
    icon: string;
    label: string;
    iconColor: string;
    highlight?: boolean;
  }> = ({ icon, label, iconColor, highlight }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: highlight ? gradients.brandPrimary : gradients.card,
        border: highlight ? "none" : `1px solid ${colors.blue[400]}66`,
        borderRadius: 12,
        padding: 24,
        minWidth: 160,
        boxShadow: highlight ? glow.cta : undefined,
      }}
    >
      <PhosphorIcon name={icon} weight="bold" size={56} color={iconColor} />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.bodyEmphasis,
          fontSize: 16,
          color: colors.purple[50],
        }}
      >
        {label}
      </span>
    </div>
  );

  const Arrow: React.FC = () => (
    <PhosphorIcon
      name="arrow-right"
      weight="bold"
      size={32}
      color={colors.purple[200]}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        ...style,
      }}
    >
      <Step icon="user" label="Query" iconColor="#60A5FA" />
      <Arrow />
      <Step icon="database" label="Vector DB" iconColor="#A78BFA" />
      <Arrow />
      <Step icon="files" label="Context" iconColor="#34D399" />
      <Arrow />
      <Step icon="brain" label="LLM" iconColor="#FBBF24" highlight />
      <Arrow />
      <Step icon="chat-circle-text" label="Answer" iconColor="#60A5FA" />
    </div>
  );
};
