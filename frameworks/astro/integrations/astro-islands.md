# Astro Islands

## Overview

Astro Islands (also known as Component Islands) is an architecture pattern that allows you to mix static and interactive components in the same page.

## How It Works

By default, Astro components render to static HTML with zero JavaScript. To add interactivity, use the `client:*` directives:

### Client Directives

| Directive | Behavior |
|-----------|----------|
| `client:load` | Hydrate immediately on page load |
| `client:visible` | Hydrate when the component enters the viewport |
| `client:idle` | Hydrate when the browser is idle |
| `client:media` | Hydrate when a media query matches |

### Usage Example

```astro
---
import StaticComponent from '../components/StaticComponent.astro';
import InteractiveComponent from '../components/InteractiveComponent.tsx';
---

<!-- This renders as static HTML -->
<StaticComponent />

<!-- This hydrates on client-side -->
<InteractiveComponent client:load />
```

## Best Practices

1. Use static Astro components for content that doesn't need interactivity
2. Use React islands only for interactive UI (forms, buttons, chat interfaces)
3. Prefer `client:visible` for below-the-fold interactive components
4. Keep island components focused and small

## Documentation

- [Astro Islands Docs](https://docs.astro.build/en/concepts/islands/)