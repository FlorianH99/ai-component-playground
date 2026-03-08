# Advanced TypeScript Patterns

## What "Advanced TypeScript" Actually Means

Advanced TypeScript is not about making the type system look clever.

It is about using the type system to:
- encode domain rules
- prevent invalid states
- improve API ergonomics
- preserve useful inference
- produce better compiler errors for other developers

That is the real signal of care in a serious codebase.

## The Signals People Notice

A strong TypeScript codebase usually has these qualities:
- invalid states are hard or impossible to represent
- public APIs preserve inference instead of collapsing to `string` or `any`
- config objects are checked without destroying literal information
- generic helpers have good error messages
- runtime boundaries are explicit
- stricter compiler flags are used intentionally

## Patterns Worth Learning

### 1. Make Invalid States Unrepresentable
Use discriminated unions instead of boolean soup.

```ts
interface IdleState {
  status: 'idle';
}

interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: string[];
}

interface ErrorState {
  status: 'error';
  message: string;
}

type FetchState = IdleState | LoadingState | SuccessState | ErrorState;
```

Why this matters:
- it removes impossible combinations like `isLoading: true` and `error: "boom"`
- it makes rendering branches explicit
- it scales well in React state machines

Related TS concept:
- narrowing and `never`-based exhaustiveness checks

```ts
function renderState(state: FetchState) {
  switch (state.status) {
    case 'idle':
      return 'Idle';
    case 'loading':
      return 'Loading';
    case 'success':
      return state.data.join(', ');
    case 'error':
      return state.message;
    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}
```

### 2. Use `satisfies` Instead Of Losing Inference
One of the best signals of care in modern TS is knowing when not to annotate directly.

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonClasses = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-slate-100 text-slate-900',
  ghost: 'bg-transparent text-slate-900',
} satisfies Record<ButtonVariant, string>;
```

Why this matters:
- checks the object shape
- catches missing or extra keys
- keeps each value as its most specific inferred type

This is better than a broad annotation when you want validation without widening.

### 3. Preserve Literals With `as const` And `const` Type Parameters
A lot of mediocre TS code loses useful information too early.

```ts
const sizes = ['sm', 'md', 'lg'] as const;
type Size = (typeof sizes)[number];
```

And for APIs:

```ts
function defineTokens<const T extends Record<string, string>>(tokens: T) {
  return tokens;
}

const spacing = defineTokens({
  xs: '4px',
  sm: '8px',
  md: '12px',
});
```

Why this matters:
- preserves exact keys and values
- improves autocomplete
- enables better downstream derived types

This is especially useful in design systems, token systems, and route/config builders.

### 4. Derive APIs With Mapped Types And Key Remapping
This is where TS stops being labeling and starts becoming a design tool.

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Theme = {
  color: string;
  radius: number;
};

type ThemeGetters = Getters<Theme>;
```

Why this matters:
- removes repetitive hand-written types
- keeps APIs synchronized with source types
- is useful for adapters, selectors, event APIs, and generated helpers

### 5. Use Template Literal Types For Constrained Strings
This is one of the most practical "peculiar" features in TS.

```ts
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonTone = 'primary' | 'danger';

type ButtonClassKey = `${ButtonTone}-${ButtonSize}`;
```

Why this matters:
- constrains stringly-typed APIs
- great for event names, class keys, analytics keys, translation keys, route names
- gives autocomplete for structured strings

### 6. Learn Conditional Types And `infer`
Conditional types are foundational for serious generic APIs.

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ElementType<T> = T extends readonly (infer U)[] ? U : never;
```

Why this matters:
- powers reusable helper types
- lets libraries derive types from user input
- shows up constantly in React utility types and library DX work

This is less about showing off and more about building reliable generic abstractions.

### 7. Use Branded Types For IDs And Domain Values
TypeScript is structurally typed, so plain strings are often too permissive.

```ts
type Brand<T, B extends string> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;
type ComponentId = Brand<string, 'ComponentId'>;

