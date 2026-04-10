import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  fontSize?: number;
  intensity?: number;
  style?: React.CSSProperties;
};

/**
 * Glitch effect — RGB split with red, brand blue and brand purple offsets.
 * Intensity is in pixels of channel offset; oscillates over time.
 */
export const GlitchText: React.FC<Props> = ({
  children,
  fontSize = 96,
  intensity = 4,
  style,
}) => {
  const frame = useCurrentFrame();
  const offset = interpolate(
    Math.sin(frame * 0.6),
    [-1, 1],
    [-intensity, intensity],
  );

  const baseStyle: React.CSSProperties = {
    fontFamily: fonts.primary,
    fontWeight: fontWeight.display,
    fontSize,
    lineHeight: 1,
    position: "absolute",
    top: 0,
    left: 0,
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "fit-content",
        ...style,
      }}
    >
      <span
        style={{
          ...baseStyle,
          color: "#F87171", // red channel
          transform: `translate(${offset}px, ${offset / 2}px)`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...baseStyle,
          color: colors.blue[400],
          transform: `translate(${-offset}px, ${-offset / 2}px)`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...baseStyle,
          color: colors.purple[600],
          transform: `translate(${offset / 2}px, ${-offset}px)`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...baseStyle,
          position: "relative",
          color: colors.purple[50],
          opacity: interpolate(frame, [0, timing.fast], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {children}
      </span>
    </div>
  );
};
