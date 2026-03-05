import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getMapMarkers } from "../services/conflicts.js";

const markerQuerySchema = z.object({
  region: z.string().optional(),
  status: z.enum(["active", "frozen", "resolved", "historical"]).optional(),
  intensity: z.enum(["high", "medium", "low", "tension"]).optional(),
});

const mapRoutes: FastifyPluginAsync = async (app) => {
  // GET /api/v1/map/markers — GeoJSON FeatureCollection
  app.get("/markers", async (request, reply) => {
    const query = markerQuerySchema.safeParse(request.query);
    if (!query.success) {
      return reply.status(400).send({
        success: false,
        data: null,
        meta: null,
        error: { code: "VALIDATION_ERROR", details: query.error.flatten().fieldErrors },
      });
    }

    const geojson = await getMapMarkers(query.data);
    return {
      success: true,
      data: geojson,
      meta: { count: geojson.features.length },
      error: null,
    };
  });
};

export default mapRoutes;
