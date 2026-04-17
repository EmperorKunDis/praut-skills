import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";

type Props = {
  conventional: string;
  contrarian: string;
  style?: React.CSSProperties;
};

export const ContrarianHook: React.FC<Props> = ({
  conventional,
  contrarian,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strikeProgress = spring({
    frame: frame - 30,
    fps,
    config: springs.snappy,
  });
  const contrarianIn = spring({
    frame: frame - 50,
    fps,
    config: springs.bouncy,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 36,
          color: colors.purple[200],
        }}
      >
        {conventional}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 3,
            background: colors.semantic.error,
            transform: `scaleX(${strikeProgress})`,
            transformOrigin: "left",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 48,
          color: colors.semantic.success,
          opacity: contrarianIn,
          transform: `translateX(${(1 - contrarianIn) * 40}px)`,
        }}
      >
        {contrarian}
      </div>
    </div>
  );
};
