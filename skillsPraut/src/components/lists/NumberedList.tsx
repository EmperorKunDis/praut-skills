import React from "react";
import { interpolate } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  timing,
} from "../../styles/tokens";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Item = {
  title: string;
  description?: string;
};

type Props = {
  items: Item[];
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Animated numbered list — staggered slide-in with gradient numerals.
 */
export const NumberedList: React.FC<Props> = ({
  items,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.fast,
    startFrame,
  });

  return (
    <ol
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const progress = stagger(i);
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              opacity: progress,
              transform: `translateX(${interpolate(progress, [0, 1], [-32, 0])}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.display,
                fontSize: 56,
                lineHeight: 1,
                background: gradients.logoText,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                minWidth: 88,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 28,
                  color: colors.purple[50],
                }}
              >
                {item.title}
              </div>
              {item.description ? (
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 18,
                    color: colors.purple[200],
                    marginTop: 6,
                    fontWeight: fontWeight.body,
                  }}
                >
                  {item.description}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
