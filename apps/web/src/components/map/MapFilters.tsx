"use client";

import { useState } from "react";
import type { MapFiltersState } from "@/types";

const INTENSITIES = ["high", "medium", "low", "tension", "historical"] as const;

const REGIONS = [
  "All",
  "Caribbean",
  "Central Africa",
  "East Africa",
  "East Asia",
  "Eastern Europe",
  "Middle East",
  "South Asia",
  "South Caucasus",
  "Southeast Asia",
  "Southeastern Europe",
  "Southern Africa",
  "West Africa",
] as const;

const INTENSITY_COLORS: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-orange-500",
  low: "bg-yellow-500",
  tension: "bg-yellow-600",
  historical: "bg-gray-500",
};

interface MapFiltersProps {
  onChange: (filters: MapFiltersState) => void;
}

export default function MapFilters({ onChange }: MapFiltersProps) {
  const [open, setOpen] = useState(true);
  const [intensity, setIntensity] = useState<string[]>([]);
  const [region, setRegion] = useState("All");

  function toggleIntensity(value: string) {
    const next = intensity.includes(value)
      ? intensity.filter((v) => v !== value)
      : [...intensity, value];
    setIntensity(next);
    onChange({ intensity: next, region });
  }

  function changeRegion(value: string) {
    setRegion(value);
    onChange({ intensity, region: value });
  }

  return (
    <div className="absolute top-4 left-4 z-40 sm:block md:block max-sm:left-0 max-sm:top-auto max-sm:bottom-0 max-sm:w-full">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-gray-900/90 border border-gray-700 px-3 py-2 text-xs font-medium text-gray-200 shadow-lg backdrop-blur-sm hover:bg-gray-800/90 transition-colors max-sm:ml-4 max-sm:mb-2"
      >
        {open ? "✕ Hide Filters" : "☰ Filters"}
      </button>

      {open && (
        <div className="mt-2 w-56 rounded-lg border border-gray-700 bg-gray-900/95 p-3 shadow-xl backdrop-blur-sm max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-xl max-sm:mt-0 max-sm:max-h-[40vh] max-sm:overflow-y-auto">
          {/* Intensity */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Intensity
          </p>
          <div className="flex flex-col gap-1.5">
            {INTENSITIES.map((val) => (
              <label
                key={val}
                className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-gray-100"
              >
                <input
                  type="checkbox"
                  checked={intensity.length === 0 || intensity.includes(val)}
                  onChange={() => toggleIntensity(val)}
                  className="h-3.5 w-3.5 rounded border-gray-600 bg-gray-800 accent-indigo-500"
                />
                <span
                  className={`h-2 w-2 rounded-full ${INTENSITY_COLORS[val]}`}
                />
                <span className="capitalize">{val}</span>
              </label>
            ))}
          </div>

          {/* Region */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-4 mb-2">
            Region
          </p>
          <select
            value={region}
            onChange={(e) => changeRegion(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs text-gray-200 outline-none focus:border-indigo-500"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
