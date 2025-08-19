# Security

### Authentication & Authorization
- JWT with short-lived access tokens and long-lived refresh tokens.
- Passwords hashed with Argon2id or bcrypt (cost tuned for ~200ms).
- Role-based access control (RBAC): `admin`, `manager`, `vendor`, `client`.
- Scopes/permissions checked in service layer and enforced in controllers.

### Transport & Headers
- Enforce HTTPS in production; behind a reverse proxy set `trust proxy`.
- Security headers: `helmet` with CSP tuned for app needs.
- CORS: restrict to known origins; support preflight and credentials when needed.

### Input Validation & Output Encoding
- Validate all params/query/body with Zod/Joi.
- Reject unknown fields; limit sizes; sanitize strings.
- Always return typed, minimal responses. Do not echo secrets.

### Rate Limiting & DDoS
- Token bucket per user/key and fallback per IP.
- Sensitive endpoints (auth, file upload) have stricter limits.

### File Uploads
- Enforce content-type allowlist and max size.
- Store outside web root; generate random filenames; virus-scan if required.

### Secrets & Keys
- Do not log secrets. Redact known keys in logs.
- Store secrets in secret managers; never commit to VCS.

### Auditing
- Log auth events, permission denials, admin actions with correlation IDs.

### Vulnerability Management
- Regular dependency scanning, SAST, container image scan.
- Patch cadence aligned with criticality; emergency out-of-band patches allowed.
