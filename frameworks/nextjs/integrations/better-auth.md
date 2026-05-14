# Better Auth Integration

## Overview

Better Auth provides authentication for the Next.js application with email/password and OAuth providers.

## Setup

### Environment Variables

```env
BETTER_AUTH_SECRET=your-random-32-character-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# For Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Configuration

The auth configuration is in `src/lib/auth.ts`. Update the configuration to add additional OAuth providers.

## Documentation

- [Better Auth Docs](https://www.better-auth.com/docs)
- [OAuth Providers](https://www.better-auth.com/docs/oauth-providers)