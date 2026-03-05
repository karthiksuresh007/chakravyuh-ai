# CHAKRAVYUH_AI — MVP Development Plan

**Version:** 1.0.0
**Scope:** MVP — 5 core features only
**Team Size:** 3–5 engineers
**Estimated Timeline:** 10–12 weeks
**Stack:** Next.js · TypeScript · Tailwind · MapLibre · FastAPI · PostgreSQL · Redis · Gemini

> **MVP Promise:** A user can open the app, find any active conflict on the map, click into it, explore its timeline, view impact metrics, and ask the AI to explain it — all within 3 minutes.

---

## Feature Scope Reference

| # | Feature | Included in MVP |
|---|---|---|
| 1 | Interactive Global Conflict Map | ✅ Yes |
| 2 | Conflict Detail Pages | ✅ Yes |
| 3 | Timeline Slider | ✅ Yes |
| 4 | AI Conflict Explainer | ✅ Yes |
| 5 | Impact Dashboard | ✅ Yes |
| 6 | AI Debate Mode | ❌ Roadmap |
| 7 | Economic Impact Simulator | ❌ Roadmap |
| 8 | Satellite Visualization | ❌ Roadmap |
| 9 | Conflict Comparison | ❌ Roadmap |
| 10 | Future Scenario Predictions | ❌ Roadmap |
| 11 | Multilingual Support | ❌ Roadmap |
| 12 | User Accounts | ❌ Roadmap |
| 13 | Latest Updates Feed | ❌ Roadmap |

---

## Phase 0 — Project Setup & Infrastructure
**Goal:** Establish the monorepo, tooling, CI/CD, and deployment pipeline before writing a single feature line.
**Estimated Duration:** 3–4 days
**Owner:** Lead Engineer + DevOps

---

### 0.1 Repository & Monorepo Structure

- [ ] Create GitHub organization and repository: `chakravyuh-ai`
- [ ] Initialize monorepo structure using `pnpm` workspaces:
  ```
  /apps
    /web          ← Next.js frontend
    /api          ← Node.js content + data API
    /ai-service   ← Python FastAPI AI service
  /packages
    /ui           ← Shared React component library
    /types        ← Shared TypeScript types
    /config       ← Shared ESLint, Tailwind, TS configs
  /infra          ← Terraform / Docker configs
  ```
- [ ] Add root `pnpm-workspace.yaml` and `package.json`
- [ ] Create `.gitignore` for Node, Python, secrets, and build artifacts
- [ ] Set up branch protection rules on `main` (require PR + review + CI pass)
- [ ] Create `CONTRIBUTING.md` with branching strategy (`main` / `develop` / `feature/*`)

---

### 0.2 Frontend — `apps/web`

- [ ] Initialize Next.js 14 app with App Router: `pnpm create next-app`
- [ ] Enable TypeScript (strict mode)
- [ ] Configure `tsconfig.json` with path aliases (`@/components`, `@/lib`, `@/types`)
- [ ] Install and configure Tailwind CSS v3 with `tailwind.config.ts`
- [ ] Install and configure ESLint with `eslint-config-next` + `@typescript-eslint`
- [ ] Install and configure Prettier with `prettier-plugin-tailwindcss`
- [ ] Set up `lint-staged` + `husky` pre-commit hooks (lint + format on commit)
- [ ] Create base folder structure:
  ```
  /app
    /conflict/[slug]   ← Dynamic conflict route
    /dashboard         ← Global map page
    layout.tsx
    page.tsx           ← Home page
  /components
    /map
    /conflict
    /timeline
    /impact
    /ai
    /ui                ← Shared primitives (Button, Card, Badge, Tabs)
  /lib
    /api               ← API client functions
    /hooks             ← Custom React hooks
    /utils
  /types               ← TypeScript interfaces
  ```
- [ ] Set up environment variable schema with `@t3-oss/env-nextjs` or `zod`:
  ```
  NEXT_PUBLIC_API_URL
  NEXT_PUBLIC_AI_SERVICE_URL
  ```

---

### 0.3 Backend — `apps/api`

- [ ] Initialize Node.js project with TypeScript
- [ ] Install and configure `Fastify` (or `Express`) as HTTP framework
- [ ] Configure `tsx` for dev, `tsc` for build
- [ ] Install `drizzle-orm` + `drizzle-kit` for database ORM and migrations
- [ ] Install `ioredis` for Redis client
- [ ] Set up folder structure:
  ```
  /src
    /routes       ← Fastify route handlers
    /services     ← Business logic
    /db
      /schema.ts  ← Drizzle schema definitions
      /index.ts   ← DB client
    /middleware   ← Auth, rate limiting, caching
    /lib
  ```
- [ ] Set up environment variable config:
  ```
  DATABASE_URL
  REDIS_URL
  PORT
  NODE_ENV
  ```

---

### 0.4 AI Service — `apps/ai-service`

- [ ] Initialize Python 3.11+ project with `uv` or `poetry`
- [ ] Install `fastapi`, `uvicorn[standard]`, `google-generativeai`, `python-dotenv`, `httpx`
- [ ] Install `langchain`, `langchain-google-genai` for LLM orchestration
- [ ] Create folder structure:
  ```
  /app
    /routes       ← FastAPI routers
    /services     ← LLM + prompt logic
    /models       ← Pydantic request/response schemas
    main.py
  ```
- [ ] Set up environment config:
  ```
  GEMINI_API_KEY
  GEMINI_MODEL=gemini-2.0-flash
  REDIS_URL
  ```

---

### 0.5 Containerization

- [ ] Write `Dockerfile` for `apps/web` (Node 20 Alpine, multi-stage build)
- [ ] Write `Dockerfile` for `apps/api` (Node 20 Alpine, multi-stage build)
- [ ] Write `Dockerfile` for `apps/ai-service` (Python 3.11 slim)
- [ ] Write `docker-compose.yml` for local development:
  ```yaml
  services:
    web:          # Next.js dev server
    api:          # Node API server
    ai-service:   # FastAPI server
    postgres:     # PostgreSQL 16
    redis:        # Redis 7
  ```
