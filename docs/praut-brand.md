# Praut Brand Mapping Manual
## Jak převést Remotion komponenty do Praut Visual Booku

> Tento dokument říká **jak mechanicky převést libovolnou komponentu** ze 15 kategorií do brand stylu, místo aby každou komponentu řešil tým ručně. Princip: jeden zdroj pravdy (`tokens.ts`) + sada univerzálních pravidel + per-kategorie mapování.

---

## 1. ZDROJ PRAVDY — `src/styles/tokens.ts`

Tohle je jediný soubor, který obsahuje brand. Žádná komponenta nesmí mít hardcoded hex kód, font ani spring config — vždy importuje odsud. Pokud designér změní brand, mění se jen tento soubor.

```ts
// src/styles/tokens.ts
// Praut Visual Book v3.0 — single source of truth

export const colors = {
  // Navy pozadí (60% pravidlo)
  navy: {
    950: '#060818', // video frame bg — NEJTMAVŠÍ
    900: '#0a0e2e', // slide content bg
    800: '#0f1440', // card base
    700: '#141a52', // card highlighted
    600: '#1a2266',
    500: '#222c85',
  },
  // Blue akcent — border, logo mark, linky
  blue: {
    400: '#506FFB', // PRIMÁRNÍ frame border + logo mark
    500: '#3B4EF0',
    700: '#283487',
    900: '#181E4E',
  },
  // Purple akcent (10% pravidlo) — CTA, glow, dekor
  purple: {
    50:  '#FAF5FF', // headings
    100: '#F2E7FF',
    200: '#E4CFFF', // body text
    300: '#D6B0FF', // ikony, sekundární text
    400: '#BC7EFF', // dekor only (NE jako text!)
    600: '#8D2AF3', // MAIN CTA
    700: '#7520CC',
    800: '#55178C',
  },
  // Sémantika
  semantic: {
    success: '#34D399',
    warning: '#FBBF24',
    error:   '#F87171',
    info:    '#506FFB',
  },
  // Logo gradient (text)
  logoText: 'linear-gradient(135deg, #9FBFFF 0%, #D6B0FF 100%)',
} as const;

export const gradients = {
  logoText:    'linear-gradient(135deg, #9FBFFF 0%, #D6B0FF 100%)',
  brandPrimary:'linear-gradient(135deg, #8D2AF3 0%, #3B4EF0 100%)',
  brandWide:   'linear-gradient(135deg, #BC7EFF 0%, #8D2AF3 50%, #3B4EF0 100%)',
  dark:        'linear-gradient(145deg, #0a0e2e 0%, #141a52 100%)',
  card:        'linear-gradient(145deg, #0f1440 0%, #141a52 100%)',
  topBarFade:  'linear-gradient(180deg, rgba(6,8,24,0.92) 0%, rgba(6,8,24,0.6) 60%, transparent 100%)',
} as const;

export const fonts = {
  primary: '"Montserrat", sans-serif',
  mono:    '"IBM Plex Mono", monospace',
} as const;

// NIKDY weight < 500 na dark mode
export const fontWeight = {
  body: 500,
  bodyEmphasis: 600,
  heading: 700,
  display: 800,
} as const;

export const typeScale = {
  display: { size: 48, font: fonts.primary, weight: 800, color: '#FAF5FF' },
  h1:      { size: 36, font: fonts.primary, weight: 700, color: '#FAF5FF' },
  h2:      { size: 28, font: fonts.primary, weight: 700, color: '#FAF5FF' },
  h3:      { size: 22, font: fonts.primary, weight: 600, color: '#E4CFFF' },
  body:    { size: 18, font: fonts.primary, weight: 500, color: '#E4CFFF' },
  small:   { size: 14, font: fonts.primary, weight: 500, color: '#D6B0FF' },
  caption: { size: 12, font: fonts.mono,    weight: 400, color: '#D6B0FF' },
  episode: { size: 12, font: fonts.mono,    weight: 400, color: '#E4CFFF' },
} as const;

export const frame = {
  width: 1920,
  height: 1080,
  topBarHeight: 48,
  sidePadding: 14,
  bottomPadding: 14,
  borderWidth: 1.5,
  borderColor: '#506FFB',
  borderRadius: 4,
  bg: '#060818',
} as const;

// ❌ ŽÁDNÉ drop-shadows na dark mode — jen glow
export const glow = {
  active:  '0 0 18px rgba(80,111,251,0.3), 0 0 4px rgba(80,111,251,0.12)',
  cta:     '0 4px 24px rgba(141,42,243,0.5)',
  ctaHover:'0 6px 32px rgba(141,42,243,0.65)',
  subtle:  '0 2px 16px rgba(141,42,243,0.3)',
  card:    '0 0 0 1px rgba(141,42,243,0.18)',
} as const;

// Spring přesety — sjednocený rytmus napříč videi
export const springs = {
  smooth:  { damping: 200, stiffness: 100, mass: 0.8 },
  bouncy:  { damping: 12,  stiffness: 100, mass: 0.5 },
  snappy:  { damping: 200, stiffness: 300, mass: 0.5 },
  gentle:  { damping: 30,  stiffness: 80,  mass: 1.0 },
} as const;

// Standardní timing (frames @ 30fps)
export const timing = {
  instant: 6,    // 0.2s
  fast:    12,   // 0.4s
  medium:  24,   // 0.8s
  slow:    45,   // 1.5s
  reveal:  60,   // 2.0s
} as const;
```

