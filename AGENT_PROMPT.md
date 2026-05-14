# 🤖 Agent Prompt — Extend `agentic-coding-starter-kit` with Multi-Framework Support (Next.js + Astro)

> **How to use this prompt:**  
> 1. Clone or unzip `https://github.com/Skabir2023/agentic-coding-starter-kit` into a local folder.  
> 2. Open that folder in your terminal and launch opencode (or any AI agent CLI).  
> 3. Paste the entire contents of this file as your first message to the agent.  
> 4. Let the agent work through every numbered task in order — do NOT skip steps.

---

## 🎯 Goal

Restructure the existing `agentic-coding-starter-kit` (which is currently a **Next.js-only** boilerplate) into a **multi-framework monorepo** that:

- Keeps all existing Next.js code working exactly as before.
- Adds a parallel **Astro** framework template with equivalent functionality.
- Extracts all AI-agent infrastructure (rules, prompts, MCP config, memory patterns, etc.) into a shared `core/` layer used by **both** frameworks.
- Updates the `create-agentic-app` CLI so that `npx create-agentic-app@latest` asks the user to pick either **Astro** or **Next.js** before scaffolding.

---

## 📁 Target Directory Structure

After completing all tasks the repo root must look like this:

```
agentic-coding-starter-kit/
│
├── core/                          # Shared AI-agent infrastructure (framework-agnostic)
│   ├── agents/                    # Reusable agent definitions / system prompts
│   ├── mcp/                       # Shared .mcp.json and MCP server configs
│   ├── prompts/                   # Shared prompt templates (markdown)
│   ├── memory/                    # Memory patterns, summarisation helpers
│   ├── workflows/                 # Claude Code slash-command workflow files
│   ├── coding-rules/              # Shared cursor rules / linting / code-style rules
│   └── shared-tools/              # Utility scripts used by both frameworks
│
├── frameworks/
│   ├── nextjs/                    # The original Next.js boilerplate (refactored)
│   │   ├── templates/             # The actual Next.js app source (mirrors current repo root)
│   │   ├── integrations/          # Next.js-specific integrations (Better Auth, Drizzle, etc.)
│   │   ├── deploy/                # Vercel deployment configs and scripts
│   │   └── prompts/               # Next.js-specific AI prompts
│   │
│   └── astro/                     # New Astro boilerplate (created from scratch)
│       ├── templates/             # Astro app source
│       ├── integrations/          # Astro-specific integrations
│       ├── deploy/                # Astro deployment configs
│       └── prompts/               # Astro-specific AI prompts
│
├── create-agentic-app/            # CLI tool — updated to support framework selection
│   ├── index.js                   # Main CLI entry point (updated)
│   └── package.json
│
├── docs/                          # Updated documentation
├── .github/                       # GitHub Actions (keep existing)
├── README.md                      # Updated root README
└── package.json                   # Root package.json (workspace-aware)
```

---

## 📋 Step-by-Step Tasks

Work through every task in order. After each task, confirm the file system matches what is described before moving on.

---

### TASK 1 — Audit the existing repo

Read and understand the following files before making any changes:

