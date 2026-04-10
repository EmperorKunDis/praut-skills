import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  size?: number;
  badgeCount?: number;
};

/**
 * Notification bell with a pulsing red badge counter.
 * Bell wobbles slightly to draw the eye.
 */
export const BellNotification: React.FC<Props> = ({
  size = 80,
  badgeCount = 1,
}) => {
  const frame = useCurrentFrame();
  const wobble = interpolate(Math.sin(frame * 0.25), [-1, 1], [-12, 12]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          transform: `rotate(${wobble}deg)`,
          transformOrigin: "top center",
        }}
      >
        <PhosphorIcon
          name="bell"
          size={size}
          color={colors.semantic.info}
        />
      </div>
      {badgeCount > 0 ? (
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -8,
            minWidth: 28,
            height: 28,
            borderRadius: 14,
            background: colors.semantic.error,
            color: colors.purple[50],
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
          }}
        >
          {badgeCount}
        </div>
      ) : null}
    </div>
  );
};
