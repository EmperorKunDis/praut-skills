---
name: praut-component-library
description: Catalog of all 100+ Praut branded components organized by category
metadata:
  tags: praut, components, catalog, library
---

# Praut Component Library

All branded components live under `src/components/{category}/`. Always prefer
these over writing new visuals from scratch — they already follow the brand.

Structure: 14 component categories + templates + hooks.

## 1. Frame & Layout (`src/components/frame/`)
- `PrautVideoFrame` — 16:9 master wrapper
- `PrautShortFrame` — 9:16 wrapper
- `PrautSquareFrame` — 1:1 wrapper
- `TopBar` — episode meta + brand lockup
- `BrandLogo` — full / mark / text variants
- `BrainMark` — puzzle mark from `logopraut.svg`
- `SafeArea` — scale-to-fit wrapper
- `SlideRoot` — slide content background
- `SplitLayout` / `TripleLayout` / `PiPLayout` / `SpeakerScreenLayout`
- `ExplainerSlide` — slide with title, body, optional visual
- `LiquidGlassPanel` — glassmorphism panel over SpiralGalaxy
- `WebcamPlaceholder` — transparent circle for webcam overlay
- `WatermarkPraut`

## 2. Typography (`src/components/typography/`)
- `DisplayHeading` — 48px Montserrat 800
- `H1` / `H2` / `H3` — heading scale
- `BodyText` — 18px Montserrat 500
- `MonoLabel` — IBM Plex Mono caption
- `GradientText` — background-clip gradient text
- `TypewriterText` — char-by-char with cursor
- `WordReveal` — staggered word fade-in
- `LineReveal` — staggered line slide-up
- `HighlightedText` — animated highlighter sweep
- `CountUpNumber` — animated 0→N
- `GlitchText` — RGB split glitch
- `ScrambleText` — hacker scramble settle
- `AnimatedQuote` — quote card with author
- `KeyTakeaway` — 💡 callout box

## 3. Icons (`src/components/icons/`)
- `PhosphorIcon` — wrapper, 1530 icons × 6 weights
- `loadPhosphorFont` — side-effect font loader
- `phosphor-glyphs.json` — generated mapping
- `PhosphorIconName` — type alias

## 4. Chapters & Navigation (`src/components/chapters/`)
- `ChapterCard` — full-screen chapter intro
- `ChapterTransition` — quick chapter sting
- `ProgressBar` — auto-driven progress
- `TableOfContents` — animated chapter list
- `SectionDivider` — horizontal rule with number
- `EndScreen` — outro with subscribe + next
- `IntroAnimation` — pure-code 3–5s logo reveal
- `HookCard` — first 3 seconds hook

## 5. Charts (`src/components/charts/`)
- `AnimatedBarChart` — staggered spring bars
- `AnimatedLineChart` — drawing line with reveal
- `AnimatedPieChart` — slice reveal
- `DonutChart` — donut with center label
- `RadarChart` — pavoučí porovnání
- `HeatmapGrid` — 2D heatmap
- `StackedBarChart` — stacked bars
- `ComparisonChart` — A vs B horizontal bars
- `BenchmarkTable` — model benchmarks table
- `MetricCard` — single big metric
- `KPIGrid` — grid of metrics
- `TimelineChart` — timeline with events
- `GrowthCurve` — exponential curve
- `ScatterPlot` — labeled scatter
- `PercentageBar` — animated horizontal %

## 6. AI-specific (`src/components/ai-visuals/`)
- `NeuralNetwork` — animated NN with activation
- `TransformerBlock` — attention + FFN diagram
- `AttentionMatrix` — token×token heat
- `TokenizerView` — colored token chips
- `EmbeddingSpace` — 2D embedding scatter
- `PromptResponse` — chat bubbles + streaming
- `ContextWindow` — sliding window over tokens
- `TemperatureSlider` — temperature parameter
- `RAGPipeline` — query → DB → LLM → answer
- `AgentLoop` — Think → Act → Observe
- `ToolCallVisual` — function + args + result
- `MoEDiagram` — Mixture of Experts routing
- `DiffusionSteps` — denoising sequence
- `TrainingLoss` — loss curve over epochs
- `ModelArchitecture` — layer stack diagram
- `ParameterCounter` — model size comparison
- `CostCalculator` — token pricing breakdown
- `HallucinationDemo` — correct vs hallucinated

## 7. Code & Terminal (`src/components/code/`)
- `CodeBlock` — syntax-highlighted block
- `CodeTypewriter` — typed code
- `CodeDiff` — +/− line diff
- `TerminalWindow` — macOS chrome terminal
- `CommandLine` — single-line CLI prompt
- `APIRequest` — HTTP request/response
- `JSONViewer` — formatted JSON tree
- `CurlExample` — curl with response
- `FileTree` — file tree with active highlight
- `EditorWindow` — VS Code-like tabs

