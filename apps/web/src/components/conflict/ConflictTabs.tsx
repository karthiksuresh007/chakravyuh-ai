"use client";

import { useState, useEffect, useRef } from "react";
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

const TABS = ["overview", "timeline", "players", "impact"] as const;
type TabId = (typeof TABS)[number];

const TAB_LABELS: Record<TabId, string> = {
  overview: "Overview",
  timeline: "Timeline",
  players: "Key Players",
  impact: "Impact",
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
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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
            <TimelinePanel timeline={timeline} />
          )}
          {activeTab === "players" && (
            <KeyPlayersTab actors={actors} />
          )}
          {activeTab === "impact" && (
            <ImpactTab impact={impact} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Timeline Panel ────────────────────────────────────────── */

function TimelinePanel({ timeline }: { timeline: TimelineEvent[] }) {
  if (timeline.length === 0) {
    return <p className="text-gray-500 italic">No timeline events available.</p>;
  }

  return (
    <div className="border-l-2 border-gray-700 pl-6 space-y-6">
      {timeline.map((event) => (
        <div key={event.id} className="relative">
          <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gray-600 border-2 border-gray-950" />
          <p className="text-xs text-gray-500 mb-1">
            {new Date(event.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            <span className="ml-2 text-gray-600">· {event.category}</span>
          </p>
          <h3 className="text-sm font-medium text-gray-200">{event.title}</h3>
          {event.description && (
            <p className="text-sm text-gray-500 mt-1">{event.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
