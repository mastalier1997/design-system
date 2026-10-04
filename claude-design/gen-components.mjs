import { mkdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

process.chdir(dirname(fileURLToPath(import.meta.url)))

const F = "font-family: var(--font-sans);"
const btn = (bg, fg, label, extra = "") =>
  `<button type="button" style="height: 44px; padding: 0 16px; border: 0; border-radius: var(--radius-md); background: ${bg}; color: ${fg}; font: 500 14px/20px var(--font-sans);${extra}">${label}</button>`
const badge = (style, label) =>
  `<span style="display: inline-flex; align-items: center; height: 22px; padding: 0 8px; border-radius: var(--radius-sm); ${style} font: 600 12px/1 var(--font-sans); letter-spacing: 0.02em; text-transform: uppercase">${label}</span>`
const icon = (paths, extra = "") =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths}</svg>`
const iconBtn = (label, paths) =>
  `<button type="button" aria-label="${label}" style="width: 44px; height: 44px; border: 1px solid var(--input); border-radius: var(--radius-md); background: var(--background); color: var(--foreground); display: inline-flex; align-items: center; justify-content: center">${icon(paths)}</button>`
const alert = (role, color, iconPaths, iconStroke, title, text) =>
  `<div role="${role}" style="display: flex; gap: 12px; padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--card);${color}">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; margin-top: 1px">${iconPaths}</svg>
    <div style="display: flex; flex-direction: column; gap: 2px"><strong style="font: 600 14px/20px var(--font-sans)">${title}</strong><span style="font: 400 14px/20px var(--font-sans); color: var(--muted-foreground)">${text}</span></div>
  </div>`
const field = (id, label, input, note, noteColor) =>
  `<div style="display: flex; flex-direction: column; gap: 8px">
    <label for="${id}" style="font: 500 14px/20px var(--font-sans)">${label}</label>
    ${input}
    <div style="font: 400 13px/18px var(--font-sans); color: ${noteColor}">${note}</div>
  </div>`
const inputStyle = (border) =>
  `height: 44px; box-sizing: border-box; padding: 0 12px; border: 1px solid ${border}; border-radius: var(--radius-md); background: transparent; color: var(--foreground); font: 400 16px/24px var(--font-sans)`

const components = {
  Button: {
    readme: `# Button

