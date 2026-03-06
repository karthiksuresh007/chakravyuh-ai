import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse

from app.models.schemas import ExplainRequest, FollowUpRequest
from app.services.rag_service import get_conflict_context
from app.services.prompts import build_system_prompt, build_user_prompt
from app.services.llm import get_model, generate_completion, stream_completion
from app.services.memory import create_session, get_session

router = APIRouter(prefix="/ai", tags=["AI Explainer"])


async def _prepare_explanation(req: ExplainRequest):
    """Shared logic: fetch RAG context, build prompts, return model + contents + metadata."""

    conflict, context = await get_conflict_context(req.conflict_slug)
    if not conflict:
        raise HTTPException(status_code=404, detail=f"Conflict '{req.conflict_slug}' not found")

    system_prompt = build_system_prompt(req.level)
    user_prompt = build_user_prompt(context, req.question)

    contents: list[dict[str, str]] = []

    if req.follow_up_messages:
        for msg in req.follow_up_messages:
            role = msg.get("role", "user")
            text = msg.get("text", "")
            if role in ("user", "model") and text:
                contents.append({"role": role, "parts": [text]})

    contents.append({"role": "user", "parts": [user_prompt]})

    model = get_model(system_instruction=system_prompt)
    conflict_name = conflict.get("displayName", conflict.get("display_name", req.conflict_slug))

    return model, contents, conflict_name, user_prompt


# ── Non-streaming endpoint ─────────────────────────────────
@router.post("/explain")
async def explain_conflict(req: ExplainRequest):
    """Generate a full AI explanation (non-streaming). Returns a session_id for follow-ups."""

    model, contents, conflict_name, user_prompt = await _prepare_explanation(req)

    try:
        explanation = await generate_completion(model, contents)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"LLM generation failed: {str(e)}")

    # Store conversation in session for follow-ups
    session = create_session(req.conflict_slug, req.level)
    session.add_turn("user", user_prompt)
    session.add_turn("model", explanation)

    return JSONResponse(content={
        "success": True,
        "data": {
            "sessionId": session.session_id,
            "conflict": req.conflict_slug,
            "conflictName": conflict_name,
            "level": req.level,
            "question": req.question,
            "explanation": explanation,
        },
    })


# ── Streaming endpoint (SSE) ───────────────────────────────
@router.post("/explain/stream")
async def explain_conflict_stream(req: ExplainRequest):
    """Stream an AI explanation via Server-Sent Events.

    Event types:
      - `meta`  : conflict metadata + sessionId (sent once at the start)
      - `chunk` : a piece of the LLM-generated text
      - `done`  : signals the stream is complete
      - `error` : sent if generation fails mid-stream
    """

    model, contents, conflict_name, user_prompt = await _prepare_explanation(req)

    # Create session upfront so the client gets the ID in the meta event
    session = create_session(req.conflict_slug, req.level)
    session.add_turn("user", user_prompt)

    async def event_generator():
        meta = json.dumps({
            "sessionId": session.session_id,
            "conflict": req.conflict_slug,
            "conflictName": conflict_name,
            "level": req.level,
            "question": req.question,
        })
        yield f"event: meta\ndata: {meta}\n\n"

        full_response = []
        try:
            async for chunk in stream_completion(model, contents):
                full_response.append(chunk)
                escaped = json.dumps(chunk)
                yield f"event: chunk\ndata: {escaped}\n\n"

            # Save model response to session
            session.add_turn("model", "".join(full_response))
            yield "event: done\ndata: {}\n\n"
        except Exception as e:
            error_data = json.dumps({"error": str(e)})
            yield f"event: error\ndata: {error_data}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


# ── Follow-up endpoint ─────────────────────────────────────
@router.post("/follow-up")
async def follow_up(req: FollowUpRequest):
    """Ask a follow-up question within an existing conversation session."""

    session = get_session(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")

    # Build model with the same level prompt
    system_prompt = build_system_prompt(session.level)
    model = get_model(system_instruction=system_prompt)

    # Get existing conversation + add the new question
    contents = session.get_contents()
    contents.append({"role": "user", "parts": [req.question]})

    if req.stream:
        # Save user turn before streaming
        session.add_turn("user", req.question)

        async def event_generator():
            meta = json.dumps({
                "sessionId": session.session_id,
                "conflict": session.conflict_slug,
            })
            yield f"event: meta\ndata: {meta}\n\n"

            full_response = []
            try:
                async for chunk in stream_completion(model, contents):
                    full_response.append(chunk)
                    escaped = json.dumps(chunk)
                    yield f"event: chunk\ndata: {escaped}\n\n"

                session.add_turn("model", "".join(full_response))
                yield "event: done\ndata: {}\n\n"
            except Exception as e:
                error_data = json.dumps({"error": str(e)})
                yield f"event: error\ndata: {error_data}\n\n"

        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    # Non-streaming follow-up
    try:
        answer = await generate_completion(model, contents)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"LLM generation failed: {str(e)}")

    session.add_turn("user", req.question)
    session.add_turn("model", answer)

    return JSONResponse(content={
        "success": True,
        "data": {
            "sessionId": session.session_id,
            "conflict": session.conflict_slug,
            "question": req.question,
            "answer": answer,
            "turnCount": len(session.turns),
        },
    })
