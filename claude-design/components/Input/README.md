# Input

shadcn `Input` with a visible `Label` above it; 16px text so iOS never zooms, 44px tall on touch.

- Always a visible label. Placeholders show an example ("e.g. Romanian deadlift"), never the label.
- Border is `input` (3:1). Focus shows the `ring`; errors set `aria-invalid` and turn the border `destructive`, with a message below in `destructive`.
- Helper text below in `muted-foreground`, caption size.
- Use `type="search"`, `inputmode="decimal"` for weights, and so on, so phones show the right keyboard.
