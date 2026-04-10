# Remotion Component Library pro Praut AI Channel

Sestavil jsem kompletní katalog komponent pokrývající všechny formáty od základů po hloubkové technické rozbory. Strukturováno podle vrstev — od atomů po šablony celých videí.

---

## 🎬 1. FRAME & LAYOUT (kostra každého videa)

| Komponenta | Účel | Klíčové props |
|---|---|---|
| `<PrautVideoFrame>` | Hlavní 16:9 wrapper s top barem, borderem, scale-to-fit | `episodeNumber`, `episodeTitle`, `children` |
| `<PrautShortFrame>` | 9:16 verze pro YouTube Shorts / Reels / TikTok | `episodeTitle`, `children` |
| `<PrautSquareFrame>` | 1:1 pro LinkedIn carousel exporty | `slideNumber`, `totalSlides` |
| `<TopBar>` | 48px bar s logem vlevo a episode info vpravo | `episodeNumber`, `title` |
| `<BrandLogo>` | Brain puzzle mark + "PRAUT" text | `size`, `variant`, `monochrome` |
| `<BrainMark>` | Samostatný puzzle mark (4 dílky + CX) | `size`, `animated` |
| `<SafeArea>` | Scale-to-fit container 1920×1080 | `children` |
| `<SlideRoot>` | Standardní slide pozadí #0a0e2e + padding | `children` |
| `<SplitLayout>` | 2-column layout (text vs vizuál) | `ratio`, `gap` |
| `<TripleLayout>` | 3-column pro porovnání (Před / Po / Rozdíl) | — |
| `<PiPLayout>` | Webcam vlevo dole 18% přes screenshare | `webcamSrc`, `screenSrc` |
| `<SpeakerScreenLayout>` | Mluvčí 34% / obsah 66% nebo opačně | `focus: 'speaker' \| 'screen'` |
| `<ExplainerSlide>` | Slide s nadpisem, body textem a volitelným vizuálem | `title`, `body`, `visual?` |
| `<LiquidGlassPanel>` | Glassmorphism panel přes SpiralGalaxy pozadí | `children`, `blur?` |
| `<WebcamPlaceholder>` | Placeholder kruh pro webcam overlay (průhledný) | `size?` |

---

## 🔣 1b. IKONY (`src/components/icons/`)

| Komponenta | Účel |
|---|---|
| `<PhosphorIcon>` | Wrapper pro Phosphor icon font — 1530 ikon × 6 váh (thin, light, regular, bold, fill, duotone) |

---

## 📝 2. TYPOGRAFIE & TEXT ANIMACE

| Komponenta | Účel |
|---|---|
| `<DisplayHeading>` | 48px Montserrat 800, Display level |
| `<H1>`, `<H2>`, `<H3>` | Hierarchie nadpisů s předdefinovanými barvami |
| `<BodyText>` | Body 16-20px, weight 500+ |
| `<MonoLabel>` | IBM Plex Mono pro labely a čísla |
| `<GradientText>` | Text s logo gradientem #506FFB → #8D2AF3 |
| `<TypewriterText>` | Postupné psaní znak po znaku (terminal vibe) |
| `<WordReveal>` | Slovo po slově fade-in (stagger) |
| `<LineReveal>` | Řádek po řádku slide-up |
| `<HighlightedText>` | Text s animovaným zvýrazněním slov (purple glow) |
| `<CountUpNumber>` | Animované počítání čísel (0 → 1,200,000) |
| `<GlitchText>` | Glitch efekt pro "AI", "GPT", brand jména |
| `<ScrambleText>` | Hackerské scramble než se text usadí |
| `<AnimatedQuote>` | Citát s uvozovkami a autorem |
| `<KeyTakeaway>` | Velký "💡 Key takeaway" box |

---

## 🔢 3. CHAPTER & NAVIGATION

| Komponenta | Účel |
|---|---|
| `<ChapterCard>` | Fullscreen "Kapitola 01 / Co je to LLM" intro |
| `<ChapterTransition>` | Wipe/fade přechod mezi kapitolami |
| `<ProgressBar>` | Tenký progress bar dole (kde jsme ve videu) |
| `<TableOfContents>` | Animovaný seznam kapitol s aktivním zvýrazněním |
| `<SectionDivider>` | Mezisekce — horizontal line + číslo |
| `<EndScreen>` | Outro s CTA, subscribe, next video |
| `<IntroAnimation>` | 3-5s logo reveal s brain puzzle skládáním |
| `<HookCard>` | První 3 sekundy — velký hook text |

