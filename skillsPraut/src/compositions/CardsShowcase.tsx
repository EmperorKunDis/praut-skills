import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { GlowCard } from "../components/cards/GlowCard";
import { StatCard } from "../components/cards/StatCard";
import { TipCard } from "../components/cards/TipCard";
import { InfoCard } from "../components/cards/InfoCard";
import { WarningCard } from "../components/cards/WarningCard";
import { SuccessCard } from "../components/cards/SuccessCard";
import { colors } from "../styles/tokens";

export const CardsShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00" episodeTitle="Cards & Containers">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <StatCard value="1530" label="Phosphor ikon" icon="package" />
        <StatCard value="100+" label="Komponent" icon="cube" />
        <StatCard value="15" label="Kategorií" icon="folder" />
      </div>
      <GlowCard>
        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 20,
            color: colors.purple[100],
          }}
        >
          GlowCard — purple border + subtle glow.
        </div>
      </GlowCard>
      <TipCard title="Tip">
        Vždy importuj barvy z `tokens.ts`. Žádný hex jinde.
      </TipCard>
      <InfoCard title="Info">
        PhosphorIcon podporuje 6 weight variant: regular, bold, fill, light,
        thin, duotone.
      </InfoCard>
      <WarningCard title="Pozor">
        Žádný `#fff` ani `#000` v komponentách — vždy z navy/purple palety.
      </WarningCard>
      <SuccessCard title="Hotovo">
        Brand systém je plně implementovaný a připravený k produkci.
      </SuccessCard>
    </AbsoluteFill>
  </PrautVideoFrame>
);
