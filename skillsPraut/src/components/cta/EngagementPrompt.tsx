import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";
import { springs } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  variant: "poll" | "comment-question" | "like-if";
  text: string;
  style?: React.CSSProperties;
};

const variantConfig = {
  poll: { icon: "chart-bar", color: colors.blue[400] },
  "comment-question": { icon: "chat-circle-text", color: colors.purple[600] },
  "like-if": { icon: "thumbs-up", color: colors.semantic.success },
};

export const EngagementPrompt: React.FC<Props> = ({ variant, text, style }) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.bouncy });
  const cfg = variantConfig[variant];
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        background: colors.navy[800],
        border: `2px solid ${cfg.color}`,
        borderRadius: 12,
        padding: "20px 32px",
        maxWidth: 800,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        ...style,
      }}
    >
      <PhosphorIcon name={cfg.icon} size={32} color={cfg.color} glow="subtle" />
      <span
        style={{
          fontFamily: fonts.primary,
          fontSize: 24,
          fontWeight: fontWeight.heading,
          color: colors.purple[50],
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
};
