import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  style?: React.CSSProperties;
};

export const NewsletterCTA: React.FC<Props> = ({
  title = "Praut Newsletter",
  description = "Každý týden nejdůležitější novinky ze světa AI — bez voli.",
  placeholder = "tvoje@email.cz",
  buttonLabel = "Přihlásit",
  style,
}) => (
  <div
    style={{
      background: gradients.card,
      border: `1px solid ${colors.purple[600]}55`,
      borderRadius: 16,
      padding: 32,
      maxWidth: 720,
      boxShadow: glow.subtle,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <PhosphorIcon
        name="envelope-simple"
        size={28}
        color={colors.purple[400]}
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 26,
          color: colors.purple[50],
        }}
      >
        {title}
      </div>
    </div>
    <p
      style={{
        fontFamily: fonts.primary,
        fontSize: 16,
        color: colors.purple[200],
        marginTop: 0,
        marginBottom: 24,
      }}
    >
      {description}
    </p>
    <div style={{ display: "flex", gap: 12 }}>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          border: `1px solid ${colors.blue[400]}66`,
          borderRadius: 999,
          padding: "14px 20px",
          fontFamily: fonts.mono,
          fontSize: 16,
          color: colors.purple[300],
        }}
      >
        {placeholder}
      </div>
      <button
        type="button"
        style={{
          background: gradients.brandPrimary,
          color: colors.purple[50],
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 16,
          padding: "14px 32px",
          border: "none",
          borderRadius: 999,
          boxShadow: glow.cta,
          cursor: "pointer",
        }}
      >
        {buttonLabel}
      </button>
    </div>
  </div>
);
