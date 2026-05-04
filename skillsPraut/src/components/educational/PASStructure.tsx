import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Phase = "problem" | "agitate" | "solution";

const phaseConfig: Record<
  Phase,
  { icon: string; borderColor: string; label: string }
> = {
  problem: {
    icon: "warning-circle",
    borderColor: colors.semantic.error,
    label: "PROBLÉM",
  },
  agitate: {
    icon: "fire",
    borderColor: colors.semantic.warning,
    label: "PROČ TO BOLÍ",
  },
  solution: {
    icon: "check-circle",
    borderColor: colors.semantic.success,
    label: "ŘEŠENÍ",
  },
};

type Props = {
  phase: Phase;
  content: string;
  style?: React.CSSProperties;
};

export const PASStructure: React.FC<Props> = ({ phase, content, style }) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.bouncy });
  const cfg = phaseConfig[phase];
  const isAgitate = phase === "agitate";

  return (
    <div
      style={{
        background: gradients.card,
        borderLeft: `4px solid ${cfg.borderColor}`,
        borderRadius: 12,
        padding: "28px 36px",
        maxWidth: 1000,
        transform: `scale(${isAgitate ? 1.03 : 1}) translateY(${(1 - p) * 20}px)`,
        opacity: p,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <PhosphorIcon name={cfg.icon} size={24} color={cfg.borderColor} />
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: cfg.borderColor,
            letterSpacing: 2,
            fontWeight: fontWeight.bodyEmphasis,
          }}
        >
          {cfg.label}
        </span>
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 24,
          fontWeight: fontWeight.heading,
          color: colors.purple[50],
          lineHeight: 1.35,
        }}
      >
        {content}
      </div>
    </div>
  );
};
