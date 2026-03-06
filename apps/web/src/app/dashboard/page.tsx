import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Interactive global conflict map. Explore active conflicts, their severity, and impact worldwide.",
};

const ConflictMap = dynamic(
  () => import("@/components/map/ConflictMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Loading map…</span>
        </div>
      </div>
    ),
  }
);

export default function DashboardPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <ConflictMap />
    </main>
  );
}
