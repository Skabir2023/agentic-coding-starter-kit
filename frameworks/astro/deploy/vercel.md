# Vercel Deployment (Astro)

## Quick Deploy

```bash
npm install -g vercel
vercel --prod
```

## Using Astro Vercel Adapter

The template includes `@astrojs/vercel` adapter for server-side rendering on Vercel.

### Environment Variables

Set these in the Vercel dashboard:

- `POSTGRES_URL` - Database connection string
- `BETTER_AUTH_SECRET` - Generate a strong secret
- `PUBLIC_APP_URL` - Your production URL
- `OPENROUTER_API_KEY` - For AI features (optional)
- `OPENROUTER_MODEL` - Model name (optional)
- `BLOB_READ_WRITE_TOKEN` - For Vercel Blob (optional)

## Documentation

- [Astro Vercel Adapter](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Docs](https://vercel.com/docs)