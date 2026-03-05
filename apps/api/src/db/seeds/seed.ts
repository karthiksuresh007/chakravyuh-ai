import { sql } from "drizzle-orm";
import { db } from "../index.js";
import { seedConflicts } from "./seed-conflicts.js";
import { seedTimelineEvents } from "./seed-timeline-events.js";
import { seedActors } from "./seed-actors.js";
import { seedImpact } from "./seed-impact.js";

async function seed() {
  console.log("🌱 Starting database seed...\n");

  // Clear existing data (in reverse dependency order)
  console.log("  🗑  Clearing existing data...");
  await db.execute(sql`TRUNCATE TABLE economic_impact, humanitarian_impact, conflict_actors, timeline_events, actors, conflicts CASCADE`);
  console.log("  ✓ Cleared all tables\n");

  // 1. Seed conflicts first (no dependencies)
  const insertedConflicts = await seedConflicts();
  const conflictMap = new Map(insertedConflicts.map((c) => [c.slug, c.id]));

  // 2. Timeline events (depends on conflicts)
  await seedTimelineEvents(conflictMap);

  // 3. Actors + conflict-actor junction (depends on conflicts)
  await seedActors(conflictMap);

  // 4. Impact data (depends on conflicts)
  await seedImpact(conflictMap);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
