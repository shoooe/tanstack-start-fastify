import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

export const someQuery = createServerFn({ method: "GET" }).handler(async () => {
  return `Hello 👋`;
});

export const someQueryOptions = () =>
  queryOptions({
    queryKey: ["some-query"],
    queryFn: () => someQuery(),
  });
