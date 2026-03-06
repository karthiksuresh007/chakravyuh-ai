"use client";

/**
 * Skeleton loader that mirrors the ImpactTab layout:
 * two-column grid with humanitarian + economic placeholders.
 */
export default function ImpactSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── Left column: Human Impact skeleton ────────────── */}
      <section>
        {/* Section header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
          <div className="h-3 w-28 bg-gray-800 rounded" />
        </div>

        {/* Death counter cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-800 bg-gray-900 p-4 space-y-2"
            >
              <div className="h-3 w-20 bg-gray-800 rounded" />
              <div className="h-6 w-24 bg-gray-800 rounded" />
            </div>
          ))}
        </div>

        {/* Pie chart placeholder */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 mb-4">
          <div className="h-3 w-32 bg-gray-800 rounded mb-2" />
          <div className="h-2 w-48 bg-gray-800/60 rounded mb-4" />
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Circle placeholder */}
            <div className="w-[180px] h-[180px] rounded-full border-[18px] border-gray-800 mx-auto" />
            {/* Legend */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-800" />
                  <div className="h-3 w-16 bg-gray-800 rounded" />
                  <div className="h-3 w-10 bg-gray-800 rounded ml-4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Displacement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-800 bg-gray-900 p-5 space-y-2"
            >
              <div className="h-3 w-36 bg-gray-800 rounded" />
              <div className="h-8 w-28 bg-gray-800 rounded" />
              <div className="h-2 w-32 bg-gray-800/60 rounded mt-3" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Right column: Economic Impact skeleton ─────────── */}
      <section>
        {/* Section header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-800 rounded" />
          <div className="h-3 w-32 bg-gray-800 rounded" />
        </div>

        {/* Bar chart placeholder */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 mb-4">
          <div className="h-3 w-40 bg-gray-800 rounded mb-2" />
          <div className="h-2 w-56 bg-gray-800/60 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-24 bg-gray-800 rounded shrink-0" />
                <div
                  className="h-6 bg-gray-800 rounded"
                  style={{ width: `${70 - i * 12}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-800 bg-gray-900 p-4 space-y-2"
            >
              <div className="flex justify-between">
                <div className="h-3 w-24 bg-gray-800 rounded" />
                <div className="h-4 w-4 bg-gray-800 rounded" />
              </div>
              <div className="h-6 w-20 bg-gray-800 rounded" />
              <div className="h-2 w-32 bg-gray-800/60 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
