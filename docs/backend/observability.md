# Observability

### Logging
- Structured JSON logs (Pino/Winston) with request `correlationId`
- Levels: debug in dev, info in prod; warn/error for anomalies
- Redact PII and secrets (tokens, passwords)

### Metrics
- Prometheus format: HTTP latency histograms, request counts, error counts
- DB metrics: query durations, pool usage
- Business metrics: projects created, uploads, active users (via events)

### Tracing
- OpenTelemetry SDK with auto-instrumentation for HTTP, PG, Redis
- Export to OTLP collector; sample at 5-10% in production

### Dashboards & Alerts
- Create SLOs: availability, latency p95; alert on burn rate
- Error budget policies for release gating
