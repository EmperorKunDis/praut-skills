import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";

type Props = {
  leftTitle: string;
  leftContent: React.ReactNode;
  rightTitle: string;
  rightContent: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * A vs B comparison card with a "VS" badge in the middle.
 */
export const ComparisonCard: React.FC<Props> = ({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  style,
}) => {
  const pLeft = useEnterExit({ delay: 0 });
  const pVs = useEnterExit({ delay: 8, enterConfig: springs.bouncy });
  const pRight = useEnterExit({ delay: 16 });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "stretch",
        gap: 0,
        background: colors.navy[800],
        borderRadius: 12,
        padding: 32,
        ...style,
      }}
    >
      <div
        style={{
          padding: "0 32px",
          opacity: pLeft,
          transform: `translateX(${(1 - pLeft) * -30}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {leftTitle}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
          }}
        >
          {leftContent}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          opacity: pVs,
          transform: `scale(${0.7 + pVs * 0.3})`,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: gradients.brandPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            color: colors.purple[50],
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          VS
        </div>
      </div>
      <div
        style={{
          padding: "0 32px",
          opacity: pRight,
          transform: `translateX(${(1 - pRight) * 30}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {rightTitle}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
          }}
        >
          {rightContent}
        </div>
      </div>
    </div>
  );
};
