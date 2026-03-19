from fastapi import APIRouter
from app.models.schemas import HealthResponse
from app.services.llm import is_llm_configured

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy" if is_llm_configured() else "degraded",
        service="chakravyuh-ai-service",
        version="1.0.0",
        ai_configured=is_llm_configured(),
    )
