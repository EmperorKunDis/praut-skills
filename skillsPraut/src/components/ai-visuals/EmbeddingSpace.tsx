import React from "react";
import { ScatterPlot } from "../charts/ScatterPlot";

type Embedding = {
  label: string;
  x: number;
  y: number;
  highlight?: boolean;
};

type Props = {
  embeddings: Embedding[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

/**
 * 2D embedding scatter — wraps `<ScatterPlot />` with the classic
 * king/queen/man/woman demo style.
 */
export const EmbeddingSpace: React.FC<Props> = ({
  embeddings,
  width = 1100,
  height = 600,
  style,
}) => (
  <ScatterPlot
    points={embeddings}
    width={width}
    height={height}
    xLabel="dim 1"
    yLabel="dim 2"
    style={style}
  />
);
