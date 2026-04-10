import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { ExplainerSlide } from "../components/frame/ExplainerSlide";
import { HookCard } from "../components/chapters/HookCard";
import { DefinitionBox } from "../components/educational/DefinitionBox";
import { KeyTakeaway } from "../components/typography/KeyTakeaway";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Props = {
  episodeNumber: string;
  episodeTitle?: string;
  hook: string;
  term: string;
  definition: string;
  example: React.ReactNode;
  takeaway: string;
  /** Kept for back-compat — next video card is now always an empty frame. */
  nextVideoTitle?: string;
};

/**
 * Explainer template — fade-transitioned timeline:
 *   Hook → Example + Definition (top/bottom) → Example + Takeaway → Outro.
 *
 * Uses `<ExplainerSlide>` for the two main teaching slides so the visual
 * being explained sits on top, the explanation text sits at the bottom, and
 * a webcam placeholder is reserved bottom-right.
 */
export const ExplainerTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  term,
  definition,
  example,
  takeaway,
}) => (
  <PrautVideoFrame episodeNumber={episodeNumber}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <HookCard hook={hook} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: timing.medium })}
      />

      <TransitionSeries.Sequence durationInFrames={150}>
        <ExplainerSlide
          topContent={example}
          bottomText={<DefinitionBox term={term} definition={definition} />}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: timing.medium })}
      />

      <TransitionSeries.Sequence durationInFrames={150}>
        <ExplainerSlide
          topContent={example}
          bottomText={<KeyTakeaway>{takeaway}</KeyTakeaway>}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: timing.medium })}
      />

      <TransitionSeries.Sequence durationInFrames={150}>
        <EndScreen />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </PrautVideoFrame>
);