- [ ] Confirm all services start and connect with `docker compose up`

---

### 0.6 CI/CD Pipeline

- [ ] Create `.github/workflows/ci.yml`:
  - Trigger: push to `develop`, all PRs to `main`
  - Jobs: lint, typecheck, unit tests (per app)
  - Cache: pnpm store, pip cache
- [ ] Create `.github/workflows/deploy-preview.yml`:
  - Trigger: PR opened/updated
  - Deploy preview frontend to Vercel (preview URL in PR comment)
- [ ] Create `.github/workflows/deploy-production.yml`:
  - Trigger: merge to `main`
  - Deploy frontend to Vercel (production)
  - Deploy API + AI service to Railway / Render / ECS
- [ ] Set up GitHub Actions secrets: `VERCEL_TOKEN`, `DATABASE_URL`, `GEMINI_API_KEY`, etc.

---

### 0.7 Monitoring & Observability

- [ ] Create free Sentry project; install `@sentry/nextjs` in web app
- [ ] Install `@sentry/node` in API service
- [ ] Configure Sentry source maps upload in CI
- [ ] Set up Vercel Analytics for frontend performance (Core Web Vitals)
- [ ] Create Uptime Robot (free tier) monitors for: web, API health check endpoint, AI service health endpoint

---

**Phase 0 Exit Criteria:**
- [ ] `docker compose up` boots all 5 services with no errors
- [ ] CI pipeline passes on a sample PR
- [ ] `main` branch deploys successfully to staging

---

## Phase 1 — Core Data Model & Backend Foundation
**Goal:** Define the database schema, seed conflict data, and expose REST API endpoints for the frontend to consume.
**Estimated Duration:** 5–7 days
**Owner:** Backend Engineer

---

### 1.1 Database Schema — PostgreSQL

- [ ] Create Drizzle schema file `/apps/api/src/db/schema.ts`
- [ ] Define `conflicts` table:
  ```ts
  // columns: id, slug, display_name, status, intensity,
  //          start_date, end_date, region, sub_region,
  //          lat, lng, risk_score, overview_text,
  //          background_text, created_at, updated_at
  ```
- [ ] Define `timeline_events` table:
  ```ts
  // columns: id, conflict_id (FK), event_date, title,
  //          description, category, significance,
  //          sources (JSONB), media_url, media_type, created_at
  ```
- [ ] Define `actors` table:
  ```ts
  // columns: id, name, type, country_code, description,
  //          logo_url, created_at
  ```
- [ ] Define `conflict_actors` junction table:
  ```ts
  // columns: conflict_id (FK), actor_id (FK), role,
  //          stated_objectives, involvement_start, involvement_end
  // PK: (conflict_id, actor_id)
  ```
- [ ] Define `economic_impact` table:
  ```ts
  // columns: id, conflict_id (FK), metric_name, metric_value,
  //          metric_unit, as_of_date, source, notes, created_at
  ```
- [ ] Define `humanitarian_impact` table:
  ```ts
  // columns: id, conflict_id (FK), total_deaths, civilian_deaths,
  //          combatant_deaths, idp_count, refugee_count,
  //          as_of_date, source, updated_at
  ```
- [ ] Add all indexes:
  - `idx_timeline_events_conflict` on `(conflict_id, event_date)`
  - `idx_economic_impact_conflict` on `(conflict_id, metric_name)`
  - `idx_conflicts_status` on `(status, intensity)`
  - `idx_conflicts_region` on `(region)`
- [ ] Generate and run initial migration with `drizzle-kit generate` + `drizzle-kit migrate`
- [ ] Verify schema is applied to local PostgreSQL container

---

### 1.2 Seed Data — 20 MVP Conflicts

- [ ] Create `/apps/api/src/db/seeds/` directory
- [ ] Write seed script `seed-conflicts.ts` to insert all 20 MVP conflicts:
  ```
  Russia-Ukraine War, Gaza-Israel Conflict, Sudan Civil War,
  Myanmar Civil War, Haiti Crisis, DRC (M23), Ethiopia,
  Sahel/Mali, Somalia, Yemen, Syria, Nagorno-Karabakh,
  India-Pakistan (Kashmir), Mozambique, Taiwan Strait,
  South China Sea, Kosovo-Serbia, Iran-Israel Shadow War,
  North Korea, Armenia-Azerbaijan
  ```
- [ ] For each conflict, populate: `slug`, `display_name`, `status`, `intensity`, `region`, `lat/lng`, `risk_score`, `overview_text`, `background_text`
- [ ] Write seed script `seed-timeline-events.ts`:
  - Minimum 5 timeline events per conflict (20 conflicts × 5 = 100 events minimum)
  - Include `category` (military / political / diplomatic / humanitarian) and `significance`
- [ ] Write seed script `seed-actors.ts`:
  - Key actors for each conflict (countries, leaders, organizations)
  - Populate `conflict_actors` junction rows with role + stated objectives
- [ ] Write seed script `seed-impact.ts`:
  - `humanitarian_impact` row per conflict (casualties, IDPs, refugee counts)
  - 3–5 `economic_impact` rows per conflict (GDP impact, sanctions, commodity prices)
- [ ] Add `npm run db:seed` command that runs all seed scripts in dependency order
- [ ] Verify seed data loads cleanly and all FK relationships are intact

---

### 1.3 REST API — Conflict Endpoints

All routes live under `/api/v1/` in `apps/api`.

- [ ] Create Fastify route plugin: `src/routes/conflicts.ts`
- [ ] Implement `GET /api/v1/conflicts`:
  - Query params: `region`, `status`, `intensity`, `limit` (default 50), `offset` (default 0)
  - Response: paginated list with summary fields (id, slug, display_name, status, intensity, lat, lng, risk_score, region)
  - Cache in Redis with key `conflicts:list:{hash(query_params)}`, TTL 5 minutes
- [ ] Implement `GET /api/v1/conflicts/:slug`:
  - Response: full conflict object (all fields including overview_text, background_text)
  - Cache in Redis with key `conflict:{slug}`, TTL 5 minutes
  - Return 404 with structured error if slug not found