- `README.md`
- `package.json`
- `CLAUDE.md`
- `.mcp.json`
- `.cursor/rules/` (all files)
- `.claude/commands/` (all files)
- `create-agentic-app/index.js` (or whichever file is the CLI entry point)
- `src/` directory structure (Next.js app)
- `drizzle.config.ts`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`

Write a short summary (as a code comment in a new file `docs/AUDIT.md`) listing:
1. What each major file/folder does.
2. Which files are Next.js-specific vs framework-agnostic.
3. Which AI-agent files (prompts, rules, MCP config) are shared vs framework-specific.

---

### TASK 2 — Create the `core/` layer

Create the `core/` directory with the following subdirectories and files:

#### `core/agents/`
- Move or copy any agent system-prompt files from `.claude/` or `src/` that are **not** tied to Next.js routing/components.
- Create `core/agents/README.md` explaining what goes here (reusable AI agent definitions).

#### `core/mcp/`
- Copy the root `.mcp.json` here as `core/mcp/mcp.json`.
- Create `core/mcp/README.md` explaining MCP server configuration.

#### `core/prompts/`
- Move shared, framework-agnostic prompt templates from `.claude/commands/` here.
- Keep only the **workflow** commands (checkpoint, create-feature, continue-feature, publish-to-github) in `core/workflows/` (see next sub-task).
- Create `core/prompts/README.md`.

#### `core/workflows/`
- Copy the four Claude Code slash-command files from `.claude/commands/`:
  - `checkpoint.md`
  - `continue-feature.md`
  - `create-feature.md`
  - `publish-to-github.md`
- Create `core/workflows/README.md` explaining these are Claude Code slash commands usable with both frameworks.

#### `core/coding-rules/`
- Copy all files from `.cursor/rules/` into `core/coding-rules/`.
- Create `core/coding-rules/README.md` explaining these are shared linting/style rules.

#### `core/memory/`
- Create `core/memory/README.md` explaining the memory layer (summarisation, context persistence patterns for agents).
- Create a starter file `core/memory/memory-patterns.md` with 3-4 documented patterns:
  1. **Conversation Summarisation** — summarise long chat history before passing to an agent.
  2. **Task State Persistence** — store task progress in a JSON file and reload it on next session.
  3. **User Preference Memory** — store user preferences in a key-value store accessible by the agent.
  4. **Knowledge Base Retrieval** — embed and retrieve docs/notes as context for agents.

#### `core/shared-tools/`
- Move any utility/helper scripts from `scripts/` that are not Next.js-specific.
- Create `core/shared-tools/README.md`.

---

### TASK 3 — Create `frameworks/nextjs/` from the existing Next.js boilerplate

#### `frameworks/nextjs/templates/`

Move the following existing root-level items **into** `frameworks/nextjs/templates/`:

```
src/                    → frameworks/nextjs/templates/src/
public/                 → frameworks/nextjs/templates/public/
drizzle/                → frameworks/nextjs/templates/drizzle/
.gitignore              → frameworks/nextjs/templates/.gitignore
.nvmrc                  → frameworks/nextjs/templates/.nvmrc
.prettierignore         → frameworks/nextjs/templates/.prettierignore
.prettierrc             → frameworks/nextjs/templates/.prettierrc
components.json         → frameworks/nextjs/templates/components.json
docker-compose.yml      → frameworks/nextjs/templates/docker-compose.yml
drizzle.config.ts       → frameworks/nextjs/templates/drizzle.config.ts
env.example             → frameworks/nextjs/templates/env.example
eslint.config.mjs       → frameworks/nextjs/templates/eslint.config.mjs
next.config.ts          → frameworks/nextjs/templates/next.config.ts
package.json            → frameworks/nextjs/templates/package.json   (framework package.json, not root)
postcss.config.mjs      → frameworks/nextjs/templates/postcss.config.mjs
tsconfig.json           → frameworks/nextjs/templates/tsconfig.json
CLAUDE.md               → frameworks/nextjs/templates/CLAUDE.md
```

> ⚠️ **Do not delete** the root-level README.md, .github/, create-agentic-app/, and docs/ — those stay at the root.

#### `frameworks/nextjs/integrations/`

Create `frameworks/nextjs/integrations/README.md` listing:
- Better Auth + Google OAuth setup
- Drizzle ORM + PostgreSQL
- OpenRouter / Vercel AI SDK
- Vercel Blob storage

Create stub files for each integration:
- `frameworks/nextjs/integrations/better-auth.md`
- `frameworks/nextjs/integrations/drizzle-orm.md`
- `frameworks/nextjs/integrations/openrouter.md`
- `frameworks/nextjs/integrations/vercel-blob.md`

Each stub should contain: what the integration does, required env vars, and a link to official docs.

#### `frameworks/nextjs/deploy/`

Create `frameworks/nextjs/deploy/vercel.md` with step-by-step Vercel deployment instructions (copy the deployment section from the existing README.md and clean it up).

Create `frameworks/nextjs/deploy/.vercelignore` with sensible defaults.

#### `frameworks/nextjs/prompts/`

Create `frameworks/nextjs/prompts/nextjs-conventions.md` documenting Next.js-specific AI prompt conventions:
- App Router conventions
- API route patterns
- Component naming
- File naming
- Server vs Client component rules

---

### TASK 4 — Create `frameworks/astro/` (new Astro boilerplate)

This is the **main new addition**. Build a production-ready Astro boilerplate that mirrors the Next.js boilerplate's feature set where possible.

#### `frameworks/astro/templates/`

Scaffold a complete Astro project with the following features:

**`frameworks/astro/templates/package.json`**
```json
{
  "name": "astro-agentic-app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:reset": "tsx scripts/reset-db.ts",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/react": "^3.6.0",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/node": "^8.3.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "better-auth": "^1.0.0",
    "drizzle-orm": "^0.36.0",
    "postgres": "^3.4.0",
    "ai": "^4.0.0",
    "@ai-sdk/openai": "^1.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.28.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.6.0",
    "tsx": "^4.19.0",
    "prettier": "^3.3.0",
    "eslint": "^9.0.0",
    "eslint-plugin-astro": "^1.2.0"
  }
}
```

**`frameworks/astro/templates/astro.config.mjs`**
```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react(), tailwind()],
});
```

**`frameworks/astro/templates/tsconfig.json`**
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`frameworks/astro/templates/src/`** — Create the following file tree:

```
src/
├── pages/
│   ├── index.astro              # Home / landing page
│   ├── dashboard.astro          # Protected dashboard page
│   ├── chat.astro               # AI chat page
│   ├── sign-in.astro            # Sign-in page
│   └── api/
│       ├── auth/
│       │   └── [...all].ts      # Better Auth catch-all API route
│       └── chat/
│           └── index.ts         # AI chat streaming endpoint
├── components/
│   ├── auth/
│   │   ├── SignInButton.tsx     # Google OAuth sign-in button (React island)
│   │   └── SignOutButton.tsx    # Sign-out button
│   └── chat/
│       └── ChatInterface.tsx    # AI chat UI (React island)
├── layouts/
│   └── BaseLayout.astro         # Base HTML layout with nav
└── lib/
    ├── auth.ts                  # Better Auth server config
    ├── auth-client.ts           # Better Auth client (for React islands)
    ├── db.ts                    # Drizzle + Postgres connection
    ├── schema.ts                # Drizzle schema (users, sessions, etc.)
    ├── storage.ts               # File storage abstraction (local / Vercel Blob)
    └── utils.ts                 # cn() helper and general utilities
