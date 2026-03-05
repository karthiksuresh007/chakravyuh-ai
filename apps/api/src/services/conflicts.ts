import { eq, and, asc, desc, sql, type SQL } from "drizzle-orm";
import { db } from "../db/index.js";
import {
  conflicts,
  timelineEvents,
  actors,
  conflictActors,
  economicImpact,
  humanitarianImpact,
} from "../db/schema.js";

// ── List conflicts (paginated, filterable) ──────────────────────

interface ListConflictsParams {
  region?: string;
  status?: string;
  intensity?: string;
  limit: number;
  offset: number;
}

export async function listConflicts(params: ListConflictsParams) {
  const conditions: SQL[] = [];

  if (params.region) conditions.push(eq(conflicts.region, params.region));
  if (params.status) conditions.push(eq(conflicts.status, params.status));
  if (params.intensity) conditions.push(eq(conflicts.intensity, params.intensity));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [data, countResult] = await Promise.all([
    db
      .select({
        id: conflicts.id,
        slug: conflicts.slug,
        displayName: conflicts.displayName,
        status: conflicts.status,
        intensity: conflicts.intensity,
        region: conflicts.region,
        lat: conflicts.lat,
        lng: conflicts.lng,
        riskScore: conflicts.riskScore,
        startDate: conflicts.startDate,
      })
      .from(conflicts)
      .where(where)
      .orderBy(desc(conflicts.riskScore))
      .limit(params.limit)
      .offset(params.offset),

    db
      .select({ count: sql<number>`count(*)::int` })
      .from(conflicts)
      .where(where),
  ]);

  return {
    items: data,
    total: countResult[0].count,
    limit: params.limit,
    offset: params.offset,
  };
}

// ── Get single conflict by slug ─────────────────────────────────

export async function getConflictBySlug(slug: string) {
  const result = await db
    .select()
    .from(conflicts)
    .where(eq(conflicts.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

// ── Get timeline events for a conflict ──────────────────────────

interface TimelineParams {
  startDate?: string;
  endDate?: string;
  category?: string;
  significance?: string;
}

export async function getConflictTimeline(conflictId: string, params: TimelineParams) {
  const conditions: SQL[] = [eq(timelineEvents.conflictId, conflictId)];

  if (params.category) conditions.push(eq(timelineEvents.category, params.category));
  if (params.significance) conditions.push(eq(timelineEvents.significance, params.significance));
  if (params.startDate) conditions.push(sql`${timelineEvents.eventDate} >= ${params.startDate}`);
  if (params.endDate) conditions.push(sql`${timelineEvents.eventDate} <= ${params.endDate}`);

  return db
    .select()
    .from(timelineEvents)
    .where(and(...conditions))
    .orderBy(asc(timelineEvents.eventDate));
}

// ── Get actors for a conflict ───────────────────────────────────

export async function getConflictActors(conflictId: string) {
  return db
    .select({
      id: actors.id,
      name: actors.name,
      type: actors.type,
      countryCode: actors.countryCode,
      description: actors.description,
      logoUrl: actors.logoUrl,
      role: conflictActors.role,
      statedObjectives: conflictActors.statedObjectives,
      involvementStart: conflictActors.involvementStart,
      involvementEnd: conflictActors.involvementEnd,
    })
    .from(conflictActors)
    .innerJoin(actors, eq(conflictActors.actorId, actors.id))
    .where(eq(conflictActors.conflictId, conflictId))
    .orderBy(asc(conflictActors.role));
}

// ── Get impact data for a conflict ──────────────────────────────

export async function getConflictImpact(conflictId: string) {
  const [humanitarian, economic] = await Promise.all([
    db
      .select()
      .from(humanitarianImpact)
      .where(eq(humanitarianImpact.conflictId, conflictId))
      .orderBy(desc(humanitarianImpact.asOfDate))
      .limit(1),

    db
      .select()
      .from(economicImpact)
      .where(eq(economicImpact.conflictId, conflictId))
      .orderBy(asc(economicImpact.metricName)),
  ]);

  return {
    humanitarian: humanitarian[0] ?? null,
    economic,
  };
}

// ── Map markers (GeoJSON) ───────────────────────────────────────

interface MapMarkersParams {
  region?: string;
  status?: string;
  intensity?: string;
}

export async function getMapMarkers(params: MapMarkersParams) {
  const conditions: SQL[] = [];

  if (params.region) conditions.push(eq(conflicts.region, params.region));
  if (params.status) conditions.push(eq(conflicts.status, params.status));
  if (params.intensity) conditions.push(eq(conflicts.intensity, params.intensity));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const data = await db
    .select({
      id: conflicts.id,
      slug: conflicts.slug,
      displayName: conflicts.displayName,
      status: conflicts.status,
      intensity: conflicts.intensity,
      region: conflicts.region,
      lat: conflicts.lat,
      lng: conflicts.lng,
      riskScore: conflicts.riskScore,
    })
    .from(conflicts)
    .where(where);

  // Join with humanitarian data for casualty estimates
  const withCasualties = await Promise.all(
    data.map(async (conflict) => {
      const h = await db
        .select({ totalDeaths: humanitarianImpact.totalDeaths })
        .from(humanitarianImpact)
        .where(eq(humanitarianImpact.conflictId, conflict.id))
        .limit(1);

      return {
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [parseFloat(conflict.lng), parseFloat(conflict.lat)],
        },
        properties: {
          conflict_id: conflict.id,
          slug: conflict.slug,
          display_name: conflict.displayName,
          status: conflict.status,
          intensity: conflict.intensity,
          risk_score: conflict.riskScore ? parseFloat(conflict.riskScore) : null,
          casualty_estimate: h[0]?.totalDeaths ?? null,
          region: conflict.region,
        },
      };
    })
  );

  return {
    type: "FeatureCollection" as const,
    features: withCasualties,
  };
}
