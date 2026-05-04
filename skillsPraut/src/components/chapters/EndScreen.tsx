import React from "react";
import { AbsoluteFill } from "remotion";
import { fonts, fontWeight, gradients, springs } from "../../styles/tokens";
import { SubscribeButton } from "../cta/SubscribeButton";
import { NextVideoCard } from "../cta/NextVideoCard";
import { LikeAnimation } from "../cta/LikeAnimation";
import { useEnterExit } from "../../hooks/useEnterExit";

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
}) => {
  const pHeading = useEnterExit({ delay: 0, enterConfig: springs.bouncy });
  const pCta = useEnterExit({ delay: 12 });
  const pNext = useEnterExit({ delay: 24 });

  return (
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
          opacity: pHeading,
          transform: `scale(${0.7 + pHeading * 0.3})`,
        }}
      >
        {thanks}
      </h1>
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "center",
          opacity: pCta,
          transform: `translateY(${(1 - pCta) * 20}px)`,
        }}
      >
        <SubscribeButton label="Odebírat" />
        <LikeAnimation size={80} />
      </div>
      {showNextFrame ? (
        <div style={{ opacity: pNext }}>
          <NextVideoCard />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
