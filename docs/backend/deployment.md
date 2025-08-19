# Deployment

### Build
- Node.js 18+ base image; multi-stage build to shrink final image
- `NODE_ENV=production` and `npm ci --only=production`
- Run as non-root user

### Example Dockerfile (outline)
```Dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev && adduser -D app && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Runtime
- Expose health (`/health`) and readiness (`/ready`) endpoints
- Configure liveness/readiness probes in orchestrator
- Min/max replicas based on CPU/memory and latency targets

### CI/CD
- Lint, type-check, test on every PR
- Build Docker image, scan for CVEs, push to registry
- Deploy to staging; run smoke tests; promote to production

### Configuration in Prod
- Inject secrets via platform (Kubernetes Secrets, AWS SSM)
- Enable HTTPS termination at load balancer; set `trust proxy`
- Centralized logging/metrics/traces exporters configured
