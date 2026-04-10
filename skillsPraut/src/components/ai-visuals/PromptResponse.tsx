import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";

type Props = {
  prompt: string;
  response: string;
  style?: React.CSSProperties;
};

/**
 * Chat-style prompt + animated streaming response. Static prompt bubble,
 * typewriter response.
 */
export const PromptResponse: React.FC<Props> = ({
  prompt,
  response,
  style,
}) => {
  const typed = useTypewriter({ fullText: response, charFrames: 1 });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 800,
        ...style,
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          background: gradients.brandPrimary,
          color: colors.purple[50],
          padding: "14px 22px",
          borderRadius: 16,
          borderBottomRightRadius: 4,
          fontFamily: fonts.primary,
          fontSize: 18,
          fontWeight: fontWeight.body,
          maxWidth: "80%",
        }}
      >
        {prompt}
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          background: colors.navy[800],
          border: `1px solid ${colors.blue[400]}33`,
          color: colors.purple[100],
          padding: "14px 22px",
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          fontFamily: fonts.primary,
          fontSize: 18,
          fontWeight: fontWeight.body,
          maxWidth: "80%",
          lineHeight: 1.5,
        }}
      >
        {typed}
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 18,
            background: colors.blue[400],
            marginLeft: 4,
            verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  );
};
