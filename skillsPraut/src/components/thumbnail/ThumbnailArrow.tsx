import React from "react";
import { colors } from "../../styles/tokens";

type Props = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  thickness?: number;
  curved?: boolean;
};

export const ThumbnailArrow: React.FC<Props> = ({
  from,
  to,
  color = colors.semantic.warning,
  thickness = 6,
  curved = false,
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const headSize = thickness * 3;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const cpX = curved ? midX + dy * 0.3 : midX;
  const cpY = curved ? midY - dx * 0.3 : midY;

  const path = curved
    ? `M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />
      <polygon
        points={`0,-${headSize / 2} ${headSize},0 0,${headSize / 2}`}
        fill={color}
        transform={`translate(${to.x},${to.y}) rotate(${(angle * 180) / Math.PI})`}
      />
    </svg>
  );
};
