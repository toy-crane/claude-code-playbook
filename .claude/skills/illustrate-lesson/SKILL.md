---
name: illustrate-lesson
description: Generate course illustration images aligned with the site's diagram palette. Composes a theme-aware prompt (abstract diagram or illustrative metaphor), then generates the PNG via Nano Banana Pro. Outputs image embed only.
argument-hint: <concept description in Korean>
user-invocable: true
---

# Create Course Illustration

Generate course illustrations that visually **match** the site's SVG diagrams — same palette, same canvas, same typography. PNGs cannot respond to dark mode, so they are baked at light-mode values.

## Relationship to `create-lesson-diagram`

- **Abstract technical concept** (flow / comparison / stage / loop / timeline) → prefer **`create-lesson-diagram`** (SVG React component, responds to dark mode).
- **Real-world metaphor** that needs rendered objects (cups, kitchen, taxi, shelf) → use **this skill** (rasterized PNG).

If the concept could work as an SVG diagram, default to `create-lesson-diagram`. Reach for PNG only when the metaphor needs real-world illustration.

## Workflow

1. **Read concept description** + surrounding lesson text (user provides or from `$ARGUMENTS`).
2. **Select mode**:
   - Surrounding text contains a metaphor or analogy (real-world comparison) → **Illustrative Metaphor**
   - Technical structure, process, or abstract comparison → consider routing to `create-lesson-diagram` instead. If PNG is still chosen, use **Abstract Diagram**.
   - User can override explicitly (e.g., "abstract" or "illustrative" in arguments).
3. **Compose prompt** following mode-specific rules + site palette + typography.
4. **Generate image**: Run from the project root:
   ```bash
   uv run .claude/skills/illustrate-lesson/scripts/generate-image.py --prompt "<composed prompt>" --filename "<output-path>.png"
   ```
   Deps (`google-genai`, `Pillow`) are declared inline via PEP 723 — `uv` downloads them to its cache on first run; no `package.json`, no `node_modules`. Needs `uv` installed (`brew install uv`).
   - Output path: `attachments/lesson-XX-<short-desc>.png` (relative to chapter folder)
   - Resolution: 2K default (best for Korean text)
   - Padding default: `#fafaf9` (matches `--diagram-bg-panel`). Override via `--padding-color <hex>` if needed.
5. **Output** image embed into the lesson file: `![lesson-XX-desc](attachments/lesson-XX-desc.png)`

## Site Palette (source of truth: `src/app/global.css`)

PNGs are baked at **light-mode** values. Use these hex codes verbatim in every Nano Banana prompt.

| Role | Hex | Usage |
|------|-----|-------|
| `bg-panel` | `#fafaf9` | Canvas background — matches `DiagramFrame` |
| `bg-card` | `#ffffff` | Interior card/shape fill |
| `text` | `#44403c` | All labels, arrows, primary dark |
| `text-muted` | `#78716c` | Secondary labels, captions |
| `border` | `#e7e5e4` | Thin borders (optional) |
| `border-strong` | `#a8a29e` | Strong borders, neutral actor pills |
| **`primary`** | `#2563eb` | **Main focal — default single accent** |
| `success` | `#16a34a` | Positive state (optional per-image) |
| `danger` | `#f97316` | Negative state / failure / overflow (optional) |
| `warning` | `#eab308` | Attention / highlight / human input (optional) |

### Color semantics (aligned with diagram skill)

See `references/palette.md` in the `create-lesson-diagram` skill for full semantic system. Short version:

- **primary** = the concept the image is about (main focal). Most illustrations use primary as the single accent.
- **success / danger / warning** = optional secondary accents *only when the image expresses a state* (e.g., overflow cup = danger, right-sized cup = success, user hand = warning).
- Do not introduce colors outside this palette (real-world objects may keep natural color if unavoidable, but prefer re-coloring to the palette).

## Typography

- Site font: **Noto Sans KR** (loaded via `next/font/google`).
- In prompts, write: `"All labels use a clean geometric sans-serif typeface similar to Noto Sans KR, medium weight, #44403c"`. Nano Banana cannot perfectly match a specific font file, but this nudges toward the right style.
- Korean text size: comfortable reading size, generous spacing between characters.
- Avoid thin/display fonts or serif.

## Common Rules (both modes)

