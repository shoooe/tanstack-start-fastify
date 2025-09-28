import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const someMutation = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string() }))
  .handler(async ({ data }) => {
    return `Hello, ${data.name}!`;
  });
