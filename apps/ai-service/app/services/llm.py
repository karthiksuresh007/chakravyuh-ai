import google.generativeai as genai
from typing import AsyncIterator
from app.config import settings


def is_llm_configured() -> bool:
    return bool(settings.GEMINI_API_KEY.strip())


def ensure_llm_configured() -> None:
    if not is_llm_configured():
        raise RuntimeError("GEMINI_API_KEY is not configured")


def _configure_client() -> None:
    """Configure the Gemini SDK with the API key."""
    ensure_llm_configured()
    genai.configure(api_key=settings.GEMINI_API_KEY)


def get_model(
    system_instruction: str | None = None,
) -> genai.GenerativeModel:
    """Return a configured GenerativeModel instance."""
    _configure_client()
    return genai.GenerativeModel(
        model_name=settings.GEMINI_MODEL,
        system_instruction=system_instruction,
    )


async def stream_completion(
    model: genai.GenerativeModel,
    contents: list[dict],
) -> AsyncIterator[str]:
    """Stream text chunks from Gemini.

    Args:
        model: A configured GenerativeModel.
        contents: Conversation history in the Gemini content format
                  [{"role": "user"|"model", "parts": ["..."]}].

    Yields:
        Text chunks as they arrive from the model.
    """
    response = await model.generate_content_async(
        contents,
        generation_config=genai.GenerationConfig(
            temperature=0.7,
            max_output_tokens=2048,
        ),
        stream=True,
    )

    async for chunk in response:
        if chunk.text:
            yield chunk.text


async def generate_completion(
    model: genai.GenerativeModel,
    contents: list[dict],
) -> str:
    """Generate a full (non-streaming) completion.

    Useful for testing and non-streaming callers.
    """
    response = await model.generate_content_async(
        contents,
        generation_config=genai.GenerationConfig(
            temperature=0.7,
            max_output_tokens=2048,
        ),
    )
    return response.text
