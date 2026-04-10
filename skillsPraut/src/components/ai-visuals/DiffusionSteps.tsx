import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  steps?: number;
  style?: React.CSSProperties;
};

/**
 * Visual representation of diffusion denoising steps. Each step is a square
 * with progressively less noise (uses opacity gradients).
 */
export const DiffusionSteps: React.FC<Props> = ({ steps = 6, style }) => (
  <div
    style={{
      display: "flex",
      gap: 16,
      alignItems: "center",
      ...style,
    }}
  >
    {Array.from({ length: steps }).map((_, i) => {
      const noise = 1 - i / (steps - 1);
      return (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              border: `1px solid ${colors.blue[400]}66`,
              background: `repeating-conic-gradient(${colors.purple[600]}${Math.round(
                noise * 255,
              )
                .toString(16)
                .padStart(2, "0")} 0% 25%, ${colors.navy[800]} 0% 50%)`,
              backgroundSize: `${4 + i * 4}px ${4 + i * 4}px`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[300],
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            t={steps - i}
          </span>
        </div>
      );
    })}
  </div>
);
