import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { StepByStep } from "../components/lists/StepByStep";
import { EndScreen } from "../components/chapters/EndScreen";
import { DisplayHeading } from "../components/typography/DisplayHeading";
import { timing } from "../styles/tokens";

type Step = {
  title: string;
  description?: string;
  icon?: string;
};

type Props = {
  episodeNumber: string;
  episodeTitle: string;
  hook: string;
  steps: Step[];
  nextVideoTitle?: string;
};

/** Hook → Heading → Steps → Outro. Fade-transitioned. */
export const TutorialTemplate: React.FC<Props> = ({
  episodeNumber,
  episodeTitle,
  hook,
  steps,
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
        <TransitionSeries.Sequence durationInFrames={60}>
          <SlideRoot>
            <DisplayHeading gradient>{episodeTitle}</DisplayHeading>
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={steps.length * 60}>
          <SlideRoot>
            <StepByStep steps={steps} />
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
