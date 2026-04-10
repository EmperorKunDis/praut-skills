import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";

type Event = {
  year: string;
  title: string;
  highlight?: boolean;
};

type Props = {
  events: Event[];
  startFrame?: number;
  style?: React.CSSProperties;
};

export const TimelineChart: React.FC<Props> = ({
  events,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, timing.reveal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "40px 0",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: `${reveal * 100}%`,
          height: 3,
          background: colors.blue[400],
          boxShadow: glow.subtle,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {events.map((e, i) => {
          const eventReveal = interpolate(
            frame - startFrame - i * 8,
            [0, 24],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: eventReveal,
                transform: `translateY(${(1 - eventReveal) * 12}px)`,
              }}
            >
              <div
                style={{
                  width: e.highlight ? 24 : 16,
                  height: e.highlight ? 24 : 16,
                  borderRadius: "50%",
                  background: e.highlight
                    ? colors.purple[600]
                    : colors.blue[400],
                  border: `2px solid ${colors.navy[950]}`,
                  filter: e.highlight ? `drop-shadow(${glow.cta})` : undefined,
                }}
              />
              <div
                style={{
                  marginTop: 16,
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: colors.purple[100],
                }}
              >
                {e.year}
              </div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontSize: 14,
                  fontWeight: fontWeight.bodyEmphasis,
                  color: colors.purple[100],
                  textAlign: "center",
                  maxWidth: 120,
                  marginTop: 4,
                }}
              >
                {e.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
