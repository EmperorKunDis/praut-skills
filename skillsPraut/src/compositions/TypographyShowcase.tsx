import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { DisplayHeading } from "../components/typography/DisplayHeading";
import { H1 } from "../components/typography/H1";
import { H2 } from "../components/typography/H2";
import { H3 } from "../components/typography/H3";
import { BodyText } from "../components/typography/BodyText";
import { MonoLabel } from "../components/typography/MonoLabel";
import { GradientText } from "../components/typography/GradientText";
import { TypewriterText } from "../components/typography/TypewriterText";
import { WordReveal } from "../components/typography/WordReveal";
import { CountUpNumber } from "../components/typography/CountUpNumber";

export const TypographyShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00" episodeTitle="Typografie & text animace">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <MonoLabel>Display</MonoLabel>
      <DisplayHeading gradient>Martin Švanda</DisplayHeading>
      <MonoLabel>Headings</MonoLabel>
      <H1>H1 — hlavní nadpis</H1>
      <H2>H2 — podnadpis</H2>
      <H3>H3 — sekce</H3>
      <MonoLabel>Body</MonoLabel>
      <BodyText>
        Body text 18px Montserrat 500 — minimum weight pro dark mode.
      </BodyText>
      <MonoLabel>Animace</MonoLabel>
      <TypewriterText
        fullText="Praut s.r.o. — od promptu k motion graphics."
        pauseAfter="Praut s.r.o."
        fontSize={48}
      />
      <WordReveal text="Slovo po slově reveal animace" fontSize={32} />
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <MonoLabel>CountUp:</MonoLabel>
        <CountUpNumber to={1200000} fontSize={48} />
      </div>
      <GradientText style={{ fontSize: 24 }}>Gradient text helper</GradientText>
    </AbsoluteFill>
  </PrautVideoFrame>
);