- [ ] Implement `GET /api/v1/conflicts/:slug/timeline`:
  - Query params: `start_date`, `end_date`, `category`, `significance`
  - Response: chronological array of timeline events
  - Cache in Redis with key `conflict:{slug}:timeline`, TTL 10 minutes
- [ ] Implement `GET /api/v1/conflicts/:slug/actors`:
  - Response: array of actors with their role in the conflict
  - Include actor fields + junction fields (role, stated_objectives)
- [ ] Implement `GET /api/v1/conflicts/:slug/impact`:
  - Response: `{ humanitarian: {...}, economic: [...] }`
  - Returns latest `humanitarian_impact` row + all `economic_impact` rows for conflict
- [ ] Add JSON response envelope middleware:
  ```json
  { "success": true, "data": {...}, "meta": {...}, "error": null }
  ```
- [ ] Add error handler middleware with consistent error shape:
  ```json
  { "success": false, "data": null, "error": { "code": "NOT_FOUND", "message": "..." } }
  ```
- [ ] Add request validation using `zod` on all route params and query strings
- [ ] Implement `GET /api/v1/health` endpoint returning service status + DB connectivity

---

### 1.4 Map Data Endpoint

- [ ] Implement `GET /api/v1/map/markers`:
  - Query params: `region`, `status`, `intensity`
  - Response: GeoJSON `FeatureCollection` with a `Feature` per conflict:
    ```json
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [lng, lat] },
      "properties": {
        "conflict_id": "...", "slug": "...", "display_name": "...",
        "status": "active", "intensity": "high", "risk_score": 9.2,
        "casualty_estimate": 500000, "region": "..."
      }
    }
    ```
  - Cache in Redis with key `map:markers:{hash(query_params)}`, TTL 5 minutes

---

### 1.5 Redis Caching Layer

- [ ] Create `/apps/api/src/lib/cache.ts`:
  - `get(key: string): Promise<T | null>`
  - `set(key: string, value: T, ttlSeconds: number): Promise<void>`
  - `del(key: string): Promise<void>`
  - `delPattern(pattern: string): Promise<void>` (for cache busting)
- [ ] Wrap all database queries in cache-aside pattern (check Redis → miss → query DB → write to Redis)
- [ ] Confirm cache hit/miss logging in dev environment

---

### 1.6 API Input Validation & Rate Limiting

- [ ] Install `@fastify/rate-limit`
- [ ] Configure rate limiting: 60 requests/minute per IP (unauthenticated)
- [ ] Return `429 Too Many Requests` with `Retry-After` header on breach
- [ ] Add Zod validation schemas for all route inputs (params, query, body)

---

**Phase 1 Exit Criteria:**
- [ ] All 6 REST endpoints return correct data (verified with Postman / curl)
- [ ] Redis caching confirmed working (second request is served from cache)
- [ ] All 20 conflicts + seed data visible in DB
- [ ] `/api/v1/health` returns `200 OK`

---

## Phase 2 — Interactive Global Conflict Map
**Goal:** Build the world map with pulsing conflict markers, clustering, tooltips, and click-to-navigate.
**Estimated Duration:** 5–6 days
**Owner:** Frontend Engineer

---

### 2.1 MapLibre Setup

- [ ] Install `maplibre-gl`
- [ ] Create `/components/map/ConflictMap.tsx` — client-side only component (`"use client"`)
- [ ] Add `dynamic(() => import('@/components/map/ConflictMap'), { ssr: false })` wrapper in parent
- [ ] Initialize MapLibre map instance with:
  - Style: `https://demotiles.maplibre.org/style.json` (OpenStreetMap vector tiles)
  - Initial center: `[20, 20]` (shows Europe, Africa, Middle East)
  - Initial zoom: `2`

---

### 2.2 Conflict Markers

- [ ] Create API client function: `lib/api/map.ts` → `fetchMapMarkers(filters?)`
- [ ] Fetch GeoJSON from `GET /api/v1/map/markers` on map mount using `useEffect`
- [ ] Add GeoJSON source to map: `map.addSource('conflicts', { type: 'geojson', data: ... })`
- [ ] Add circle layer for markers with color driven by `intensity` property:
  ```js
  'circle-color': [
    'match', ['get', 'intensity'],
    'high',    '#EF4444',   // red
    'medium',  '#F97316',   // orange
    'low',     '#EAB308',   // yellow
    'tension', '#EAB308',   // yellow
    '#6B7280'               // gray (historical)
  ]
  ```
- [ ] Add pulsing animation for `status === 'active'` markers using CSS animation + custom HTML marker overlay
- [ ] Apply `circle-radius` expression to scale marker size with zoom level
- [ ] Add `circle-stroke-width` and `circle-stroke-color` for visibility on light backgrounds

---

### 2.3 Marker Clustering

- [ ] Enable clustering on the GeoJSON source:
  ```js
  cluster: true,
  clusterMaxZoom: 4,
  clusterRadius: 60
  ```
- [ ] Add cluster circle layer (larger circle, displays count)
- [ ] Add cluster count text layer (`symbol` layer with `text-field: ['get', 'point_count']`)
- [ ] Add unclustered point layer for individual markers at zoom > 4
- [ ] Handle cluster click: zoom map to cluster bounds on click

---

### 2.4 Hover Tooltips

- [ ] Create `MapTooltip` component (styled `div` positioned absolutely)
- [ ] Listen for `mousemove` event on unclustered point layer
- [ ] On hover: show tooltip with:
  - Conflict name
  - Status badge (Active / Tension / Historical)
  - Intensity badge
  - Approximate casualties (formatted: "~500K deaths")
  - Risk score
- [ ] On mouse leave: hide tooltip
- [ ] Change cursor to `pointer` on hover

---

### 2.5 Click → Conflict Detail Navigation

- [ ] Listen for `click` event on unclustered point layer
- [ ] Extract `slug` from clicked feature properties
- [ ] Navigate to `/conflict/[slug]` using `router.push()`
- [ ] Prevent click event bubbling to map (avoid accidental zoom)

---

### 2.6 Filter Controls

