import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  /** Frame width in px. Defaults to 480. */
  width?: number;
  /** Frame height in px. Defaults to 270 (16:9 of 480). */
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Empty next-video frame placeholder.
 *
 * Just a brand-blue rounded rectangle with active glow — no thumbnail, no
 * title, no "Příště" label. Martin composites the actual YouTube end-screen
 * thumbnail and clickable card on top during editing.
 */
export const NextVideoCard: React.FC<Props> = ({
  width = 480,
  height = 270,
  style,
}) => (
  <div
    style={{
      width,
      height,
      border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
      borderRadius: 12,
      background: "transparent",
      boxShadow: glow.active,
      ...style,
    }}
  />
);
