# Personal Frontend Playbook

## What Good Looks Like

I want frontend work that is:
- hard to misuse
- easy to extend
- visually intentional
- accessible by default
- resilient to awkward states and real content
- maintainable by someone who did not build it first

## My Working Standards

### TypeScript
- Prefer modeling rules over loosely labeling data.
- Make invalid states impossible when practical.
- Preserve inference.
- Avoid `any` and avoid casual `as`.
- Design public APIs so autocomplete teaches usage.
- Use runtime validation at trust boundaries.

### CSS
- Start from tokens and primitives.
- Keep specificity low.
- Use layout systems intentionally.
- Let components adapt to containers, not just viewports.
- Design states early.
- Treat accessibility and motion as first-class concerns.

### React And Components
- Components should have clear contracts.
- Props should not allow nonsense combinations.
- State models should be explicit.
- Loading, empty, error, disabled, and success states all matter.
- Composition should be easier than prop explosion.

### Websites And Pages
- Start with audience and purpose.
- Pick a visual direction with actual constraints.
- Avoid generic template sections unless they earn their place.
- Design for hierarchy, pacing, and content reality.
- Think about mobile and awkward content early.

## Before I Start A Component
- What problem does this solve?
- Who is the consumer: app team, library consumer, or end user?
- What prop combinations should be impossible?
- What states and variants exist?
- What accessibility behavior is required?
- What examples and tests should prove it works?

## Before I Start A Page
- What is the main user task?
- What content is real and what is placeholder?
- What hierarchy should be obvious in 5 seconds?
- What happens with too much content, too little content, or bad data?
- What does this do on narrow widths?

## Before I Build A Website
- What is the site trying to achieve?
- Who is it for?
- What should feel distinct?
- What visual direction am I committing to?
- What patterns am I explicitly avoiding?
- What sections are actually necessary?
- How will I know the site is working?

## Before I Publish A Library API
- Is the API understandable from names and autocomplete?
- Does inference stay strong?
- Are invalid combinations blocked?
- Are examples good enough for first use?
- Are future breaking changes likely?
- What migration pain am I creating?

## TypeScript Rules I Want To Internalize
- Use discriminated unions for UI and async state.
- Use `satisfies` for config maps and registries.
- Preserve literals with `as const` and `const` type parameters.
- Use template literal types for structured strings.
- Use conditional types with `infer` when deriving types cleanly matters.
- Use branded types when raw strings are too weak.
- Use strict compiler flags on purpose.

## CSS Rules I Want To Internalize
- Tokenize repeated values.
- Extract repeated layout patterns into primitives.
- Prefer grid for two-dimensional layout and flex for one-dimensional layout.
- Use container queries where component context matters.
- Use logical properties where possible.
- Use `:focus-visible` for keyboard focus treatment.
- Use `:where()` and layers to avoid specificity creep.
- Use `clamp()` and intrinsic sizing instead of breakpoint sprawl.

## AI Rules I Want To Use
- Do not ask AI for "a modern clean website".
- Ask for concrete visual direction and anti-goals.
- Ask for section plans before code.
- Make the model justify why each section exists.
- Force the model to consider states, responsiveness, and accessibility.
- Treat AI as a design and implementation partner, not an oracle.

## Review Questions
- Is this easy to misuse?
- Is this easy to extend?
- Does this handle ugly reality, not just the happy path?
- Is the visual system coherent?
- Is the code teaching the next person how to use it?
- Would I be proud to pin this on GitHub?

## Anti-Patterns I Want To Avoid
- boolean soup state
- broad types that throw away information
- prop bags that allow nonsense
- random spacing and color values
- specificity wars
- generic landing page structure by default
- shipping only ideal-state UI
- using AI output without a strong point of view