- [ ] Create `MapFilters` component (overlay panel, top-left or bottom-left of map)
- [ ] Implement **Intensity filter**: multi-select checkboxes (High / Medium / Low / Tension / Historical)
- [ ] Implement **Region filter**: dropdown select (All / Africa / Middle East / Europe / Asia / Americas)
- [ ] Store filter state in component state (or Zustand)
- [ ] On filter change: re-fetch `GET /api/v1/map/markers` with new query params
- [ ] Update GeoJSON source data: `map.getSource('conflicts').setData(newGeoJSON)`

---

### 2.7 Map Responsiveness

- [ ] Ensure map fills full viewport on desktop (`width: 100vw, height: 100vh`)
- [ ] On mobile: map fills full screen, filter panel collapses to bottom drawer
- [ ] Handle window resize: call `map.resize()` on container resize event
- [ ] Test on Chrome (desktop), Safari (iOS), Chrome (Android)

---

**Phase 2 Exit Criteria:**
- [ ] Map renders with all 20 conflict markers correctly colored
- [ ] Cluster markers appear at low zoom and expand on click
- [ ] Hover tooltips display correct conflict data
- [ ] Clicking a marker navigates to `/conflict/[slug]`
- [ ] Intensity and region filters update the map correctly
- [ ] No console errors or map rendering glitches on mobile

---

## Phase 3 — Conflict Detail Pages
**Goal:** Build the core conflict intelligence page with a tabbed layout, hero section, overview, key players, and all content sections.
**Estimated Duration:** 6–8 days
**Owner:** Frontend Engineer

---

### 3.1 Dynamic Route & Data Fetching

- [ ] Create `/app/conflict/[slug]/page.tsx`
- [ ] Implement `generateStaticParams()` to pre-render all 20 conflict slugs at build time
- [ ] Implement `generateMetadata()` for dynamic SEO metadata (title, description, OG tags) per conflict
- [ ] Fetch conflict data server-side using `fetch('/api/v1/conflicts/:slug', { next: { revalidate: 300 } })`
  - Revalidate every 5 minutes (ISR)
- [ ] Handle 404: if conflict slug not found, call `notFound()` from `next/navigation`
- [ ] Create dedicated API client functions in `lib/api/conflicts.ts`:
  - `getConflict(slug: string): Promise<Conflict>`
  - `getConflictActors(slug: string): Promise<ConflictActor[]>`
  - `getConflictImpact(slug: string): Promise<ImpactData>`
  - `getConflictTimeline(slug: string): Promise<TimelineEvent[]>`

---

### 3.2 Hero Section

- [ ] Design and implement `ConflictHero` component
- [ ] Display: conflict name (H1), status badge, intensity badge, risk score
- [ ] Build **Key Stats Strip** — a horizontal row of 4 stat cards:
  - Total deaths (from `humanitarian_impact`)
  - Displaced persons (`idp_count + refugee_count`)
  - Conflict duration (compute from `start_date` to today)
  - Risk Score (out of 10)
- [ ] Format large numbers: `500000` → `500K`, `1200000` → `1.2M`
- [ ] Add conflict region and start date in sub-header
- [ ] Implement **Share button** (copies current URL to clipboard via Web Share API, fallback to clipboard)

---

### 3.3 Tab Navigation

- [ ] Create `ConflictTabs` component with tabs:
  - Overview
  - Timeline
  - Key Players
  - Impact
- [ ] Implement tab switching with URL hash sync (`#overview`, `#timeline`, etc.)
  - On load, activate tab matching URL hash (deep-linkable tabs)
- [ ] Animate tab content change with Framer Motion `AnimatePresence`
- [ ] Make tabs horizontally scrollable on mobile (no wrapping)

---

### 3.4 Overview Tab

- [ ] Create `ConflictOverview` component
- [ ] Render `overview_text` with proper typography (paragraphs, no raw markdown)
- [ ] If `overview_text` contains markdown, render with `react-markdown` + `remark-gfm`
- [ ] Render `background_text` as collapsible "Background & Root Causes" section (collapsed by default)
- [ ] Add "Current Status" badge with last updated date

---

### 3.5 Key Players Tab

- [ ] Create `KeyPlayersTab` component
- [ ] Fetch actors from `GET /api/v1/conflicts/:slug/actors`
- [ ] Group actors by `role`: Parties to conflict / Supporters / Mediators / Observers
- [ ] Design `ActorCard` component:
  - Flag/logo (country flag via `flagcdn.com` for states, or placeholder)
  - Actor name + type badge
  - Role in conflict (colored badge)
  - Stated objectives (truncated, expandable)
- [ ] Render actor cards in a responsive grid (2 cols mobile, 3–4 cols desktop)
- [ ] For actors without logo: use a styled placeholder with initials

---

### 3.6 Loading & Error States

- [ ] Create `ConflictPageSkeleton` component (skeleton loaders matching page layout)
- [ ] Add `loading.tsx` in `/app/conflict/[slug]/` for Next.js Suspense streaming
- [ ] Create `error.tsx` in `/app/conflict/[slug]/` for error boundary
- [ ] Display user-friendly error message with "Return to Map" CTA on error

---

**Phase 3 Exit Criteria:**
- [ ] All 20 conflict pages render correctly with real seed data
- [ ] Tabs navigate correctly and are deep-linkable via URL hash
- [ ] Key stats strip displays correctly formatted numbers
- [ ] Overview and background text render cleanly
- [ ] Key players render with correct grouping and roles
- [ ] Page handles 404 gracefully

---

## Phase 4 — Timeline Slider
**Goal:** Build the interactive conflict timeline with scrollable events, category filters, and animated event cards.
**Estimated Duration:** 5–6 days
**Owner:** Frontend Engineer

---

### 4.1 Timeline Data & Fetching

- [ ] Fetch timeline events from `GET /api/v1/conflicts/:slug/timeline` client-side
- [ ] Create `useTimeline(slug)` custom hook with SWR for data fetching + loading state
- [ ] Sort events chronologically (ascending by `event_date`) on the client
- [ ] Define TypeScript type `TimelineEvent` in `packages/types`

---

### 4.2 Timeline Layout

