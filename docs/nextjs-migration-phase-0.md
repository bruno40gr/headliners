# Next.js migration plan — Phase 0

## Status

- Branch: `feature/nextjs-migration`
- Current app: React 19 + Vite SPA with custom Puppeteer prerendering
- Goal: migrate the public site to Next.js for native SEO and LLM crawlability, while preparing for Supabase-backed lead capture and future marketplace features

## Phase 0 objectives

Phase 0 locks the architectural decisions before the implementation work begins.

This phase does not try to finish the migration. It defines the target shape of the app so later phases stay consistent.

## Current-state summary

The current site is a client-rendered SPA.

Observed implementation:

- `src/main.jsx` mounts a React app into `#root`
- `src/App.jsx` appears to act as the main page composition layer
- `prerender.js` snapshots selected routes with Puppeteer and injects route metadata after build
- `public/sitemap.xml` and `public/robots.txt` are managed as static assets

Implication:

- SEO works through a custom workaround rather than framework-native rendering
- route metadata is duplicated and hardcoded
- future personalization, lead capture, listings, auth, and payments will be harder to scale in the current structure

## Target architecture

Use a single Next.js application with the App Router.

### Framework decisions

- Next.js App Router
- React Server Components by default
- Client Components only for interaction-heavy UI
- TypeScript for new migration code where practical
- One repo, one app, no mirror site

### Data and backend decisions

- Supabase for lead storage in Phase 4
- Supabase remains the expected path for future auth, database, and storage needs
- Optional CMS or Supabase content tables can be added later for editor-managed landing pages

## Route classes

All routes should be assigned to one of these classes.

### 1. Public static or ISR routes

Use for pages where the content is public and can be pre-rendered or revalidated.

Examples:

- `/`
- `/teachers`
- `/careers`
- `/about/funding-support`
- `/tiny-keys`
- `/wonder-notes`
- `/programs/private-lessons`
- `/programs/band`
- service pages
- legal pages

Default rendering choice:

- SSG first
- ISR when content updates should appear without a full deploy

### 2. Public dynamic routes

Use for public pages that depend on changing data.

Future examples:

- landing pages from a table or CMS
- public listing pages
- category pages
- location pages

Default rendering choice:

- ISR when slight staleness is acceptable
- SSR when request-time freshness is required

### 3. Personalized public routes

Use carefully.

Rules:

- keep a stable crawlable base page in the initial HTML
- add personalization without replacing the entire page with client-only output
- do not depend on hydration for the primary indexed copy

### 4. Private application routes

Use for routes that do not need search indexing.

Future examples:

- seller dashboard
- profile management
- listing creation and editing
- payment setup

Rendering choice:

- may use more client-side interactivity
- SEO is not the priority here

## SEO and crawlability principles

These principles apply to every public route in the target architecture.

- important content must be present in the initial HTML response
- metadata should be generated in Next, not injected post-build
- canonical URLs must be defined consistently
- public pages must be discoverable through internal links and sitemap entries
- robots configuration must allow intended public content
- structured data should be added where it improves search and machine readability

## Metadata strategy

Replace the current manual metadata injection in `prerender.js` with native Next metadata.

Planned implementation:

- global metadata in `app/layout`
- route-level metadata in each page or route segment
- canonical URLs derived from a single site URL configuration
- Open Graph and Twitter metadata generated alongside page metadata
- JSON-LD added directly in relevant server-rendered pages

## Sitemap and robots strategy

Replace static public asset management where appropriate with Next-managed outputs.

Planned implementation:

- `app/sitemap.ts` for public route enumeration
- `app/robots.ts` for robots configuration
- dynamic routes included from data sources once content becomes database-backed

## Forms and lead capture strategy

Lead capture is part of the core product, not an afterthought.

Target approach:

- public landing and program pages stay server-rendered
- forms submit to Server Actions or Route Handlers
- server-side validation runs before persistence
- leads are stored in Supabase in Phase 4
- campaign and source attribution should be captured with each submission when available

Minimum fields to preserve in the data model:

- page URL
- program or service context
- name
- email
- phone
- notes or intent
- attribution parameters when present
- consent fields when required
- created timestamp

## Content strategy

Phase 1 and Phase 2 can migrate stable content directly from existing React components.

Near-term plan:

- keep stable public page content in code while routes are migrated
- avoid introducing a CMS before the rendering foundation is stable

Later plan:

- add database-backed or CMS-backed landing page content if update frequency increases
- use ISR or SSR so content updates remain crawlable on the main site

## URL strategy

Preserve existing public URLs wherever possible to avoid unnecessary SEO loss.

Known current route set from the prerender process:

- `/`
- `/privacy-policy`
- `/terms-and-conditions`
- `/teachers`
- `/careers`
- `/about/funding-support`
- `/tiny-keys`
- `/wonder-notes`
- `/programs/private-lessons`
- `/programs/band`
- `/services/recording-music-production`
- `/services/pa-system-rental`
- `/services/dj-and-events`
- `/services/instrument-setup`
- `/services/rehearsal-space`

Rules:

- preserve current slugs where possible
- add redirects if a route must change
- update sitemap and canonicals whenever route structure changes

## Branch and release strategy

Migration work happens on:

- `feature/nextjs-migration`

Planned merge point:

- merge back into `main` after Phase 4 is complete and validated

Phases expected before merge:

- Phase 1: Next.js foundation
- Phase 2: public page migration
- Phase 3: content and rendering structure
- Phase 4: lead capture integration with Supabase

## Acceptance criteria for Phase 0

Phase 0 is complete when:

- the branch for migration work exists
- the target architecture is documented in the repo
- route classes and rendering rules are defined
- form and content strategy are defined for the next phases
- merge and release boundaries are clear

## Next phase

Phase 1 will create the Next.js foundation in this repository and migrate the first high-value public routes with native metadata handling.