---

## 📊 4. GRAFY & DATA VIZUALIZACE

| Komponenta | Účel |
|---|---|
| `<AnimatedBarChart>` | Sloupcový graf s rostoucími bary |
| `<AnimatedLineChart>` | Liniový graf s drawing animací |
| `<AnimatedPieChart>` | Koláč s rotující výsečí |
| `<DonutChart>` | Donut s % uprostřed |
| `<RadarChart>` | Pavoučí graf (porovnání modelů) |
| `<HeatmapGrid>` | Tepelná mapa (např. attention matrix) |
| `<StackedBarChart>` | Stacked bary pro % rozložení |
| `<ComparisonChart>` | 2-side bar (model A vs model B) |
| `<BenchmarkTable>` | Tabulka benchmarků (MMLU, HumanEval, atd.) |
| `<MetricCard>` | Velká karta s číslem + popiskem + delta |
| `<KPIGrid>` | Mřížka 3-4 metrik najednou |
| `<TimelineChart>` | Časová osa AI vývoje (GPT-1 → GPT-5) |
| `<GrowthCurve>` | Exponenciální křivka (parametry, compute) |
| `<ScatterPlot>` | Bodový graf (cena vs výkon modelů) |
| `<PercentageBar>` | Horizontální % bar pro single metriku |

---

## 🧠 5. AI-SPECIFIC VIZUALIZACE

| Komponenta | Účel |
|---|---|
| `<NeuralNetwork>` | Animovaná NN s vrstvami a aktivacemi |
| `<TransformerBlock>` | Diagram transformer bloku (attention + FFN) |
| `<AttentionMatrix>` | Vizualizace attention weights mezi tokeny |
| `<TokenizerView>` | Text → tokeny s barevným zvýrazněním |
| `<EmbeddingSpace>` | 2D/3D scatter embeddingů (king-queen demo) |
| `<PromptResponse>` | Chat bublina prompt → animovaná odpověď |
| `<ContextWindow>` | Vizualizace context window (sliding tokenů) |
| `<TemperatureSlider>` | Demo vlivu temperature na výstup |
| `<RAGPipeline>` | Animovaný flow: query → vector DB → LLM → answer |
| `<AgentLoop>` | Think → Act → Observe smyčka |
| `<ToolCallVisual>` | LLM volá funkci s parametry |
| `<MoEDiagram>` | Mixture of Experts routing |
| `<DiffusionSteps>` | Postupné odšumování (image gen) |
| `<TrainingLoss>` | Loss curve s epochami |
| `<ModelArchitecture>` | Box diagram architektury (encoder/decoder) |
| `<ParameterCounter>` | Vizualizace velikosti modelu (7B, 70B, 405B) |
| `<CostCalculator>` | Live výpočet ceny tokenů |
| `<HallucinationDemo>` | Side-by-side správný vs halucinovaný výstup |

---

## 💻 6. CODE & TERMINAL

| Komponenta | Účel |
|---|---|
| `<CodeBlock>` | Syntax-highlighted kód (Python, TS, Bash) |
| `<CodeTypewriter>` | Postupné psaní kódu řádek po řádku |
| `<CodeDiff>` | Před/po s + a - řádky |
| `<TerminalWindow>` | macOS terminal s tečkami a animovaným výstupem |
| `<CommandLine>` | Single-line bash prompt s blikajícím kurzorem |
| `<APIRequest>` | Formátovaný HTTP request/response |
| `<JSONViewer>` | Animovaný JSON s collapse/expand |
| `<CurlExample>` | curl příkaz s odpovědí |
| `<FileTree>` | Strom souborů s highlight aktivního |
| `<EditorWindow>` | VS Code-like okno s tabs |

---

## 📋 7. LISTS & ENUMERATIONS (top 10, kroky, …)

| Komponenta | Účel |
|---|---|
| `<NumberedList>` | Animovaný číslovaný seznam (stagger) |
| `<TopTenCard>` | Velká karta "#1", "#2" pro top X videa |
| `<TopTenReveal>` | Postupné odhalování od #10 do #1 |
| `<StepByStep>` | Kroky 1-5 s ikonami a šipkami |
| `<ChecklistAnimated>` | Checkbox po checkboxu odškrtávaný |
| `<ProsConsTable>` | Pro/Proti dvousloupec |
| `<FeatureList>` | Bullet list s ikonami |
| `<MythVsFact>` | "Mýtus" vs "Pravda" karty |
| `<DoVsDont>` | ✅ Dělej / ❌ Nedělej |

