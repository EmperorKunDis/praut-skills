import React from "react";
import { Img } from "remotion";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  src: string;
  alt?: string;
  width?: number | string;
  style?: React.CSSProperties;
};

/**
 * Screenshot wrapper — large rounded corners, brand border + active glow.
 */
export const RoundedScreenshot: React.FC<Props> = ({
  src,
  alt = "",
  width = "100%",
  style,
}) => (
  <div
    style={{
      width,
      borderRadius: frame.borderRadius * 4,
      overflow: "hidden",
      border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
      boxShadow: glow.active,
      ...style,
    }}
  >
    <Img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
  </div>
);
