import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";

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

  return app;
}
