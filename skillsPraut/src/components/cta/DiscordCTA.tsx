import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  memberCount?: number | string;
  style?: React.CSSProperties;
};

export const DiscordCTA: React.FC<Props> = ({ memberCount, style }) => (
  <div
    style={{
      background: gradients.card,
      borderRadius: 16,
      padding: "32px 40px",
      display: "flex",
      gap: 24,
      alignItems: "center",
      boxShadow: glow.subtle,
      maxWidth: 640,
      border: `1px solid ${colors.blue[400]}55`,
      ...style,
    }}
  >
    <PhosphorIcon
      name="discord-logo"
      size={64}
      color={colors.blue[400]}
    />
    <div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
        }}
      >
        Praut komunita na Discordu
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 14,
          color: colors.purple[300],
          marginTop: 6,
        }}
      >
        {memberCount
          ? `${memberCount} členů — debata o AI a sdílení zkušeností`
          : "Debata o AI a sdílení zkušeností"}
      </div>
    </div>
  </div>
);
