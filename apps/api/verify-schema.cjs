const { PGlite } = require("@electric-sql/pglite");
const fs = require("fs");

(async () => {
  const db = new PGlite();
  const sql = fs.readFileSync("./drizzle/0000_blushing_terror.sql", "utf8");
  const statements = sql.split("--> statement-breakpoint").map(s => s.trim()).filter(Boolean);

  for (const stmt of statements) {
    await db.exec(stmt);
  }

  const tables = await db.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename");
  console.log("Tables created:", tables.rows.map(r => r.tablename));

  const indexes = await db.query("SELECT indexname FROM pg_indexes WHERE schemaname = 'public' AND indexname LIKE 'idx_%' ORDER BY indexname");
  console.log("Indexes:", indexes.rows.map(r => r.indexname));

  const fks = await db.query("SELECT conname FROM pg_constraint WHERE contype = 'f' ORDER BY conname");
  console.log("Foreign keys:", fks.rows.map(r => r.conname));

  console.log("Schema verification PASSED");
  await db.close();
  process.exit(0);
})().catch(e => { console.error("FAILED:", e.message); process.exit(1); });
