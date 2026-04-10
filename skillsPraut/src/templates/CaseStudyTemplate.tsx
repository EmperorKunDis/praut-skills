import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { ChapterCard } from "../components/chapters/ChapterCard";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Props = {
  episodeNumber: string;
  hook: string;
  problem: React.ReactNode;
  solution: React.ReactNode;
  implementation: React.ReactNode;
  results: React.ReactNode;
};

/** Problem → Solution → Implementation → Results. */
export const CaseStudyTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  problem,
  solution,
  implementation,
  results,
}) => {
  const xition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: timing.medium })}
    />
  );
  const phase = (number: string, title: string, body: React.ReactNode) => [
    <TransitionSeries.Sequence key={`intro-${number}`} durationInFrames={60}>
      <ChapterCard number={number} title={title} />
    </TransitionSeries.Sequence>,
    <TransitionSeries.Transition
      key={`x-body-${number}`}
      presentation={fade()}
      timing={linearTiming({ durationInFrames: timing.medium })}
    />,
    <TransitionSeries.Sequence key={`body-${number}`} durationInFrames={150}>
      <SlideRoot>{body}</SlideRoot>
    </TransitionSeries.Sequence>,
  ];
  return (
    <PrautVideoFrame episodeNumber={episodeNumber}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <HookCard hook={hook} />
        </TransitionSeries.Sequence>
        {xition}
        {phase("01", "Problém", problem)}
        {xition}
        {phase("02", "Řešení", solution)}
        {xition}
        {phase("03", "Implementace", implementation)}
        {xition}
        {phase("04", "Výsledky", results)}
        {xition}
        <TransitionSeries.Sequence durationInFrames={150}>
          <EndScreen />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </PrautVideoFrame>
  );
};
