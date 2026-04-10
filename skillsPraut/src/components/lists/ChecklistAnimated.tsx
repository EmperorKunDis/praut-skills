import React from "react";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Props = {
  items: string[];
  checked?: boolean[];
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Checklist that ticks each item one by one (uses stagger).
 * Pass `checked` to skip animation for items already checked.
 */
export const ChecklistAnimated: React.FC<Props> = ({
  items,
  checked,
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
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const progress = stagger(i);
        const isChecked = checked ? checked[i] : progress > 0.5;
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              fontFamily: fonts.primary,
              fontWeight: fontWeight.body,
              fontSize: 22,
              color: isChecked ? colors.purple[100] : colors.purple[300],
            }}
          >
            <div
              style={{
                filter: isChecked ? `drop-shadow(${glow.subtle})` : undefined,
                opacity: progress,
                transform: `scale(${progress})`,
              }}
            >
              <PhosphorIcon
                name={isChecked ? "check-square" : "square"}
                weight={isChecked ? "fill" : "regular"}
                size={28}
                color={isChecked ? colors.semantic.success : colors.purple[300]}
              />
            </div>
            <span
              style={{
                textDecoration: isChecked ? "line-through" : undefined,
                textDecorationColor: colors.purple[400],
              }}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
