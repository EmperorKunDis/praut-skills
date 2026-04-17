import React from "react";
import { colors } from "../../styles/tokens";

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  outlineColor?: string;
  outlineWidth?: number;
  rotation?: number;
  shadow?: boolean;
  style?: React.CSSProperties;
};

export const ThumbnailText: React.FC<Props> = ({
  text,
  fontSize = 96,
  color = colors.purple[50],
  outlineColor = "rgba(0,0,0,0.7)",
  outlineWidth = 3,
  rotation = 0,
  shadow = true,
  style,
}) => (
  <div
    style={{
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 900,
      fontSize,
      color,
      WebkitTextStroke: `${outlineWidth}px ${outlineColor}`,
      textShadow: shadow
        ? "3px 3px 0 rgba(0,0,0,0.5), 6px 6px 0 rgba(0,0,0,0.3)"
        : undefined,
      transform: rotation ? `rotate(${rotation}deg)` : undefined,
      lineHeight: 1.0,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {text}
  </div>
);