## 8. Lists (`src/components/lists/`)
- `NumberedList` — staggered numbered list
- `TopTenCard` — single TopX card
- `TopTenReveal` — countdown 10→1
- `StepByStep` — horizontal steps with arrows
- `ChecklistAnimated` — auto-ticking checklist
- `ProsConsTable` — pros/cons two columns
- `FeatureList` — feature bullets with icons
- `MythVsFact` — myth/truth comparison
- `DoVsDont` — do/don't comparison

## 9. Cards (`src/components/cards/`)
- `GlowCard` — gradient bg + purple border + glow
- `GlassCard` — glassmorphism
- `StatCard` — number + label + icon
- `QuoteCard` — quote + avatar
- `TipCard` / `WarningCard` / `InfoCard` / `ErrorCard` / `SuccessCard`
- `PersonCard` — avatar + name + role
- `ToolCard` — product / tool card
- `ComparisonCard` — A vs B with VS badge

## 10. CTA (`src/components/cta/`)
- `SubscribeButton` — gradient pill button
- `LikeAnimation` — pulsing thumbs-up
- `BellNotification` — wobbling bell + badge
- `CommentPrompt` — "napiš do komentáře" card
- `ShareCard` — social platform pills
- `NewsletterCTA` — email signup card
- `DiscordCTA` — community invite
- `NextVideoCard` — next video preview
- `EndScreenGrid` — 2x2 recommended grid

## 11. Transitions (`src/components/transitions/`)
- `FadeTransition` — `springs.smooth` opacity
- `SlideTransition` — `springs.snappy` slide
- `WipeTransition` — purple mask sweep
- `ZoomTransition` — scale + opacity
- `GlitchTransition` — RGB split glitch
- `MorphTransition` — blur cross-fade
- `PuzzleAssemble` — 4 brand tiles assembling
- `ParticleBurst` — radial particle explosion
- `RippleEffect` — concentric expanding rings

## 12. Backgrounds (`src/components/backgrounds/`)
- **`SpiralGalaxy`** — **DEFAULT background for PrautVideoFrame** — canvas density-wave galaxy (~6000 stars)
- **`SpaceNebula`** — animated nebula clouds + stars (`subtle` | `medium` | `dramatic` intensity)
- `NavyBackground` — solid `frame.bg` (fallback for simple slides)
- `GradientMesh` — animated radial gradients
- `ParticleField` — drifting blue particles
- `StarField` — twinkling pinpricks
- `GridBackground` — tech grid lines
- `CircuitPattern` — circuit board paths
- `NoiseOverlay` — film grain
- `VignetteOverlay` — corner darkening
- `ScanlineEffect` — CRT scanlines

> **Layer order:** SpiralGalaxy → LiquidGlassPanel → children → TopBar → Watermark.
> All frame wrappers render SpiralGalaxy by default (`includeBackground={true}`).

## 13. Media (`src/components/media/`)
- `ProcessedImage` — bordered image with overlay
- `RoundedScreenshot` — large rounded screenshot
- `BrowserMockup` — browser chrome window
- `PhoneMockup` — iPhone-style phone
- `MacBookMockup` — laptop body + screen
- `VideoEmbed` — branded video frame
- `AnimatedIcon` — PhosphorIcon with pop-in
- `LogoCloud` — partner logo grid
- `AvatarCircle` — circular avatar with border

## 14. Educational (`src/components/educational/`)
- `DefinitionBox` — "Definice" callout
- `FormulaDisplay` — math formula display
- `AnalogyVisual` — "X je jako Y" with icons
- `BeforeAfterSlider` — sweep before/after
- `ConceptMap` — labeled boxes + lines
- `FlowchartNode` — process / decision / start
- `DecisionTree` — yes/no branching tree
- `MindMap` — central node + branches
- `HierarchyDiagram` — tree hierarchy

## 15. Templates (`src/templates/`)
- `TutorialTemplate` — Hook → Steps → Outro
- `TopTenTemplate` — Hook → Countdown → Outro
- `ExplainerTemplate` — Hook → Definition → Example → Takeaway
- `NewsTemplate` — Headline → Context → Details → Impact → Opinion
- `ReviewTemplate` — Hook → Pros/Cons → Demo → Verdict
- `ComparisonTemplate` — Hook → A vs B → Recommendation
- `DeepDiveTemplate` — Hook → 5 chapters → Outro
- `MythBustingTemplate` — Hook → Myth/Fact → Evidence → Conclusion
- `CaseStudyTemplate` — Problem → Solution → Implementation → Results
- `ShortTemplate` — 9:16 Hook → Punchline → CTA

## 16. Hooks & Utilities (`src/hooks/`)
- `useScaleToFit`
- `useStaggeredAnimation`
- `useTypewriter`
- `useCountUp`
- `interpolateColors`
- `easings`

## How to import

All components live under `@/components/{category}/{ComponentName}` (alias to
`src/components/...`). Templates are at `@/templates/{TemplateName}`. Tokens at
`@/styles/tokens`.

Example:

```tsx
import {PrautVideoFrame} from '@/components/frame/PrautVideoFrame';
import {AnimatedBarChart} from '@/components/charts/AnimatedBarChart';
import {colors, springs} from '@/styles/tokens';
```
