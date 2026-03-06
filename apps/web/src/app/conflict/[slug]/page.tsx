import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getConflict,
  getConflictActors,
  getConflictImpact,
  getConflictTimeline,
  listConflicts,
} from "@/lib/api/conflicts";
import ConflictHero from "@/components/conflict/ConflictHero";
import ConflictTabs from "@/components/conflict/ConflictTabs";

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { items } = await listConflicts();
    return items.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const conflict = await getConflict(slug);
    return {
      title: `${conflict.displayName} — Chakravyuh AI`,
      description:
        conflict.overviewText?.slice(0, 160) ??
        `Detailed intelligence on the ${conflict.displayName} conflict.`,
    };
  } catch {
    return { title: "Conflict Not Found — Chakravyuh AI" };
  }
}

export default async function ConflictPage({ params }: PageProps) {
  const { slug } = await params;

  let conflict;
  try {
    conflict = await getConflict(slug);
  } catch {
    notFound();
  }

  const [actors, impact, timeline] = await Promise.all([
    getConflictActors(slug).catch(() => []),
    getConflictImpact(slug).catch(() => ({ humanitarian: null, economic: [] })),
    getConflictTimeline(slug).catch(() => []),
  ]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Back nav */}
      <nav className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-4 py-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
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
          Back to Map
        </Link>
      </nav>

      {/* Hero */}
      <ConflictHero conflict={conflict} humanitarian={impact.humanitarian} />

      {/* Tabbed content */}
      <ConflictTabs
        conflict={conflict}
        actors={actors}
        timeline={timeline}
        impact={impact}
      />
    </main>
  );
}
