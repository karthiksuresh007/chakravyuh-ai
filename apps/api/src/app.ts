import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      transport:
        process.env.NODE_ENV !== "production"
          ? { target: "pino-pretty", options: { colorize: true } }
          : undefined,
    },
  });

  // Register CORS
  await app.register(cors, {
    origin: process.env.NODE_ENV === "production"
      ? ["https://chakravyuh.ai"]
      : true,
    credentials: true,
  });

  // Health check endpoint
  app.get("/api/v1/health", async (_request, _reply) => {
    return {
      success: true,
      data: {
        status: "ok",
        service: "chakravyuh-api",
        timestamp: new Date().toISOString(),
      },
      meta: null,
      error: null,
    };
  });

  // Deep health check — verifies DB connectivity
  app.get("/api/v1/health/db", async (_request, _reply) => {
    try {
      const start = Date.now();
      const result = await db.execute(sql`SELECT 1 AS ok`);
      const latencyMs = Date.now() - start;

      return {
        success: true,
        data: {
          status: "ok",
          service: "chakravyuh-api",
          database: "connected",
          dbLatencyMs: latencyMs,
          timestamp: new Date().toISOString(),
        },
        meta: null,
        error: null,
      };
    } catch (err) {
      _reply.status(503);
      return {
        success: false,
        data: {
          status: "degraded",
          service: "chakravyuh-api",
          database: "disconnected",
          timestamp: new Date().toISOString(),
        },
        meta: null,
        error: { message: "Database connection failed" },
      };
    }
  });

  return app;
}
