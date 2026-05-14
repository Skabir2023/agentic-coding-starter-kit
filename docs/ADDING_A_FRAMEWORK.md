# Adding a New Framework

This guide explains how to add a new framework (e.g., SvelteKit, Nuxt) to the monorepo.

## Prerequisites

- The framework must be a Node.js-based web framework
- It should support server-side rendering (SSR)
- It should have good TypeScript support

## Steps

### 1. Create the Framework Directory

```bash
mkdir -p frameworks/<framework-name>/{templates,integrations,deploy,prompts}
```

### 2. Create the Template

Copy the basic structure from an existing framework (e.g., `frameworks/nextjs/templates/` or `frameworks/astro/templates/`).

Key files to include:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- Configuration files (vite.config, svelte.config, etc.)
- Source files (pages, components, lib)
- Environment template (`env.example`)
- Docker Compose file (`docker-compose.yml`)

### 3. Create Integration Documentation

In `frameworks/<framework-name>/integrations/`:

- `README.md` - Overview of available integrations
- `better-auth.md` - Auth setup instructions
- `drizzle-orm.md` - Database setup instructions
- `openrouter.md` - AI integration instructions
- Any framework-specific integration docs

### 4. Create Deployment Configuration

In `frameworks/<framework-name>/deploy/`:

- `<platform>.md` - Deployment instructions for each platform
- `.vercelignore` - Files to exclude from deployment

### 5. Create Framework Conventions

In `frameworks/<framework-name>/prompts/`:

- `<framework>-conventions.md` - AI agent coding conventions specific to this framework

### 6. Update the CLI

Edit `create-agentic-app/index.js` to add the new framework to the selection options.

### 7. Test the CLI

Run the CLI in dry-run mode to verify:

```bash
node create-agentic-app/index.js --dry-run
```

Select your new framework and verify the file list is generated correctly.

## Example: Adding SvelteKit

```
frameworks/sveltekit/
├── templates/
│   ├── src/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── app.html
│   ├── static/
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
├── integrations/
│   ├── README.md
│   ├── better-auth.md
│   └── ...
├── deploy/
│   ├── vercel.md
│   └── .vercelignore
└── prompts/
    └── sveltekit-conventions.md
```

## Best Practices

1. **Consistency**: Keep the directory structure consistent across frameworks
2. **Documentation**: Document any framework-specific quirks or patterns
3. **Testing**: Test the CLI thoroughly with the new framework
4. **Integration parity**: Try to match the features available in other frameworks