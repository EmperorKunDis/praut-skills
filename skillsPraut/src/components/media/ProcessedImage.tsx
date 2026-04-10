import React from "react";
import { Img } from "remotion";
import { colors, frame, glow, withOpacity } from "../../styles/tokens";

type Props = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

/**
 * Brand image treatment — rounded corners, blue border, glow,
 * and a subtle bottom-fade overlay so the image doesn't feel "stuck".
 */
export const ProcessedImage: React.FC<Props> = ({
  src,
  alt = "",
  width = "100%",
  height = "auto",
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width,
        height,
        borderRadius: frame.borderRadius * 2,
        overflow: "hidden",
        border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
        boxShadow: glow.active,
        ...style,
      }}
    >
      <Img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent, ${withOpacity(frame.bg, 0.6)})`,
        }}
      />
    </div>
  );
};