---

## 2. PĚT UNIVERZÁLNÍCH PRAVIDEL

Tato pravidla platí pro **každou** komponentu bez výjimky. Když je tým dodrží, automaticky výstup ladí s brandem.

### Pravidlo 1 — Pozadí vždy z Navy škály

Žádný `#000`, žádný `#fff`, žádný šedý gray-X. Pozadí komponenty (karta, panel, modal) jde vždy z `colors.navy.X` nebo `gradients.dark` / `gradients.card`.

```tsx
// ❌ ŠPATNĚ
<div style={{ background: '#1a1a1a' }} />

// ✅ SPRÁVNĚ
<div style={{ background: colors.navy[800] }} />
```

### Pravidlo 2 — Text minimum weight 500, barva z purple škály

Tělový text nikdy nepoužívá Regular ani Light. A barva je vždy purple-50/200/300, nikdy `#fff` ani `#ccc`.

```tsx
// ❌ ŠPATNĚ
<p style={{ color: '#fff', fontWeight: 400 }}>Text</p>

// ✅ SPRÁVNĚ
<p style={{ color: colors.purple[200], fontWeight: 500, fontFamily: fonts.primary }}>Text</p>
```

### Pravidlo 3 — Akcent jen Blue 400 (border/link/UI) nebo Purple 600 (CTA/highlight)

Když chceš něco zvýraznit, máš dvě barvy. Žádné oranžové, žádné růžové, žádné tyrkysové. Sémantické (success/warning/error) jen pro stavy.

```tsx
// Border kolem aktivního prvku
border: `${frame.borderWidth}px solid ${frame.borderColor}` // = 1.5px solid #506FFB

// CTA pozadí
background: gradients.brandPrimary
```

### Pravidlo 4 — Místo box-shadow používej glow

Drop shadow vypadá na dark mode jako špinavá fleška. Vždy `glow.active`, `glow.cta` nebo `glow.subtle`.

```tsx
// ❌ ŠPATNĚ
boxShadow: '0 4px 12px rgba(0,0,0,0.5)'

// ✅ SPRÁVNĚ
boxShadow: glow.active
```

### Pravidlo 5 — Animace jen přes `springs` a `timing` z tokens

Žádné magic numbers v `interpolate` ani `spring`. Tým importuje preset, který už má sjednocený damping/stiffness, takže celá série videí má stejný rytmus.

```tsx
// ❌ ŠPATNĚ
const opacity = spring({ frame, fps, config: { damping: 14, stiffness: 67 } });

// ✅ SPRÁVNĚ
const opacity = spring({ frame, fps, config: springs.smooth });
```

---

## 3. PER-KATEGORIE MAPOVÁNÍ