---

## 🎴 8. CARDS & CONTAINERS

| Komponenta | Účel |
|---|---|
| `<GlowCard>` | Karta s purple glow borderem |
| `<GlassCard>` | Glassmorphism karta |
| `<StatCard>` | Číslo + label + ikona |
| `<QuoteCard>` | Citát s avatarem |
| `<TipCard>` | "💡 Tip" žlutý border |
| `<WarningCard>` | "⚠️ Pozor" oranžový border |
| `<InfoCard>` | "ℹ️ Info" modrý border |
| `<ErrorCard>` | "❌ Chyba" červený |
| `<SuccessCard>` | "✅ OK" zelený |
| `<PersonCard>` | Avatar + jméno + role (např. AI vědec) |
| `<ToolCard>` | Logo + název + popis (Claude, GPT, atd.) |
| `<ComparisonCard>` | A vs B karta s VS uprostřed |

---

## 🎯 9. CALL-TO-ACTION & ENGAGEMENT

| Komponenta | Účel |
|---|---|
| `<SubscribeButton>` | Animovaný subscribe s glow |
| `<LikeAnimation>` | Pulzující palec nahoru |
| `<BellNotification>` | Zvonek s notification badge |
| `<CommentPrompt>` | "Napiš do komentáře…" karta |
| `<ShareCard>` | Sdílení tlačítka |
| `<NewsletterCTA>` | Praut newsletter signup |
| `<DiscordCTA>` | Pozvánka na komunitu |
| `<NextVideoCard>` | Náhled dalšího videa s thumbnailem |
| `<EndScreenGrid>` | 2x2 mřížka doporučených videí |

---

## 🔄 10. TRANSITIONS & EFFECTS

| Komponenta | Účel |
|---|---|
| `<FadeTransition>` | Fade in/out mezi scénami |
| `<SlideTransition>` | Slide left/right/up/down |
| `<WipeTransition>` | Wipe efekt s gradient maskou |
| `<ZoomTransition>` | Zoom in/out přechod |
| `<GlitchTransition>` | Glitch mezi scénami |
| `<MorphTransition>` | Morfování mezi tvary |
| `<PuzzleAssemble>` | Skládání puzzle dílků (brand transition) |
| `<ParticleBurst>` | Particle exploze |
| `<RippleEffect>` | Vlna od centra |

---

## 🌌 11. BACKGROUNDS & ATMOSPHERE

| Komponenta | Účel |
|---|---|
| `<NavyBackground>` | Statické #060818 pozadí |
| `<GradientMesh>` | Animovaný gradient mesh (subtle) |
| `<ParticleField>` | Pomalu plovoucí částice |
| `<StarField>` | Hvězdy pro hlubší atmosféru |
| `<GridBackground>` | Tech grid s perspektivou |
| `<CircuitPattern>` | Obvodové cesty na pozadí |
| `<NoiseOverlay>` | Jemný film grain |
| `<VignetteOverlay>` | Tmavé okraje |
| `<ScanlineEffect>` | CRT scanline pro retro vibe |
| `<SpaceNebula>` | Animované mlhoviny + hvězdy (subtle/medium/dramatic) |
| `<SpiralGalaxy>` | Canvas density-wave galaxie (~6000 hvězd) — **DEFAULT pozadí pro PrautVideoFrame** |

---

## 🖼️ 12. MEDIA & ASSETS

| Komponenta | Účel |
|---|---|
| `<ProcessedImage>` | Obrázek s tmavým overlay (proti "přilepenosti") |
| `<RoundedScreenshot>` | Screenshot s border-radius a glow |
| `<BrowserMockup>` | Browser okno s URL barem |
| `<PhoneMockup>` | iPhone/Android mockup |
| `<MacBookMockup>` | MacBook mockup |
| `<VideoEmbed>` | Vnořené video s frame |
| `<AnimatedIcon>` | Lottie/SVG ikona s animací |
| `<LogoCloud>` | Mřížka log nástrojů/firem |
| `<AvatarCircle>` | Kulatý avatar s borderem |

---

## 🎓 13. EDUCATIONAL PATTERNS

