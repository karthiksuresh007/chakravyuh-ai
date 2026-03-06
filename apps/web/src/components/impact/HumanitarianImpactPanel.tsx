"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HumanitarianImpact } from "@/types";
import ImpactMetricCard from "@/components/impact/ImpactMetricCard";
import ChartCard from "@/components/impact/ChartCard";

/* ─── Constants ─────────────────────────────────────────────── */

const PIE_COLORS = ["#ef4444", "#f97316", "#3b82f6"];

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

/* ─── Props ─────────────────────────────────────────────────── */

interface HumanitarianImpactPanelProps {
  data: HumanitarianImpact;
}

/* ─── Component ─────────────────────────────────────────────── */

export default function HumanitarianImpactPanel({
  data,
}: HumanitarianImpactPanelProps) {
  // Build pie chart data — only include non-null entries
  const pieData = [
    data.civilianDeaths != null && {
      name: "Civilian",
      value: data.civilianDeaths,
    },
    data.combatantDeaths != null && {
      name: "Combatant",
      value: data.combatantDeaths,
    },
    data.totalDeaths != null &&
      data.civilianDeaths != null &&
      data.combatantDeaths != null &&
      data.totalDeaths - data.civilianDeaths - data.combatantDeaths > 0 && {
        name: "Unclassified",
        value: data.totalDeaths - data.civilianDeaths - data.combatantDeaths,
      },
  ].filter(Boolean) as { name: string; value: number }[];

  const totalPie = pieData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-4">
      {/* ── Death counters ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ImpactMetricCard
          label="Total Deaths"
          value={data.totalDeaths}
          compact={false}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ImpactMetricCard
          label="Civilian Deaths"
          value={data.civilianDeaths}
          compact={false}
        />
        <ImpactMetricCard
          label="Combatant Deaths"
          value={data.combatantDeaths}
          compact={false}
        />
      </div>

      {/* ── Pie chart: casualty breakdown ─────────────────── */}
      {pieData.length > 1 && (
        <ChartCard
          title="Casualty Breakdown"
          description="Civilian vs. combatant distribution"
          source={data.source}
          asOfDate={data.asOfDate}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={220} className="max-w-[260px]">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#d1d5db" }}
                  formatter={(value: number | undefined) =>
                    value != null ? value.toLocaleString() : ""
                  }
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend with percentages */}
            <div className="flex flex-col gap-2.5">
              {pieData.map((entry, i) => {
                const pct = totalPie > 0 ? ((entry.value / totalPie) * 100).toFixed(1) : "0";
                return (
                  <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-gray-400">{entry.name}</span>
                    <span className="text-gray-200 font-medium ml-auto tabular-nums">
                      {formatCompact(entry.value)}
                    </span>
                    <span className="text-gray-600 text-xs tabular-nums w-12 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ChartCard>
      )}

      {/* ── Displacement stats (large cards) ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ImpactMetricCard
          label="Internally Displaced Persons"
          value={data.idpCount}
          size="large"
          source={data.source}
          asOfDate={data.asOfDate}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <ImpactMetricCard
          label="Refugees (Cross-border)"
          value={data.refugeeCount}
          size="large"
          source={data.source}
          asOfDate={data.asOfDate}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m-5.276.838a4.5 4.5 0 01-7.142-1.36" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
