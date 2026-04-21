# Color Palette & Brand Style

**This is the single source of truth for all colors and brand-specific styles.** To customize diagrams for your own brand, edit this file — everything else in the skill is universal.

---

## Shape Colors (Semantic)

Colors encode meaning, not decoration. Each semantic purpose has a fill/stroke pair.

| Semantic Purpose | Fill | Stroke |
|------------------|------|--------|
| Primary/Neutral | `#FFF3E0` | `#E65100` |
| Secondary | `#F1F5F9` | `#475569` |
| Tertiary | `#F8FAFC` | `#64748b` |
| Start/Trigger | `#FEF3C7` | `#B45309` |
| End/Success | `#ECFDF5` | `#059669` |
| Warning/Reset | `#FFF1F2` | `#E11D48` |
| Decision | `#EFF6FF` | `#2563EB` |
| AI/LLM | `#F5F3FF` | `#7C3AED` |
| Inactive/Disabled | `#F5F5F4` | `#78716C` (use dashed stroke) |
| Error | `#FEF2F2` | `#DC2626` |

**Rule**: Always pair a darker stroke with a lighter fill for contrast.

---

## Text Colors (Hierarchy)

Use color on free-floating text to create visual hierarchy without containers. All text uses warm neutral tones (stone family) — no blue/navy tint.

| Level | Color | Use For |
|-------|-------|---------|
| Title | `#1C1917` | Section headings, major labels |
| Subtitle | `#78716C` | Subheadings, secondary labels |
| Body/Detail | `#A8A29E` | Descriptions, annotations, metadata |
| On light fills | `#292524` | Text inside light-colored shapes |
| On dark fills | `#ffffff` | Text inside dark-colored shapes |

---

## Evidence Artifact Colors

Used for code snippets, data examples, and other concrete evidence inside technical diagrams.

| Artifact | Background | Text Color |
|----------|-----------|------------|
| Code snippet | `#1e293b` | Syntax-colored (language-appropriate) |
| JSON/data example | `#1e293b` | `#22c55e` (green) |

---

## Default Stroke & Line Colors

| Element | Color |
|---------|-------|
| Arrows | Use the stroke color of the source element's semantic purpose |
| Structural lines (dividers, trees, timelines) | Primary stroke (`#E65100`) or Stone (`#78716C`) |
| Marker dots (fill + stroke) | Primary fill (`#FFF3E0`) + Primary stroke (`#E65100`) |

---

## Background

| Property | Value |
|----------|-------|
| Canvas background | `#ffffff` |
