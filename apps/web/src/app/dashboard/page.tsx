import dynamic from "next/dynamic";

const ConflictMap = dynamic(
  () => import("@/components/map/ConflictMap"),
  { ssr: false }
);

export default function DashboardPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <ConflictMap />
    </main>
  );
}
