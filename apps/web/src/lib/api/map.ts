import type { ApiResponse, ConflictMarkerProperties } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export interface ConflictFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: ConflictMarkerProperties;
}

export interface ConflictFeatureCollection {
  type: "FeatureCollection";
  features: ConflictFeature[];
}

interface FetchMarkersFilters {
  region?: string;
  status?: string;
  intensity?: string;
}

export async function fetchMapMarkers(
  filters?: FetchMarkersFilters
): Promise<ConflictFeatureCollection> {
  const params = new URLSearchParams();
  if (filters?.region) params.set("region", filters.region);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.intensity) params.set("intensity", filters.intensity);

  const qs = params.toString();
  const url = `${API_URL}/map/markers${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch map markers: ${res.status}`);
  }

  const json: ApiResponse<ConflictFeatureCollection> = await res.json();
  if (!json.success || !json.data) {
    throw new Error("Invalid API response for map markers");
  }

  return json.data;
}
