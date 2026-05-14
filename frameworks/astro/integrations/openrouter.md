# OpenRouter / Vercel AI SDK Integration (Astro)

## Overview

Provides AI chat capabilities using Vercel AI SDK with OpenRouter as the provider.

## Setup

### Environment Variables

```env
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key-here
OPENROUTER_MODEL=openai/gpt-4o-mini
```

### Configuration

Create API endpoints in `src/pages/api/chat/index.ts` to handle AI requests.

## Usage

Use React islands with the `useChat` hook from `@ai-sdk/react` or create custom chat interfaces.

## Documentation

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [OpenRouter Docs](https://openrouter.ai/docs)