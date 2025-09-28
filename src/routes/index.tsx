import { createFileRoute } from "@tanstack/react-router";
import { useSomeMutation } from "~/hooks/use-sign-in";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [someMutation, { isLoading, data }] = useSomeMutation();
  return (
    <div className="p-2">
      <h1>Homepage</h1>
      <div>
        <div>Loading: {isLoading ? "✅" : "❌"}</div>
        <div>Response: {!!data ? data : "-"}</div>
        <button
          className="border rounded px-2 py-1"
          onClick={() => someMutation("John")}
        >
          Run mutation
        </button>
      </div>
    </div>
  );
}
