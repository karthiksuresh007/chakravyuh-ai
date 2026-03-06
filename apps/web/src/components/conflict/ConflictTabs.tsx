"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Conflict,
  Actor,
  TimelineEvent,
  ConflictImpact,
} from "@/types";
import OverviewTab from "@/components/conflict/OverviewTab";
import KeyPlayersTab from "@/components/conflict/KeyPlayersTab";
import type { TimelineCategory } from "@/components/timeline/TimelineFilters";

// Lazy-load heavy components (Recharts, AI streaming, Timeline)
const ImpactTab = dynamic(() => import("@/components/conflict/ImpactTab"), {
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
    </div>
  ),
});
const AIExplainerPanel = dynamic(
  () => import("@/components/conflict/AIExplainerPanel"),
  {
    loading: () => (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
      </div>
    ),
  }
);
const TimelineSlider = dynamic(
  () => import("@/components/timeline/TimelineSlider"),
  {
    loading: () => (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
      </div>
    ),
  }
);
const TimelineFilters = dynamic(
  () => import("@/components/timeline/TimelineFilters"),
);

const TABS = ["overview", "timeline", "players", "impact", "ai"] as const;
type TabId = (typeof TABS)[number];

const TAB_LABELS: Record<TabId, string> = {
  overview: "Overview",
  timeline: "Timeline",
  players: "Key Players",
  impact: "Impact",
  ai: "AI Explainer",
};

interface ConflictTabsProps {
  conflict: Conflict;
  actors: Actor[];
  timeline: TimelineEvent[];
  impact: ConflictImpact;
}

export default function ConflictTabs({
  conflict,
  actors,
  timeline,
  impact,
}: ConflictTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [timelineCategory, setTimelineCategory] = useState<TimelineCategory>("all");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Sort timeline events chronologically
  const sortedTimeline = useMemo(
    () =>
      [...timeline].sort(
        (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      ),
    [timeline]
  );

  // Unique categories present in data
  const availableCategories = useMemo(
    () => Array.from(new Set(sortedTimeline.map((e) => e.category.toLowerCase()))),
    [sortedTimeline]
  );

  // Filter by active category
  const filteredTimeline = useMemo(
    () =>
      timelineCategory === "all"
        ? sortedTimeline
        : sortedTimeline.filter((e) => e.category.toLowerCase() === timelineCategory),
    [sortedTimeline, timelineCategory]
  );

  // Reset index when filter changes
  const handleCategoryChange = (cat: TimelineCategory) => {
    setTimelineCategory(cat);
    setActiveTimelineIndex(0);
  };

  // Sync from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1) as TabId;
    if (TABS.includes(hash)) setActiveTab(hash);
  }, []);

  // Update hash on tab change
  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  }

  // Keyboard navigation for tabs (arrow keys + Home/End)
  function handleTabKeyDown(e: React.KeyboardEvent, currentIndex: number) {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = TABS.length - 1;
    } else {
      return;
    }
    const nextTab = TABS[nextIndex];
    handleTabChange(nextTab);
    tabRefs.current[nextTab]?.focus();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16 max-w-5xl mx-auto">
      {/* Tab bar */}
      <div className="sticky top-[49px] z-20 bg-gray-950/80 backdrop-blur border-b border-gray-800 mb-8">
        <nav
          className="flex gap-0 overflow-x-auto scrollbar-hide -mb-px"
          role="tablist"
          aria-label="Conflict detail tabs"
        >
          {TABS.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => { tabRefs.current[tab] = el; }}
              role="tab"
              id={`tab-${tab}`}
              aria-selected={activeTab === tab}
              aria-controls={`tabpanel-${tab}`}
              tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => handleTabChange(tab)}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {TAB_LABELS[tab]}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <OverviewTab conflict={conflict} />
          )}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <TimelineFilters
                availableCategories={availableCategories}
                activeCategory={timelineCategory}
                onSelect={handleCategoryChange}
                eventCount={filteredTimeline.length}
              />
              <TimelineSlider
                events={filteredTimeline}
                activeIndex={activeTimelineIndex}
                onSelect={setActiveTimelineIndex}
              />
            </div>
          )}
          {activeTab === "players" && (
            <KeyPlayersTab actors={actors} />
          )}
          {activeTab === "impact" && (
            <ImpactTab impact={impact} />
          )}
          {activeTab === "ai" && (
            <AIExplainerPanel
              slug={conflict.slug}
              conflictName={conflict.displayName}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
