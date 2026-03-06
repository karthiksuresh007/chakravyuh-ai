export default function DashboardLoading() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-950">
      {/* Map placeholder */}
      <div className="absolute inset-0 animate-pulse bg-gray-900" />

      {/* Fake map controls top-right */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <div className="w-8 h-8 rounded bg-gray-800" />
        <div className="w-8 h-8 rounded bg-gray-800" />
      </div>

      {/* Filter bar skeleton */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-gray-800" />
        ))}
      </div>

      {/* Center spinner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Loading map…</span>
        </div>
      </div>
    </main>
  );
}
