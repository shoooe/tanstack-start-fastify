import { createServerFn } from "@tanstack/react-start";

export const signIn = createServerFn({ method: "POST" }).handler(async () => {
  console.info("Run");
});
