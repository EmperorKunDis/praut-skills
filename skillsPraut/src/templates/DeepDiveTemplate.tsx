import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { ChapterCard } from "../components/chapters/ChapterCard";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Chapter = {
  number: string;
  title: string;
  body: React.ReactNode;
};

type Props = {
  episodeNumber: string;
  hook: string;
  chapters: Chapter[]; // recommended ~5
};

/** Hook → 5 chapters (intro + body each) → Outro. Fade-transitioned. */
export const DeepDiveTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  chapters,
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
        {chapters.flatMap((chap, i) => [
          <TransitionSeries.Transition
            key={`x-intro-${i}`}
            presentation={fade()}
            timing={linearTiming({ durationInFrames: timing.medium })}
          />,
          <TransitionSeries.Sequence key={`intro-${i}`} durationInFrames={90}>
            <ChapterCard number={chap.number} title={chap.title} />
          </TransitionSeries.Sequence>,
          <TransitionSeries.Transition
            key={`x-body-${i}`}
            presentation={fade()}
            timing={linearTiming({ durationInFrames: timing.medium })}
          />,
          <TransitionSeries.Sequence key={`body-${i}`} durationInFrames={240}>
            <SlideRoot>{chap.body}</SlideRoot>
          </TransitionSeries.Sequence>,
        ])}
        {xition}
        <TransitionSeries.Sequence durationInFrames={150}>
          <EndScreen />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </PrautVideoFrame>
  );
};
