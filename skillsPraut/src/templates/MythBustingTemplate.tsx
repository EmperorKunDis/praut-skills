import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { MythVsFact } from "../components/lists/MythVsFact";
import { KeyTakeaway } from "../components/typography/KeyTakeaway";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Props = {
  episodeNumber: string;
  hook: string;
  myth: string;
  reality: string;
  evidence: React.ReactNode;
  conclusion: string;
};

export const MythBustingTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  myth,
  reality,
  evidence,
  conclusion,
}) => {
  const xition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: timing.medium })}
    />
  );
  return (
    <PrautVideoFrame episodeNumber={episodeNumber}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <HookCard hook={hook} />
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={150}>
          <SlideRoot>
            <MythVsFact myth={myth} fact={reality} />
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={180}>
          <SlideRoot>{evidence}</SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SlideRoot>
            <KeyTakeaway label="Závěr">{conclusion}</KeyTakeaway>
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={150}>
          <EndScreen />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </PrautVideoFrame>
  );
};
