# Migrations & Data Lifecycle

### Principles
- Forward-only migrations; never edit historical migrations
- Small, reversible steps; explicit `down` when tool supports
- Each PR that changes DB includes a migration and rollout notes

### Process
1. Update schema (Prisma/Knex)
2. Generate migration
3. Review SQL for safety (locks, concurrent indexes)
4. Apply in staging
5. Verify app compatibility
6. Apply in production via CI/CD step

### Rollback Strategy
- Prefer roll-forward fixes
- For destructive changes, stage `deprecate -> backfill -> switch -> drop` over multiple releases

### Data Tasks
- Backfills executed as idempotent scripts with checkpoints
- Long-running tasks throttled and observable via metrics
