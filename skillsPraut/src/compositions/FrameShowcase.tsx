import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SplitLayout } from "../components/frame/SplitLayout";
import { DisplayHeading } from "../components/typography/DisplayHeading";
import { BodyText } from "../components/typography/BodyText";
import { GlowCard } from "../components/cards/GlowCard";

export const FrameShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00" episodeTitle="Frame & Layout">
    <AbsoluteFill style={{ padding: 100, paddingTop: 140 }}>
      <SplitLayout
        left={
          <div>
            <DisplayHeading gradient>SplitLayout</DisplayHeading>
            <BodyText style={{ marginTop: 24, fontSize: 22 }}>
              2-sloupcový layout s konfigurovatelným poměrem. Ideální pro text +
              vizuál slidy. Default 50/50.
            </BodyText>
          </div>
        }
        right={
          <GlowCard>
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 18,
                color: "#E4CFFF",
              }}
            >
              Pravá strana — vizuál nebo karta s obsahem.
            </div>
          </GlowCard>
        }
      />
    </AbsoluteFill>
  </PrautVideoFrame>
);
