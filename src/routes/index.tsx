import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { someQueryOptions } from "~/functions/some-query";
import { useSomeMutation } from "~/hooks/use-sign-in";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: queryData } = useQuery(someQueryOptions());
  const [someMutation, { isLoading, data }] = useSomeMutation();
  return (
    <div className="space-y-4">
      <div className="">
        <h1 className="font-bold">Query</h1>
        <div className="ml-4">
          {" "}
          - Response: {!!queryData ? queryData : "❔"}
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-x-2">
          <h1 className="font-bold">Mutation</h1>
          <div className="space-y-1">
            <button
              className="border rounded px-2 py-0.5 text-sm"
              onClick={() => someMutation("John")}
            >
              {isLoading ? (
                <span className="animate-spin">🔄</span>
              ) : (
                <span>Run</span>
              )}
            </button>
          </div>
        </div>
        <div className="ml-4"> - Response: {!!data ? data : "❔"}</div>
      </div>
    </div>
  );
}
