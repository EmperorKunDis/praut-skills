import React from "react";
import { OffthreadVideo } from "remotion";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  src: string;
  startFrom?: number;
  endAt?: number;
  width?: number | string;
  style?: React.CSSProperties;
};

/**
 * Embedded video with branded frame.
 */
export const VideoEmbed: React.FC<Props> = ({
  src,
  startFrom,
  endAt,
  width = "100%",
  style,
}) => (
  <div
    style={{
      width,
      borderRadius: frame.borderRadius * 3,
      overflow: "hidden",
      border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
      boxShadow: glow.active,
      ...style,
    }}
  >
    <OffthreadVideo src={src} startFrom={startFrom} endAt={endAt} />
  </div>
);
