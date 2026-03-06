"use client";

import CountUp from "react-countup";

interface ImpactMetricCardProps {
  label: string;
  value: number | null;
  /** If true, show compact format (e.g. 1.2M) */
  compact?: boolean;
  icon?: React.ReactNode;
  source?: string;
  asOfDate?: string;
  /** Card size variant */
  size?: "default" | "large";
}

function formatTarget(n: number): { end: number; suffix: string } {
  if (n >= 1_000_000_000) return { end: parseFloat((n / 1_000_000_000).toFixed(1)), suffix: "B" };
  if (n >= 1_000_000) return { end: parseFloat((n / 1_000_000).toFixed(1)), suffix: "M" };
  if (n >= 1_000) return { end: parseFloat((n / 1_000).toFixed(1)), suffix: "K" };
  return { end: n, suffix: "" };
}

export default function ImpactMetricCard({
  label,
  value,
  compact = true,
  icon,
  source,
  asOfDate,
  size = "default",
}: ImpactMetricCardProps) {
  const isLarge = size === "large";

  return (
    <div
      className={`rounded-lg border border-gray-800 bg-gray-900 ${
        isLarge ? "p-5" : "p-4"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-gray-500">{icon}</span>}
        <p className={`text-gray-500 ${isLarge ? "text-sm" : "text-xs"}`}>
          {label}
        </p>
      </div>

      <p
        className={`font-semibold text-gray-100 ${
          isLarge ? "text-2xl sm:text-3xl" : "text-lg"
        }`}
      >
        {value != null ? (
          compact ? (
            (() => {
              const { end, suffix } = formatTarget(value);
              return (
                <>
                  <CountUp end={end} duration={1.2} decimals={suffix ? 1 : 0} preserveValue />
                  {suffix}
                </>
              );
            })()
          ) : (
            <CountUp end={value} duration={1.2} separator="," preserveValue />
          )
        ) : (
          <span className="text-gray-600">N/A</span>
        )}
      </p>

      {(source || asOfDate) && (
        <p className="text-[10px] text-gray-600 mt-2">
          {source && <>Source: {source}</>}
          {source && asOfDate && " · "}
          {asOfDate && (
            <>
              As of{" "}
              {new Date(asOfDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </>
          )}
        </p>
      )}
    </div>
  );
}
