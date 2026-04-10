import React from "react";
import { HeatmapGrid } from "../charts/HeatmapGrid";

type Props = {
  tokens: string[];
  weights: number[][]; // weights[query][key] in 0..1
  cellSize?: number;
  style?: React.CSSProperties;
};

/**
 * Attention weight matrix between tokens — wraps `<HeatmapGrid />` with
 * the same tokens on rows and cols.
 */
export const AttentionMatrix: React.FC<Props> = ({
  tokens,
  weights,
  cellSize = 56,
  style,
}) => (
  <HeatmapGrid
    rows={tokens}
    cols={tokens}
    values={weights}
    cellSize={cellSize}
    style={style}
  />
);
