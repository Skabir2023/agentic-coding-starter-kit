# Vercel Deployment

## Quick Deploy

```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

Set these in the Vercel dashboard:

- `POSTGRES_URL` - Database connection string
- `BETTER_AUTH_SECRET` - Generate a strong secret
- `NEXT_PUBLIC_APP_URL` - Your production URL
- `OPENROUTER_API_KEY` - For AI features (optional)
- `OPENROUTER_MODEL` - Model name (optional)
- `BLOB_READ_WRITE_TOKEN` - For Vercel Blob (optional)

## Build Command

The default `pnpm build` runs migrations before building. Use `pnpm build:ci` to skip migrations if your host runs them separately.

## Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)