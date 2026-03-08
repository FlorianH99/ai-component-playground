# CSS Tips And Tricks

## Keep These In Mind

- Start with tokens before components.
- Let content drive layout more than arbitrary breakpoints.
- Use grid and flex together, not as competing tools.
- Keep selector specificity low.
- Design component states early.
- Treat themes as a system, not a color swap.
- Prefer semantic variables over raw values.
- Use container queries for reusable components.
- Use `:focus-visible`, not weak or missing focus styles.
- Refactor repeated layout patterns into primitives.

## Practical Reminders

### Before Building
- define spacing scale
- define typography scale
- define semantic colors
- define elevation and radius system
- define layout primitives
- define motion rules
- define responsive strategy
- define state behavior

### While Building
- use tokens instead of random numbers
- use custom properties for themeable values
- use logical properties where possible
- prefer `clamp()` for fluid sizing when it fits
- keep overrides easy by avoiding specificity inflation

### While Maintaining
- remove dead styles
- consolidate duplicate values into tokens
- audit hover, focus, loading, error, and empty states
- watch for z-index drift
- watch for arbitrary spacing drift
- document primitives and patterns, not just components

## High-Signal Patterns

```css
@layer reset, tokens, base, components, utilities;
```

```css
:root {
  --space-2: 0.5rem;
  --radius-md: 0.75rem;
  --color-surface: oklch(98% 0.01 250);
}
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
```

```css
.panel-shell {
  container-type: inline-size;
}

@container (min-width: 40rem) {
  .panel-content {
    grid-template-columns: 1fr 1fr;
  }
}
```

```css
.field:has(input:focus-visible) {
  outline: 2px solid var(--color-focus);
}
```

```css
:where(.prose) h2 {
  margin-block: 1.5rem 0.75rem;
}
```

## What Usually Impresses People

- resilient layouts
- thoughtful states
- low-specificity selectors
- clean theming
- accessible focus treatment
- good spacing rhythm
- components that still work in awkward content situations

## Things That Quietly Hurt A Codebase

- one-off values everywhere
- `!important` as a habit
- viewport-only responsive behavior
- over-nested selectors
- styles coupled too tightly to DOM structure
- no documented primitives
