import React from "react";
import {
  channel,
  colors,
  fonts,
  fontWeight,
  pickTagline,
  typeScale,
} from "../../styles/tokens";
import { BrandLogo } from "./BrandLogo";

type Props = {
  episodeNumber?: string;
  channelName?: string;
  tagline?: string;
};

/**
 * TopBar — positioned inside the glass panel's top area.
 *
 * Layout: logo left, two-line text right, both vertically centered.
 * Padding is measured from the GLASS border (not the frame border),
 * so content sits comfortably inside the frosted panel.
 */
export const TopBar: React.FC<Props> = ({
  episodeNumber,
  channelName = channel.name,
  tagline,
}) => {
  const rightLabel = episodeNumber
    ? `${channel.episodePrefix} ${episodeNumber} / ${channelName}`
    : channelName;
  const subline = tagline ?? pickTagline(episodeNumber);

  // Glass panel: inset=28 from frame border, borderRadius=20.
  // TopBar sits INSIDE the glass, so padding = distance from glass inner edge.
  const innerPad = 24;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: `${innerPad}px ${innerPad}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
      }}
    >
      <BrandLogo size={36} variant="mark" glow />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: typeScale.episode.size,
            color: typeScale.episode.color,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {rightLabel}
        </span>
        <span
          style={{
            fontFamily: fonts.primary,
            fontSize: typeScale.small.size,
            fontWeight: fontWeight.body,
            color: colors.purple[200],
            letterSpacing: 0.5,
          }}
        >
          {subline}
        </span>
      </div>
    </div>
  );
};
