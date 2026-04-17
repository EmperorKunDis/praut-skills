import React from "react";
import { Composition } from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadIBMPlexMono } from "@remotion/google-fonts/IBMPlexMono";

// Side-effect: registers all 6 Phosphor weight variants as web fonts
import "./components/icons/loadPhosphorFont";

// Praut demo compositions
import { BrandShowcase } from "./compositions/BrandShowcase";
import { FrameShowcase } from "./compositions/FrameShowcase";
import { TypographyShowcase } from "./compositions/TypographyShowcase";
import { IconShowcase } from "./compositions/IconShowcase";
import { ChapterIntro } from "./compositions/ChapterIntro";
import { BarChartDemo } from "./compositions/BarChartDemo";
import { NeuralNetDemo } from "./compositions/NeuralNetDemo";
import { RAGDemo } from "./compositions/RAGDemo";
import { TerminalDemo } from "./compositions/TerminalDemo";
import { TopTenDemo } from "./compositions/TopTenDemo";
import { CardsShowcase } from "./compositions/CardsShowcase";
import { CTAShowcase } from "./compositions/CTAShowcase";
import { BackgroundsShowcase } from "./compositions/BackgroundsShowcase";
import { EducationalShowcase } from "./compositions/EducationalShowcase";
import { IntroAnimationDemo } from "./compositions/IntroAnimationDemo";
import { ExplainerVideoDemo } from "./compositions/ExplainerVideoDemo";
import { ShortVideoDemo } from "./compositions/ShortVideoDemo";
import { EP01 } from "./compositions/EP01";

// Praut uses Montserrat (primary) + IBM Plex Mono (mono) per the brand book.
// `latin-ext` is mandatory for Czech diacritics (áčďěéíňóřšťúůýž).
loadMontserrat("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});
loadIBMPlexMono("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

const FPS = 30;
const W = 1920;
const H = 1080;

export const RemotionRoot: React.FC = () => (
  <>
    {/* Foundation */}
    <Composition
      id="BrandShowcase"
      component={BrandShowcase}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="FrameShowcase"
      component={FrameShowcase}
      durationInFrames={240}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="TypographyShowcase"
      component={TypographyShowcase}
      durationInFrames={420}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="IconShowcase"
      component={IconShowcase}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Chapter / Intro */}
    <Composition
      id="ChapterIntro"
      component={ChapterIntro}
      durationInFrames={150}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="IntroAnimation"
      component={IntroAnimationDemo}
      durationInFrames={150}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Charts & Data */}
    <Composition
      id="BarChartDemo"
      component={BarChartDemo}
      durationInFrames={180}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* AI specific */}
    <Composition
      id="NeuralNetDemo"
      component={NeuralNetDemo}
      durationInFrames={180}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="RAGDemo"
      component={RAGDemo}
      durationInFrames={210}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Code & terminal */}
    <Composition
      id="TerminalDemo"
      component={TerminalDemo}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Lists */}
    <Composition
      id="TopTenDemo"
      component={TopTenDemo}
      durationInFrames={210}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Cards & CTA */}
    <Composition
      id="CardsShowcase"
      component={CardsShowcase}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="CTAShowcase"
      component={CTAShowcase}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Backgrounds */}
    <Composition
      id="BackgroundsShowcase"
      component={BackgroundsShowcase}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Educational */}
    <Composition
      id="EducationalShowcase"
      component={EducationalShowcase}
      durationInFrames={300}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* Templates */}
    <Composition
      id="ExplainerVideo"
      component={ExplainerVideoDemo}
      durationInFrames={600}
      fps={FPS}
      width={W}
      height={H}
    />

    {/* 9:16 Short */}
    <Composition
      id="ShortVideo"
      component={ShortVideoDemo}
      durationInFrames={540}
      fps={FPS}
      width={1080}
      height={1920}
    />

    {/* EP01 — 10 Mýtů o AI */}
    <Composition
      id="EP01"
      component={EP01}
      durationInFrames={38160}
      fps={FPS}
      width={W}
      height={H}
    />
  </>
);
