import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Layout =
  | "face-left-text-right"
  | "face-right-text-left"
  | "centered"
  | "split-comparison";

type Props = {
  background: React.ReactNode;
  subject?: React.ReactNode;
  hookText?: string;
  hookTextSize?: number;
  layout?: Layout;
  children?: React.ReactNode;
};

export const ThumbnailComposition: React.FC<Props> = ({
  background,
  subject,
  hookText,
  hookTextSize = 80,
  layout = "face-left-text-right",
  children,
}) => {
  const isLeft = layout === "face-left-text-right";
  const isCentered = layout === "centered";
  const isSplit = layout === "split-comparison";

  return (
    <AbsoluteFill style={{ width: 1280, height: 720, overflow: "hidden" }}>
      {/* Background layer */}
      <AbsoluteFill>{background}</AbsoluteFill>

      {isCentered ? (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 60,
            gap: 24,
          }}
        >
          {subject}
          {hookText && (
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.display,
                fontSize: hookTextSize,
                color: colors.purple[50],
                textAlign: "center",
                lineHeight: 1.05,
                WebkitTextStroke: "2px rgba(0,0,0,0.5)",
              }}
            >
              {hookText}
            </div>
          )}
        </AbsoluteFill>
      ) : isSplit ? (
        <AbsoluteFill style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {subject}
          </div>
          <div style={{ width: 4, background: colors.blue[400] }} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: isLeft ? "row" : "row-reverse",
            padding: "40px 60px",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "0 0 40%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {subject}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
            }}
          >
            {hookText && (
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.display,
                  fontSize: hookTextSize,
                  color: colors.purple[50],
                  lineHeight: 1.05,
                  WebkitTextStroke: "2px rgba(0,0,0,0.5)",
                }}
              >
                {hookText}
              </div>
            )}
            {children}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
