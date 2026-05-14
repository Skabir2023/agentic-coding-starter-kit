# Vercel Blob Storage Integration

## Overview

Provides file storage abstraction with local development fallback and Vercel Blob for production.

## Setup

### Environment Variables

```env
# Leave empty for local storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### Configuration

The storage abstraction is in `src/lib/storage.ts`. It automatically switches between local and Vercel Blob based on the environment variable.

## Usage

```typescript
import { upload, deleteFile } from '@/lib/storage';

// Upload a file
const url = await upload(file, 'uploads/');

// Delete a file
await deleteFile(url);
```

## Documentation

- [Vercel Blob Docs](https://vercel.com/docs/storage/blob)