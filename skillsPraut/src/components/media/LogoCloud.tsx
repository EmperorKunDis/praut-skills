import React from "react";
import { Img } from "remotion";
import { colors, fonts } from "../../styles/tokens";

type Logo = {
  src?: string;
  label?: string;
};

type Props = {
  logos: Logo[];
  columns?: number;
  style?: React.CSSProperties;
};

/**
 * Tiled grid of partner / tool logos at 60% opacity.
 * Falls back to text labels when no `src` is provided.
 */
export const LogoCloud: React.FC<Props> = ({ logos, columns = 4, style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 32,
      alignItems: "center",
      justifyItems: "center",
      ...style,
    }}
  >
    {logos.map((logo, i) =>
      logo.src ? (
        <Img
          key={i}
          src={logo.src}
          alt={logo.label ?? `logo-${i}`}
          style={{
            maxWidth: 160,
            maxHeight: 80,
            objectFit: "contain",
            opacity: 0.6,
          }}
        />
      ) : (
        <span
          key={i}
          style={{
            fontFamily: fonts.primary,
            fontWeight: 700,
            fontSize: 22,
            color: colors.purple[200],
            opacity: 0.6,
          }}
        >
          {logo.label}
        </span>
      ),
    )}
  </div>
);
