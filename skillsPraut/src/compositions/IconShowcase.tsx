import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { PhosphorIcon, PhosphorWeight } from "../components/icons/PhosphorIcon";
import { colors, fonts } from "../styles/tokens";

const ICONS = [
  "brain",
  "code",
  "rocket-launch",
  "lightning",
  "graph",
  "robot",
  "database",
  "cube",
  "gear",
  "eye",
  "cloud",
  "shield",
];

const WEIGHTS: PhosphorWeight[] = [
  "thin",
  "light",
  "regular",
  "bold",
  "fill",
  "duotone",
];

export const IconShowcase: React.FC = () => (
  <PrautVideoFrame
    episodeNumber="00"
    episodeTitle="Phosphor Icons (1530 ikon × 6 vah)"
  >
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "grid",
        gridTemplateColumns: "auto repeat(12, 1fr)",
        gap: 12,
        alignItems: "center",
      }}
    >
      <div />
      {ICONS.map((name) => (
        <div
          key={name}
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.purple[300],
            textAlign: "center",
          }}
        >
          {name}
        </div>
      ))}
      {WEIGHTS.map((weight) => (
        <React.Fragment key={weight}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.blue[400],
              letterSpacing: 1.5,
              textTransform: "uppercase",
              textAlign: "right",
              paddingRight: 12,
            }}
          >
            {weight}
          </div>
          {ICONS.map((name) => (
            <div
              key={`${weight}-${name}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhosphorIcon
                name={name}
                weight={weight}
                size={48}
                color={colors.purple[200]}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </AbsoluteFill>
  </PrautVideoFrame>
);