| Komponenta | Účel |
|---|---|
| `<DefinitionBox>` | "Co je to X?" definice |
| `<FormulaDisplay>` | Matematický vzorec (KaTeX) |
| `<AnalogyVisual>` | Analogie přirovnání (např. CPU = mozek) |
| `<BeforeAfterSlider>` | Posuvník před/po |
| `<ConceptMap>` | Mapa propojených konceptů |
| `<FlowchartNode>` | Uzel pro flowcharty |
| `<DecisionTree>` | Větvící se rozhodovací strom |
| `<MindMap>` | Centrální koncept s větvemi |
| `<HierarchyDiagram>` | Hierarchická struktura |

---

## 📺 14. VIDEO TEMPLATES (kompletní šablony)

| Šablona | Obsah |
|---|---|
| `<TutorialTemplate>` | Intro → Kroky → Demo → Outro |
| `<TopTenTemplate>` | Hook → Countdown 10→1 → Winner → CTA |
| `<ExplainerTemplate>` | Hook → Definice → Příklad → Demo → Shrnutí |
| `<NewsTemplate>` | Headline → Kontext → Detaily → Dopad → Názor |
| `<ReviewTemplate>` | Produkt → Pros/Cons → Demo → Verdikt |
| `<ComparisonTemplate>` | Úvod → Tool A → Tool B → Side-by-side → Doporučení |
| `<DeepDiveTemplate>` | Hook → 5 kapitol → Hluboký technický rozbor |
| `<MythBustingTemplate>` | Mýtus → Realita → Důkaz → Závěr |
| `<CaseStudyTemplate>` | Problém → Řešení → Implementace → Výsledky |
| `<ShortTemplate>` | 9:16 hook → punchline → CTA (60s) |

---

## ⚙️ 15. UTILITIES & HOOKS

| Utility | Účel |
|---|---|
| `useScaleToFit()` | Hook pro responsive scale |
| `useStaggeredAnimation()` | Hook pro stagger delay |
| `useTypewriter()` | Hook pro typewriter efekt |
| `useCountUp()` | Hook pro animovaná čísla |
| `interpolateColors()` | Smooth barevné přechody |
| `springs` | Předdefinované spring konfigurace (`smooth`, `bouncy`, `snappy`, `gentle`) — importuj z `tokens.ts` |
| `easings` | Sjednocené easing křivky |
| `<WatermarkPraut>` | Diskrétní watermark v rohu (umístěn v `frame/`) |

---

## 📁 Doporučená struktura repozitáře

```
src/
├── components/
│   ├── frame/          (1)  PrautVideoFrame, TopBar, BrainMark…
│   ├── typography/     (2)  Headings, GradientText, Typewriter…
│   ├── chapters/       (3)  ChapterCard, Progress, EndScreen…
│   ├── charts/         (4)  Bar, Line, Pie, Radar…
│   ├── ai-visuals/     (5)  NeuralNet, Attention, Tokenizer…
│   ├── code/           (6)  CodeBlock, Terminal, JSON…
│   ├── lists/          (7)  TopTen, Steps, Checklist…
│   ├── cards/          (8)  GlowCard, StatCard, QuoteCard…
│   ├── cta/            (9)  Subscribe, NextVideo…
│   ├── transitions/    (10) Fade, Wipe, Puzzle…
│   ├── backgrounds/    (11) Gradient, Particles, Grid…
│   ├── media/          (12) Mockups, Avatars, Logos…
│   ├── educational/    (13) Definition, Formula, MindMap…
│   └── shared/         (utilities, hooks, design tokens)
├── templates/          (14) Kompletní šablony videí
├── compositions/       Remotion compositions registry
├── styles/
│   └── tokens.ts       Design tokens z Visual Booku
└── Root.tsx
```

---

## 🚀 Doporučený postup implementace

**Fáze 1 — Foundation (must-have pro první video):** Frame system (1), Typografie (2), základní Cards (8), 2-3 transitions (10), Background (11), CTA (9). Tohle ti stačí na natočení prvního explaineru.

**Fáze 2 — Educational core:** Chapters (3), Lists (7), Code & Terminal (6), Educational patterns (13). Potřebuješ na tutoriály a top-ten formáty.

**Fáze 3 — AI specialization:** AI-specific vizualizace (5), Charts (4). Pro hlubší technický obsah o LLM, transformerech, RAG, agentech.

**Fáze 4 — Production polish:** Pokročilé Media mockupy (12), Templates (14), pokročilé transitions a effects.