- [ ] Create `TimelineSlider` component
- [ ] Implement horizontal scrollable timeline bar showing years/months as axis
- [ ] Position event dots along the axis at correct proportional positions based on date
- [ ] Add draggable slider thumb that the user can drag to a point in time
  - As the slider moves: highlight events to the left as "past", events to the right as "future"
  - Selected event card highlights below the timeline
- [ ] Add left/right arrow navigation buttons for keyboard and click navigation between events
- [ ] Implement **Play/Pause auto-scroll** button:
  - When "Play" clicked: slider auto-advances through events at 1.5-second intervals
  - Pause resumes control to user

---

### 4.3 Event Cards

- [ ] Design `TimelineEventCard` component:
  ```
  [Date badge]  [Category badge: Military / Political / Diplomatic / Humanitarian]
  [Event title — bold]
  [Event description — 2–3 lines, truncated with "Read more"]
  [Significance indicator: ⭐ Critical / Major / Moderate / Minor]
  [Source links (if available)]
  ```
- [ ] Apply color coding per category:
  - Military: red
  - Political: blue
  - Diplomatic: purple
  - Humanitarian: orange
- [ ] Add Framer Motion `fadeIn` animation when a new event card becomes active
- [ ] Stack event cards vertically below the timeline (for events close together in time)

---

### 4.4 Category Filters

- [ ] Add filter pill row above the timeline: `All | Military | Political | Diplomatic | Humanitarian`
- [ ] On filter select: filter visible events (update state, re-render timeline dots)
- [ ] Maintain selected event position when filter changes (if event no longer visible, jump to nearest visible)
- [ ] Show event count per category (e.g., "Military (12)")

---

### 4.5 Significance Markers

- [ ] Render "critical" and "major" events with larger dots on the timeline axis
- [ ] Add tooltip on dot hover showing event title and date
- [ ] Critical events show a star icon inside the dot

---

### 4.6 Responsiveness

- [ ] On mobile: timeline scrolls horizontally with touch-swipe support
- [ ] Event cards stack below the timeline and scroll vertically on mobile
- [ ] Touch-drag support for the slider thumb (use `pointer` events, not `mouse` events)

---

**Phase 4 Exit Criteria:**
- [ ] Timeline renders all seed events for every conflict
- [ ] Slider drag updates the active event card correctly
- [ ] Play/Pause auto-scroll works at correct interval
- [ ] Category filters correctly show/hide events
- [ ] Timeline is usable on mobile (touch drag, swipe)

---

## Phase 5 — Impact Dashboard
**Goal:** Build visualizations for conflict impact data — casualties, displacement, and economic indicators.
**Estimated Duration:** 4–5 days
**Owner:** Frontend Engineer

---

### 5.1 Data Fetching

- [ ] Create `useConflictImpact(slug)` custom hook fetching `GET /api/v1/conflicts/:slug/impact`
- [ ] Define TypeScript types:
  - `HumanitarianImpact`: `{ total_deaths, civilian_deaths, combatant_deaths, idp_count, refugee_count, as_of_date, source }`
  - `EconomicImpactMetric`: `{ metric_name, metric_value, metric_unit, as_of_date, source }`

---

### 5.2 Install & Configure Recharts

- [ ] Install `recharts`
- [ ] Create `/components/impact/` directory
- [ ] Create base chart wrapper `ChartCard` component (title + description + chart + source attribution)
- [ ] Configure consistent chart colors and theme tokens in Tailwind config

---

### 5.3 Human Impact Section

- [ ] Create `HumanitarianImpactPanel` component
- [ ] Build **Stat counters** (large animated counters using `react-countup`):
  - Total deaths
  - Civilian deaths
  - Combatant deaths
  - Internally displaced persons
  - Refugees (cross-border)
- [ ] Build **Deaths Breakdown Chart** (Recharts `PieChart` or `BarChart`):
  - Civilian deaths vs. combatant deaths
  - Label both segments with count and percentage
- [ ] Build **Displacement Stats** (two stat cards side by side):
  - IDPs (internally displaced)
  - Refugees (cross-border)
  - Source + "as of" date displayed below each stat
- [ ] Add `as_of_date` + `source` attribution below each visualization

---

### 5.4 Economic Impact Section

- [ ] Create `EconomicImpactPanel` component
- [ ] Group `economic_impact` rows by `metric_name`
- [ ] Render each economic metric as a **Metric Card**:
  - Metric name (e.g., "GDP Impact", "Sanctions Count", "Oil Price Impact")
  - Metric value (formatted with unit)
  - Source and date
  - Trend indicator arrow (up/down) if applicable
- [ ] Build **Economic Metrics Bar Chart** (Recharts `BarChart`):
  - X-axis: metric names
  - Y-axis: normalized values
  - Color: red for negative impact metrics
- [ ] Add disclaimer footer: *"Economic figures are estimates from World Bank, IMF, and UN sources. Subject to revision."*

---

### 5.5 Dashboard Layout

- [ ] Create `ImpactTab` component rendering both panels
- [ ] Layout: 2-column grid on desktop (Human Impact left, Economic Impact right)
- [ ] Single column stacked on mobile
- [ ] Add section headers with icons:
  - 🔴 Human Impact
  - 📉 Economic Impact
- [ ] Show loading skeleton while data is being fetched
- [ ] Show "No data available yet" state if impact data is empty

---

**Phase 5 Exit Criteria:**
- [ ] All 20 conflicts display impact data (from seed data)
- [ ] Pie/bar charts render correctly with real values
- [ ] Animated counters count up on tab entry
- [ ] Economic metrics display with correct units and sources
- [ ] Layout is clean on mobile and desktop

---

## Phase 6 — AI Conflict Explainer
**Goal:** Build the AI explanation system with streaming responses, 4 explanation levels, and an interactive panel on the conflict detail page.
**Estimated Duration:** 6–7 days
**Owner:** Full-Stack Engineer (AI-focused)

---

### 6.1 AI Service — FastAPI Foundation

