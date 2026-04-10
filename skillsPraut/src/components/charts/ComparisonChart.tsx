import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";

type Row = {
  label: string;
  a: number;
  b: number;
};

type Props = {
  rows: Row[];
  labelA: string;
  labelB: string;
  startFrame?: number;
  width?: number;
  style?: React.CSSProperties;
};

/**
 * Side-by-side comparison bar chart — Model A vs Model B per row.
 */
export const ComparisonChart: React.FC<Props> = ({
  rows,
  labelA,
  labelB,
  startFrame = 0,
  width = 1100,
  style,
}) => {
  const frame = useCurrentFrame();
  const max = Math.max(...rows.flatMap((r) => [r.a, r.b]));
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width, ...style }}>
      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 24,
          fontFamily: fonts.mono,
          fontSize: 13,
          color: colors.purple[100],
          letterSpacing: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: colors.purple[600],
            }}
          />
          {labelA}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: colors.blue[400],
            }}
          />
          {labelB}
        </div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: fonts.primary,
              fontSize: 16,
              color: colors.purple[100],
              fontWeight: fontWeight.body,
              marginBottom: 8,
            }}
          >
            {row.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                width: `${(row.a / max) * 100 * reveal}%`,
                height: 18,
                background: colors.purple[600],
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: `${(row.b / max) * 100 * reveal}%`,
                height: 18,
                background: colors.blue[400],
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
