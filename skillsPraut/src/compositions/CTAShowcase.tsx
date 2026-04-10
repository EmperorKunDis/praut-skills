import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SubscribeButton } from "../components/cta/SubscribeButton";
import { LikeAnimation } from "../components/cta/LikeAnimation";
import { BellNotification } from "../components/cta/BellNotification";
import { NextVideoCard } from "../components/cta/NextVideoCard";
import { NewsletterCTA } from "../components/cta/NewsletterCTA";

export const CTAShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00" episodeTitle="Call to Action">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 48,
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
        <SubscribeButton label="Odebírat Praut" />
        <LikeAnimation />
        <BellNotification badgeCount={3} />
      </div>
      <NewsletterCTA />
      <NextVideoCard />
    </AbsoluteFill>
  </PrautVideoFrame>
);
