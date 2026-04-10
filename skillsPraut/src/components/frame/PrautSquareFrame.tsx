import React from "react";
import { frameSquare, fonts, colors, withOpacity } from "../../styles/tokens";
import { SafeArea } from "./SafeArea";
import { WatermarkPraut } from "./WatermarkPraut";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";

type Props = {
  slideNumber?: number;
  totalSlides?: number;
  includeWatermark?: boolean;
  frameless?: boolean;
  /** Render the SpaceNebula background. Defaults to true. */
  includeBackground?: boolean;
  children: React.ReactNode;
};

/**
 * 1:1 (1080×1080) brand frame for LinkedIn carousel exports.
 * Optionally shows a "1 / 7" slide indicator in the top-right corner.
 */
export const PrautSquareFrame: React.FC<Props> = ({
  slideNumber,
  totalSlides,
  includeWatermark = true,
  frameless = false,
  includeBackground = true,
  children,
}) => {
  const border = frameless
    ? undefined
    : `${frameSquare.borderWidth}px solid ${withOpacity(
        frameSquare.borderColor,
        0.7,
      )}`;

  return (
    <SafeArea
      referenceWidth={frameSquare.width}
      referenceHeight={frameSquare.height}
    >
      <div
        style={{
          position: "absolute",
          inset: frameSquare.sidePadding,
          border,
          borderRadius: frameSquare.borderRadius,
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {includeBackground ? <SpiralGalaxy /> : null}
        {children}
        {slideNumber && totalSlides ? (
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.purple[200],
              letterSpacing: 2,
              zIndex: 50,
            }}
          >
            {slideNumber} / {totalSlides}
          </div>
        ) : null}
        {includeWatermark ? <WatermarkPraut /> : null}
      </div>
    </SafeArea>
  );
};
