export default function ConflictLoading() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 animate-pulse">
      {/* Nav skeleton */}
      <nav className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="h-4 w-28 bg-gray-800 rounded" />
      </nav>

      {/* Hero skeleton */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 max-w-5xl mx-auto space-y-5">
        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-800 rounded-full" />
          <div className="h-5 w-20 bg-gray-800 rounded-full" />
          <div className="h-5 w-14 bg-gray-800 rounded-full" />
        </div>

        {/* Title */}
        <div className="h-8 w-3/4 bg-gray-800 rounded" />

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-gray-800 rounded" />
              <div className="h-5 w-24 bg-gray-800 rounded" />
            </div>
          ))}
        </div>

        {/* Extended stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-gray-800 rounded" />
              <div className="h-5 w-16 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar skeleton */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="border-b border-gray-800 pb-3 mb-8 flex gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-16 bg-gray-800 rounded" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 pb-16">
          <div className="h-4 w-full bg-gray-800 rounded" />
          <div className="h-4 w-5/6 bg-gray-800 rounded" />
          <div className="h-4 w-4/6 bg-gray-800 rounded" />
          <div className="h-32 w-full bg-gray-800 rounded-lg mt-6" />
          <div className="h-4 w-3/4 bg-gray-800 rounded" />
          <div className="h-4 w-2/3 bg-gray-800 rounded" />
        </div>
      </div>
    </main>
  );
}
