"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ConflictImpact } from "@/types";

interface ImpactTabProps {
  impact: ConflictImpact;
}

const PIE_COLORS = ["#ef4444", "#f97316", "#3b82f6"];

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function ImpactTab({ impact }: ImpactTabProps) {
  const hasData = impact.humanitarian || impact.economic.length > 0;

  if (!hasData) {
    return <p className="text-gray-500 italic">No impact data available.</p>;
  }

  return (
    <div className="space-y-10">
      {impact.humanitarian && <HumanitarianSection data={impact.humanitarian} />}
      {impact.economic.length > 0 && <EconomicSection metrics={impact.economic} />}
    </div>
  );
}

/* ─── Humanitarian Section ──────────────────────────────────── */

function HumanitarianSection({
  data,
}: {
  data: NonNullable<ConflictImpact["humanitarian"]>;
}) {
  const statCards = [
    { label: "Total Deaths", value: data.totalDeaths },
    { label: "Civilian Deaths", value: data.civilianDeaths },
    { label: "Combatant Deaths", value: data.combatantDeaths },
    { label: "Internally Displaced", value: data.idpCount },
    { label: "Refugees", value: data.refugeeCount },
  ];

  // Pie chart data — only include non-null entries
  const pieData = [
    data.civilianDeaths != null && { name: "Civilian", value: data.civilianDeaths },
    data.combatantDeaths != null && { name: "Combatant", value: data.combatantDeaths },
    data.totalDeaths != null &&
      data.civilianDeaths != null &&
      data.combatantDeaths != null &&
      data.totalDeaths - data.civilianDeaths - data.combatantDeaths > 0 && {
        name: "Unclassified",
        value: data.totalDeaths - data.civilianDeaths - data.combatantDeaths,
      },
  ].filter(Boolean) as { name: string; value: number }[];

  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Humanitarian Impact
      </h3>

      {/* Stat counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-800 bg-gray-900 p-4"
          >
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-lg font-semibold text-gray-100">
              {stat.value != null ? stat.value.toLocaleString() : "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Pie chart: death breakdown */}
      {pieData.length > 1 && (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h4 className="text-sm font-medium text-gray-300 mb-4">
            Casualty Breakdown
          </h4>
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
                  formatter={(value: number | undefined) => value != null ? value.toLocaleString() : ""}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-gray-400">{entry.name}</span>
                  <span className="text-gray-200 font-medium ml-auto">
                    {formatCompact(entry.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-600 mt-3">
        Source: {data.source} · As of{" "}
        {new Date(data.asOfDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}
      </p>
    </section>
  );
}

/* ─── Economic Section ──────────────────────────────────────── */

function EconomicSection({
  metrics,
}: {
  metrics: ConflictImpact["economic"];
}) {
  const barData = metrics.map((m) => ({
    name: m.metricName.length > 25 ? m.metricName.slice(0, 22) + "..." : m.metricName,
    fullName: m.metricName,
    value: parseFloat(m.metricValue),
    unit: m.metricUnit,
  }));

  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Economic Impact
      </h3>

      {/* Bar chart */}
      {barData.length > 1 && (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 mb-6">
          <ResponsiveContainer width="100%" height={Math.max(200, barData.length * 50)}>
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis
                type="number"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
                tickFormatter={(v: number) => formatCompact(v)}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#d1d5db" }}
                labelStyle={{ color: "#9ca3af" }}
                formatter={(value: number | undefined, _name: unknown, props: { payload?: { unit?: string } }) => [
                  `${(value ?? 0).toLocaleString()} ${props.payload?.unit ?? ""}`,
                  "",
                ]}
                labelFormatter={(_label: unknown, payload: readonly { payload?: { fullName?: string } }[]) =>
                  payload?.[0]?.payload?.fullName ?? String(_label)
                }
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Metric cards */}
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-lg border border-gray-800 bg-gray-900 p-4"
          >
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="text-sm font-medium text-gray-200">
                {metric.metricName}
              </h4>
              <span className="text-sm font-semibold text-gray-100">
                {parseFloat(metric.metricValue).toLocaleString()}{" "}
                <span className="text-xs text-gray-500 font-normal">
                  {metric.metricUnit}
                </span>
              </span>
            </div>
            {metric.notes && (
              <p className="text-xs text-gray-500">{metric.notes}</p>
            )}
            <p className="text-xs text-gray-600 mt-1">Source: {metric.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
