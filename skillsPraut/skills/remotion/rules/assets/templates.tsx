// ============================================================
// ShortTemplate.tsx
// ============================================================
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

// ============================================================
// CaseStudyTemplate.tsx
// ============================================================
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

// ============================================================
// ReviewTemplate.tsx
// ============================================================
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

// ============================================================
// NewsTemplate.tsx
// ============================================================
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

// ============================================================
// DeepDiveTemplate.tsx
// ============================================================
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

// ============================================================
// MythBustingTemplate.tsx
// ============================================================
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

// ============================================================
// ComparisonTemplate.tsx
// ============================================================
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

// ============================================================
// TutorialTemplate.tsx
// ============================================================
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

// ============================================================
// TopTenTemplate.tsx
// ============================================================
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

// ============================================================
// ExplainerTemplate.tsx
// ============================================================
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
