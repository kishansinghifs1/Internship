# Testing

### Types
- Unit: services, utilities, validators
- Integration: controllers + repositories with test DB
- E2E (optional): black-box API tests against ephemeral env

### Tooling
- Test runner: Vitest / Jest
- HTTP testing: Supertest
- Coverage: built-in Istanbul
- DB: Test container (Postgres) or isolated schema

### Conventions
- One test file per unit with the suffix `.spec.ts` or `.test.ts`
- Mock external services (email, storage, payments) with fakes
- Seed minimal fixtures per test; avoid global mutable state

### Example Commands
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### CI Considerations
- Run unit + integration tests in PR
- Cache node_modules, Prisma client generation
- Publish coverage report; fail under threshold
