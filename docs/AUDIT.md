# Repository Audit

## Overview
This document summarizes the existing agentic-coding-starter-kit structure before restructuring into a multi-framework monorepo.

## Major Files and Folders

### Root Level (Next.js App)
| File/Folder | Purpose |
|-------------|---------|
| `package.json` | Next.js 16 project with React 19, Better Auth, Drizzle, AI SDK |
| `src/` | Next.js App Router source code |
| `AGENTS.md` | Main agent instruction file (coding-agent behavior rules) |
| `CLAUDE.md` | Points to AGENTS.md for Claude users |
| `DESIGN.md` | UI design system and component guidance |
| `drizzle.config.ts` | Drizzle ORM migration configuration |
| `docker-compose.yml` | Local PostgreSQL service |
| `env.example` | Environment variable template |
| `components.json` | shadcn/ui configuration |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `eslint.config.mjs` | ESLint configuration |

### AI-Agent Infrastructure
| File/Folder | Type | Shared/Framework-Specific |
|-------------|------|--------------------------|
| `.claude/skills/` | Skills (checkpoint, create-spec, shadcn, etc.) | Shared |
| `.claude/agents/` | Agent definitions (coder, code-review, etc.) | Shared |
| `.agents/skills/` | Additional skills (nextjs, security-scanner, etc.) | Framework-specific (Next.js focus) |
| `.mcp.json` | MCP server configuration (currently empty) | Shared |
| `create-agentic-app/template/AGENTS.md` | Template-specific agent instructions | Framework-specific (Next.js) |

### CLI Tool
| File/Folder | Purpose |
|-------------|---------|
| `create-agentic-app/index.js` | CLI entry point using commander, prompts, ora |
| `create-agentic-app/template/` | Template files copied during scaffolding |
| `create-agentic-app/package.json` | CLI dependencies |

### Documentation
| File/Folder | Purpose |
|-------------|---------|
| `docs/technical/` | Technical docs (AI, React, BetterAuth) |
| `docs/business/` | Business docs (starter prompts) |

## Framework-Agnostic vs Framework-Specific

### Framework-Agnostic (Should Move to core/)
- `.claude/skills/` - Most skills are reusable
- `.claude/agents/` - Agent definitions
- `.mcp.json` - MCP configuration
- `AGENTS.md` - Core rules (may need framework-specific variants)

### Framework-Specific (Stay in frameworks/nextjs/)
- `.agents/skills/nextjs/` - Next.js specific skills
- `create-agentic-app/template/` - Next.js template
- Root `src/` - Next.js App Router code

## Notes
- No `.cursor/rules/` folder exists in current repo
- The repo uses pnpm as the primary package manager
- create-agentic-app uses commander, prompts, and ora for CLI functionality