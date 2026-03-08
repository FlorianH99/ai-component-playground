# AI-Assisted Component Playground

## What This Means

This project is not "ChatGPT but for components".

It is a workspace for designing, generating, inspecting, editing, and validating React components with strict TypeScript constraints.

The core idea:
- a user describes a component or UI pattern
- the system generates one or more component implementations
- the result is inspected against typed contracts, accessibility rules, and library conventions
- the user can edit, compare, fork, save, and promote the output into reusable library code

The product should feel closer to a design-system workbench than a generic AI chat app.

## Product Shape

The playground has four main jobs:
- Generate component candidates from a natural-language request
- Show the component as code, rendered preview, props, variants, and states
- Evaluate the output for type safety, accessibility, and API quality
- Help a human refine and save the result instead of blindly accepting AI output

## Why This Is A Strong Project

This fits a frontend engineer with strict TypeScript experience because it shows:
- component API design
- React architecture
- schema validation and typed data boundaries
- preview/runtime isolation
- documentation generation
- AI-assisted workflows with human control
- library-style quality gates instead of raw generation

## Core User Flow

1. User creates a playground session.
2. User describes a component, such as: "Build a polymorphic Button with variants, loading state, left and right icons, and strong accessibility defaults."
3. System expands that into a structured spec.
4. AI generates candidate component files and usage examples.
5. The app renders a live preview and static analysis results.
6. The user edits prompt, spec, or code.
7. The system re-runs validation and optionally generates tests, stories, and docs.
8. The user saves the result to a project workspace or exports it.

## Main Features

### 1. Prompt To Spec
Freeform prompt becomes a structured component spec.

Example spec fields:
- component name
- purpose
- target framework
- prop model
- variants
- states
- accessibility requirements
- composition model
- styling approach
- output files needed

This matters because you do not want the model generating directly from messy prose every time.

### 2. Spec To Artifacts
The generation step should create a small file set, not just one blob of code.

Initial outputs:
- component file
- usage examples
- prop schema summary
- story file or demo scenarios
- test suggestions
- accessibility notes

Later outputs:
- docs page
- migration notes
- changelog draft
- codemod hints

### 3. Preview And Inspection
The app should show:
- rendered preview
- code tabs by file
- props table
- state matrix
- accessibility warnings
- type diagnostics
- lint/test results where possible

### 4. Human Override
The point is not to trust the model.

The point is to make it fast for a human to:
- reject a candidate
- fork it
- edit generated code
- lock parts of the spec
- compare versions
- save approved outputs

## Do We Need A Backend?

For a toy demo: no.
For the serious version: yes.

A backend is useful for:
- storing sessions, prompts, specs, generated artifacts, and version history
- handling model API calls securely
- managing auth and per-user projects
- running heavier validation tasks outside the browser
- tracking generation jobs, retries, logs, and analytics
- saving exports and reusable templates

So if you want backend experience too, this is a good project because the backend is real and justified, not bolted on.

## Suggested System Boundaries

Frontend responsibilities:
- editor UX
- prompt/spec forms
- file explorer and code viewer
- live preview shell
- compare/fork/save workflows
- job status and result presentation

Backend responsibilities:
- auth
- persistence
- generation orchestration
- validation pipeline coordination
- artifact storage
- audit trail / history

Worker responsibilities later:
- long-running generation jobs
- AST transforms
- lint/typecheck/test execution
- doc extraction

## Build Order

1. Define the domain model: sessions, specs, artifacts, validations, versions.
2. Build the prompt-to-spec flow.
3. Add generation and file outputs.
4. Add preview and result inspection.
5. Add persistence and version history.
6. Add deeper validation and export workflows.

## Initial Technical Direction

- Frontend: Next.js + TypeScript
- UI: component-library style shell, not generic marketing UI
- Validation: Zod at API boundaries
- Data: Postgres with Drizzle
- Async state: TanStack Query
- Auth: whatever lightweight provider you want, later if needed
- AI integration: server-side only
- Code generation format: structured artifacts, not plain text only

## Repo Goal

By the time this looks strong on GitHub, a visitor should immediately understand:
- what problem it solves
- why it exists beyond AI hype
- how it handles correctness and review
- how a frontend engineer can use it to build better components
