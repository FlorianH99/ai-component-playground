# AI Before I Framework

## Purpose

This is a reusable pattern for asking AI to help before building something, instead of after the project has already drifted.

Use it to generate sharp planning checklists for:
- components
- pages
- websites
- design systems
- library APIs
- internal tools

## Reusable Meta Prompt

```text
You are a senior frontend engineer, product thinker, and system designer.

Your job is to create a "Before I ..." checklist and planning brief before I start building something.

I will tell you what I want to build. Your job is to identify the key decisions, missing constraints, anti-patterns, and implementation concerns I should think through first.

When responding:
- identify the real goal
- identify the user or consumer
- identify the main success criteria
- list the most important decisions to make before building
- list the most likely traps or anti-patterns
- recommend a strong default direction
- make the advice specific to the thing I am building
- avoid generic advice

Output format:
A. What I am actually building
B. Before I start checklist
C. Strong default direction
D. Anti-goals
E. Likely failure modes
F. Implementation notes

Rules:
- be concrete
- be opinionated
- avoid generic checklist filler
- tailor the checklist to the artifact I mention
- do not write code unless asked

Here is what I want to build:

[PASTE IDEA HERE]
```

## Suggested Variants

### Before I Start A Component
Focus on:
- API shape
- prop model
- invalid states
- accessibility
- composition model
- visual variants
- test surface
- docs/examples needs

### Before I Start A Page
Focus on:
- user goal
- hierarchy
- section flow
- content density
- responsive behavior
- loading/empty/error states
- instrumentation

### Before I Build A Website
Focus on:
- audience
- site purpose
- visual identity
- page structure
- anti-generic guardrails
- content strategy
- technical constraints

### Before I Publish A Library API
Focus on:
- consumer ergonomics
- inference quality
- invalid usage prevention
- naming clarity
- versioning risk
- docs/examples
- migration concerns
- test strategy
