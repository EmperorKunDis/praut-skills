import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  frame,
  glow,
  gradients,
} from "../../styles/tokens";

type Props = {
  rank: number;
  title: string;
  description?: string;
  isWinner?: boolean;
  style?: React.CSSProperties;
};

/**
 * Single TopTen card. Winner (#1) gets the brand gradient + cta glow.
 */
export const TopTenCard: React.FC<Props> = ({
  rank,
  title,
  description,
  isWinner = false,
  style,
}) => (
  <div
    style={{
      background: isWinner ? gradients.brandPrimary : colors.navy[800],
      border: isWinner ? "none" : `1.5px solid ${colors.blue[400]}`,
      borderRadius: frame.borderRadius * 4,
      padding: 32,
      display: "flex",
      alignItems: "center",
      gap: 32,
      boxShadow: isWinner ? glow.cta : undefined,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 96,
        background: isWinner ? "#FAF5FF" : gradients.logoText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        minWidth: 140,
        textAlign: "center",
        lineHeight: 1,
      }}
    >
      #{rank}
    </div>
    <div>
      <h3
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 36,
          color: "#FAF5FF",
          margin: 0,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.body,
            fontSize: 18,
            color: colors.purple[200],
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  </div>
);
