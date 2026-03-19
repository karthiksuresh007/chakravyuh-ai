# CHAKRAVYUH_AI MVP Roadmap

## Goal

Ship the current MVP on:

- `Vercel` for `apps/web`
- `Render` for `apps/api`
- `Render` for `apps/ai-service`

The MVP is complete when a user can:

1. Open the site.
2. Explore the conflict map.
3. Open a conflict detail page.
4. Read overview, timeline, key players, and impact data.
5. Use the AI explainer once `GEMINI_API_KEY` is provided.

## What Is Already Done

- Monorepo with separate `web`, `api`, and `ai-service`
- Conflict schema, migrations, and seed scripts
- API endpoints for conflicts, timeline, actors, impact, and map markers
- Next.js home page, dashboard, and conflict detail page
- Timeline, overview, key players, impact, and AI explainer UI
- Deployment env examples for all three apps
- Render blueprint for the backend services
- Graceful AI fallback when no API key is configured

## Remaining Manual Inputs

These are intentionally left for deployment-time configuration:

- `DATABASE_URL`
- `REDIS_URL`
- `CORS_ORIGINS`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_AI_SERVICE_URL`
- `API_BASE_URL`
- `GEMINI_API_KEY`

## MVP Completion Plan

### Phase 1: Backend deploy readiness

- Provision Postgres and Redis on Render
- Deploy `apps/api`
- Run migrations
- Run seeds
- Verify `/api/v1/health`

### Phase 2: AI deploy readiness

- Deploy `apps/ai-service`
- Set `API_BASE_URL` to the deployed API
- Confirm `/health`
- Add `GEMINI_API_KEY` when ready

### Phase 3: Frontend deploy readiness

- Deploy `apps/web` to Vercel
- Set project root to `apps/web`
- Configure `NEXT_PUBLIC_API_URL`
- Configure `NEXT_PUBLIC_AI_SERVICE_URL`
- Confirm dashboard and conflict pages render live backend data

### Phase 4: Smoke tests

- Open `/`
- Open `/dashboard`
- Navigate from map to a conflict page
- Verify overview, timeline, players, and impact tabs
- Verify AI returns a clean unavailable message without key
- Verify AI streams correctly after key setup

## Deployment Order

1. Deploy API on Render.
2. Deploy AI service on Render.
3. Deploy web on Vercel.
4. Seed the production database.
5. Add `GEMINI_API_KEY`.
6. Run smoke tests.

## Definition Of Done

- Web app is live on Vercel
- API is live on Render
- AI service is live on Render
- Conflict pages render real data
- AI is healthy and usable after key setup
