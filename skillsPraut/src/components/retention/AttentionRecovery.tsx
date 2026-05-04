import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  variant: "question" | "preview" | "callout";
  content: string;
  style?: React.CSSProperties;
};

export const AttentionRecovery: React.FC<Props> = ({
  variant,
  content,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: springs.bouncy });

  const iconName =
    variant === "question"
      ? "question"
      : variant === "preview"
        ? "eye"
        : "lightning";
  const borderColor =
    variant === "question"
      ? colors.blue[400]
      : variant === "preview"
        ? colors.purple[600]
        : colors.semantic.warning;

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        background: colors.navy[800],
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: 8,
        padding: "16px 24px",
        maxWidth: 800,
        opacity: p,
        transform: `scale(${0.9 + p * 0.1})`,
        ...style,
      }}
    >
      <PhosphorIcon
        name={iconName}
        size={28}
        color={borderColor}
        weight="bold"
      />
      <span
        style={{
          fontFamily: fonts.primary,
          fontSize: 22,
          fontWeight: fontWeight.heading,
          color: colors.purple[50],
          lineHeight: 1.3,
        }}
      >
        {content}
      </span>
    </div>
  );
};
