import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { PrautShortFrame } from "../components/frame/PrautShortFrame";
import { HookCard } from "../components/chapters/HookCard";
import { KeyTakeaway } from "../components/typography/KeyTakeaway";
import { SubscribeButton } from "../components/cta/SubscribeButton";
import { timing } from "../styles/tokens";

type Props = {
  hook: string;
  punchline: string;
  cta?: string;
};

/**
 * 9:16 Shorts template (60s) — Hook → Punchline → CTA. Slide-transitioned.
 */
export const ShortTemplate: React.FC<Props> = ({
  hook,
  punchline,
  cta = "Sleduj Praut AI",
}) => {
  const xition = (
    <TransitionSeries.Transition
      presentation={slide()}
      timing={linearTiming({ durationInFrames: timing.medium })}
    />
  );
  return (
    <PrautShortFrame>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <HookCard hook={hook} />
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={300}>
          <AbsoluteFill
            style={{
              background: "transparent",
              padding: 64,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeyTakeaway>{punchline}</KeyTakeaway>
          </AbsoluteFill>
        </TransitionSeries.Sequence>
        {xition}
        <TransitionSeries.Sequence durationInFrames={150}>
          <AbsoluteFill
            style={{
              background: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SubscribeButton label={cta} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </PrautShortFrame>
  );
};