```

**Write the actual content** for each of these files. Requirements:

- `src/pages/index.astro` — A clean landing page that lists the kit's features. Matches the visual style of the Next.js version but uses Astro syntax.
- `src/pages/dashboard.astro` — Reads the session from Better Auth server-side, redirects to `/sign-in` if unauthenticated, displays user profile info.
- `src/pages/chat.astro` — Auth-protected page that renders `<ChatInterface client:load />`.
- `src/pages/sign-in.astro` — Renders `<SignInButton client:load />`.
- `src/pages/api/auth/[...all].ts` — Better Auth `toWebHandler()` adapter for Astro API routes.
- `src/pages/api/chat/index.ts` — Streams AI responses using Vercel AI SDK + OpenRouter, reads the user message from request body.
- `src/components/auth/SignInButton.tsx` — React island; calls `authClient.signIn.social({ provider: "google" })`.
- `src/components/auth/SignOutButton.tsx` — React island; calls `authClient.signOut()`.
- `src/components/chat/ChatInterface.tsx` — React island using `useChat` from the Vercel AI SDK, pointing at `/api/chat`.
- `src/layouts/BaseLayout.astro` — HTML shell with Tailwind, nav links (Home, Dashboard, Chat), conditional sign-in/out based on session.
- `src/lib/auth.ts` — Better Auth config with Google OAuth and Drizzle adapter (identical shape to the Next.js version but imported without `next/headers`).
- `src/lib/auth-client.ts` — `createAuthClient()` pointed at the Astro server origin.
- `src/lib/db.ts` — Drizzle + postgres connection, identical to the Next.js version.
- `src/lib/schema.ts` — Copy the schema from the Next.js version (Better Auth tables + any app tables).
- `src/lib/storage.ts` — Copy the storage abstraction from the Next.js version (local vs Vercel Blob).
- `src/lib/utils.ts` — `cn()` helper using `clsx` + `tailwind-merge`.

**`frameworks/astro/templates/env.example`**
```
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/your_database_name"

