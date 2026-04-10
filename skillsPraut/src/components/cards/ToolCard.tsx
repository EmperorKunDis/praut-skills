import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  name: string;
  tagline?: string;
  logoSrc?: string;
  style?: React.CSSProperties;
};

/**
 * Tool / product card — logo, name and one-liner. For showcasing
 * Claude / GPT / etc. on the channel.
 */
export const ToolCard: React.FC<Props> = ({
  name,
  tagline,
  logoSrc,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 12,
        padding: 24,
        display: "flex",
        gap: 20,
        alignItems: "center",
        width: 380,
        ...style,
      }}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={name}
          style={{
            width: 64,
            height: 64,
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      ) : (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: gradients.brandPrimary,
          }}
        />
      )}
      <div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 22,
            color: colors.purple[50],
          }}
        >
          {name}
        </div>
        {tagline ? (
          <div
            style={{
              fontFamily: fonts.primary,
              fontSize: 14,
              color: colors.purple[300],
              marginTop: 4,
            }}
          >
            {tagline}
          </div>
        ) : null}
      </div>
    </div>
  );
};
