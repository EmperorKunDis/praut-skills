import React from "react";
import { frameShort, withOpacity } from "../../styles/tokens";
import { SafeArea } from "./SafeArea";
import { WatermarkPraut } from "./WatermarkPraut";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";

type Props = {
  episodeTitle?: string;
  includeWatermark?: boolean;
  frameless?: boolean;
  /** Render the SpaceNebula background. Defaults to true. */
  includeBackground?: boolean;
  children: React.ReactNode;
};

/**
 * 9:16 (1080×1920) brand frame for YouTube Shorts / Reels / TikTok.
 * Lighter chrome — no top bar, just brand watermark.
 */
export const PrautShortFrame: React.FC<Props> = ({
  episodeTitle: _episodeTitle,
  includeWatermark = true,
  frameless = false,
  includeBackground = true,
  children,
}) => {
  const border = frameless
    ? undefined
    : `${frameShort.borderWidth}px solid ${withOpacity(
        frameShort.borderColor,
        0.7,
      )}`;

  return (
    <SafeArea
      referenceWidth={frameShort.width}
      referenceHeight={frameShort.height}
    >
      <div
        style={{
          position: "absolute",
          inset: frameShort.sidePadding,
          border,
          borderRadius: frameShort.borderRadius,
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {includeBackground ? <SpiralGalaxy /> : null}
        {children}
        {includeWatermark ? <WatermarkPraut /> : null}
      </div>
    </SafeArea>
  );
};
