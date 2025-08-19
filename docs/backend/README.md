# BuildBridge AI — Backend (Express) Documentation

This folder contains the complete documentation suite for the backend API built with Express. It’s structured to help developers, DevOps, security reviewers, and stakeholders understand how the service is designed, how to run it locally, how it’s deployed, and how to consume the API.

## Table of Contents

- [Overview](#overview)
- [Architecture](./architecture.md)
- [API Reference (OpenAPI)](./api/openapi.yaml)
- [Configuration](./configuration.md)
- [Security](./security.md)
- [Database](./database.md)
- [Error Handling](./errors.md)
- [Testing](./testing.md)
- [Observability](./observability.md)
- [Deployment](./deployment.md)
- [Migrations & Data Lifecycle](./migrations.md)
- [Runbooks & Playbooks](./playbooks.md)
- [Requests Examples](./api/requests.http)

## Overview

The backend provides RESTful APIs for BuildBridge AI, powering core product areas:

- Authentication and authorization (JWT + refresh tokens, role-based access)
- User and company management
- Project management (projects, updates, milestones)
- Vendor marketplace (vendors, services, discovery)
- Documents service (uploads, access controls)
- Analytics & reporting endpoints

### Tech Stack

- Runtime: Node.js 18+
- Framework: Express 4+
- Database: PostgreSQL (primary) + optional object storage for files
- ORM/Client: Prisma (recommended) or Knex
- Auth: JWT (access + refresh), Bcrypt/Argon2 for hashing
- Validation: Zod / Joi / Celebrate
- Caching: Redis (optional)
- Observability: Pino/Winston logging, OpenTelemetry traces, Prometheus metrics

### Recommended Project Structure

```
backend/
  src/
    app.ts            # Express app wiring (middlewares, routes)
    server.ts         # HTTP server bootstrap & graceful shutdown
    routes/           # Route definitions per domain
    controllers/      # HTTP controllers
    services/         # Business logic
    repositories/     # Data access layer (DB/Cache/3rd party)
    middlewares/      # Auth, validation, rate-limiters
    validators/       # Zod/Joi schemas
    utils/            # Shared helpers
    config/           # Config loader (env, defaults)
    jobs/             # Background/cron workers (optional)
    types/            # Shared types
  prisma/             # Prisma schema & migrations (if using Prisma)
  Dockerfile
  docker-compose.yml
  .env.example
  package.json
```

## Quick Start (Local Development)

1) Prerequisites

- Node.js 18+
- Postgres 14+ (local or container)
- Redis (optional, for caching/rate limits)

2) Environment

- Copy `.env.example` to `.env` and set values.

3) Install & Run

```bash
npm install
# if using Prisma
npx prisma migrate deploy
npm run dev
```

The service exposes health at `GET /health` and the OpenAPI spec at `docs/backend/api/openapi.yaml`.

## API

- Full OpenAPI spec: `docs/backend/api/openapi.yaml`
- Ready-to-run request samples: `docs/backend/api/requests.http`

## Security & Compliance

- See `docs/backend/security.md` for authentication, RBAC, data protection, rate limiting, and secure defaults.

## Contribution

- Follow `docs/backend/testing.md` and `docs/backend/migrations.md` when adding features touching data.
- Ensure all endpoints are documented in `openapi.yaml` and include validation and error models.


