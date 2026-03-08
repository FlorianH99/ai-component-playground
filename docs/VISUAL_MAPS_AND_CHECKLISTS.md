# Visual Maps And Checklists

## Knowledge Map

```mermaid
graph TD
  A["AI Component Playground"] --> B["Architecture"]
  A --> C["Advanced TypeScript"]
  A --> D["Advanced CSS"]
  A --> E["TypeScript Tips"]
  A --> F["CSS Tips"]
  A --> G["AI Before I Framework"]
  G --> H["Before I Build A Website"]
```

## TypeScript Decision Tree

```mermaid
flowchart TD
  A["I need to model something"] --> B{"Is it UI or async state?"}
  B -->|Yes| C["Use a discriminated union"]
  B -->|No| D{"Is it config or a registry?"}
  D -->|Yes| E["Use as const and satisfies"]
  D -->|No| F{"Is it a public helper or library API?"}
  F -->|Yes| G["Use generics carefully, preserve inference, consider NoInfer"]
  F -->|No| H{"Is it a structured string domain?"}
  H -->|Yes| I["Use template literal types"]
  H -->|No| J{"Do you need to derive a type from another type?"}
  J -->|Yes| K["Use conditional types with infer or mapped types"]
  J -->|No| L["Keep it simple"]
```

## CSS Decision Tree

```mermaid
flowchart TD
  A["I need to style or lay something out"] --> B{"Is this a repeated system value?"}
  B -->|Yes| C["Put it in a token or custom property"]
  B -->|No| D{"Is it layout?"}
  D -->|Yes| E{"One-dimensional or two-dimensional?"}
  E -->|One-dimensional| F["Use flex"]
  E -->|Two-dimensional| G["Use grid"]
  G --> H{"Does the component depend on its container?"}
  H -->|Yes| I["Use container queries"]
  H -->|No| J["Use intrinsic sizing and minimal breakpoints"]
  D -->|No| K{"Is this stateful or parent-aware styling?"}
  K -->|Yes| L["Consider :has(), focus-visible, semantic states"]
  K -->|No| M["Prefer low-specificity component styles"]
```

## Before I Build A Website Flow

```mermaid
flowchart TD
  A["Before I build a website"] --> B["Clarify product and audience"]
  B --> C["Define primary user action"]
  C --> D["Choose a concrete visual direction"]
  D --> E["Define anti-goals"]
  E --> F["Plan sections based on story, not templates"]
  F --> G["Plan states, accessibility, and responsiveness"]
  G --> H["Decide technical constraints and primitives"]
```

## TypeScript Review Scorecard

Use this when reviewing a component, utility, or library API.

| Area | Good Signal | Warning Sign |
|---|---|---|
| State modeling | Discriminated unions | Multiple booleans and optional bags |
| Inference | Values stay precise | Everything widens to `string` or `any` |
| Config typing | `satisfies`, literal preservation | Broad annotations and manual duplication |
| Public API | Hard to misuse | Too many invalid combinations |
| Assertions | Minimal `as` usage | Assertions everywhere |
| Runtime boundary | Validation exists | Trusting external data blindly |
| Compiler posture | Strict flags enabled | Loose config with hidden holes |

## CSS Review Scorecard

Use this when reviewing a page, component, or system.

| Area | Good Signal | Warning Sign |
|---|---|---|
| Tokens | Shared semantic values | Random per-component values |
| Layout | Grid/flex used intentionally | Layout hacks and magic numbers |
| Responsiveness | Intrinsic sizing and container awareness | Viewport-only breakpoint sprawl |
| Specificity | Low and predictable | Override wars |
| States | Hover, focus, loading, error considered | Happy-path-only styling |
| Accessibility | Focus, contrast, motion handled | Styling that ignores keyboard and contrast |
| Maintainability | Repeated patterns extracted | One-off rules everywhere |

## Website Review Scorecard

Use this before calling a page done.

| Area | Good Signal | Warning Sign |
|---|---|---|
| Clarity | Clear audience and purpose | Generic product language |
| Structure | Sections support the story | Template-driven filler sections |
| Visual direction | Concrete, distinct art direction | "Modern clean" vagueness |
| Interaction | States and feedback feel deliberate | Static ideal-state UI only |
| Responsiveness | Works with awkward content and narrow widths | Breaks outside ideal viewport |
| Accessibility | Focus, contrast, semantics respected | Accessibility bolted on late |
| Performance | Images, layout, and motion are intentional | Heavy visuals with no discipline |

## Quick Checklists

### Before I Start A Component
- What problem does this component solve?
- What prop combinations should be impossible?
- What states and variants exist?
- What accessibility rules apply?
- What examples and tests should exist?

### Before I Start A Page
- What is the user trying to do?
- What is the hierarchy?
- What content is real versus placeholder?
- What does this look like with awkward data?
- What states beyond the happy path need support?

### Before I Build A Website
- What is the site trying to achieve?
- Who is it for?
- What should feel distinct?
- What visual direction am I committing to?
- What patterns am I explicitly avoiding?
- What sections are actually necessary?

### Before I Publish A Library API
- Is the API easy to understand from autocomplete alone?
- Are invalid combinations prevented?
- Does inference stay strong?
- Are names clear?
- Are docs and examples enough for first use?
- What will break in a future version?
