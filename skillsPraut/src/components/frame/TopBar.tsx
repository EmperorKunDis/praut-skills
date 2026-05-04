import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  channel,
  colors,
  fonts,
  fontWeight,
  frame as frameTokens,
  springs,
  typeScale,
} from "../../styles/tokens";
import { BrandLogo } from "./BrandLogo";

type Props = {
  episodeNumber?: string;
  /** Name of the episode (e.g. "10 Mýtů o AI"). Shown next to episode number. */
  episodeName?: string;
  /** Current chapter / myth label shown on the second line. */
  chapterLabel?: string;
};

/**
 * TopBar — positioned inside the glass panel's top area.
 * Logo slides in from left, episode text slides in from right.
 */
export const TopBar: React.FC<Props> = ({
  episodeNumber,
  episodeName,
  chapterLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: springs.snappy });
  const textIn = spring({ frame: frame - 8, fps, config: springs.snappy });

  // Exit — logo slides back left, text slides back right in last 12 frames
  const exitStart = durationInFrames - 12;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const rightLabel = episodeNumber
    ? `${channel.episodePrefix} ${episodeNumber}${episodeName ? ` / ${episodeName}` : ""}`
    : (episodeName ?? "");
  const subline = chapterLabel ?? "";

  const innerPad = frameTokens.sidePadding + 10;

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
      <div
        style={{
          opacity: logoIn * (1 - exitProgress),
          transform: `translateX(${(1 - logoIn) * -20 + exitProgress * -20}px)`,
        }}
      >
        <BrandLogo size={36} variant="mark" glow />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          opacity: textIn * (1 - exitProgress),
          transform: `translateX(${(1 - textIn) * 20 + exitProgress * 20}px)`,
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
