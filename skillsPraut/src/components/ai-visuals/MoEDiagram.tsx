import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  expertCount?: number;
  activeExperts?: number[];
  style?: React.CSSProperties;
};

/**
 * Mixture of Experts routing diagram.
 * Active experts highlighted in brand purple.
 */
export const MoEDiagram: React.FC<Props> = ({
  expertCount = 8,
  activeExperts = [2, 5],
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      ...style,
    }}
  >
    <div
      style={{
        padding: "16px 32px",
        background: gradients.brandPrimary,
        borderRadius: 8,
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize: 22,
        color: colors.purple[50],
      }}
    >
      Router
    </div>
    <svg width={600} height={120}>
      {Array.from({ length: expertCount }).map((_, i) => {
        const x = 50 + i * (500 / (expertCount - 1));
        const isActive = activeExperts.includes(i);
        return (
          <line
            key={i}
            x1={300}
            y1={0}
            x2={x}
            y2={100}
            stroke={
              isActive ? colors.purple[600] : withOpacity(colors.blue[400], 0.3)
            }
            strokeWidth={isActive ? 3 : 1}
          />
        );
      })}
    </svg>
    <div style={{ display: "flex", gap: 16 }}>
      {Array.from({ length: expertCount }).map((_, i) => {
        const isActive = activeExperts.includes(i);
        return (
          <div
            key={i}
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              background: isActive ? gradients.brandPrimary : colors.navy[800],
              border: `1px solid ${isActive ? colors.purple[600] : colors.blue[400]}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.mono,
              fontWeight: fontWeight.bodyEmphasis,
              fontSize: 14,
              color: colors.purple[50],
            }}
          >
            E{i + 1}
          </div>
        );
      })}
    </div>
  </div>
);
