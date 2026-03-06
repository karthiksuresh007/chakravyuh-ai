from pydantic import BaseModel, Field
from typing import Literal


class ExplainRequest(BaseModel):
    conflict_slug: str = Field(..., min_length=1, max_length=100)
    level: Literal["eli10", "eli15", "college", "policymaker", "research"] = "college"
    question: str | None = Field(
        default=None, max_length=500, description="Optional user question"
    )
    follow_up_messages: list[dict[str, str]] | None = Field(
        default=None, description="Previous conversation turns (client-side fallback)"
    )


class FollowUpRequest(BaseModel):
    session_id: str = Field(..., min_length=1, max_length=32)
    question: str = Field(..., min_length=1, max_length=500)
    stream: bool = False


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
