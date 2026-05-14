# Better Auth Integration (Astro)

## Overview

Better Auth provides authentication for the Astro application with email/password and OAuth providers.

## Setup

### Environment Variables

```env
BETTER_AUTH_SECRET=your-random-32-character-secret-key-here
BETTER_AUTH_URL=http://localhost:4321

# For Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Astro-Specific Configuration

The auth configuration is in `src/lib/auth.ts`. Unlike Next.js, Astro uses `toWebHandler()` to create the API route handler:

```typescript
// src/pages/api/auth/[...all].ts
import { auth } from "../../../lib/auth";
import { toWebHandler } from "better-auth/node";

export const ALL = toWebHandler(auth);
```

## Documentation

- [Better Auth Docs](https://www.better-auth.com/docs)
- [Astro Integration Guide](https://docs.astro.build/en/guides/server-side-rendering/)