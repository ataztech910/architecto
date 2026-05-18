# Personal Finance App — Architecto Example

A complete Architecto project demonstrating a personal finance application with transaction tracking, budgeting, and financial insights.

## Project Structure

```
specs/
├── artifacts/        # Data schemas (transaction, account, budget, category)
├── flows/           # Orchestration logic (sync transactions, calculate budgets, generate reports)
├── interfaces/      # UI screens (dashboard, transactions, budgets)
├── policies/        # Runtime rules (cache, sync intervals, authentication)
├── behaviors/       # Acceptance scenarios (test cases)
└── workspace/       # File generation mappings (workspace.structure.yaml)
```

## Spec Files

### Artifacts (Data Contracts)

- **`transaction.artifact.yaml`** — Individual transaction with amount, category, date, description
- **`account.artifact.yaml`** — Bank/wallet account with balance, type, institution
- **`budget.artifact.yaml`** — Monthly budget by category with spending limits
- **`category.artifact.yaml`** — Spending category with color, icon, description

### Flows (Orchestration)

- **`sync-transactions.flow.yaml`** — Fetch and store transactions from connected accounts
- **`calculate-budget-status.flow.yaml`** — Compute spending vs budget for current period
- **`generate-monthly-report.flow.yaml`** — Create summary of income, expenses, savings
- **`load-dashboard.flow.yaml`** — Get all data for dashboard display

### Interfaces (UI)

- **`dashboard.interface.yaml`** — `/` route with account overview, recent transactions, budget status
- **`transactions.interface.yaml`** — `/transactions` with filterable transaction list
- **`budgets.interface.yaml`** — `/budgets` with budget management interface

### Policies (Rules)

- **`cache.policy.yaml`** — Cache dashboard 30s, transactions 10s
- **`sync.policy.yaml`** — Auto-sync transactions every 15 minutes
- **`auth.policy.yaml`** — All routes require authentication

### Behaviors (Acceptance Tests)

- **`dashboard.behavior.yaml`** — Test dashboard displays accounts, recent transactions, budget status
- **`transactions.behavior.yaml`** — Test filtering, sorting, transaction details
- **`budgets.behavior.yaml`** — Test budget creation, spending tracking, alerts

### Workspace

- **`workspace.structure.yaml`** — Maps specs to generated Next.js files

## Features Described

### Account Synchronization

Flow `sync-transactions` runs every 15 minutes via cron:
1. Fetch transactions from connected accounts (bank APIs)
2. Normalize and validate transaction data
3. Upsert transactions into database
4. Update account balances

### Dashboard

Shows:
- **Account Overview** — Total balance across all accounts
- **Recent Transactions** — Last 10 transactions
- **Budget Status** — Spending vs budget by category
- **Net Income** — Total income vs expenses this month

### Transactions List

Shows all transactions with:
- Date, description, amount, category
- Filtering by date range, category, account
- Sorting by date, amount
- Transaction details view

### Budget Management

Allows users to:
- Set monthly budgets by category
- View spending vs budget
- Get alerts when spending exceeds 80%
- Adjust budgets mid-month

## Validation

Validate all specs:

```bash
architecto validate --dir .
```

Expected output: All specs valid (no errors).

## What's Missing (v0.1)

- No code generation yet
- No cross-spec validation
- No runtime execution
- No visual editor

These come in v0.2.

## Code Generation (v0.2)

Once v0.2 adds code generation, specs will generate:

```
src/
├── app/
│   ├── page.tsx                 (from dashboard.interface.yaml)
│   ├── transactions/page.tsx    (from transactions.interface.yaml)
│   ├── budgets/page.tsx         (from budgets.interface.yaml)
│   └── api/
│       ├── accounts/route.ts    (from load-dashboard.flow.yaml)
│       ├── transactions/route.ts
│       ├── budgets/route.ts
│       └── cron/sync/route.ts   (from sync-transactions.flow.yaml)
├── db/schema/
│   ├── transactions.ts
│   ├── accounts.ts
│   ├── budgets.ts
│   └── categories.ts
├── services/
│   ├── bank-sync.ts
│   └── budget-calculator.ts
└── types/
    ├── transaction.ts
    ├── account.ts
    └── budget.ts
```

## How to Extend

1. **Add a new flow** — Create `specs/flows/my-flow.flow.yaml`
2. **Add a new page** — Create `specs/interfaces/my-page.interface.yaml`
3. **Add a new entity** — Create `specs/artifacts/my-entity.artifact.yaml`
4. **Update policies** — Edit `specs/policies/*.policy.yaml`
5. **Add tests** — Create behavior scenarios
6. **Map to workspace** — Update `workspace.structure.yaml`

Then validate:

```bash
architecto validate --dir .
```

## Learning Resources

- `ai/dsl/` — Detailed documentation on each spec type
- `ai/AI_SYSTEM.md` — Guide for AI agents reading specs
- `ai/dsl/anti-patterns.md` — Common mistakes to avoid

---

For more info on Architecto, see the [main README](../../README.md).
