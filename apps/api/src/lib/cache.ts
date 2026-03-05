import Redis from "ioredis";
import { env } from "./env.js";

let redis: Redis | null = null;
let isConnected = false;

function getRedis(): Redis | null {
  if (redis) return redis;

  try {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      retryStrategy(times) {
        if (times > 3) return null; // stop retrying after 3 attempts
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    redis.on("connect", () => {
      isConnected = true;
    });
    redis.on("error", () => {
      isConnected = false;
    });
    redis.on("close", () => {
      isConnected = false;
    });

    redis.connect().catch(() => {
      isConnected = false;
    });

    return redis;
  } catch {
    return null;
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedis();
  if (!client || !isConnected) return null;

  try {
    const data = await client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  const client = getRedis();
  if (!client || !isConnected) return;

  try {
    await client.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    // silently fail — cache is optional
  }
}

export async function cacheDel(key: string): Promise<void> {
  const client = getRedis();
  if (!client || !isConnected) return;

  try {
    await client.del(key);
  } catch {
    // silently fail
  }
}

export async function cacheDelPattern(pattern: string): Promise<void> {
  const client = getRedis();
  if (!client || !isConnected) return;

  try {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch {
    // silently fail
  }
}

export function getCacheStatus(): { connected: boolean } {
  return { connected: isConnected };
}

export { redis };
