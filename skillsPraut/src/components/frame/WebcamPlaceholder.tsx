import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  /** Width in px. Defaults to 280. */
  width?: number;
  /** Height in px. Defaults to 160. */
  height?: number;
  /** Inset from the left edge in px. Defaults to 48. */
  leftInset?: number;
  /** Inset from the bottom edge in px. Defaults to 48. */
  bottomInset?: number;
  style?: React.CSSProperties;
};

/**
 * Empty bordered rectangle anchored bottom-left of its containing slide.
 *
 * Reserves space for a webcam talking-head feed that the user composites in
 * during YouTube editing. The placeholder itself renders nothing inside —
 * brand-blue 1.5px border + active glow only, transparent interior so the
 * SpaceNebula and slide content read through.
 */
export const WebcamPlaceholder: React.FC<Props> = ({
  width = 280,
  height = 160,
  leftInset = 48,
  bottomInset = 48,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: leftInset,
        bottom: bottomInset,
        width,
        height,
        border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
        borderRadius: 12,
        background: "transparent",
        boxShadow: glow.active,
        zIndex: 30,
        ...style,
      }}
    />
  );
};
