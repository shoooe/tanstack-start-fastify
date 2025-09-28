import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import middie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { toNodeHandler } from "srvx/node";
import Fastify from "fastify";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = parseInt(process.env.PORT ?? "3000");

async function createViteMiddleware() {
  const { createServer } = await import("vite");

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  return vite;
}

async function startDevelopmentServer() {
  const fastify = Fastify({
    logger: {
      level: "warn",
    },
  });

  await fastify.register(middie);
  const vite = await createViteMiddleware();
  fastify.use(vite.middlewares);

  const { default: devHandler } = await vite.ssrLoadModule("./src/server.ts");
  const handler = toNodeHandler(devHandler.fetch);

  fastify.all("*", async (request, reply) => {
    await handler(request.raw, reply.raw);
  });

  try {
    await devHandler.init();
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Development server is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

async function startProductionServer() {
  const fastify = Fastify({
    logger: true,
    trustProxy: true,
  });

  await fastify.register(fastifyStatic, {
    root: join(__dirname, "dist/client"),
    prefix: "/",
    wildcard: false,
  });

  // @ts-ignore This file is created by `pnpm build`
  const { default: prodHandler } = await import("./dist/server/server.js");
  const handler = toNodeHandler(prodHandler.fetch);

  fastify.all("*", async (request, reply) => {
    try {
      console.info("START REQUEST ---------");
      console.info("Headers", request.headers);
      await handler(request.raw, reply.raw);
      console.info("END REQUEST ---------");
    } catch (err) {
      console.error(err);
    } finally {
      console.info("END REQUEST ---------");
    }
  });

  try {
    await prodHandler.init();
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Production server is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

async function main() {
  if (DEVELOPMENT) {
    await startDevelopmentServer();
  } else {
    await startProductionServer();
  }
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
