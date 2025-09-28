import { createFileRoute } from "@tanstack/react-router";
import { useSignIn } from "~/hooks/use-sign-in";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [signIn, { isLoading }] = useSignIn();
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <div>Loading {isLoading ? "true" : "false"}</div>
      <button onClick={() => signIn()}>Run POST request</button>
    </div>
  );
}
