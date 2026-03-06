"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TimelineEvent } from "@/types";
import TimelineEventCard, { categoryColor } from "@/components/timeline/TimelineEventCard";

/* ─── Significance sizing ───────────────────────────────────── */

function dotSize(significance: string): number {
  switch (significance.toLowerCase()) {
    case "critical":
      return 18;
    case "major":
      return 14;
    default:
      return 10;
  }
}

/* ─── Props ─────────────────────────────────────────────────── */

interface TimelineSliderProps {
  events: TimelineEvent[];
  activeIndex: number;
  onSelect: (index: number | ((prev: number) => number)) => void;
}

/* ─── Component ─────────────────────────────────────────────── */

export default function TimelineSlider({
  events,
  activeIndex,
  onSelect,
}: TimelineSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ── Auto-scroll (play/pause) ──────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      onSelect((prev: number) => {
        const next = prev + 1;
        if (next >= events.length) {
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying, events.length, onSelect]);

  // Stop playback when events change (e.g. filter switch)
  useEffect(() => {
    setIsPlaying(false);
  }, [events]);

  // Scroll active dot into view
  useEffect(() => {
    const dot = dotRefs.current[activeIndex];
    if (dot && trackRef.current) {
      dot.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  // Date range for proportional positioning
  const timestamps = events.map((e) => new Date(e.eventDate).getTime());
  const minTs = Math.min(...timestamps);
  const maxTs = Math.max(...timestamps);
  const range = maxTs - minTs || 1;

  const getPosition = useCallback(
    (eventDate: string) => {
      const ts = new Date(eventDate).getTime();
      return ((ts - minTs) / range) * 100;
    },
    [minTs, range]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (activeIndex < events.length - 1) onSelect(activeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIndex > 0) onSelect(activeIndex - 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    },
    [activeIndex, events.length, onSelect]
  );

  // ── Drag on track to select nearest event ─────────────────
  const selectNearest = useCallback(
    (clientX: number) => {
      const el = trackLineRef.current;
      if (!el || events.length === 0) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const targetTs = minTs + pct * range;
      // Find closest event
      let closest = 0;
      let closestDist = Infinity;
      for (let i = 0; i < timestamps.length; i++) {
        const dist = Math.abs(timestamps[i] - targetTs);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }
      onSelect(closest);
    },
    [events.length, minTs, range, timestamps, onSelect]
  );

  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // On touch devices, let native scroll handle the track; taps select via dot onClick
      if (e.pointerType === "touch") return;
      setIsPlaying(false);
      selectNearest(e.clientX);
      const el = e.currentTarget as HTMLDivElement;
      el.setPointerCapture(e.pointerId);

      const onMove = (me: Event) => selectNearest((me as globalThis.PointerEvent).clientX);
      const onUp = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    },
    [selectNearest]
  );

  if (events.length === 0) {
    return <p className="text-gray-500 italic">No timeline events available.</p>;
  }

  const activeEvent = events[activeIndex];

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* ─── Slider track ─────────────────────────────────── */}
      <div
        ref={trackRef}
        className="relative overflow-x-auto scrollbar-hide pb-2"
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label="Timeline slider"
        aria-valuemin={0}
        aria-valuemax={events.length - 1}
        aria-valuenow={activeIndex}
        tabIndex={0}
      >
        {/* Date labels (start / end) */}
        <div className="flex justify-between text-[10px] text-gray-600 mb-1 px-1 min-w-[350px] sm:min-w-[600px]">
          <span>
            {new Date(events[0].eventDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <span>
            {new Date(events[events.length - 1].eventDate).toLocaleDateString(
              "en-US",
              { month: "short", year: "numeric" }
            )}
          </span>
        </div>

        {/* Track line + dots */}
        <div
          ref={trackLineRef}
          className="relative h-12 min-w-[350px] sm:min-w-[600px] cursor-pointer touch-pan-x md:touch-none"
          onPointerDown={handleTrackPointerDown}
        >
          {/* Base line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-700 -translate-y-1/2" />

          {/* Event dots */}
          {events.map((event, i) => {
            const left = getPosition(event.eventDate);
            const size = dotSize(event.significance);
            const isActive = i === activeIndex;
            const isHovered = i === hoveredIndex;
            const isCritical = event.significance.toLowerCase() === "critical";
            const color = categoryColor(event.category);

            return (
              <button
                key={event.id}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                onClick={() => onSelect(i)}
                onPointerEnter={() => setHoveredIndex(i)}
                onPointerLeave={() => setHoveredIndex(null)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 group"
                style={{
                  left: `${left}%`,
                  width: isActive ? size + 6 : size,
                  height: isActive ? size + 6 : size,
                  backgroundColor: color,
                  boxShadow: isActive
                    ? `0 0 12px ${color}80`
                    : "none",
                  zIndex: isHovered ? 30 : isActive ? 20 : 10,
                }}
                aria-label={`${event.title} — ${new Date(event.eventDate).toLocaleDateString()}`}
              >
                {/* Pulse ring for critical events */}
                {isCritical && !isActive && (
                  <span
                    className="absolute inset-0 rounded-full animate-[timeline-pulse_2s_ease-in-out_infinite]"
                    style={{ backgroundColor: color, opacity: 0.4 }}
                  />
                )}
                {isCritical && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative text-white"
                    style={{ width: size * 0.55, height: size * 0.55 }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )}

                {/* Hover tooltip */}
                {isHovered && !isActive && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-md px-2.5 py-1.5 text-[11px] text-gray-200 shadow-xl">
                      <p className="font-medium truncate max-w-[200px]">{event.title}</p>
                      <p className="text-gray-500">
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-700" />
                  </div>
                )}
              </button>
            );
          })}

          {/* Active indicator line */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-white/40"
            style={{ left: `${getPosition(activeEvent.eventDate)}%` }}
            layoutId="timeline-cursor"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>
      </div>

      {/* ─── Significance legend ──────────────────────────── */}
      <div className="flex items-center gap-4 text-[10px] text-gray-600 px-1">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-500" />
          Standard
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-500" />
          Major
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-[14px] h-[14px] rounded-full bg-gray-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 text-white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
          Critical
        </span>
      </div>

      {/* ─── Active event card (swipe to navigate on mobile) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x > 60 && activeIndex > 0) {
              setIsPlaying(false);
              onSelect(activeIndex - 1);
            } else if (info.offset.x < -60 && activeIndex < events.length - 1) {
              setIsPlaying(false);
              onSelect(activeIndex + 1);
            }
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          <TimelineEventCard event={activeEvent} />
        </motion.div>
      </AnimatePresence>

      {/* ─── Nav controls ─────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <button
          onClick={() => { setIsPlaying(false); if (activeIndex > 0) onSelect(activeIndex - 1); }}
          disabled={activeIndex === 0}
          className="flex items-center gap-1 px-2 py-1 rounded hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition-colors"
            aria-label={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <span className="text-gray-600">
            {activeIndex + 1} / {events.length}
          </span>
        </div>

        <button
          onClick={() => { setIsPlaying(false); if (activeIndex < events.length - 1) onSelect(activeIndex + 1); }}
          disabled={activeIndex === events.length - 1}
          className="flex items-center gap-1 px-2 py-1 rounded hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
