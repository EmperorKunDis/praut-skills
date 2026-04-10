import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  timing,
} from "../../styles/tokens";

type Props = {
  percent: number; // 0..100
  label?: string;
  width?: number;
  height?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

export const PercentageBar: React.FC<Props> = ({
  percent,
  label,
  width = 800,
  height = 32,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const fill = interpolate(
    frame - startFrame,
    [0, timing.reveal],
    [0, percent],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ width, ...style }}>
      {label ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: fonts.primary,
            fontSize: 16,
            color: colors.purple[100],
            marginBottom: 8,
            fontWeight: fontWeight.body,
          }}
        >
          <span>{label}</span>
          <span style={{ fontFamily: fonts.mono }}>{Math.round(fill)}%</span>
        </div>
      ) : null}
      <div
        style={{
          width: "100%",
          height,
          background: colors.navy[800],
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${fill}%`,
            height: "100%",
            background: gradients.brandPrimary,
          }}
        />
      </div>
    </div>
  );
};
