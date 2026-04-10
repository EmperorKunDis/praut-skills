import React from "react";
import { fonts, frame, fontWeight, colors } from "../../styles/tokens";
import { BrainMark } from "./BrainMark";

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

type Props = {
  position?: Position;
  opacity?: number;
};

/**
 * Discreet brand watermark anchored to a corner.
 * Default placement: bottom-right at 60% opacity.
 */
export const WatermarkPraut: React.FC<Props> = ({
  position = "bottom-right",
  opacity = 0.6,
}) => {
  const isBottom = position.startsWith("bottom");
  const isRight = position.endsWith("right");

  return (
    <div
      style={{
        position: "absolute",
        [isBottom ? "bottom" : "top"]: frame.sidePadding * 2,
        [isRight ? "right" : "left"]: frame.sidePadding * 2,
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity,
        zIndex: 40,
      }}
    >
      <BrainMark size={20} />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 12,
          letterSpacing: 2,
          color: colors.purple[100],
        }}
      >
        PRAUT
      </span>
    </div>
  );
};
