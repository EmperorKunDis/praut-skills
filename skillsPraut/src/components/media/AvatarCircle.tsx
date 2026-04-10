import React from "react";
import { Img } from "remotion";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  src?: string;
  name?: string;
  size?: number;
  style?: React.CSSProperties;
};

/**
 * Circular avatar with brand-blue border. Falls back to a gradient
 * monogram if no image is supplied.
 */
export const AvatarCircle: React.FC<Props> = ({
  src,
  name,
  size = 96,
  style,
}) => {
  const initial = name?.charAt(0).toUpperCase() ?? "?";
  return src ? (
    <Img
      src={src}
      alt={name ?? "avatar"}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid ${colors.blue[400]}`,
        ...style,
      }}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: gradients.brandPrimary,
        border: `2px solid ${colors.blue[400]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: size * 0.4,
        color: colors.purple[50],
        ...style,
      }}
    >
      {initial}
    </div>
  );
};
