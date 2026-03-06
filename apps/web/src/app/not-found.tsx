import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl font-bold text-gray-800">404</div>

        <div>
          <h1 className="text-xl font-semibold text-gray-100 mb-2">
            Page not found
          </h1>
          <p className="text-sm text-gray-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
