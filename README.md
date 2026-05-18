# Architecto v0.1

**Architecto** is an AI-first declarative architecture protocol. It helps teams describe software systems through portable specs before materializing them into framework-specific code.

## What is Architecto?

Architecto is **protocol-first**, not runtime-first. It defines a set of YAML-based specification types that describe:

- **Flows** — orchestration and data pipelines
- **Interfaces** — UI structure, states, and user actions
- **Artifacts** — data contracts and schemas
- **Policies** — execution rules, caching, auth, rate limiting
- **Behaviors** — acceptance scenarios
- **Workspaces** — folder structure and generation mapping

Specs are the **source of truth**. Code is the materialization.

## Installation

```bash
npm install -g architecto
```

Or use locally:

```bash
npm install
npm run build
node dist/index.js --help
```

## Quick Start

### Initialize a project

```bash
architecto init
```

Creates:
- `specs/` — directory for all spec files (flows, interfaces, artifacts, policies, behaviors, workspace)
- `ai/dsl/` — DSL documentation explaining spec types
- `AI_SYSTEM.md` — guide for AI agents reading your specs
- `architecto.config.yaml` — project configuration

### Validate specs

```bash
architecto validate
```

Validates all YAML files in `specs/`:
- Required fields per spec kind
- Flow dependencies (inputs, outputs, step ordering)
- Cross-references and consistency

Exit code `0` if valid, `1` if errors found.

```bash
architecto validate --dir path/to/specs
```

## Example: Prediction Market Dashboard

See `examples/prediction-market-dashboard/` for a complete example with:

- 3 artifact specs (market, market_platform, price_history)
- 4 flow specs (ingest-polymarket, ingest-kalshi, load-homepage, load-market-detail)
- 2 interface specs (homepage, market-detail)
- 3 policy specs (cron, cache, public-api)
- 2 behavior specs (homepage, market-detail)
- 1 workspace spec

Validate the example:

```bash
architecto validate --dir examples/prediction-market-dashboard/specs
```

## Spec Types

### Flow

Describes orchestration, data pipelines, and step dependencies.

```yaml
kind: flow
name: ingest-polymarket
version: "0.1"
inputs:
  - api_base_url
outputs:
  - ingested_count
steps:
  - id: fetch-markets
    action: http.get
    requires:
      - api_base_url
    provides:
      - raw_markets
    critical: true
    onError: fail
```

### Interface

Describes UI screens, states, actions, and components.

```yaml
kind: interface
name: homepage
version: "0.1"
route: /
states:
  - id: loading
  - id: loaded
actions:
  - id: filter-by-category
    triggers: reload-events
components:
  - id: top-movers-section
    type: section
```

### Artifact

Describes data contracts and database schemas.

```yaml
kind: artifact
name: market
version: "0.1"
fields:
  - name: id
    type: uuid
    required: true
  - name: title
    type: string
    required: true
  - name: yes_probability
    type: float
```

### Policy

Describes runtime rules: caching, auth, rate limiting, execution constraints.

```yaml
kind: policy
name: cache
version: "0.1"
rules:
  - id: markets-list-cache
    applies_to: GET /api/markets
    condition: cache_ttl_seconds == 60
    action: cache-response
```

### Behavior

Describes acceptance scenarios in Gherkin-style given/when/then.

```yaml
kind: behavior
name: homepage
version: "0.1"
scenarios:
  - id: shows-top-movers
    given: The database has markets with price changes
    when: User visits the homepage
    then: Top 5 movers are displayed
```

### Workspace

Describes folder structure and generation mappings.

```yaml
kind: workspace
name: prediction-market-dashboard
version: "0.1"
structure:
  - path: src/app/page.tsx
    generated_from: homepage.interface.yaml
    generate_with: nextjs-page
```

## How to use Architecto

1. **Init** — `architecto init` to scaffold specs directory
2. **Read DSL docs** — check `ai/dsl/` and `AI_SYSTEM.md` to understand spec types
3. **Write specs** — describe your system's architecture as YAML
4. **Validate** — run `architecto validate` to check for errors
5. **Share with AI** — feed specs + `AI_SYSTEM.md` to Claude/LLMs for code generation
6. **Iterate** — update specs, regenerate code, validate again

## Design Principles

- **Specs are source of truth** — code is generated from specs, not the other way around
- **No business logic in specs** — specs describe structure, not implementation
- **Protocol, not runtime** — Architecto doesn't execute code, just validates structure
- **AI-first** — specs are designed to be readable by LLMs
- **Portable** — specs are framework-agnostic (Next.js, Remix, Fastify, etc.)
- **Simple defaults** — optional fields have sensible defaults

## Validation Rules

### Flow Validation

- Each `requires` item must come from `inputs` or a previous step's `provides`
- Each `provides` item should be used by a later step or declared in `outputs`
- Critical steps (`critical: true`) must not have `onError: warn` or `onError: skip`
- Disabled steps must not break downstream steps that depend on their outputs

### Common Validation

- `kind` must be one of: flow, interface, artifact, policy, behavior, workspace
- `name` must be present and non-empty
- `version` (if present) must follow semver

## Limitations (v0.1)

- No cross-spec validation (specs reference each other but relationships aren't validated)
- No code generation (workspace specs describe structure but don't generate files)
- No visual editor
- No runtime/execution engine
- `architecto init` uses static templates (no interactive prompts)

These are intentional — v0.1 is protocol-first. Code generation comes in v0.2.

## What's Next (v0.2)

- Cross-spec validation (flow steps reference real artifacts)
- Code generation (materialize specs to framework-specific code)
- Watch mode (validate on file changes)
- Schema export (JSON Schema, OpenAPI, etc.)
- Visual editor
- Workspace generation

## Learn More

- [AI System Guide](ai/AI_SYSTEM.md) — How to prompt AI with Architecto specs
- [DSL Reference](ai/dsl/) — Detailed spec type documentation
- [Examples](examples/) — Real-world example projects

## Contributing

Issues and PRs welcome!

---

Made with ❤️ for AI-first teams building architecture-as-code.
