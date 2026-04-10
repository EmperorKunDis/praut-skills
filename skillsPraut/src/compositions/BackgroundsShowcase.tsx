import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { DisplayHeading } from "../components/typography/DisplayHeading";
import { GradientText } from "../components/typography/GradientText";

/**
 * BackgroundsShowcase — full-frame demo of the SpaceNebula. The nebula is
 * rendered automatically by `<PrautVideoFrame>`, so this composition just
 * adds a centered title overlay so you can verify the loop seam visually.
 */
export const BackgroundsShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00">
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <DisplayHeading gradient>SpaceNebula</DisplayHeading>
      <GradientText style={{ fontSize: 28 }}>
        Nekonečně se opakující průlet vesmírnou mlhovinou
      </GradientText>
    </AbsoluteFill>
  </PrautVideoFrame>
);
