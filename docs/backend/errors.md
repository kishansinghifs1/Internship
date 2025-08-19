# Error Handling

### Standard Error Shape
```json
{
  "code": "string",      // machine-readable code, e.g., AUTH_INVALID_CREDENTIALS
  "message": "string",   // human-friendly message
  "details": {},          // optional structured details
  "correlationId": "uuid" // request id for tracing
}
```

### Error Categories
- `AUTH_*`: Authentication/authorization failures
- `VALIDATION_*`: Input validation errors
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Duplicate or state conflict
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Unhandled error

### Mapping
- 400: Validation errors
- 401: Missing/invalid credentials
- 403: Insufficient permissions
- 404: Not found
- 409: Conflict
- 429: Rate limited
- 500: Internal errors (sanitized)

### Practices
- Throw typed errors in services and map centrally in an error middleware.
- Include `correlationId` in every response and log entry.
- Redact sensitive fields in error details.
- Prefer specific codes over generic ones to aid troubleshooting.
