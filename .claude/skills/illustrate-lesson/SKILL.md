---
name: illustrate-lesson
description: Generate course illustration images. Reads Image Theme from course-design.md, composes a prompt (abstract diagram or illustrative metaphor), and generates the actual PNG via Nano Banana Pro. Outputs image embed only.
argument-hint: <concept description in Korean>
user-invocable: true
---

# Create Course Image

Generate course illustration images end-to-end: compose a theme-aware prompt, then generate the actual PNG via Nano Banana Pro.

## Workflow

1. **Resolve course folder**: From `$ARGUMENTS` context or ask user. Look for `course-design.md` in `05-resources/lecture/<course-name>/`
2. **Read Image Theme**: Parse `## Image Theme` section from `course-design.md`
   - If not found: use Default Palette below as fallback
3. **Read concept description** + surrounding lesson text (user provides or from `$ARGUMENTS`)
4. **Select mode**:
   - Surrounding text contains a metaphor or analogy (real-world comparison) -> **Illustrative Metaphor**
   - Technical structure, process, or abstract comparison -> **Abstract Diagram**
   - User can override explicitly (e.g., "abstract" or "illustrative" in arguments)
5. **Compose prompt** following mode-specific rules + theme colors
6. **Generate image**: Run from the project root:
   ```bash
   uv run .claude/skills/illustrate-lesson/scripts/generate-image.py --prompt "<composed prompt>" --filename "<output-path>.png" --padding 40
   ```
   Deps (`google-genai`, `Pillow`) are declared inline via PEP 723 — `uv` downloads them to its cache on first run; no `package.json`, no `node_modules`. Needs `uv` installed (`brew install uv`).
   - Output path: `attachments/lesson-XX-<short-desc>.png` (relative to chapter folder)
   - Resolution: 2K default (best for Korean text)
7. **Output** image embed into the lesson file: `![lesson-XX-desc](attachments/lesson-XX-desc.png)`

## Default Palette (fallback when no Image Theme found)

| Role | Hex | Usage |
|------|-----|-------|
| Primary dark | `#3D3D3D` | Main shapes, text, arrows |
| Light fill | `#F0F0F0` | Secondary shapes, backgrounds |
| Accent | `#FF6D00` | Single key highlight per image |
| Background | `#FFFFFF` | Canvas |
| Border | `#E0E0E0` | Optional shape borders |

## Common Rules (both modes)

- Flat color fills only -- no gradients, no textures, no noise, no grain
- Generous whitespace between all elements
- **All labels and text in Korean** -- use Korean for every label, annotation, and title. Only exception: proper nouns like 'CLAUDE.md', technical identifiers, and common dev operations (Merge, Deploy, Build, Push, Pull, Commit, etc.) that are inherently English
- Accent color on exactly ONE key element per image to draw focus
- All elements must use colors from the Image Theme palette only (real-world objects may keep their natural color)
- 40px white padding is automatically applied (matching Excalidraw export) via `--padding 40` default

## Mode A: Abstract Diagram

For technical concepts, process flows, comparisons without metaphor.

### Design Rules
- Precise geometric shapes with rounded corners
- No real-world objects, no scenes, no decorations
- No people, no human illustrations
- Thin solid arrows/connectors in primary dark color
- White shapes with thin border color for tertiary elements

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

For analogy-based explanations where the lesson text uses a real-world comparison.

### Design Rules
- Real-world objects allowed (kitchen, taxi, vending machine, shelf, etc.)
- Minimal background, object-focused -- no complex scenes
- No tech labels on metaphor objects (keep the metaphor pure -- no "Notion" on a food crate)
- Simplified flat characters allowed (faceless silhouettes or minimal figures, consistent with flat style)
- Clean minimal flat illustration style

### Layout Patterns

| Concept Type | Illustration Pattern |
|-------------|---------------------|
| Before/after | Split panel: same base scene, one element added/changed |
| Comparison (A vs B) | Split panel: two contrasting objects or scenes |
| Transformation | Single scene showing change (e.g., empty -> full) |

## Nano Banana Pro Prompt Rules

1. Write in natural language sentences, NOT keyword tags
2. Include hex color codes for every color reference
3. Describe layout explicitly (positions, arrangement, connections)
4. Specify what NOT to include (textures, decorations)
5. Keep prompts 3-6 sentences
6. Always end with the standard suffix (see below)

### Standard Suffix
Every prompt MUST end with:
```
No other decorations, no background elements. Flat color fills, generous whitespace. Premium startup pitch deck aesthetic.
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