# Authentication - Better Auth
BETTER_AUTH_SECRET="your-random-32-character-secret-key-here"
BETTER_AUTH_URL="http://localhost:4321"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Integration via OpenRouter
OPENROUTER_API_KEY="sk-or-v1-your-openrouter-api-key-here"
OPENROUTER_MODEL="openai/gpt-4o-mini"

# App URL
PUBLIC_APP_URL="http://localhost:4321"

# File Storage (optional)
BLOB_READ_WRITE_TOKEN=""
```

**`frameworks/astro/templates/docker-compose.yml`** — Copy the one from the Next.js template (it's just PostgreSQL, not framework-specific).

**`frameworks/astro/templates/drizzle.config.ts`** — Copy from the Next.js template; update the `out` path if needed.

**`frameworks/astro/templates/.gitignore`** — Standard Node + Astro gitignore.

**`frameworks/astro/templates/CLAUDE.md`** — Astro-specific agent instructions (see `frameworks/astro/prompts/astro-conventions.md` for content).

#### `frameworks/astro/integrations/`

Create the same set of integration stubs as the Next.js side, but note Astro-specific differences:
- `frameworks/astro/integrations/better-auth.md` — note that Astro uses `toWebHandler()` not a Next.js route handler.
- `frameworks/astro/integrations/drizzle-orm.md`
- `frameworks/astro/integrations/openrouter.md`
- `frameworks/astro/integrations/astro-islands.md` — explains React islands (`client:load`, `client:visible`, etc.)

#### `frameworks/astro/deploy/`

Create `frameworks/astro/deploy/vercel.md` — Astro + `@astrojs/vercel` adapter deployment steps.
Create `frameworks/astro/deploy/node.md` — Self-hosting with the Node adapter.
Create `frameworks/astro/deploy/.vercelignore`.

#### `frameworks/astro/prompts/`

Create `frameworks/astro/prompts/astro-conventions.md`:
```markdown
# Astro Coding Conventions for AI Agents

## File Extensions
- Use `.astro` for pages and layouts (server-rendered by default)
- Use `.tsx` / `.jsx` for interactive React islands only

## Interactivity
- Default to Astro components (zero JS) for static content
- Use React islands ONLY for interactive UI: `<Component client:load />`
- Prefer `client:visible` over `client:load` for below-the-fold islands

## Data Fetching
- Fetch data in the frontmatter (`---` block) of `.astro` files — this runs server-side
- Use `Astro.locals` and middleware for session/auth context
- Never use `useEffect` for data that can be fetched server-side

## Routing
- File-based routing under `src/pages/`
- API routes are `.ts` files in `src/pages/api/`
- Dynamic routes use `[param].astro` or `[...slug].astro`

## Styling
- Use Tailwind utility classes
- Scoped styles with `<style>` inside `.astro` files when needed

## Auth Pattern
- Check session in `.astro` frontmatter: `const session = await auth.api.getSession(...)`
- Redirect server-side: `return Astro.redirect('/sign-in')`

## Environment Variables
- Server-only vars: access directly via `import.meta.env.VAR_NAME`
- Client-exposed vars: must be prefixed with `PUBLIC_`
```

---

### TASK 5 — Update the `create-agentic-app` CLI

This is the most critical task. The CLI must support a **framework selection prompt**.

Read the existing `create-agentic-app/index.js` (or `src/index.js` inside that folder) fully before editing.

#### Required changes to the CLI:

1. **Add `@clack/prompts`** (or keep existing `inquirer` / `prompts` library) as a dependency in `create-agentic-app/package.json`.

2. **Add a framework selection step** immediately after the project-name prompt:

```
? What is your project named? › my-app
? Select a framework: ›
❯ Next.js  (full-stack, App Router, Vercel-optimised)
  Astro    (content-first, islands architecture, SSR/SSG)
```

3. **Based on the selection**, the CLI should:
   - Copy files from `frameworks/nextjs/templates/` OR `frameworks/astro/templates/` into the target directory.
   - In **both cases**, also copy the shared `core/` layer into `.core/` inside the scaffolded project (so the agent rules and prompts are always included).
   - Merge the `core/workflows/` slash commands into `.claude/commands/` in the scaffolded project.
   - Merge the `core/coding-rules/` files into `.cursor/rules/` in the scaffolded project.
   - Copy `core/mcp/mcp.json` as `.mcp.json` in the scaffolded project.

4. **Update the CLI README/help text** to document the new framework option.

#### Skeleton of the updated `index.js` logic (implement this fully):

```js
#!/usr/bin/env node
import { intro, outro, select, text, spinner, confirm } from "@clack/prompts";
import { copyDir, mergeDir, patchFile } from "./utils.js"; // implement these helpers
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