- [ ] Create `apps/ai-service/app/main.py` with FastAPI app instance
- [ ] Add CORS middleware (allow requests from Next.js dev + production origins)
- [ ] Create `GET /health` endpoint
- [ ] Implement `POST /ai/explain` endpoint skeleton (request/response types only)
- [ ] Define Pydantic request schema:
  ```python
  class ExplainRequest(BaseModel):
      conflict_id: str
      conflict_name: str
      conflict_overview: str
      conflict_background: str
      level: Literal["eli10", "eli15", "college", "policymaker"]
      language: str = "en"
      follow_up_messages: list[dict] | None = None
  ```
- [ ] Define response schema (streaming SSE — no Pydantic model needed, raw text stream)

---

### 6.2 LLM Integration

- [ ] Install `google-generativeai` Python SDK
- [ ] Create `apps/ai-service/app/services/llm.py`:
  - `create_gemini_client()` — initializes `genai.GenerativeModel` client from `GEMINI_API_KEY` env var
  - `stream_completion(contents, model, generation_config)` → async generator using `generate_content_async(stream=True)`
- [ ] Create `apps/ai-service/app/services/prompts.py`:
  - Define level-specific system prompts:

  ```python
  LEVEL_PROMPTS = {
    "eli10": """
      You are a kind teacher explaining a complex topic to a 10-year-old.
      Use simple words. Avoid jargon. Use short sentences.
      Answer in 6 structured sections: What's happening, Why it started,
      Who's involved, What happened so far, Why it matters, What might happen next.
      Keep total response under 200 words.
    """,
    "eli15": "...",       # Grade 9 level, 250 words max
    "college": "...",     # Undergraduate level, 400 words, introduce concepts
    "policymaker": "..."  # Expert level, 600 words, reference geopolitical frameworks
  }
  ```

- [ ] Enforce in all prompts: *"Never assign moral blame. Cite uncertainty. Do not editorialize."*
- [ ] Create `ExplainerService` class that:
  1. Selects the correct system prompt by `level`
  2. Constructs user message with conflict context
  3. Appends `follow_up_messages` to conversation history if present
  4. Calls Gemini streaming API via `generate_content_async(stream=True)`
  5. Yields text chunks as SSE events

---

### 6.3 Streaming SSE Endpoint

- [ ] Implement `POST /ai/explain` as a streaming response:
  ```python
  from fastapi.responses import StreamingResponse

  @router.post("/explain")
  async def explain_conflict(request: ExplainRequest):
      async def generate():
          async for chunk in explainer_service.stream(request):
              yield f"data: {chunk}\n\n"
          yield "data: [DONE]\n\n"

      return StreamingResponse(generate(), media_type="text/event-stream")
  ```
- [ ] Set appropriate headers: `Cache-Control: no-cache`, `X-Accel-Buffering: no`
- [ ] Add request-level error handling: if Gemini API call fails, yield an error SSE event

---

### 6.4 API Gateway Integration

- [ ] Add proxy route in Next.js API routes (`/app/api/ai/explain/route.ts`):
  - Forwards request to FastAPI AI service
  - Streams the SSE response back to the browser
  - Adds conflict context (fetches conflict data from Node API and includes it in the AI request)
- [ ] This keeps the Gemini API key server-side only (never exposed to browser)

---

### 6.5 AI Explainer UI Panel

- [ ] Create `AIExplainerPanel` component
- [ ] **Layout (desktop):** Sticky right sidebar (320px wide) that scrolls with page
- [ ] **Layout (mobile):** Bottom sheet that slides up when triggered
- [ ] Panel sections:
  ```
  [🤖 Ask AI] header with CHAKRAVYUH_AI branding

  [Level selector — horizontal pill buttons]:
   ELI10 | ELI15 | College | Policymaker

  [Trigger button]: "Explain this conflict"

  [Response area]:
   - Streaming text renders word-by-word
   - Blinking cursor during streaming
   - Fully rendered when [DONE] received

  [Follow-up input]:
   - Text input: "Ask a follow-up question..."
   - Submit button
   - Follow-up conversation history displayed above input

  [Footer]: "⚠️ AI-generated content. Always verify with primary sources."
  ```
- [ ] Create `useAIExplainer` hook:
  - State: `loading`, `streaming`, `response`, `conversationHistory`, `selectedLevel`
  - Function: `explain()` — posts to `/api/ai/explain`, reads SSE stream, appends chunks to `response`
  - Function: `askFollowUp(question)` — appends to history, calls explain with context
- [ ] Implement SSE client using `EventSource` or `fetch` with `ReadableStream`:
  ```ts
  const response = await fetch('/api/ai/explain', { method: 'POST', body: ... })
  const reader = response.body.getReader()
  // read chunks and update state
  ```
- [ ] Show `Skeleton` loader while first chunk hasn't arrived yet
- [ ] Add "Stop" button to abort in-progress stream (`AbortController`)

---

### 6.6 AI Response Caching (Cost Control)

- [ ] In the Next.js API proxy route: before calling AI service, check Redis cache:
  - Cache key: `ai:explain:{conflict_slug}:{level}`
  - TTL: 1 hour
- [ ] If cache hit: stream the cached response directly (no AI call)
- [ ] If cache miss: stream AI response AND write to Redis in parallel
- [ ] Note: follow-up Q&A is never cached (unique per session)

---

### 6.7 AI Safety & Guardrails

- [ ] Add system prompt instruction: *"If asked about topics unrelated to this conflict, politely redirect to the conflict topic."*
- [ ] Add input sanitization: strip HTML tags and trim whitespace from user follow-up inputs
- [ ] Limit follow-up message length to 500 characters (enforce in UI + API)
- [ ] Add AI response disclaimer label in the UI: `"AI-generated · May contain errors"`
- [ ] Add `🚩 Flag this response` link (opens mailto or form — logs to monitoring)

---

**Phase 6 Exit Criteria:**
- [ ] All 4 explanation levels generate coherent, correctly calibrated responses
- [ ] Streaming text renders smoothly in the UI without flickering
- [ ] Follow-up Q&A maintains conversation context across 3+ turns
- [ ] Redis caching confirmed: second request for same conflict + level is served from cache
- [ ] "Stop" button correctly aborts in-progress streams
- [ ] AI panel is fully usable on mobile (bottom sheet)

