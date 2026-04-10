import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";
import { WebcamPlaceholder } from "./WebcamPlaceholder";

type Props = {
  /** Visual material being explained — sits in the top 60% of the slide. */
  topContent: React.ReactNode;
  /** Explanation text — sits in the bottom 40%, padded for readability. */
  bottomText: React.ReactNode;
  /** Render the webcam placeholder bottom-right. Defaults to true. */
  includeWebcam?: boolean;
  /** Ratio of vertical space allocated to top content. Defaults to 0.6. */
  topRatio?: number;
};

/**
 * Standard explainer slide layout used by every Praut tutorial / explainer:
 *
 * - **Top section** (default 60% height): the visual material being explained
 *   — chart, code, neural network, image, etc. Centered.
 * - **Bottom section** (default 40% height): explanation text. Padded so it
 *   never collides with the webcam slot.
 * - **Webcam placeholder** (default on): empty 280×160 bordered box anchored
 *   bottom-right where Martin's talking head will be composited in YouTube.
 *
 * Place inside `<PrautVideoFrame>` so the SpaceNebula background and TopBar
 * are present.
 */
export const ExplainerSlide: React.FC<Props> = ({
  topContent,
  bottomText,
  includeWebcam = true,
  topRatio = 0.6,
}) => {
  const topHeight = `${topRatio * 100}%`;
  const bottomHeight = `${(1 - topRatio) * 100}%`;
  const webcamWidth = 280;
  const webcamRightInset = 48;

  return (
    <AbsoluteFill style={{ paddingTop: frame.topBarHeight }}>
      <div
        style={{
          position: "absolute",
          top: frame.topBarHeight,
          left: 0,
          right: 0,
          height: topHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
        }}
      >
        {topContent}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: bottomHeight,
          padding: "32px 80px 80px 80px",
          // Reserve right gutter so text never overlaps webcam slot.
          paddingRight: includeWebcam
            ? webcamWidth + webcamRightInset + 64
            : 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {bottomText}
      </div>
      {includeWebcam ? <WebcamPlaceholder /> : null}
    </AbsoluteFill>
  );
};
