import type {
  ApiResponse,
  Conflict,
  Actor,
  TimelineEvent,
  ConflictImpact,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export async function getConflict(slug: string): Promise<Conflict> {
  const res = await fetch(`${API_URL}/conflicts/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch conflict: ${res.status}`);
  }

  const json: ApiResponse<Conflict> = await res.json();
  if (!json.success || !json.data) {
    throw new Error("Invalid API response for conflict");
  }

  return json.data;
}

export async function getConflictTimeline(slug: string): Promise<TimelineEvent[]> {
  const res = await fetch(`${API_URL}/conflicts/${encodeURIComponent(slug)}/timeline`);
  if (!res.ok) {
    throw new Error(`Failed to fetch timeline: ${res.status}`);
  }

  const json: ApiResponse<TimelineEvent[]> = await res.json();
  if (!json.success || !json.data) {
    throw new Error("Invalid API response for timeline");
  }

  return json.data;
}

export async function getConflictActors(slug: string): Promise<Actor[]> {
  const res = await fetch(`${API_URL}/conflicts/${encodeURIComponent(slug)}/actors`);
  if (!res.ok) {
    throw new Error(`Failed to fetch actors: ${res.status}`);
  }

  const json: ApiResponse<Actor[]> = await res.json();
  if (!json.success || !json.data) {
    throw new Error("Invalid API response for actors");
  }

  return json.data;
}

export async function getConflictImpact(slug: string): Promise<ConflictImpact> {
  const res = await fetch(`${API_URL}/conflicts/${encodeURIComponent(slug)}/impact`);
  if (!res.ok) {
    throw new Error(`Failed to fetch impact: ${res.status}`);
  }

  const json: ApiResponse<ConflictImpact> = await res.json();
  if (!json.success || !json.data) {
    throw new Error("Invalid API response for impact");
  }

  return json.data;
}

interface ConflictListResponse {
  items: Conflict[];
  total: number;
  limit: number;
  offset: number;
}

export async function listConflicts(): Promise<ConflictListResponse> {
  const res = await fetch(`${API_URL}/conflicts?limit=100`);
  if (!res.ok) {
    throw new Error(`Failed to fetch conflicts list: ${res.status}`);
  }

  const json: ApiResponse<ConflictListResponse> = await res.json();
  if (!json.success || !json.data) {
    throw new Error("Invalid API response for conflicts list");
  }

  return json.data;
}
