/**
 * EP01 — "10 Mýtů o AI" — Profesionální automatizace
 *
 * 93 scenes, 38 160 frames @ 30 fps (~21 min)
 * Scene plan: DNY-30#document-scene-plan
 */
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Frame / layout
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { ExplainerSlide } from "../components/frame/ExplainerSlide";
import { WebcamPlaceholder } from "../components/frame/WebcamPlaceholder";

// Chapters
import { HookCard } from "../components/chapters/HookCard";
import { ChapterCard } from "../components/chapters/ChapterCard";
import { IntroAnimation } from "../components/chapters/IntroAnimation";
import { EndScreen } from "../components/chapters/EndScreen";

// Educational
import { DefinitionBox } from "../components/educational/DefinitionBox";
import { AnalogyVisual } from "../components/educational/AnalogyVisual";
import { BeforeAfterSlider } from "../components/educational/BeforeAfterSlider";

// Lists
import { DoVsDont } from "../components/lists/DoVsDont";
import { MythVsFact } from "../components/lists/MythVsFact";

// Media
import { BrowserMockup } from "../components/media/BrowserMockup";

// Charts
import { AnimatedBarChart } from "../components/charts/AnimatedBarChart";

// Transitions
import { FadeTransition } from "../components/transitions/FadeTransition";

// Tokens
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../styles/tokens";

// ─── Local helper components ────────────────────────────────────────────────

/** Single-side ProsCons list (PRO-only or CON-only slide). */
const SideList: React.FC<{
  heading: string;
  items: string[];
  side: "pro" | "con";
  withWebcam?: boolean;
}> = ({ heading, items, side, withWebcam = true }) => {
  const color =
    side === "pro" ? colors.semantic.success : colors.semantic.error;
  const prefix = side === "pro" ? "✓" : "✗";
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "90px 80px 80px",
      }}
    >
      <FadeTransition>
        <div
          style={{
            width: "100%",
            maxWidth: 1340,
            background: colors.navy[800],
            borderLeft: `4px solid ${color}`,
            borderRadius: 12,
            padding: "40px 48px",
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 15,
              letterSpacing: 3,
              textTransform: "uppercase" as const,
              color,
              marginBottom: 28,
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            {heading}
          </div>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column" as const,
              gap: 18,
            }}
          >
            {items.map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: fonts.primary,
                  fontSize: 23,
                  fontWeight: fontWeight.body,
                  color: colors.purple[100],
                  lineHeight: 1.4,
                }}
              >
                <span
                  style={{
                    color,
                    marginRight: 10,
                    fontWeight: fontWeight.heading,
                  }}
                >
                  {prefix}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeTransition>
      {withWebcam && <WebcamPlaceholder />}
    </AbsoluteFill>
  );
};

/** Empty screenshot / screencast placeholder with source label. */
const ScreenPlaceholder: React.FC<{
  url?: string;
  label: string;
  withWebcam?: boolean;
}> = ({ url, label, withWebcam = true }) => (
  <AbsoluteFill
    style={{
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "90px 80px 80px",
    }}
  >
    <FadeTransition>
      {url ? (
        <BrowserMockup url={url} style={{ width: "100%", maxWidth: 1400 }}>
          <div
            style={{
              height: 460,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.navy[900],
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                color: colors.purple[300],
                fontSize: 15,
                letterSpacing: 2,
              }}
            >
              [ screenshot placeholder ]
            </span>
          </div>
        </BrowserMockup>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: 1400,
            height: 520,
            border: `2px dashed ${colors.blue[400]}`,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.navy[900],
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              color: colors.purple[300],
              fontSize: 15,
              letterSpacing: 2,
            }}
          >
            [ screenshot placeholder ]
          </span>
        </div>
      )}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 17,
          color: colors.blue[400],
          marginTop: 22,
          letterSpacing: 1,
          textAlign: "center" as const,
          maxWidth: 1300,
        }}
      >
        {label}
      </div>
    </FadeTransition>
    {withWebcam && <WebcamPlaceholder />}
  </AbsoluteFill>
);

/** Absolute DefinitionBox overlay for use inside scenes. */
const DefOverlay: React.FC<{ term: string; definition: string }> = ({
  term,
  definition,
}) => (
  <AbsoluteFill
    style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      padding: "0 120px 180px",
      pointerEvents: "none",
    }}
  >
    <FadeTransition>
      <DefinitionBox
        term={term}
        definition={definition}
        style={{ maxWidth: 1100 }}
      />
    </FadeTransition>
  </AbsoluteFill>
);

/** Key points list for ExplainerSlide bottomText. */
const KeyPoints: React.FC<{ heading?: string; points: string[] }> = ({
  heading,
  points,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column" as const,
      gap: 14,
      maxWidth: 1200,
    }}
  >
    {heading && (
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 34,
          color: colors.purple[50],
          lineHeight: 1.2,
          marginBottom: 4,
        }}
      >
        {heading}
      </div>
    )}
    <ol
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column" as const,
        gap: 12,
      }}
    >
      {points.map((pt, i) => (
        <li
          key={i}
          style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              color: colors.blue[400],
              fontWeight: fontWeight.bodyEmphasis,
              fontSize: 21,
              minWidth: 30,
            }}
          >
            {i + 1}.
          </span>
          <span
            style={{
              fontFamily: fonts.primary,
              fontSize: 21,
              fontWeight: fontWeight.body,
              color: colors.purple[100],
              lineHeight: 1.45,
            }}
          >
            {pt}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

/** Big quote heading for ExplainerSlide topContent. */
const BigQuote: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      fontFamily: fonts.primary,
      fontWeight: fontWeight.display,
      fontSize: 46,
      background: gradients.logoText,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textAlign: "center" as const,
      lineHeight: 1.15,
      maxWidth: 1400,
      padding: "0 60px",
    }}
  >
    {text}
  </div>
);

/** Chapter "Mýtus vyvrácen" closing card. */
const MythBustedCard: React.FC<{ number: string; subtitle: string }> = ({
  number,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p1 = spring({ frame, fps, config: springs.smooth });
  const p2 = spring({ frame: frame - 10, fps, config: springs.smooth });
  const pSub = spring({ frame: frame - 20, fps, config: springs.smooth });
  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.semantic.success,
          opacity: p1,
          letterSpacing: 4,
          marginBottom: 14,
        }}
      >
        MÝTUS {number} — VYVRÁCEN ✓
      </div>
      <div
        style={{
          width: interpolate(p2, [0, 1], [0, 300]),
          height: 2,
          background: colors.semantic.success,
          marginBottom: 28,
        }}
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 56,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: pSub,
          transform: `translateY(${interpolate(pSub, [0, 1], [20, 0])}px)`,
          textAlign: "center" as const,
          maxWidth: 1400,
          lineHeight: 1.15,
          padding: "0 80px",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

