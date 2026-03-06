"use client";

import { useMemo, useState, useCallback } from "react";
import { useConflictTimeline } from "@/lib/hooks/use-conflict";
import type { TimelineEvent } from "@/types";

export type TimelineCategory = "all" | "military" | "political" | "diplomatic" | "humanitarian";

const CATEGORY_ORDER: TimelineCategory[] = [
  "all",
  "military",
  "political",
  "diplomatic",
  "humanitarian",
];

export interface UseTimelineReturn {
  /** All events sorted chronologically */
  events: TimelineEvent[];
  /** Events filtered by active category */
  filteredEvents: TimelineEvent[];
  /** Unique categories present in the data (always includes "all") */
  categories: TimelineCategory[];
  /** Currently active category filter */
  activeCategory: TimelineCategory;
  /** Set the active category filter */
  setActiveCategory: (cat: TimelineCategory) => void;
  /** Index of the currently active event within filteredEvents */
  activeIndex: number;
  /** Set the active event index */
  setActiveIndex: (index: number) => void;
  /** Go to next event, returns false if already at end */
  next: () => boolean;
  /** Go to previous event, returns false if already at start */
  prev: () => boolean;
  /** SWR loading state */
  isLoading: boolean;
  /** SWR error */
  error: Error | undefined;
}

export function useTimeline(slug: string | null): UseTimelineReturn {
  const { data, error, isLoading } = useConflictTimeline(slug);
  const [activeCategory, setActiveCategory] = useState<TimelineCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);

  // Sort all events chronologically
  const events = useMemo(() => {
    if (!data) return [];
    return [...data].sort(
      (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
  }, [data]);

  // Extract unique categories present in the data
  const categories = useMemo(() => {
    const found = new Set(events.map((e) => e.category.toLowerCase()));
    return CATEGORY_ORDER.filter(
      (cat) => cat === "all" || found.has(cat)
    );
  }, [events]);

  // Filter events by active category
  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return events;
    return events.filter(
      (e) => e.category.toLowerCase() === activeCategory
    );
  }, [events, activeCategory]);

  // Reset active index when filter changes
  const handleSetCategory = useCallback((cat: TimelineCategory) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  }, []);

  // Clamp active index to valid range
  const clampedIndex = Math.min(activeIndex, Math.max(0, filteredEvents.length - 1));

  const next = useCallback(() => {
    if (clampedIndex >= filteredEvents.length - 1) return false;
    setActiveIndex(clampedIndex + 1);
    return true;
  }, [clampedIndex, filteredEvents.length]);

  const prev = useCallback(() => {
    if (clampedIndex <= 0) return false;
    setActiveIndex(clampedIndex - 1);
    return true;
  }, [clampedIndex]);

  return {
    events,
    filteredEvents,
    categories,
    activeCategory,
    setActiveCategory: handleSetCategory,
    activeIndex: clampedIndex,
    setActiveIndex,
    next,
    prev,
    isLoading,
    error,
  };
}