- **Canvas**: `#fafaf9` background across the entire image — no pure white panels, no gradients, no textures, no noise, no grain.
- **Fills**: flat color only.
- **Whitespace**: generous margin between all elements; match the airy feel of the SVG diagrams.
- **Text**: All labels and annotations in Korean. Only exception: proper nouns (`CLAUDE.md`), technical identifiers, and common dev ops (Merge, Deploy, Build, Push, Pull, Commit, etc.).
- **Accent discipline**: one focal color per image (usually `primary`). State accents (success/danger/warning) only when semantic.
- **40px `#fafaf9` padding** is applied automatically by the Python script so the PNG blends with `DiagramFrame` when embedded.

## Mode A: Abstract Diagram (prefer routing to `create-lesson-diagram` first)

For technical concepts, process flows, comparisons without metaphor. **Consider whether an SVG diagram would serve better.** If you still generate PNG:

### Design Rules
- Precise geometric shapes with rounded corners (8px radius feel).
- No real-world objects, no scenes, no decorations.
- No people.
- Thin solid arrows/connectors in `#44403c` (≈1.5px stroke).
- `#ffffff` cards with `#a8a29e` border for neutral elements.

### Layout Patterns

| Concept Type | Diagram Pattern |
|-------------|-----------------|
| Comparison (A vs B) | Split panel: left and right card groups |
| Sequential flow | Horizontal row of connected rounded cards |
| Cycle/loop | Cards arranged in square/circle with curved arrows |
| Hierarchy/priority | Stacked cards with size or opacity variation |
| Degradation/overflow | Card grid where elements progressively fade or overflow |
| Selection/probability | Grid of cards with one accent-highlighted |

## Mode B: Illustrative Metaphor

For analogy-based explanations where the lesson uses a real-world comparison.

### Design Rules
- Real-world objects allowed (kitchen, taxi, vending machine, shelf, cups, etc.).
- Minimal background, object-focused — no complex scenes.
- No tech labels on metaphor objects (keep the metaphor pure — no "Notion" on a food crate).
- Simplified flat figures allowed (faceless silhouettes, minimal detail, consistent with flat style).
- Real objects re-colored to palette when plausible; obvious natural colors (e.g. water) may stay natural.

### Layout Patterns

| Concept Type | Illustration Pattern |
|-------------|---------------------|
| Before/after | Split panel: same base scene, one element added/changed |
| Comparison (A vs B) | Split panel: two contrasting objects or scenes |
| Transformation | Single scene showing change (e.g., empty → full → overflow) |

## Nano Banana Pro Prompt Rules

1. Write in natural language sentences, NOT keyword tags.
2. Include hex color codes for every color reference (from Site Palette above).
3. Describe layout explicitly (positions, arrangement, connections).
4. Specify what NOT to include (textures, decorations, pure white panels).
5. Keep prompts 3-6 sentences.
6. Always end with the standard suffix (see below).

### Standard Suffix
Every prompt MUST end with:
```
Canvas background #fafaf9, flat color fills only, generous whitespace. All labels in clean geometric sans-serif similar to Noto Sans KR, medium weight, #44403c. No textures, no gradients, no grain, no pure white panels, no decorations. Premium startup pitch deck aesthetic, matching the site's SVG diagram style.
```

## Examples

### Abstract Diagram Example

**Input:** "하나의 큰 작업 vs 여러 작은 작업"

**Output in lesson:**
```markdown
![lesson-03-big-vs-small-tasks](attachments/lesson-03-big-vs-small-tasks.png)
```

### Illustrative Metaphor Example

**Input:** "주방 비유: 내장 도구는 기본 조리도구, MCP는 외부 납품업체"

**Output in lesson:**
```markdown
![lesson-05-kitchen-mcp-metaphor](attachments/lesson-05-kitchen-mcp-metaphor.png)
```

### Test case — `task-sizing-cups` (illustrative metaphor)

Lesson: `content/docs/starting-conversations/context-management/task-sizing.mdx`

Semantic mapping for the cups metaphor:
- Overflowing cup (2L into 1 cup, fails) → **danger** `#f97316` fill
- Right-sized cups (water split across multiple) → **primary** `#2563eb` (focal) for the emphasized cup, neutral (`#ffffff` + `#a8a29e` border) for the rest
- Water → natural blue-ish tone *or* muted to stay within palette
- Canvas → `#fafaf9`
- Labels → `#44403c` Noto Sans KR

Use this as the reference check: when a newly generated PNG sits next to the site's SVG diagrams in the same lesson, it should feel like "same family" — same canvas warmth, same text color, same accent discipline.
