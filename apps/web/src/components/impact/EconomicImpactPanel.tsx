"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { EconomicImpact } from "@/types";
import ChartCard from "@/components/impact/ChartCard";

/* ─── Helpers ───────────────────────────────────────────────── */

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

/** Truncate long metric names for chart axis */
function truncate(s: string, max = 22): string {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

/* ─── Props ─────────────────────────────────────────────────── */

interface EconomicImpactPanelProps {
  metrics: EconomicImpact[];
}

/* ─── Component ─────────────────────────────────────────────── */

export default function EconomicImpactPanel({
  metrics,
}: EconomicImpactPanelProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const barData = metrics.map((m) => ({
    name: truncate(m.metricName, isMobile ? 14 : 22),
    fullName: m.metricName,
    value: parseFloat(m.metricValue),
    unit: m.metricUnit,
  }));

  return (
    <div className="space-y-4">
      {/* ── Bar chart ──────────────────────────────────────── */}
      {barData.length > 1 && (
        <ChartCard
          title="Economic Metrics Overview"
          description="Comparative view of economic impact indicators"
        >
          <ResponsiveContainer
            width="100%"
            height={Math.max(200, barData.length * 50)}
          >
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ left: 10, right: 30 }}
            >
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
                width={isMobile ? 90 : 150}
                tick={{ fill: "#9ca3af", fontSize: isMobile ? 10 : 11 }}
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
                formatter={(
                  value: number | undefined,
                  _name: unknown,
                  props: { payload?: { unit?: string } }
                ) => [
                  `${(value ?? 0).toLocaleString()} ${props.payload?.unit ?? ""}`,
                  "",
                ]}
                labelFormatter={(
                  _label: unknown,
                  payload: readonly { payload?: { fullName?: string } }[]
                ) => payload?.[0]?.payload?.fullName ?? String(_label)}
              />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* ── Metric cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((metric) => {
          const numValue = parseFloat(metric.metricValue);
          const isNegative = numValue < 0;

          return (
            <div
              key={metric.id}
              className="rounded-lg border border-gray-800 bg-gray-900 p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-medium text-gray-200">
                  {metric.metricName}
                </h4>
                {/* Trend indicator */}
                <span className={isNegative ? "text-red-400" : "text-emerald-400"}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    {isNegative ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    )}
                  </svg>
                </span>
              </div>

              <p className="text-lg font-semibold text-gray-100">
                {numValue.toLocaleString()}{" "}
                <span className="text-xs text-gray-500 font-normal">
                  {metric.metricUnit}
                </span>
              </p>

              {metric.notes && (
                <p className="text-xs text-gray-500 mt-1">{metric.notes}</p>
              )}

              <p className="text-[10px] text-gray-600 mt-2">
                Source: {metric.source} · As of{" "}
                {new Date(metric.asOfDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Disclaimer ─────────────────────────────────────── */}
      <p className="text-[10px] text-gray-600 italic leading-relaxed">
        Economic figures are estimates from World Bank, IMF, and UN sources.
        Subject to revision.
      </p>
    </div>
  );
}
