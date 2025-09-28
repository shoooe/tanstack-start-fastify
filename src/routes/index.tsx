import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { someQueryOptions } from "~/functions/some-query";
import { useSomeMutation } from "~/hooks/use-sign-in";
import { RefreshCwIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: queryData } = useQuery(someQueryOptions());
  const [someMutation, { isLoading, data }] = useSomeMutation();
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-bold">Query</h1>
        <div className="ml-4">Response: {!!queryData ? queryData : "❔"}</div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-x-2">
          <h1 className="font-bold">Mutation</h1>
          <div className="space-y-1">
            <button
              className="border rounded px-2 text-sm h-6 flex items-center"
              onClick={() => someMutation("John")}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCwIcon className="animate-spin size-4" />
              ) : (
                <span>Run</span>
              )}
            </button>
          </div>
        </div>
        <div className="ml-4">Response: {!!data ? data : "❔"}</div>
      </div>
    </div>
  );
}
