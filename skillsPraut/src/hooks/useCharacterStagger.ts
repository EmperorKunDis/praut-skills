import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs } from "../styles/tokens";

type CharStaggerConfig = {
  text: string;
  staggerFrames?: number;
  startFrame?: number;
  direction?: "ltr" | "rtl" | "center-out";
  config?: { damping: number; stiffness: number; mass: number };
};

export const useCharacterStagger = (opts: CharStaggerConfig) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    text,
    staggerFrames = 2,
    startFrame = 0,
    direction = "ltr",
    config = springs.snappy,
  } = opts;
  const len = text.length;

  return (charIndex: number): number => {
    let idx: number;
    switch (direction) {
      case "rtl":
        idx = len - 1 - charIndex;
        break;
      case "center-out":
        idx = Math.abs(charIndex - Math.floor(len / 2));
        break;
      default:
        idx = charIndex;
    }
    return spring({
      frame: frame - startFrame - idx * staggerFrames,
      fps,
      config,
    });
  };
};
