import useSWR from "swr";
import type {
  Conflict,
  Actor,
  TimelineEvent,
  ConflictImpact,
} from "@/types";

export function useConflict(slug: string | null) {
  return useSWR<Conflict>(slug ? `/conflicts/${slug}` : null);
}

export function useConflictTimeline(slug: string | null) {
  return useSWR<TimelineEvent[]>(slug ? `/conflicts/${slug}/timeline` : null);
}

export function useConflictActors(slug: string | null) {
  return useSWR<Actor[]>(slug ? `/conflicts/${slug}/actors` : null);
}

export function useConflictImpact(slug: string | null) {
  return useSWR<ConflictImpact>(slug ? `/conflicts/${slug}/impact` : null);
}

export function useConflicts() {
  return useSWR<{ items: Conflict[]; total: number; limit: number; offset: number }>(
    "/conflicts?limit=100"
  );
}
