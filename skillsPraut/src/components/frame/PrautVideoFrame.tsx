import React from "react";
import { frame as frameTokens, withOpacity } from "../../styles/tokens";
import { SafeArea } from "./SafeArea";
import { TopBar } from "./TopBar";
import { WatermarkPraut } from "./WatermarkPraut";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";
import { LiquidGlassPanel } from "./LiquidGlassPanel";

type Props = {
  episodeNumber?: string;
  /** @deprecated kept for back-compat; TopBar now uses pickTagline instead */
  episodeTitle?: string;
  channelName?: string;
  /** Override the bottom-line tagline in the TopBar. */
  tagline?: string;
  includeTopBar?: boolean;
  includeWatermark?: boolean;
  /** Render content without the outer brand border (for raw exports). */
  frameless?: boolean;
  /** Strength of the brand border: 'active' (1.5px solid) or 'passive' (1px 25%). */
  borderState?: "active" | "passive";
  /** Render the SpiralGalaxy background behind children. Defaults to true. */
  includeBackground?: boolean;
  /** Wrap children in a LiquidGlass panel over the galaxy. Defaults to true. */
  includeGlass?: boolean;
  children: React.ReactNode;
};

/**
 * Master 1920×1080 brand frame. Wraps every Praut composition.
 *
 * Layering (back to front):
 *   1. SpiralGalaxy canvas background (density-wave spiral)
 *   2. LiquidGlassPanel (frosted glass overlay — backdrop-blur 20px)
 *   3. Children (charts, text, cards — rendered inside the glass)
 *   4. TopBar (brand mark left, Martin Švanda + tagline right)
 *   5. WatermarkPraut (bottom-right)
 */
export const PrautVideoFrame: React.FC<Props> = ({
  episodeNumber,
  channelName,
  tagline,
  includeTopBar = true,
  includeWatermark = false,
  frameless = false,
  borderState = "active",
  includeBackground = true,
  includeGlass = true,
  children,
}) => {
  const border = frameless
    ? undefined
    : borderState === "active"
      ? `${frameTokens.borderWidth}px solid ${frameTokens.borderColor}`
      : `1px solid ${withOpacity(frameTokens.borderColor, 0.25)}`;

  return (
    <SafeArea>
      <div
        style={{
          position: "absolute",
          inset: frameTokens.sidePadding,
          border,
          borderRadius: frameTokens.borderRadius,
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {includeBackground ? <SpiralGalaxy /> : null}
        {includeGlass ? (
          <LiquidGlassPanel>
            {includeTopBar ? (
              <TopBar
                episodeNumber={episodeNumber}
                channelName={channelName}
                tagline={tagline}
              />
            ) : null}
            {children}
          </LiquidGlassPanel>
        ) : (
          <>
            {includeTopBar ? (
              <TopBar
                episodeNumber={episodeNumber}
                channelName={channelName}
                tagline={tagline}
              />
            ) : null}
            {children}
          </>
        )}
        {includeWatermark ? <WatermarkPraut /> : null}
      </div>
    </SafeArea>
  );
};
