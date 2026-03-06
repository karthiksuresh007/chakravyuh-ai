from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes.health import router as health_router
from app.routes.explainer import router as explainer_router

app = FastAPI(
    title="Chakravyuh AI Service",
    description="AI-powered conflict explanation service using Gemini",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(explainer_router)
