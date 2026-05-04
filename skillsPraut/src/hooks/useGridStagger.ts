import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs } from "../styles/tokens";

type GridStaggerConfig = {
  columns: number;
  rows: number;
  from?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  totalFrames?: number;
  config?: { damping: number; stiffness: number; mass: number };
};

export const useGridStagger = (opts: GridStaggerConfig) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    columns,
    rows,
    from = "center",
    totalFrames = 60,
    config = springs.smooth,
  } = opts;

  const focal = {
    center: [Math.floor(columns / 2), Math.floor(rows / 2)],
    "top-left": [0, 0],
    "top-right": [columns - 1, 0],
    "bottom-left": [0, rows - 1],
    "bottom-right": [columns - 1, rows - 1],
  }[from] as [number, number];

  const maxDist = Math.sqrt(
    Math.pow(Math.max(focal[0], columns - 1 - focal[0]), 2) +
      Math.pow(Math.max(focal[1], rows - 1 - focal[1]), 2),
  );

  return (col: number, row: number): number => {
    const dist = Math.sqrt(
      Math.pow(col - focal[0], 2) + Math.pow(row - focal[1], 2),
    );
    const delay = maxDist > 0 ? (dist / maxDist) * totalFrames * 0.5 : 0;
    return spring({ frame: frame - delay, fps, config });
  };
};
