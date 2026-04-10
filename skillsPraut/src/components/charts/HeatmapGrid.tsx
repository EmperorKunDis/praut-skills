import React from "react";
import { colors, fonts } from "../../styles/tokens";
import { interpolateColors } from "../../hooks/interpolateColors";

type Props = {
  rows: string[];
  cols: string[];
  values: number[][]; // values[row][col] in 0..1
  cellSize?: number;
  style?: React.CSSProperties;
};

/**
 * Heatmap grid (e.g. attention matrix). Cells colored from
 * `colors.navy[800]` → `colors.purple[600]` based on value.
 */
export const HeatmapGrid: React.FC<Props> = ({
  rows,
  cols,
  values,
  cellSize = 60,
  style,
}) => {
  return (
    <div style={{ display: "inline-block", ...style }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `auto repeat(${cols.length}, ${cellSize}px)`,
          gap: 2,
        }}
      >
        <div />
        {cols.map((c, i) => (
          <div
            key={i}
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              color: colors.purple[100],
              textAlign: "center",
              paddingBottom: 4,
            }}
          >
            {c}
          </div>
        ))}
        {rows.map((r, ri) => (
          <React.Fragment key={ri}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                color: colors.purple[100],
                paddingRight: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {r}
            </div>
            {cols.map((_, ci) => {
              const v = values[ri]?.[ci] ?? 0;
              return (
                <div
                  key={ci}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    background: interpolateColors(
                      v,
                      colors.navy[800],
                      colors.purple[600],
                    ),
                    borderRadius: 4,
                  }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
