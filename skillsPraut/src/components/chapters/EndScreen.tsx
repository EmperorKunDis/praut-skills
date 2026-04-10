import React from "react";
import { AbsoluteFill } from "remotion";
import { fonts, fontWeight, gradients } from "../../styles/tokens";
import { SubscribeButton } from "../cta/SubscribeButton";
import { NextVideoCard } from "../cta/NextVideoCard";
import { LikeAnimation } from "../cta/LikeAnimation";

type Props = {
  thanks?: string;
  /** Render an empty next-video frame placeholder. Defaults to true. */
  showNextFrame?: boolean;
};

/**
 * Standard outro slate — "Díky za sledování", subscribe button, animated like
 * and an empty next-video frame placeholder. The next-video card has no
 * content inside — title/thumbnail are added in YouTube editor.
 */
export const EndScreen: React.FC<Props> = ({
  thanks = "Díky za sledování",
  showNextFrame = true,
}) => (
  <AbsoluteFill
    style={{
      background: "transparent",
      padding: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
    }}
  >
    <h1
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 72,
        background: gradients.logoText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
        textAlign: "center",
      }}
    >
      {thanks}
    </h1>
    <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
      <SubscribeButton label="Odebírat" />
      <LikeAnimation size={80} />
    </div>
    {showNextFrame ? <NextVideoCard /> : null}
  </AbsoluteFill>
);
