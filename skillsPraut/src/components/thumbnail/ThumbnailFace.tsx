import React from "react";
import { Img, staticFile } from "remotion";

type Emotion = "shock" | "joy" | "concern" | "curiosity";

const emotionGlow: Record<Emotion, string> = {
  shock: "0 0 30px rgba(248,113,113,0.6), 0 8px 40px rgba(248,113,113,0.3)",
  joy: "0 0 30px rgba(251,191,36,0.6), 0 8px 40px rgba(251,191,36,0.3)",
  concern: "0 0 30px rgba(141,42,243,0.6), 0 8px 40px rgba(141,42,243,0.3)",
  curiosity: "0 0 30px rgba(80,111,251,0.6), 0 8px 40px rgba(80,111,251,0.3)",
};

type Props = {
  src: string;
  emotion?: Emotion;
  scale?: number;
  style?: React.CSSProperties;
};

export const ThumbnailFace: React.FC<Props> = ({
  src,
  emotion = "curiosity",
  scale = 1,
  style,
}) => (
  <div style={{ filter: `drop-shadow(${emotionGlow[emotion]})`, ...style }}>
    <Img
      src={src.startsWith("http") ? src : staticFile(src)}
      style={{ height: 500 * scale, width: "auto", objectFit: "contain" }}
    />
  </div>
);
