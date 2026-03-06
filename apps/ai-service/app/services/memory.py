"""In-memory conversation session store with TTL-based expiry."""

import time
import uuid
from dataclasses import dataclass, field

# Max conversation turns to keep per session (prevents unbounded growth)
MAX_TURNS = 20

# Session TTL in seconds (30 minutes of inactivity)
SESSION_TTL = 1800


@dataclass
class Session:
    session_id: str
    conflict_slug: str
    level: str
    turns: list[dict[str, str]] = field(default_factory=list)
    created_at: float = field(default_factory=time.time)
    last_accessed: float = field(default_factory=time.time)

    def touch(self):
        self.last_accessed = time.time()

    def is_expired(self) -> bool:
        return (time.time() - self.last_accessed) > SESSION_TTL

    def add_turn(self, role: str, text: str):
        self.turns.append({"role": role, "parts": [text]})
        # Trim oldest turns if over limit (keep first turn for context)
        if len(self.turns) > MAX_TURNS:
            self.turns = self.turns[:1] + self.turns[-(MAX_TURNS - 1):]

    def get_contents(self) -> list[dict[str, str]]:
        return list(self.turns)


# Global session store
_sessions: dict[str, Session] = {}


def create_session(conflict_slug: str, level: str) -> Session:
    """Create a new conversation session."""
    _cleanup_expired()
    session_id = uuid.uuid4().hex[:16]
    session = Session(
        session_id=session_id,
        conflict_slug=conflict_slug,
        level=level,
    )
    _sessions[session_id] = session
    return session


def get_session(session_id: str) -> Session | None:
    """Retrieve a session by ID, or None if expired/missing."""
    _cleanup_expired()
    session = _sessions.get(session_id)
    if session and not session.is_expired():
        session.touch()
        return session
    # Remove expired session
    if session:
        _sessions.pop(session_id, None)
    return None


def _cleanup_expired():
    """Remove expired sessions (lazy GC)."""
    expired = [sid for sid, s in _sessions.items() if s.is_expired()]
    for sid in expired:
        del _sessions[sid]
