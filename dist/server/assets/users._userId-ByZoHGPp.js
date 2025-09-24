import { jsx } from "react/jsx-runtime";
import { N as NotFound } from "./router-BLUJwCsh.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@tanstack/react-router-ssr-query";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "redaxios";
import "../server.js";
import "node:async_hooks";
import "srvx";
import "@tanstack/react-router/ssr/server";
const SplitNotFoundComponent = () => {
  return /* @__PURE__ */ jsx(NotFound, { children: "User not found" });
};
export {
  SplitNotFoundComponent as notFoundComponent
};
