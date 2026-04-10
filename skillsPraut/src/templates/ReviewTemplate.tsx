import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { ProsConsTable } from "../components/lists/ProsConsTable";
import { KeyTakeaway } from "../components/typography/KeyTakeaway";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Props = {
  episodeNumber: string;
  productName: string;
  hook: string;
  pros: string[];
  cons: string[];
  demo: React.ReactNode;
  verdict: string;
};

export const ReviewTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  pros,
  cons,
  demo,
  verdict,
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
            <ProsConsTable pros={pros} cons={cons} />
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={180}>
          <SlideRoot>{demo}</SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SlideRoot>
            <KeyTakeaway label="Verdikt">{verdict}</KeyTakeaway>
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
