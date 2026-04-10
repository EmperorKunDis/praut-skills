import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";
import { useScaleToFit } from "../../hooks/useScaleToFit";

type Props = {
  children: React.ReactNode;
  /** Reference width (defaults to brand 1920). */
  referenceWidth?: number;
  /** Reference height (defaults to brand 1080). */
  referenceHeight?: number;
};

/**
 * Renders children inside a fixed reference frame (defaults to 1920×1080)
 * and scales the whole thing to fit the actual composition dimensions.
 *
 * Use this so authors can compose at native brand resolution and still
 * render to arbitrary sizes (1280×720, 4K, etc.) without layout breakage.
 */
export const SafeArea: React.FC<Props> = ({
  children,
  referenceWidth = frame.width,
  referenceHeight = frame.height,
}) => {
  const scale = useScaleToFit(referenceWidth, referenceHeight);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: frame.bg,
      }}
    >
      <div
        style={{
          width: referenceWidth,
          height: referenceHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
