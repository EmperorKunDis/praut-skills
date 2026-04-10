import { useVideoConfig } from "remotion";
import { frame } from "../styles/tokens";

/**
 * Returns the CSS `transform: scale(...)` factor needed to fit the brand
 * 1920×1080 reference frame inside the current Remotion composition's actual
 * dimensions while preserving aspect ratio (`min` of x/y).
 *
 * Use it on a 1920×1080 inner container so authors can write layouts at
 * brand-native resolution and still render to e.g. 1280×720 or 4K.
 */
export const useScaleToFit = (
  referenceWidth: number = frame.width,
  referenceHeight: number = frame.height,
) => {
  const { width, height } = useVideoConfig();
  const scaleX = width / referenceWidth;
  const scaleY = height / referenceHeight;
  return Math.min(scaleX, scaleY);
};
