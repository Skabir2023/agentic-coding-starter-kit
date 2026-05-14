# Drizzle ORM Integration

## Overview

Drizzle ORM provides type-safe database access for PostgreSQL.

## Setup

### Environment Variables

```env
POSTGRES_URL=postgresql://username:password@localhost:5432/your_database
```

### Configuration

The database configuration is in `src/lib/db.ts`. The schema is defined in `src/lib/schema.ts`.

## Usage

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Drizzle Studio
pnpm db:studio
```

## Documentation

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Drizzle Kit Docs](https://orm.drizzle.team/kit-docs/overview)