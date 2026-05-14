# Memory Patterns

This document describes patterns for maintaining context and state across AI agent sessions.

## 1. Conversation Summarization

Summarize long chat history before passing context to an agent to stay within token limits.

**Implementation:**
```typescript
async function summarizeConversation(messages: Message[]): Promise<string> {
  const summary = await llm.invoke(
    `Summarize this conversation concisely:\n${messages.map(m => m.content).join('\n')}`
  );
  return summary;
}
```

**Use case:** When conversation exceeds context window limits.

## 2. Task State Persistence

Store task progress in a JSON file and reload it on next session.

**Implementation:**
```typescript
import fs from 'fs/promises';

interface TaskState {
  currentStep: number;
  completedSteps: string[];
  context: Record<string, unknown>;
}

async function saveTaskState(taskId: string, state: TaskState): Promise<void> {
  await fs.writeFile(
    `.task-state/${taskId}.json`,
    JSON.stringify(state, null, 2)
  );
}

async function loadTaskState(taskId: string): Promise<TaskState | null> {
  try {
    const data = await fs.readFile(`.task-state/${taskId}.json`, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}
```

**Use case:** Long-running tasks that span multiple sessions.

## 3. User Preference Memory

Store user preferences in a key-value store accessible by the agent.

**Implementation:**
```typescript
import fs from 'fs/promises';

interface Preferences {
  framework?: 'nextjs' | 'astro';
  codeStyle?: 'strict' | 'relaxed';
  [key: string]: unknown;
}

const PREF_FILE = '.user-preferences.json';

async function getPreference(key: string): Promise<unknown> {
  const prefs = await loadPreferences();
  return prefs[key];
}

async function setPreference(key: string, value: unknown): Promise<void> {
  const prefs = await loadPreferences();
  prefs[key] = value;
  await fs.writeFile(PREF_FILE, JSON.stringify(prefs, null, 2));
}

async function loadPreferences(): Promise<Preferences> {
  try {
    const data = await fs.readFile(PREF_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}
```

**Use case:** Remembering framework choice, code style preferences, etc.

## 4. Knowledge Base Retrieval

Embed and retrieve docs/notes as context for agents.

**Implementation:**
```typescript
import { embeddings } from 'ai';
import { embed } from '@ai-sdk/openai';

interface DocChunk {
  id: string;
  content: string;
  embedding: number[];
}

async function retrieveContext(query: string, docs: DocChunk[]): Promise<string> {
  const queryEmbedding = await embed({ model: openai('text-embedding-3-small'), input: query });

  const similarities = docs.map(doc => ({
    doc,
    score: cosineSimilarity(queryEmbedding, doc.embedding)
  }));

  similarities.sort((a, b) => b.score - a.score);

  return similarities.slice(0, 3).map(s => s.doc.content).join('\n\n');
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}
```

**Use case:** Retrieving relevant documentation or prior context.