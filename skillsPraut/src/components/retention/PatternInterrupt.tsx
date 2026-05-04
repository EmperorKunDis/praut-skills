import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../styles/tokens";

type Props = {
  variant: "flash" | "shake" | "zoom-pulse";
  intensity?: "subtle" | "medium" | "strong";
  triggerFrame?: number;
  children: React.ReactNode;
};

export const PatternInterrupt: React.FC<Props> = ({
  variant,
  intensity = "medium",
  triggerFrame = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const relFrame = frame - triggerFrame;
  const dur = intensity === "subtle" ? 6 : intensity === "medium" ? 9 : 12;
  const active = relFrame >= 0 && relFrame < dur;
  const progress = active ? relFrame / dur : 0;

  let transform = "";
  let overlayOpacity = 0;

  if (active) {
    switch (variant) {
      case "flash":
        overlayOpacity = interpolate(progress, [0, 0.3, 1], [0, 0.15, 0]);
        break;
      case "shake":
        transform = `translateX(${
          Math.sin(progress * Math.PI * 6) *
          (intensity === "subtle" ? 4 : intensity === "medium" ? 8 : 12)
        }px)`;
        break;
      case "zoom-pulse": {
        const scale = 1 + interpolate(progress, [0, 0.4, 1], [0, 0.05, 0]);
        transform = `scale(${scale})`;
        break;
      }
    }
  }

  return (
    <AbsoluteFill style={{ transform }}>
      {children}
      {variant === "flash" && overlayOpacity > 0 && (
        <AbsoluteFill
          style={{
            background: colors.purple[50],
            opacity: overlayOpacity,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
