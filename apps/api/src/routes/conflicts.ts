import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import {
  listConflicts,
  getConflictBySlug,
  getConflictTimeline,
  getConflictActors,
  getConflictImpact,
} from "../services/conflicts.js";

// ── Query / Param schemas ───────────────────────────────────────

const listQuerySchema = z.object({
  region: z.string().optional(),
  status: z.enum(["active", "frozen", "resolved", "historical"]).optional(),
  intensity: z.enum(["high", "medium", "low", "tension"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

const slugParamSchema = z.object({
  slug: z.string().min(1),
});

const timelineQuerySchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  category: z.enum(["military", "political", "diplomatic", "humanitarian"]).optional(),
  significance: z.enum(["critical", "major", "moderate", "minor"]).optional(),
});

// ── Plugin ──────────────────────────────────────────────────────

const conflictRoutes: FastifyPluginAsync = async (app) => {
  // GET /api/v1/conflicts — paginated list
  app.get("/", async (request, reply) => {
    const query = listQuerySchema.safeParse(request.query);
    if (!query.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: query.error.flatten().fieldErrors },
      });
    }

    const result = await listConflicts(query.data);
    return {
      success: true,
      data: result.items,
      meta: { total: result.total, limit: result.limit, offset: result.offset },
      error: null,
    };
  });

  // GET /api/v1/conflicts/:slug — single conflict
  app.get("/:slug", async (request, reply) => {
    const params = slugParamSchema.safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: params.error.flatten().fieldErrors },
      });
    }

    const conflict = await getConflictBySlug(params.data.slug);
    if (!conflict) {
      return reply.status(404).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "NOT_FOUND", message: `Conflict "${params.data.slug}" not found` },
      });
    }

    return { success: true, data: conflict, meta: null, error: null };
  });

  // GET /api/v1/conflicts/:slug/timeline
  app.get("/:slug/timeline", async (request, reply) => {
    const params = slugParamSchema.safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: params.error.flatten().fieldErrors },
      });
    }

    const conflict = await getConflictBySlug(params.data.slug);
    if (!conflict) {
      return reply.status(404).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "NOT_FOUND", message: `Conflict "${params.data.slug}" not found` },
      });
    }

    const queryParse = timelineQuerySchema.safeParse(request.query);
    if (!queryParse.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: queryParse.error.flatten().fieldErrors },
      });
    }

    const events = await getConflictTimeline(conflict.id, queryParse.data);
    return {
      success: true,
      data: events,
      meta: { count: events.length },
      error: null,
    };
  });

  // GET /api/v1/conflicts/:slug/actors
  app.get("/:slug/actors", async (request, reply) => {
    const params = slugParamSchema.safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: params.error.flatten().fieldErrors },
      });
    }

    const conflict = await getConflictBySlug(params.data.slug);
    if (!conflict) {
      return reply.status(404).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "NOT_FOUND", message: `Conflict "${params.data.slug}" not found` },
      });
    }

    const actorsData = await getConflictActors(conflict.id);
    return {
      success: true,
      data: actorsData,
      meta: { count: actorsData.length },
      error: null,
    };
  });

  // GET /api/v1/conflicts/:slug/impact
  app.get("/:slug/impact", async (request, reply) => {
    const params = slugParamSchema.safeParse(request.params);
    if (!params.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: params.error.flatten().fieldErrors },
      });
    }

    const conflict = await getConflictBySlug(params.data.slug);
    if (!conflict) {
      return reply.status(404).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "NOT_FOUND", message: `Conflict "${params.data.slug}" not found` },
      });
    }

    const impact = await getConflictImpact(conflict.id);
    return {
      success: true,
      data: impact,
      meta: null,
      error: null,
    };
  });
};

export default conflictRoutes;
