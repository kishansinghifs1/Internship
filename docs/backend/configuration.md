# Configuration

### Environment Variables
- `NODE_ENV`: development | test | production
- `PORT`: HTTP port (default 3000)
- `DATABASE_URL`: Postgres connection string
- `DATABASE_POOL_MIN`: Minimum pool size (default 2)
- `DATABASE_POOL_MAX`: Maximum pool size (default 10)
- `JWT_ACCESS_SECRET`: Secret for access tokens
- `JWT_REFRESH_SECRET`: Secret for refresh tokens
- `JWT_ACCESS_TTL`: e.g. 15m
- `JWT_REFRESH_TTL`: e.g. 7d
- `LOG_LEVEL`: trace | debug | info | warn | error | fatal
- `CORS_ORIGIN`: Comma-separated list or `*`
- `RATE_LIMIT_WINDOW_MS`: e.g. 60000
- `RATE_LIMIT_MAX`: e.g. 100
- `REDIS_URL`: Redis connection (optional)
- `STORAGE_BUCKET`: Object storage bucket name (optional)
- `STORAGE_REGION`: Object storage region (optional)
- `FILE_MAX_MB`: Max upload size (default 25)
- `OTEL_EXPORTER_OTLP_ENDPOINT`: OTel collector endpoint (optional)

### Loading Order & Validation
1. Load `.env` via dotenv when not in production.
2. Overlay with process environment.
3. Validate via schema (e.g., Zod) to fail fast with clear messages.

### Config Shape (Example)
```ts
interface AppConfig {
  env: 'development' | 'test' | 'production';
  port: number;
  database: { url: string; poolMin: number; poolMax: number };
  jwt: { accessSecret: string; refreshSecret: string; accessTtl: string; refreshTtl: string };
  cors: { origin: string | string[] };
  rateLimit: { windowMs: number; max: number };
  redis?: { url: string };
  storage?: { bucket: string; region: string };
  files: { maxMb: number };
  logging: { level: string };
  observability?: { otlpEndpoint?: string };
}
```

### Secrets Management
- Prefer environment injection from your orchestrator (Kubernetes secrets, ECS SSM params) over `.env` in production.
- Rotate JWT secrets on a schedule; keep previous secret as secondary during rotation.
