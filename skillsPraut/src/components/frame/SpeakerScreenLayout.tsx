import React from "react";

type Props = {
  speaker: React.ReactNode;
  screen: React.ReactNode;
  focus?: "speaker" | "screen";
  gap?: number;
};

/**
 * Speaker + screen split. When `focus="speaker"` the speaker takes ~66%,
 * when `focus="screen"` the screen takes ~66%. Defaults to screen-focused.
 */
export const SpeakerScreenLayout: React.FC<Props> = ({
  speaker,
  screen,
  focus = "screen",
  gap = 48,
}) => {
  const speakerFlex = focus === "speaker" ? 0.66 : 0.34;
  const screenFlex = 1 - speakerFlex;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap,
        alignItems: "stretch",
      }}
    >
      <div style={{ flex: speakerFlex, display: "flex", alignItems: "center" }}>
        {speaker}
      </div>
      <div style={{ flex: screenFlex, display: "flex", alignItems: "center" }}>
        {screen}
      </div>
    </div>
  );
};