---

## Phase 7 — Integration, Polish & QA
**Goal:** Connect all pieces, fix rough edges, optimize performance, and ensure a production-quality experience across devices.
**Estimated Duration:** 5–6 days
**Owner:** Full team

---

### 7.1 Full Integration Smoke Tests

- [ ] Navigate from map marker click → conflict detail page → all 4 tabs load correctly
- [ ] Timeline slider loads events for all 20 conflicts
- [ ] Impact dashboard loads data for all 20 conflicts
- [ ] AI explainer works for all 4 levels on at least 5 conflicts
- [ ] Test with all 20 conflict slugs — no 404s or broken pages
- [ ] Verify all API cache responses are being served on repeat requests

---

### 7.2 Loading & Error State Audit

- [ ] Audit every data-fetching component — confirm loading skeleton exists
- [ ] Audit every API call — confirm error state with user-friendly message exists
- [ ] Conflict page: test behavior when API is slow (>3s) — skeleton should show
- [ ] Map: test behavior when markers API fails — show error toast, map still renders
- [ ] AI panel: test behavior when AI service is unavailable — show error state, not blank

---

### 7.3 Mobile Optimization

- [ ] Test all pages on iPhone 14 (390px) and a mid-range Android (360px)
- [ ] Fix any text overflow, broken layouts, or tap target issues
- [ ] Map filter panel: implement bottom drawer on mobile with drag-to-close
- [ ] AI panel: verify bottom sheet open/close animation is smooth
- [ ] Timeline: confirm touch-swipe and touch-drag work correctly on mobile
- [ ] Ensure no horizontal scroll occurs on any page at 360px width

---

### 7.4 Performance Optimization

- [ ] Run Lighthouse audit on home page and one conflict page — target LCP < 2.5s
- [ ] Implement `next/image` for all images (actor photos, media in timeline events)
- [ ] Add `loading="lazy"` to below-the-fold images
- [ ] Lazy-load MapLibre GL JS with Next.js `dynamic()` (saves ~250KB on non-map pages)
- [ ] Lazy-load Recharts with `dynamic()` (saves ~80KB on non-impact pages)
- [ ] Verify ISR revalidation is working (conflict pages update within 5 minutes of API change)
- [ ] Add `stale-while-revalidate` headers to API responses
- [ ] Confirm Redis cache hit rates > 80% in staging under load

---

### 7.5 Accessibility Audit

- [ ] Ensure all interactive elements have `aria-label` attributes
- [ ] Verify color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Map markers: add `aria-describedby` tooltips for screen reader users
- [ ] Tab navigation: all tabs are keyboard navigable with correct focus management
- [ ] Timeline slider: keyboard left/right arrow key navigation (not just drag)
- [ ] AI panel: focus is trapped in bottom sheet when open on mobile

---

### 7.6 Cross-Browser Testing

- [ ] Chrome (latest) — desktop and mobile
- [ ] Safari (latest) — desktop and iOS
- [ ] Firefox (latest) — desktop
- [ ] Edge (latest) — desktop
- [ ] Fix any MapLibre GL JS rendering issues on Safari (common WebGL quirks)

---

### 7.7 SEO & Meta Tags

- [ ] Add global `layout.tsx` metadata (site name, default OG image, Twitter card)
- [ ] Add per-conflict `generateMetadata()` with:
  - `title`: `"{Conflict Name} — CHAKRAVYUH_AI"`
  - `description`: First 160 chars of `overview_text`
  - `openGraph.image`: Conflict-specific OG image (auto-generated or static)
- [ ] Add `robots.txt` (allow all)
- [ ] Add `sitemap.xml` (generated dynamically from conflict slugs)
- [ ] Verify Googlebot can render pages (use Google Search Console URL Inspection)

---

### 7.8 Analytics & Monitoring

- [ ] Verify Sentry is capturing errors in production frontend and API
- [ ] Add custom Sentry breadcrumbs for key user actions (map click, AI explain triggered)
- [ ] Set up PostHog (or Vercel Analytics) events:
  - `conflict_page_viewed` — `{ conflict_slug, region }`
  - `ai_explain_triggered` — `{ conflict_slug, level }`
  - `timeline_interacted` — `{ conflict_slug }`
  - `impact_tab_viewed` — `{ conflict_slug }`
- [ ] Verify all events are firing in PostHog dashboard

---

**Phase 7 Exit Criteria:**
- [ ] Lighthouse score: Performance > 85, Accessibility > 90, SEO > 90
- [ ] Zero P0 bugs (crashes, broken pages, broken navigation)
- [ ] All loading and error states implemented
- [ ] Mobile experience confirmed working on 3+ device types
- [ ] Analytics events firing correctly in staging

---

## Phase 8 — Deployment & Production Launch
**Goal:** Ship to production with proper infrastructure, monitoring, and a validated launch checklist.
**Estimated Duration:** 3–4 days
**Owner:** Lead Engineer + DevOps

---

### 8.1 Production Database Setup

- [ ] Provision managed PostgreSQL instance (Supabase / Railway / AWS RDS)
  - Minimum: 2 vCPU, 4GB RAM, 50GB SSD
  - Enable automated daily backups (7-day retention)
  - Enable connection pooling (PgBouncer)
- [ ] Run production migrations: `drizzle-kit migrate`
- [ ] Run all seed scripts in production DB
- [ ] Verify all 20 conflicts + seed data are present
- [ ] Set up production read replica for non-mutating queries

---

### 8.2 Production Redis Setup

- [ ] Provision managed Redis instance (Upstash / Railway / Redis Cloud)
  - Minimum: 256MB, persistent storage enabled
- [ ] Update `REDIS_URL` in production environment variables
- [ ] Test cache connectivity from API service in production

---

### 8.3 Frontend Deployment — Vercel

