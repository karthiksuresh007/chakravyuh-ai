"use client";

import { useCallback } from "react";
import type { Conflict, HumanitarianImpact } from "@/types";

interface ConflictHeroProps {
  conflict: Conflict;
  humanitarian: HumanitarianImpact | null;
}

const intensityColor: Record<string, string> = {
  high: "bg-red-600",
  medium: "bg-orange-500",
  low: "bg-yellow-500",
  tension: "bg-blue-500",
  historical: "bg-gray-500",
};

function formatNumber(n: number | null | undefined): string {
  if (n == null) return "N/A";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function ConflictHero({ conflict, humanitarian }: ConflictHeroProps) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `${conflict.displayName} — Chakravyuh AI`;

    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }, [conflict.displayName]);

  const riskScore = parseFloat(conflict.riskScore);
  const riskColor =
    riskScore >= 8 ? "text-red-400" : riskScore >= 5 ? "text-orange-400" : "text-yellow-400";

  return (
    <header className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`${intensityColor[conflict.intensity] ?? "bg-gray-600"} text-white text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide`}
        >
          {conflict.intensity}
        </span>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-600 text-gray-300 uppercase tracking-wide">
          {conflict.status}
        </span>
        <span className="text-xs text-gray-500">
          {conflict.region} · {conflict.subRegion}
        </span>
      </div>

      {/* Title + Share */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {conflict.displayName}
        </h1>
        <button
          onClick={handleShare}
          aria-label="Share this conflict"
          className="shrink-0 mt-1 p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
        {/* Dates */}
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Started</p>
          <p className="text-sm font-medium text-gray-200">
            {new Date(conflict.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {conflict.endDate ? (
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Ended</p>
            <p className="text-sm font-medium text-gray-200">
              {new Date(conflict.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Duration</p>
            <p className="text-sm font-medium text-gray-200">
              {getDuration(conflict.startDate)}
            </p>
          </div>
        )}

        {/* Risk Score */}
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Risk Score</p>
          <p className={`text-sm font-semibold ${riskColor}`}>
            {riskScore.toFixed(1)}
            <span className="text-gray-500 font-normal"> / 10</span>
          </p>
        </div>

        {/* Casualties or Refugees */}
        {humanitarian ? (
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Est. Deaths</p>
            <p className="text-sm font-semibold text-gray-200">
              {formatNumber(humanitarian.totalDeaths)}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Status</p>
            <p className="text-sm font-medium text-gray-200 capitalize">
              {conflict.status}
            </p>
          </div>
        )}
      </div>

      {/* Extended humanitarian stats strip */}
      {humanitarian && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Civilian Deaths</p>
            <p className="text-sm font-semibold text-gray-200">
              {formatNumber(humanitarian.civilianDeaths)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Combatant Deaths</p>
            <p className="text-sm font-semibold text-gray-200">
              {formatNumber(humanitarian.combatantDeaths)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Internally Displaced</p>
            <p className="text-sm font-semibold text-gray-200">
              {formatNumber(humanitarian.idpCount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Refugees</p>
            <p className="text-sm font-semibold text-gray-200">
              {formatNumber(humanitarian.refugeeCount)}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

function getDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (months < 1) return "< 1 month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years}y ${rem}m`;
}
