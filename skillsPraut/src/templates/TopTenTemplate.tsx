import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { HookCard } from "../components/chapters/HookCard";
import { TopTenReveal } from "../components/lists/TopTenReveal";
import { EndScreen } from "../components/chapters/EndScreen";
import { timing } from "../styles/tokens";

type Item = {
  title: string;
  description?: string;
};

type Props = {
  episodeNumber: string;
  hook: string;
  items: Item[]; // 10 items, index 0 = #10, index 9 = #1
};

export const TopTenTemplate: React.FC<Props> = ({
  episodeNumber,
  hook,
  items,
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
      <TransitionSeries.Sequence durationInFrames={items.length * 45}>
        <SlideRoot>
          <TopTenReveal items={items} revealFrames={45} />
        </SlideRoot>
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