shadcn \`Button\`: one \`default\` (primary) button per screen, everything else \`secondary\`, \`outline\` or \`ghost\`.

- **Variants:** \`default\` for the one main action ("Start workout"); \`secondary\` for a second, filled action; \`outline\` for neutral actions and icon buttons; \`ghost\` for toolbar and inline actions; \`destructive\` only for deleting data, behind a confirm; \`link\` for in-text actions.
- **Size:** 44px tall on touch screens (the Graphite theme enforces it), so use the default size. On phones the primary action is full width at the bottom of the screen.
- **Labels:** a verb plus an object, sentence case ("Save workout", not "OK").
- **Icon-only:** \`size="icon"\`, variant \`outline\` or \`ghost\`, always with an \`aria-label\`.
- **Disabled:** 50% opacity, used rarely; prefer explaining what's missing.
- The consumer provides the label, the handler, and \`asChild\` with a link when it navigates.
`,
    preview: `<!-- @dsCard group="Actions" height=150 subtitle="default · secondary · outline · ghost · destructive · link" -->
<div style="${F} display: flex; flex-wrap: wrap; gap: 10px; align-items: center; padding: 20px; background: var(--background); color: var(--foreground)">
  ${btn("var(--primary)", "var(--primary-foreground)", "Start workout")}
  ${btn("var(--secondary)", "var(--secondary-foreground)", "Secondary")}
  ${btn("var(--background)", "var(--foreground)", "Outline", " box-shadow: inset 0 0 0 1px var(--input);")}
  ${btn("transparent", "var(--foreground)", "Ghost")}
  ${btn("var(--destructive)", "#FFFFFF", "Delete workout")}
  ${btn("transparent", "var(--primary)", "View history", " padding: 0 4px; text-decoration: underline; text-underline-offset: 4px;")}
  ${iconBtn("Settings", '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"></path>')}
  ${btn("var(--primary)", "var(--primary-foreground)", "Disabled", " opacity: 0.5;").replace("<button", "<button disabled")}
</div>
`,
  },
  Input: {
    readme: `# Input

shadcn \`Input\` with a visible \`Label\` above it; 16px text so iOS never zooms, 44px tall on touch.

- Always a visible label. Placeholders show an example ("e.g. Romanian deadlift"), never the label.
- Border is \`input\` (3:1). Focus shows the \`ring\`; errors set \`aria-invalid\` and turn the border \`destructive\`, with a message below in \`destructive\`.
- Helper text below in \`muted-foreground\`, caption size.
- Use \`type="search"\`, \`inputmode="decimal"\` for weights, and so on, so phones show the right keyboard.
`,
    preview: `<!-- @dsCard group="Forms" height=230 subtitle="label · helper · error" -->
<div style="${F} display: flex; flex-direction: column; gap: 18px; padding: 20px; max-width: 380px; background: var(--background); color: var(--foreground)">
  ${field("ex", "Exercise", `<input id="ex" type="search" placeholder="e.g. Romanian deadlift" style="${inputStyle("var(--input)")}">`, "Pick from the list or type a new one.", "var(--muted-foreground)")}
  ${field("kg", "Weight (kg)", `<input id="kg" inputmode="decimal" value="-5" aria-invalid="true" style="${inputStyle("var(--destructive)")}">`, "Weight can't be negative.", "var(--destructive)")}
</div>
`,
  },
  Badge: {
    readme: `# Badge

shadcn \`Badge\` for tags such as muscle groups and splits: label style, uppercase, never interactive.

- \`secondary\` is the default tag ("HAMSTRINGS"); \`default\` (primary fill) only for the one tag marking the current selection; \`outline\` for neutral metadata; \`destructive\` for a state such as "Missed".
- Colour never carries the meaning alone: the text says it.
`,
    preview: `<!-- @dsCard group="Display" height=84 subtitle="secondary · default · outline · destructive" -->
<div style="${F} display: flex; flex-wrap: wrap; gap: 8px; padding: 20px; background: var(--background)">
  ${badge("background: var(--secondary); color: var(--secondary-foreground);", "Hamstrings")}
  ${badge("background: var(--primary); color: var(--primary-foreground);", "Push")}
  ${badge("box-shadow: inset 0 0 0 1px var(--border); color: var(--foreground);", "3 sets")}
  ${badge("background: var(--destructive); color: #FFFFFF;", "Missed")}
</div>
`,
  },
  Card: {
    readme: `# Card

shadcn \`Card\`: a \`card\` surface with a \`border\` and \`radius-xl\`, no shadow.

- Padding \`space-4\` on phones, \`space-6\` when roomy; stacked cards sit \`space-3\` apart in a list.
- Title in \`body-medium\` or \`h2\`, metadata in \`muted-foreground\` caption, at most one \`default\` button (often none: the whole card is the target).
- Selected or pressed: background \`secondary\` plus a 2px inset \`primary\` ring (nothing shifts) and a check icon. Never colour alone.
`,
    preview: `<!-- @dsCard group="Display" height=200 subtitle="exercise card with progress" -->
<div style="${F} padding: 20px; max-width: 400px; background: var(--background); color: var(--foreground)">
  <article style="display: flex; flex-direction: column; gap: 12px; background: var(--card); color: var(--card-foreground); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 16px">
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px">
      <h3 style="margin: 0; font: 600 16px/24px var(--font-sans)">Romanian deadlift</h3>
      ${badge("background: var(--secondary); color: var(--secondary-foreground);", "Hamstrings")}
    </div>
    <p style="margin: 0; font: 400 13px/18px var(--font-sans); color: var(--muted-foreground)">3 sets · 8–10 reps · last time 60 kg</p>
    <div role="progressbar" aria-label="Sets done" aria-valuenow="2" aria-valuemin="0" aria-valuemax="3" style="height: 8px; border-radius: var(--radius-full); background: var(--secondary)"><div style="width: 66%; height: 8px; border-radius: var(--radius-full); background: var(--primary)"></div></div>
  </article>
</div>
`,
  },
  Tabs: {
    readme: `# Tabs

shadcn \`Tabs\`: a \`secondary\` track with the active trigger raised to \`background\`.

- Two to four short labels ("Today", "History", "Stats"); 44px triggers on touch.
- Inactive labels in \`muted-foreground\`, the active one in \`foreground\`.
- Tabs switch views of the same thing; they are not steps in a flow.
`,
    preview: `<!-- @dsCard group="Navigation" height=90 subtitle="segmented tab list" -->
<div style="${F} padding: 20px; background: var(--background)">
  <div role="tablist" aria-label="Workout view" style="display: inline-flex; gap: 2px; padding: 3px; border-radius: var(--radius-lg); background: var(--secondary)">
    ${["Today", "History", "Stats"].map((t, i) => `<button type="button" role="tab" aria-selected="${i === 0}" style="height: 38px; padding: 0 14px; border: 0; border-radius: var(--radius-md); background: ${i === 0 ? "var(--background)" : "transparent"}; color: ${i === 0 ? "var(--foreground)" : "var(--muted-foreground)"}; font: 500 14px/20px var(--font-sans)">${t}</button>`).join("\n    ")}
  </div>
</div>
`,
  },
  Alert: {
    readme: `# Alert

shadcn \`Alert\` for messages that stay on screen; a toast (\`sonner\`) for passing confirmations.

- \`card\` surface, \`border\`, \`radius-lg\`; an icon, a bold title and one line of description.
- Default alert with a \`success\` check for confirmations; \`destructive\` variant (red title and icon) for errors, with the next step in the text.
- Announce with \`role="status"\` (\`role="alert"\` for errors).
`,
    preview: `<!-- @dsCard group="Feedback" height=190 subtitle="success · destructive" -->
<div style="${F} display: flex; flex-direction: column; gap: 12px; padding: 20px; max-width: 440px; background: var(--background); color: var(--foreground)">
  ${alert("status", "", '<path d="M20 6 9 17l-5-5"></path>', "var(--success)", "Workout saved", "Push day logged, 5 of 5 exercises.")}
  ${alert("alert", " color: var(--destructive);", '<circle cx="12" cy="12" r="9"></circle><path d="M12 8v5M12 16h.01"></path>', "currentColor", "Couldn't sync", "You're offline. Changes are kept on this device.")}
</div>
`,
  },
  ModeToggle: {
    readme: `# ModeToggle

Graphite's light/dark switch: an \`outline\` icon button (sun in light, moon in dark) from the repo's registry items.

- Installed by \`graphite-next-dark-mode\` (next-themes) or \`graphite-svelte-dark-mode\` (mode-watcher).
- The default follows the system setting; a click stores the choice. Settings screens may use a \`Switch\` labelled "Dark mode" instead.
- Every screen must work in both modes: design and check both.
`,
    preview: `<!-- @dsCard group="Actions" height=84 subtitle="outline icon button" -->
<div style="${F} display: flex; gap: 12px; align-items: center; padding: 20px; background: var(--background); color: var(--foreground)">
  ${iconBtn("Toggle dark mode", '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>')}
  <span style="font: 400 13px/18px var(--font-sans); color: var(--muted-foreground)">Shows a moon in dark mode.</span>
</div>
`,
  },
}

for (const [name, { readme, preview }] of Object.entries(components)) {
  mkdirSync(`components/${name}`, { recursive: true })
  writeFileSync(`components/${name}/README.md`, readme)
  writeFileSync(`components/${name}/preview.html`, preview)
}
console.log("wrote", Object.keys(components).join(", "))
