"use client";

import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/components/timeline/TimelineEventCard";

export type TimelineCategory = "all" | "military" | "political" | "diplomatic" | "humanitarian";

const FILTER_OPTIONS: { id: TimelineCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "military", label: "Military" },
  { id: "political", label: "Political" },
  { id: "diplomatic", label: "Diplomatic" },
  { id: "humanitarian", label: "Humanitarian" },
];

interface TimelineFiltersProps {
  /** Categories that actually exist in the data */
  availableCategories: string[];
  activeCategory: TimelineCategory;
  onSelect: (cat: TimelineCategory) => void;
  /** Total event count for the active filter */
  eventCount: number;
}

export default function TimelineFilters({
  availableCategories,
  activeCategory,
  onSelect,
  eventCount,
}: TimelineFiltersProps) {
  // Only show filters that are "all" or present in the data
  const visible = FILTER_OPTIONS.filter(
    (f) => f.id === "all" || availableCategories.includes(f.id)
  );

  return (
    <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Timeline category filters">
      {visible.map((filter) => {
        const isActive = activeCategory === filter.id;
        const color = filter.id === "all" ? "#ffffff" : (CATEGORY_COLORS[filter.id] ?? "#6b7280");

        return (
          <button
            key={filter.id}
            onClick={() => onSelect(filter.id)}
            aria-pressed={isActive}
            className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isActive
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {/* Active pill background */}
            {isActive && (
              <motion.div
                layoutId="timeline-filter-pill"
                className="absolute inset-0 rounded-full bg-gray-800 border border-gray-700"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {/* Category dot (except "all") */}
            {filter.id !== "all" && (
              <span
                className="relative z-10 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
            )}

            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}

      {/* Event count */}
      <span className="ml-auto text-[10px] text-gray-600">
        {eventCount} event{eventCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
