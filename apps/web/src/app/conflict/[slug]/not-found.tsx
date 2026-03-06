import Link from "next/link";

export default function ConflictNotFound() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border border-gray-800 mx-auto">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-100 mb-2">
            Conflict not found
          </h1>
          <p className="text-sm text-gray-400">
            We couldn&apos;t find the conflict you&apos;re looking for. It may
            have been removed or the URL might be incorrect.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
