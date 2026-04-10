import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  name: string;
  role?: string;
  avatarSrc?: string;
  highlight?: string;
  style?: React.CSSProperties;
};

/**
 * Person card — avatar, name in gradient, role in mono, optional highlight chip.
 */
export const PersonCard: React.FC<Props> = ({
  name,
  role,
  avatarSrc,
  highlight,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 12,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 280,
        ...style,
      }}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={name}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${colors.blue[400]}`,
          }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: gradients.brandPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: 48,
            color: colors.purple[50],
          }}
        >
          {name.charAt(0)}
        </div>
      )}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 22,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
        }}
      >
        {name}
      </div>
      {role ? (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          {role}
        </div>
      ) : null}
      {highlight ? (
        <span
          style={{
            background: colors.purple[800],
            color: colors.purple[100],
            fontFamily: fonts.primary,
            fontSize: 12,
            fontWeight: fontWeight.bodyEmphasis,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {highlight}
        </span>
      ) : null}
    </div>
  );
};
