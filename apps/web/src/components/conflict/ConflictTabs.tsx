"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Conflict,
  Actor,
  TimelineEvent,
  ConflictImpact,
} from "@/types";
import OverviewTab from "@/components/conflict/OverviewTab";
import KeyPlayersTab from "@/components/conflict/KeyPlayersTab";
import ImpactTab from "@/components/conflict/ImpactTab";
import AIExplainerPanel from "@/components/conflict/AIExplainerPanel";
import TimelineSlider from "@/components/timeline/TimelineSlider";
import TimelineFilters, { type TimelineCategory } from "@/components/timeline/TimelineFilters";

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

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16 max-w-5xl mx-auto">
      {/* Tab bar */}
      <div className="sticky top-[49px] z-20 bg-gray-950/80 backdrop-blur border-b border-gray-800 mb-8">
        <nav
          className="flex gap-0 overflow-x-auto scrollbar-hide -mb-px"
          role="tablist"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              ref={(el) => { tabRefs.current[tab] = el; }}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => handleTabChange(tab)}
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
