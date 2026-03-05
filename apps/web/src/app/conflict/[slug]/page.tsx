export default function ConflictPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Conflict: {params.slug}</h1>
      <p className="mt-4 text-gray-400">
        Conflict detail page — to be implemented in Phase 3.
      </p>
    </main>
  );
}
