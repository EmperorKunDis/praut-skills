import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, gradients } from "../../styles/tokens";

type Props = {
  variant?: "navy" | "gradient" | "custom";
  customGradient?: string;
  /** Optional blurred background image. */
  blurSrc?: string;
  blurAmount?: number;
  children?: React.ReactNode;
};

export const ThumbnailBackground: React.FC<Props> = ({
  variant = "gradient",
  customGradient,
  blurSrc,
  blurAmount = 20,
  children,
}) => {
  const bg =
    variant === "navy"
      ? colors.navy[950]
      : variant === "gradient"
        ? gradients.dark
        : (customGradient ?? gradients.dark);

  return (
    <AbsoluteFill style={{ background: bg }}>
      {blurSrc && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${blurSrc})`,
            backgroundSize: "cover",
            filter: `blur(${blurAmount}px)`,
            opacity: 0.4,
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};
