import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useEnterExit } from "../../hooks/useEnterExit";

type Props = {
  left: { label: string; icon: string };
  right: { label: string; icon: string };
  relation?: string;
  style?: React.CSSProperties;
};

/**
 * Analogy visualization — "X is like Y" with icons and a "≈" symbol between.
 */
export const AnalogyVisual: React.FC<Props> = ({
  left,
  right,
  relation = "jako",
  style,
}) => {
  const pLeft = useEnterExit({ delay: 0 });
  const pRelation = useEnterExit({ delay: 10 });
  const pRight = useEnterExit({ delay: 20 });

  const Item: React.FC<{ label: string; icon: string }> = ({ label, icon }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 32,
        background: gradients.card,
        borderRadius: 16,
        minWidth: 240,
      }}
    >
      <PhosphorIcon name={icon} size={96} color={colors.blue[400]} />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        ...style,
      }}
    >
      <div
        style={{
          opacity: pLeft,
          transform: `translateX(${(1 - pLeft) * -30}px)`,
        }}
      >
        <Item {...left} />
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 36,
          color: colors.blue[400],
          opacity: pRelation,
          transform: `scale(${0.7 + pRelation * 0.3})`,
        }}
      >
        {relation}
      </div>
      <div
        style={{
          opacity: pRight,
          transform: `translateX(${(1 - pRight) * 30}px)`,
        }}
      >
        <Item {...right} />
      </div>
    </div>
  );
};
