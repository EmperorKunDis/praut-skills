import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";

type Branch = {
  label: string;
  angle: number; // radians
  distance?: number;
};

type Props = {
  central: string;
  branches: Branch[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

export const MindMap: React.FC<Props> = ({
  central,
  branches,
  width = 1200,
  height = 700,
  style,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {branches.map((b, i) => {
          const dist = b.distance ?? 280;
          const x = cx + Math.cos(b.angle) * dist;
          const y = cy + Math.sin(b.angle) * dist;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={colors.blue[400]}
              strokeWidth={2}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%, -50%)",
          background: gradients.brandPrimary,
          padding: "20px 32px",
          borderRadius: 999,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
          boxShadow: glow.cta,
        }}
      >
        {central}
      </div>
      {branches.map((b, i) => {
        const dist = b.distance ?? 280;
        const x = cx + Math.cos(b.angle) * dist;
        const y = cy + Math.sin(b.angle) * dist;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              background: colors.navy[800],
              border: `1px solid ${colors.blue[400]}66`,
              padding: "10px 18px",
              borderRadius: 8,
              fontFamily: fonts.primary,
              fontSize: 16,
              color: colors.purple[100],
              whiteSpace: "nowrap",
            }}
          >
            {b.label}
          </div>
        );
      })}
    </div>
  );
};
