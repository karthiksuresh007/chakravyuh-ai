import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:3001/api/v1")
    PORT: int = int(os.getenv("PORT", "8000"))
    CORS_ORIGINS: list[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:3000"
    ).split(",")


settings = Settings()
