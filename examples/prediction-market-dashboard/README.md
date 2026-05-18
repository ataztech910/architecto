# Prediction Market Dashboard — Architecto Example

This example demonstrates a complete Architecto project: a real-time prediction market dashboard pulling data from Polymarket and Kalshi.

## Project Structure

```
specs/
├── artifacts/        # Data schemas (market, market_platform, price_history)
├── flows/           # Orchestration logic (ingest-polymarket, ingest-kalshi, load-*.flow.yaml)
├── interfaces/      # UI screens (homepage, market-detail)
├── policies/        # Runtime rules (cache, cron, public-api)
├── behaviors/       # Acceptance scenarios (test cases)
└── workspace/       # File generation mappings (workspace.structure.yaml)
```

## Spec Files

### Artifacts (Data Contracts)

- **`market.artifact.yaml`** — Core market object with probabilities, status, category
- **`market-platform.artifact.yaml`** — Market's presence on Polymarket or Kalshi
- **`price-history.artifact.yaml`** — Time-series price snapshots

### Flows (Orchestration)

- **`ingest-polymarket.flow.yaml`** — Fetch and store Polymarket data
- **`ingest-kalshi.flow.yaml`** — Fetch and store Kalshi data
- **`load-homepage.flow.yaml`** — Get markets for homepage display
- **`load-market-detail.flow.yaml`** — Get market details, prices, related events

### Interfaces (UI)

- **`homepage.interface.yaml`** — `/` route with Top Movers and All Events table
- **`market-detail.interface.yaml`** — `/market/[slug]` with prices, chart, trades

### Policies (Rules)

- **`cache.policy.yaml`** — Cache markets list 60s, detail 30s, never cache history
- **`cron.policy.yaml`** — Run ingestion jobs every 2 minutes
- **`public-api.policy.yaml`** — Markets public, watchlist requires auth

### Behaviors (Acceptance Tests)

- **`homepage.behavior.yaml`** — Test that top movers show, filters work, navigation works
- **`market-detail.behavior.yaml`** — Test probability display, chart, platform comparison, trades

### Workspace

- **`workspace.structure.yaml`** — Maps specs to generated Next.js files

## Features Described

### Real-Time Ingestion

Two flows (`ingest-polymarket`, `ingest-kalshi`) run every 2 minutes via cron endpoints. They:

1. Fetch market data from each API
2. Normalize and validate
3. Upsert markets into `markets` table
4. Upsert platform records into `market_platforms` table
5. Insert historical snapshots into `price_history` table

### Homepage Dashboard

Shows:
- **Top 5 Movers** — Markets with biggest 24h probability change
- **All Events** — Paginated table of all markets
- **Category Filter** — Elections, Crypto, Macro, Sports

### Market Detail Page

Shows for `/market/[slug]`:
- **Probability Display** — Current YES/NO probabilities
- **Price Chart** — Historical prices over time (with timeframe toggle)
- **Platform Comparison** — Polymarket vs Kalshi side-by-side
- **Trade Buttons** — Link to trade on each platform
- **Related Markets** — Similar markets (elections, crypto, etc.)

### Caching Strategy

- `/api/markets` — Cached 60s (list updates slowly)
- `/api/markets/[slug]` — Cached 30s (detail somewhat static)
- `/api/markets/[slug]/history` — No cache (real-time price history)

### Authentication

- Public endpoints: All GET `/api/markets` routes
- Protected endpoints: Watchlist, settings (require login)

## Validation

Validate all specs:

```bash
architecto validate --dir .
```

Expected output: All specs valid (no errors).

## What's Missing (v0.1)

- No code generation yet (workspace.structure.yaml describes structure but doesn't create files)
- No cross-spec validation (specs don't validate foreign key references)
- No runtime execution
- No visual editor

These come in v0.2.

## Code Generation (v0.2)

Once v0.2 adds code generation, this command will generate all files:

```bash
architecto generate
```

This would create:

```
src/
├── app/
│   ├── page.tsx                    (from homepage.interface.yaml)
│   ├── market/[slug]/page.tsx      (from market-detail.interface.yaml)
│   └── api/
│       ├── markets/route.ts        (from load-homepage.flow.yaml)
│       ├── markets/[slug]/route.ts (from load-market-detail.flow.yaml)
│       ├── markets/[slug]/history/route.ts
│       └── cron/
│           ├── polymarket/route.ts (from ingest-polymarket.flow.yaml)
│           └── kalshi/route.ts     (from ingest-kalshi.flow.yaml)
├── db/schema/
│   ├── markets.ts          (from market.artifact.yaml)
│   ├── market-platforms.ts (from market-platform.artifact.yaml)
│   └── price-history.ts    (from price-history.artifact.yaml)
├── services/
│   ├── polymarket.ts       (from ingest-polymarket.flow.yaml)
│   └── kalshi.ts           (from ingest-kalshi.flow.yaml)
└── types/
    ├── market.ts
    ├── market-platform.ts
    └── price-history.ts

cypress/e2e/
├── homepage.cy.ts      (from homepage.behavior.yaml)
└── market-detail.cy.ts (from market-detail.behavior.yaml)
```

## How to Extend

1. **Add a new flow** — Create `specs/flows/my-flow.flow.yaml`
2. **Add a new interface** — Create `specs/interfaces/my-page.interface.yaml`
3. **Add a new artifact** — Create `specs/artifacts/my-entity.artifact.yaml`
4. **Update policies** — Edit `specs/policies/*.policy.yaml`
5. **Add tests** — Create behavior scenarios in `specs/behaviors/`
6. **Map to workspace** — Update `workspace.structure.yaml`

Then validate:

```bash
architecto validate --dir .
```

## Learning Resources

- `ai/dsl/` — Detailed documentation on each spec type
- `ai/AI_SYSTEM.md` — Guide for AI agents reading specs
- `ai/dsl/anti-patterns.md` — Common mistakes to avoid

## Integration Points

This example integrates with:

- **Polymarket API** — Public API for prediction markets
- **Kalshi API** — Public API for binary markets
- **Next.js** — Framework for generated frontend
- **Drizzle ORM** — Type-safe database access
- **PostgreSQL** — Database for markets, prices
- **Cypress** — E2E testing framework

Each of these is described in spec fields but not configured in the specs themselves (implementation detail).

---

For more info on Architecto, see the [main README](../../README.md).