async function main() {
  intro("🤖 create-agentic-app");

  // 1. Project name
  const projectName = await text({
    message: "What is your project named?",
    placeholder: "my-app",
    validate(value) {
      if (!value) return "Project name is required.";
    },
  });

  // 2. Framework selection
  const framework = await select({
    message: "Select a framework:",
    options: [
      {
        value: "nextjs",
        label: "Next.js",
        hint: "Full-stack, App Router, Vercel-optimised",
      },
      {
        value: "astro",
        label: "Astro",
        hint: "Content-first, islands architecture, SSR/SSG",
      },
    ],
  });

  // 3. Package manager
  const pkgManager = await select({
    message: "Which package manager?",
    options: [
      { value: "pnpm", label: "pnpm (recommended)" },
      { value: "npm", label: "npm" },
      { value: "yarn", label: "yarn" },
    ],
  });

  const targetDir = path.resolve(process.cwd(), projectName);
  const frameworkSrc = path.join(REPO_ROOT, "frameworks", framework, "templates");
  const coreSrc = path.join(REPO_ROOT, "core");

  const s = spinner();
  s.start("Scaffolding your project...");

  // 4. Copy framework template
  fs.mkdirSync(targetDir, { recursive: true });
  copyDir(frameworkSrc, targetDir);

  // 5. Copy shared core into .core/
  copyDir(coreSrc, path.join(targetDir, ".core"));

  // 6. Merge core workflows into .claude/commands/
  mergeDir(
    path.join(coreSrc, "workflows"),
    path.join(targetDir, ".claude", "commands")
  );

  // 7. Merge coding rules into .cursor/rules/
  mergeDir(
    path.join(coreSrc, "coding-rules"),
    path.join(targetDir, ".cursor", "rules")
  );

  // 8. Copy MCP config
  fs.copyFileSync(
    path.join(coreSrc, "mcp", "mcp.json"),
    path.join(targetDir, ".mcp.json")
  );

  // 9. Rename env.example → .env
  const envExample = path.join(targetDir, "env.example");
  if (fs.existsSync(envExample)) {
    fs.renameSync(envExample, path.join(targetDir, ".env"));
  }

  s.stop("Project scaffolded ✅");

  // 10. Install dependencies
  const shouldInstall = await confirm({
    message: `Install dependencies with ${pkgManager}?`,
  });

  if (shouldInstall) {
    const installSpinner = spinner();
    installSpinner.start(`Installing with ${pkgManager}...`);
    const { execSync } = await import("child_process");
    execSync(`${pkgManager} install`, { cwd: targetDir, stdio: "inherit" });
    installSpinner.stop("Dependencies installed ✅");
  }

  outro(`
✅ Your ${framework === "nextjs" ? "Next.js" : "Astro"} agentic app is ready!

  cd ${projectName}
  ${framework === "nextjs" ? "# Edit .env, then:" : "# Edit .env, then:"}
  docker compose up -d
  ${pkgManager} run db:migrate
  ${pkgManager} run dev
  
  🤖 AI agent commands are in .claude/commands/
  📐 Coding rules are in .cursor/rules/
  🧠 Core agent layer is in .core/
  `);
}

