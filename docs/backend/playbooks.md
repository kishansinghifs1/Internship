# Runbooks & Playbooks

### API 5xx Spike
- Check recent deployments; roll back if correlated
- Inspect error logs with `correlationId` top offenders
- Check DB connectivity and latency dashboards

### Elevated Latency
- Inspect p95/p99 latency; differentiate CPU vs I/O bound
- Scale replicas if CPU-bound; check DB slow queries if I/O-bound
- Review recent feature flags

### Auth Failures
- Verify JWT secrets and clock skew
- Check user store availability
- Audit rate-limiter for false positives

### Storage Errors
- Validate credentials/permissions for object storage
- Check bucket limits and regional outages

### Database Migration Issue
- Halt rollout; assess partial application
- If safe, roll forward with fix; otherwise restore from backup
