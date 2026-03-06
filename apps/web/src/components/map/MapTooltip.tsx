import type { ConflictMarkerProperties } from "@/types";

export interface TooltipState {
  x: number;
  y: number;
  properties: ConflictMarkerProperties;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-red-600",
  tension: "bg-yellow-600",
  historical: "bg-gray-500",
  frozen: "bg-blue-600",
  peacekeeping: "bg-emerald-600",
};

const INTENSITY_COLORS: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-orange-500",
  low: "bg-yellow-500",
  tension: "bg-yellow-500",
  historical: "bg-gray-400",
};

function formatCasualties(n: number | null): string {
  if (n == null) return "Unknown";
  if (n >= 1_000_000) return `~${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `~${Math.round(n / 1_000)}K`;
  return `~${n}`;
}

export default function MapTooltip({ x, y, properties }: TooltipState) {
  const { display_name, status, intensity, casualty_estimate, risk_score } =
    properties;

  return (
    <div
      className="pointer-events-none absolute z-50 w-56 rounded-lg border border-gray-700 bg-gray-900/95 px-3 py-2.5 shadow-xl backdrop-blur-sm"
      style={{ left: x + 12, top: y - 12 }}
    >
      <p className="text-sm font-semibold text-gray-100 leading-tight">
        {display_name}
      </p>

      <div className="mt-1.5 flex items-center gap-1.5">
        <span
          className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white ${STATUS_COLORS[status] ?? "bg-gray-500"}`}
        >
          {status}
        </span>
        <span
          className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white ${INTENSITY_COLORS[intensity] ?? "bg-gray-400"}`}
        >
          {intensity}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-400">
        <span>Casualties</span>
        <span className="text-gray-200 text-right">
          {formatCasualties(casualty_estimate)}
        </span>
        <span>Risk Score</span>
        <span className="text-gray-200 text-right">
          {risk_score != null ? `${risk_score}/10` : "N/A"}
        </span>
      </div>
    </div>
  );
}
