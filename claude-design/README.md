# Graphite

Calm graphite surfaces and one violet accent: a shadcn/ui theme for mobile-first apps, always in light **and** dark.

Graphite comes from the gym app ([mastalier1997/gym](https://github.com/mastalier1997/gym)). The code lives in [mastalier1997/design-system](https://github.com/mastalier1997/design-system), and `tokens.json` there is the single source of every value here.

## Principles

- **One path, no detours.** Each screen has one primary action. It is the only thing filled with `primary`.
- **Calm over loud.** Neutral surfaces carry the UI. `primary` marks action, selection and progress, never decoration.
- **Content is the UI.** Names and numbers carry the weight. No gradients, no heavy shadows, no icon noise.
- **Borders, not shadows.** Separate things with `border` and a surface step (`background` → `card` → `secondary`). Shadows are only for floating layers (menus, dialogs, a sticky bottom bar).
- **Both modes, always.** Every screen is designed and checked in Light and Dark. Dark is the app default (gym, low light); Light is the shadcn base (`:root`).
- **Thumb first.** Single column, max 448px (`content-max`), controls at least 44px (`control-touch`) on touch screens.

## Voice

Short, direct, second person, sentence case. Say what happened and what to do next: "Workout saved", "You're offline. Changes are kept on this device." No exclamation marks, no jokes in errors, no emoji.

## Colour

All colours are shadcn's variable names, so a design maps 1:1 to code (`bg-primary`, `text-muted-foreground`, …).

| Role | Tokens |
|---|---|
| Surfaces | `background` → `card` / `muted` → `secondary` / `accent` (hover), `popover` for floating layers |
| Text | `foreground` for content, `muted-foreground` for captions, helper text and inactive tabs |
| Action | `primary` + `primary-foreground`; `ring` for focus |
| Lines | `border` (decorative), `input` (control borders, 3:1) |
| Status | `destructive` (errors), `success` (confirmation); always with an icon or text, never colour alone |
| Data | `chart-1` … `chart-5` |

Every text pair passes WCAG AA (4.5:1) in both themes. The repo's build fails if one doesn't.

**Accent presets.** The gym app lets people pick their accent: violet `#9084DA` (default), indigo `#5596DC`, sky `#00A3C7`, cyan `#00AAA3`, teal `#41A974`, sage `#7CA047`, yellow `#EACC56`, olive `#C2832D`, orange `#D27558`, red `#E67A73`, pink `#DA7BB3`. The app adjusts the pick per mode for contrast. Design with the default violet.

## Type

The system font stack (`--font-sans`: SF on Apple, Segoe UI on Windows, Roboto on Android). No web fonts, no serif, no mono in product UI.

- `display` 32/38 bold: one screen title.
- `h2` 22/28 semibold: section headers.
- `body` 16/24: copy and input text.
- `body-medium` 16/24 medium: card and list item titles.
- `ui` 14/20 medium: button and tab labels.
- `label` 13/18 semibold, uppercase, +0.02em: tags.
- `caption` 13/18: helper text and metadata.

13px is the floor for any text.

## Space, radius, elevation

- Tailwind's 4px scale: `space-4` (16px) for phone screen padding and card padding, `space-3` (12px) between stacked cards, `space-8` (32px) between sections.
- `--radius` is 10px: `radius-md` 8 for buttons and inputs, `radius-lg` 10 for tab lists and alerts, `radius-xl` 14 for cards and sheets, `radius-full` for pills, switches and progress bars.
- No shadow on cards. A selected or pressed card switches to `secondary` and a `primary` ring or border.

## Components

Components are **shadcn/ui** (React/Next.js) and **shadcn-svelte** (SvelteKit), unchanged except for the theme. Never hand-roll a button, input, card or dialog: pick the shadcn component and variant. The cards here show the variants Graphite uses and how.

## Iconography

[Lucide](https://lucide.dev) (`lucide-react`, `@lucide/svelte`), the shadcn default: 2px stroke, round caps, 16px in buttons, 20px standalone. Icon-only buttons are 44×44 on touch with an `aria-label`. No emoji, no filled or duotone icon sets.

## Motion

150ms ease-out on colour, border and background only. No bounce or scale. Everything honours `prefers-reduced-motion`.

## Using it in code

```bash
npx shadcn@latest add https://raw.githubusercontent.com/mastalier1997/design-system/main/public/r/graphite.json
npx shadcn@latest add https://raw.githubusercontent.com/mastalier1997/design-system/main/public/r/graphite-next-dark-mode.json
```

For SvelteKit use `npx shadcn-svelte@latest add` with the same theme link and `graphite-svelte-dark-mode.json`. The repo README has the layout wiring and the SvelteKit 3 alias note.
