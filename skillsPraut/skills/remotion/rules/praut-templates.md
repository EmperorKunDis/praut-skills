---
name: praut-templates
description: Praut video templates — how to compose Tutorial / TopTen / Explainer / DeepDive / Short and others
metadata:
  tags: praut, templates, video, composition
---

# Praut Video Templates

`src/templates/` contains 10 ready-to-use templates that compose smaller branded
components into a complete video. Each template wraps everything in
`<PrautVideoFrame>` (or `<PrautShortFrame>` for `ShortTemplate`) so the brand
chrome is automatic.

## 1. `<TutorialTemplate>`

Hook → Heading → Steps → Outro.

```tsx
<TutorialTemplate
  episodeNumber="01"
  episodeTitle="Jak nasadit LLM v 5 krocích"
  hook="Hotový agent za 10 minut."
  steps={[
    {title: 'Vyber model', icon: 'brain'},
    {title: 'Připrav prompt', icon: 'pencil'},
    {title: 'Definuj nástroje', icon: 'gear'},
    {title: 'Zabal do API', icon: 'plug'},
    {title: 'Otestuj', icon: 'test-tube'},
  ]}
  nextVideoTitle="RAG pattern krok za krokem"
/>
```

## 2. `<TopTenTemplate>`

Hook → Countdown 10→1 → Outro. Items array starts at #10 (index 0) and ends at #1 (index 9).

## 3. `<ExplainerTemplate>`

Hook → Definition → Example → Takeaway → Outro. Pass any React node as `example`
(e.g. `<TokenizerView />`, `<NeuralNetwork />`).

## 4. `<NewsTemplate>`

Headline → Context → Details → Impact → Opinion → Outro. For weekly AI news roundups.

## 5. `<ReviewTemplate>`

Hook → Pros/Cons table → Demo → Verdict → Outro. For tool reviews.

## 6. `<ComparisonTemplate>`

Hook → ComparisonCard → Side-by-side → Recommendation → Outro. For "Tool A vs Tool B" videos.

## 7. `<DeepDiveTemplate>`

Hook → 5 chapters (each = ChapterCard + body slide) → Outro.

```tsx
<DeepDiveTemplate
  episodeNumber="07"
  episodeTitle="Jak funguje attention"
  hook="Žádný transformer bez attention."
  chapters={[
    {number: '01', title: 'Co to je', body: <DefinitionBox term="Attention" definition="..." />},
    {number: '02', title: 'Matematika', body: <FormulaDisplay formula="softmax(QKᵀ/√d)·V" />},
    {number: '03', title: 'Vizualizace', body: <AttentionMatrix tokens={[...]} weights={[...]} />},
    {number: '04', title: 'Multi-head', body: <TransformerBlock />},
    {number: '05', title: 'Shrnutí', body: <KeyTakeaway>...</KeyTakeaway>},
  ]}
  nextVideoTitle="Multi-head attention vysvětlena"
/>
```

## 8. `<MythBustingTemplate>`

Hook → Myth/Reality → Evidence → Conclusion → Outro.

## 9. `<CaseStudyTemplate>`

Problem → Solution → Implementation → Results. Each phase gets its own ChapterCard intro.

## 10. `<ShortTemplate>`

9:16 Hook → Punchline → CTA (60 seconds). For YouTube Shorts / Reels / TikTok.

## Composition guidelines

- **Always start with a Hook**: first 3 seconds = `<HookCard>` with oversized text.
- **Always end with `<EndScreen>`**: outro with `<SubscribeButton>` + optional next video.
- **Chapters get full-bleed cards**: `<ChapterCard>` is full-frame, no `<SlideRoot>` wrapper.
- **Content slides use `<SlideRoot>`**: gives consistent padding accounting for the top bar.
- **Use `<Sequence>` for timing**: each phase lives on its own slice — see template source.
- **Do NOT exceed 4 series in a chart**: split into multiple charts instead.
- **Czech language**: use `cs-CZ` locale for numbers (`toLocaleString('cs-CZ')`), make sure
  `latin-ext` font subset is loaded for diacritics.

## Frame timing reference (@30fps)

- HookCard: 90 frames (3s)
- ChapterCard: 60–90 frames (2–3s)
- Standard slide: 120–180 frames (4–6s)
- Demo slide: 180–240 frames (6–8s)
- EndScreen: 150+ frames (5s+)

Adjust per template; the existing templates use sensible defaults you can tune.
