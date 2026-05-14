# Node.js Deployment (Astro)

## Using Astro Node Adapter

The template includes `@astrojs/node` adapter for self-hosting.

## Build

```bash
pnpm build
```

## Run

```bash
# Production
node ./dist/server/entry.mjs

# Development
pnpm dev
```

## Environment Variables

Ensure these are set in your production environment:

- `POSTGRES_URL` - Database connection string
- `BETTER_AUTH_SECRET` - Generate a strong secret
- `PUBLIC_APP_URL` - Your production URL
- `OPENROUTER_API_KEY` - For AI features (optional)
- `OPENROUTER_MODEL` - Model name (optional)

## Process Manager

Consider using PM2 or similar for production:

```bash
pm2 start ./dist/server/entry.mjs --name astro-app
```

## Documentation

- [Astro Node Adapter](https://docs.astro.build/en/guides/deploy/node/)