Pro každou ze 15 kategorií tabulka říká: **jaké tokeny použít defaultně**. Tým si u nové komponenty otevře tuhle tabulku a hned ví, čím komponentu vyplnit.

### 1. Frame & Layout
| Aspekt | Token |
|---|---|
| Hlavní bg | `frame.bg` (#060818) |
| Border | `1.5px solid colors.blue[400]` |
| Top bar bg | `gradients.topBarFade` |
| Slide content bg | `colors.navy[900]` |
| Aktivní rámeček | `glow.active` |
| Pasivní rámeček | `border: 1px solid rgba(80,111,251,0.25)`, bez glow |
| Padding | `frame.sidePadding` (14px) |

### 2. Typografie & text animace
| Komponenta | Token |
|---|---|
| `<DisplayHeading>` | `typeScale.display` |
| `<H1/H2/H3>` | `typeScale.h1/h2/h3` |
| `<BodyText>` | `typeScale.body` |
| `<MonoLabel>` | `typeScale.caption` (IBM Plex Mono) |
| `<GradientText>` | `gradients.logoText` přes `background-clip: text` |
| `<HighlightedText>` glow | `glow.subtle` na zvýrazněném slově |
| `<TypewriterText>` cursor | `colors.blue[400]` blikající bar |
| `<GlitchText>` barvy | RGB split: red kanál + `colors.blue[400]` + `colors.purple[600]` |

### 3. Chapter & Navigation
| Komponenta | Token |
|---|---|
| `<ChapterCard>` číslo kapitoly | `typeScale.display`, `gradients.logoText` |
| `<ProgressBar>` track | `colors.navy[700]` |
| `<ProgressBar>` fill | `gradients.brandPrimary` + `glow.subtle` |
| `<SectionDivider>` line | `colors.blue[400]`, opacity 0.5 |
| `<HookCard>` bg | `colors.navy[950]` + `gradients.brandWide` ve 20% opacity overlay |

### 4. Grafy & data vizualizace
| Aspekt | Token |
|---|---|
| Sérií 1 (primární) | `colors.purple[600]` |
| Sérií 2 | `colors.blue[400]` |
| Sérií 3 | `colors.purple[300]` |
| Sérií 4 | `colors.blue[500]` |
| Mřížka / axis | `colors.navy[700]` |
| Labely os | `typeScale.caption` |
| Hodnoty na sloupcích | `typeScale.small` |
| Highlight bar (winner) | `glow.cta` |

> **Pravidlo:** víc než 4 série v jednom grafu = znamení, že graf je špatně designovaný. Rozděl ho.

### 5. AI-specific vizualizace
| Komponenta | Token |
|---|---|
| `<NeuralNetwork>` neurony | `colors.navy[700]` (klid) → `colors.purple[600]` (aktivace) |
| Synapse | `colors.blue[400]`, opacity 0.4 |
| `<TransformerBlock>` boxy | `gradients.card`, border `colors.blue[400]` |
| `<AttentionMatrix>` heat | škála `colors.navy[800]` → `colors.purple[600]` |
| `<TokenizerView>` token chips | bg `colors.navy[700]`, text `colors.purple[100]` |
| `<RAGPipeline>` arrows | `colors.blue[400]` |
| `<RAGPipeline>` data flow | particle `colors.purple[300]` |
| `<AgentLoop>` aktivní krok | `glow.active` |

### 6. Code & terminal
| Aspekt | Token |
|---|---|
| Code bg | `colors.navy[900]` |
| Terminal bg | `colors.navy[950]` |
| Terminal dots | macOS native (red/yellow/green) |
| Code font | `fonts.mono`, weight 400 |
| Komentáře | `colors.purple[300]`, opacity 0.6 |
| Klíčová slova | `colors.purple[400]` |
| Stringy | `colors.semantic.success` |
| Čísla | `colors.blue[400]` |
| Cursor | `colors.blue[400]`, blink 30 frames |
| `<CodeDiff>` + řádek | bg `rgba(52,211,153,0.1)`, border-left `colors.semantic.success` |
| `<CodeDiff>` − řádek | bg `rgba(248,113,113,0.1)`, border-left `colors.semantic.error` |

### 7. Lists & enumerations
| Komponenta | Token |
|---|---|
| Číslo položky | `gradients.logoText` přes typeScale.display |
| `<TopTenCard>` #1 | `glow.cta`, bg `gradients.brandPrimary` |
| `<TopTenCard>` #2-#10 | bg `colors.navy[800]`, border `colors.blue[400]` |
| `<ChecklistAnimated>` checkbox check | `colors.semantic.success` + `glow.subtle` |
| `<ProsConsTable>` Pros | border-left `colors.semantic.success` |
| `<ProsConsTable>` Cons | border-left `colors.semantic.error` |
| `<MythVsFact>` Mýtus karta | border-left `colors.semantic.warning` |
| `<MythVsFact>` Pravda karta | border-left `colors.semantic.success` |

### 8. Cards & containers
| Komponenta | Token |
|---|---|
| `<GlowCard>` | bg `gradients.card`, border `colors.purple[600]/0.4`, `glow.subtle` |
| `<GlassCard>` | bg `rgba(15,20,64,0.6)`, backdrop-filter blur(20px), border `rgba(141,42,243,0.18)` |
| `<StatCard>` číslo | `gradients.logoText` přes typeScale.display |
| `<TipCard>` | border-left 4px `colors.semantic.warning` |
| `<WarningCard>` | border-left 4px `colors.semantic.warning` |
| `<InfoCard>` | border-left 4px `colors.blue[400]` |
| `<ErrorCard>` | border-left 4px `colors.semantic.error` |
| `<SuccessCard>` | border-left 4px `colors.semantic.success` |
| `<QuoteCard>` quote mark | `colors.purple[400]`, font Display 80px |

### 9. CTA & engagement
| Komponenta | Token |
|---|---|
| `<SubscribeButton>` | bg `gradients.brandPrimary`, `glow.cta`, hover `glow.ctaHover` |
| `<LikeAnimation>` palec | `colors.purple[600]` + `glow.subtle` při kliku |
| `<NextVideoCard>` border | `1.5px solid colors.blue[400]`, hover `glow.active` |
| `<NewsletterCTA>` input bg | `colors.navy[800]`, border `colors.blue[400]` |
| `<NewsletterCTA>` button | `gradients.brandPrimary` |

### 10. Transitions & effects
| Komponenta | Token |
|---|---|
| `<FadeTransition>` | `springs.smooth`, `timing.medium` |
| `<SlideTransition>` | `springs.snappy`, `timing.fast` |
| `<WipeTransition>` mask | `colors.purple[600]` přechod |
| `<GlitchTransition>` barvy | RGB split + `colors.blue[400]` |
| `<PuzzleAssemble>` dílky | barva loga (`#506FFB` s opacity 100/70/45/25%) |
| `<ParticleBurst>` particles | `colors.purple[300]` + `colors.blue[400]` mix |

### 11. Backgrounds & atmosphere
| Komponenta | Token |
|---|---|
| `<NavyBackground>` | `frame.bg` |
| `<GradientMesh>` | mix `colors.navy[900]`, `colors.purple[800]`, `colors.blue[900]` ve velmi nízké opacity |
| `<ParticleField>` particle | `colors.blue[400]`, opacity 0.3 |
| `<StarField>` | `colors.purple[100]`, opacity 0.4 |
| `<GridBackground>` | line `colors.blue[400]/0.1` |
| `<NoiseOverlay>` | grain opacity 0.03 |
| `<VignetteOverlay>` | radial-gradient od center transparent k `colors.navy[950]` |

### 12. Media & assets
| Komponenta | Token |
|---|---|
| `<ProcessedImage>` overlay | `linear-gradient(180deg, transparent, rgba(6,8,24,0.6))` (proti "přilepenosti") |
| `<RoundedScreenshot>` border-radius | `frame.borderRadius * 2` |
| `<RoundedScreenshot>` border + glow | `1.5px solid colors.blue[400]`, `glow.active` |
| `<BrowserMockup>` chrome | `colors.navy[800]` |
| `<PhoneMockup>` rámeček | `colors.navy[700]` |
| `<MacBookMockup>` body | `colors.navy[800]` |
| `<AvatarCircle>` border | `2px solid colors.blue[400]` |
| `<LogoCloud>` logo opacity | 0.6, hover 1.0 |

### 13. Educational patterns
| Komponenta | Token |
|---|---|
| `<DefinitionBox>` | `gradients.card`, border-left 4px `colors.purple[600]` |
| `<FormulaDisplay>` | `colors.purple[100]` text, KaTeX bg `transparent` |
| `<BeforeAfterSlider>` divider | `colors.blue[400]`, `glow.active` |
| `<FlowchartNode>` | `gradients.card`, border `colors.blue[400]` |
| `<MindMap>` central | bg `gradients.brandPrimary`, větve `colors.blue[400]` |
| `<DecisionTree>` aktivní větev | `glow.cta` |

### 14. Video templates
> Šablony nemají vlastní barvy — kompozují komponenty z 1–13. Pravidla zde:
- Každá šablona začíná `<PrautVideoFrame>`
- První 3 sekundy = `<HookCard>` bez top baru fade-in
- Outro = `<EndScreen>` s `<SubscribeButton>` + `<NextVideoCard>`
- Mezi kapitolami `<ChapterTransition>` (timing `springs.smooth`)
- Globální `<ProgressBar>` v dolním 4. pixelovém řádku safe area

### 15. Utilities & hooks
| Utility | Token |
|---|---|
| `springPreset` | importuje `springs` z `tokens.ts` |
| `easings` | jen 3 globální: `linear`, `Easing.out(Easing.cubic)`, `Easing.bezier(0.4, 0, 0.2, 1)` |
| `interpolateColors` | vždy mezi `colors.navy[X]` a `colors.purple[Y]` |
| `<WatermarkPraut>` | bottom-right, 14px padding, opacity 0.6, brain mark 20px + "PRAUT" caption |

---

## 4. PŘÍKLADY REWRITE — 6 reprezentativních komponent

Pro každou kategorii tady jeden ostrý příklad. Pokud tým pochopí vzor, ostatní komponenty z té samé kategorie přepíše stejnou logikou.

### Příklad A — `<GlowCard>` (kategorie 8: Cards)

```tsx
// src/components/cards/GlowCard.tsx
import { AbsoluteFill } from 'remotion';
import { colors, gradients, glow, frame } from '../../styles/tokens';

type Props = {
  children: React.ReactNode;
  padding?: number;
};

export const GlowCard: React.FC<Props> = ({ children, padding = 32 }) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${colors.purple[600]}66`, // 0.4 opacity
        borderRadius: frame.borderRadius * 3,        // 12px
        padding,
        boxShadow: glow.subtle,                      // ✅ glow, ne shadow
      }}
    >
      {children}
    </div>
  );
};
```

**Co se změnilo proti generické verzi:** `background` z `gradients`, border z `colors.purple[600]`, místo `boxShadow: '0 4px 12px rgba(0,0,0,0.5)'` jde `glow.subtle`. Žádné magic numbers.

---

### Příklad B — `<AnimatedBarChart>` (kategorie 4: Grafy)

```tsx
// src/components/charts/AnimatedBarChart.tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors, fonts, fontWeight, springs, glow } from '../../styles/tokens';

