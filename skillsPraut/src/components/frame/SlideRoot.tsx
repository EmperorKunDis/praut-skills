import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, frame } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  padding?: number;
  background?: string;
};

/**
 * Standard slide background for content sections inside PrautVideoFrame.
 * Defaults: navy[900] background, generous padding accounting for top bar.
 */
export const SlideRoot: React.FC<Props> = ({
  children,
  padding = 80,
  background = colors.navy[900],
}) => {
  return (
    <AbsoluteFill
      style={{
        background,
        padding,
        paddingTop: padding + frame.topBarHeight,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
