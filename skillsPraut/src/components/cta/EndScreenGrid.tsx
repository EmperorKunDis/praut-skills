import React from "react";
import { NextVideoCard } from "./NextVideoCard";

type Props = {
  /** Number of empty next-video frames to render. Defaults to 4 (2x2 grid). */
  count?: number;
  style?: React.CSSProperties;
};

/**
 * 2x2 grid of empty next-video frame placeholders. Martin composites the
 * actual YouTube cards on top in the editor.
 */
export const EndScreenGrid: React.FC<Props> = ({ count = 4, style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 32,
      ...style,
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <NextVideoCard key={i} />
    ))}
  </div>
);
