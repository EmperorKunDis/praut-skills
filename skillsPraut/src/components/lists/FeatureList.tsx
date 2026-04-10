import React from "react";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Item = {
  title: string;
  description?: string;
  icon?: string;
};

type Props = {
  items: Item[];
  startFrame?: number;
  style?: React.CSSProperties;
};

export const FeatureList: React.FC<Props> = ({
  items,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.fast,
    startFrame,
  });

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 24,
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
              gap: 20,
              alignItems: "flex-start",
              opacity: progress,
              transform: `translateX(${(1 - progress) * 24}px)`,
            }}
          >
            <PhosphorIcon
              name={item.icon ?? "check"}
              size={32}
              color={colors.purple[600]}
            />
            <div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 24,
                  color: colors.purple[50],
                }}
              >
                {item.title}
              </div>
              {item.description ? (
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 16,
                    color: colors.purple[200],
                    marginTop: 4,
                  }}
                >
                  {item.description}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
