"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/types";

/* ─── Category colors ───────────────────────────────────────── */

export const CATEGORY_COLORS: Record<string, string> = {
  military: "#ef4444",
  political: "#3b82f6",
  diplomatic: "#a855f7",
  humanitarian: "#f97316",
};

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category.toLowerCase()] ?? "#6b7280";
}

/* ─── Props ─────────────────────────────────────────────────── */

interface TimelineEventCardProps {
  event: TimelineEvent;
  /** Render as a compact card (e.g. in a list) vs. the full featured card */
  compact?: boolean;
}

/* ─── Component ─────────────────────────────────────────────── */

export default function TimelineEventCard({
  event,
  compact = false,
}: TimelineEventCardProps) {
  const color = categoryColor(event.category);
  const isCritical = event.significance.toLowerCase() === "critical";
  const isMajor = event.significance.toLowerCase() === "major";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl border border-gray-800 bg-gray-900 ${
        compact ? "p-3" : "p-3 sm:p-5"
      }`}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {/* Category dot + label */}
        <span
          className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color }}
        >
          {event.category}
        </span>

        {/* Significance badge */}
        {(isCritical || isMajor) && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 border ${
              isCritical
                ? "border-red-700/50 text-red-400 bg-red-950/30"
                : "border-gray-700 text-gray-500"
            }`}
          >
            {isCritical && (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-2.5 h-2.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
            {event.significance}
          </span>
        )}

        {/* Date — pushed to the right */}
        <span className="ml-auto text-xs text-gray-500 shrink-0">
          {new Date(event.eventDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-semibold text-gray-100 ${
          compact ? "text-sm mb-0.5" : "text-sm sm:text-base mb-0.5 sm:mb-1"
        }`}
      >
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p
          className={`text-gray-400 leading-relaxed ${
            compact ? "text-xs line-clamp-2" : "text-xs sm:text-sm line-clamp-3 sm:line-clamp-none"
          }`}
        >
          {event.description}
        </p>
      )}
    </motion.div>
  );
}
