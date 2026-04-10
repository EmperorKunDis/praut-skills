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
  prompt?: string;
  style?: React.CSSProperties;
};

export const CommentPrompt: React.FC<Props> = ({
  prompt = "Napiš mi do komentáře, jaké video chceš vidět příště.",
  style,
}) => (
  <div
    style={{
      background: gradients.card,
      border: `1px solid ${colors.purple[600]}66`,
      borderRadius: 16,
      padding: "28px 36px",
      display: "flex",
      gap: 20,
      alignItems: "center",
      boxShadow: glow.subtle,
      maxWidth: 720,
      ...style,
    }}
  >
    <PhosphorIcon
      name="chat-circle-text"
      size={40}
      color={colors.purple[400]}
    />
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.body,
        fontSize: 20,
        color: colors.purple[100],
        lineHeight: 1.4,
      }}
    >
      {prompt}
    </div>
  </div>
);
