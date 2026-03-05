import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  decimal,
  integer,
  timestamp,
  jsonb,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";

// ============================================================================
// CONFLICTS — Core table representing a geopolitical conflict
// ============================================================================
export const conflicts = pgTable(
  "conflicts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(), // 'active' | 'frozen' | 'resolved' | 'historical'
    intensity: varchar("intensity", { length: 50 }).notNull(), // 'high' | 'medium' | 'low' | 'tension'
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    region: varchar("region", { length: 100 }).notNull(),
    subRegion: varchar("sub_region", { length: 100 }),
    lat: decimal("lat", { precision: 9, scale: 6 }).notNull(),
    lng: decimal("lng", { precision: 9, scale: 6 }).notNull(),
    riskScore: decimal("risk_score", { precision: 3, scale: 1 }), // 0.0–10.0
    overviewText: text("overview_text"),
    backgroundText: text("background_text"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_conflicts_status").on(table.status, table.intensity),
    index("idx_conflicts_region").on(table.region),
  ]
);

// ============================================================================
// TIMELINE EVENTS — Chronological events within a conflict
// ============================================================================
export const timelineEvents = pgTable(
  "timeline_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conflictId: uuid("conflict_id")
      .notNull()
      .references(() => conflicts.id, { onDelete: "cascade" }),
    eventDate: date("event_date").notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 50 }).notNull(), // 'military' | 'political' | 'diplomatic' | 'humanitarian'
    significance: varchar("significance", { length: 50 }).notNull(), // 'critical' | 'major' | 'moderate' | 'minor'
    sources: jsonb("sources"), // Array of source URLs
    mediaUrl: varchar("media_url", { length: 1000 }),
    mediaType: varchar("media_type", { length: 50 }), // 'image' | 'video' | 'document'
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_timeline_events_conflict").on(table.conflictId, table.eventDate),
  ]
);

// ============================================================================
// ACTORS — Countries, organizations, individuals involved in conflicts
// ============================================================================
export const actors = pgTable("actors", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // 'state' | 'non_state' | 'organization' | 'individual'
  countryCode: varchar("country_code", { length: 2 }), // ISO 3166-1 alpha-2
  description: text("description"),
  logoUrl: varchar("logo_url", { length: 1000 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ============================================================================
// CONFLICT_ACTORS — Junction table mapping actors to conflicts with roles
// ============================================================================
export const conflictActors = pgTable(
  "conflict_actors",
  {
    conflictId: uuid("conflict_id")
      .notNull()
      .references(() => conflicts.id, { onDelete: "cascade" }),
    actorId: uuid("actor_id")
      .notNull()
      .references(() => actors.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 100 }).notNull(), // 'attacker' | 'defender' | 'mediator' | 'supporter' | 'observer'
    statedObjectives: text("stated_objectives"),
    involvementStart: date("involvement_start"),
    involvementEnd: date("involvement_end"),
  },
  (table) => [
    primaryKey({ columns: [table.conflictId, table.actorId] }),
  ]
);

// ============================================================================
// ECONOMIC IMPACT — Economic metrics per conflict
// ============================================================================
export const economicImpact = pgTable(
  "economic_impact",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conflictId: uuid("conflict_id")
      .notNull()
      .references(() => conflicts.id, { onDelete: "cascade" }),
    metricName: varchar("metric_name", { length: 255 }).notNull(),
    metricValue: decimal("metric_value", { precision: 20, scale: 4 }),
    metricUnit: varchar("metric_unit", { length: 100 }),
    asOfDate: date("as_of_date").notNull(),
    source: varchar("source", { length: 500 }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_economic_impact_conflict").on(table.conflictId, table.metricName),
  ]
);

// ============================================================================
// HUMANITARIAN IMPACT — Casualty, displacement, and refugee data per conflict
// ============================================================================
export const humanitarianImpact = pgTable("humanitarian_impact", {
  id: uuid("id").primaryKey().defaultRandom(),
  conflictId: uuid("conflict_id")
    .notNull()
    .references(() => conflicts.id, { onDelete: "cascade" }),
  totalDeaths: integer("total_deaths"),
  civilianDeaths: integer("civilian_deaths"),
  combatantDeaths: integer("combatant_deaths"),
  idpCount: integer("idp_count"), // Internally Displaced Persons
  refugeeCount: integer("refugee_count"),
  asOfDate: date("as_of_date").notNull(),
  source: varchar("source", { length: 500 }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
