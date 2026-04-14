import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  /** Width in px. Defaults to 240. */
  width?: number;
  /** Height in px. Defaults to 240. */
  height?: number;
  /** Inset from the right edge in px. Defaults to 48. */
  rightInset?: number;
  /** Inset from the bottom edge in px. Defaults to 48. */
  bottomInset?: number;
  style?: React.CSSProperties;
};

/**
 * Green-screen square anchored bottom-RIGHT of its containing slide.
 *
 * Reserves space for a webcam talking-head feed that the user composites in
 * during YouTube editing. Filled with chroma-key green (#00FF00) for easy
 * keying in post-production. Square aspect ratio for face framing.
 *
 * Per VIDEO_FORMAT.md: WebcamPlaceholder 240×240 bottom-right.
 */
export const WebcamPlaceholder: React.FC<Props> = ({
  width = 240,
  height = 240,
  rightInset = 48,
  bottomInset = 48,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: rightInset,
        bottom: bottomInset,
        width,
        height,
        border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
        borderRadius: 12,
        background: "#00FF00",
        boxShadow: glow.active,
        zIndex: 30,
        ...style,
      }}
    />
  );
};
