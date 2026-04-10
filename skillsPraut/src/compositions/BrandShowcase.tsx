import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { DisplayHeading } from "../components/typography/DisplayHeading";
import { GradientText } from "../components/typography/GradientText";
import { GlowCard } from "../components/cards/GlowCard";
import { StatCard } from "../components/cards/StatCard";
import { PhosphorIcon } from "../components/icons/PhosphorIcon";
import { colors } from "../styles/tokens";

export const BrandShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00" episodeTitle="Brand Showcase">
    <AbsoluteFill
      style={{
        padding: 120,
        display: "flex",
        flexDirection: "column",
        gap: 48,
        justifyContent: "center",
      }}
    >
      <DisplayHeading gradient>Praut Brand System</DisplayHeading>
      <GradientText
        style={{ fontSize: 28, fontFamily: '"Montserrat", sans-serif' }}
      >
        Komponenty pro Martin Švanda — Progressive Automatisation
      </GradientText>
      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        <PhosphorIcon
          name="brain"
          size={64}
          color={colors.purple[400]}
          glow="active"
        />
        <PhosphorIcon
          name="code"
          size={64}
          weight="bold"
          color={colors.blue[400]}
          glow="subtle"
        />
        <PhosphorIcon
          name="lightning"
          size={64}
          color={colors.semantic.warning}
        />
        <PhosphorIcon
          name="rocket-launch"
          size={64}
          color={colors.purple[600]}
          glow="cta"
        />
        <PhosphorIcon
          name="robot"
          size={64}
          color={colors.purple[300]}
        />
        <PhosphorIcon
          name="graph"
          size={64}
          weight="bold"
          color={colors.blue[400]}
        />
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
        <GlowCard padding={36}>
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 22,
              color: colors.purple[100],
            }}
          >
            Single source of truth — všechny tokeny v jednom souboru.
          </div>
        </GlowCard>
        <StatCard
          value="100+"
          label="Komponent"
          icon="package"
          delta="brand-correct"
        />
      </div>
    </AbsoluteFill>
  </PrautVideoFrame>
);