main().catch(console.error);
```

Also implement the helper functions `copyDir`, `mergeDir`, `patchFile` in `create-agentic-app/utils.js`.

---

### TASK 6 — Update root-level files

#### `README.md` (root)

Rewrite the root README to:
- Describe the multi-framework nature of the kit.
- Show the new directory structure.
- Document both frameworks in the Quick Start section:
  ```
  npx create-agentic-app@latest
  ```
- Keep all existing sections (features, service config, deploy, Claude Code commands).
- Add a new **"Frameworks"** section describing Next.js and Astro options.
- Add a **"Core Layer"** section explaining `core/`.

#### `package.json` (root)

Update to be a workspace root (if using pnpm workspaces) or at minimum add:
```json
{
  "name": "agentic-coding-starter-kit",
  "version": "2.0.0",
  "private": true,
  "workspaces": ["create-agentic-app"],
  "scripts": {
    "cli": "node create-agentic-app/index.js"
  }
}
```

#### `.claude/commands/` (root)

Update these to reference `core/` paths where appropriate (e.g. specs, rules). They should still work when run from the repo root during development.

#### `docs/`

Create or update:
- `docs/ARCHITECTURE.md` — Explains the monorepo structure, how `core/` is shared, and how to add a new framework.
- `docs/ADDING_A_FRAMEWORK.md` — Step-by-step guide for contributors to add a third framework (e.g. SvelteKit).
- `docs/AUDIT.md` — (from Task 1 above)

---

### TASK 7 — Validation checklist

After all tasks are complete, verify:

- [ ] `ls frameworks/nextjs/templates/src/` shows the original Next.js app source.
- [ ] `ls frameworks/astro/templates/src/pages/` shows at least: `index.astro`, `dashboard.astro`, `chat.astro`, `sign-in.astro`, `api/`.
- [ ] `ls core/` shows: `agents/`, `mcp/`, `prompts/`, `memory/`, `workflows/`, `coding-rules/`, `shared-tools/`.
- [ ] `cat core/workflows/create-feature.md` contains content (not empty).
- [ ] `cat create-agentic-app/index.js` contains the word "astro" (proving the CLI was updated).
- [ ] `cat frameworks/astro/templates/src/pages/api/auth/\[...all\].ts` exists and contains `toWebHandler`.
- [ ] `cat frameworks/astro/prompts/astro-conventions.md` exists and is non-empty.
- [ ] `cat docs/ARCHITECTURE.md` exists and is non-empty.
- [ ] `cat README.md` contains the word "Astro" at least once.

Run the checklist and report the results. Fix any failures before finishing.

---

### TASK 8 — Final test of the CLI (dry run)

Run the CLI in dry-run / simulation mode to confirm the framework prompt works:

```bash
node create-agentic-app/index.js --dry-run
```

If `--dry-run` is not already supported, add a `--dry-run` flag that:
- Shows what files would be created
- Does NOT actually write to disk
- Exits with code 0

Confirm both "Next.js" and "Astro" paths produce a non-empty file list.

---

## ⚠️ Important Constraints

1. **Do not break the existing Next.js boilerplate.** Every file that was in the root should now live under `frameworks/nextjs/templates/` and work identically.
2. **Keep `.github/` at the root** — do not move it.
3. **Keep `create-agentic-app/` at the root** — only update its source files.
4. **Keep `docs/` at the root** — update/add files but don't move the folder.
5. **All new Astro code must be TypeScript** (`.ts`/`.tsx`/`.astro` with typed frontmatter).
6. **Do not install or run `npm install` in the repo root** during restructuring — only inside `create-agentic-app/` if needed.
7. **Commit frequently.** After each Task (1–7), run `git add -A && git commit -m "task N: <description>"`.

---

## 📦 Dependencies to be aware of

### New deps needed in `create-agentic-app/package.json`:
- `@clack/prompts` — beautiful interactive CLI prompts

### New deps needed in `frameworks/astro/templates/package.json`:
- `astro` ^4.16
- `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/node`
- `better-auth` (same version as Next.js template)
- `drizzle-orm`, `postgres`, `drizzle-kit`
- `ai`, `@ai-sdk/openai` (Vercel AI SDK)
- `react`, `react-dom`, `@types/react`, `@types/react-dom`
- `tailwindcss`, `clsx`, `tailwind-merge`
- `eslint-plugin-astro`

---

## 🏁 Done

When all 8 tasks are complete and the validation checklist passes, output a **summary table** in markdown showing:

| Item | Status |
|---|---|
| core/ layer created | ✅ / ❌ |
| frameworks/nextjs/ migrated | ✅ / ❌ |
| frameworks/astro/ created | ✅ / ❌ |
| CLI updated with framework select | ✅ / ❌ |
| Root README updated | ✅ / ❌ |
| docs/ updated | ✅ / ❌ |
| Validation checklist passed | ✅ / ❌ |

Then print the final directory tree of the repo root (2 levels deep) so it can be confirmed visually.
