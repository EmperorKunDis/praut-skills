import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { ComparisonCard } from "../components/cards/ComparisonCard";
import { KeyTakeaway } from "../components/typography/KeyTakeaway";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Props = {
  episodeNumber: string;
  hook: string;
  leftName: string;
  rightName: string;
  leftSummary: React.ReactNode;
  rightSummary: React.ReactNode;
  sideBySide: React.ReactNode;
  recommendation: string;
};

export const ComparisonTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  leftName,
  rightName,
  leftSummary,
  rightSummary,
  sideBySide,
  recommendation,
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
            <ComparisonCard
              leftTitle={leftName}
              leftContent={leftSummary}
              rightTitle={rightName}
              rightContent={rightSummary}
            />
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={180}>
          <SlideRoot>{sideBySide}</SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SlideRoot>
            <KeyTakeaway label="Doporučení">{recommendation}</KeyTakeaway>
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
