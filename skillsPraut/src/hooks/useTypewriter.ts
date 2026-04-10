import { useCurrentFrame, useVideoConfig } from "remotion";

type Options = {
  fullText: string;
  /** Substring after which the animation pauses for `pauseSeconds`. */
  pauseAfter?: string;
  /** Frames spent typing each character. Defaults to 2. */
  charFrames?: number;
  /** Pause length in seconds at the `pauseAfter` boundary. */
  pauseSeconds?: number;
};

/**
 * Returns the substring of `fullText` that should be visible at the current
 * frame, simulating a typewriter that pauses after `pauseAfter` for
 * `pauseSeconds`.
 */
export const useTypewriter = ({
  fullText,
  pauseAfter,
  charFrames = 2,
  pauseSeconds = 0,
}: Options): string => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pauseFrames = Math.round(fps * pauseSeconds);
  const pauseIndex = pauseAfter ? fullText.indexOf(pauseAfter) : -1;
  const preLen =
    pauseIndex >= 0 && pauseAfter
      ? pauseIndex + pauseAfter.length
      : fullText.length;

  let typedChars = 0;
  if (frame < preLen * charFrames) {
    typedChars = Math.floor(frame / charFrames);
  } else if (frame < preLen * charFrames + pauseFrames) {
    typedChars = preLen;
  } else {
    const postPhase = frame - preLen * charFrames - pauseFrames;
    typedChars = Math.min(
      fullText.length,
      preLen + Math.floor(postPhase / charFrames),
    );
  }
  return fullText.slice(0, Math.max(0, typedChars));
};
