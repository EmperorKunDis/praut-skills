// Praut-branded reference: typewriter text effect.
// Mirrors src/components/typography/TypewriterText.tsx in a self-contained
// snippet for the skill rule.

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  frame as frameTokens,
} from "../../../../src/styles/tokens";

const FULL_TEXT = "Praut s.r.o. — od promptu k motion graphics.";
const PAUSE_AFTER = "Praut s.r.o.";
const FONT_SIZE = 72;
const CHAR_FRAMES = 2;
const CURSOR_BLINK_FRAMES = 16;
const PAUSE_SECONDS = 1;

// Ideal composition size: 1920×1080

const getTypedText = ({
  frame,
  fullText,
  pauseAfter,
  charFrames,
  pauseFrames,
}: {
  frame: number;
  fullText: string;
  pauseAfter: string;
  charFrames: number;
  pauseFrames: number;
}): string => {
  const pauseIndex = fullText.indexOf(pauseAfter);
  const preLen =
    pauseIndex >= 0 ? pauseIndex + pauseAfter.length : fullText.length;

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
  return fullText.slice(0, typedChars);
};

const Cursor: React.FC<{ frame: number; blinkFrames: number }> = ({
  frame,
  blinkFrames,
}) => {
  const opacity = interpolate(
    frame % blinkFrames,
    [0, blinkFrames / 2, blinkFrames],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <span
      style={{
        display: "inline-block",
        width: "0.55em",
        height: "0.95em",
        background: colors.blue[400],
        marginLeft: 4,
        verticalAlign: "middle",
        opacity,
      }}
    />
  );
};

export const MyAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pauseFrames = Math.round(fps * PAUSE_SECONDS);

  const typedText = getTypedText({
    frame,
    fullText: FULL_TEXT,
    pauseAfter: PAUSE_AFTER,
    charFrames: CHAR_FRAMES,
    pauseFrames,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: frameTokens.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          color: colors.purple[50],
          fontSize: FONT_SIZE,
          fontWeight: fontWeight.display,
          fontFamily: fonts.primary,
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.15,
        }}
      >
        <span>{typedText}</span>
        <Cursor frame={frame} blinkFrames={CURSOR_BLINK_FRAMES} />
      </div>
    </AbsoluteFill>
  );
};
