import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  hook: string;
};

/**
 * First 3 seconds of a video — oversized hook text on top of the SpaceNebula
 * background (provided by PrautVideoFrame), with a subtle brand-wide gradient
 * overlay for extra punch.
 */
export const HookCard: React.FC<Props> = ({ hook }) => (
  <AbsoluteFill
    style={{
      background: "transparent",
      padding: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradients.brandWide,
        opacity: 0.2,
      }}
    />
    <h1
      style={{
        position: "relative",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 110,
        color: colors.purple[50],
        margin: 0,
        textAlign: "center",
        lineHeight: 1.05,
        maxWidth: 1500,
      }}
    >
      {hook}
    </h1>
  </AbsoluteFill>
);
