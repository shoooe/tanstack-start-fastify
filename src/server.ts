import handler from "@tanstack/react-start/server-entry";
import { initServer } from "./init";

export default {
  async fetch(request: Request) {
    return handler.fetch(request);
  },
  init: initServer,
};
