"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import type { Conflict } from "@/types";

interface OverviewTabProps {
  conflict: Conflict;
}

export default function OverviewTab({ conflict }: OverviewTabProps) {
  const [bgExpanded, setBgExpanded] = useState(false);

  if (!conflict.overviewText && !conflict.backgroundText) {
    return <p className="text-gray-500 italic">No overview available for this conflict.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Overview */}
      {conflict.overviewText && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Overview</h2>
          <div className="prose prose-invert prose-sm max-w-none prose-p:text-gray-400 prose-headings:text-gray-200 prose-strong:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-li:text-gray-400 prose-ul:text-gray-400 prose-ol:text-gray-400">
            <Markdown>{conflict.overviewText}</Markdown>
          </div>
        </section>
      )}

      {/* Background — collapsible */}
      {conflict.backgroundText && (
        <section>
          <button
            onClick={() => setBgExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-xl font-semibold text-gray-200 hover:text-white transition-colors group w-full text-left"
          >
            <svg
              className={`w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-transform duration-200 ${
                bgExpanded ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Background
          </button>

          {bgExpanded && (
            <div className="mt-4 prose prose-invert prose-sm max-w-none prose-p:text-gray-400 prose-headings:text-gray-200 prose-strong:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-li:text-gray-400 prose-ul:text-gray-400 prose-ol:text-gray-400">
              <Markdown>{conflict.backgroundText}</Markdown>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
