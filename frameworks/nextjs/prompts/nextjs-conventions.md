# Next.js Coding Conventions for AI Agents

## File Extensions

- Use `.tsx` for components with JSX
- Use `.ts` for utility files and types
- Use `.js` only when necessary (e.g., next.config.js)

## App Router Conventions

### File-Based Routing

- Pages: `src/app/page.tsx` (route: `/`)
- Nested routes: `src/app/dashboard/page.tsx` (route: `/dashboard`)
- Dynamic routes: `src/app/[slug]/page.tsx`
- Route groups: `src/app/(auth)/login/page.tsx`

### Server vs Client Components

- Default to **Server Components** (no "use client" directive)
- Add "use client" only when using:
  - React hooks (useState, useEffect, useContext)
  - Browser APIs
  - Event handlers
  - Third-party components that require client-side rendering

## Component Naming

- Use PascalCase for components: `UserProfile.tsx`
- Use camelCase for utilities: `formatDate.ts`
- Colocate related files: `components/auth/AuthForm.tsx` + `AuthForm.test.tsx`

## API Routes

- Location: `src/app/api/[route]/route.ts`
- Use Next.js 15+ with `GET`, `POST`, `PUT`, `DELETE` exports
- Return `Response` object directly

## Data Fetching

- Use async/await directly in Server Components
- Use `fetch` with caching options for data fetching
- Use Server Actions for form submissions

## Styling

- Use Tailwind CSS utility classes
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Keep component styles co-located when using custom CSS

## TypeScript

- Enable strict mode
- Use explicit types for function parameters
- Avoid `any` - use `unknown` when type is uncertain