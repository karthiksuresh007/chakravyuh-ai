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

// Phase 3 — Conflict Detail types

export interface Conflict {
  id: string;
  slug: string;
  displayName: string;
  status: ConflictStatus;
  intensity: ConflictIntensity;
  startDate: string;
  endDate: string | null;
  region: string;
  subRegion: string;
  lat: string;
  lng: string;
  riskScore: string;
  overviewText: string | null;
  backgroundText: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  conflictId: string;
  eventDate: string;
  title: string;
  description: string | null;
  category: string;
  significance: string;
  sources: unknown[] | null;
  mediaUrl: string | null;
  mediaType: string | null;
  createdAt: string;
}

export interface Actor {
  id: string;
  name: string;
  type: string;
  countryCode: string | null;
  description: string | null;
  logoUrl: string | null;
  role: string;
  statedObjectives: string | null;
  involvementStart: string | null;
  involvementEnd: string | null;
}

export interface HumanitarianImpact {
  id: string;
  conflictId: string;
  totalDeaths: number | null;
  civilianDeaths: number | null;
  combatantDeaths: number | null;
  idpCount: number | null;
  refugeeCount: number | null;
  asOfDate: string;
  source: string;
  updatedAt: string;
}

export interface EconomicImpact {
  id: string;
  conflictId: string;
  metricName: string;
  metricValue: string;
  metricUnit: string;
  asOfDate: string;
  source: string;
  notes: string | null;
  createdAt: string;
}

export interface ConflictImpact {
  humanitarian: HumanitarianImpact | null;
  economic: EconomicImpact[];
}
