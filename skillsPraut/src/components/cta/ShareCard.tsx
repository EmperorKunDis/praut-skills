import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

const PLATFORMS = [
  { name: "X", icon: "x-logo" as const },
  { name: "LinkedIn", icon: "linkedin-logo" as const },
  { name: "Facebook", icon: "facebook-logo" as const },
  { name: "Discord", icon: "discord-logo" as const },
];

type Props = {
  style?: React.CSSProperties;
};

/**
 * Quick "Share" card with branded social platform pill buttons.
 */
export const ShareCard: React.FC<Props> = ({ style }) => (
  <div
    style={{
      background: gradients.card,
      borderRadius: 16,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize: 20,
        color: colors.purple[50],
      }}
    >
      Sdílej video
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      {PLATFORMS.map((p) => (
        <div
          key={p.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 999,
            background: colors.navy[800],
            border: `1px solid ${colors.blue[400]}66`,
            fontFamily: fonts.primary,
            fontSize: 14,
            color: colors.purple[100],
            fontWeight: fontWeight.body,
          }}
        >
          <PhosphorIcon
            name={p.icon}
            size={20}
            color={colors.blue[400]}
          />
          {p.name}
        </div>
      ))}
    </div>
  </div>
);
