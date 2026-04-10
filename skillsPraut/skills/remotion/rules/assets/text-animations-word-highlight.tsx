// Praut-branded reference: word highlight animation.
// Mirrors src/components/typography/HighlightedText.tsx in a self-contained
// snippet for the skill rule.

import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  frame as frameTokens,
  glow,
} from "../../../../src/styles/tokens";

const FULL_TEXT = "Tohle je Praut.";
const HIGHLIGHT_WORD = "Praut";
const FONT_SIZE = 96;
const HIGHLIGHT_START_FRAME = 30;
const HIGHLIGHT_WIPE_DURATION = 18;

const Highlight: React.FC<{
  word: string;
  delay: number;
  durationInFrames: number;
}> = ({ word, delay, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const highlightProgress = spring({
    fps,
    frame,
    config: { damping: 200 },
    delay,
    durationInFrames,
  });
  const scaleX = Math.max(0, Math.min(1, highlightProgress));

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "1.05em",
          transform: `translateY(-50%) scaleX(${scaleX})`,
          transformOrigin: "left center",
          backgroundColor: colors.purple[600],
          borderRadius: 6,
          boxShadow: glow.subtle,
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{word}</span>
    </span>
  );
};

export const MyAnimation = () => {
  const highlightIndex = FULL_TEXT.indexOf(HIGHLIGHT_WORD);
  const hasHighlight = highlightIndex >= 0;
  const preText = hasHighlight ? FULL_TEXT.slice(0, highlightIndex) : FULL_TEXT;
  const postText = hasHighlight
    ? FULL_TEXT.slice(highlightIndex + HIGHLIGHT_WORD.length)
    : "";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: frameTokens.bg,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
      }}
    >
      <div
        style={{
          color: colors.purple[50],
          fontSize: FONT_SIZE,
          fontWeight: fontWeight.display,
        }}
      >
        {hasHighlight ? (
          <>
            <span>{preText}</span>
            <Highlight
              word={HIGHLIGHT_WORD}
              delay={HIGHLIGHT_START_FRAME}
              durationInFrames={HIGHLIGHT_WIPE_DURATION}
            />
            <span>{postText}</span>
          </>
        ) : (
          <span>{FULL_TEXT}</span>
        )}
      </div>
    </AbsoluteFill>
  );
};
