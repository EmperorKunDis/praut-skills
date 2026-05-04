import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";
import { springs } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Item = { icon: string; label: string; completed: boolean };

type Props = {
  items: Item[];
  title?: string;
  style?: React.CSSProperties;
};

export const RecapMoment: React.FC<Props> = ({
  items,
  title = "Co už víme",
  style,
}) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.snappy });
  return (
    <div
      style={{
        background: gradients.card,
        borderRadius: 12,
        padding: "20px 28px",
        maxWidth: 400,
        opacity: p,
        transform: `translateY(${(1 - p) * 12}px)`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 12,
          fontWeight: fontWeight.body,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            <PhosphorIcon
              name={item.completed ? "check-circle" : "circle"}
              size={18}
              color={
                item.completed ? colors.semantic.success : colors.purple[300]
              }
            />
            <span
              style={{
                fontFamily: fonts.primary,
                fontSize: 14,
                fontWeight: fontWeight.body,
                color: item.completed ? colors.purple[100] : colors.purple[300],
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