- [ ] Connect GitHub repo to Vercel project
- [ ] Configure production domain: `chakravyuh.ai` (or placeholder domain)
- [ ] Set all production environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_AI_SERVICE_URL`
- [ ] Enable Vercel Analytics
- [ ] Enable Vercel Edge Network (global CDN — automatic)
- [ ] Configure `vercel.json` for ISR revalidation headers
- [ ] Run test deployment and verify build succeeds

---

### 8.4 Backend Deployment — API Service

- [ ] Deploy `apps/api` to Railway / Render / Fly.io:
  - Set `NODE_ENV=production`
  - Set `DATABASE_URL`, `REDIS_URL`
  - Minimum: 512MB RAM, 0.5 vCPU
  - Enable auto-restart on crash
- [ ] Verify `GET /api/v1/health` returns `200 OK` from production URL
- [ ] Verify all conflict endpoints return correct data
- [ ] Configure custom domain: `api.chakravyuh.ai`

---

### 8.5 AI Service Deployment

- [ ] Deploy `apps/ai-service` to Railway / Fly.io:
  - Set `GEMINI_API_KEY`, `REDIS_URL`
  - Minimum: 512MB RAM (FastAPI is lightweight)
  - Enable auto-restart on crash
- [ ] Verify `GET /health` returns `200 OK`
- [ ] Verify `POST /ai/explain` returns streaming SSE response for a test conflict
- [ ] Configure custom domain: `ai.chakravyuh.ai` (or proxy through API)

---

### 8.6 CDN & Performance Configuration

- [ ] Configure Cloudflare (free tier) in front of API and AI service:
  - Enable DDoS protection
  - Set caching rules: cache static conflict data, bypass cache for AI endpoints
- [ ] Verify Vercel CDN is serving static assets from edge (check `x-vercel-cache: HIT` header)
- [ ] Set `Cache-Control: s-maxage=300, stale-while-revalidate=60` on conflict API responses

---

### 8.7 Security Hardening

- [ ] Add `helmet` middleware to Node API (security headers)
- [ ] Verify CORS is restricted to production frontend domain only
- [ ] Verify `GEMINI_API_KEY` is not exposed in any client-side code or browser network requests
- [ ] Run `npm audit` and `pip audit` — fix any critical/high CVEs
- [ ] Enable Vercel's security headers (CSP, X-Frame-Options, HSTS) in `next.config.ts`
- [ ] Verify API keys are not exposed in client-side code or browser network requests

---

### 8.8 Production Smoke Tests

Run these manually after every production deployment:

- [ ] Home page loads in < 3 seconds (cold cache)
- [ ] Map renders with conflict markers correctly
- [ ] Click a conflict marker → navigate to correct conflict page
- [ ] All 4 tabs on conflict page load correctly
- [ ] Timeline slider works (drag, click, play/pause)
- [ ] Impact dashboard renders charts with real data
- [ ] AI Explainer returns a response for "ELI10" level for Ukraine conflict
- [ ] AI follow-up question works
- [ ] Test on mobile browser (Safari / Chrome)

---

### 8.9 Pre-Launch Checklist

- [ ] Favicon and app icon added
- [ ] `robots.txt` verified (not blocking crawlers)
- [ ] `sitemap.xml` verified and accessible
- [ ] 404 page created (`not-found.tsx`)
- [ ] 500 error page created (`error.tsx`)
- [ ] Privacy policy page created (minimal, placeholder is fine for MVP)
- [ ] "About" page created (one paragraph about the platform)
- [ ] All external links open in `target="_blank"` with `rel="noopener noreferrer"`
- [ ] Google Analytics / PostHog verified firing on production
- [ ] Sentry verified capturing test errors in production

---

### 8.10 Launch

- [ ] Announce on social media / ProductHunt / Hacker News (Show HN)
- [ ] Share with 5–10 trusted beta users for initial feedback
- [ ] Monitor Sentry dashboard for first 24 hours post-launch
- [ ] Monitor PostHog for first user sessions
- [ ] Monitor Uptime Robot — no downtime alerts in first 24 hours
- [ ] Document all post-launch bugs in GitHub Issues with priority labels

---

**Phase 8 Exit Criteria:**
- [ ] All production smoke tests pass
- [ ] Pre-launch checklist 100% complete
- [ ] Platform accessible at production URL
- [ ] Zero P0 bugs in first 24 hours
- [ ] Monitoring dashboards active (Sentry, PostHog, Uptime Robot)

---

## Summary

| Phase | Focus | Duration | Owner |
|---|---|---|---|
| Phase 0 | Project Setup & Infrastructure | 3–4 days | Lead + DevOps |
| Phase 1 | Data Model & Backend APIs | 5–7 days | Backend |
| Phase 2 | Interactive Global Map | 5–6 days | Frontend |
| Phase 3 | Conflict Detail Pages | 6–8 days | Frontend |
| Phase 4 | Timeline Slider | 5–6 days | Frontend |
| Phase 5 | Impact Dashboard | 4–5 days | Frontend |
| Phase 6 | AI Conflict Explainer | 6–7 days | Full-Stack |
| Phase 7 | Integration & Polish | 5–6 days | Full team |
| Phase 8 | Deployment & Launch | 3–4 days | Lead + DevOps |
| **Total** | | **~48–58 days** | |

---

## Key Technical Decisions

| Decision | Choice | Reason |
|---|---|---|
| Frontend framework | Next.js 14 (App Router) | ISR, SSG, streaming, ecosystem |
| Map library | MapLibre GL JS | WebGL performance, open-source, no API billing |
| ORM | Drizzle ORM | Type-safe, lightweight, fast migrations |
| Charts | Recharts | React-native, good defaults, small bundle |
| State management | Zustand | Simple, no boilerplate |
| AI SDK | Google Gemini API (`google-generativeai`) | Native streaming, strong multilingual support, competitive pricing |
| AI framework | LangChain + `langchain-google-genai` | Streaming, prompt management, Gemini integration |
| Caching | Redis (Upstash) | Serverless-compatible, fast TTL ops |
| Deployment | Vercel (web) + Railway (backend) | Zero-config, fast, generous free tiers |

---

*Plan maintained by: Engineering Lead*
*Review cadence: End of each phase*
*Issues tracker: GitHub Issues — label conventions: `P0`, `P1`, `bug`, `feature`, `phase:N`*
