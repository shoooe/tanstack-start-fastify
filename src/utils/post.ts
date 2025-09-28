import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const signIn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string() }))
  .handler(async ({ data }) => {
    console.info("Run", data.name);
  });