function loadUser(id: UserId) {}
```

Why this matters:
- prevents mixing unrelated IDs
- useful for money, units, database IDs, opaque tokens
- communicates domain intent clearly

This is an inferred best practice, not a built-in TS feature, but it builds on TS’s type composition well.

### 8. Control Generic Inference With `NoInfer`
This is a subtle but strong API-design tool.

```ts
function createVariantMap<T extends string>(
  variants: T[],
  defaultVariant?: NoInfer<T>,
) {
  return { variants, defaultVariant };
}
```

Why this matters:
- prevents the second argument from changing what `T` becomes
- improves errors in builder-style APIs
- useful in component libraries and config helpers

This is the kind of thing people notice when a library feels "surprisingly well typed".

### 9. Use Type Predicates And Control-Flow Narrowing Well
TypeScript is much more powerful when your runtime checks teach the compiler something real.

```ts
const isNonNullish = <T,>(value: T): value is NonNullable<T> => value != null;

const values = ['a', undefined, 'b'].filter(isNonNullish);
```

Why this matters:
- safer collection transforms
- clearer runtime validation code
- removes lazy `as` assertions

TS 5.5 also improved inferred type predicates for certain boolean-returning checks.

### 10. Use Variadic Tuple Types For Composition Helpers
This is especially useful for library and utility work.

```ts
type Fn<I = unknown, O = unknown> = (input: I) => O;

function pipe<T extends readonly Fn[]>(...fns: T) {
  return fns;
}
```

Why this matters:
- can preserve argument/return relationships across function chains
- useful for builder APIs, middleware, event pipelines, and composition helpers
- signals stronger command of TS generics beyond simple wrappers

### 11. Encode React Component APIs With Unions, Not Loose Option Bags
For component libraries, this is one of the strongest signals of care.

Bad:
```ts
type ButtonProps = {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};
```

Better:
```ts
type LinkButtonProps = {
  kind: 'link';
  href: string;
  onClick?: never;
};

type ActionButtonProps = {
  kind: 'action';
  onClick: () => void;
  href?: never;
};

type ButtonProps = LinkButtonProps | ActionButtonProps;
```

Why this matters:
- prevents invalid prop combinations
- produces clearer component contracts
- makes component documentation sharper too

### 12. Tighten The Compiler Flags
A serious TS codebase is not just types in files. It is also compiler posture.

Flags worth caring about:
- `strict`
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `noImplicitOverride`
- `useUnknownInCatchVariables`
- `noPropertyAccessFromIndexSignature`

Why these matter:
- they reveal hidden assumptions
- they force more precise modeling around optional values and index access
- they reduce "looks typed, behaves loosely" code

## Advanced TypeScript For A React/Library Developer

Given your background, the most relevant high-signal areas are:
- discriminated unions for component props and async UI state
- `satisfies` for variant maps, token maps, and config objects
- template literal types for variant keys and event names
- `const` type parameters for token/config builders
- conditional types with `infer` for helper utilities
- branded types for IDs and internal contracts
- `NoInfer` for public generic helper APIs
- stricter tsconfig flags

## What Usually Looks Impressive On GitHub

The strongest signal is not "complex types everywhere".

It is one of these:
- a component API that prevents misuse
- a helper that preserves inference beautifully
- a config system that is both strict and ergonomic
- a state model that makes impossible states impossible
- a public utility with useful error messages and minimal assertions

## What To Avoid

Avoid these traps:
- giant unreadable conditional types with no payoff
- overusing `as`
- creating type puzzles nobody can maintain
- exposing complicated public types where a simpler API would do
- using advanced types without runtime validation at trust boundaries

## Practical Learning Path

1. Get excellent at discriminated unions and exhaustiveness.
2. Use `satisfies` and literal preservation everywhere config matters.
3. Learn mapped types, template literal types, and key remapping.
4. Learn conditional types and `infer` well enough to build helpers.
5. Practice designing one public API with `NoInfer`, tuple inference, and good DX.
6. Tighten tsconfig and fix the fallout.

## How We Can Use This In The Playground Project

This future project is a good place to demonstrate advanced TS by:
- modeling generation states as discriminated unions
- representing component specs as exact schemas plus inferred types
- deriving artifact kinds and file contracts from source definitions
- using template literal types for generated file keys or event channels
- making invalid component spec combinations impossible
- preserving literal inference in config and registry helpers

## Sources

Primary docs used:
- TypeScript Handbook: Narrowing
- TypeScript Handbook: Mapped Types
- TypeScript Handbook: Template Literal Types
- TypeScript Utility Types
- TypeScript Release Notes 4.0, 4.1, 4.9, 5.0, 5.4, 5.5
- TSConfig reference for `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
