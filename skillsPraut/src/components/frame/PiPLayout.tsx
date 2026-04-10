import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  webcamSrc: React.ReactNode;
  screenSrc: React.ReactNode;
  /** Webcam width as a fraction of full width. Defaults to 0.18. */
  webcamRatio?: number;
};

/**
 * Picture-in-picture layout: full-bleed screen content with a webcam
 * thumbnail in the bottom-left corner.
 */
export const PiPLayout: React.FC<Props> = ({
  webcamSrc,
  screenSrc,
  webcamRatio = 0.18,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {screenSrc}
      </div>
      <div
        style={{
          position: "absolute",
          left: frame.sidePadding * 4,
          bottom: frame.sidePadding * 4,
          width: `${webcamRatio * 100}%`,
          aspectRatio: "16 / 9",
          border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
          borderRadius: frame.borderRadius * 2,
          overflow: "hidden",
          boxShadow: glow.active,
        }}
      >
        {webcamSrc}
      </div>
    </div>
  );
};
