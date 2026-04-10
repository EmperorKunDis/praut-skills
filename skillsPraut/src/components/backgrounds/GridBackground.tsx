import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, frame, withOpacity } from "../../styles/tokens";

type Props = {
  cellSize?: number;
};

/**
 * Tech grid background — thin blue lines on navy.
 */
export const GridBackground: React.FC<Props> = ({ cellSize = 80 }) => {
  const lineColor = withOpacity(colors.blue[400], 0.1);
  return (
    <AbsoluteFill
      style={{
        background: frame.bg,
        backgroundImage: `
					linear-gradient(${lineColor} 1px, transparent 1px),
					linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
				`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    />
  );
};
