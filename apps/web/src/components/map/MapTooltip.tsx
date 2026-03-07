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
      className="pointer-events-none absolute z-50 w-64 glass-panel bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl px-4 py-3"
      style={{ left: x + 12, top: y - 12 }}
    >
      <p className="text-base font-semibold text-gray-100 leading-tight mb-1">
        {display_name}
      </p>

      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-block rounded-lg px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white ${STATUS_COLORS[status] ?? "bg-gray-500"}`}
        >
          {status}
        </span>
        <span
          className={`inline-block rounded-lg px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white ${INTENSITY_COLORS[intensity] ?? "bg-gray-400"}`}
        >
          {intensity}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-400">
        <span>Casualties</span>
        <span className="font-data text-gray-200 text-right font-mono">
          {formatCasualties(casualty_estimate)}
        </span>
        <span>Risk Score</span>
        <span className="font-data text-gray-200 text-right font-mono">
          {risk_score != null ? `${risk_score}/10` : "N/A"}
        </span>
      </div>
    </div>
  );
}
