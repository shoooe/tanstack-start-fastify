// Reference: https://github.com/TanStack/router/blob/49e5fad4ea698b72794ad68b881630e94407a8d3/e2e/react-start/custom-basepath/express-server.ts
import express from "express";
import { toNodeHandler } from "srvx/node";

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

if (DEVELOPMENT) {
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const { default: serverEntry } = await viteDevServer.ssrLoadModule(
        "./src/server.ts"
      );
      const handler = toNodeHandler(serverEntry.fetch);
      await handler(req, res);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  // @ts-ignore This file is created by `pnpm build`
  const { default: handler } = await import("./dist/server/server.js");
  const nodeHandler = toNodeHandler(handler.fetch);
  app.use("/custom/basepath", express.static("dist/client"));
  app.use(async (req, res, next) => {
    try {
      await nodeHandler(req, res);
    } catch (error) {
      next(error);
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