/** Timeline grid for Myth 8 scene 69. */
const TimelineGrid: React.FC = () => {
  const tiers = [
    {
      title: "Do 1 dne",
      items: [
        "Registrace ChatGPT/Claude",
        "AI email šablony",
        "Instalace Ollama",
      ],
    },
    {
      title: "Do 1 týdne",
      items: [
        "Chatbot na web (Tidio/Crisp)",
        "Automatizace v N8N/Make",
        "AI FAQ asistent",
      ],
    },
    {
      title: "Do 1 měsíce",
      items: [
        "CRM integrace",
        "AI pro obsah (soc. sítě)",
        "Custom GPT asistent",
      ],
    },
    {
      title: "3–6 měsíců",
      items: [
        "Custom AI s napojením",
        "Prediktivní analytika",
        "Plná AI integrace",
      ],
    },
    {
      title: "6–18 měsíců",
      items: [
        "Enterprise-grade",
        "Vlastní modely",
        "Multi-systémová integrace",
      ],
    },
  ];
  const colors_tier = [
    colors.semantic.success,
    colors.semantic.success,
    colors.blue[400],
    colors.blue[400],
    colors.purple[600],
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        width: "100%",
        maxWidth: 1680,
        padding: "0 40px",
      }}
    >
      {tiers.map((tier, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: colors.navy[800],
            borderTop: `3px solid ${colors_tier[i]}`,
            borderRadius: 10,
            padding: "20px 18px",
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              color: colors_tier[i],
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              marginBottom: 14,
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            {tier.title}
          </div>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column" as const,
              gap: 8,
            }}
          >
            {tier.items.map((item, j) => (
              <li
                key={j}
                style={{
                  fontFamily: fonts.primary,
                  fontSize: 15,
                  fontWeight: fontWeight.body,
                  color: colors.purple[100],
                  lineHeight: 1.35,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// ─── Main composition ────────────────────────────────────────────────────────

export const EP01: React.FC = () => {
  return (
    <PrautVideoFrame episodeNumber="01" includeWatermark>
      {/* ═══ INTRO (0–660) ═══════════════════════════════════════════════ */}

      {/* Scéna 1 — HookCard (0–600, 20s) */}
      <Sequence from={0} durationInFrames={600}>
        <FadeTransition>
          <HookCard hook="Ze všech stran slyšíme o tom, jak je AI prokletí nebo požehnání. Vůbec nic to neumí / všechny nás to zachrání. Ale jak je to ve skutečnosti? To se tu pokusíme společně rozuzlit. Jmenuju se Martin Švanda a tohle je první video o Profesionální automatizaci." />
        </FadeTransition>
      </Sequence>

      {/* Scéna 2 — IntroAnimation (600–660, 2s) */}
      <Sequence from={600} durationInFrames={60}>
        <FadeTransition>
          <IntroAnimation tagline="Profesionální automatizace — EP01" />
        </FadeTransition>
      </Sequence>

      {/* ═══ MÝTUS 1 — "AI je jenom bublina" (660–4530) ══════════════════ */}

      {/* Scéna 3 — ChapterCard M01 (660–750, 3s) */}
      <Sequence from={660} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard number="01" title="AI je jenom bublina a nic to neumí" />
        </FadeTransition>
      </Sequence>

      {/* Scéna 4 — PRO list (750–1200, 15s) */}
      <Sequence from={750} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "Investice do AI firem jsou nafouklé – valuace Nvidia, OpenAI jsou neudržitelné",
            "Většina AI startupů nemá reálný byznys model a žije z investic",
            "MIT studie (2025): 95 % gen. AI pilotů nepřineslo měřitelné ROI",
            "Gartner: 30 % gen. AI projektů bude opuštěno po proof-of-concept",
            "Spousta AI produktů řeší problémy, které nikdo nemá",
          ]}
        />
        {/* DefinitionBox ROI — frame 950–1040 → relative 200–290 */}
        <Sequence from={200} durationInFrames={90}>
          <DefOverlay
            term="ROI"
            definition="Return on Investment: návratnost investice"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 5 — CON list (1200–1650, 15s) */}
      <Sequence from={1200} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "Goldman Sachs (2025): 68 % malých firem v USA už AI aktivně používá",
            "Salesforce SMB Trends: 91 % firem s AI hlásí růst tržeb",
            "Thryv (květen 2025): adopce vzrostla z 39 % na 55 % za rok (+41 %)",
            "Firmy 10–100 zaměstnanců: adopce z 47 % na 68 %",
          ]}
        />
      </Sequence>

      {/* Scéna 6 — ExplainerSlide talking-head (1650–2850, 40s) */}
      <Sequence from={1650} durationInFrames={1200}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="AI JE bublina v ekonomickém slova smyslu – a to je normální." />
            }
            bottomText={
              <KeyPoints
                points={[
                  "Dot-com bublina splaskla v roce 2000, ale internet zůstal a stal se základem ekonomiky.",
                  "Samotná technologie je reálná a funkční. Je to aplikovaná statistika nad obrovským množstvím dat.",
                  "Problém je v očekáváních – AI nevyřeší všechno a nestačí koupit nástroj a položit ho do šuplíku.",
                ]}
              />
            }
          />
        </FadeTransition>
        {/* DefinitionBox AI — relative 0–90 */}
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="AI"
            definition="Umělá inteligence: počítačový systém napodobující lidské myšlení"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 7 — Screenshot BrowserMockup (2850–3150) */}
      <Sequence from={2850} durationInFrames={300}>
        <ScreenPlaceholder
          url="github.com/vectara/hallucination-leaderboard"
          label="Zdroj: Vectara AI Hallucination Leaderboard — reálné výsledky modelů"
        />
      </Sequence>

      {/* Scéna 8 — Screenshot RoundedScreenshot (3150–3450) */}
      <Sequence from={3150} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Goldman Sachs 10,000 Small Businesses Survey — 68 % adopce" />
      </Sequence>

      {/* Scéna 9 — Screenshot RoundedScreenshot (3450–3750) */}
      <Sequence from={3450} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Thryv AI Business Survey — adopce vzrostla z 39 % na 55 %" />
      </Sequence>

      {/* Scéna 10 — Screenshot Google Trends (3750–4050) */}
      <Sequence from={3750} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Google Trends — AI hype křivka" />
      </Sequence>

      {/* Scéna 11 — AnalogyVisual motorová pila (4050–4440, 13s) */}
      <Sequence from={4050} durationInFrames={390}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "Motorová pila v kůlně", icon: "warehouse" }}
              right={{ label: "Motorová pila v akci", icon: "tree" }}
              relation="vs"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              AI je jako motorová pila. Nekoupíte ji, nepoložíte do kůlny a
              nemáte posekaný les. S ní zvládnete za den to, co by pazourkem
              trvalo týden.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 12 — MythBusted M01 (4440–4530, 3s) */}
      <Sequence from={4440} durationInFrames={90}>
        <MythBustedCard
          number="01"
          subtitle="AI je bublina — ale technologie je reálná"
        />
      </Sequence>

      {/* ═══ MÝTUS 2 — "Stačí koupit AI produkt" (4530–8310) ══════════ */}

      {/* Scéna 13 — ChapterCard M02 (4530–4620) */}
      <Sequence from={4530} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="02"
            title="Stačí koupit AI produkt a lidi ho začnou používat"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 14 — PRO list (4620–5070) */}
      <Sequence from={4620} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "AI nástroje jsou dnes intuitivní – ChatGPT zvládne kdokoli",
            "Moderní SaaS je plug-and-play, není potřeba školení",
            "Generace Z je digital native – nepotřebuje onboarding",
          ]}
        />
        <Sequence from={130} durationInFrames={90}>
          <DefOverlay
            term="SaaS"
            definition="Software as a Service: software dostupný jako online předplatné"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 15 — CON list (5070–5520) */}
      <Sequence from={5070} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "Goldman Sachs: 42 % malých firem nemá zdroje a expertízu pro AI",
            "60 % uvádí nedostatek expertízy v aplikaci AI na byznys",
            "48 % problém s výběrem správného nástroje",
            "46 % obavy z bezpečnosti dat",
            "Reimagine Main Street: 73 % chce snáze použitelné AI nástroje",
          ]}
        />
      </Sequence>

      {/* Scéna 16 — ExplainerSlide change management (5520–7020, 50s) */}
      <Sequence from={5520} durationInFrames={1500}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="Největší překážka AI adopce NENÍ technologie – je to change management." />
            }
            bottomText={
              <KeyPoints
                heading="Firmy které uspěly s AI:"
                points={[
                  "Začaly s jedním konkrétním procesem",
                  "Měly interního championa pro daný nástroj",
                  "Školily zaměstnance NA KONKRÉTNÍCH USE CASES",
                  "Měřily výsledky a iterovaly",
                  "Příklad — Klarna (2024): AI místo 700 agentů → kvalita klesla → museli lidi znovu nabírat",
                ]}
              />
            }
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 17 — Screenshot Goldman Sachs barriers (7020–7320) */}
      <Sequence from={7020} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Goldman Sachs — bariéry AI adopce u SMB (42 %, 60 %...)" />
      </Sequence>

      {/* Scéna 18 — Screenshot Reimagine Main Street (7320–7620) */}
      <Sequence from={7320} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Reimagine Main Street / PayPal — 73 % chce jednodušší nástroje" />
      </Sequence>

      {/* Scéna 19 — Screenshot Klarna rehiring (7620–7920) */}
      <Sequence from={7620} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Klarna — AI experiment a zpětné nábory (CNBC)" />
      </Sequence>

      {/* Scéna 20 — AnalogyVisual fitko karta (7920–8220) */}
      <Sequence from={7920} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "Fitko karta 1. ledna", icon: "credit-card" }}
              right={{ label: "Reálné cvičení s trenérem", icon: "barbell" }}
              relation="vs"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              Koupit AI nástroj = fitko karta. Bez plánu, návyku a trenéra
              skončí za 3 týdny.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 21 — MythBusted M02 (8220–8310) */}
      <Sequence from={8220} durationInFrames={90}>
        <MythBustedCard
          number="02"
          subtitle="AI vyžaduje change management, ne jen nákup"
        />
      </Sequence>

      {/* ═══ MÝTUS 3 — "AI je jen pro velké korporace" (8310–12300) ═══ */}

      {/* Scéna 22 — ChapterCard M03 (8310–8400) */}
      <Sequence from={8310} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="03"
            title="AI je jen pro velké korporace s milionovými rozpočty"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 23 — PRO list (8400–8850) */}
      <Sequence from={8400} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "Custom AI řešení stojí $50 000–$500 000+",
            "Enterprise AI nasazení může stát miliony dolarů",
            "Potřebujete data science tým, infrastrukturu, GPU servery",
            "Školení a maintenance jsou další náklady navíc",
          ]}
        />
      </Sequence>

      {/* Scéna 24 — CON list (8850–9300) */}
      <Sequence from={8850} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "ChatGPT Plus: $20/měsíc (cca 480 Kč)",
            "GitHub Copilot: $10–20/měsíc",
            "Jednoduchý AI chatbot: od $5 000 jednorázově nebo SaaS od $99/měsíc",
            "Thryv: AI adopce nejsilnější u firem 10–100 zaměstnanců (68 %)",
            "Salesforce: 75 % SMB minimálně experimentuje s AI",
          ]}
        />
        <Sequence from={50} durationInFrames={90}>
          <DefOverlay
            term="SaaS"
            definition="Software as a Service: software dostupný jako online předplatné"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 25 — ExplainerSlide SMB stack (9300–11100, 60s) */}
      <Sequence from={9300} durationInFrames={1800}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="V roce 2025 to, co stálo $100 000 vyvinout v 2022, je dostupné jako předplatné za pár stovek měsíčně." />
            }
            bottomText={
              <KeyPoints
                heading="Malá firma potřebuje:"
                points={[
                  "Naučit zaměstnance jak pracovat s AI",
                  "Zvolit AI nástroje (Claude / ChatGPT / Gemini / Grok)",
                  "Mít interního Ambasadora — nadšence pro nové technologie",
                  "Zjistit co je možné a legální — konzultant nebo odborník",
                  "České příklady: živnostník → AI pro faktury | stavební firma → AI nabídky | restaurace → AI chatbot",
                ]}
              />
            }
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 26 — AnimatedBarChart cenový rozbor (11100–11400) */}
      <Sequence from={11100} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 32,
                color: colors.purple[50],
              }}
            >
              Cenový rozbor AI stack pro českou firmu (Kč/měsíc)
            </div>
            <AnimatedBarChart
              data={[
                { label: "Základní AI stack", value: 2000 },
                { label: "S chatbotem a automatizací", value: 5500 },
                {
                  label: "Custom konzultant (jednorázově)",
                  value: 30000,
                  highlight: true,
                },
              ]}
              maxValue={30000}
              width={1100}
              height={480}
            />
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 27 — Screenshot pricing (11400–11700) */}
      <Sequence from={11400} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Ceníky ChatGPT / Claude / Gemini / Grok — pricing stránek" />
      </Sequence>

      {/* Scéna 28 — Screenshot N8N (11700–12000) */}
      <Sequence from={11700} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: N8N rozhraní — ukázka automatizace" />
      </Sequence>

      {/* Scéna 29 — AnalogyVisual cena 2022 vs 2025 (12000–12210) */}
      <Sequence from={12000} durationInFrames={210}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "2022: $100 000", icon: "bank" }}
              right={{ label: "2025: $200/měsíc", icon: "currency-dollar" }}
              relation="→"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              To samé řešení, zlomek ceny. SMB AI stack od 1 000 Kč/měsíc.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 30 — MythBusted M03 (12210–12300) */}
      <Sequence from={12210} durationInFrames={90}>
        <MythBustedCard
          number="03"
          subtitle="AI je dostupná od 1 000 Kč/měsíc"
        />
      </Sequence>

      {/* ═══ MÝTUS 4 — "AI vždy říká pravdu / jenom halucinuje" (12300–15780) ═══ */}

      {/* Scéna 31 — MythVsFact intro (12300–12390) */}
      <Sequence from={12300} durationInFrames={90}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 20,
                color: colors.blue[400],
                letterSpacing: 4,
                marginBottom: 12,
              }}
            >
              MÝTUS 04
            </div>
            <MythVsFact
              myth="AI vždy říká pravdu"
              fact="AI jenom halucinuje"
              style={{ width: "100%", maxWidth: 1400 }}
            />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 32 — PRO list hallucination (12390–12840) */}
      <Sequence from={12390} durationInFrames={450}>
        <SideList
          heading="Zastánci: 'AI říká pravdu'"
          side="pro"
          items={[
            "AI odpovídá sebejistě a přesvědčivě",
            "Modely jsou trénovány na obrovském množství dat",
            "Google, OpenAI, Anthropic investují miliardy do kvality",
          ]}
        />
      </Sequence>

      {/* Scéna 33 — CON list (12840–13290) */}
      <Sequence from={12840} durationInFrames={450}>
        <SideList
          heading="Zastánci: 'AI jenom halucinuje'"
          side="con"
          items={[
            "Stanford právní studie: LLM halucinují v 69–88 % u právních dotazů",
            "Advokát citoval neexistující případy z ChatGPT → sankce soudu",
            "MedRxiv: 64 % halucinace u dlouhých lékařských případů",
            "NeurIPS 2025: přijaté akademické práce obsahovaly vymyšlené citace",
          ]}
        />
        <Sequence from={120} durationInFrames={90}>
          <DefOverlay
            term="Hallucination"
            definition="Když AI vymýšlí neexistující fakta s vysokou sebejistotou"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 34 — ExplainerSlide hallucination reality (13290–14490, 40s) */}
      <Sequence from={13290} durationInFrames={1200}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="Pravda je uprostřed a silně závisí na USE CASE." />
            }
            bottomText={
              <KeyPoints
                points={[
                  "Sumarizace dokumentů (RAG): Gemini-2.0-Flash 0,7 % halucinace | GPT-4o 1,5 %",
                  "Faktické otázky bez zdrojů: GPT-5 bez webu 47 % chyb → s web searchem 9,6 %",
                  "Specializované domény (právo, medicína): 23–88 % — MUSÍ mít lidský dohled",
                  "MIT (2025): Když AI halucinuje, používá JISTĚJŠÍ jazyk — o 34 % častěji říká 'rozhodně'",
                ]}
              />
            }
          />
        </FadeTransition>
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="RAG"
            definition="Retrieval-Augmented Generation: AI + vlastní databáze znalostí"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 35 — AnimatedBarChart halucinace (14490–14790) */}
      <Sequence from={14490} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 32,
                color: colors.purple[50],
              }}
            >
              Míra halucinace dle domény (%)
            </div>
            <AnimatedBarChart
              data={[
                { label: "Sumarizace (RAG)", value: 0.7 },
                { label: "Faktické otázky (s webem)", value: 9.6 },
                {
                  label: "Faktické otázky (bez webu)",
                  value: 47,
                  highlight: true,
                },
                { label: "Právo / Medicína", value: 88, highlight: true },
              ]}
              maxValue={100}
              width={1100}
              height={480}
            />
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 36 — Screenshot Vectara (14790–15090) */}
      <Sequence from={14790} durationInFrames={300}>
        <ScreenPlaceholder
          url="github.com/vectara/hallucination-leaderboard"
          label="Zdroj: Vectara Hallucination Leaderboard"
        />
      </Sequence>

      {/* Scéna 37 — Screenshot halucinace příklad (15090–15390) */}
      <Sequence from={15090} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Příklad halucinace — neexistující český zákon" />
      </Sequence>

      {/* Scéna 38 — AnalogyVisual praktikant (15390–15690) */}
      <Sequence from={15390} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "Chytrý praktikant", icon: "student" }}
              right={{ label: "Podpis smlouvy / diagnóza", icon: "pen-nib" }}
              relation="vs"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              AI je jako chytrý praktikant. U 90 % rutinních úkolů odvede
              skvělou práci. Ale NIKDY mu nedáte podepsat smlouvu nebo diagnózu
              bez kontroly šéfa.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 39 — MythBusted M04 (15690–15780) */}
      <Sequence from={15690} durationInFrames={90}>
        <MythBustedCard
          number="04"
          subtitle="Pravda závisí na use case — vždy ověřuj"
        />
      </Sequence>

      {/* ═══ MÝTUS 5 — "AI myslí jako člověk" (15780–18930) ═══ */}

      {/* Scéna 40 — ChapterCard M05 (15780–15870) */}
      <Sequence from={15780} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="05"
            title="AI rozumí tomu co říká – myslí jako člověk"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 41 — PRO list (15870–16320) */}
      <Sequence from={15870} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "AI vede souvislé konverzace a pamatuje si kontext",
            "Odpovídá logicky a s emocí",
            "Bing chatbot (2023): prohlásil, že 'chce být živý' a žádal novináře, aby opustil manželku",
            "Character.AI boti vytvářeli emocionální vazby s uživateli",
          ]}
        />
      </Sequence>

      {/* Scéna 42 — CON list (16320–16770) */}
      <Sequence from={16320} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "LLM jsou statistické modely – predikují nejpravděpodobnější další slovo",
            "Nemají vědomí, záměr ani porozumění",
            "AI nemá subjektivní zkušenost, bolest, radost ani motivaci",
            "Replika chatbot 'přítelkyně' vedla muže k útoku na Windsor Castle",
          ]}
        />
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="LLM"
            definition="Large Language Model: velký jazykový model trénovaný na textech"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 43 — ExplainerSlide jak LLM funguje (16770–17970, 40s) */}
      <Sequence from={16770} durationInFrames={1200}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text='Když napíšete "Hlavní město Francie je..." — model doplní "Paříž" ne proto, že ví co je Francie, ale protože tato slova v datech takto následovala.' />
            }
            bottomText={
              <KeyPoints
                heading="Jak LLM funguje:"
                points={[
                  "Vezme vstupní text (prompt)",
                  "Na základě miliard textů vypočítá pravděpodobnost dalšího slova",
                  "Vybere slovo a opakuje — velmi sofistikovaný autocomplete",
                  "Výsledek působí inteligentně, ale bez porozumění ani vědomí",
                ]}
              />
            }
          />
        </FadeTransition>
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="Transformer"
            definition="Architektura za ChatGPT, Claude a dalšími jazykovými modely"
          />
        </Sequence>
        <Sequence from={330} durationInFrames={90}>
          <DefOverlay
            term="Token"
            definition="Jednotka textu kterou AI zpracovává (~4 znaky nebo 0,75 slova)"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 44 — Screenshot Bing chatbot (17970–18270) */}
      <Sequence from={17970} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Bing chatbot 'I want to be alive' — virální konverzace 2023" />
      </Sequence>

      {/* Scéna 45 — Screenshot dokumentace (18270–18570) */}
      <Sequence from={18270} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: OpenAI / Anthropic dokumentace — 'language model' ne 'thinking machine'" />
      </Sequence>

      {/* Scéna 46 — AnalogyVisual kalkulačka (18570–18840) */}
      <Sequence from={18570} durationInFrames={270}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "Kalkulačka (2+2=4)", icon: "calculator" }}
              right={{ label: "Nerozumí matematice", icon: "x-circle" }}
              relation="≈"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              AI je jako kalkulačka. Spočítá 2+2=4 perfektně. Ale
              &apos;rozumí&apos; matematice? Ne. Sleduje pravidla. AI je totéž,
              jen s jazykem místo čísel.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 47 — MythBusted M05 (18840–18930) */}
      <Sequence from={18840} durationInFrames={90}>
        <MythBustedCard
          number="05"
          subtitle="LLM = sofistikovaný autocomplete, ne myslící stroj"
        />
      </Sequence>

      {/* ═══ MÝTUS 6 — "AI potřebuje vždy internet" (18930–22320) ═══ */}

      {/* Scéna 48 — ChapterCard M06 (18930–19020) */}
      <Sequence from={18930} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard number="06" title="AI potřebuje vždy internet" />
        </FadeTransition>
      </Sequence>

      {/* Scéna 49 — PRO list (19020–19470) */}
      <Sequence from={19020} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "ChatGPT, Claude, Gemini – všechno běží v cloudu",
            "Modely mají stovky miliard parametrů – na laptop se nevejdou",
            "Potřebujete GPU servery za miliony",
          ]}
        />
      </Sequence>

      {/* Scéna 50 — CON list (19470–19920) */}
      <Sequence from={19470} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "Ollama: open-source, instalace za 3 minuty, kompletně offline",
            "Llama 3.2 8B: běží na 16 GB RAM, kvalita ~85–90 % ChatGPT-4 pro běžné úkoly",
            "Mistral 7B: 4,1 GB, běží i na 8 GB RAM",
            "Apple Silicon (M1/M2/M3/M4): unified memory = AI výrazně rychleji",
            "Ollama: přes 95 000 stars na GitHubu (2025)",
          ]}
        />
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="Ollama"
            definition="Software pro spuštění AI modelů lokálně bez internetu"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 51 — DoVsDont offline vs online (19920–21120, 40s) */}
      <Sequence from={19920} durationInFrames={1200}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 100px",
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 32,
                color: colors.purple[50],
                textAlign: "center" as const,
              }}
            >
              Co AI zvládne offline vs online
            </div>
            <DoVsDont
              dos={[
                "Základní texty a překlady (Ollama)",
                "Kódování a debugging",
                "Sumarizace dokumentů",
                "Brainstorming a analýza",
                "Citlivá data (GDPR, interní dokumenty)",
              ]}
              donts={[
                "Nejnovější informace a web search",
                "Nejsložitější reasoning úkoly",
                "Generování obrázků (DALL-E, Midjourney)",
                "Multimodální úkoly (video, audio)",
                "Maximální kvalita odpovědí",
              ]}
              style={{ width: "100%", maxWidth: 1400 }}
            />
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 52 — Screenshot Ollama GitHub (21120–21420) */}
      <Sequence from={21120} durationInFrames={300}>
        <ScreenPlaceholder
          url="github.com/ollama/ollama"
          label="Zdroj: Ollama GitHub — 95 000+ stars (2025)"
        />
      </Sequence>

      {/* Scéna 53 — Screenshot LM Studio (21420–21720) */}
      <Sequence from={21420} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: LM Studio — rozhraní pro lokální AI modely" />
      </Sequence>

      {/* Scéna 54 — Screenshot Ollama offline demo (21720–22020) */}
      <Sequence from={21720} durationInFrames={300}>
        <ScreenPlaceholder label="Ukázka: Ollama offline — Wi-Fi vypnuto, AI odpovídá" />
      </Sequence>

      {/* Scéna 55 — AnalogyVisual laptop bez internetu (22020–22230) */}
      <Sequence from={22020} durationInFrames={210}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "Laptop na chatě bez internetu", icon: "laptop" }}
              right={{ label: "AI funguje offline", icon: "check-circle" }}
              relation="→"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              Lokální AI = pro každého kdo pracuje bez připojení nebo s
              citlivými daty.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 56 — MythBusted M06 (22230–22320) */}
      <Sequence from={22230} durationInFrames={90}>
        <MythBustedCard
          number="06"
          subtitle="Lokální AI funguje offline — Ollama zdarma"
        />
      </Sequence>

      {/* ═══ MÝTUS 7 — "Stačí zadat prompt a AI udělá vše napoprvé" (22320–25710) ═══ */}

      {/* Scéna 57 — ChapterCard M07 (22320–22410) */}
      <Sequence from={22320} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="07"
            title="Stačí zadat prompt a AI udělá vše perfektně napoprvé"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 58 — PRO list (22410–22860) */}
      <Sequence from={22410} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "AI rozumí přirozenému jazyku — stačí říct co chcete",
            "Demo videa AI agentů ukazují magické výsledky na první pokus",
            "GPT-4 a Claude jsou tak chytré, že dotazy pochopí samy",
          ]}
        />
      </Sequence>

      {/* Scéna 59 — CON list (22860–23310) */}
      <Sequence from={22860} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "Kvalita výstupu přímo závisí na kvalitě vstupu",
            "Prompt engineering je reálná dovednost",
            "Stejný dotaz formulovaný různě dá drasticky odlišné výsledky",
            "Bez kontextu, struktury a iterace jsou výstupy generické",
          ]}
        />
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="Prompt"
            definition="Textový vstup a instrukce pro AI — kvalita vstupu určuje kvalitu výstupu"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 60 — ExplainerSlide prompt engineering (23310–24510, 40s) */}
      <Sequence from={23310} durationInFrames={1200}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="AI je jako Google – obrovský rozdíl mezi tím, kdo umí googlit a kdo ne." />
            }
            bottomText={
              <KeyPoints
                heading="Klíčové principy prompt engineeringu:"
                points={[
                  "Kontext — Kdo jsi, pro koho, jaká situace",
                  "Specifičnost — Co přesně chceš a v jakém formátu",
                  "Příklady — Ukaž AI co chceš (few-shot learning)",
                  "Iterace — První výstup je draft, ne finální verze",
                  "Role — 'Jsi zkušený copywriter s 10 lety praxe'",
                ]}
              />
            }
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 61 — Screenshot špatný vs dobrý prompt (24510–24810) */}
      <Sequence from={24510} durationInFrames={300}>
        <ScreenPlaceholder label="Ukázka: Špatný vs dobrý prompt — side by side v Claude/ChatGPT" />
      </Sequence>

      {/* Scéna 62 — Screenshot iterace promptu (24810–25110) */}
      <Sequence from={24810} durationInFrames={300}>
        <ScreenPlaceholder label="Ukázka: Iterace — 3 kola zpřesnění, výsledek se zlepšuje" />
      </Sequence>

      {/* Scéna 63 — Screenshot Anthropic docs (25110–25410) */}
      <Sequence from={25110} durationInFrames={300}>
        <ScreenPlaceholder
          url="docs.anthropic.com"
          label="Zdroj: Anthropic Prompt Engineering Dokumentace"
        />
      </Sequence>

      {/* Scéna 64 — AnalogyVisual vague vs precise prompt (25410–25620) */}
      <Sequence from={25410} durationInFrames={210}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: '"Udělej něco"', icon: "question" }}
              right={{
                label:
                  '"Tabulka Excel: tržby Q1–Q4, sloupce: měsíc/tržby/náklady/marže"',
                icon: "check",
              }}
              relation="vs"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              Čím přesněji řeknete co chcete, tím lepší výsledek dostanete.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 65 — MythBusted M07 (25620–25710) */}
      <Sequence from={25620} durationInFrames={90}>
        <MythBustedCard
          number="07"
          subtitle="Prompt engineering = klíčová dovednost pro rok 2025"
        />
      </Sequence>

      {/* ═══ MÝTUS 8 — "Implementace AI trvá měsíce nebo roky" (25710–29190) ═══ */}

      {/* Scéna 66 — ChapterCard M08 (25710–25800) */}
      <Sequence from={25710} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="08"
            title="Implementace AI trvá měsíce nebo roky"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 67 — PRO list (25800–26250) */}
      <Sequence from={25800} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "Enterprise AI nasazení: 12–18 měsíců",
            "Custom vývoj: 8–15 měsíců do ROI",
            "Gartner: firmy potřebují data readiness, infrastrukturu, change management",
            "Pilotní projekty: 1 týden assessment + 3–4 měsíce ladění",
          ]}
        />
      </Sequence>

      {/* Scéna 68 — CON list (26250–26700) */}
      <Sequence from={26250} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "ChatGPT účet: 5 minut registrace, okamžitě funkční",
            "AI chatbot (Tidio, Crisp): nasazení za odpoledne",
            "N8N / Make.com automatizace: funkční workflow za den",
            "SaaS AI nástroje: zero-code, plug-and-play",
            "E-commerce AI reklama: ROI do 4–8 týdnů",
          ]}
        />
        <Sequence from={0} durationInFrames={90}>
          <DefOverlay
            term="N8N / Make"
            definition="Automatizační platformy (no-code) pro propojení aplikací a AI"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 69 — TimelineGrid (26700–28200, 50s) */}
      <Sequence from={26700} durationInFrames={1500}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 40px 100px",
              gap: 28,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.display,
                fontSize: 38,
                background: gradients.logoText,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textAlign: "center" as const,
              }}
            >
              Klíč: Začněte MALÝMI a RYCHLÝMI kroky.
            </div>
            <TimelineGrid />
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 70 — Screenshot chatbot za 5 minut (28200–28500) */}
      <Sequence from={28200} durationInFrames={300}>
        <ScreenPlaceholder label="Ukázka: Od nuly k fungujícímu AI chatbotu za 5 minut" />
      </Sequence>

      {/* Scéna 71 — Screenshot N8N workflow (28500–28800) */}
      <Sequence from={28500} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Make.com / N8N — ukázka hotového workflow" />
      </Sequence>

      {/* Scéna 72 — AnalogyVisual big bang vs start small (28800–29100) */}
      <Sequence from={28800} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{
                label: "Big Bang projekt 18 měsíců",
                icon: "clock-countdown",
              }}
              right={{ label: "Start small → Scale fast", icon: "rocket" }}
              relation="vs"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              Nepotřebujete velký projekt. Začněte s jedním procesem, ověřte
              hodnotu, pak škálujte.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 73 — MythBusted M08 (29100–29190) */}
      <Sequence from={29100} durationInFrames={90}>
        <MythBustedCard
          number="08"
          subtitle="Do 1 dne: ChatGPT | Do 1 týdne: chatbot | Start small"
        />
      </Sequence>

      {/* ═══ MÝTUS 9 — "AI chatbot = skvělý zákaznický servis" (29190–33930) ═══ */}

      {/* Scéna 74 — ChapterCard M09 (29190–29280) */}
      <Sequence from={29190} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="09"
            title="AI chatbot = automaticky skvělý zákaznický servis"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 75 — PRO list (29280–29730) */}
      <Sequence from={29280} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "Gartner: interakce s lidským agentem ~$8, chatbot ~$0,10",
            "IBM: AI může snížit náklady na zákaznický servis až o 30 %",
            "24/7 dostupnost, okamžité odpovědi, škálovatelnost",
            "Gartner predikce: do 2027 AI vyřeší 70 % interakcí",
          ]}
        />
      </Sequence>

      {/* Scéna 76 — DoVsDont horror stories (29730–30630, 30s) */}
      <Sequence from={29730} durationInFrames={900}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 100px",
              gap: 20,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                color: colors.semantic.error,
                letterSpacing: 3,
                textTransform: "uppercase" as const,
                fontWeight: fontWeight.bodyEmphasis,
              }}
            >
              Reality check — AI chatbot fails
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column" as const,
                gap: 14,
                width: "100%",
                maxWidth: 1340,
              }}
            >
              {[
                "Klarna: AI místo 700 agentů → spokojenost klesla → museli znovu nabírat",
                "DPD: AI chatbot nadával zákazníkovi + napsal báseň jak je DPD nejhorší",
                "Air Canada: Chatbot slíbil refund který neexistoval → soud ho uznal jako závazný",
                "Chevrolet dealer: AI souhlasil s prodejem Chevy Tahoe za $1 jako legally binding",
                "McDonald's: AI drive-through objednalo 2 000 nuggetů místo 2",
                "NYC: Městský AI chatbot radil porušovat zákon",
                "Qualtrics 2026: AI zákaznický servis selhává 4× častěji než jiné AI use cases",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 20,
                    fontWeight: fontWeight.body,
                    color: colors.purple[100],
                    lineHeight: 1.4,
                    paddingLeft: 24,
                    borderLeft: `3px solid ${colors.semantic.error}`,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 77 — ExplainerSlide 3-tier model (30630–32430, 60s) */}
      <Sequence from={30630} durationInFrames={1800}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="AI chatbot NENÍ zákaznický servis. Je to SOUČÁST zákaznického servisu." />
            }
            bottomText={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontWeight: fontWeight.heading,
                    fontSize: 26,
                    color: colors.purple[50],
                  }}
                >
                  3-Tier model zákaznického servisu:
                </div>
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 19,
                    color: colors.purple[100],
                    lineHeight: 1.4,
                  }}
                >
                  <strong style={{ color: colors.semantic.success }}>
                    Tier 1 — AI:
                  </strong>{" "}
                  FAQ, status objednávky (~60–70 % dotazů)
                </div>
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 19,
                    color: colors.purple[100],
                    lineHeight: 1.4,
                  }}
                >
                  <strong style={{ color: colors.blue[400] }}>
                    Tier 2 — AI + Člověk:
                  </strong>{" "}
                  chatbot připraví kontext, předá agentovi
                </div>
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 19,
                    color: colors.purple[100],
                    lineHeight: 1.4,
                  }}
                >
                  <strong style={{ color: colors.semantic.error }}>
                    Tier 3 — Člověk:
                  </strong>{" "}
                  reklamace, stížnosti, emocionální situace, VIP
                </div>
              </div>
            }
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 78 — Screenshot DPD chatbot (32430–32730) */}
      <Sequence from={32430} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: DPD chatbot — báseň o tom jak je DPD nejhorší" />
      </Sequence>

      {/* Scéna 79 — Screenshot Chevy Tahoe (32730–33030) */}
      <Sequence from={32730} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Chevy Tahoe za $1 — screenshot konverzace" />
      </Sequence>

      {/* Scéna 80 — Screenshot Qualtrics (33030–33330) */}
      <Sequence from={33030} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Qualtrics 2026 CX Trends — AI selhává 4× více" />
      </Sequence>

      {/* Scéna 81 — StatCard KPI grid (33330–33630) */}
      <Sequence from={33330} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 100px",
              gap: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 32,
                justifyContent: "center",
              }}
            >
              {[
                { stat: "60–70 %", label: "dotazů zvládne AI (Tier 1)" },
                { stat: "4×", label: "vyšší selhání AI CS vs jiné use cases" },
                { stat: "1 z 5", label: "zákazníků neviděl žádný přínos" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: gradients.card,
                    border: `1px solid ${colors.purple[600]}44`,
                    borderRadius: 16,
                    padding: "40px 48px",
                    minWidth: 320,
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.primary,
                      fontWeight: fontWeight.display,
                      fontSize: 64,
                      background: gradients.logoText,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.stat}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.primary,
                      fontSize: 20,
                      fontWeight: fontWeight.body,
                      color: colors.purple[200],
                      textAlign: "center" as const,
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 82 — AnalogyVisual recepční vs manažer (33630–33840) */}
      <Sequence from={33630} durationInFrames={210}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <AnalogyVisual
              left={{ label: "AI chatbot = recepční", icon: "chat-text" }}
              right={{
                label: "Komplexní reklamace = manažer",
                icon: "user-gear",
              }}
              relation="+"
            />
            <p
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
                maxWidth: 1100,
                margin: 0,
              }}
            >
              AI chatbot je jako recepční. Skvělý na nasměrování a jednoduché
              dotazy. Ale komplikovaná reklamace → potřebujete manažera.
            </p>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 83 — MythBusted M09 (33840–33930) */}
      <Sequence from={33840} durationInFrames={90}>
        <MythBustedCard
          number="09"
          subtitle="AI chatbot = Tier 1. Vždy mějte Tier 3 — živého člověka."
        />
      </Sequence>

      {/* ═══ MÝTUS 10 — "AI je příliš složitá pro běžného člověka" (33930–37710) ═══ */}

      {/* Scéna 84 — ChapterCard M10 (33930–34020) */}
      <Sequence from={33930} durationInFrames={90}>
        <FadeTransition>
          <ChapterCard
            number="10"
            title="AI je příliš složitá na pochopení pro běžného člověka"
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 85 — PRO list (34020–34470) */}
      <Sequence from={34020} durationInFrames={450}>
        <SideList
          heading="Co říkají zastánci mýtu (PRO)"
          side="pro"
          items={[
            "AI je postavená na složité matematice (transformery, attention mechanismy)",
            "Terminologie je nepřístupná: LLM, RAG, fine-tuning, embeddings, tokens...",
            "Tech firmy používají záměrně složitý jazyk",
            "Vývoj AI vyžaduje Python, machine learning, statistiku",
          ]}
        />
        <Sequence from={80} durationInFrames={90}>
          <DefOverlay
            term="Fine-tuning"
            definition="Dotrénování AI modelu na specifická data organizace"
          />
        </Sequence>
        <Sequence from={230} durationInFrames={90}>
          <DefOverlay
            term="Embedding"
            definition="Převod textu na čísla pro vyhledávání a porovnávání"
          />
        </Sequence>
        <Sequence from={360} durationInFrames={90}>
          <DefOverlay
            term="Context window"
            definition="Kolik textu AI 'vidí' a zpracovává najednou"
          />
        </Sequence>
      </Sequence>

      {/* Scéna 86 — CON list (34470–34920) */}
      <Sequence from={34470} durationInFrames={450}>
        <SideList
          heading="Co říkají odpůrci mýtu (PROTI)"
          side="con"
          items={[
            "ChatGPT používají miliony lidí bez technického vzdělání",
            "55 % amerických malých firem (netechničtí majitelé) aktivně používá AI",
            "V 2025 existuje masivní ekosystém no-code AI nástrojů",
            "82 % malých firem věří, že AI je nezbytná pro konkurenceschopnost",
          ]}
        />
      </Sequence>

      {/* Scéna 87 — ExplainerSlide 3 úrovně (34920–36420, 50s) */}
      <Sequence from={34920} durationInFrames={1500}>
        <FadeTransition>
          <ExplainerSlide
            topContent={
              <BigQuote text="Nepotřebujete rozumět tomu, JAK motor funguje, abyste mohli řídit auto." />
            }
            bottomText={
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  maxWidth: 1300,
                }}
              >
                {[
                  {
                    title: "Úroveň 1 — Uživatel",
                    color: colors.semantic.success,
                    desc: "Napsat prompt, zkontrolovat výstup, vědět kdy AI (ne)důvěřovat",
                    time: "Čas: HODINY",
                  },
                  {
                    title: "Úroveň 2 — Power User",
                    color: colors.blue[400],
                    desc: "Šablony a workflow, napojení AI na systémy (N8N, Make), RAG, system prompt",
                    time: "Čas: dny až týdny",
                  },
                  {
                    title: "Úroveň 3 — Developer",
                    color: colors.purple[600],
                    desc: "Custom řešení s API, fine-tuning modelů, architektura",
                    time: "Čas: měsíce",
                  },
                ].map((lvl, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: colors.navy[800],
                      borderTop: `3px solid ${lvl.color}`,
                      borderRadius: 12,
                      padding: "22px 24px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 13,
                        color: lvl.color,
                        letterSpacing: 2,
                        textTransform: "uppercase" as const,
                        marginBottom: 10,
                      }}
                    >
                      {lvl.title}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.primary,
                        fontSize: 17,
                        fontWeight: fontWeight.body,
                        color: colors.purple[100],
                        lineHeight: 1.45,
                        marginBottom: 10,
                      }}
                    >
                      {lvl.desc}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 14,
                        color: lvl.color,
                        fontWeight: fontWeight.bodyEmphasis,
                      }}
                    >
                      {lvl.time}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </FadeTransition>
      </Sequence>

      {/* Scéna 88 — AnimatedBarChart úrovně (36420–36720) */}
      <Sequence from={36420} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 32,
                color: colors.purple[50],
              }}
            >
              % lidí na každé úrovni porozumění AI
            </div>
            <AnimatedBarChart
              data={[
                { label: "Úroveň 1 — Uživatel", value: 95 },
                { label: "Úroveň 2 — Power User", value: 4 },
                { label: "Úroveň 3 — Developer", value: 1, highlight: true },
              ]}
              maxValue={100}
              width={900}
              height={480}
            />
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 89 — Screenshot PayPal/Reimagine (36720–37020) */}
      <Sequence from={36720} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: PayPal / Reimagine Main Street — 82 % SMB: AI nezbytná" />
      </Sequence>

      {/* Scéna 90 — Screenshot no-code nástroje (37020–37320) */}
      <Sequence from={37020} durationInFrames={300}>
        <ScreenPlaceholder label="Zdroj: Make.com / Tidio / Jasper — ukázka no-code AI nástrojů" />
      </Sequence>

      {/* Scéna 91 — BeforeAfterSlider Excel (37320–37620) */}
      <Sequence from={37320} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 36,
                color: colors.purple[50],
                textAlign: "center" as const,
              }}
            >
              AI 2025 = Excel 1985. Stačí Úroveň 1.
            </div>
            <BeforeAfterSlider
              before={
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: colors.navy[800],
                    padding: 40,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.primary,
                      fontWeight: fontWeight.display,
                      fontSize: 32,
                      color: colors.purple[200],
                      textAlign: "center" as const,
                    }}
                  >
                    Excel 1985
                    <br />
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: fontWeight.body,
                        color: colors.purple[300],
                      }}
                    >
                      Jednoduché buňky, základní vzorce
                    </span>
                  </div>
                </div>
              }
              after={
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: colors.navy[700],
                    padding: 40,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.primary,
                      fontWeight: fontWeight.display,
                      fontSize: 32,
                      background: gradients.logoText,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textAlign: "center" as const,
                    }}
                  >
                    AI 2025
                    <br />
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: fontWeight.body,
                        color: colors.purple[300],
                        WebkitTextFillColor: colors.purple[300],
                      }}
                    >
                      Pokročilé funkce pro specialisty
                    </span>
                  </div>
                </div>
              }
              width={1200}
              height={400}
            />
            <div
              style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: fontWeight.body,
                color: colors.purple[100],
                textAlign: "center" as const,
              }}
            >
              Většina lidí zvládá jen základy Excelu — a je to NAPROSTO
              DOSTAČUJÍCÍ. S AI je to totéž.
            </div>
            <WebcamPlaceholder />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      {/* Scéna 92 — MythBusted M10 (37620–37710) */}
      <Sequence from={37620} durationInFrames={90}>
        <MythBustedCard
          number="10"
          subtitle="95 % lidí potřebuje Úroveň 1 — naučíš se za odpoledne"
        />
      </Sequence>

      {/* ═══ OUTRO (37710–38160) ════════════════════════════════════════ */}

      {/* Scéna 93 — EndScreen (37710–38160, 15s) */}
      <Sequence from={37710} durationInFrames={450}>
        <FadeTransition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 80px 80px",
              gap: 32,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.display,
                fontSize: 44,
                color: colors.purple[50],
                textAlign: "center" as const,
                maxWidth: 1300,
                lineHeight: 1.25,
              }}
            >
              AI není ani zázrak, ani podvod. Je to nástroj. A jako s každým
              nástrojem záleží na tom, kdo ho drží a jak ho používá.
            </div>
            <EndScreen
              thanks="Pokud vás tohle video bavilo — dejte odběr a zvoneček!"
              showNextFrame
            />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>
    </PrautVideoFrame>
  );
};
