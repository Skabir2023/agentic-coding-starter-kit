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