import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors, fonts, springs } from "../../styles/tokens";

type Props = {
  hardView: React.ReactNode;
  easyView: React.ReactNode;
  hardLabel?: string;
  easyLabel?: string;
  shiftFrame: number;
  style?: React.CSSProperties;
};

export const PerspectiveShift: React.FC<Props> = ({
  hardView,
  easyView,
  hardLabel = "Jak to vypadá",
  easyLabel = "Jak to funguje",
  shiftFrame,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isAfterShift = frame >= shiftFrame;
  const shiftProgress = isAfterShift
    ? spring({ frame: frame - shiftFrame, fps, config: springs.snappy })
    : 0;
  const rotateY = interpolate(shiftProgress, [0, 1], [0, 180]);
  const showEasy = rotateY > 90;

  return (
    <AbsoluteFill style={{ perspective: 1200, ...style }}>
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 32,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[300],
          letterSpacing: 2,
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        {showEasy ? easyLabel : hardLabel}
      </div>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotateY(${rotateY}deg)`,
          backfaceVisibility: "hidden",
        }}
      >
        {!showEasy && hardView}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotateY(${rotateY - 180}deg)`,
          backfaceVisibility: "hidden",
        }}
      >
        {showEasy && easyView}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
