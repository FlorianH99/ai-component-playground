# TypeScript Tips And Tricks

## Keep These In Mind

- Model states with discriminated unions, not multiple booleans.
- Prefer `satisfies` when validating config objects.
- Preserve literals with `as const` and `const` type parameters.
- Use unions to prevent invalid prop combinations.
- Use template literal types for structured strings.
- Use conditional types with `infer` for reusable type extraction.
- Reach for branded types when plain strings are too weak.
- Avoid `as` unless you are crossing a boundary you truly understand.
- Keep runtime validation at trust boundaries.
- Turn on strict compiler flags and live with the consequences.

## Practical Reminders

### Design Better Public APIs
- preserve inference
- avoid `any`
- avoid over-widening to `string`
- make invalid inputs impossible where practical
- prefer helpful constraints over clever complexity

### Design Better React Props
- use discriminated unions for mutually exclusive props
- use `never` to block invalid combinations
- think about component states as contracts, not optional bags

### Design Better Config
- derive unions from constant arrays
- use `satisfies` for maps and registries
- infer types from source objects instead of duplicating them manually

### Write Safer Generic Helpers
- use `infer` to extract types instead of forcing duplicate declarations
- use `NoInfer` when one parameter should not control inference
- keep generic parameters small and purposeful

### Maintainability Rules
- if a type is hard to explain, it is probably too clever
- if the runtime can be wrong, the type alone is not enough
- if a helper hurts error readability, redesign it
- if the API requires docs to understand basic usage, simplify it

## High-Signal Patterns

```ts
const variants = ['primary', 'secondary', 'ghost'] as const;
type Variant = (typeof variants)[number];
```

```ts
const classes = {
  primary: '...',
  secondary: '...',
  ghost: '...',
} satisfies Record<Variant, string>;
```

```ts
type ButtonProps =
  | { kind: 'link'; href: string; onClick?: never }
  | { kind: 'action'; onClick: () => void; href?: never };
```

```ts
type EventName = `component:${string}:updated`;
```

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

## Compiler Flags Worth Respecting

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true
  }
}
```

## What Usually Impresses People

- APIs that feel hard to misuse
- config that is strict and still ergonomic
- component contracts that prevent nonsense
- inference that "just works"
- minimal assertions
- good compiler errors