type Bar = { label: string; value: number; highlight?: boolean };
type Props = {
  data: Bar[];
  maxValue?: number;
  width?: number;
  height?: number;
};

export const AnimatedBarChart: React.FC<Props> = ({
  data,
  maxValue,
  width = 1200,
  height = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  const barWidth = (width - (data.length - 1) * 24) / data.length;

  const SERIES_COLORS = [
    colors.purple[600],
    colors.blue[400],
    colors.purple[300],
    colors.blue[500],
  ];

  return (
    <svg width={width} height={height}>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          x2={width}
          y1={height * (1 - t)}
          y2={height * (1 - t)}
          stroke={colors.navy[700]}
          strokeWidth={1}
        />
      ))}

      {/* Bars */}
      {data.map((bar, i) => {
        // Stagger 6 frames mezi bary
        const localFrame = frame - i * 6;
        const progress = spring({
          frame: localFrame,
          fps,
          config: springs.smooth,
        });
        const barHeight = (bar.value / max) * height * progress;
        const color = bar.highlight ? colors.purple[600] : SERIES_COLORS[i % 4];

        return (
          <g key={bar.label}>
            <rect
              x={i * (barWidth + 24)}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx={6}
              filter={bar.highlight ? `drop-shadow(${glow.cta})` : undefined}
            />
            <text
              x={i * (barWidth + 24) + barWidth / 2}
              y={height - barHeight - 12}
              textAnchor="middle"
              fill={colors.purple[100]}
              fontFamily={fonts.primary}
              fontWeight={fontWeight.bodyEmphasis}
              fontSize={20}
              opacity={interpolate(localFrame, [12, 24], [0, 1], { extrapolateRight: 'clamp' })}
            >
              {bar.value}
            </text>
            <text
              x={i * (barWidth + 24) + barWidth / 2}
              y={height + 24}
              textAnchor="middle"
              fill={colors.purple[300]}
              fontFamily={fonts.mono}
              fontSize={14}
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
```

**Vzor pro ostatní grafy:** série barev jdou cyklicky z `SERIES_COLORS`, mřížka je `colors.navy[700]`, hodnoty mají `fonts.primary` weight 600, labely os `fonts.mono`. Highlight bar dostane `colors.purple[600]` + glow.

---

### Příklad C — `<TerminalWindow>` (kategorie 6: Code)

```tsx
// src/components/code/TerminalWindow.tsx
import { colors, fonts, frame } from '../../styles/tokens';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const TerminalWindow: React.FC<Props> = ({ title = 'praut@macbook ~ %', children }) => {
  return (
    <div
      style={{
        background: colors.navy[950],
        borderRadius: frame.borderRadius * 3,
        border: `1px solid ${colors.blue[400]}40`, // 0.25 opacity
        overflow: 'hidden',
        fontFamily: fonts.mono,
      }}
    >
      {/* macOS title bar */}
      <div
        style={{
          height: 36,
          background: colors.navy[800],
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
        <span
          style={{
            marginLeft: 16,
            fontSize: 12,
            color: colors.purple[300],
            fontFamily: fonts.mono,
          }}
        >
          {title}
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          padding: 24,
          color: colors.purple[100],
          fontSize: 18,
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
};
```

**Vzor pro `<CodeBlock>`, `<EditorWindow>`, `<JSONViewer>`:** stejný macOS chrome, jen místo terminálu dej VS Code-like tabs nebo JSON tree. Barvy syntax highlightu vždy z `colors.purple[400]` (keywords), `colors.semantic.success` (strings), `colors.blue[400]` (numbers).

---

### Příklad D — `<NeuralNetwork>` (kategorie 5: AI vizualizace)

```tsx
// src/components/ai-visuals/NeuralNetwork.tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors, springs, glow } from '../../styles/tokens';

type Props = {
  layers: number[];      // např. [4, 6, 6, 2]
  width?: number;
  height?: number;
};

export const NeuralNetwork: React.FC<Props> = ({ layers, width = 1200, height = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layerSpacing = width / (layers.length + 1);

  return (
    <svg width={width} height={height}>
      {/* Synapse */}
      {layers.slice(0, -1).map((count, layerIdx) => {
        const nextCount = layers[layerIdx + 1];
        const x1 = layerSpacing * (layerIdx + 1);
        const x2 = layerSpacing * (layerIdx + 2);
        const ySpacing1 = height / (count + 1);
        const ySpacing2 = height / (nextCount + 1);

        return Array.from({ length: count }).flatMap((_, i) =>
          Array.from({ length: nextCount }).map((_, j) => {
            const localFrame = frame - layerIdx * 8;
            const opacity = interpolate(localFrame, [0, 30], [0, 0.4], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <line
                key={`${layerIdx}-${i}-${j}`}
                x1={x1}
                y1={ySpacing1 * (i + 1)}
                x2={x2}
                y2={ySpacing2 * (j + 1)}
                stroke={colors.blue[400]}
                strokeWidth={1}
                opacity={opacity}
              />
            );
          }),
        );
      })}

      {/* Neurony */}
      {layers.map((count, layerIdx) => {
        const x = layerSpacing * (layerIdx + 1);
        const ySpacing = height / (count + 1);
        return Array.from({ length: count }).map((_, i) => {
          const localFrame = frame - layerIdx * 8 - i * 2;
          const activation = spring({ frame: localFrame, fps, config: springs.snappy });
          return (
            <circle
              key={`n-${layerIdx}-${i}`}
              cx={x}
              cy={ySpacing * (i + 1)}
              r={18}
              fill={colors.navy[700]}
              stroke={colors.purple[600]}
              strokeWidth={2 * activation}
              filter={activation > 0.5 ? `drop-shadow(${glow.subtle})` : undefined}
            />
          );
        });
      })}
    </svg>
  );
};
```

**Vzor pro ostatní AI vizualizace:** klid → aktivace přes `spring` se `springs.snappy`, glow při aktivaci, čáry vždy `colors.blue[400]`, uzly `colors.navy[700]` → `colors.purple[600]`.

---

### Příklad E — `<TopTenCard>` (kategorie 7: Lists)

```tsx
// src/components/lists/TopTenCard.tsx
import { colors, gradients, fonts, fontWeight, glow, frame } from '../../styles/tokens';

type Props = {
  rank: number;       // 1-10
  title: string;
  description?: string;
  isWinner?: boolean; // true pro #1
};

export const TopTenCard: React.FC<Props> = ({ rank, title, description, isWinner }) => {
  return (
    <div
      style={{
        background: isWinner ? gradients.brandPrimary : colors.navy[800],
        border: isWinner ? 'none' : `1.5px solid ${colors.blue[400]}`,
        borderRadius: frame.borderRadius * 4,
        padding: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        boxShadow: isWinner ? glow.cta : undefined,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 96,
          background: isWinner ? '#FAF5FF' : gradients.logoText,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          minWidth: 120,
          textAlign: 'center',
        }}
      >
        #{rank}
      </div>
      <div>
        <h3
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 36,
            color: '#FAF5FF',
            margin: 0,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: fonts.primary,
              fontWeight: fontWeight.body,
              fontSize: 18,
              color: colors.purple[200],
              marginTop: 8,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
```

---

### Příklad F — `<ChapterCard>` (kategorie 3: Chapter)

```tsx
// src/components/chapters/ChapterCard.tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { AbsoluteFill } from 'remotion';
import { colors, gradients, fonts, fontWeight, springs, frame } from '../../styles/tokens';

type Props = {
  number: string;     // "01", "02"
  title: string;
};

export const ChapterCard: React.FC<Props> = ({ number, title }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const numberProgress = spring({ frame: f, fps, config: springs.smooth });
  const titleProgress  = spring({ frame: f - 12, fps, config: springs.smooth });
  const lineProgress   = spring({ frame: f - 6, fps, config: springs.smooth });

  return (
    <AbsoluteFill style={{ background: colors.navy[950], justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 24,
          color: colors.purple[300],
          opacity: numberProgress,
          letterSpacing: 4,
        }}
      >
        KAPITOLA {number}
      </div>

      <div
        style={{
          width: interpolate(lineProgress, [0, 1], [0, 200]),
          height: 2,
          background: colors.blue[400],
          marginTop: 16,
          marginBottom: 24,
        }}
      />

      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 72,
          background: gradients.logoText,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          textAlign: 'center',
          maxWidth: 1400,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};
```

---

## 5. KONVERZNÍ POSTUP — jak tým převede existující komponentu

Když má tým generickou Remotion komponentu (z templatu, z internetu, z minulého projektu), projde ji **tímhle 8-bodovým checklistem**. Trvá to 2 minuty a komponenta je brand-correct.

1. **Importuj `tokens.ts`** nahoře. Nic jiného odjinud.
2. **Vyhledej všechny hex barvy** (`#`) — každou nahraď tokenem.
3. **Vyhledej všechny `fontFamily`** — nahraď `fonts.primary` nebo `fonts.mono`.
4. **Vyhledej všechny `fontWeight`** — nikdy < 500. Pokud byl 400, povýšit na 500.
5. **Vyhledej všechny `boxShadow`** — nahraď tokenem z `glow`.
6. **Vyhledej `background: '#000'`, `'#fff'`, `'gray'`** — odstraň, nahraď z `colors.navy.X`.
7. **Vyhledej `spring({ ..., config: { ... } })`** — nahraď konfig presetem ze `springs`.
8. **Otestuj v Remotion Studiu** na bg `colors.navy[950]` — pokud něco zmizí nebo bliká, kontrast je rozbitý.

---

## 6. TAILWIND PRESET (volitelné, pokud tým používá Tailwind)

Pokud tým používá `@remotion/tailwind-v4`, vlož brand do `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060818', 900: '#0a0e2e', 800: '#0f1440',
          700: '#141a52', 600: '#1a2266', 500: '#222c85',
        },
        blue: {
          400: '#506FFB', 500: '#3B4EF0', 700: '#283487', 900: '#181E4E',
        },
        purple: {
          50: '#FAF5FF', 100: '#F2E7FF', 200: '#E4CFFF',
          300: '#D6B0FF', 400: '#BC7EFF', 600: '#8D2AF3',
          700: '#7520CC', 800: '#55178C',
        },
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-active': '0 0 18px rgba(80,111,251,0.3), 0 0 4px rgba(80,111,251,0.12)',
        'glow-cta': '0 4px 24px rgba(141,42,243,0.5)',
        'glow-cta-hover': '0 6px 32px rgba(141,42,243,0.65)',
        'glow-subtle': '0 2px 16px rgba(141,42,243,0.3)',
      },
      backgroundImage: {
        'logo-text': 'linear-gradient(135deg, #9FBFFF 0%, #D6B0FF 100%)',
        'brand-primary': 'linear-gradient(135deg, #8D2AF3 0%, #3B4EF0 100%)',
        'brand-wide': 'linear-gradient(135deg, #BC7EFF 0%, #8D2AF3 50%, #3B4EF0 100%)',
        'card': 'linear-gradient(145deg, #0f1440 0%, #141a52 100%)',
      },
    },
  },
} satisfies Config;
```

Pak komponenty mohou používat třídy: `bg-navy-950`, `text-purple-200`, `font-primary`, `shadow-glow-active`, `bg-brand-primary`. Mechanika brandování je tím vyřešená i pro Tailwind workflow.

---

## 7. FINÁLNÍ PUBLIKAČNÍ CHECKLIST

Před exportem každého videa jeden člen týmu projde:

- [ ] Frame bg = `#060818`, žádný `#000`
- [ ] Border kolem safe area = 1.5px `#506FFB`
- [ ] Top bar má brain mark + "PRAUT" gradient + episode info
- [ ] Žádný text pod weight 500
- [ ] Žádný `#FFFFFF` (jen `#FAF5FF`)
- [ ] Body text barva z `purple-100/200/300`
- [ ] Žádný `box-shadow` s `rgba(0,0,0,…)` — všechny shadow jsou glow
- [ ] Akcent jen `blue.400` a `purple.600` (sémantické jen pro stavy)
- [ ] Spring configy z `springs` presetů
- [ ] Logo má safe zone min 1× šířka brain marku
- [ ] Watermark v bottom-right
- [ ] Scale-to-fit funguje, nic se neořezává
- [ ] Žádný hex kód jinde než v `tokens.ts`

---

## TL;DR pro tým

> **Tři věty, které vyřeší 90 % brand chyb:**
>
> 1. Importuj všechno z `tokens.ts`. Nikdy nepiš hex.
> 2. Pozadí navy, text purple-100/200/300, akcent blue-400 nebo purple-600. Glow místo shadow. Font weight ≥ 500.
> 3. Když nevíš, jakou barvu/spring použít, podívej se do tabulky kategorie v sekci 3 tohoto dokumentu.

