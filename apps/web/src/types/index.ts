// Shared TypeScript types for the frontend

export type ConflictStatus = "active" | "tension" | "historical" | "frozen" | "peacekeeping";
export type ConflictIntensity = "high" | "medium" | "low" | "tension" | "historical";

export interface ConflictMarkerProperties {
  conflict_id: number;
  slug: string;
  display_name: string;
  status: ConflictStatus;
  intensity: ConflictIntensity;
  risk_score: number | null;
  casualty_estimate: number | null;
  region: string;
}

export interface MapFiltersState {
  intensity: string[];
  region: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta: Record<string, unknown> | null;
  error: { code: string; message: string } | null;
}
