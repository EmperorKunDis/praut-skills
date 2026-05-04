import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  springs,
  typeScale,
  withOpacity,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

const AI_ITEMS = [
  "Sumarizace 100stránkového dokumentu za 3 s",
  "Přeložit 10 000 slov za minutu",
  "Generovat 50 variant marketingového textu",
  "Odpovídat zákazníkům 24/7",
  "Analyzovat 10 000 řádků dat",
] as const;

const HUMAN_ITEMS = [
  "Strategická rozhodnutí s etickým dopadem",
  "Komplexní negociace a vztahy",
  "Kreativita v nových doménách",
  "Fyzická interakce se světem",
  "Ověřování faktů v kritických oblastech",
] as const;

const STAGGER = 10;
const TITLE_FRAME = 0;
const ITEMS_START = 18;

export const AIVsHumanCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress = spring({
    frame: Math.max(0, frame - exitStart),
    fps,
    config: springs.smooth,
  });
  const globalOpacity = 1 - exitProgress;

  const titleP = spring({
    frame: Math.max(0, frame - TITLE_FRAME),
    fps,
    config: springs.snappy,
  });

  const itemProgress = (col: number, row: number) =>
    spring({
      frame: Math.max(0, frame - ITEMS_START - col * 6 - row * STAGGER),
      fps,
      config: springs.smooth,
    });

  const colCard = (
    header: string,
    headerColor: string,
    items: readonly string[],
    icon: string,
    itemColor: string,
    colIndex: number,
  ) => (
    <div
      style={{
        flex: 1,
        background: colors.navy[800],
        border: `1.5px solid ${withOpacity(headerColor, 0.35)}`,
        borderRadius: 20,
        padding: "36px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Column header */}
      <div
        style={{
          fontSize: 22,
          fontWeight: fontWeight.heading,
          color: headerColor,
          fontFamily: fonts.primary,
          letterSpacing: 1,
          marginBottom: 32,
          textTransform: "uppercase",
          opacity: titleP,
        }}
      >
        {header}
      </div>

      {/* Items */}
      {items.map((item, i) => {
        const p = itemProgress(colIndex, i);
        return (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              marginBottom: 22,
              opacity: p,
              transform: `translateX(${interpolate(p, [0, 1], [-40, 0])}px)`,
            }}
          >
            <PhosphorIcon
              name={icon}
              size={20}
              color={itemColor}
              weight="bold"
            />
            <span
              style={{
                fontSize: typeScale.body.size,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                lineHeight: 1.5,
                fontFamily: fonts.primary,
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        padding: "0 120px",
        boxSizing: "border-box",
        opacity: globalOpacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${interpolate(titleP, [0, 1], [-20, 0])}px)`,
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: typeScale.h2.size,
            fontWeight: fontWeight.heading,
            color: colors.purple[50],
          }}
        >
          AI vs Člověk — kde AI exceluje a kde ne
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: "flex", gap: 40, width: "100%", maxWidth: 1520 }}>
        {colCard(
          "AI zvládne",
          colors.blue[400],
          AI_ITEMS,
          "check",
          colors.semantic.success,
          0,
        )}
        {colCard(
          "Potřebuje člověka",
          colors.semantic.warning,
          HUMAN_ITEMS,
          "warning-circle",
          colors.semantic.warning,
          1,
        )}
      </div>
    </div>
  );
};
