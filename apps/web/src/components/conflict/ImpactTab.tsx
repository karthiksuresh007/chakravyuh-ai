"use client";

import type { ConflictImpact } from "@/types";
import HumanitarianImpactPanel from "@/components/impact/HumanitarianImpactPanel";
import EconomicImpactPanel from "@/components/impact/EconomicImpactPanel";
import ImpactSkeleton from "@/components/impact/ImpactSkeleton";

interface ImpactTabProps {
  impact: ConflictImpact;
  isLoading?: boolean;
}

export default function ImpactTab({ impact, isLoading }: ImpactTabProps) {
  if (isLoading) return <ImpactSkeleton />;
  const hasHumanitarian = impact.humanitarian != null;
  const hasEconomic = impact.economic.length > 0;
  const hasData = hasHumanitarian || hasEconomic;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="w-12 h-12 text-gray-700 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
        <p className="text-gray-500 text-sm">No impact data available yet.</p>
        <p className="text-gray-600 text-xs mt-1">
          Data will appear here once humanitarian and economic metrics are collected.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── Left column: Human Impact ──────────────────────── */}
      {hasHumanitarian && (
        <section className={!hasEconomic ? "lg:col-span-2" : ""}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Human Impact
            </h3>
          </div>
          <HumanitarianImpactPanel data={impact.humanitarian!} />
        </section>
      )}

      {/* ── Right column: Economic Impact ──────────────────── */}
      {hasEconomic && (
        <section className={!hasHumanitarian ? "lg:col-span-2" : ""}>
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
              />
            </svg>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Economic Impact
            </h3>
          </div>
          <EconomicImpactPanel metrics={impact.economic} />
        </section>
      )}
    </div>
  );
}
