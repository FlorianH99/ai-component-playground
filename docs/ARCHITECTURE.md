# Architecture

## Architecture Goal

Build a system that turns a rough component request into a reviewable, typed, multi-file component artifact with preview, validation, and version history.

## High-Level Architecture

```text
Browser UI
  -> App server / API
    -> Database
    -> AI provider
    -> Validation services
    -> Artifact storage
```

Later:

```text
Browser UI
  -> App server / API
    -> Database
    -> Job queue
      -> Generation worker
      -> Validation worker
      -> Export worker
    -> AI provider
    -> Artifact storage
```

## Frontend App

Primary frontend areas:
- Workspace shell
- Prompt editor
- Structured spec editor
- Artifact file tree
- Code viewer/editor
- Live preview pane
- Validation/results panel
- Version history / compare view

Key frontend concerns:
- Keep generated state normalized
- Treat generation as a sequence of typed job states
- Separate editable source-of-truth objects from rendered previews
- Prevent preview execution from leaking into the main app runtime

## Backend API

The backend should own orchestration and persistence.

Core backend modules:
- `auth`
- `sessions`
- `component-specs`
- `generation-jobs`
- `artifacts`
- `validations`
- `versions`
- `exports`

Example API surface:
- `POST /api/sessions`
- `GET /api/sessions/:id`
- `POST /api/sessions/:id/spec`
- `POST /api/sessions/:id/generate`
- `GET /api/jobs/:id`
- `POST /api/artifacts/:id/validate`
- `POST /api/sessions/:id/save-version`
- `POST /api/sessions/:id/export`

## Domain Model

### Session
A working container for one component exploration.

Fields:
- `id`
- `title`
- `userId`
- `status`
- `createdAt`
- `updatedAt`

### ComponentSpec
The structured interpretation of a user request.

Fields:
- `id`
- `sessionId`
- `name`
- `description`
- `framework`
- `stylingStrategy`
- `accessibilityRequirements`
- `propsSchema`
- `variants`
- `states`
- `slots`
- `constraints`
- `outputTargets`
- `lockedFields`

### Artifact
A generated output file or metadata object.

Fields:
- `id`
- `sessionId`
- `versionId`
- `kind`
- `path`
- `content`
- `language`
- `source`

Artifact kinds:
- `component`
- `example`
- `story`
- `test`
- `docs`
- `notes`
- `analysis`

### ValidationResult
Machine-produced checks against generated artifacts.

Fields:
- `id`
- `artifactId`
- `type`
- `status`
- `summary`
- `details`
- `createdAt`

Validation types:
- `schema`
- `typescript`
- `eslint`
- `a11y`
- `design-system-rules`
- `runtime-preview`

### Version
A saved checkpoint for comparison and rollback.

Fields:
- `id`
- `sessionId`
- `label`
- `promptSnapshot`
- `specSnapshot`
- `createdAt`

## Generation Pipeline

1. User enters prompt.
2. Backend creates or updates a `ComponentSpec`.
3. User reviews and edits the spec.
4. Backend sends a structured generation request to the model.
5. Model returns artifact payloads.
6. Backend normalizes artifacts and stores them.
7. Validation pipeline runs.
8. Frontend displays artifacts, preview, and validation results.
9. User edits and saves a new version.

## Why Structured Generation Matters

Do not let the model be the API.

A better approach is:
- model receives strict instructions plus schema
- model returns structured JSON or clearly separated file payloads
- backend validates shape before persistence
- frontend renders only validated results

That gives you stronger boundaries and better TS leverage.

## Preview Strategy

This is one of the hardest parts of the project.

Options:
- Simple first pass: render generated React snippets inside a controlled preview route with a limited component registry.
- Stronger version: compile generated files in an isolated sandbox runtime.
- Strongest version: run preview compilation and render in a separate worker or containerized environment.

Recommendation:
Start with a constrained preview system instead of arbitrary code execution.

Example constraint:
- only allow generated components built from a known UI primitive registry
- resolve imports from a local component map
- disallow arbitrary package installation in v1

## Backend Learning Value

This project gives you legitimate backend exposure in:
- API design
- schema validation
- persistence modeling
- async job orchestration
- AI request handling
- worker pipelines
- auth and user ownership
- audit/history systems

That is much more useful than adding a fake backend just to say you did full stack work.

## Recommended Phases

### Phase 1: Local Single-User Prototype
- no auth
- one session at a time
- prompt -> spec -> generation -> preview
- local or simple DB

### Phase 2: Persistent App
- database-backed sessions and versions
- auth
- saved artifacts
- compare versions

### Phase 3: Job System
- queued generation
- background validation
- retries and logs
- export pipeline

### Phase 4: Library-Grade Features
- component contract rules
- generated docs/stories/tests
- library presets
- migration support

## Initial Folder Direction

```text
ai-component-playground/
  app/
  src/
    features/
      playground/
      generation/
      preview/
      validation/
    lib/
      ai/
      db/
      schemas/
      component-spec/
  docs/
    ARCHITECTURE.md
```

## Immediate Next Step

Before writing UI code, define the TypeScript domain types and Zod schemas for:
- prompt input
- component spec
- generation request
- artifact response
- validation result

That gives the whole project a stable spine.
