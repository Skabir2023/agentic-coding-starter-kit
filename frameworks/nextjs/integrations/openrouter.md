# OpenRouter / Vercel AI SDK Integration

## Overview

Provides AI chat capabilities using Vercel AI SDK with OpenRouter as the provider.

## Setup

### Environment Variables

```env
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key-here
OPENROUTER_MODEL=openai/gpt-4o-mini
```

### Configuration

The AI configuration is in `src/lib/ai.ts` (or similar). Update the model and provider as needed.

## Usage

The chat API endpoint is at `src/app/api/chat/route.ts`. Use the `useChat` hook from `@ai-sdk/react` in your components.

## Documentation

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [OpenRouter Docs](https://openrouter.ai/docs)