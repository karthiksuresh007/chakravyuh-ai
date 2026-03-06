import httpx
from app.config import settings


async def fetch_conflict(slug: str) -> dict | None:
    """Fetch full conflict record from the Node API."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"{settings.API_BASE_URL}/conflicts/{slug}")
        if resp.status_code != 200:
            return None
        body = resp.json()
        return body.get("data") if body.get("success") else None


async def fetch_timeline(slug: str) -> list[dict]:
    """Fetch timeline events for a conflict."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"{settings.API_BASE_URL}/conflicts/{slug}/timeline")
        if resp.status_code != 200:
            return []
        body = resp.json()
        return body.get("data", []) if body.get("success") else []


async def fetch_actors(slug: str) -> list[dict]:
    """Fetch actors involved in a conflict."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"{settings.API_BASE_URL}/conflicts/{slug}/actors")
        if resp.status_code != 200:
            return []
        body = resp.json()
        return body.get("data", []) if body.get("success") else []


async def fetch_impact(slug: str) -> dict | None:
    """Fetch humanitarian + economic impact data."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"{settings.API_BASE_URL}/conflicts/{slug}/impact")
        if resp.status_code != 200:
            return None
        body = resp.json()
        return body.get("data") if body.get("success") else None


def _format_number(value) -> str:
    """Format a number for display (e.g. 1200000 → 1,200,000)."""
    if value is None:
        return "unknown"
    try:
        return f"{int(value):,}"
    except (ValueError, TypeError):
        return str(value)


def build_context_document(
    conflict: dict,
    timeline: list[dict],
    actors_list: list[dict],
    impact: dict | None,
) -> str:
    """Assemble all conflict data into a single context string for the LLM."""
    sections: list[str] = []

    # ── Conflict overview ───────────────────────────────────
    name = conflict.get("displayName", conflict.get("display_name", "Unknown"))
    sections.append(f"CONFLICT: {name}")
    sections.append(f"Status: {conflict.get('status', 'unknown')}")
    sections.append(f"Intensity: {conflict.get('intensity', 'unknown')}")
    sections.append(f"Region: {conflict.get('region', 'unknown')}")
    sections.append(f"Start date: {conflict.get('startDate', conflict.get('start_date', 'unknown'))}")

    risk = conflict.get("riskScore", conflict.get("risk_score"))
    if risk:
        sections.append(f"Risk score: {risk}/10")

    overview = conflict.get("overviewText", conflict.get("overview_text", ""))
    if overview:
        sections.append(f"\nOVERVIEW:\n{overview}")

    background = conflict.get("backgroundText", conflict.get("background_text", ""))
    if background:
        sections.append(f"\nBACKGROUND & ROOT CAUSES:\n{background}")

    # ── Actors ──────────────────────────────────────────────
    if actors_list:
        lines = ["\nKEY ACTORS:"]
        for actor in actors_list:
            actor_name = actor.get("name", "Unknown")
            actor_type = actor.get("type", "")
            role = actor.get("role", "")
            objectives = actor.get("statedObjectives", actor.get("stated_objectives", ""))
            line = f"- {actor_name} ({actor_type}) — Role: {role}"
            if objectives:
                line += f" — Objectives: {objectives}"
            lines.append(line)
        sections.append("\n".join(lines))

    # ── Timeline ────────────────────────────────────────────
    if timeline:
        lines = ["\nTIMELINE OF KEY EVENTS:"]
        # Take up to 20 most recent events to stay within context limits
        for event in timeline[:20]:
            date = event.get("eventDate", event.get("event_date", ""))
            title = event.get("title", "")
            desc = event.get("description", "")
            category = event.get("category", "")
            significance = event.get("significance", "")
            line = f"- [{date}] ({category}, {significance}) {title}"
            if desc:
                line += f": {desc}"
            lines.append(line)
        if len(timeline) > 20:
            lines.append(f"  ... and {len(timeline) - 20} more events")
        sections.append("\n".join(lines))

    # ── Impact ──────────────────────────────────────────────
    if impact:
        humanitarian = impact.get("humanitarian")
        economic = impact.get("economic", [])

        if humanitarian:
            lines = ["\nHUMANITARIAN IMPACT:"]
            lines.append(f"- Total deaths: {_format_number(humanitarian.get('totalDeaths', humanitarian.get('total_deaths')))}")
            lines.append(f"- Civilian deaths: {_format_number(humanitarian.get('civilianDeaths', humanitarian.get('civilian_deaths')))}")
            lines.append(f"- Combatant deaths: {_format_number(humanitarian.get('combatantDeaths', humanitarian.get('combatant_deaths')))}")
            lines.append(f"- Internally displaced: {_format_number(humanitarian.get('idpCount', humanitarian.get('idp_count')))}")
            lines.append(f"- Refugees: {_format_number(humanitarian.get('refugeeCount', humanitarian.get('refugee_count')))}")
            source = humanitarian.get("source", "")
            as_of = humanitarian.get("asOfDate", humanitarian.get("as_of_date", ""))
            if source or as_of:
                lines.append(f"  (Source: {source}, as of {as_of})")
            sections.append("\n".join(lines))

        if economic:
            lines = ["\nECONOMIC IMPACT:"]
            for metric in economic:
                m_name = metric.get("metricName", metric.get("metric_name", ""))
                m_value = metric.get("metricValue", metric.get("metric_value", ""))
                m_unit = metric.get("metricUnit", metric.get("metric_unit", ""))
                notes = metric.get("notes", "")
                line = f"- {m_name}: {m_value} {m_unit}"
                if notes:
                    line += f" ({notes})"
                lines.append(line)
            sections.append("\n".join(lines))

    return "\n".join(sections)


async def get_conflict_context(slug: str) -> tuple[dict | None, str]:
    """Fetch all conflict data and build a context document.

    Returns:
        (conflict_dict, context_string) — conflict is None if not found.
    """
    conflict = await fetch_conflict(slug)
    if not conflict:
        return None, ""

    # Fetch supplementary data in parallel
    import asyncio

    timeline, actors_list, impact = await asyncio.gather(
        fetch_timeline(slug),
        fetch_actors(slug),
        fetch_impact(slug),
    )

    context = build_context_document(conflict, timeline, actors_list, impact)
    return conflict, context
