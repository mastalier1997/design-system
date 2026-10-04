# Button

shadcn `Button`: one `default` (primary) button per screen, everything else `secondary`, `outline` or `ghost`.

- **Variants:** `default` for the one main action ("Start workout"); `secondary` for a second, filled action; `outline` for neutral actions and icon buttons; `ghost` for toolbar and inline actions; `destructive` only for deleting data, behind a confirm; `link` for in-text actions.
- **Size:** 44px tall on touch screens (the Graphite theme enforces it), so use the default size. On phones the primary action is full width at the bottom of the screen.
- **Labels:** a verb plus an object, sentence case ("Save workout", not "OK").
- **Icon-only:** `size="icon"`, variant `outline` or `ghost`, always with an `aria-label`.
- **Disabled:** 50% opacity, used rarely; prefer explaining what's missing.
- The consumer provides the label, the handler, and `asChild` with a link when it navigates.
