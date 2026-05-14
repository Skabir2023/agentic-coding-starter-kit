# Architecture Overview

This document explains the multi-framework monorepo structure of the agentic-coding-starter-kit.

## Directory Structure

```
agentic-coding-starter-kit/
├── core/                          # Shared AI-agent infrastructure
│   ├── agents/                    # Reusable agent definitions
│   ├── mcp/                       # MCP server configuration
│   ├── prompts/                   # Shared prompt templates
│   ├── memory/                    # Memory patterns for agents
│   ├── workflows/                 # Claude Code slash commands
│   ├── coding-rules/              # Linting/style rules
│   └── shared-tools/              # Utility scripts
│
├── frameworks/
│   ├── nextjs/                   # Next.js boilerplate
│   │   ├── templates/            # App source (src/, config, etc.)
│   │   ├── integrations/         # Integration documentation
│   │   ├── deploy/               # Deployment configs
│   │   └── prompts/              # Next.js-specific AI prompts
│   │
│   └── astro/                    # Astro boilerplate
│       ├── templates/            # App source (pages, components, etc.)
│       ├── integrations/         # Integration documentation
│       ├── deploy/               # Deployment configs
│       └── prompts/              # Astro-specific AI prompts
│
├── create-agentic-app/           # CLI tool
├── docs/                        # Documentation
└── README.md
```

## Core Layer

The `core/` directory contains framework-agnostic AI-agent infrastructure:

- **agents/**: Agent definitions that can be used by any framework
- **mcp/**: MCP server configuration
- **prompts/**: Reusable prompt templates
- **memory/**: Patterns for context persistence
- **workflows/**: Claude Code slash commands
- **coding-rules/**: Code style and linting rules
- **shared-tools/**: Utility scripts

When a project is scaffolded, the core layer is copied to `.core/` in the generated project.

## Framework Layer

Each framework has its own directory with:

- **templates/**: The actual application source code that gets copied during scaffolding
- **integrations/**: Documentation for available integrations (auth, database, AI, storage)
- **deploy/**: Deployment-specific configs and instructions
- **prompts/**: Framework-specific AI coding conventions

## CLI Behavior

The `create-agentic-app` CLI:

1. Prompts for project name
2. Prompts for framework selection (Next.js or Astro)
3. Prompts for package manager
4. Copies the selected framework's template to the target directory
5. Copies the core layer to `.core/`
6. Merges workflows into `.claude/commands/`
7. Merges coding rules into `.cursor/rules/`
8. Copies MCP config to `.mcp.json`
9. Prompts to install dependencies

## Adding New Frameworks

See `docs/ADDING_A_FRAMEWORK.md` for instructions on adding a new framework to the monorepo.