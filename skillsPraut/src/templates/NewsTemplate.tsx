import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { DisplayHeading } from "../components/typography/DisplayHeading";
import { BodyText } from "../components/typography/BodyText";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Props = {
  episodeNumber: string;
  headline: string;
  context: string;
  details: React.ReactNode;
  impact: string;
  opinion: string;
};

/** Headline → Context → Details → Impact → Opinion → Outro. Fade-transitioned. */
export const NewsTemplate: React.FC<Props> = ({
  episodeNumber,
  headline,
  context,
  details,
  impact,
  opinion,
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
          <HookCard hook={headline} />
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SlideRoot>
            <DisplayHeading>Kontext</DisplayHeading>
            <BodyText style={{ marginTop: 24, fontSize: 24 }}>
              {context}
            </BodyText>
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={180}>
          <SlideRoot>{details}</SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SlideRoot>
            <DisplayHeading>Dopad</DisplayHeading>
            <BodyText style={{ marginTop: 24, fontSize: 24 }}>
              {impact}
            </BodyText>
          </SlideRoot>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SlideRoot>
            <DisplayHeading gradient>Můj názor</DisplayHeading>
            <BodyText style={{ marginTop: 24, fontSize: 24 }}>
              {opinion}
            </BodyText>
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
