// Reference: https://github.com/TanStack/router/blob/49e5fad4ea698b72794ad68b881630e94407a8d3/e2e/react-start/custom-basepath/express-server.ts
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { toNodeHandler } from "srvx/node";
import path from "path";

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = fastify();

if (DEVELOPMENT) {
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );

  app.addHook("onRequest", async (req, res) => {
    // Vite Dev Server uses its own request/response objects, so we call its middleware directly
    await new Promise((resolve, reject) => {
      viteDevServer.middlewares(req.raw, res.raw, () => {
        resolve(null);
      });
    });
  });

  app.addHook("onRequest", async (req, res) => {
    try {
      const { default: serverEntry } = await viteDevServer.ssrLoadModule(
        "./src/server.ts"
      );
      const handler = toNodeHandler(serverEntry.fetch);
      await handler(req.raw, res.raw);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      res.send(error);
    }
  });
} else {
  // @ts-ignore This file is created by `pnpm build`
  const { default: handler } = await import("./dist/server/server.js");
  const nodeHandler = toNodeHandler(handler.fetch);

  app.register(fastifyStatic, {
    root: path.join(process.cwd(), "dist/client"),
  });

  app.addHook("onRequest", async (req, res) => {
    try {
      await nodeHandler(req.raw, res.raw);
    } catch (error) {
      res.send(error);
    }
  });
}

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
