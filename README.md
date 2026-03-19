# CHAKRAVYUH_AI

AI-powered platform to understand global wars and geopolitical conflicts through interactive maps, timelines, and AI explanations.

## Vision

Understand any conflict in under **3 minutes**.

## MVP Features

- Interactive Global Conflict Map
- Conflict Detail Pages
- Timeline Slider
- AI Conflict Explainer
- Impact Dashboard

## Architecture

Frontend
- Next.js
- React
- Tailwind
- MapLibre GL JS

Backend
- Node.js
- Fastify
- PostgreSQL
- Redis

AI Layer
- FastAPI
- Gemini / OpenAI
- RAG

## Environment

Copy and fill these files before local or cloud deployment:

- `apps/web/.env.example`
- `apps/api/.env.example`
- `apps/ai-service/.env.example`

## Deployment

Frontend
- Deploy `apps/web` to Vercel
- Set the Vercel project root to `apps/web`
- Configure `NEXT_PUBLIC_API_URL`
- Configure `NEXT_PUBLIC_AI_SERVICE_URL`

Backend
- Deploy `apps/api` to Render
- Deploy `apps/ai-service` to Render
- A starter `render.yaml` is included at the repo root

AI behavior
- The AI service is deployment-ready now
- It stays in a degraded but healthy state until `GEMINI_API_KEY` is provided
- Once the key is added, the explainer endpoints become usable without further code changes

## Docs

- PRD -> `/docs/prd.md`
- Development Plan -> `/docs/todo.md`
- MVP Roadmap -> `/docs/mvp-roadmap.md`
